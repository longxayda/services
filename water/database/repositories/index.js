import { waterUsageModel } from "../models/index.js";

export class WaterRepository {
  async updateWaterConsumption(userId, consumption) {
    try {
      // Find the document by userId
      console.log(userId);
      const userUsage = await waterUsageModel.findOne({ userId });
      console.log(userUsage);

      if (!userUsage) {
        throw new Error("User not found"); // Handle the case where the user is not found
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
      ``;

      if (!userUsage) {
        throw new Error("User not found"); // Handle the case where the user is not found
      }

      // Get the current consumption value
      const currentConsumption = userUsage.currentWaterConsumption;

      // Update the fields
      userUsage.lastPaid = new Date();
      userUsage.lastWaterConsumption = currentConsumption;
      userUsage.currentWaterConsumption = 0;
      const waterCost = currentConsumption * 1000;

      // Save the changes to the document
      await userUsage.save();

      console.log("Water data updated successfully.");
      return waterCost;
    } catch (error) {
      console.error("Error updating Water data:", error);
    }
  }
}
