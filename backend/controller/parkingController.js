const { documentClient } = require('../awsClients/dynamoClient');
const { PutCommand } = require('@aws-sdk/lib-dynamodb');
const { generateHash } = require('../utils/hashUtils');

// Add a new parking space
const addParkingSpace = async (adminId, spaceData) => {
    const spaceId = generateHash(spaceData.locationName + spaceData.latitude + spaceData.longitude);
    const parkingSpace = {
        PK: `SPACE#${spaceId}`,
        SK: `METADATA#${spaceId}`,
        ...spaceData
    };

    const tableName = `${adminId}_mobileDevice_ParkingSpace`;

    await documentClient.send(new PutCommand({
        TableName: tableName,
        Item: parkingSpace,
    }));

    console.log(`Parking space added with ID: ${spaceId}`);
    return parkingSpace;
};

module.exports = {
    addParkingSpace
};