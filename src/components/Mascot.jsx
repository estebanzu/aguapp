import { useState, useEffect } from "react";

const messages = {
  welcome: {
    fr: "Bonjour ! On apprend ensemble ?",
    es: "¡Hola! ¿Aprendemos juntos?",
  },
  explore: { fr: "Touche pour écouter !", es: "¡Toca para escuchar!" },
  quiz: { fr: "Prêt pour le défi ?", es: "¿Listo para el desafío?" },
  correct: { fr: "Bravo !", es: "¡Bravo!" },
  wrong: { fr: "Essaie encore !", es: "¡Inténtalo de nuevo!" },
  perfect: { fr: "Champion !", es: "¡Campeón!" },
  streak: { fr: "Quel exploit !", es: "¡Qué hazaña!" },
};

export default function Mascot({
  message = "welcome",
  size = "md",
  animate = true,
}) {
  const [isWaving, setIsWaving] = useState(false);
  const [currentMsg, setCurrentMsg] = useState(null);

  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  useEffect(() => {
    if (message && messages[message]) {
      setCurrentMsg(messages[message]);
      if (animate) {
        setIsWaving(true);
        const timer = setTimeout(() => setIsWaving(false), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [message, animate]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${sizes[size]} relative ${animate ? "animate-bounce-in" : ""}`}
      >
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Body */}
          <ellipse cx="60" cy="70" rx="35" ry="40" fill="#8B6F47" />
          {/* Belly */}
          <ellipse cx="60" cy="75" rx="22" ry="25" fill="#C4A77D" />
          {/* Head */}
          <circle cx="60" cy="38" r="28" fill="#8B6F47" />
          {/* Ears */}
          <ellipse cx="35" cy="18" rx="10" ry="14" fill="#8B6F47" />
          <ellipse cx="35" cy="18" rx="6" ry="10" fill="#C4A77D" />
          <ellipse cx="85" cy="18" rx="10" ry="14" fill="#8B6F47" />
          <ellipse cx="85" cy="18" rx="6" ry="10" fill="#C4A77D" />
          {/* Eyes */}
          <circle cx="48" cy="35" r="5" fill="white" />
          <circle cx="72" cy="35" r="5" fill="white" />
          <circle cx="49" cy="36" r="3" fill="#1a1a1a" />
          <circle cx="73" cy="36" r="3" fill="#1a1a1a" />
          <circle cx="50" cy="35" r="1" fill="white" />
          <circle cx="74" cy="35" r="1" fill="white" />
          {/* Nose */}
          <ellipse cx="60" cy="43" rx="4" ry="3" fill="#1a1a1a" />
          {/* Mouth */}
          <path
            d="M 52 48 Q 60 54 68 48"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="1.5"
          />
          {/* Cheeks */}
          <circle cx="40" cy="45" r="5" fill="#FFB5B5" opacity="0.6" />
          <circle cx="80" cy="45" r="5" fill="#FFB5B5" opacity="0.6" />
          {/* Arms */}
          <g
            className={
              isWaving
                ? "origin-[85px_60px] animate-[wave_0.5s_ease-in-out_3]"
                : ""
            }
          >
            <ellipse
              cx="28"
              cy="68"
              rx="8"
              ry="14"
              fill="#8B6F47"
              transform="rotate(-15 28 68)"
            />
          </g>
          <ellipse
            cx="92"
            cy="68"
            rx="8"
            ry="14"
            fill="#8B6F47"
            transform="rotate(15 92 68)"
          />
          {/* Feet */}
          <ellipse cx="45" cy="108" rx="12" ry="7" fill="#8B6F47" />
          <ellipse cx="75" cy="108" rx="12" ry="7" fill="#8B6F47" />
        </svg>
      </div>
      {currentMsg && (
        <div className="bg-white rounded-2xl px-4 py-2 shadow-md border border-gray-100 max-w-[200px] text-center relative animate-pop">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45" />
          <p className="font-display text-xs font-bold text-gray-700 relative z-10">
            {currentMsg.fr}
          </p>
          <p className="font-body text-[10px] text-gray-400 relative z-10">
            {currentMsg.es}
          </p>
        </div>
      )}
    </div>
  );
}
