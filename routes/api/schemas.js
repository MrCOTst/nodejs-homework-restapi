const Joi = require("joi");
const schemas = {
  contactPOST: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().max(15).required(),
  }),
};
module.exports = schemas;
