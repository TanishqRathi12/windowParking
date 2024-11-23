const { IAMClient } = require('@aws-sdk/client-iam');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION ,AWS_ACCOUNT_ID} = require('../env.js');

const iam = new IAMClient({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
    accountId: AWS_ACCOUNT_ID
});

module.exports = { iam };