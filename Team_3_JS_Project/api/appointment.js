const express = require('express');
const bodyParser = require('body-parser');
const client = require('../db');

const appointmentRouter = express.Router();
appointmentRouter.use(bodyParser.json());

appointmentRouter.get('/getAppointment', async (req, res) => {
  try {
    const appointmentCollection = client.db('clinic').collection('appointment');
    
    const appointments = await appointmentCollection.find().toArray();
    
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

appointmentRouter.get('/getAppointmentTime', async (req, res) => {
  try {
    const appointmentCollection = client.db('clinic').collection('appointment');

    const filter = { apptDate: req.query.apptDate }
    
    const appointments = await appointmentCollection.find(filter).toArray();
    
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

appointmentRouter.post('/insertAppointment', async (req, res) => {
  try {
      const appointmentCollection = client.db('clinic').collection('appointment');

      const count = await appointmentCollection.countDocuments();

      const maxIdDoc = await appointmentCollection.findOne({}, { projection: { appointmentId: { $slice: [count - 1, 1] } } });

      const newId = maxIdDoc.appointmentId + 1;
    
      const {serviceName, servicePrice, apptDate, apptTime, createdTimeStamp, status, customerId, 
        paymentId} = req.body;
      
      await appointmentCollection.insertOne({ 
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

module.exports = appointmentRouter;