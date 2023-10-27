import { waterPaymentModel, waterUsageModel } from "../models/index.js";

export class WaterRepository {
  async updateWaterConsumption(userId, consumption) {
    try {
      // Find the document by userId
      let userUsage = await waterUsageModel.findOne({ userId });
      console.log(userUsage);

      if (!userUsage) {
        const res = await waterUsageModel.create({
          userId: userId,
          lastWaterConsumption: 0,
          currentWaterConsumption: consumption,
          lastPaid: null,
          createdAt: new Date(),
        });
        if (!res) {
          throw new Error("Can't create new user."); // Handle the case where the user is not found
        } else {
          userUsage = res;
          console.log("Added new user to userUsage", userUsage);
        }
      }
      // Update the currentWaterConsumption field
      userUsage.currentWaterConsumption += consumption;

      // Save the changes to the document
      await userUsage.save();

      console.log("Water consumption updated successfully.");
    } catch (error) {
      console.error("Error updating Water consumption:", error);
    }
  }

  async getCurrentWaterCost(userId) {
    try {
      // Find the document by userId
      // console.log(userId);
      const userUsage = await waterUsageModel.findOne({ userId });

      if (!userUsage) {
        throw new Error("User not found"); // Handle the case where the user is not found
      }

      // Get the current consumption value
      const currentConsumption = userUsage.currentWaterConsumption;
      // Update the fields
      const delta =
        userUsage.currentWaterConsumption - userUsage.lastWaterConsumption;
      userUsage.lastWaterConsumption = currentConsumption;
      userUsage.lastPaid = new Date();

      const waterCost = delta * 1000;

      const payload = {
        userId: String(userId),
        createdAt: new Date(),
        amount: waterCost,
        isPaid: false,
      };
      const paidAt = payload.isPaid ? new Date() : null;

      console.log("DEBUGG");
      await waterPaymentModel.collection.insertOne({
        ...payload,
        paidAt: paidAt,
      });

      const payment = await waterPaymentModel.collection.findOne({
        userId: String(userId),
      });
      if (!payment) {
        throw new Error("Payment not found"); // Handle the case where the user is not found
      }
      // Save the changes to the document
      await userUsage.save();

      console.log("Water data updated successfully.Created new payment record");
      return payment;
    } catch (error) {
      console.error("Error updating Water data:", error);
    }
  }
}
