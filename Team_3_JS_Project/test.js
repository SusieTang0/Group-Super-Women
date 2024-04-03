const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function hashPassword(password, salt) {
    const hash = crypto.createHash('sha256');
    return hash.update(password + salt, 'utf-8').digest('hex');
}


const salt = "bd4fe161b858d824d73e58269b10542e";
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
const token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxLCJmaXJzdG5hbWUiOiJTb3BoaWUiLCJsYXN0bmFtZSI6Ikxhcm9jcXVlIiwiZW1haWwiOiJzb3BoaWUubGFyb2NxdWVAZXhhbXBsZS5jb20iLCJwaG9uZSI6IjUxNC01NTUtMTIzNCIsImF2YXRhciI6ImFzc2V0cy9pY29ucy9wZXJzb24tZ3JleS00MC5wbmciLCJhZGRyZXNzIjoiMTIzIFJ1ZSBkZSBsYSBNb250YWduZSIsImNpdHkiOiJNb250cmVhbCIsInByb3ZpbmNlIjoiUXVlYmVjIiwiY291bnRyeSI6IkNhbmFkYSIsInBvc3Rjb2RlIjoiSDNHIDFKMiIsImNvbnRhY3ROYW1lIjoiSmVhbi1QaWVycmUgTGFyb2NxdWUiLCJjb250YWN0UGhvbmUiOiI1MTQtNTU1LTU2NzgiLCJhY2NlcHRFbWFpbE1zZyI6dHJ1ZSwiaWF0IjoxNzEyMTc3NzAxLCJleHAiOjE3MTIxOTkzMDF9.AWtEKy8_PtQ4G3fy85i4wrPlNNOMgZYQfiUhgpDNQ54";

function verifyToken(token) {
  try {

    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {

    return null;
  }
}

const token = generateToken(createdApptData);

// console.log(secret);
console.log(hashPassword(123456, salt));
// console.log(verifyToken(token1));

