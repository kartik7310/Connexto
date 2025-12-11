import mailGenerator from "../config/mailgen.js";
import sendMail from "./mailer.js";
import config from "../config/env.js";
export async function sendWelcomeEmail(toEmail, name) {
  const dashboardLink = `${config.corsOrigin}/feed`;
  const email = {
    body: {
      name: name || "there",
      intro: "🎉 Welcome to Connexeto! We're excited to have you on board.",
      action: {
        instructions: "Get started by visiting your dashboard:",
        button: {
          color: "#22BC66",
          text: "Go to Dashboard",
          link: dashboardLink
        }
      },
      outro: "If you need help, feel free to reply to this email. We're always here for you!"
    }
  };

  const html = mailGenerator.generate(email);
  const text = mailGenerator.generatePlaintext(email);

  return sendMail({
    to: toEmail,
    subject: "Welcome to Connexeto 🎉",
    html,
    text
  });
}