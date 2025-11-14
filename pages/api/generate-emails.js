// ✅ pages/api/generate-email.js

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    const completion = await openai.chat.completions.create({
      model: "kwaipilot/kat-coder-pro:free",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    const text = completion.choices[0].message.content;
    res.status(200).json({ text });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Failed to generate email" });
  }
}
