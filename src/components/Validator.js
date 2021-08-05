/*
JSON Format validator using AJV.
Creates schema of specified user model.
*/

const Ajv = require("ajv");
const ajv = new Ajv();

// TODO: change the data type of dob and createdAt to Date
const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    dob: { type: "string" },
    address: { type: "string" },
    description: { type: "string" },
    createdAt: { type: "string" },
  },
  //   required: ["id", "name", "dob", "address", "description", "createdAt"],
};

exports.validate = ajv.compile(schema);
