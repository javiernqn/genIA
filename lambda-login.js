import { lambda } from './aws-config.js';

export const invokeLoginLambda = async (username, password) => {
  const params = {
    FunctionName: 'smartwallet-login',
    Payload: JSON.stringify({
      username,
      password
    })
  };

  try {
    const result = await lambda.invoke(params).promise();
    return JSON.parse(result.Payload);
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};