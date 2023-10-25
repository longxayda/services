import { AirQuality } from '../models/index.js';

export class AirQualityRepository {
  calculateAQIComponent(concentration, breakpoints, aqiRanges) {
    // Find the index of the appropriate AQI range
    for (let i = 0; i < breakpoints.length - 1; i++) {
      if (concentration >= breakpoints[i] && concentration <= breakpoints[i + 1]) {
        const cLow = breakpoints[i];
        const cHigh = breakpoints[i + 1];
        const aqiLow = aqiRanges[i];
        const aqiHigh = aqiRanges[i + 1];
        return ((aqiHigh - aqiLow) / (cHigh - cLow)) * (concentration - cLow) + aqiLow;
      }
    }

    // If the concentration is above the highest breakpoint, use the highest AQI
    if (concentration > breakpoints[breakpoints.length - 1]) {
      return aqiRanges[aqiRanges.length - 1];
    }

    // If the concentration is below the lowest breakpoint, use the lowest AQI
    if (concentration < breakpoints[0]) {
      return aqiRanges[0];
    }
  }

  async getLatestAQI(userId) {
    const pm25Breakpoints = [0, 12.0, 35.4, 55.4, 150.4, 250.4];
    const aqiRangesPM25 = [0, 50, 100, 150, 200, 300, 500];

    // Define breakpoints and corresponding AQI ranges for Ozone (O3)
    const ozoneBreakpoints = [0, 0.054, 0.07, 0.085, 0.105, 0.2];
    const aqiRangesOzone = [0, 50, 100, 150, 200, 300, 500];

    // Define breakpoints and corresponding AQI ranges for Oxygen (O2)
    const oxygenBreakpoints = [19.5, 21.0, 23.0, 26.0, 31.0, 100.0];
    const aqiRangesOxygen = [0, 50, 100, 150, 200, 300, 500];

    try {
      const latestData = await AirQuality.findOne().sort({ timestamp: -1 }).exec();
      const aqiPM25 = this.calculateAQIComponent(
        latestData.particulateMatter,
        pm25Breakpoints,
        aqiRangesPM25
      );
      const aqiOzone = this.calculateAQIComponent(latestData.ozone, ozoneBreakpoints, aqiRangesOzone);
      const aqiOxygen = this.calculateAQIComponent(
        latestData.oxygen,
        oxygenBreakpoints,
        aqiRangesOxygen
      );

      // The overall AQI is the maximum of the individual AQI values
      const aqi = Math.max(aqiPM25, aqiOzone, aqiOxygen);

      return aqi;
    } catch (error) {
      console.error(`Error fetching the latest air quality data: ${error}`);
      return null;
    }

    // Calculate the AQI for each pollutant
  }
}
