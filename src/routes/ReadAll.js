const { withDB } = require("../components/dbQuery");

const readAll = async (req, res) => {
  withDB(async (collection) => {
    // const id = req.body.id;
    const userInfo = await collection.find({}).toArray();
    res.status(200).json(userInfo);
  }, res);
};

module.exports = readAll;
