const express = require('express');
const bodyParser = require('body-parser');
const client = require('../db');

const feedbackRouter = express.Router();
feedbackRouter.use(bodyParser.json());



feedbackRouter.post('/', (req, res) => {
});

module.exports = feedbackRouter;