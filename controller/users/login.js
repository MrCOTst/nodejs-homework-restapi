const { User } = require("../../models");
const { Unauthorized, BadRequest } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const passCompare = bcrypt.compareSync(password, user.password);
  const subscription = user.subscription;

  if (!user || !passCompare) {
    throw new Unauthorized("Email or password is wrong");
  }

  if (!user.verify) {
    throw new BadRequest("Email not verify");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    data: {
      token,
      user: { email, subscription },
    },
  });
};

module.exports = login;
