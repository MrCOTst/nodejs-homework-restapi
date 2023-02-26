const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const sendEmail = require('../../service/sendEmail');
const { v4 } = require("uuid");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarUrl = gravatar.url(email);
  const verificationToken = v4();

  user = await User.create({ email, password: hashPassword, subscription, avatarUrl, verificationToken});
const mail = {
  to: email,
  subject: 'Confirmation of registration on the website',
  html: `<a href="http://localhost:3000/users/verify/${verificationToken}" target="_blank">Follow the link to confirm your email</a>`
};
await sendEmail(mail);
  res.status(201).json({
    data: {
        user: {
        email,
        password,
        subscription,
        avatarUrl
      },
    },
  });
};

module.exports = register;
