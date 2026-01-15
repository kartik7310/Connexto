
import mailGenerator from "../config/mailgen.js";
import sendMail from "./mailer.js";
export async function notificationEmail(recipientEmail, senders) {

  const sendersHtml = senders.map(sender => `
    <tr>
      <td style="padding: 10px;">
        ${sender.photoUrl ? 
          `<img src="${sender.photoUrl}" alt="${sender.fullName}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; vertical-align: middle;">` : 
          `<div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: inline-flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; vertical-align: middle;">
            ${sender.firstName.charAt(0).toUpperCase()}${sender.lastName.charAt(0).toUpperCase()}
          </div>`
        }
      </td>
      <td style="padding: 10px;">
        <strong>${sender.fullName}</strong>
      </td>
      <td style="padding: 10px; color: #666;">
        ${sender.email}
      </td>
    </tr>
  `).join('');

  const email = {
    body: {
      intro: `You have received ${senders.length} new connection request${senders.length > 1 ? 's' : ''}.`,
      outro: `
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background: #f5f5f5;">
              <th style="padding: 10px; text-align: left;">Photo</th>
              <th style="padding: 10px; text-align: left;">Name</th>
              <th style="padding: 10px; text-align: left;">Email</th>
            </tr>
          </thead>
          <tbody>
            ${sendersHtml}
          </tbody>
        </table>
        <p>These requests are waiting for your response. Don't miss out on expanding your network!</p>
      `,
      action: {
        instructions: 'Click below to review and respond:',
        button: {
          color: '#22BC66',
          text: `View ${senders.length} Request${senders.length > 1 ? 's' : ''}`,
          link: 'https://connexto.site/request-connection'
        }
      }
    }
  };

  const html = mailGenerator.generate(email);
  const text = mailGenerator.generatePlaintext(email);

  return sendMail({
    to: recipientEmail,
    subject: `${senders.length} New Connection Request${senders.length > 1 ? 's' : ''} Waiting for You`,
    html,
    text
  });
}
