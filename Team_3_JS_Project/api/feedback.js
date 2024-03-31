const express = require('express');
const bodyParser = require('body-parser');
const client = require('../db');

const feedbackRouter = express.Router();
feedbackRouter.use(bodyParser.json());

class feedbackDTO {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}


feedbackRouter.get('/', async (req, res) => {
  try {
    // const users = await client.db().collection('appointment').find().toArray();
    // res.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

feedbackRouter.post('/', (req, res) => {
});

module.exports = feedbackRouter;