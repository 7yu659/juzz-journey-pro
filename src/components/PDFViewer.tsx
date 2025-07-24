import { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Home } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { PDFDownloader } from './PDFDownloader';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  onGoHome: () => void;
  initialPage?: number;
}

export const PDFViewer = ({ onGoHome, initialPage = 1 }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(initialPage);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [pdfReady, setPdfReady] = useState<boolean>(false);

  const handlePDFReady = (url: string) => {
    setPdfUrl(url);
    setPdfReady(true);
    setLoading(false);
  };

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    toast({
      title: "PDF লোড সম্পন্ন",
      description: `মোট ${numPages} পৃষ্ঠা`,
    });
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('PDF Load Error:', error);
    setLoading(false);
    toast({
      title: "PDF লোড করতে সমস্যা",
      description: "অনুগ্রহ করে পুনরায় চেষ্টা করুন",
      variant: "destructive",
    });
  }, []);

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const rotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= numPages) {
      setPageNumber(page);
    }
  };

  // Show downloader if PDF is not ready yet
  if (!pdfReady) {
    return <PDFDownloader onPDFReady={handlePDFReady} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-header text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onGoHome}
            className="text-white hover:bg-white/20"
          >
            <Home className="h-4 w-4 mr-2" />
            হোম
          </Button>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm">
              পৃষ্ঠা {pageNumber} / {numPages}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={zoomOut}
              className="text-white hover:bg-white/20"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={zoomIn}
              className="text-white hover:bg-white/20"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={rotate}
              className="text-white hover:bg-white/20"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 flex justify-center items-center p-4 bg-gray-100">
        {loading && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-green mx-auto mb-4"></div>
            <p className="text-islamic-green">PDF লোড হচ্ছে...</p>
          </div>
        )}
        
        {pdfUrl && (
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={null}
            className="shadow-lg"
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              rotate={rotation}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-lg"
            />
          </Document>
        )}
      </div>

      {/* Navigation */}
      <div className="bg-gradient-header text-white p-4">
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="text-white hover:bg-white/20 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            পূর্ববর্তী
          </Button>

          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={pageNumber}
              onChange={(e) => goToPage(parseInt(e.target.value))}
              className="w-16 px-2 py-1 text-center bg-white/20 border border-white/30 rounded text-white placeholder-white/70"
              min="1"
              max={numPages}
            />
            <span className="text-sm">/ {numPages}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="text-white hover:bg-white/20 disabled:opacity-50"
          >
            পরবর্তী
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};