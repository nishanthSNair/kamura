"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PeptidePen() {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => router.push("/peptides"), 700);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a241a] via-[#2D3E2D] to-[#3F5C3F] p-8 md:p-14 text-white min-h-[480px]">
      {/* ambient dots */}
      <div className="absolute inset-0 opacity-30" aria-hidden>
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#C4A882]"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animation: `twinkle ${2 + (i % 5)}s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT: copy */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] tracking-[0.25em] uppercase font-semibold bg-[#C4A882]/20 text-[#E5D3B0] border border-[#C4A882]/30">
            Peptide Intelligence Hub
          </div>
          <h2 className="font-serif text-4xl md:text-6xl mt-6 leading-[1.05] tracking-tight">
            Click the pen.
            <br />
            <span className="italic text-[#C4A882]">See the science.</span>
          </h2>
          <p className="text-base md:text-lg mt-5 text-white/70 max-w-md">
            Every peptide, every protocol, every study — scored, tracked, and explainable.
            Your dashboard, your tools, your evidence feed.
          </p>
          <button
            onClick={handleClick}
            className="mt-8 inline-flex items-center gap-2 bg-[#C4A882] hover:bg-[#B09772] text-[#1a241a] rounded-full px-6 py-3 font-medium transition-all hover:-translate-y-0.5"
          >
            Enter the hub <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>

        {/* RIGHT: interactive pen */}
        <div className="relative h-[360px] flex items-center justify-center">
          <button
            onClick={handleClick}
            aria-label="Enter peptide hub"
            className={`relative transition-all duration-700 ease-out ${
              clicked ? "scale-110 rotate-[25deg]" : "hover:-rotate-6 hover:scale-105"
            }`}
          >
            {/* Pen SVG */}
            <svg width="280" height="300" viewBox="0 0 280 300" className="drop-shadow-2xl">
              {/* pen body (top cap) */}
              <rect x="110" y="30" width="60" height="40" rx="8" fill="#E5D3B0" />
              <rect x="110" y="30" width="60" height="8" rx="4" fill="#C4A882" />

              {/* main body */}
              <rect x="100" y="70" width="80" height="130" rx="6" fill="#FAF7F2" stroke="#D4D4D4" strokeWidth="1" />

              {/* dose window */}
              <rect x="115" y="100" width="50" height="32" rx="3" fill="#1a241a" />
              <text
                x="140"
                y="121"
                textAnchor="middle"
                fill="#C4A882"
                fontSize="14"
                fontFamily="monospace"
                fontWeight="bold"
              >
                2.5mg
              </text>

              {/* Kamura mark */}
              <text
                x="140"
                y="160"
                textAnchor="middle"
                fill="#2D3E2D"
                fontSize="9"
                fontFamily="serif"
                letterSpacing="2"
              >
                KAMURA
              </text>
              <text
                x="140"
                y="175"
                textAnchor="middle"
                fill="#B5886A"
                fontSize="7"
                letterSpacing="1.5"
              >
                BPC-157
              </text>

              {/* dose dial */}
              <circle cx="140" cy="190" r="10" fill="#C4A882" />
              <circle cx="140" cy="190" r="3" fill="#1a241a" />

              {/* neck */}
              <rect x="120" y="200" width="40" height="15" fill="#D4D4D4" />

              {/* needle cap (transparent) */}
              <path
                d="M 115 215 L 165 215 L 158 270 L 122 270 Z"
                fill="#FAF7F2"
                fillOpacity="0.3"
                stroke="#C4A882"
                strokeWidth="1"
              />
              <rect x="135" y="270" width="10" height="15" fill="#888" />
              <rect x="137" y="285" width="6" height="12" fill="#666" />

              {/* droplet (appears on click) */}
              {clicked && (
                <g className="pen-drop">
                  <circle cx="140" cy="298" r="4" fill="#C4A882" />
                  <circle cx="140" cy="298" r="4" fill="#C4A882" opacity="0.4" />
                </g>
              )}
            </svg>

            {/* Molecule orbit */}
            <svg
              className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                clicked ? "opacity-100" : "opacity-60"
              }`}
              width="100%"
              height="100%"
              viewBox="0 0 280 300"
            >
              <g className="molecule-orbit">
                <circle cx="60" cy="90" r="3" fill="#C4A882" />
                <circle cx="220" cy="120" r="3" fill="#B5886A" />
                <circle cx="50" cy="200" r="3" fill="#C4A882" />
                <circle cx="230" cy="220" r="3" fill="#B5886A" />
              </g>
            </svg>

            {/* pulsing prompt */}
            <div
              className={`absolute -right-4 top-8 bg-white text-[#1a241a] rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg transition-opacity duration-500 ${
                clicked ? "opacity-0" : "opacity-100 animate-bounce"
              }`}
            >
              Click me ↓
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.7;
          }
        }
        .molecule-orbit {
          transform-origin: 140px 150px;
          animation: orbit 14s linear infinite;
        }
        @keyframes orbit {
          to {
            transform: rotate(360deg);
          }
        }
        .pen-drop {
          animation: drop 0.6s ease-in forwards;
        }
        @keyframes drop {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(10px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
