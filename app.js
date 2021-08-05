// const mongoose = require("./models/db");
const express = require("express");
// const router = require("./routes/crud");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const Ajv = require("ajv");
require("dotenv").config();

uri = process.env.DB_CONNECTION;

// AJV JSON validator
const ajv = new Ajv();

// TODO: change dob and createdAt datatype to date
const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    dob: { type: "string" },
    address: { type: "string" },
    description: { type: "string" },
    createdAt: { type: "string" },
  },
  required: ["id", "name", "dob", "address", "description", "createdAt"],
};
const validate = ajv.compile(schema);

var app = express();

app.use(bodyParser.json());

// Reusable DB access function
const withDB = async (operations, res) => {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    client.connect(async (err) => {
      const collection = client.db("rydeBackend").collection("UserData");
      await operations(collection);
      client.close();
    });
  } catch (e) {
    res.status(500).json({ message: "Error connecting to db", e });
  }
};

// Read All existing data
app.get("/api/userinfo/", async (req, res) => {
  withDB(async (collection) => {
    // const id = req.body.id;
    const userInfo = await collection.find({}).toArray();
    res.status(200).json(userInfo);
  }, res);
});

// Fetch data by id
app.get("/api/userinfo/:id", async (req, res) => {
  withDB(async (collection) => {
    const userId = req.params.id;
    console.log(userId);
    const userInfo = await collection.findOne({ id: userId });
    res.status(200).json(userInfo);
  });
});

// Insert one item
app.post("/api/userinfo/", async (req, res) => {
  const userId = req.body.id;
  // TO DO: Validate the structure of the data
  const valid = validate(req.body);
  console.log(req.body, valid);
  if (!valid)
    return res
      .status(400)
      .json({ message: "Check if the data fields are correct." });
  withDB(async (collection) => {
    if ((await collection.countDocuments({ id: userId })) != 0) {
      return res
        .status(400)
        .json({ message: "There already exist entry with the id" });
    }
    const insert = await collection.insertOne(req.body);
    res.status(200).json(insert);
  });
});

// Update data
app.put("/api/userinfo/:id", async (req, res) => {
  const userId = req.params.id;
  const updateItem = req.body;
  // TO DO: Validate the structure of the data
  withDB(async (collection) => {
    const item = await collection.findOne({ id: userId });
    // console.log(item._id);
    if (!item) return;
    const updated = await collection.update({ id: userId }, updateItem);
    // res.status(200).json(updated);
    const updatedItem = await collection.findOne({ id: userId });
    res.status(200).json(updatedItem);
  });
});

// Delete data by id
app.delete("/api/userinfo/:id", async (req, res) => {
  withDB(async (collection) => {
    const userId = req.params.id;
    const result = await collection.remove({ id: userId }, (justOne = true));
    res.status(200).send(result.nRemoved);
  });
});

app.listen(3000, () => {
  console.log("Express server started at port : 3000");
});
