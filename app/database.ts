import AWS from 'aws-sdk';

// Update AWS config
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY, // Do NOT HARD-CODE your secret credentials here
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Do NOT HARD-CODE your secret credentials here
  region: 'us-east-1',
});

const database = new AWS.DynamoDB.DocumentClient({ apiVersion: 'latest' });

export default database;
