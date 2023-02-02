const { contactValidation, updateStatusValidation } = require("./schemas");

const middleware = (contactValidation, property) => {
  return (req, res, next) => {
    const { error } = contactValidation.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      console.log("error", message);
      res.status(400).json({
        error: message
      });
    }
  };
};

const createContactValidation = middleware(contactValidation);
const statusContactValidation = middleware(updateStatusValidation);

module.exports = { createContactValidation, statusContactValidation };