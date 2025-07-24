import { useState } from "react";
import { FeatureCard } from "@/components/FeatureCard";
import { SurahsModal } from "@/components/SurahsModal";
import { PageSearchModal } from "@/components/PageSearchModal";
import { Book, BookOpen, Search, Star, Menu, Home } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [surahsModalOpen, setSurahsModalOpen] = useState(false);
  const [pageSearchModalOpen, setPageSearchModalOpen] = useState(false);

  const handleSurahSelect = (pageNumber: number) => {
    toast({
      title: "সূরা নির্বাচিত",
      description: `পৃষ্ঠা ${pageNumber} এ যাচ্ছি...`,
    });
    // Here you would integrate with the PDF viewer
    console.log(`Navigating to page ${pageNumber}`);
  };

  const handlePageSelect = (pageNumber: number) => {
    toast({
      title: "পৃষ্ঠা নির্বাচিত",
      description: `পৃষ্ঠা ${pageNumber} এ যাচ্ছি...`,
    });
    // Here you would integrate with the PDF viewer
    console.log(`Navigating to page ${pageNumber}`);
  };

  const handleParasClick = () => {
    toast({
      title: "শীঘ্রই আসছে",
      description: "পারা সমূহের ফিচার শীঘ্রই যোগ করা হবে।",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-islamic-green-light to-background">
      {/* Header */}
      <header className="bg-gradient-header text-white p-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Book className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold">কুরআন মাজীদ</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                <Star className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Verse of the day section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-card border border-islamic-green-light/30">
          <div className="text-center">
            <p className="text-2xl font-bold text-islamic-green mb-2">
              "তোমরা কোরআন পড়ো, কেননা কিয়ামতের দিন তা তোমাদের জন্য সুপারিশ করবে।"
            </p>
            <p className="text-islamic-green/80 font-medium">
              (হাদিস, মুসলিম)
            </p>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="container mx-auto px-4 pb-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-islamic-green mb-2">
            প্রয়োজনীয় আমলের সূরা সমূহ
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <FeatureCard
            title="সূরা ইয়াসিন"
            icon={BookOpen}
            onClick={() => handleSurahSelect(443)}
          />
          <FeatureCard
            title="আয়াতুল কুরসী"
            icon={BookOpen}
            onClick={() => handleSurahSelect(2)}
          />
          <FeatureCard
            title="সূরা কাহফ"
            icon={BookOpen}
            onClick={() => handleSurahSelect(296)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="সূরা সমূহ"
            icon={Book}
            onClick={() => setSurahsModalOpen(true)}
          />
          <FeatureCard
            title="পারা সমূহ"
            icon={BookOpen}
            onClick={handleParasClick}
          />
          <FeatureCard
            title="পৃষ্ঠা সার্চ"
            icon={Search}
            onClick={() => setPageSearchModalOpen(true)}
          />
        </div>
      </section>

      {/* Bottom navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gradient-header text-white p-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex justify-around items-center">
            <button className="flex flex-col items-center space-y-1 text-white/80 hover:text-white transition-colors">
              <Home className="h-5 w-5" />
              <span className="text-xs">হোম</span>
            </button>
            <button className="flex flex-col items-center space-y-1 text-white/80 hover:text-white transition-colors">
              <Search className="h-5 w-5" />
              <span className="text-xs">সার্চ</span>
            </button>
            <button className="flex flex-col items-center space-y-1 text-white/80 hover:text-white transition-colors">
              <Book className="h-5 w-5" />
              <span className="text-xs">বুকমার্ক</span>
            </button>
            <button className="flex flex-col items-center space-y-1 text-white/80 hover:text-white transition-colors">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs">পড়ুন</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SurahsModal
        open={surahsModalOpen}
        onOpenChange={setSurahsModalOpen}
        onSurahSelect={handleSurahSelect}
      />
      <PageSearchModal
        open={pageSearchModalOpen}
        onOpenChange={setPageSearchModalOpen}
        onPageSelect={handlePageSelect}
      />
    </div>
  );
};

export default Index;
