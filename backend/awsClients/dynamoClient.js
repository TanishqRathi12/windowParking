
const { DynamoDBClient, CreateTableCommand, DescribeTableCommand } = require('@aws-sdk/client-dynamodb');
const { GetCommand, PutCommand, UpdateCommand,DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = require('../env.js');

console.log('In dynamoClient.js');
console.log('AWS_REGION:', AWS_REGION);
console.log('AWS_ACCESS_KEY_ID:', AWS_ACCESS_KEY_ID);
console.log('AWS_SECRET_ACCESS_KEY:', AWS_SECRET_ACCESS_KEY);

const dynamoDB = new DynamoDBClient({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    }
});

const documentClient = DynamoDBDocumentClient.from(dynamoDB);
module.exports = { dynamoDB, GetCommand, PutCommand, UpdateCommand, CreateTableCommand, DescribeTableCommand, documentClient };