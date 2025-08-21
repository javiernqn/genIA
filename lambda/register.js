const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { username } = JSON.parse(event.body);
    
    // Verificar si el usuario ya existe
    const checkParams = {
      TableName: process.env.USERS_TABLE,
      Key: { username }
    };
    
    const existingUser = await dynamodb.get(checkParams).promise();
    
    if (existingUser.Item) {
      return {
        statusCode: 409,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Usuario ya existe' })
      };
    }

    // Crear nuevo usuario
    const userParams = {
      TableName: process.env.USERS_TABLE,
      Item: {
        id: uuidv4(),
        username,
        createdAt: new Date().toISOString()
      }
    };
    
    await dynamodb.put(userParams).promise();

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Usuario creado exitosamente',
        user: { id: userParams.Item.id, username }
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