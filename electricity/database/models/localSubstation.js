import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the LocalSubstation schema
const localSubstationSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  substation_code: {
    type: String,
    required: true,
  },
  dateActiveFrom: {
    type: Date,
    required: true,
  },
  dateActiveTo: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the LocalSubstation model
export const LocalSubstation = mongoose.model('LocalSubstation', localSubstationSchema);
