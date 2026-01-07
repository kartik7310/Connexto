
import mailGenerator from "../config/mailgen.js";
import sendMail from "./mailer.js";

export async function sendPaymentReceiptEmail(toEmail, name, receiptDetails) {
  const email = {
    body: {
      name: name || "Valued Customer",
      intro: "Thank you for your payment! Your subscription to Connexeto PREMIUM is now active.",
      table: {
        data: [
          {
            item: "Subscription Plan",
            description: "Connexeto PREMIUM (Monthly)",
            price: receiptDetails.amount,
          },
          {
            item: "Transaction ID",
            description: receiptDetails.transactionId,
            price: "",
          },
          {
            item: "Date",
            description: receiptDetails.date,
            price: "",
          }
        ],
        columns: {
  
          customWidth: {
            item: "40%",
            description: "40%",
            price: "20%"
          },
         
          customAlignment: {
            price: "right"
          }
        }
      },
      outro: "You now have full access to all premium features. If you have any questions or need assistance, feel free to reply to this email."
    }
  };

  const html = mailGenerator.generate(email);
  const text = mailGenerator.generatePlaintext(email);

  return sendMail({
    to: toEmail,
    subject: `Payment Receipt: Connexeto PREMIUM - ${receiptDetails.transactionId}`,
    html,
    text
  });
}
