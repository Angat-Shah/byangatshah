import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ContentContainer, Eyebrow, ActionButton } from '../ui/UIElements';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export const ResumeView: React.FC = () => {
  const [numPages, setNumPages] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <ContentContainer>
      {/* Ensure parent modal allows scrolling if it overflows */}
      <div className="stagger flex flex-col w-full pb-16">
        <Eyebrow>Curriculum Vitae</Eyebrow>
        <h1 className="font-display mt-3 text-[2rem] font-normal leading-[1.05] tracking-tight text-white sm:text-[2.5rem]">
          Angat Shah
        </h1>
        <p className="mt-2 font-mono text-[0.82rem] tracking-wide text-white/50">
          B.Tech · Computer Science & Engineering · Updated Sep 2026
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <ActionButton href="/resume.pdf">
            Open PDF
          </ActionButton>
          <ActionButton href="/resume.pdf" download="Angat_Shah_Resume.pdf">
            Download PDF
          </ActionButton>
        </div>

        <div className="mt-7 w-full border-t border-white/10" />

        {/* Paper Document Container */}
        <div className="mt-8 flex w-full justify-center">
          <Document
            file="/resume.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="py-20 text-center font-mono text-sm text-white/40">
                Loading Document...
              </div>
            }
            className="flex flex-col items-center gap-8 w-full"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div
                key={`page_${index + 1}`}
                className="overflow-hidden rounded-md border border-neutral-700/40 shadow-2xl shadow-black/80 transition-transform duration-300"
              >
                <Page
                  pageNumber={index + 1}
                  renderAnnotationLayer={true}
                  renderTextLayer={true}
                  width={Math.min(window.innerWidth * 0.85, 750)}
                />
              </div>
            ))}
          </Document>
        </div>
      </div>
    </ContentContainer>
  );
};

export default ResumeView;
