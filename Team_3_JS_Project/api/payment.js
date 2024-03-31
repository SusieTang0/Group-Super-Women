const express = require('express');
const bodyParser = require('body-parser');
const client = require('../db');

const paymentRouter = express.Router();
paymentRouter.use(bodyParser.json());

paymentRouter.get('/', async (req, res) => {
  try {
    // const users = await client.db().collection('appointment').find().toArray();
    // res.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

paymentRouter.post('/', (req, res) => {
});

module.exports = paymentRouter;