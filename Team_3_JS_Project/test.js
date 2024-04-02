const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function hashPassword(password, salt) {
    const hash = crypto.createHash('sha256');
    return hash.update(password + salt, 'utf-8').digest('hex');
}


const salt = crypto.randomBytes(16).toString('hex');
const secret = Buffer.from('f351f2f7f429ab4456d7d6cd62aa6aee', 'hex');

let createdApptData = {
  apptDate: "2024-04-10", 
  apptTime: "05:00 PM", 
  customerId: 1,  
  paymentId: 6,   
}

let updateCustJson = {

  "firstname": "Philippe",
  "lastname": "Bouchard",
  "email": "philippe.bouchard@example.com",
  "phone": "1514-555-6543",
  "avatar": "avatar1.jpg",
  "city": "Montreal",
  "province": "Quebec",
  "country": "Canada",
  "postcode": "H2W 1S3",
  "contactName": "Elisabeth Bouchard",
  "contactPhone": "514-555-8901",
  "acceptEmailMsg": true

}

function generateToken(customer) {
  const payload = {
      apptDate: customer.apptDate,
      apptTime: customer.apptTime,
      customerId: customer.customerId,
      paymentId: customer.paymentId
  };
  const expiresIn = '6h';

  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
}
const token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjo1LCJmaXJzdG5hbWUiOiJQaGlsaXBwZSIsImxhc3RuYW1lIjoiQm91Y2hhcmQiLCJlbWFpbCI6InBoaWxpcHBlLmJvdWNoYXJkQGV4YW1wbGUuY29tIiwicGhvbmUiOiI1MTQtNTU1LTM0NTYiLCJhdmF0YXIiOiJhdmF0YXI1LmpwZyIsImFkZHJlc3MiOiIxMTEgQXZlbnVlIGRlcyBQaW5zIiwiY2l0eSI6Ik1vbnRyZWFsIiwicHJvdmluY2UiOiJRdWViZWMiLCJjb3VudHJ5IjoiQ2FuYWRhIiwicG9zdGNvZGUiOiJIMlcgMVMzIiwiY29udGFjdE5hbWUiOiJFbGlzYWJldGggQm91Y2hhcmQiLCJjb250YWN0UGhvbiI6IjUxNC01NTUtODkwMSIsImFjY2VwdEVtYWlsTXNnIjpmYWxzZSwiaWF0IjoxNzEyMDQxNjA0LCJleHAiOjE3MTIwNjMyMDR9.gi44bdCv8qf_HyUSnkxrFQ2JgOv57MMCQPDgQEQLyfA";

function verifyToken(token) {
  try {

    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {

    return null;
  }
}

const token = generateToken(createdApptData);

console.log(secret);
console.log(hashPassword(123456, salt));
console.log(verifyToken(token1));

