import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ContentContainer, Eyebrow, ActionButton } from '../ui/UIElements';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export const ResumeView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return Math.min(window.innerWidth - 48, 750);
    }
    return 750;
  });
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        setContainerWidth(Math.min(w, 750));
      }
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const response = await fetch('/AngatShah_Resume.pdf');
      const blob = await response.blob();
      // Using application/octet-stream ensures iOS Safari & mobile browsers do not treat
      // the file as an inline preview tab, routing it to the system download prompt
      const octetBlob = new Blob([blob], { type: 'application/octet-stream' });
      const blobUrl = window.URL.createObjectURL(octetBlob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'AngatShah_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
        setDownloading(false);
      }, 800);
    } catch {
      window.location.href = '/download-resume';
      setDownloading(false);
    }
  };

  return (
    <ContentContainer>
      <div className="flex flex-col w-full pb-16">
        <Eyebrow>Curriculum Vitae</Eyebrow>
        <h1 className="font-display mt-3 text-[2rem] font-normal leading-[1.05] tracking-tight text-white sm:text-[2.5rem]">
          Angat Shah
        </h1>
        <p className="mt-2 font-mono text-[0.82rem] tracking-wide text-white/50">
          B.Tech · Computer Science & Engineering · Updated Sep 2026
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <ActionButton href="/AngatShah_Resume.pdf">
            Open PDF
          </ActionButton>
          <ActionButton
            href="/download-resume"
            download="AngatShah_Resume.pdf"
            onClick={handleDownload}
          >
            {downloading ? 'Downloading...' : 'Download PDF'}
          </ActionButton>
        </div>

        <div className="mt-7 w-full border-t border-white/10" />

        {/* Paper Document Container with zero layout shifts */}
        <div className="mt-8 flex w-full justify-center" ref={containerRef}>
          <div className="relative w-full max-w-[750px] aspect-[1/1.414] bg-white rounded-md shadow-2xl shadow-black/80 overflow-hidden border border-neutral-300">
            {/* Stable loading spinner inside the white paper */}
            {!isPageLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white z-0">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800" />
                <p className="font-mono text-xs tracking-wider text-neutral-500">Loading document...</p>
              </div>
            )}

            <Document
              file="/AngatShah_Resume.pdf"
              loading={null}
              className="w-full flex justify-center"
            >
              <div className={`w-full flex justify-center transition-opacity duration-200 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <Page
                  pageNumber={1}
                  width={containerWidth}
                  renderAnnotationLayer={true}
                  renderTextLayer={true}
                  loading={null}
                  onRenderSuccess={() => setIsPageLoaded(true)}
                />
              </div>
            </Document>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};

export default ResumeView;
