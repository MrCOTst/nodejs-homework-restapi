const {
  contactValidation,
  updateStatusValidation,
} = require("./joiSchemasContact");

const { joiRegisterSchema, joiLoginSchema, joiSubscriptionSchema, joiEmailSchema } = require("..//../models/user");

const middleware = (schemas, property) => {
  return (req, res, next) => {
    const { error } = schemas.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      console.log("error", message);
      res.status(400).json({
        error: message,
      });
    }
  };
};

const createContactValidation = middleware(contactValidation);
const statusContactValidation = middleware(updateStatusValidation);
const userRegisterValidation = middleware(joiRegisterSchema);
const userLoginValidation = middleware(joiLoginSchema);
const userSubscriptionValidation = middleware(joiSubscriptionSchema);
const verifyEmailValidation = middleware(joiEmailSchema);

module.exports = {
  createContactValidation,
  statusContactValidation,
  userRegisterValidation,
  userLoginValidation,
  userSubscriptionValidation,
  verifyEmailValidation,
};
