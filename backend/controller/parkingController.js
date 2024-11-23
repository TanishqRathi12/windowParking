const { documentClient } = require('../awsClients/dynamoClient');
const { PutCommand, GetCommand, DeleteCommand, UpdateCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
const { getItemData, getTableData } = require('./dynamo');
const { generateHash } = require('../utils/hashUtils');
const { unmarshall } = require('@aws-sdk/util-dynamodb');

const { haversineDistance } = require('../utils/geoUtils');

// Add a new parking space
const addParkingSpace = async (adminId, spaceData) => {
    console.log(spaceData);
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

// Fetch a specific parking space
const getParkingSpace = async (adminId, spaceId) => {
    const tableName = `${adminId}_mobileDevice_ParkingSpace`;
    const data = await getItemData(tableName, `SPACE#${spaceId}`, `METADATA#${spaceId}`);
    return data ? unmarshall(data) : null;
};

// Fetch all parking spaces for an admin
const getAllParkingSpaces = async (adminId) => {
    const tableName = `${adminId}_mobileDevice_ParkingSpace`;
    const data = await getTableData(tableName);
    return data.map(item => unmarshall(item));
};

const findNearestParkingSpaces = async (adminId, latitude, longitude, maxDistance = 5) => {
    const allSpaces = await getAllParkingSpaces(adminId);
    const nearbySpaces = allSpaces.filter(space => {
        const distance = haversineDistance(latitude, longitude, space.latitude, space.longitude);
        return distance <= maxDistance;
    });

    return nearbySpaces.map(space => ({
        locationName: space.locationName,
        latitude: space.latitude,
        longitude: space.longitude,
        pricePerVehicle: space.pricePerVehicle,
        distance: haversineDistance(latitude, longitude, space.latitude, space.longitude)
    }));
};


module.exports = {
    addParkingSpace,
    getParkingSpace,
    getAllParkingSpaces
};