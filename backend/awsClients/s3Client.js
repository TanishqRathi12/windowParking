const { S3Client, PutObjectCommand, GetObjectCommand,ListObjectsV2Command,DeleteObjectsCommand } = require('@aws-sdk/client-s3');
const {AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY,AWS_BUCKET_NAME} = require('../env.js');
console.log('In s3Client.js');
console.log('AWS_REGION:', AWS_REGION);
console.log('AWS_ACCESS_KEY_ID:', AWS_ACCESS_KEY_ID);
console.log('AWS_SECRET_ACCESS_KEY:', AWS_SECRET_ACCESS_KEY);
console.log('AWS_BUCKET_NAME:',AWS_BUCKET_NAME);

const s3 = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,

    }
});

module.exports = { s3, PutObjectCommand, GetObjectCommand,ListObjectsV2Command,DeleteObjectsCommand };