const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'us-west-2'
});

const mockMerchants = [
  // Restaurantes
  { name: 'McDonald\'s Palermo', category: 'Gastronomía', latitude: -34.5875, longitude: -58.4205, address: 'Av. Santa Fe 3253' },
  { name: 'Starbucks Recoleta', category: 'Gastronomía', latitude: -34.5936, longitude: -58.3960, address: 'Av. Callao 1234' },
  { name: 'Pizza Hut Centro', category: 'Gastronomía', latitude: -34.6037, longitude: -58.3816, address: 'Florida 537' },
  
  // Supermercados
  { name: 'Carrefour Express', category: 'Alimentación', latitude: -34.6118, longitude: -58.3960, address: 'Av. Corrientes 1500' },
  { name: 'Coto Barrio Norte', category: 'Alimentación', latitude: -34.5889, longitude: -58.3931, address: 'Av. Las Heras 2100' },
  
  // Entretenimiento
  { name: 'Cine Atlas', category: 'Entretenimiento', latitude: -34.6158, longitude: -58.3731, address: 'Lavalle 869' },
  { name: 'Bowling Palermo', category: 'Entretenimiento', latitude: -34.5722, longitude: -58.4269, address: 'Av. del Libertador 4444' },
  
  // Salud
  { name: 'Farmacia del Dr. Ahorro', category: 'Salud', latitude: -34.6092, longitude: -58.3842, address: 'Av. 9 de Julio 1234' },
  { name: 'Centro Médico Integral', category: 'Salud', latitude: -34.5975, longitude: -58.3897, address: 'Av. Pueyrredón 1500' },
  
  // Transporte
  { name: 'Estación Retiro', category: 'Transporte', latitude: -34.5908, longitude: -58.3742, address: 'Av. Ramos Mejía 1302' },
  { name: 'Subte Línea D - Callao', category: 'Transporte', latitude: -34.6037, longitude: -58.3925, address: 'Av. Callao 123' }
];

async function seedMerchants() {
  const tableName = 'smartwallet-merchants-dev';
  
  for (const merchant of mockMerchants) {
    const params = {
      TableName: tableName,
      Item: {
        id: uuidv4(),
        name: merchant.name,
        category: merchant.category,
        latitude: merchant.latitude,
        longitude: merchant.longitude,
        address: merchant.address,
        createdAt: new Date().toISOString()
      }
    };
    
    try {
      await dynamodb.put(params).promise();
      console.log(`Comercio creado: ${merchant.name} (${merchant.category})`);
    } catch (error) {
      console.error(`Error creando ${merchant.name}:`, error.message);
    }
  }
}

seedMerchants();