const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  dob: {
    type: String,
  },
  address: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: String,
  },
});

mongoose.model("userData", userSchema);
