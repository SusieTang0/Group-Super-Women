const express = require('express');
const bodyParser = require('body-parser');
const client = require('../db');

const contactRouter = express.Router();
contactRouter.use(bodyParser.json());

contactRouter.post('/insertContact', (req, res) => {

  
});

module.exports = contactRouter;