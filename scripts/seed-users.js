const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'us-west-2'
});

const mockUsers = [
  { username: 'juan_19', age: 19 },
  { username: 'maria_23', age: 23 },
  { username: 'carlos_28', age: 28 },
  { username: 'ana_32', age: 32 },
  { username: 'pedro_37', age: 37 },
  { username: 'lucia_42', age: 42 },
  { username: 'miguel_48', age: 48 },
  { username: 'sofia_55', age: 55 },
  { username: 'roberto_61', age: 61 },
  { username: 'elena_67', age: 67 }
];

async function seedUsers() {
  const tableName = 'smartwallet-users-dev';
  
  for (const user of mockUsers) {
    const params = {
      TableName: tableName,
      Item: {
        id: uuidv4(),
        username: user.username,
        age: user.age,
        createdAt: new Date().toISOString()
      }
    };
    
    try {
      await dynamodb.put(params).promise();
      console.log(`Usuario creado: ${user.username} (${user.age} años)`);
    } catch (error) {
      console.error(`Error creando ${user.username}:`, error.message);
    }
  }
}

seedUsers();