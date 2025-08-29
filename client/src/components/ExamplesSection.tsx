import { ArrowRight, Coins, Image, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ExamplesSectionProps {
  onExampleClick: (address: string) => void;
}

const examples = [
  {
    id: "dex-router",
    title: "A DEX Swap Router",
    description: "Multi-hop token swapping with liquidity pools",
    address: "0x742d35Cc6634C0532925a3b8D0c8B9B4E4f44e",
    icon: Repeat,
    color: "text-blue-500"
  },
  {
    id: "nft-collection", 
    title: "An NFT Collection",
    description: "ERC-721 contract with minting and metadata",
    address: "0x891f3f0c6d8c4f8b6f2c8d9e4f3b8c7d6e5f4a2",
    icon: Image,
    color: "text-purple-500"
  },
  {
    id: "token-contract",
    title: "A Token Contract", 
    description: "ERC-20 with transfer controls and staking",
    address: "0x123f4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c",
    icon: Coins,
    color: "text-green-500"
  }
];

export const ExamplesSection = ({ onExampleClick }: ExamplesSectionProps) => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Need an example?</h2>
          <p className="text-muted-foreground">
            Try one of these popular contract types to see Contract Lens in action
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {examples.map((example) => {
            const Icon = example.icon;
            
            return (
              <Card key={example.id} className="group hover:shadow-card transition-all duration-300 border-primary/10 hover:border-primary/30">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-gradient-subtle rounded-lg w-fit">
                    <Icon className={`h-8 w-8 ${example.color}`} />
                  </div>
                  <CardTitle className="text-lg">{example.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {example.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <Button 
                    variant="example"
                    className="w-full group-hover:bg-primary/10"
                    onClick={() => onExampleClick(example.address)}
                  >
                    Try This Contract
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Click any example to auto-populate the analyzer and see instant results
          </p>
        </div>
      </div>
    </section>
  );
};