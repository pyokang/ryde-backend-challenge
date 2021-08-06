// Main entry point
const express = require("express");
const bodyParser = require("body-parser");
const readAll = require("./routes/ReadAll");
const readOne = require("./routes/ReadOne");
const insert = require("./routes/Create");
const update = require("./routes/Update");
const remove = require("./routes/Delete");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

// CRUD operations
app.get("/api/userinfo", readAll);
app.get("/api/userinfo/:id", readOne);
app.post("/api/userinfo/", insert);
app.delete("/api/userinfo/:id", remove);
app.put("/api/userinfo/:id", update);

// Port configuration
app.listen(process.env.PORT, () => {
  console.log("Express server started at port :", process.env.PORT);
});

module.exports = app;
