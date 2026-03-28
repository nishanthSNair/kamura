interface CardBrandingProps {
  variant?: "light" | "dark";
  url?: string;
}

export default function CardBranding({ variant = "dark", url = "kamuralife.com" }: CardBrandingProps) {
  const textColor = variant === "light" ? "#FAF7F2" : "#2A2520";
  const subtleColor = variant === "light" ? "rgba(250,247,242,0.6)" : "rgba(42,37,32,0.4)";
  const lineColor = variant === "light" ? "rgba(250,247,242,0.15)" : "rgba(42,37,32,0.1)";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "32px 0" }}>
      <div style={{ width: "100%", height: 1, background: lineColor }} />
      <div style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 8 }}>
        {/* Inline KAMURA logo symbol */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="160 140 480 380" width={48} height={38}>
          <defs>
            <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7a9e7e" /><stop offset="100%" stopColor="#5c7c5f" />
            </linearGradient>
            <linearGradient id="lg2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8aad8d" /><stop offset="100%" stopColor="#7a9e7e" />
            </linearGradient>
            <linearGradient id="lg3" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#95b897" /><stop offset="100%" stopColor="#7a9e7e" />
            </linearGradient>
            <linearGradient id="lg4" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7a9e7e" /><stop offset="100%" stopColor="#8aad8d" />
            </linearGradient>
            <linearGradient id="sg" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#7a9e7e" /><stop offset="100%" stopColor="#5c7c5f" />
            </linearGradient>
            <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c4a882" /><stop offset="50%" stopColor="#d4b896" /><stop offset="100%" stopColor="#b89b76" />
            </linearGradient>
          </defs>
          <path d="M 400 180 A 160 160 0 1 1 295 460" fill="none" stroke="url(#cg)" strokeWidth="8" strokeLinecap="round" opacity="0.85" />
          <path d="M 400 440 Q 400 380 400 310" fill="none" stroke="url(#sg)" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
          <path d="M 400 400 Q 340 370 310 310 Q 350 330 400 360 Z" fill="url(#lg1)" opacity="0.9" />
          <path d="M 400 400 Q 460 370 490 310 Q 450 330 400 360 Z" fill="url(#lg2)" opacity="0.9" />
          <path d="M 400 370 Q 350 330 330 265 Q 360 300 400 330 Z" fill="url(#lg3)" opacity="0.95" />
          <path d="M 400 370 Q 450 330 470 265 Q 440 300 400 330 Z" fill="url(#lg4)" opacity="0.95" />
          <path d="M 400 335 Q 365 290 355 225 Q 375 275 400 305 Z" fill="url(#lg1)" opacity="1" />
          <path d="M 400 335 Q 435 290 445 225 Q 425 275 400 305 Z" fill="url(#lg2)" opacity="1" />
          <path d="M 400 310 Q 385 255 390 195 Q 400 240 410 195 Q 415 255 400 310 Z" fill="url(#lg3)" opacity="1" />
          <circle cx="400" cy="200" r="3.5" fill="#7a9e7e" opacity="0.85" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "0.2em", color: textColor, fontFamily: "Inter, sans-serif" }}>
            KAMURA
          </span>
          <span style={{ fontSize: 14, color: subtleColor, fontFamily: "Inter, sans-serif", letterSpacing: "0.05em" }}>
            {url}
          </span>
        </div>
      </div>
    </div>
  );
}
