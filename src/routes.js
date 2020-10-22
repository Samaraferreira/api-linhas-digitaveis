const express = require('express');

const routes = express.Router();

const LineController = require('./controllers/LineController');

routes.get('/boleto/:line', LineController.index);

module.exports = routes;
