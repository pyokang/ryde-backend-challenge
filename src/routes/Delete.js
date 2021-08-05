const { withDB } = require("../components/dbQuery");

const remove = async (req, res) => {
  //   console.log(req.params.id);
  withDB(async (collection) => {
    const userId = req.params.id;
    // console.log(req.params);
    const result = await collection.deleteOne({ id: userId });
    res.status(200).send(result.nRemoved);
  });
};

module.exports = remove;
