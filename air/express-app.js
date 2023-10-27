import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { airQualityApp } from './api/airQuality.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const expressApp = async (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + '/public'));

  //api
  // appEvents(app);

  airQualityApp(app);
  // error handling
};
