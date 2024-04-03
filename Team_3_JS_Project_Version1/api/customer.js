const express = require('express');
const bodyParser = require('body-parser');
const client = require('../db');

const customerRouter = express.Router();
customerRouter.use(bodyParser.json());

class customerDTO {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}


customerRouter.get('/', async (req, res) => {
  try {
    // const users = await client.db().collection('appointment').find().toArray();
    // res.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

customerRouter.post('/', (req, res) => {

  
});

module.exports = customerRouter;