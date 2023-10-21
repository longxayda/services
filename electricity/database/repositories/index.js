const mongoose = require('mongoose')

const {ElectricityUsage} = require('../models')


class ElectricRepository {
    async updateElectricityConsumption(userId, consumption) {
        try {
          // Find the document by userId
          const userUsage = await ElectricityUsage.findOne({ userId });
      
          if (!userUsage) {
            throw new Error('User not found'); // Handle the case where the user is not found
          }
      
          // Update the currentElectricityConsumption field
          userUsage.currentElectricityConsumption += consumption;
      
          // Save the changes to the document
          await userUsage.save();
      
          console.log('Electricity consumption updated successfully.');
        } catch (error) {
          console.error('Error updating electricity consumption:', error);
        }
      }

      async getCurrentElectricityCost(userId) {
        try {
            // Find the document by userId
            const userUsage = await ElectricUsage.findOne({ userId });
        
            if (!userUsage) {
              throw new Error('User not found'); // Handle the case where the user is not found
            }
        
            // Get the current consumption value
            const currentConsumption = userUsage.currentElectricityConsumption;
        
            // Update the fields
            userUsage.lastPaid = new Date();
            userUsage.lastElectricityConsumption = currentConsumption;
            userUsage.currentElectricityConsumption = 0;
            const electricityCost = currentConsumption*2500;
        
            // Save the changes to the document
            await userUsage.save();
        
            console.log('Electricity data updated successfully.');
            return electricityCost;
          } catch (error) {
            console.error('Error updating electricity data:', error);
          }
      }
}

module.exports = ElectricRepository