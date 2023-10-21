const electricUsage = require('../database/repositories/index')
module.exports = (app) => {
    
    app.post('/electricity', async (req, res, next) => {
        const {userId, consumption} = req.body;
        try {
            electricUsage.updateElectricityConsumption(userId, consumption);
            res.status(201).json({
                message: "Updated successfully electric usage."
            })
        }
        catch (err) {
            res.status(400).json({
                message: "Cant update elect usage"
            })
        }     
    })

    app.get('/electricity', async (req, res, next) => {
        const {userId} = req.body;
        try {
            const cost = await electricUsage.getCurrentElectricityCost(userId);
            res.status(200).json({
                message: "Get electricity cost successfully"
            })
        } catch {
            res.status(400).json({
                message: "Cant GET elect cost"
            })
        }
    })

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
}