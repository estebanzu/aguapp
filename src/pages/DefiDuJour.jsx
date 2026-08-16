import { useState, useEffect } from "react";
import { colorQuestions } from "../data/colors";
import { numberQuestions } from "../data/numbers";
import { bodyQuestions } from "../data/bodyParts";
import { speak, speakExcited } from "../utils/speech";
import { useLanguage } from "../context/LanguageContext";
import {
  playSuccess,
  playError,
  playCelebration,
  playClick,
} from "../utils/sound";
import { registrarIntento, cargarProgreso } from "../utils/storage";

const allQuestions = [
  ...colorQuestions.map((q) => ({
    ...q,
    section: "colores",
    sectionFr: "Les Couleurs",
  })),
  ...numberQuestions.map((q) => ({
    ...q,
    section: "numeros",
    sectionFr: "Les Nombres",
  })),
  ...bodyQuestions.map((q) => ({
    ...q,
    section: "cuerpo",
    sectionFr: "Le Corps",
  })),
];

function getDailyQuestion() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (24 * 60 * 60 * 1000),
  );
  const idx = dayOfYear % allQuestions.length;
  return allQuestions[idx];
}

function getDailyEmoji() {
  const emojis = ["☀️", "🌟", "🎉", "🌈", "🦄", "🎈", "🌸", "🐱", "🐶", "🦋"];
  const today = new Date();
  return emojis[today.getDate() % emojis.length];
}

export default function DefiDuJour() {
  const { lang } = useLanguage();
  const [showResult, setShowResult] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [streak, setStreak] = useState(0);

  const question = getDailyQuestion();
  const emoji = getDailyEmoji();

  useEffect(() => {
    const progress = cargarProgreso();
    const today = new Date().toISOString().slice(0, 10);
    if (progress.defiDate === today) {
      setCompleted(true);
      setStreak(progress.defiStreak || 0);
    }
  }, []);

  const handleAnswer = (option) => {
    if (showResult || completed) return;
    setSelectedOption(option);
    const correct = option === question.correct;
    if (correct) {
      playSuccess();
      setShowResult("correct");
      speakExcited(
        lang === "fr"
          ? question.feedbackFr || "Bravo !"
          : question.feedbackEs || "¡Muy bien!",
        lang,
      );
      setCompleted(true);
      setStreak((s) => s + 1);
      const progress = cargarProgreso();
      registrarIntento(progress, question.section, question.id, true);
      progress.defiDate = new Date().toISOString().slice(0, 10);
      progress.defiStreak = (progress.defiStreak || 0) + 1;
      localStorage.setItem("petit-monde-progress", JSON.stringify(progress));
    } else {
      playError();
      setShowResult("wrong");
      registrarIntento(cargarProgreso(), question.section, question.id, false);
      setTimeout(() => {
        setShowResult(null);
        setSelectedOption(null);
      }, 1500);
    }
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-50 p-4 pb-24">
        <div className="max-w-lg mx-auto text-center">
          <div className="text-6xl mb-4 animate-bounceIn">{emoji}</div>
          <h1 className="text-3xl font-bold text-amber-800 mb-4">
            {lang === "fr" ? "Défi du Jour" : "Reto del Día"}
          </h1>
          <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
            <p className="text-5xl mb-4">🏆</p>
            <p className="text-xl font-bold text-amber-700 mb-2">
              {lang === "fr" ? "Défi terminé !" : "¡Reto terminado!"}
            </p>
            <p className="text-gray-500">
              Streak : {streak} jour{streak > 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => {
              setCompleted(false);
              setShowResult(null);
              setSelectedOption(null);
            }}
            className="w-full py-4 bg-amber-500 text-white rounded-2xl text-xl font-bold hover:bg-amber-600 active:scale-95 transition-all shadow-lg"
          >
            {lang === "fr" ? "🔄 Refaire le défi" : "🔄 Volver a intentar"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-50 p-4 pb-24">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-6">
          <span className="text-4xl">{emoji}</span>
          <h1 className="text-3xl font-bold text-amber-800 mt-2">
            {lang === "fr" ? "Défi du Jour" : "Reto del Día"}
          </h1>
          <p className="text-sm text-amber-600">{question.sectionFr}</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <p className="text-center text-xl font-bold text-amber-800 mb-2">
            {question.question}
          </p>
          {question.emoji && (
            <div className="text-center text-5xl mb-4">{question.emoji}</div>
          )}
          <p className="text-center text-gray-500 text-sm">
            Streak actuel : {streak} jour{streak > 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              disabled={!!showResult}
              className={`p-4 rounded-2xl border-3 transition-all text-lg font-bold ${
                showResult && selectedOption === opt
                  ? showResult === "correct"
                    ? "border-green-400 bg-green-50 scale-105"
                    : "border-red-400 bg-red-50"
                  : showResult && opt === question.correct
                    ? "border-green-400 bg-green-50"
                    : "border-gray-200 bg-white hover:border-amber-300 hover:bg-amber-50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {showResult && (
          <div
            className={`mt-4 p-4 rounded-2xl text-center text-lg font-bold animate-bounceIn ${
              showResult === "correct"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {showResult === "correct"
              ? "Bravo ! Défi réussi !"
              : "Essaie encore demain !"}
          </div>
        )}
      </div>
    </div>
  );
}
