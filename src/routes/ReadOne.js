const { withDB } = require("../components/dbQuery");

const readOne = async (req, res) => {
  withDB(async (collection) => {
    const userId = req.params.id;
    const userInfo = await collection.findOne({ id: userId });
    res.status(200).json(userInfo);
  });
};

module.exports = readOne;
