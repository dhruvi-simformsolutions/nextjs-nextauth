require('dotenv').config()

// config.js
module.exports = {
    db: {
      user: process.env.DB_USERNAME,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    },
    jwtSecret: process.env.JWT_SECRET,
  };
  