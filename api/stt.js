import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
  // Only POST allowed
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Read audio blob as buffer
    const audioBuffer = Buffer.from(await req.arrayBuffer());

    // Send to Groq Whisper STT
    const transcription = await groq.audio.transcriptions.create({
      file: {
        name: "audio.webm",
        data: audioBuffer,
      },
      model: "whisper-large-v3",
    });

    return res.status(200).json({
      text: transcription.text,
    });
  } catch (err) {
    console.error("STT Error:", err);
    res.status(500).json({ error: "Failed to transcribe audio" });
  }
}