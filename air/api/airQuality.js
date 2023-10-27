import { AirQualityRepository } from '../database/repositories/index.js';

export const airQualityApp = (app) => {
  const airQualityRepo = new AirQualityRepository();

  app.get('/aqi', async (req, res, next) => {
    const { userId } = req.body;
    try {
      const aqi = await airQualityRepo.getLatestAQI();
      res.status(200).json({
        aqi,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: 'Cant GET elect cost',
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
