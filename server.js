import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ------------------- Chat
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
      stream: false,
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error("Chat Error:", err);
    res.status(500).json({ error: "Chat request failed" });
  }
});

// ------------------- TTS (ElevenLabs)
app.post("/api/tts", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text required" });

    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL",
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_monolingual_v1",
          voice_settings: { stability: 0.4, similarity_boost: 0.3 },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("TTS Error:", errText);
      return res.status(500).json({ error: "TTS failed" });
    }

    const audioBuffer = Buffer.from(await response.arrayBuffer());
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", audioBuffer.length);
    res.send(audioBuffer);
  } catch (err) {
    console.error("TTS Error:", err);
    res.status(500).json({ error: "TTS server error" });
  }
});

// ------------------- STT (Groq Whisper)
app.post("/api/stt", async (req, res) => {
  try {
    const audioBuffer = Buffer.from(await req.arrayBuffer());

    const transcription = await groq.audio.transcriptions.create({
      file: { name: "audio.webm", data: audioBuffer },
      model: "whisper-large-v3",
    });

    res.json({ text: transcription.text });
  } catch (err) {
    console.error("STT Error:", err);
    res.status(500).json({ error: "STT failed" });
  }
});

// ------------------- Start server
const PORT = 5000; // Changed to avoid port conflicts
app.listen(PORT, () => console.log(`🚀 Groq server running on http://localhost:${PORT}`));