import { ArrowRight, Coins, Image, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ExamplesSectionProps {
  onExampleClick: (address: string) => void;
}

const examples = [
  { // https://www.oklink.com/duckchain/address/0x7e678e45037d3739e0673abdd12b123c488d41ab/token-transfer
    id: "dex-liquidity-pool",
    title: "A DEX Liquidity Pool",
    description: "This contract is a liquidity pool for a decentralized exchange (DEX), holding reserves of multiple tokens to facilitate automated trading and swaps.",
    address: "0x7e678e45037d3739e0673abdd12b123c488d41ab",
    icon: Repeat,
    color: "text-blue-500"
  },
  { // https://www.oklink.com/duckchain/token/0x375c86716773feb3ec70c96409c228df14036ba3
    id: "nft-collection", 
    title: "An NFT Collection",
    description: "This is an ERC-721 smart contract that manages the ownership, transfers, and metadata for the 'NFT DuckDuckGo (DDG)' collection.",
    address: "0x375c86716773feb3ec70c96409c228df14036ba3",
    icon: Image,
    color: "text-purple-500"
  },
  { // 
    id: "token-contract",
    title: "A Token Contract",
    description: "Main contract for a token, handling transfers, balances, and approvals for its holders.",
    address: "0xc0ac932cac7b4d8f7c31792082e2e8f3cfe99c10",
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