const express = require('express');
const bodyParser = require('body-parser');
const client = require('../db');

const contactRouter = express.Router();
contactRouter.use(bodyParser.json());

contactRouter.post('/', (req, res) => {

  
});

module.exports = contactRouter;