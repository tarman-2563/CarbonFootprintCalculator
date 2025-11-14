const express = require('express');
const {calculateEmissions,getTotalEmissions,getEmissionsByPeriod} = require('../controllers/emissionController');
const emissionRouter = express.Router();

emissionRouter.post('/calculate', calculateEmissions);
emissionRouter.get('/total', getTotalEmissions);
emissionRouter.get('/period', getEmissionsByPeriod);

module.exports = emissionRouter;

