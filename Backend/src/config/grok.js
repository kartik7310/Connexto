import 'dotenv/config';
import Groq from "groq-sdk";
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
async function main() {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "what is array give me code snipt",
      },
    ],
    model: "llama-3.3-70b-versatile", 
  });
  console.log(chatCompletion.choices[0]?.message?.content);
}
main();
