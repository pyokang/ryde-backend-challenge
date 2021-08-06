const { withDB } = require("../components/dbQuery");

const remove = async (req, res) => {
  //   console.log(req.params.id);
  withDB(async (collection) => {
    const userId = req.params.id;

    // Check if the data exists in the database
    if ((await collection.countDocuments({ id: userId })) == 0) {
      return res
        .status(400)
        .json({ message: "No data to delete in the database." });
    }

    const result = await collection.deleteOne({ id: userId });
    res
      .status(200)
      .json({ message: `Successfully deleted data of user ${userId}.` });
  });
};

module.exports = remove;
