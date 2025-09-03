import { useState } from "react";
import { Search, Zap, Shield, Eye } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { ResultsSection } from "@/components/ResultsSection";
import { ExamplesSection } from "@/components/ExamplesSection";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroBackground from "@/assets/hero-bg.jpg";

import { getContractBytecode } from "../lib/blockchain";

const Index = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    address: string;
    explanation: string;
    confidence: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null); 

  const handleAnalyze = async () => {
    if (!contractAddress) return;
    
    setIsAnalyzing(true);
    setError(null); 
    setAnalysisResult(null); 
    
    try {
      
      console.log("Fetching bytecode for:", contractAddress);
      const bytecode = await getContractBytecode(contractAddress);
      console.log("Success! Bytecode length:", bytecode.length);

      const aiResponse = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bytecode, address: contractAddress })
      }).then(res => res.json());

      setAnalysisResult({
        address: contractAddress,
        explanation: aiResponse.explanation,
        confidence: 92
      });

    } catch (err) {
      console.error("Analysis failed:", err);
      console.log(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExampleClick = (address: string) => {
    setContractAddress(address);
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            {/* ... Your existing Hero JSX remains exactly the same ... */}
            
            {/* Input Section */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex gap-3 p-2 bg-white rounded-lg shadow-card border">
                <Input
                  placeholder="Enter DuckChain Contract Address (e.g., 0x...)"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  className="flex-1 border-0 bg-transparent text-base focus-visible:ring-0"
                />
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={!contractAddress || isAnalyzing}
                  className="px-8"
                >
                  {isAnalyzing ? (
                    <>
                      <Zap className="h-4 w-4 animate-pulse" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      Analyze Contract
                    </>
                  )}
                </Button>
              </div>
              {/* Display error message below input if it exists */}
              {error && <p className="text-sm text-red-500 mt-2 text-left">{error}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {(isAnalyzing || analysisResult) && (
        <ResultsSection 
          isLoading={isAnalyzing}
          result={analysisResult}
        />
      )}

      {/* Examples Section */}
      <ExamplesSection onExampleClick={handleExampleClick} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;