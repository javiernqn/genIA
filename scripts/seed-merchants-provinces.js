const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'us-west-2'
});

const mockMerchants = [
  // Buenos Aires
  { name: 'McDonald\'s Palermo', category: 'Gastronomía', latitude: -34.5875, longitude: -58.4205, address: 'Av. Santa Fe 3253', province: 'Buenos Aires', city: 'CABA' },
  { name: 'Starbucks Recoleta', category: 'Gastronomía', latitude: -34.5936, longitude: -58.3960, address: 'Av. Callao 1234', province: 'Buenos Aires', city: 'CABA' },
  { name: 'Carrefour La Plata', category: 'Alimentación', latitude: -34.9214, longitude: -57.9544, address: 'Av. 7 N° 315', province: 'Buenos Aires', city: 'La Plata' },
  { name: 'Cine Atlas Quilmes', category: 'Entretenimiento', latitude: -34.7203, longitude: -58.2538, address: 'Rivadavia 350', province: 'Buenos Aires', city: 'Quilmes' },
  { name: 'Farmacity Tigre', category: 'Salud', latitude: -34.4264, longitude: -58.5799, address: 'Av. Cazón 451', province: 'Buenos Aires', city: 'Tigre' },
  
  // Córdoba
  { name: 'Burger King Centro', category: 'Gastronomía', latitude: -31.4201, longitude: -64.1888, address: 'San Martín 451', province: 'Córdoba', city: 'Córdoba' },
  { name: 'Walmart Villa Carlos Paz', category: 'Alimentación', latitude: -31.4241, longitude: -64.4978, address: 'Av. San Martín 1205', province: 'Córdoba', city: 'Villa Carlos Paz' },
  { name: 'Cines del Paseo Río Cuarto', category: 'Entretenimiento', latitude: -33.1301, longitude: -64.3496, address: 'Av. Italia 1255', province: 'Córdoba', city: 'Río Cuarto' },
  
  // Santa Fe
  { name: 'Pizza Hut Rosario', category: 'Gastronomía', latitude: -32.9442, longitude: -60.6505, address: 'Córdoba 1234', province: 'Santa Fe', city: 'Rosario' },
  { name: 'Coto Santa Fe Capital', category: 'Alimentación', latitude: -31.6333, longitude: -60.7000, address: 'Bv. Pellegrini 3450', province: 'Santa Fe', city: 'Santa Fe' },
  { name: 'Farmacia del Pueblo', category: 'Salud', latitude: -32.9520, longitude: -60.6397, address: 'San Lorenzo 1456', province: 'Santa Fe', city: 'Rosario' },
  
  // Mendoza
  { name: 'Subway Mendoza', category: 'Gastronomía', latitude: -32.8908, longitude: -68.8272, address: 'Av. San Martín 1145', province: 'Mendoza', city: 'Mendoza' },
  { name: 'Disco San Rafael', category: 'Alimentación', latitude: -34.6177, longitude: -68.3301, address: 'Av. Balloffet 245', province: 'Mendoza', city: 'San Rafael' },
  { name: 'Cine Showcase', category: 'Entretenimiento', latitude: -32.8895, longitude: -68.8458, address: 'Av. Acceso Este 3280', province: 'Mendoza', city: 'Mendoza' },
  
  // Tucumán
  { name: 'KFC San Miguel', category: 'Gastronomía', latitude: -26.8083, longitude: -65.2176, address: 'Av. Soldati 330', province: 'Tucumán', city: 'San Miguel de Tucumán' },
  { name: 'Libertad Supermercados', category: 'Alimentación', latitude: -26.8241, longitude: -65.2226, address: 'Av. Aconquija 1205', province: 'Tucumán', city: 'San Miguel de Tucumán' },
  
  // Salta
  { name: 'Mostaza Salta', category: 'Gastronomía', latitude: -24.7821, longitude: -65.4232, address: 'Av. Bolivia 4650', province: 'Salta', city: 'Salta' },
  { name: 'Vea Supermercados', category: 'Alimentación', latitude: -24.7859, longitude: -65.4093, address: 'Av. Paraguay 1456', province: 'Salta', city: 'Salta' },
  
  // Neuquén
  { name: 'Patagonia Burger', category: 'Gastronomía', latitude: -38.9516, longitude: -68.0591, address: 'Av. Argentina 245', province: 'Neuquén', city: 'Neuquén' },
  { name: 'Farmacia Patagónica', category: 'Salud', latitude: -38.9489, longitude: -68.0651, address: 'Av. Olascoaga 356', province: 'Neuquén', city: 'Neuquén' }
];

async function seedMerchantsWithProvinces() {
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
        province: merchant.province,
        city: merchant.city,
        createdAt: new Date().toISOString()
      }
    };
    
    try {
      await dynamodb.put(params).promise();
      console.log(`Comercio creado: ${merchant.name} - ${merchant.city}, ${merchant.province}`);
    } catch (error) {
      console.error(`Error creando ${merchant.name}:`, error.message);
    }
  }
}

seedMerchantsWithProvinces();