import dotenv from 'dotenv';
dotenv.config();
// if (process.env.NODE_ENV !== "prod") {
//   const configFile = `./.env`;
//   console.log(configFile)
//   dotEnv.config({ path: configFile });
// } else {
//   dotEnv.config();
// }

export const PORT = process.env.PORT;
export const DB_URL = process.env.MONGODB_URI;
