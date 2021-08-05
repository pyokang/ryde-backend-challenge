const mongoose = require("mongoose");
require("./userData.model");
require("dotenv").config();

uri = process.env.DB_CONNECTION;

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (e) => {
    if (!e) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + e);
    }
  }
);
