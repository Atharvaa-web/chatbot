import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST requests allowed" });
    }

    // ⭐ FIX: manually parse body if needed
    let body = req.body;
    if (!body) {
      const raw = await new Promise((resolve) => {
        let data = "";
        req.on("data", chunk => data += chunk);
        req.on("end", () => resolve(data));
      });
      body = JSON.parse(raw);
    }

    const message = body.message;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'LOADED' : 'MISSING');
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    });

    res.status(200).json({
      reply: completion.choices[0].message.content
    });

  } catch (err) {
    console.error("API ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}