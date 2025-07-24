import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface PageSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPageSelect: (pageNumber: number) => void;
}

export const PageSearchModal = ({ open, onOpenChange, onPageSelect }: PageSearchModalProps) => {
  const [pageNumber, setPageNumber] = useState("");

  const handleSubmit = () => {
    const page = parseInt(pageNumber);
    if (page && page >= 1 && page <= 613) {
      onPageSelect(page);
      onOpenChange(false);
      setPageNumber("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-background border-islamic-green/20 shadow-modal" aria-describedby="page-search-description">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-islamic-green flex items-center justify-center gap-2">
            <BookOpen className="h-6 w-6" />
            পৃষ্ঠা সার্চ
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              পৃষ্ঠা নম্বর লিখুন (১-৬১৩)
            </p>
            <Input
              type="number"
              placeholder="পৃষ্ঠা নম্বর"
              value={pageNumber}
              onChange={(e) => setPageNumber(e.target.value)}
              onKeyPress={handleKeyPress}
              className="text-center text-lg border-islamic-green-light focus:border-islamic-green"
              min="1"
              max="613"
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!pageNumber || parseInt(pageNumber) < 1 || parseInt(pageNumber) > 613}
            variant="islamic"
            className="w-full"
          >
            পড়ুন
          </Button>
        </div>
        <div id="page-search-description" className="sr-only">
          কুরআনের যে কোনো পৃষ্ঠায় সরাসরি যাওয়ার জন্য পৃষ্ঠা নম্বর লিখুন।
        </div>
      </DialogContent>
    </Dialog>
  );
};