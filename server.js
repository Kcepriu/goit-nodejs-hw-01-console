const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// const transporter = nodemailer.createTransport(config);
// const emailOptions = {
//   from: "goitnodejs@meta.ua",
//   to: "noresponse@gmail.com",
//   subject: "Nodemailer test",
//   text: "Привіт. Ми тестуємо надсилання листів!",
// };

// transporter
//   .sendMail(emailOptions)
//   .then((info) => console.log(info))
//   .catch((err) => console.log(err));
