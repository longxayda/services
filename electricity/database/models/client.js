import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  electricityMeter: {
    type: Schema.Types.ObjectId,
    ref: "ElectricityMeter",
    unique: true, // One client has only one electricity meter
    required: true,
  },
});

// Create the Client model
const Client = mongoose.model("Client", clientSchema);
