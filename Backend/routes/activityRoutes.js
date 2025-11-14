const express = require('express');
const {createActivity,getActivities,getActivityById} = require('../controllers/activityController');
const activityRouter = express.Router();

activityRouter.post('/', createActivity);
activityRouter.get('/', getActivities);
activityRouter.get('/:id', getActivityById);

module.exports = activityRouter;

