import { generateAndSaveMockData } from './utils/mock-data.js';
import { databaseConnection } from './database/connection.js';

const interval = 2 * 1000; // 60,000 milliseconds (1 minute)
await databaseConnection();
setInterval(generateAndSaveMockData, interval);
