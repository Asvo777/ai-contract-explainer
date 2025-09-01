import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config'; // To load .env variables

const app = express();
app.use(cors()); // Allow your frontend to call this backend
app.use(express.json()); // Parse JSON bodies

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

console.log("Using Google Gemini API Key:", process.env.GEMINI_API_KEY ? "Set" : "Not Set");

app.post('/api/analyze', async (req, res) => {
  const { bytecode, address } = req.body;

const prompt = `
ROLE: You are a security auditor and educator. Your task is to explain complex smart contract bytecode to beginners.

GUIDELINES:
- NEVER try to generate, simulate, or write bytecode.
- NEVER use technical phrases like "opcodes", "JUMPDEST", "CALLER", "msg.data", or "abi" in your explanation.
- Your explanation must be in plain English, simple enough for a non-technical user to understand.
- If the bytecode is just "0x", it is a wallet address, not a contract.

THE TASK:
Explain the following smart contract bytecode in simple terms (2 to 5 sentences). Describe what the contract most likely does based on common patterns.

Contract Address: ${address}
Bytecode: ${bytecode}

YOUR EXPLANATION MUST FOLLOW THIS STRUCTURE:
1. **Purpose:** [One sentence on the contract's overall goal]
2. **Key Functions:** [A simple list of 2-3 things it can probably do, like "Hold funds", "Swap tokens", "Let users vote"]
3. **Plain English Summary:** [A 1-2 sentence summary for a complete beginner]

Remember: You are explaining the contract's behavior, not its code.
`;

   try {
    
    const result = await model.generateContent([prompt]);
    const explanation = result.response.text();

    
    res.json({ explanation });

  } catch (error) {
    console.error("Google Gemini error:", error);
    res.status(500).json({ error: "Failed to analyze contract" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
});