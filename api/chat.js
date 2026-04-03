import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = JSON.parse(req.body);

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages,
      temperature: 0.7,
      stream: false,
    });

    res.status(200).json({
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error("Chat Error:", err);
    res.status(500).json({ error: "Chat request failed" });
  }
}