import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SurahCard } from "./SurahCard";
import { surahs } from "@/data/surahs";
import { Search } from "lucide-react";

interface SurahsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSurahSelect: (pageNumber: number) => void;
}

export const SurahsModal = ({ open, onOpenChange, onSurahSelect }: SurahsModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSurahs = surahs.filter(surah =>
    surah.banglaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.arabicName.includes(searchTerm) ||
    surah.id.toString().includes(searchTerm)
  );

  const handleSurahClick = (pageNumber: number) => {
    onSurahSelect(pageNumber);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] bg-background border-islamic-green/20 shadow-modal" aria-describedby="surahs-modal-description">
        <DialogHeader className="border-b border-islamic-green-light/30 pb-4">
          <DialogTitle className="text-2xl font-bold text-center text-islamic-green">
            সূরা সমূহ
          </DialogTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="সূরার নাম বা নম্বর দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-islamic-green-light focus:border-islamic-green"
            />
          </div>
        </DialogHeader>
        <ScrollArea className="flex-1 px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-4">
            {filteredSurahs.map((surah) => (
              <SurahCard
                key={surah.id}
                surah={surah}
                onClick={() => handleSurahClick(surah.pageNumber)}
              />
            ))}
          </div>
        </ScrollArea>
        <div id="surahs-modal-description" className="sr-only">
          কুরআনের ১১৪টি সূরার তালিকা। যে কোনো সূরায় ক্লিক করে সরাসরি সেই পৃষ্ঠায় যান।
        </div>
      </DialogContent>
    </Dialog>
  );
};