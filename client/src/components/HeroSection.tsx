import { Eye } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

export const HeroSection = ({ title, subtitle, description }: HeroSectionProps) => {
  return (
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
              {title}
            </h1>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            {subtitle}
          </h2>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};