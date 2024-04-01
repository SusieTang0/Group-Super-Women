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

function verifyToken(token) {
  try {

    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {

    return null;
  }
}

const token = generateToken(createdApptData);

console.log(salt);
console.log(hashPassword(123456, salt));
console.log(verifyToken(token));
