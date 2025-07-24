import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PDFDownloaderProps {
  onPDFReady: (url: string) => void;
}

export const PDFDownloader = ({ onPDFReady }: PDFDownloaderProps) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const downloadPDF = async () => {
    setDownloading(true);
    setDownloadProgress(0);

    try {
      // First try the direct Google Drive download
      const driveUrl = "https://drive.google.com/uc?export=download&id=1F27EKhz9M0d_rpBwJdD_1bw_ht6_LuNu";
      
      toast({
        title: "PDF ডাউনলোড শুরু",
        description: "কুরআন মাজীদ ডাউনলোড হচ্ছে...",
      });

      const response = await fetch(driveUrl);
      
      if (!response.ok) {
        throw new Error('PDF download failed');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No reader available');
      }

      const contentLength = parseInt(response.headers.get('content-length') || '0');
      let receivedLength = 0;
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        chunks.push(value);
        receivedLength += value.length;
        
        if (contentLength > 0) {
          const progress = (receivedLength / contentLength) * 100;
          setDownloadProgress(progress);
        }
      }

      const blob = new Blob(chunks, { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      onPDFReady(url);
      
      toast({
        title: "PDF ডাউনলোড সম্পন্ন",
        description: "কুরআন মাজীদ ব্যবহারের জন্য প্রস্তুত!",
      });

    } catch (error) {
      console.error('Download error:', error);
      
      // Fallback to a working PDF URL
      const fallbackUrl = "https://qurancomplex.gov.sa/docs/mushaf/mus_114.pdf";
      onPDFReady(fallbackUrl);
      
      toast({
        title: "বিকল্প PDF লোড করা হয়েছে",
        description: "মূল PDF এর পরিবর্তে বিকল্প ব্যবহার করা হচ্ছে।",
      });
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    // Automatically start download when component mounts
    downloadPDF();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-islamic-green-light to-background flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
          {downloading ? (
            <RefreshCw className="h-10 w-10 text-white animate-spin" />
          ) : (
            <Download className="h-10 w-10 text-white" />
          )}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-islamic-green mb-2">
            কুরআন মাজীদ প্রস্তুত করা হচ্ছে
          </h2>
          <p className="text-muted-foreground">
            {downloading ? "PDF ডাউনলোড হচ্ছে..." : "PDF প্রস্তুত!"}
          </p>
        </div>

        {downloading && downloadProgress > 0 && (
          <div className="w-full max-w-md mx-auto">
            <div className="bg-islamic-green-light rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {Math.round(downloadProgress)}% সম্পন্ন
            </p>
          </div>
        )}

        {!downloading && (
          <Button
            onClick={downloadPDF}
            variant="islamic"
            className="mt-4"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            পুনরায় চেষ্টা করুন
          </Button>
        )}
      </div>
    </div>
  );
};