const { withDB } = require("../components/dbQuery");
const { validate } = require("../components/Validator");

const insert = async (req, res) => {
  const userId = req.body.id;
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
};

module.exports = insert;
