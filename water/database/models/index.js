import mongoose from "mongoose";

const waterUsageSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    lastWaterConsumption: {
      type: Number,
      required: true,
    },
    currentWaterConsumption: {
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
  },
  { collection: "waterUsage" }
);

export const waterUsageModel = mongoose.model("waterUsage", waterUsageSchema);
