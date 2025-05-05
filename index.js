// server/index.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("🚀 Servidor backend do ChatGPT Clone rodando!");
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body; // ✅ agora sim!

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Erro na requisição:", error.message);
    res.status(500).json({ error: "Erro ao acessar a IA" });
  }
});
