import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

// ✅ CORS (allow frontend)
app.use(cors({
  origin: "*", // later you can restrict to your Vercel URL
}));
app.get("/", (req, res) => {
  res.send("🚀 Backend is live");
});
app.use(express.json());

// ✅ Check API key exists
if (!process.env.Q_API_KEY) {
  console.error("❌ Missing Q_API_KEY in environment variables");
  process.exit(1);
}

// ✅ Groq client
const client = new Groq({
  apiKey: process.env.Q_API_KEY,
});

// ✅ Health check route (VERY IMPORTANT for Render)
app.get("/", (req, res) => {
  res.send("🚀 Backend is live");
});

// ✅ Chat route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "user", content: message }
      ],
    });

    res.json({
      reply: response.choices?.[0]?.message?.content || "No response.",
    });

  } catch (error) {
    console.error("🔥 BACKEND ERROR:", error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

// ✅ IMPORTANT: Use dynamic PORT for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});