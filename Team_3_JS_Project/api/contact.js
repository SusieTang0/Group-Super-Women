const express = require('express');
const bodyParser = require('body-parser');
const client = require('../db');

const contactRouter = express.Router();
contactRouter.use(bodyParser.json());

class contactDTO {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}


contactRouter.get('/', async (req, res) => {
  try {
    // const users = await client.db().collection('appointment').find().toArray();
    // res.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

contactRouter.post('/', (req, res) => {
});

module.exports = contactRouter;