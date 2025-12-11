
import mailGenerator from "../config/mailgen.js";
import sendMail from "./mailer.js";

export async function sendResetPasswordSuccessEmail(toEmail, name) {
  const email = {
    body: {
      name: name || "there",
      intro: "Your password has been changed successfully.",
      outro: "If this wasn't you, reset your password immediately and contact support."
    }
  };

  const html = mailGenerator.generate(email);
  const text = mailGenerator.generatePlaintext(email);

  return sendMail({
    to: toEmail,
    subject: "Your password has been reset",
    html,
    text
  });
}
