import { Card } from "@/components/ui/card";
import { Surah } from "@/data/surahs";

interface SurahCardProps {
  surah: Surah;
  onClick?: () => void;
}

export const SurahCard = ({ surah, onClick }: SurahCardProps) => {
  return (
    <Card 
      className="p-4 cursor-pointer transition-all duration-300 hover:shadow-button bg-gradient-card border-islamic-green-light/20 hover:border-islamic-green/30 animate-fade-in group"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
            {surah.id}
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-foreground group-hover:text-islamic-green transition-colors">
              {surah.banglaName}
            </h3>
            <p className="text-right text-lg font-arabic text-islamic-green/80">
              {surah.arabicName}
            </p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground bg-islamic-green-light px-3 py-1 rounded-full">
          পৃষ্ঠা {surah.pageNumber}
        </div>
      </div>
    </Card>
  );
};