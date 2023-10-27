import { faker } from '@faker-js/faker';
import { AirQuality } from '../database/models/index.js';

export const generateAndSaveMockData = async () => {
  const timestamp = new Date();
  const mockData = {
    userId: faker.datatype.uuid(),
    ozone: faker.datatype.number({ min: 0, max: 100 }),
    particulateMatter: faker.datatype.number({ min: 0, max: 100 }),
    oxygen: faker.datatype.number({ min: 15, max: 25 }), // Oxygen levels in percentage
    nitrogenDioxide: faker.datatype.number({ min: 0, max: 50 }),
    carbonDioxide: faker.datatype.number({ min: 300, max: 500 }), // CO2 levels in ppm
    timestamp,
  };

  // Create a new record and save it to the database
  try {
    const airQualityRecord = await AirQuality.create(mockData);
    console.log(`Saved record for hour :`, airQualityRecord);
  } catch (err) {
    console.error(`Error saving record: ${err}`);
  }
};
