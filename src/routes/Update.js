const { withDB } = require("../components/dbQuery");
const { validate } = require("../components/Validator");

const update = async (req, res) => {
  const userId = req.params.id;
  const updateItem = req.body;
  const valid = validate(req.body);
  console.log(req.body, valid);
  if (!valid)
    return res
      .status(400)
      .json({ message: "Check if the data fields are correct." });
  withDB(async (collection) => {
    const item = await collection.findOne({ id: userId });
    if ((await collection.countDocuments({ id: userId })) == 0) {
      return res.status(200).json({ message: "There is no item to update." });
    }
    const updated = await collection.update({ id: userId }, updateItem);
    const updatedItem = await collection.findOne({ id: userId });
    res.status(200).json(updatedItem);
  });
};

module.exports = update;
