const express = require('express');
const bodyParser = require('body-parser');
const client = require('../db');

const paymentRouter = express.Router();
paymentRouter.use(bodyParser.json());


paymentRouter.post('/insertPayment', async (req, res) => {
  try {
    const paymentCollection = client.db('clinic').collection('payment');

    let lastDoc = await paymentCollection.find().sort({_id:-1}).limit(1).toArray();
    const newId = parseInt(lastDoc[0].paymentId) + 1;
    const payment = req.body;
    
    await paymentCollection.insertOne({ 
      paymentId: newId,
      cardType: payment.cardType,
      cardNumber: payment.cardNumber, 
      ownerName: payment.ownerName, 
      servicePrice: payment.servicePrice, 
      serviceFee: payment.serviceFee,
      donation: payment.donation, 
      totalAmount: payment.totalAmount,
      needRefund: payment.needRefund,
      createdTimeStamp: payment.createdTimeStamp
     });
    
     res.status(204).json({ paymentId: newId });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

paymentRouter.put('/updatePayment/:paymentId', async (req, res) => {
  try {
    const paymentCollection = client.db('clinic').collection('payment');
    let paymentId = parseInt(req.params.paymentId);
    const payment = req.body;
    console.log(req.body.cardType);
    let updatedData = {
      cardType: payment.cardType,
      cardNumber: payment.cardNumber, 
      ownerName: payment.ownerName, 
      servicePrice: payment.servicePrice, 
      serviceFee: payment.serviceFee,
      donation: payment.donation, 
      totalAmount: payment.totalAmount,
      needRefund: payment.needRefund,
      createdTimeStamp: payment.createdTimeStamp
    }
    await paymentCollection.findOneAndUpdate({paymentId: paymentId}, { $set: updatedData});
    res.status(204).send({ message: 'Payment updated successfully' });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = paymentRouter;