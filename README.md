# DuckChain Contract Analyzer 🔍

A powerful and intuitive web application that demystifies smart contract bytecode. Simply paste a contract address, and our AI-powered engine provides a clear, plain-English explanation of what the contract does—perfect for developers, auditors, and crypto beginners.

## ✨ Features

- **Smart Contract Analysis**: Analyze any Ethereum-compatible smart contract by address
- **AI-Powered Explanations**: Uses Google's Gemini AI to provide clear, beginner-friendly explanations
- **Confidence Scoring**: Get a reliability score for each analysis (0-100%)
- **Beautiful UI**: Modern, responsive design built with React and Tailwind CSS
- **Instant Results**: Fast analysis with real-time feedback
- **Cross-Platform**: Works perfectly on desktop and mobile devices

## 🛠️ Tech Stack

FRONTEND:
- React 18 + TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Shadcn/ui components

BACKEND:
- Node.js + Express
- Google Gemini AI API
- CORS enabled for cross-origin requests

DEVELOPMENT:
- Vite (for frontend development)
- dotenv for environment variables

## 📦 Installation & Setup

1. CLONE THE REPOSITORY:
   git clone https://github.com/your-username/duckchain-analyzer.git
   cd duckchain-analyzer

2. INSTALL DEPENDENCIES:
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install

3. ENVIRONMENT SETUP:
   Create a .env file in the server/ directory with:
   GEMINI_API_KEY=your_google_gemini_api_key_here
   PORT=3001
   
   Get your Gemini API key from Google AI Studio: https://aistudio.google.com/

4. RUN THE APPLICATION:
   # Terminal 1 - Start the backend (from server directory)
   npm run dev
   
   # Terminal 2 - Start the frontend (from root directory)
   npm run dev

5. OPEN YOUR BROWSER:
   Navigate to http://localhost:3000

## 🚀 How to Use

1. Enter any Ethereum-compatible smart contract address in the search field
2. Click the "Analyze Contract" button
3. View the AI-generated explanation including:
   - Contract purpose and functionality
   - Key capabilities in simple terms
   - Beginner-friendly summary
   - Confidence score indicating analysis reliability

## 🎯 Example Analysis

INPUT CONTRACT ADDRESS:
0x742d35Cc6634C0532925a3b844Bc454e4438f44e

OUTPUT EXPLANATION:
Purpose: This contract manages a digital currency, allowing users to hold, transfer, and trade it.

Key Functions: Allows people to own and move digital currency between accounts, automatically adds and removes funds from trading pools, and has administrative settings to control fees.

Summary: This is a digital currency that can be sent between people with built-in features for trading on exchanges.

Confidence Score: 92%

## 🔧 API Endpoints

POST /api/analyze - Analyze smart contract bytecode
Request:
{
  "bytecode": "0x608060405234801561001057600080fd5b5060...",
  "address": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
}

Response:
{
  "explanation": "Detailed analysis in plain English...",
  "confidence": 92
}

GET /health - Health check endpoint
Response: { status: 'OK', message: 'Server is running', timestamp: '...' }

## 🏗️ Project Structure

duckchain-analyzer/
├── public/                 # Static assets
├── src/                   # Frontend source code
│   ├── components/        # React components (HeroSection, ResultsSection, etc.)
│   ├── lib/        # React components (HeroSection, ResultsSection, etc.)
│   ├── api/              # Backend Express server
│   |   └── analyze.js               # Main API route handler
│   ├── assets/          # Images and static files
│   └── .env             # Environment variables
├── LICENSE              # MIT License
└── README.md            # Documentation

## 🐛 Troubleshooting

COMMON ISSUES:
1. "Analysis service unavailable" - Backend server not running or API key missing
2. "Invalid contract address" - Check the address format and blockchain network
3. "API timeout" - Gemini API might be slow to respond

QUICK FIXES:
- Verify both frontend and backend servers are running
- Check that GEMINI_API_KEY is set in server/.env
- Ensure contract address exists on the blockchain
- Check browser console and server logs for specific error messages

## 📝 License

MIT License - See LICENSE file for details.

## ⚠️ Important Disclaimer

This tool provides AI-generated explanations for educational purposes only. The analysis should not be considered financial, investment, or security advice. Always conduct your own research and audits before interacting with smart contracts.

## 🌟 Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## 🆘 Support

If you encounter issues:
1. Check that your Gemini API key is properly set
2. Ensure both frontend (port 3000) and backend (port 3001) are running
3. Verify the contract address is valid and exists on the blockchain
4. Check the browser console (F12) and server logs for error messages

For additional help, please open an issue on GitHub.

---

Built with ❤️ for the Web3 community
