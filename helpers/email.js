const nodemailer = require("nodemailer");

const {
  SMTP_SERVER,
  SMTP_PORT,
  SMTP_SECURE,
  EMAIL_FROM,
  SMTP_USER,
  SMTP_PASSWORD,
  BASE_URL,
} = process.env;

const getConfigMailTranstort = () => {
  return {
    host: SMTP_SERVER,
    port: SMTP_PORT,
    secure: SMTP_SECURE, // true for 465, false for other ports
    auth: {
      user: SMTP_USER, // generated ethereal user
      pass: SMTP_PASSWORD, // generated ethereal password
    },
  };
};

const sendVerificateToken = async ({ email, verificationToken }) => {
  const transporter = nodemailer.createTransport(getConfigMailTranstort());

  const emailOptions = {
    from: EMAIL_FROM,
    to: email,
    subject: "Veryfi email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };

  try {
    await transporter.sendMail(emailOptions);
  } catch (error) {
    console.log(error.message);
  }
};

const emailFunction = { sendVerificateToken };

module.exports = emailFunction;
