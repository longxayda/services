const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
const {ElectricUsage} = require('./database/models')

const StartServer = async() => {

    const app = express();
    
    await databaseConnection();
    const data = {
        userId: '123',
        lastElectricityConsumption: 30,
        currentElectricityConsumption: 60,
        lastPaid: new Date(),
    }
    await ElectricUsage.create(data)

    await expressApp(app);
    

    app.listen(PORT, () => {
          console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
    .on('close', () => {
        // channel.close();
    })
    

}

StartServer();