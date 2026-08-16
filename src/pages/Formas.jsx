import { useState } from "react";
import { speakBilingual } from "../utils/speech";
import { formas, formaQuestions } from "../data/formas";
import { playPop, playClick } from "../utils/sound";
import QuizMode from "../components/QuizMode";

function FormaSVG({ forma, size = 80, active = false }) {
  const fill = active ? "#FBBF24" : forma.color;
  const stroke = active ? "#F59E0B" : forma.color;
  const sw = active ? 3 : 2;

  switch (forma.svg) {
    case "circle":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill={fill}
            stroke={stroke}
            strokeWidth={sw}
          />
        </svg>
      );
    case "square":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <rect
            x="10"
            y="10"
            width="80"
            height="80"
            rx="4"
            fill={fill}
            stroke={stroke}
            strokeWidth={sw}
          />
        </svg>
      );
    case "triangle":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon
            points="50,8 92,92 8,92"
            fill={fill}
            stroke={stroke}
            strokeWidth={sw}
          />
        </svg>
      );
    case "rectangle":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <rect
            x="5"
            y="20"
            width="90"
            height="60"
            rx="4"
            fill={fill}
            stroke={stroke}
            strokeWidth={sw}
          />
        </svg>
      );
    case "star":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon
            points="50,5 61,38 95,38 68,60 79,95 50,72 21,95 32,60 5,38 39,38"
            fill={fill}
            stroke={stroke}
            strokeWidth={sw}
          />
        </svg>
      );
    case "heart":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <path
            d="M50,88 C25,65 5,50 5,30 C5,15 18,5 32,5 C40,5 47,10 50,15 C53,10 60,5 68,5 C82,5 95,15 95,30 C95,50 75,65 50,88Z"
            fill={fill}
            stroke={stroke}
            strokeWidth={sw}
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function Formas() {
  const [mode, setMode] = useState("explore");
  const [activeForma, setActiveForma] = useState(null);

  const handleFormaTap = (forma) => {
    playPop();
    setActiveForma(forma.id);
    speakBilingual(forma.frComplete, forma.esComplete, () => {
      setTimeout(() => setActiveForma(null), 500);
    });
  };

  const handleRepeat = () => {
    if (!activeForma) return;
    const forma = formas.find((f) => f.id === activeForma);
    if (forma) {
      playClick();
      speakBilingual(forma.frComplete, forma.esComplete);
    }
  };

  const renderFormaOption = (
    forma,
    { isCorrect, isSelectedWrong, onSelect, disabled },
  ) => (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`
        w-full aspect-square rounded-3xl flex flex-col items-center justify-center gap-2
        bg-white transition-all duration-200 shadow-md border-2 border-gray-100
        ${isSelectedWrong ? "animate-shake opacity-50 border-red-300" : ""}
        ${isCorrect ? "animate-pop ring-4 ring-yellow-400 ring-offset-2 border-yellow-300" : ""}
        ${disabled ? "cursor-not-allowed" : "active:scale-95 hover:scale-105 hover:shadow-lg"}
      `}
    >
      <FormaSVG forma={forma} size={60} active={isCorrect} />
      <span className="font-display font-bold text-sm text-gray-700">
        {forma.fr}
      </span>
      <span className="font-body text-xs text-gray-400">{forma.es}</span>
    </button>
  );

  return (
    <div className="px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-black text-gray-800">
            📐 Formes
          </h1>
          <p className="font-body text-gray-500">Formas</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setMode("explore");
              playClick();
            }}
            className={`px-4 py-2 rounded-xl font-display font-bold text-sm transition-all ${
              mode === "explore"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🔍 Explorer
          </button>
          <button
            onClick={() => {
              setMode("quiz");
              playClick();
            }}
            className={`px-4 py-2 rounded-xl font-display font-bold text-sm transition-all ${
              mode === "quiz"
                ? "bg-yellow-400 text-gray-800"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            ⭐ Jouer
          </button>
        </div>
      </div>

      {mode === "explore" ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 max-w-lg mx-auto">
            {formas.map((forma) => (
              <button
                key={forma.id}
                onClick={() => handleFormaTap(forma)}
                className={`
                  aspect-square rounded-3xl flex flex-col items-center justify-center gap-3
                  bg-white transition-all duration-300 shadow-lg border-2 border-gray-100
                  hover:scale-105 active:scale-95
                  ${activeForma === forma.id ? "scale-110 ring-4 ring-yellow-400 ring-offset-4 animate-glow border-yellow-300" : ""}
                `}
              >
                <FormaSVG
                  forma={forma}
                  size={70}
                  active={activeForma === forma.id}
                />
                <span className="font-display font-bold text-gray-700">
                  {forma.fr}
                </span>
                <span className="font-body text-xs text-gray-400">
                  {forma.es}
                </span>
              </button>
            ))}
          </div>

          {activeForma && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleRepeat}
                className="px-6 py-3 bg-white rounded-2xl shadow-md border-2 border-gray-100 font-display font-bold text-gray-700 hover:scale-105 active:scale-95 transition-all"
              >
                🔁 Répète après moi
              </button>
            </div>
          )}
        </>
      ) : (
        <QuizMode
          questions={formaQuestions.map((q) => ({
            ...q,
            options: (() => {
              const correct = formas.find((f) => f.id === q.correctId);
              const others = formas.filter((f) => f.id !== q.correctId);
              const shuffled = others
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);
              return [...shuffled, correct].sort(() => Math.random() - 0.5);
            })(),
          }))}
          renderOption={renderFormaOption}
          onBack={() => setMode("explore")}
          totalQuestions={5}
          maxOptions={3}
        />
      )}
    </div>
  );
}
