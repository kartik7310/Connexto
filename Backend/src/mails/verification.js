
import mailGenerator from "../config/mailgen.js";
import sendMail from "./mailer.js";

export async function sendVerificationTokenEmail(toEmail, token, expiresIn = "5 minutes") {
  const email = {
    body: {
      intro: "Welcome! Use the verification code below to activate your account.",
      table: {
        data: [
          { label: "Verification Code", value: token },
          { label: "Expires In", value: expiresIn }
        ]
      },
      outro: "If you didn't request this, ignore this email."
    }
  };

  const html = mailGenerator.generate(email);
  const text = mailGenerator.generatePlaintext(email);

  return sendMail({
    to: toEmail,
    subject: `Your verification code (${token})`,
    html,
    text
  });
}
