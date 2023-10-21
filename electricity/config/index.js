import dotenv from 'dotenv';
dotenv.config();
// if (process.env.NODE_ENV !== "prod") {
//   const configFile = `./.env`;
//   console.log(configFile)
//   dotEnv.config({ path: configFile });
// } else {
//   dotEnv.config();
// }
console.log(process.env.PORT)
console.log(process.env.MONGODB_URI)

export const PORT = process.env.PORT;
export const DB_URL = process.env.MONGODB_URI;
