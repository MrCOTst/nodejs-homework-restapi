const Joi = require("joi");

const contactValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(15).required(),
  favorite: Joi.boolean(),
});

const updateStatusValidation = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { contactValidation, updateStatusValidation };
