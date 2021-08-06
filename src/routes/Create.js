const { withDB } = require("../components/dbQuery");
const { validate } = require("../components/Validator");

const insert = async (req, res) => {
  const userId = req.body.id;

  // Type check object fields if they are of expected data type
  const valid = validate(req.body);
  if (!valid)
    return res
      .status(400)
      .json({ message: "Check if the data fields are correct." });
  withDB(async (collection) => {
    // Check if the data with the given id already exists.
    if ((await collection.countDocuments({ id: userId })) != 0) {
      return res
        .status(400)
        .json({ message: "There already exist entry with the same id." });
    }

    const insert = await collection.insertOne(req.body);
    res
      .status(201)
      .json({ message: "Successfully inserted data into database!" });
  });
};

module.exports = insert;
