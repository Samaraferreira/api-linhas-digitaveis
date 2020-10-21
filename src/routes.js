const express = require('express');

const routes = express.Router();

const LineControllers = require('./controllers/LineControllers');

routes.get('/boleto/:line', LineControllers.index);

module.exports = routes;
