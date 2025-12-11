import logger from "../config/logger.js";
import transporter from "../config/nodemailer.js";
  async function sendMail({ to, subject, html, text }) {
  try {
    const info = await transporter.sendMail({
      from: "kartiklathiyan455@gmail.com",
      to,
      subject,
      html,
      text,
    });
    logger.info(`Email sent successfully to ${to}:`, info.messageId);
    return info;
  } catch (error) {
    logger.error(`Failed to send email to ${to}:`, error.message);
    throw error; 
  }
}
export default sendMail;