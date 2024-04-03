const express = require('express');
const bodyParser = require('body-parser');
const client = require('../db');

const paymentRouter = express.Router();
paymentRouter.use(bodyParser.json());

paymentRouter.get('/insertPayment', async (req, res) => {
  try {
    // const users = await client.db().collection('appointment').find().toArray();
    // res.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

paymentRouter.post('/insertPayment', async (req, res) => {
  try {
    const paymentCollection = client.db('clinic').collection('payment');

    const count = await paymentCollection.countDocuments();

    const maxIdDoc = await paymentCollection.findOne({}, { projection: { paymentId: { $slice: [count - 1, 1] } } });

    const newId = maxIdDoc.paymentId + 1;
  
    const {serviceName, servicePrice, apptDate, apptTime, createdTimeStamp, status, customerId, 
      paymentId} = req.body;
    
    await paymentCollection.insertOne({ 
      appointmentId: newId,
      serviceName: serviceName,
      servicePrice:servicePrice,
      apptDate: apptDate,
      apptTime: apptTime,
      createdTimeStamp: createdTimeStamp,
      status: status,
      customerId: customerId,
      paymentId: paymentId
     });
    
    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

module.exports = paymentRouter;