import { useState, useEffect } from "react";
import { speak } from "../utils/speech";
import { useLanguage } from "../context/LanguageContext";
import { colors, colorQuestions } from "../data/colors";
import { playPop, playClick } from "../utils/sound";
import {
  cargarProgreso,
  registrarIntento,
  esPrimeraVisita,
  marcarVisita,
} from "../utils/storage";
import QuizMode from "../components/QuizMode";

export default function Colores() {
  const { lang } = useLanguage();
  const [mode, setMode] = useState("explore");
  const [activeColor, setActiveColor] = useState(null);
  const [perfil, setPerfil] = useState(() => cargarProgreso());
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (esPrimeraVisita(perfil, "colores")) {
      setShowGuide(true);
      marcarVisita(perfil, "colores");
      const timer = setTimeout(() => setShowGuide(false), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleColorTap = (color) => {
    playPop();
    setActiveColor(color.id);
    registrarIntento(perfil, "colors", color.id, true);
    speak(lang === "fr" ? color.fr : color.es, lang);
    setTimeout(() => setActiveColor(null), 1500);
  };

  const handleRepeat = () => {
    if (!activeColor) return;
    const color = colors.find((c) => c.id === activeColor);
    if (color) {
      playClick();
      speak(lang === "fr" ? color.fr : color.es, lang);
    }
  };

  const renderColorOption = (
    color,
    { isCorrect, isSelectedWrong, onSelect, disabled },
  ) => (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`w-full aspect-square rounded-3xl flex flex-col items-center justify-center gap-2 font-display font-bold text-white text-xl transition-all duration-200 shadow-lg ${
        isSelectedWrong ? "animate-shake opacity-50" : ""
      } ${isCorrect ? "animate-pop ring-4 ring-yellow-400 ring-offset-2" : ""} ${
        disabled ? "cursor-not-allowed" : "active:scale-95 hover:scale-105"
      }`}
      style={{ backgroundColor: color.hex }}
    >
      <span className="text-3xl">{color.emoji}</span>
      <span>{lang === "fr" ? color.fr : color.es}</span>
    </button>
  );

  return (
    <div className="px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-black text-gray-800">
            🎨 {lang === "fr" ? "Couleurs" : "Colores"}
          </h1>
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
            🔍 {lang === "fr" ? "Explorer" : "Explorar"}
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
            ⭐ {lang === "fr" ? "Jouer" : "Jugar"}
          </button>
        </div>
      </div>

      {showGuide && (
        <div className="mb-4 p-4 bg-blue-50 rounded-2xl border-2 border-blue-200 animate-bounce-in">
          <p className="font-display text-sm font-bold text-blue-700 text-center">
            👆{" "}
            {lang === "fr"
              ? "Touche une couleur pour l'écouter !"
              : "¡Toca un color para escucharlo!"}
          </p>
        </div>
      )}

      {mode === "explore" ? (
        <>
          <div className="grid grid-cols-2 gap-5 max-w-md mx-auto">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => handleColorTap(color)}
                className={`aspect-square rounded-3xl flex flex-col items-center justify-center gap-3 font-display font-bold text-white text-2xl transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 ${
                  activeColor === color.id
                    ? "scale-110 ring-4 ring-yellow-400 ring-offset-4 animate-glow"
                    : ""
                }`}
                style={{ backgroundColor: color.hex }}
              >
                <span className="text-4xl">{color.emoji}</span>
                <span>{lang === "fr" ? color.fr : color.es}</span>
              </button>
            ))}
          </div>

          {activeColor && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleRepeat}
                className="px-6 py-3 bg-white rounded-2xl shadow-md border-2 border-gray-100 font-display font-bold text-gray-700 hover:scale-105 active:scale-95 transition-all"
              >
                🔁 {lang === "fr" ? "Répète après moi" : "Repite después de mí"}
              </button>
            </div>
          )}
        </>
      ) : (
        <QuizMode
          questions={colorQuestions.map((q) => ({
            ...q,
            options: (() => {
              const correct = colors.find((c) => c.id === q.correctId);
              const others = colors.filter((c) => c.id !== q.correctId);
              return [
                ...others.sort(() => Math.random() - 0.5).slice(0, 3),
                correct,
              ].sort(() => Math.random() - 0.5);
            })(),
          }))}
          renderOption={renderColorOption}
          onBack={() => setMode("explore")}
          totalQuestions={5}
          maxOptions={4}
        />
      )}
    </div>
  );
}
