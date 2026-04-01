import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { message } = req.body;

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    res.status(200).json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("API ERROR:", error);
    res.status(500).json({
      error: "Something went wrong with OpenAI API",
    });
  }
}