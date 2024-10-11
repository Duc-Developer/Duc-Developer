const fs = require('fs');
require('dotenv').config();

const base64String = process.env.CERTIFICATE_BASE64;
const decodedString = Buffer.from(base64String, 'base64').toString('utf-8');

fs.writeFileSync('my-cerf.json', decodedString);
console.log('Decoded Base64 string and wrote to my-cerf.json');