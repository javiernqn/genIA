// AWS Configuration for SmartWallet
import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION || 'us-west-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN
});

export const s3 = new AWS.S3();
export const dynamodb = new AWS.DynamoDB.DocumentClient();
export const lambda = new AWS.Lambda();
export const bedrock = new AWS.BedrockRuntime();

export default AWS;