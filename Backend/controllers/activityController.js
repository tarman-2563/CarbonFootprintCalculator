const Activity = require('../models/Activity');
const emissionController = require('./emissionController');


const createActivity = async (req, res) => {
  try {
    const {
      userId = 'default-user',
      activityType,
      distance,
      transportMode,
      foodType,
      quantity,
      unit,
      energyConsumed,
      energyUnit,
      date,
      notes
    } = req.body;

    if (!activityType || !['commute', 'food', 'electricity'].includes(activityType)) {
      return res.status(400).json({ error: 'Invalid activity type' });
    }

    let co2e = 0;

    switch (activityType) {
      case 'commute':
        if (distance == null) {
          return res.status(400).json({ error: 'Distance is required for commute' });
        }
        co2e = await emissionController.calculateCommuteEmissions(
          distance,
          transportMode || 'car'
        );
        break;

      case 'food':
        if (quantity == null) {
          return res.status(400).json({ error: 'Quantity is required for food activity' });
        }
        co2e = await emissionController.calculateFoodEmissions(
          foodType || 'vegetables',
          quantity,
          unit || 'kg'
        );
        break;

      case 'electricity':
        if (energyConsumed == null) {
          return res.status(400).json({ error: 'Energy consumed is required for electricity' });
        }
        co2e = await emissionController.calculateElectricityEmissions(
          energyConsumed,
          energyUnit || 'kwh'
        );
        break;
    }

    const activity = new Activity({
      userId,
      activityType,
      distance,
      transportMode,
      foodType,
      quantity,
      unit,
      energyConsumed,
      energyUnit,
      co2e,
      date: date ? new Date(date) : new Date(),
      notes
    });

    await activity.save();

    res.status(201).json({
      success: true,
      message: 'Activity created successfully',
      activity: {
        id: activity._id,
        activityType: activity.activityType,
        co2e: activity.co2e,
        date: activity.date
      }
    });

  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({
      error: 'Failed to create activity',
      message: error.message
    });
  }
}

const getActivities = async (req, res) => {
  try {
    const {
      userId = 'default-user',
      activityType,
      startDate,
      endDate,
      limit = 50
    } = req.query;

    const query = { userId };

    if (activityType) query.activityType = activityType;

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const activities = await Activity.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: activities.length,
      activities: activities.map(a => ({
        id: a._id,
        activityType: a.activityType,
        distance: a.distance,
        transportMode: a.transportMode,
        foodType: a.foodType,
        quantity: a.quantity,
        unit: a.unit,
        energyConsumed: a.energyConsumed,
        energyUnit: a.energyUnit,
        co2e: a.co2e,
        date: a.date,
        notes: a.notes,
        createdAt: a.createdAt
      }))
    });

  } catch (error) {
    console.error('Error getting activities:', error);
    res.status(500).json({ error: 'Failed to get activities', message: error.message });
  }
};

const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await Activity.findById(id);

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.json({
      success: true,
      activity: {
        id: activity._id,
        userId: activity.userId,
        activityType: activity.activityType,
        distance: activity.distance,
        transportMode: activity.transportMode,
        foodType: activity.foodType,
        quantity: activity.quantity,
        unit: activity.unit,
        energyConsumed: activity.energyConsumed,
        energyUnit: activity.energyUnit,
        co2e: activity.co2e,
        date: activity.date,
        notes: activity.notes,
        createdAt: activity.createdAt,
        updatedAt: activity.updatedAt
      }
    });

  } catch (error) {
    console.error('Error getting activity:', error);
    res.status(500).json({ error: 'Failed to get activity', message: error.message });
  }
}

module.exports = {
  createActivity,
  getActivities,
  getActivityById
};