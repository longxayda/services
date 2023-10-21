const mongoose = require('mongoose');

const electricUsageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  lastElectricityConsumption: {
    type: Number,
    required: true,
  },
  currentElectricityConsumption: {
    type: Number,
    required: true,
  },
  lastPaid: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current time
  },
});

const ElectricUsage = mongoose.model('ElectricUsage', electricUsageSchema);

module.exports = ElectricUsage;