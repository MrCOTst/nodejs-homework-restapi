const Joi = require("joi");
const schemas = {
  contactPOST: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.alternatives([Joi.string(), Joi.number()]).required(),
  }),
};
module.exports = schemas;
