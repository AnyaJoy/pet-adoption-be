const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ajv = new Ajv({ allErrors: true });
require("ajv-errors")(ajv);
addFormats(ajv);

function validateBody(schema) {
  return (req, res, next) => {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);
    if (!valid) {
      res.status(400).send(validate.errors[0].message);
      return;
    }
    next();
  };
}

module.exports = { validateBody };
