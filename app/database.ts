import AWS from 'aws-sdk';

// Update AWS config
AWS.config.update({
  accessKeyId: process.env.CLOUD_ACCESS_KEY,
  secretAccessKey: process.env.CLOUD_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

const database = new AWS.DynamoDB.DocumentClient({ apiVersion: 'latest' });

export default database;
