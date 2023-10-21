import mongoose from 'mongoose';
import { DB_URL } from '../config/index.js';

export const databaseConnection = async() => {

    try {
        await mongoose.connect(DB_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true
        });
        console.log('Db Connected');
        
    } catch (error) {
        console.error('Error ============ ON DB Connection')
        console.log(error);
    }
 
};

