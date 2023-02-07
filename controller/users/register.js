const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  user = await User.create({ email, password: hashPassword, subscription });
  res.status(201).json({
    data: {
        user: {
        email,
        password,
        subscription
      },
    },
  });
};

module.exports = register;
