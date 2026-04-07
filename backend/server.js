import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new Groq({ apiKey: process.env.Q_API_KEY });

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "user", content: message }
      ],
    });

    res.json({
      reply: response.choices?.[0]?.message?.content || "No response."
    });

  } catch (error) {
    console.error("🔥 BACKEND ERROR:", error.response?.data || error);
    res.status(500).json({
      error: error.response?.data || "Server error"
    });
  }
});

app.listen(23348, () => {
  console.log("🚀 Backend running on http://localhost:23348");
});