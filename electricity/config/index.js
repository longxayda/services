require('dotenv').config()
// if (process.env.NODE_ENV !== "prod") {
//   const configFile = `./.env`;
//   console.log(configFile)
//   dotEnv.config({ path: configFile });
// } else {
//   dotEnv.config();
// }

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
};