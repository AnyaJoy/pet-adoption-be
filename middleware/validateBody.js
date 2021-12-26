const Ajv = require("ajv");
const addFormats = require("ajv-formats")
const ajv = new Ajv();
addFormats(ajv)
function validateBody(schema) {
  return (req, res, next) => {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);
    if (!valid) {
      res.status(400).send("Invalid input!");
    }
    next();
  };
}

module.exports = { validateBody };
