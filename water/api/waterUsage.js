import { WaterRepository } from "../database/repositories/index.js";
import { waterUsageModel } from "../database/models/index.js";

export const waterApp = (app) => {
  const waterUsage = new WaterRepository();

  app.post("/water", async (req, res, next) => {
    const { userId, consumption } = req.body;
    try {
      await waterUsage.updateWaterConsumption(userId, consumption);
      res.status(201).json({
        message: "Updated successfully water usage.",
      });
    } catch (err) {
      res.status(400).json({
        message: "Cant update water usage",
      });
    }
  });

  app.get("/water", async (req, res, next) => {
    const { userId } = req.body;
    try {
      console.log("===============+Hera", waterUsage);
      const cost = await waterUsage.getCurrentWaterCost(userId);
      res.status(200).json({
        cost,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Cant GET water cost",
      });
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
