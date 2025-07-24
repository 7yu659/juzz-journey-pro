import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export const FeatureCard = ({ title, icon: Icon, onClick, className = "" }: FeatureCardProps) => {
  return (
    <Card 
      className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-button bg-gradient-card border-islamic-green-light/20 hover:border-islamic-green/30 animate-fade-in group ${className}`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
          <Icon size={28} />
        </div>
        <h3 className="font-semibold text-lg text-foreground group-hover:text-islamic-green transition-colors">
          {title}
        </h3>
      </div>
    </Card>
  );
};