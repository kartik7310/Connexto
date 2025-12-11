import transporter from "../config/nodemailer";
  async function sendMail({ to, subject, html, text }) {
  return transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to,
    subject,
    html,
    text,
  });
}
export default sendMail;