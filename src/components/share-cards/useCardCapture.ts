"use client";

import { useRef, useState, useCallback } from "react";
import { toPng } from "html-to-image";

interface UseCardCaptureOptions {
  fileName: string;
  shareText?: string;
}

export function useCardCapture({ fileName, shareText }: UseCardCaptureOptions) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const canNativeShare =
    typeof navigator !== "undefined" &&
    typeof navigator.share === "function" &&
    typeof navigator.canShare === "function";

  const captureCard = useCallback(async (): Promise<Blob> => {
    if (!cardRef.current) throw new Error("Card ref not mounted");

    await document.fonts.ready;

    const options = { cacheBust: true, pixelRatio: 2 };

    // iOS Safari workaround: first call warms up canvas, second produces correct output
    await toPng(cardRef.current, options).catch(() => {});
    const dataUrl = await toPng(cardRef.current, options);

    const res = await fetch(dataUrl);
    return res.blob();
  }, []);

  const handleDownload = useCallback(async () => {
    setIsCapturing(true);
    try {
      const blob = await captureCard();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsCapturing(false);
    }
  }, [captureCard, fileName]);

  const handleShare = useCallback(async () => {
    setIsCapturing(true);
    try {
      const blob = await captureCard();
      const file = new File([blob], fileName, { type: "image/png" });

      if (
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: "My KAMURA Results",
          text: shareText || "",
        });
      } else {
        // Fallback: download
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      }
    } finally {
      setIsCapturing(false);
    }
  }, [captureCard, fileName, shareText]);

  return { cardRef, isCapturing, handleDownload, handleShare, canNativeShare };
}
