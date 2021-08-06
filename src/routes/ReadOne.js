const { withDB } = require("../components/dbQuery");

const readOne = async (req, res) => {
  withDB(async (collection) => {
    const userId = req.params.id;

    // Check if the data exists in database
    if ((await collection.countDocuments({ id: userId })) == 0) {
      return res
        .status(400)
        .json({ message: "Data with given Id does not exist in database." });
    }

    const userInfo = await collection.findOne({ id: userId });
    res.status(200).json(userInfo);
  });
};

module.exports = readOne;
