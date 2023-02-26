const { User } = require("../../models");
const { BadRequest } = require("http-errors");
const sendEmail = require("../../service/sendEmail");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest("missing required field email");
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Confirmation of registration on the website",
    html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}"target="_blank">Follow the link to confirm your email</a>`,
  };
  await sendEmail(mail);
  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
