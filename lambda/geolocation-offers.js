const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { username, latitude, longitude, radius = 5000 } = JSON.parse(event.body);
    
    // Obtener usuario para personalización
    const userParams = {
      TableName: process.env.USERS_TABLE,
      Key: { username }
    };
    
    const userResult = await dynamodb.get(userParams).promise();
    if (!userResult.Item) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Usuario no encontrado' })
      };
    }

    const user = userResult.Item;
    
    // Buscar comercios por provincia si se proporciona
    let merchantsResult;
    if (event.queryStringParameters && event.queryStringParameters.province) {
      const merchantsParams = {
        TableName: process.env.MERCHANTS_TABLE,
        IndexName: 'ProvinceIndex',
        KeyConditionExpression: 'province = :province',
        ExpressionAttributeValues: {
          ':province': event.queryStringParameters.province
        }
      };
      merchantsResult = await dynamodb.query(merchantsParams).promise();
    } else {
      const merchantsParams = {
        TableName: process.env.MERCHANTS_TABLE
      };
      merchantsResult = await dynamodb.scan(merchantsParams).promise();
    }
    
    const nearbyMerchants = merchantsResult.Items.filter(merchant => {
      const distance = calculateDistance(
        latitude, longitude,
        merchant.latitude, merchant.longitude
      );
      return distance <= radius;
    });

    // Generar ofertas personalizadas por edad
    const personalizedOffers = generatePersonalizedOffers(nearbyMerchants, user);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        offers: personalizedOffers,
        userLocation: { latitude, longitude },
        radius: radius
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error del servidor' })
    };
  }
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radio de la Tierra en metros
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function generatePersonalizedOffers(merchants, user) {
  const ageGroup = getAgeGroup(user.age);
  
  return merchants.map(merchant => {
    const baseOffer = {
      merchantId: merchant.id,
      name: merchant.name,
      category: merchant.category,
      distance: Math.round(calculateDistance(
        latitude, longitude,
        merchant.latitude, merchant.longitude
      )),
      address: merchant.address,
      province: merchant.province,
      city: merchant.city
    };

    // Personalizar por edad
    switch (ageGroup) {
      case 'young':
        return {
          ...baseOffer,
          discount: '20%',
          title: '🎉 ¡Oferta genial!',
          description: `${baseOffer.discount} OFF en ${merchant.name}`,
          tone: 'casual'
        };
      case 'adult':
        return {
          ...baseOffer,
          discount: '15%',
          title: 'Oferta especial',
          description: `Descuento del ${baseOffer.discount} en ${merchant.name}`,
          tone: 'professional'
        };
      case 'senior':
        return {
          ...baseOffer,
          discount: '25%',
          title: 'Promoción exclusiva',
          description: `Beneficio del ${baseOffer.discount} en ${merchant.name}`,
          tone: 'formal'
        };
      default:
        return baseOffer;
    }
  });
}

function getAgeGroup(age) {
  if (age >= 18 && age <= 25) return 'young';
  if (age >= 26 && age <= 40) return 'adult';
  if (age >= 41) return 'senior';
  return 'adult';
}