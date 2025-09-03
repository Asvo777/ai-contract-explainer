import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini with error handling
let genAI, model;
try {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Using reliable model
  console.log("✅ Google Gemini initialized successfully");
} catch (error) {
  console.error("❌ Gemini initialization failed:", error.message);
}

app.post('/api/analyze', async (req, res) => {
  const { bytecode, address } = req.body;

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const prompt = `
  Analyze this smart contract bytecode and return JSON with explanation and confidence.

  CONTRACT:
  Address: ${address}
  Bytecode: ${bytecode}

  GUIDELINES:
  - Explain in simple, plain English for beginners
  - No technical jargon like "opcodes", "JUMPDEST", or "abi"
  - No markdown formatting

  YOUR EXPLANATION MUST FOLLOW THIS STRUCTURE BUT WITHOUT FORMATTING:
  1. Purpose: [One sentence on the contract's overall goal]
  2. Key Functions: [A simple list of 2-3 things it can probably do]
  3. Summary: [A 1-2 sentence summary for a complete beginner]

  ALSO: Provide a confidence score between 0-100 based on how certain you are about this analysis.

  RETURN JSON FORMAT:
  {
    "explanation": "Simple explanation following this structure: 1. Purpose: [overall goal]. 2. Key Functions: [2-3 capabilities]. 3. Summary: [beginner summary]",
    "confidence": 63
  }
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Try to parse JSON from the response
    try {
      // Extract JSON from the response (Gemini might add extra text)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const analysis = JSON.parse(jsonMatch[0]).replace(/\d+\./g, '\n');
        res.json(analysis);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      // Fallback if JSON parsing fails
      res.json({ 
        explanation: responseText, 
        confidence: 75 
      });
    }
  } catch (error) {
    console.error("Google Gemini error:", error.message);
    res.status(500).json({ 
      error: "Failed to analyze contract",
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/health`);
});

// Error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});