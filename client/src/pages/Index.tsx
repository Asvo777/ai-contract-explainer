import { useState } from "react";
import { Search, Zap, Shield, Eye } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { ResultsSection } from "@/components/ResultsSection";
import { ExamplesSection } from "@/components/ExamplesSection";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroBackground from "@/assets/hero-bg.jpg";

const Index = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    address: string;
    explanation: string;
    confidence: number;
  } | null>(null);

  const handleAnalyze = async () => {
    if (!contractAddress) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setAnalysisResult({
        address: contractAddress,
        explanation: "This is a decentralized exchange (DEX) router contract that allows users to swap tokens on DuckChain. It handles multi-hop token swaps, maintains liquidity pools, and ensures secure price calculations. The contract includes functions for adding/removing liquidity, swapping exact tokens for tokens, and supporting fee-on-transfer tokens. It implements slippage protection and deadline checks to prevent front-running attacks.",
        confidence: 87
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleExampleClick = (address: string) => {
    setContractAddress(address);
    setAnalysisResult(null);
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
            <div className="flex items-center justify-center gap-3 mb-6">
              <Eye className="h-12 w-12 text-primary" />
              <h1 className="text-5xl md:text-6xl font-bold bg-hero-gradient bg-clip-text text-transparent">
                Contract Lens
              </h1>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              See what any DuckChain contract really does.
            </h2>
            
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Paste a contract address below. Our AI will analyze the bytecode and give you a simple, 
              plain-English explanation of its purpose and functions.
            </p>
            
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