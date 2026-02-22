import nodemailer from "nodemailer";
import config from "./env.js";
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: config.nodemailer.brevoLogin,
    pass: config.nodemailer.brevoPassword,
  },
  tls: {
    rejectUnauthorized: false  //only for local development
  }
})


export default transporter;
