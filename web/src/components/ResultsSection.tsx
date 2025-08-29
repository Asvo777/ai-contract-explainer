import { CheckCircle, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AnalysisResult {
  address: string;
  explanation: string;
  confidence: number;
}

interface ResultsSectionProps {
  isLoading: boolean;
  result: AnalysisResult | null;
}

const LoadingAnimation = () => (
  <div className="space-y-4">
    <div className="h-4 bg-muted rounded animate-pulse"></div>
    <div className="h-4 bg-muted rounded animate-pulse w-4/5"></div>
    <div className="h-4 bg-muted rounded animate-pulse w-3/5"></div>
    <div className="relative overflow-hidden h-1 bg-muted rounded-full mt-6">
      <div className="absolute inset-0 bg-loading-pulse animate-pulse-loading"></div>
    </div>
  </div>
);

export const ResultsSection = ({ isLoading, result }: ResultsSectionProps) => {
  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
          <Activity className="h-8 w-8 text-primary" />
          Analysis Results
        </h2>
        
        <Card className="shadow-card border-primary/20">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-2 text-xl">
              {isLoading ? (
                <>
                  <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  Analyzing Contract...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Contract Analysis Complete
                </>
              )}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {isLoading ? (
              <LoadingAnimation />
            ) : result ? (
              <>
                {/* Contract Address */}
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
                    Contract Address
                  </h3>
                  <div className="font-mono text-lg bg-muted/50 p-3 rounded border">
                    {truncateAddress(result.address)}
                  </div>
                </div>
                
                {/* AI Explanation */}
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">
                    AI Explanation
                  </h3>
                  <div className="text-foreground leading-relaxed text-base p-4 bg-gradient-subtle rounded border">
                    {result.explanation}
                  </div>
                </div>
                
                {/* Confidence Meter */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Explanation Confidence
                    </h3>
                    <span className="text-sm font-medium text-primary">
                      {result.confidence}%
                    </span>
                  </div>
                  <Progress value={result.confidence} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Based on bytecode analysis and pattern recognition
                  </p>
                </div>
              </>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};