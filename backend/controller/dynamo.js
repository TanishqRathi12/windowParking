// const bcrypt = require('bcrypt');
// const { documentClient, dynamoDB } = require('../awsClients/dynamoClient');
// const { CreateTableCommand, waitForTableExists, DescribeTableCommand, ScanCommand } = require('@aws-sdk/client-dynamodb');
// const { PutCommand, GetCommand,DeleteCommand, UpdateCommand,QueryCommand } = require('@aws-sdk/lib-dynamodb');
// const { generateHash } = require('../utils/hashUtils');

 
// const tableName = 'Hostel_Organizations';
 
// const createTable = async (tableName, partitionKey, sortKey) => {
//     const schema = schemas[tableName] || schemas.default;
//     const params = {
//         TableName: tableName,
//         KeySchema: [
//             { AttributeName: partitionKey, KeyType: 'HASH' },
//             { AttributeName: sortKey, KeyType: 'RANGE' }
//         ],
//         AttributeDefinitions: [
//             { AttributeName: partitionKey, AttributeType: schema[partitionKey] },
//             { AttributeName: sortKey, AttributeType: schema[sortKey] }
//         ],
//         BillingMode: 'PAY_PER_REQUEST',
//         GlobalSecondaryIndexes: []
//             };
            
        
//     if (tableName.endsWith('_students')) {
//         params.AttributeDefinitions.push(
//             { AttributeName: 'position', AttributeType: 'S' },
//             { AttributeName: 'wardenId', AttributeType: 'S' },
//             { AttributeName: 'role', AttributeType: 'S' }
//         );
//         params.GlobalSecondaryIndexes.push(
//             {
//                 IndexName: 'position-index',
//                 KeySchema: [
//                     { AttributeName: 'position', KeyType: 'HASH' }
//                 ],
//                 Projection: {
//                     ProjectionType: 'ALL'
//                 }
//             },
//             {
//                 IndexName: 'wardenId-index',
//                 KeySchema: [
//                     { AttributeName: 'wardenId', KeyType: 'HASH' }
//                 ],
//                 Projection: {
//                     ProjectionType: 'ALL'
//                 }
//             },
//             {
//                 IndexName: 'role-index',
//                 KeySchema: [
//                     { AttributeName: 'role', KeyType: 'HASH' }
//                 ],
//                 Projection: {
//                     ProjectionType: 'ALL'
//                 }
//             }
//         );
//     } else if (tableName.endsWith('_attendance')) {
//         params.AttributeDefinitions.push(
//             { AttributeName: 'empId', AttributeType: 'S' }
//         );
//         params.GlobalSecondaryIndexes.push(
//             {
//                 IndexName: 'empId-index',
//                 KeySchema: [
//                     { AttributeName: 'empId', KeyType: 'HASH' }
//                 ],
//                 Projection: {
//                     ProjectionType: 'ALL'
//                 }
//             }
//         );
//     }

//     // Ensure that GlobalSecondaryIndexes is not empty before sending the command
//     if (params.GlobalSecondaryIndexes.length === 0) {
//         delete params.GlobalSecondaryIndexes;
//     }

//     try {
//         await dynamoDB.send(new CreateTableCommand(params));
//         console.log(`Table ${tableName} creation initiated`);
//     } catch (error) {
//         if (error.name === 'ResourceInUseException') {
//             console.log(`Table ${tableName} already exists`);
//         } else {
//             throw error;
//         }
//     }
// };
 
// const waitForTable = async (tableName) => {
//     try {
//         await waitForTableExists(
//             { client: dynamoDB, maxWaitTime: 60, minDelay: 5 },
//             { TableName: tableName }
//         );
//         console.log(`Table ${tableName} is now active`);
//     } catch (error) {
//         console.error(`Error waiting for table ${tableName} to become active:`, error);
//         throw error;
//     }
// };
 
// const checkTableExists = async (tableName) => {
//     try {
//         await dynamoDB.send(new DescribeTableCommand({ TableName: tableName }));
//         return true;
//     } catch (error) {
//         if (error.name === 'ResourceNotFoundException') {
//             return false;
//         }
//         throw error;
//     }
// };
 
// const ensureOrganizationsTableExists = async () => {
//     const tableExists = await checkTableExists(tableName);
//     if (!tableExists) {
//         await createTable(tableName, 'PK', 'SK');
//         await waitForTable(tableName);
//     }
// };
 
// const createstudent = async (orgId, HostelName, studentData) => {
//     const orgInitials = HostelName.toLowerCase().substring(0, 3);
//     const combinedString = `${HostelName}-${studentData.firstName}`;
//     const studentId = generateHash(combinedString);
//     const student = {
//         PK: `${orgInitials}#${orgId}`,
//         SK: `${studentId}`,
//         id: studentId,
//         ...studentData,
//         wardenId: studentData.wardenId || 'N/A',
//         position: studentData.position || 'N/A',
//     };
 
//     await documentClient.send(new PutCommand({
//         TableName: `${orgInitials}_${orgId}_students`,
//         Item: student,
//     }));
 
//     console.log(`student created successfully with ID: ${studentId}`);
//     return student;
// };
 
// const registerAdmin = async (studentName, password, HostelName) => {
//     console.log("registerAdmin", studentName, password, HostelName);
//   await ensureOrganizationsTableExists();

//   const studentId = generateHash(HostelName);
//   console.log("studentId", studentId);
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const orgInitials = HostelName.toLowerCase().substring(0, 3);

//   const organization = {
//       PK: `${orgInitials}#${studentId}`,
//       SK: `METADATA#${studentId}`,
//       id: studentId,
//       adminName:studentName,
//       password: hashedPassword,
//       HostelName,
//   };

//   const existingOrg = await documentClient.send(new GetCommand({
//       TableName: tableName,
//       Key: {
//           PK: `${orgInitials}#${studentId}`,
//           SK: `METADATA#${studentId}`,
//       },
//   }));

//   if (existingOrg.Item) {
//       throw new Error('Organization already exists');
//   }

//   await documentClient.send(new PutCommand({
//       TableName: tableName,
//       Item: organization,
//   }));

//   const tables = ['students','studentData','attendance','complaints'];
//   for (const table of tables) {
//       await createTable(`${orgInitials}_${studentId}_${table}`, 'PK', 'SK');
//       await waitForTable(`${orgInitials}_${studentId}_${table}`);
//   }

//   // Create IAM role and policy for the organization
// //  const roleName = await createOrganizationRoleAndPolicy(studentId, orgInitials);

//    // Create admin entry in the organization's student table
//   const adminData = {
//       firstName: studentName,
//       lastName: '',
//       email: `${studentName}@${HostelName}.com`,
//       role: 'admin',
//       password: hashedPassword,
//       wardenId: '',
//       teamName: '',
//       teamMembers: '',
//       position:'admin',
//       features: ['manualOnboard','manageLeave','dashboard','addstudent','showAllstudent','deletestudent','editstudent','manageTeam','admin/attendance','manageTeam','createTeam','editTeam','deleteTeam','showTeam'],
//   };

//   const studentData = {
//     firstName :'Anubhav',
//     studentId : 'anu',
//     hashStudentName : `${generateHash(studentName)}`,
//     role:'student',
//     password:hashedPassword,
//     studentEmail : 'anubhavj280@gmail.com',
//     parentsEmail : 'anubhavj280@gmail.com',
//     wardenId: 'N/A',
//     bloodGroup:'B+',
//   }

//   const wardenData = {
//     firstName :'Deepraj',
//     studentId : 'deep',
//     hashStudentName : `${generateHash(studentName)}`,
//     role:'warden',
//     password:hashedPassword,
//     studentEmail : 'anubhavj280@gmail.com',
//     parentsEmail : 'anubhavj280@gmail.com',
//     wardenId: 'N/A',
//     bloodGroup:'B+',
//   }

//   const wardenData1 = {
//     firstName :'Rajesh',
//     studentId : 'raj',
//     hashStudentName : `${generateHash(studentName)}`,
//     role:'warden',
//     password:hashedPassword,
//     studentEmail : 'anubhavj280@gmail.com',
//     parentsEmail : 'anubhavj280@gmail.com',
//     wardenId: 'N/A',
//     bloodGroup:'B+',
//   }
 
//   const admin = await createstudent(studentId, HostelName, adminData);
//   const student = await createstudent(studentId, HostelName, studentData);
//   const wardenData2 = await createstudent(studentId, HostelName, wardenData);
//   const wardenData3 = await createstudent(studentId, HostelName, wardenData1);


//   return { organization, admin, student,wardenData2,wardenData3 };
// };

// const updateItemData = async (tableName, pk, sk, updateData) => {
//     const updateExpressions = [];
//     const expressionAttributeNames = {};
//     const expressionAttributeValues = {};

//     for (const [key, value] of Object.entries(updateData)) {
//         updateExpressions.push(`#${key} = :${key}`);
//         expressionAttributeNames[`#${key}`] = key;
//         expressionAttributeValues[`:${key}`] = value;
//     }

//     const updateExpression = `SET ${updateExpressions.join(', ')}`;

//     const params = {
//         TableName: tableName,
//         Key: {
//             PK: pk,
//             SK: sk
//         },
//         UpdateExpression: updateExpression,
//         ExpressionAttributeNames: expressionAttributeNames,
//         ExpressionAttributeValues: expressionAttributeValues,
//         ReturnValues: 'UPDATED_NEW'
//     };

//     try {
//         await documentClient.send(new UpdateCommand(params));
//         console.log(`Item updated successfully in table ${tableName}`);
//     } catch (error) {
//         console.error(`Error updating item in table ${tableName}:`, error);
//         throw error;
//     }
// };
 
// const saveDataOnDynamo = async (tableName, pk, sk, data) => {
//     const item = {
//       PK: pk,
//       SK: sk,
//       ...data,
//     };
 
//     try {
//         await documentClient.send(new PutCommand({
//             TableName: tableName,
//             Item: item,
//         }));
//         console.log(`Data saved successfully in table ${tableName}`);
//         return item;
//     } catch (error) {
//         console.error(`Error saving data to table ${tableName}:`, error);
//         throw error;
//     }
// };

// const getTableData = async (tableName) => {
//     try {
//         const data = await dynamoDB.send(new ScanCommand({ TableName: tableName }));
//         return data.Items;
//     } catch (error) {
//         console.error(`Error retrieving data from table ${tableName}:`, error);
//         throw error;
//     }
// };
 


// const deletestudentData = async (data) => {
//     try{
//         const organization = data.organization;
//         const studentId = data.studentId;
//         const hashOrg = generateHash(organization);
//         const combineString = `${organization}-${studentId}`;
//         const orgIntials = organization.substring(0,3);
//         const pk1 = `${orgIntials}#${hashOrg}`;
//         const sk1 = generateHash(combineString);
//         const tables = ['students', 'studentData', 'attendance', 'leaveData'];

//         for (const table of tables) {
//             const tableName = `${orgIntials}_${hashOrg}_${table}`;
//             let defaultSk = sk1;

//             //use studentId for sk if table is leaveData table
//             if(table === 'leaveData'){
//                 defaultSk = studentId;
//             }
//             try{
//             await documentClient.send(new DeleteCommand({
//                 TableName: tableName,
//                 Key: {
//                     PK: pk1,
//                     SK: defaultSk,
//                 },
//             }));
//             console.log(`student data deleted successfully from table ${tableName}`);
//         }catch(error){
    //           if (error.name === 'ResourceNotFoundException') {
        //             console.log(`Table ${tableName} does not exist, skipping...`);
//         } else if (error.name === 'ConditionalCheckFailedException') {
//             console.log(`student data not found in table ${tableName}, skipping...`);
//         } else {
//             console.error(`Error deleting student data from table ${tableName}:`, error);
//             throw error; // Rethrow the error if it's not a known issue
//         }
//     }
//   }
// }
// catch(error){

//     console.log("error in deleting student data: ",error);
// }
// }

// const updatestudentRecords = async (tableName, pk, sk, updateData) => {
//     const updateExpressions = [];
//     const removeExpressions = [];
//     const expressionAttributeNames = {};
//     const expressionAttributeValues = {};
  
//     for (const [key, value] of Object.entries(updateData)) {
    //         if (value !== undefined) { // Ensure no undefined values are included
    //             if (value === null) {
//                 removeExpressions.push(`#${key}`);
//                 expressionAttributeNames[`#${key}`] = key;
//             } else {
//                 updateExpressions.push(`#${key} = :${key}`);
//                 expressionAttributeNames[`#${key}`] = key;
//                 expressionAttributeValues[`:${key}`] = value;
//             }
//         }
//     }
  
//     const updateExpression = updateExpressions.length > 0 ? `SET ${updateExpressions.join(', ')}` : '';
//     const removeExpression = removeExpressions.length > 0 ? `REMOVE ${removeExpressions.join(', ')}` : '';
//     const combinedExpression = [updateExpression, removeExpression].filter(Boolean).join(' ');
  
//     const params = {
//         TableName: tableName,
//         Key: {
//             PK: pk,
//             SK: sk
//         },
//         UpdateExpression: combinedExpression,
//         ExpressionAttributeNames: expressionAttributeNames,
//         ReturnValues: 'UPDATED_NEW'
//     };
  
//     if (Object.keys(expressionAttributeValues).length > 0) {
//         params.ExpressionAttributeValues = expressionAttributeValues;
//     }
  
//     try {
//         await documentClient.send(new UpdateCommand(params));
//         console.log(`student record updated successfully in table ${tableName}`);
//     } catch (error) {
//         console.error(`Error updating student record in table ${tableName}:`, error);
//         throw error;
//     }
//   };

//   module.exports = {
    //     registerAdmin,
//     createstudent,
//     updateItemData,
//     saveDataOnDynamo,
//     getTableData,
//     getItemData,
//     deletestudentData,
//     updatestudentRecords,
//   }

const bcrypt = require('bcrypt');
const { documentClient, dynamoDB } = require('../awsClients/dynamoClient');
const { CreateTableCommand, waitForTableExists, DescribeTableCommand, ScanCommand } = require('@aws-sdk/client-dynamodb');
const { PutCommand, GetCommand, DeleteCommand, UpdateCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
const { generateHash } = require('../utils/hashUtils');

const adminTableName = 'Parking_Organizations';

const getItemData = async (tableName, pk, sk) => {
    try {
        const result = await documentClient.send(new GetCommand({
            TableName: tableName,
            Key: {
                PK: pk,
                SK: sk,
            },
        }));
        return result.Item;
    } catch (error) {
        console.error(`Error retrieving item from table ${tableName}:`, error);
        throw error;
    }
};

const createTable = async (tableName, partitionKey, sortKey) => {
    console.log("Creating table",tableName);
    const params = {
        TableName: tableName,
        KeySchema: [
            { AttributeName: partitionKey, KeyType: 'HASH' },
            { AttributeName: sortKey, KeyType: 'RANGE' }
        ],
        AttributeDefinitions: [
            { AttributeName: partitionKey, AttributeType: 'S' },
            { AttributeName: sortKey, AttributeType: 'S' }
        ],
        BillingMode: 'PAY_PER_REQUEST'
    };

    try {
        await dynamoDB.send(new CreateTableCommand(params));
        console.log(`Table ${tableName} creation initiated`);
    } catch (error) {
        if (error.name === 'ResourceInUseException') {
            console.log(`Table ${tableName} already exists`);
        } else {
            throw error;
        }
    }
};

const waitForTable = async (tableName) => {
    console.log("Waiting for table to become active");
    try {
        await waitForTableExists(
            { client: dynamoDB, maxWaitTime: 60, minDelay: 5 },
            { TableName: tableName }
        );
        console.log(`Table ${tableName} is now active`);
    } catch (error) {
        console.error(`Error waiting for table ${tableName} to become active:`, error);
        throw error;
    }
};

const checkTableExists = async (tableName) => {
    console.log("Checking table exists");
    try {
        await dynamoDB.send(new DescribeTableCommand({ TableName: tableName }));
        return true;
    } catch (error) {
        if (error.name === 'ResourceNotFoundException') {
            return false;
        }
        throw error;
    }
};

const ensureOrganizationsTableExists = async () => {
    const adminTableName = 'Parking_Organizations';
    console.log("Checking organization table exists");
    const tableExists = await checkTableExists(adminTableName);
    if (!tableExists) {
        await createTable(adminTableName, 'PK', 'SK');
        await waitForTable(adminTableName);
    }
};

const registerAdmin = async (adminName, email, password) => {
    console.log("registerAdmin", adminName, email, password);
    await ensureOrganizationsTableExists();

    const adminId = generateHash(email);
    console.log("adminId", adminId);
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminData = {
        PK: `ADMIN#${adminId}`,
        SK: `METADATA#${adminId}`,
        id: adminId,
        adminName: adminName,
        email: email,
        password: hashedPassword
    };
    console.log("adminData",adminData);

    // const existingAdmin = await documentClient.send(new GetCommand({
    //     TableName: adminTableName,
    //     Key: {
    //         PK: `ADMIN#${adminId}`,
    //         SK: `METADATA#${adminId}`,
    //     },
    // }));

    // if (existingAdmin.Item) {
    //     throw new Error('Admin already exists');
    // }

    await documentClient.send(new PutCommand({
        TableName: adminTableName,
        Item: adminData,
    }));

    console.log(`Admin registered successfully with ID: ${adminId}`);
    return adminData;
};

const loginAdmin = async (email, password) => {
    console.log("loginAdmin", email);

    try {
        // Generate the admin ID from the email
        const adminId = generateHash(email);
        console.log("adminId", adminId);

        // Retrieve the admin data from the database
        const adminData = await getItemData(adminTableName, `ADMIN#${adminId}`, `METADATA#${adminId}`);

        if (!adminData) {
            throw new Error('Admin not found');
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, adminData.password);
        if (!passwordMatch) {
            throw new Error('Invalid password');
        }

        console.log("Admin logged in successfully");
        return { message: 'Login successful', adminData };
    } catch (error) {
        console.error("Error during admin login:", error);
        throw error;
    }
};

module.exports = {
    registerAdmin,
    createTable,
    waitForTable,
    checkTableExists,
    ensureOrganizationsTableExists,
    loginAdmin
};

