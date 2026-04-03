import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const arrayBuffer = await req.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);

    const transcription = await groq.audio.transcriptions.create({
      file: { name: "audio.webm", data: audioBuffer },
      model: "whisper-large-v3",
    });

    res.status(200).json({ text: transcription.text });
  } catch (err) {
    console.error("STT Error:", err);
    res.status(500).json({ error: "STT failed" });
  }
}