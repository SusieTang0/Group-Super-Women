const express = require('express');
const bodyParser = require('body-parser');
const client = require('../db');

const paymentRouter = express.Router();
paymentRouter.use(bodyParser.json());


paymentRouter.post('/insertPayment', async (req, res) => {
  try {
    const paymentCollection = client.db('clinic').collection('payment');

    const count = await paymentCollection.countDocuments();

    const maxIdDoc = await paymentCollection.findOne({}, { projection: { paymentId: { $slice: [count - 1, 1] } } });

    const newId = maxIdDoc.paymentId + 1;
  
    const {cardType, cardNumber, ownerName, servicePrice, serviceFee, donation, totalAmount, needRefund,
      createdTimeStamp} = req.body;
    
    await paymentCollection.insertOne({ 
      paymentId: newId,
      cardType: cardType,
      cardNumber: cardNumber, 
      ownerName: ownerName, 
      servicePrice: servicePrice, 
      serviceFee: serviceFee,
      donation: donation, 
      totalAmount: totalAmount,
      needRefund: needRefund,
      createdTimeStamp: createdTimeStamp
     });
    
    res.json(newId);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

paymentRouter.put('/updatePayment/:appointmentId', async (req, res) => {
  try {
    const paymentCollection = client.db('clinic').collection('payment');

    let appointmentId = parseInt(req.params.appointmentId);
    let updatedData = {
      needRefund: req.body.needRefund,
    }
    await paymentCollection.findOneAndUpdate({appointmentId: appointmentId}, { $set: updatedData});
    res.status(204).send({ message: 'Payment updated successfully' });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = paymentRouter;