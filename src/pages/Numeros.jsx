import { useState, useEffect } from "react";
import { speak } from "../utils/speech";
import { useLanguage } from "../context/LanguageContext";
import { numbers, numberQuestions } from "../data/numbers";
import { playPop, playClick } from "../utils/sound";
import {
  cargarProgreso,
  registrarIntento,
  esPrimeraVisita,
  marcarVisita,
} from "../utils/storage";
import QuizMode from "../components/QuizMode";

function DotGrid({ count, isActive }) {
  const cols = count <= 5 ? 5 : count <= 8 ? 4 : 5;
  return (
    <div
      className="grid gap-1.5 justify-center"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${isActive ? "bg-yellow-400 animate-pop" : "bg-gray-300"}`}
          style={{ animationDelay: `${i * 0.05}s` }}
        />
      ))}
    </div>
  );
}

export default function Numeros() {
  const { lang } = useLanguage();
  const [mode, setMode] = useState("explore");
  const [activeNumber, setActiveNumber] = useState(null);
  const [perfil] = useState(() => cargarProgreso());
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (esPrimeraVisita(perfil, "numeros")) {
      setShowGuide(true);
      marcarVisita(perfil, "numeros");
      const timer = setTimeout(() => setShowGuide(false), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNumberTap = (number) => {
    playPop();
    setActiveNumber(number.num);
    registrarIntento(perfil, "numbers", String(number.num), true);
    speak(lang === "fr" ? number.fr : number.es, lang);
    setTimeout(() => setActiveNumber(null), 1500);
  };

  const handleRepeat = () => {
    if (!activeNumber) return;
    const number = numbers.find((n) => n.num === activeNumber);
    if (number) {
      playClick();
      speak(lang === "fr" ? number.fr : number.es, lang);
    }
  };

  const renderNumberOption = (
    number,
    { isCorrect, isSelectedWrong, onSelect, disabled },
  ) => (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`w-full aspect-square rounded-3xl flex flex-col items-center justify-center gap-2 bg-white font-display font-black text-4xl text-gray-800 transition-all duration-200 shadow-lg border-3 border-gray-100 ${
        isSelectedWrong ? "animate-shake opacity-50 border-red-300" : ""
      } ${isCorrect ? "animate-pop ring-4 ring-yellow-400 ring-offset-2 border-yellow-300 bg-yellow-50" : ""} ${
        disabled
          ? "cursor-not-allowed"
          : "active:scale-95 hover:scale-105 hover:shadow-xl"
      }`}
    >
      <span>{number.num}</span>
      <DotGrid count={number.dots} isActive={false} />
      <span className="text-xs font-bold text-gray-500">
        {lang === "fr" ? number.fr : number.es}
      </span>
    </button>
  );

  return (
    <div className="px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-black text-gray-800">
            🔢 {lang === "fr" ? "Nombres" : "Números"}
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
              ? "Touche un nombre pour l'écouter !"
              : "¡Toca un número para escucharlo!"}
          </p>
        </div>
      )}

      {mode === "explore" ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
            {numbers.map((number) => (
              <button
                key={number.num}
                onClick={() => handleNumberTap(number)}
                className={`aspect-square rounded-3xl flex flex-col items-center justify-center gap-2 bg-white font-display font-black text-4xl text-gray-800 transition-all duration-300 shadow-lg border-2 border-gray-100 hover:scale-105 active:scale-95 ${
                  activeNumber === number.num
                    ? "scale-110 ring-4 ring-yellow-400 ring-offset-4 animate-glow border-yellow-300"
                    : ""
                }`}
              >
                <span className="text-5xl">{number.num}</span>
                <DotGrid
                  count={number.dots}
                  isActive={activeNumber === number.num}
                />
                <span className="text-sm font-bold text-gray-600">
                  {lang === "fr" ? number.fr : number.es}
                </span>
              </button>
            ))}
          </div>

          {activeNumber && (
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
          questions={numberQuestions.map((q) => ({
            ...q,
            options: (() => {
              const correct = numbers.find((n) => n.num === q.correctNum);
              const others = numbers.filter((n) => n.num !== q.correctNum);
              return [
                ...others.sort(() => Math.random() - 0.5).slice(0, 3),
                correct,
              ].sort(() => Math.random() - 0.5);
            })(),
          }))}
          renderOption={renderNumberOption}
          onBack={() => setMode("explore")}
          totalQuestions={5}
          maxOptions={4}
        />
      )}
    </div>
  );
}
