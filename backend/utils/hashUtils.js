const crypto = require('crypto');

const SALT = '3e6e7f9d3f3e5184'; // Replace with a secure, secret salt

const generateHash = (text) => {
    return crypto.createHash('sha256').update(text.toLowerCase() + SALT).digest('hex').toString('base64').substring(0,16).replace(/[^a-zA-Z0-9]/g, '');
    
};

module.exports = { generateHash };