const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'us-west-2'
});

async function getMerchants() {
  const params = {
    TableName: 'smartwallet-merchants-dev'
  };
  
  const result = await dynamodb.scan(params).promise();
  return result.Items;
}

const promotionTemplates = [
  { discount: '20%', title: '🎉 ¡Oferta genial!', description: 'Descuento especial', ageGroup: 'young' },
  { discount: '15%', title: 'Oferta especial', description: 'Promoción limitada', ageGroup: 'adult' },
  { discount: '25%', title: 'Promoción exclusiva', description: 'Beneficio especial', ageGroup: 'senior' },
  { discount: '30%', title: '🔥 Super descuento', description: 'No te lo pierdas', ageGroup: 'young' },
  { discount: '10%', title: 'Descuento familiar', description: 'Para toda la familia', ageGroup: 'adult' }
];

const ageRanges = {
  young: { minAge: 18, maxAge: 25 },
  adult: { minAge: 26, maxAge: 40 },
  senior: { minAge: 41, maxAge: 99 }
};

async function seedPromotions() {
  try {
    const merchants = await getMerchants();
    console.log(`Encontrados ${merchants.length} comercios`);
    
    const promotions = [];
    
    // Crear 20 promociones distribuidas entre los comercios
    for (let i = 0; i < 20; i++) {
      const merchant = merchants[i % merchants.length];
      const template = promotionTemplates[i % promotionTemplates.length];
      const ageRange = ageRanges[template.ageGroup];
      
      const promotion = {
        id: uuidv4(),
        merchantId: merchant.id,
        merchantName: merchant.name,
        category: merchant.category,
        province: merchant.province,
        city: merchant.city,
        discount: template.discount,
        title: template.title,
        description: `${template.description} en ${merchant.name}`,
        ageGroup: template.ageGroup,
        minAge: ageRange.minAge,
        maxAge: ageRange.maxAge,
        validFrom: new Date().toISOString(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 días
        active: true,
        createdAt: new Date().toISOString()
      };
      
      promotions.push(promotion);
    }
    
    // Insertar promociones en DynamoDB
    for (const promotion of promotions) {
      const params = {
        TableName: 'smartwallet-promotions-dev',
        Item: promotion
      };
      
      try {
        await dynamodb.put(params).promise();
        console.log(`Promoción creada: ${promotion.title} - ${promotion.merchantName} (${promotion.ageGroup}: ${promotion.minAge}-${promotion.maxAge} años)`);
      } catch (error) {
        console.error(`Error creando promoción ${promotion.title}:`, error.message);
      }
    }
    
  } catch (error) {
    console.error('Error general:', error.message);
  }
}

seedPromotions();