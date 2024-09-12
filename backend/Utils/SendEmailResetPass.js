import { configDotenv } from "dotenv";
configDotenv();
import nodemailer from "nodemailer";

const sendEmailPassReset = async function (email, subject, message) {
 
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
  await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    to: email,
    subject: subject,
    html: message,
  });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmailPassReset;
