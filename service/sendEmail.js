const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { VEZA_API_KEY } = process.env;

sgMail.setApiKey(VEZA_API_KEY);

const sendEmail = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const email = { ...data, from: "chernichenko@veza.com.ua" };
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};
module.exports = sendEmail;