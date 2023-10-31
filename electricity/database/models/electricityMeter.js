import mongoose, { Schema } from "mongoose";

const electricityMeterSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  dateActiveFrom: {
    type: Date,
    required: true,
  },
  dateActiveTo: {
    type: Date,
  },
  localSubstation: {
    type: Schema.Types.ObjectId,
    ref: "LocalSubstation",
    required: true,
  },
});

export const ElectricityMeter = mongoose.model(
  "ElectricityMeter",
  electricityMeterSchema
);
