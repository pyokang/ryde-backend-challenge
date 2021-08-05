/*
Resuable Database Connect function with the operator embedded.
*/

const { MongoClient } = require("mongodb");

// Using dotenv to hide critical information
// dotenv file is uploaded on github for demonstration purpose
require("dotenv").config();

uri = process.env.DB_CONNECTION;

exports.withDB = async (operations, res) => {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create connection to the predefined client
    client.connect(async (err) => {
      const collection = client.db("rydeBackend").collection("UserData");

      // Takes in operation function as argument to perform CRUD operation
      await operations(collection);
      client.close();
    });
  } catch (e) {
    res.status(500).json({ message: "Error connecting to db", e });
  }
};
