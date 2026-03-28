"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useCardCapture } from "./useCardCapture";

interface ShareCardModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  fileName: string;
  shareText?: string;
  cardWidth: number;
  cardHeight: number;
  children: ReactNode;
}

export default function ShareCardModal({
  open,
  onClose,
  title,
  fileName,
  shareText,
  cardWidth,
  cardHeight,
  children,
}: ShareCardModalProps) {
  const { cardRef, isCapturing, handleDownload, handleShare, canNativeShare } =
    useCardCapture({ fileName, shareText });
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    if (!open) return;

    const computeScale = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const maxW = vw - 64; // 32px padding each side
      const maxH = vh - 200; // room for header + buttons
      const scaleW = maxW / cardWidth;
      const scaleH = maxH / cardHeight;
      setScale(Math.min(scaleW, scaleH, 0.45));
    };

    computeScale();
    window.addEventListener("resize", computeScale);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("resize", computeScale);
      document.body.style.overflow = "";
    };
  }, [open, cardWidth, cardHeight]);

  if (!open) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-start bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-lg mx-auto px-4 py-8 flex flex-col items-center">
        {/* Header */}
        <div className="flex items-center justify-between w-full mb-5">
          <h3 className="font-serif text-lg text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1"
            data-html2image-ignore="true"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Card preview container */}
        <div
          ref={containerRef}
          className="relative rounded-xl overflow-hidden shadow-2xl"
          style={{
            width: cardWidth * scale,
            height: cardHeight * scale,
          }}
        >
          <div
            ref={cardRef}
            style={{
              width: cardWidth,
              height: cardHeight,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            {children}
          </div>

          {/* Capture overlay */}
          {isCapturing && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-6 w-full justify-center">
          <button
            onClick={handleDownload}
            disabled={isCapturing}
            className="flex-1 max-w-[180px] px-5 py-3 bg-white text-gray-900 text-sm font-sans font-semibold rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
          </button>
          {canNativeShare && (
            <button
              onClick={handleShare}
              disabled={isCapturing}
              className="flex-1 max-w-[180px] px-5 py-3 bg-[#B5886A] text-white text-sm font-sans font-semibold rounded-xl hover:bg-[#9A7357] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              Share
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
