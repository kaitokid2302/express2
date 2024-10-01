require("dotenv").config();

const moongoose = require("mongoose");

const connection = async () => {
  const options = {
    dbName: process.env.DB_NAME,
  };

  await moongoose.connect(process.env.DB_HOST, {
    ...options,
  });
  if (moongoose.connection.readyState === 1) {
    console.log(">>> Connected to MongoDB");
  } else {
    throw new Error(">>> Error connecting to MongoDB");
  }
};

module.exports = connection;
