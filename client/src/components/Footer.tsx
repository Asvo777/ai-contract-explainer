import { Heart, Brain, Zap, Shield } from "lucide-react";

export const Footer = () => {
  const techStack = [
    { name: "OpenAI", icon: Brain, description: "AI Analysis" },
    { name: "DuckChain", icon: Shield, description: "Blockchain Network" },
    { name: "React", icon: Zap, description: "Frontend Framework" }
  ];

  return (
    <footer className="bg-gradient-subtle border-t border-primary/10 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Footer Message */}
          <div className="mb-8">
            <p className="text-lg text-foreground flex items-center justify-center gap-2 mb-4">
              Built with 
              <Heart className="h-5 w-5 text-red-500 fill-current animate-pulse" /> 
              for the DuckChain Hackathon
            </p>
            <p className="text-muted-foreground">
              Making blockchain technology accessible through AI-powered contract analysis
            </p>
          </div>
          
          {/* Tech Stack */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {techStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <div key={tech.name} className="flex items-center justify-center gap-3 p-4 bg-white/50 rounded-lg border border-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{tech.name}</div>
                    <div className="text-sm text-muted-foreground">{tech.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Copyright */}
          <div className="pt-6 border-t border-primary/10">
            <p className="text-sm text-muted-foreground">
              © 2024 Contract Lens. Powered by AI for DuckChain developers and users.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};