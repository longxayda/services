import mongoose, { Schema } from "mongoose";

const transmissionLocalSchema = new Schema({
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
  localSubstation: {
    type: Schema.Types.ObjectId,
    ref: "LocalSubstation",
    required: true,
  },
});

// Create the DailyTransmissionLocal model
export const TransmissionLocal = mongoose.model(
  "TransmissionLocal",
  transmissionLocalSchema
);
