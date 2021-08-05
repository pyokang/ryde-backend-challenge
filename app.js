require("./models/db");
const express = require("express");
const path = require("path");

const router = require("./routes/crud");

var app = express();

app.listen(3000, () => {
  console.log("Express server started at port : 3000");
});

app.use("/api", router);
