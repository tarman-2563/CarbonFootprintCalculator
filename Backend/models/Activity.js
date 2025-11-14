const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'default-user',
    required: true
  },
  activityType: {
    type: String,
    enum: ['commute', 'food', 'electricity'],
    required: true
  },
  distance: {
    type: Number,
    default: 0
  },
  transportMode: {
    type: String,
    enum: ['car', 'bus', 'train', 'plane', 'motorcycle', 'bicycle', 'walking'],
    default: 'car'
  },
  foodType: {
    type: String,
    enum: ['beef', 'pork', 'chicken', 'fish', 'dairy', 'vegetables', 'fruits', 'grains'],
    default: 'vegetables'
  },
  quantity: {
    type: Number,
    default: 0
  },
  unit: {
    type: String,
    default: 'kg'
  },
  energyConsumed: {
    type: Number,
    default: 0
  },
  energyUnit: {
    type: String,
    enum: ['kwh', 'mwh'],
    default: 'kwh'
  },
  co2e: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

activitySchema.index({ userId: 1, date: -1 });
activitySchema.index({ activityType: 1, date: -1 });

module.exports = mongoose.model('Activity', activitySchema);

