import mongoose, { Schema } from "mongoose";

// Define the ElectricityConsumption schema
const electricityConsumptionSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  reportDate: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  electricityMeter: {
    type: Schema.Types.ObjectId,
    ref: "ElectricityMeter",
    required: true,
  },
});

// Create the ElectricityConsumption model
export const ElectricityConsumption = mongoose.model(
  "ElectricityConsumption",
  electricityConsumptionSchema
);
