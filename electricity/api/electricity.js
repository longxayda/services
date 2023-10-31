import {
  ElectricityConsumption,
  ElectricityMeter,
  TransmissionLocal,
} from "../database/models/index.js";

export const electricApp = (app) => {
  app.get("/healthcheck", (req, res, next) => {
    res.send("OK");
  });
  // const electricUsage = new ElectricRepository();

  // app.post("/electricity", async (req, res, next) => {
  //   const { userId, consumption } = req.body;
  //   try {
  //     await electricUsage.updateElectricityConsumption(userId, consumption);
  //     res.status(201).json({
  //       message: "Updated successfully electric usage.",
  //     });
  //   } catch (err) {
  //     res.status(400).json({
  //       message: "Cant update elect usage",
  //     });
  //   }
  // });

  // app.get("/electricity", async (req, res, next) => {
  //   const { userId } = req.body;
  //   try {
  //     console.log("===============+Hera", electricUsage);
  //     const cost = await electricUsage.getCurrentElectricityCost(userId);
  //     res.status(200).json({
  //       cost,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(400).json({
  //       message: "Cant GET elect cost",
  //     });
  //   }
  // });

  app.get("/meter/:meterId/cost", async (req, res) => {
    try {
      const { meterId } = req.params;
      const { year, month } = req.query;

      // Validate the year and month inputs as needed

      // Find the electricity meter
      const meter = await ElectricityMeter.findById(meterId);

      if (!meter) {
        return res.status(404).json({ message: "Electricity meter not found" });
      }

      // Calculate the total consumption for the specified month
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);

      const consumption = await ElectricityConsumption.aggregate([
        {
          $match: {
            electricityMeter: meter._id,
            reportDate: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalQuantity: { $sum: "$quantity" },
          },
        },
      ]);

      const totalQuantity =
        consumption.length > 0 ? consumption[0].totalQuantity : 0;

      // Find the applicable electricity rate (you may need to adapt this based on your data model)
      const electricityRate = 2500;

      if (!electricityRate) {
        return res.status(404).json({ message: "Electricity rate not found" });
      }

      // Calculate the total cost
      const totalCost = totalQuantity * electricityRate.rate;

      return res.status(200).json({ totalCost });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred" });
    }
  });

  app.post("/meter/:meterId", async (req, res) => {
    try {
      const { meterId } = req.params;
      const { quantity } = req.body;

      // Find the electricity meter by meterId
      const meter = await ElectricityMeter.findById(meterId);

      if (!meter) {
        return res.status(404).json({ message: "Electricity meter not found" });
      }

      // Update the electricity consumption record for the meter
      const consumption = await ElectricityConsumption.findOne({
        electricityMeter: meter._id,
      });

      if (!consumption) {
        return res
          .status(404)
          .json({ message: "Electricity consumption record not found" });
      }

      consumption.quantity = quantity;
      await consumption.save();

      // Update the dailyTransmissionLocal record
      const dailyTransmission = await TransmissionLocal.findOne({
        localSubstation: meter.localSubstation,
      });

      if (!dailyTransmission) {
        return res
          .status(404)
          .json({ message: "Daily transmission record not found" });
      }

      dailyTransmission.quantity = quantity;
      await dailyTransmission.save();

      return res
        .status(200)
        .json({ message: "Energy consumption updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred" });
    }
  });

  app.get("/meter/:meterId/cost", async (req, res) => {
    try {
      const { meterId } = req.params;
      const { year, month } = req.query;

      // Validate the year and month inputs as needed

      // Find the electricity meter
      const meter = await ElectricityMeter.findById(meterId);

      if (!meter) {
        return res.status(404).json({ message: "Electricity meter not found" });
      }

      // Calculate the total consumption for the specified month
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);

      const consumption = await ElectricityConsumption.aggregate([
        {
          $match: {
            electricityMeter: meter._id,
            reportDate: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalQuantity: { $sum: "$quantity" },
          },
        },
      ]);

      const totalQuantity =
        consumption.length > 0 ? consumption[0].totalQuantity : 0;

      // Find the applicable electricity rate (you may need to adapt this based on your data model)
      const electricityRate = 2500;

      if (!electricityRate) {
        return res.status(404).json({ message: "Electricity rate not found" });
      }

      // Calculate the total cost
      const totalCost = totalQuantity * electricityRate.rate;

      return res.status(200).json({ totalCost });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred" });
    }
  });

  router.get("/local-transmission/:meterId", async (req, res) => {
    try {
      const { meterId } = req.params;
      const { year, month } = req.query;

      // Validate the year and month inputs as needed

      // Find the electricity meter
      const meter = await ElectricityMeter.findById(meterId);

      if (!meter) {
        return res.status(404).json({ message: "Electricity meter not found" });
      }

      // Calculate the start and end dates for the specified month
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);

      // Query daily transmission data for the specified meter and month
      const transmissionData = await TransmissionLocal.find({
        electricityMeter: meter._id,
        reportDate: {
          $gte: startDate,
          $lte: endDate,
        },
      });

      return res.status(200).json(transmissionData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred" });
    }
  });

  // app.post('/signup', async (req,res,next) => {
  //     const { email, password, phone } = req.body;
  //     const { data } = await service.SignUp({ email, password, phone});
  //     res.json(data);

  // });

  // app.get('/wishlist', UserAuth, async (req,res,next) => {
  //     const { _id } = req.user;
  //     const { data } = await service.GetWishList( _id);
  //     return res.status(200).json(data);
  // });

  // app.get('/whoami', (req,res,next) => {
  //     return res.status(200).json({msg: '/customer : I am Customer Service'})
  // })
};
