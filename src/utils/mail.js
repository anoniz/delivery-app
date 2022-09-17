const nodemailer = require("nodemailer");
require('dotenv').config()
const from_email = process.env.FROM_EMAIL
const smtp = process.env.SMTP
const pass = process.env.PASSWORD
  let transporter = nodemailer.createTransport({
    host: smtp,
    port: 465,
    secure: true,
      auth : {
        user: from_email,
        pass: pass
      }
  });


module.exports = transporter;

