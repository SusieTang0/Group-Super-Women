const express = require('express');
const bodyParser = require('body-parser');
const client = require('../db');
const appointmentRouter = express.Router();
appointmentRouter.use(bodyParser.json());

appointmentRouter.get('/getAppointment', async (req, res) => {
  try {
    const appointmentCollection = client.db('clinic').collection('appointment');
    let customerId = parseInt(req.query.customerId);
    const appointments = await appointmentCollection.find({ customerId: customerId }).toArray();
    res.send(appointments);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

appointmentRouter.get('/getAppointmentTime', async (req, res) => {
  try {
    const appointmentCollection = client.db('clinic').collection('appointment');

    const filter = { apptDate: req.query.apptDate, serviceName: req.query.serviceName };
    
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
    let lastDoc = await appointmentCollection.find().sort({_id:-1}).limit(1).toArray();
    const appointmentId = parseInt(lastDoc[0].appointmentId) + 1;
    const appt = req.body;
    await appointmentCollection.insertOne({ 
      appointmentId: appointmentId,
      serviceName: appt.serviceName,
      servicePrice: appt.servicePrice,
      apptDate: appt.apptDate,
      apptTime: appt.apptTime,
      createdTimeStamp: new Date().toISOString(),
      status: "uncompleted",
      customerId: appt.customerId,
      paymentId: appt.paymentId,
      feedbackCompleted: false
    });
    res.status(201).json(appointmentId);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

appointmentRouter.delete('/deleteAppointment', async (req, res) => {
  try {
    const appointmentCollection = client.db('clinic').collection('appointment');

    let appointmentId = parseInt(req.query.appointmentId);
    let response = await appointmentCollection.findOneAndDelete({appointmentId: appointmentId});
    res.status(200).json({paymentId: response.paymentId});
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

appointmentRouter.put('/updateAppointment/:appointmentId', async (req, res) => {
  try {
    const appointmentCollection = client.db('clinic').collection('appointment');

    let appointmentId = parseInt(req.params.appointmentId);
    let updatedData = {
      apptDate: req.body.apptDate,
      apptTime: req.body.apptTime
    }
    await appointmentCollection.findOneAndUpdate({appointmentId: appointmentId}, { $set: updatedData});
    res.status(204).json({ message: 'Appointment updated successfully' });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

appointmentRouter.put('/feedbackCompleted/:appointmentId', async (req, res) => {
  try {
    const appointmentCollection = client.db('clinic').collection('appointment');

    let appointmentId = parseInt(req.params.appointmentId);
    let response = await appointmentCollection.findOneAndUpdate({appointmentId: appointmentId}, { $set: {feedbackCompleted: true}});
    res.status(204).json({ message: `Feedback registered for appointment #${response.appointmentId}` });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = appointmentRouter;