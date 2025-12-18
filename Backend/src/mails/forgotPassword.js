
import mailGenerator from "../config/mailgen.js";
import sendMail from "./mailer.js";

export async function sendForgotPasswordTokenEmail(toEmail, name, token, expiresIn = "5 minutes") {
  const email = {
    body: {
      name: name || "there",
      intro: "We received a request to reset your password.",
      table: {
        data: [
          { label: "Reset Code", value: token },
          { label: "Expires In", value: expiresIn }
        ]
      },
      outro: "If you didn't request this, you can ignore this email."
    }
  };

  const html = mailGenerator.generate(email);
  const text = mailGenerator.generatePlaintext(email);

  return sendMail({
    to: toEmail,
    subject: `Your password reset code (${token})`,
    html,
    text
  });
}
