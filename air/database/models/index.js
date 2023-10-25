import mongoose from 'mongoose';

const airQualitySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    ozone: {
      type: Number,
      required: true,
    },
    particulateMatter: {
      type: Number,
      required: true,
    },
    oxygen: {
      type: Number,
      required: true,
    },
    nitrogenDioxide: {
      type: Number,
      required: true,
    },
    carbonDioxide: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
    },
  },
  { collection: 'AirQuality' }
);

export const AirQuality = mongoose.model('AirQuality', airQualitySchema);
