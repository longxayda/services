import { ObjectId } from "mongodb";
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
      // required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Set the default value to the current time
    },
  },
  { collection: "waterUsage" }
);

const waterPaymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      default: new ObjectId(),
    },
    userId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      require: true,
      default: false,
    },
    paidAt: {
      type: Date,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "waterPayment" }
);

export const waterPaymentModel = mongoose.model(
  "waterPayment",
  waterPaymentSchema
);
export const waterUsageModel = mongoose.model("waterUsage", waterUsageSchema);
