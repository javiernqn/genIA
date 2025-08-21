const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { username, latitude, longitude } = JSON.parse(event.body);
    
    // Validar usuario en DynamoDB
    const userParams = {
      TableName: process.env.USERS_TABLE,
      Key: { username }
    };
    
    const userResult = await dynamodb.get(userParams).promise();
    
    if (!userResult.Item) {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Usuario no encontrado' })
      };
    }

    // Registrar geolocalización
    if (latitude && longitude) {
      const geoParams = {
        TableName: process.env.GEOLOCATION_TABLE,
        Item: {
          id: `${username}-${Date.now()}`,
          username,
          latitude,
          longitude,
          timestamp: new Date().toISOString()
        }
      };
      
      await dynamodb.put(geoParams).promise();
    }

    const token = jwt.sign(
      { userId: userResult.Item.id, username: userResult.Item.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        user: { id: userResult.Item.id, username: userResult.Item.username }
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