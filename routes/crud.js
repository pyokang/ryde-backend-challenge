const express = require("express");
var router = express.Router();

// Read all the data
router.get("/", (req, res) => {
  res.json({ message: "Read all" });
});

// Read data by id
router.get("/:id", (req, res) => {
  res.json({ message: "Read one" });
});

// Insert data
router.post("/", (req, res) => {
  res.json({ message: "Insert one" });
});

// Update data
router.put("/:id", (req, res) => {
  res.json({ message: "Update one" });
});

// Delete data
router.delete("/:id", (req, res) => {
  res.json({ message: "Delete one" });
});

module.exports = router;
