import express from "express";
import { Groq } from "groq-sdk";
import { env } from "../config/env.js";

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || env.groqApiKey,
});

// Project context for the chatbot
const PROJECT_CONTEXT = `You are an AI assistant for the Energy Crisis Sustainability Tracker project.
This is a full-stack application that monitors global energy markets, supply chains, renewable energy
adoption, and energy crisis predictions with a focus on sustainability and geopolitical risk.

The application includes:
- Real-time energy price tracking and analysis (WTI crude, Brent crude, natural gas, coal)
- Global energy supply chain visualization and disruption monitoring
- Renewable energy adoption metrics and progress dashboards
- Energy crisis forecasting and early-warning alerts
- Conflict event tracking and their impact on energy supplies and prices
- Geopolitical risk matrix for energy-producing and energy-dependent regions
- Country-level energy dependency analysis
- SDG progress tracking (SDG-7: Affordable and Clean Energy; SDG-13: Climate Action)
- User authentication and role-based access control
- Admin dashboard for data monitoring and management
- Supply chain resilience scoring and recommendations
- Historical price trend charts and volatility indicators

Key data points covered:
- WTI (West Texas Intermediate) and Brent crude oil spot prices
- Henry Hub natural gas prices and global LNG benchmarks
- Thermal coal and coking coal market prices
- Renewable capacity additions (solar, wind, hydro, nuclear)
- Carbon emissions intensity by country and sector
- Geopolitical risk scores tied to major energy-exporting regions
- Energy transition progress indicators

IMPORTANT: You MUST ONLY answer questions related to:
1. Energy, sustainability, and renewable energy topics
2. Energy Crisis Sustainability Tracker features and functionality
3. Energy prices (oil, gas, coal), supply chains, and forecasting
4. Conflict events and their geopolitical impact on energy markets
5. SDG targets and global energy transition goals
6. How to use the application
7. General energy industry and commodities information

If a question is NOT related to energy, sustainability, or this project, politely decline and redirect the user.
Start your response with "This project focuses on energy crisis tracking and sustainability. " when declining off-topic questions.`;

/**
 * POST /api/chatbot/ask
 * Send a question to the AI chatbot
 * Body: { message: string }
 * Returns: { reply: string }
 */
router.post("/ask", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || message.trim() === "") {
      return res.status(400).json({
        error: "Invalid message. Please provide a non-empty string.",
      });
    }

    // Check if the message is about a relevant topic using a simple heuristic
    const relevantKeywords = [
      "energy",
      "sustainability",
      "renewable",
      "price",
      "supply",
      "forecast",
      "crisis",
      "track",
      "power",
      "electric",
      "fuel",
      "carbon",
      "emissions",
      "solar",
      "wind",
      "hydro",
      "nuclear",
      "coal",
      "gas",
      "oil",
      "battery",
      "grid",
      "infrastructure",
      "climate",
      "green",
      "eco",
      "app",
      "feature",
      "map",
      "chart",
      "data",
      "conflict",
      "geopolitical",
      "wti",
      "brent",
      "crude",
      "natural",
      "market",
      "sdg",
      "transition",
    ];

    const messageWords = message.toLowerCase().split(/\s+/);
    const isRelevant =
      messageWords.some((word) =>
        relevantKeywords.some((keyword) => word.includes(keyword)),
      ) ||
      message.toLowerCase().includes("energy crisis sustainability tracker") ||
      message.toLowerCase().includes("how to");

    if (!isRelevant) {
      return res.json({
        reply: `This project focuses on energy crisis tracking and sustainability. I can only answer questions related to energy, sustainability, renewable energy, or how to use the Energy Crisis Sustainability Tracker application. Could you please ask a question related to these topics?`,
      });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: PROJECT_CONTEXT,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Unable to process your question. Please try again.";

    res.json({ reply });
  } catch (error) {
    console.error("Chatbot error:", error);

    if (error.message.includes("401")) {
      return res.status(401).json({
        error:
          "Authentication failed. Please check the Groq API key configuration.",
      });
    }

    res.status(500).json({
      error:
        error.message ||
        "An error occurred while processing your question. Please try again.",
    });
  }
});

/**
 * GET /api/chatbot/suggestions
 * Get suggested questions for the chatbot
 */
router.get("/suggestions", (req, res) => {
  const suggestions = [
    "What are the current global energy prices?",
    "How does renewable energy help reduce the energy crisis?",
    "What is the forecast for energy supply next quarter?",
    "How do energy conflicts impact global supply chains?",
    "What features does this application offer?",
    "How can I track renewable energy adoption?",
    "What is the role of battery storage in sustainability?",
    "How do I interpret the supply chain visualization?",
  ];

  res.json({ suggestions });
});

export default router;
