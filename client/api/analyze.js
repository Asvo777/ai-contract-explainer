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
  model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Using reliable model
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
ROLE: You are a security auditor and educator. Your task is to explain complex smart contract bytecode to beginners.

GUIDELINES:
- NEVER try to generate, simulate, or write bytecode.
- NEVER use technical phrases like "opcodes", "JUMPDEST", "CALLER", "msg.data", or "abi" in your explanation.
- Your explanation must be in plain English, simple enough for a non-technical user to understand.
- If the bytecode is just "0x", it is a wallet address, not a contract.

THE TASK:
Explain the following smart contract bytecode in simple terms. Describe what the contract most likely does based on common patterns.

Contract Address: ${address}
Bytecode: ${bytecode}

YOUR EXPLANATION MUST FOLLOW THIS STRUCTURE:
1. **Purpose:** [One sentence on the contract's overall goal]
2. **Key Functions:** [A simple list of 2-3 things it can probably do]
3. **Plain English Summary:** [A 1-2 sentence summary for a complete beginner]
`;

  try {
    if (!model) {
      throw new Error("Gemini AI model not initialized");
    }

    const result = await model.generateContent(prompt);
    const explanation = result.response.text();
    const confidence = result.response.confidence;

    res.json({ explanation, confidence });

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