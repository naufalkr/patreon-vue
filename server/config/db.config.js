require('dotenv').config();

module.exports = {
  HOST: "localhost",
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "postgres",
  pool:{
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 100
  }
}