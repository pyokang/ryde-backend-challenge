const { withDB } = require("../components/dbQuery");
const { validate } = require("../components/Validator");

const update = async (req, res) => {
  const userId = req.params.id;
  const updateObj = req.body;

  // Type check object fields if they are of expected data type
  const valid = validate(updateObj);
  if (!valid)
    return res
      .status(400)
      .json({ message: "Check if the data fields are correct." });

  withDB(async (collection) => {
    // Check if the data we want to update exists in the database
    if ((await collection.countDocuments({ id: userId })) == 0) {
      return res.status(400).json({ message: "There is no item to update." });
    }

    // Locate the data we want to update
    const item = await collection.findOne({ id: userId });
    // Copy any properties that does not exist in request body
    Object.keys(item).forEach((key) => {
      if (!(key in updateObj)) {
        updateObj[key] = item[key];
      }
    });

    // Update the user data with the new data
    const updated = await collection.updateOne(
      { id: userId },
      { $set: updateObj }
    );
    res
      .status(200)
      .json({ message: `Successfully updated entries for ${userId}.` });
  });
};

module.exports = update;
