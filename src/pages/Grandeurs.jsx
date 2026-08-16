import { useState } from "react";
import { grandeurs, grandeurQuestions } from "../data/grandeurs";
import { speak } from "../utils/speech";
import { useLanguage } from "../context/LanguageContext";
import {
  playPop,
  playSuccess,
  playError,
  playClick,
  playWhoosh,
} from "../utils/sound";

function SizeBar({ items, highlighted, onSelect }) {
  const maxVal = Math.max(...items.map((i) => i.value));
  return (
    <div className="flex items-end justify-center gap-4 mb-6">
      {items.map((item) => {
        const height = 60 + (item.value / maxVal) * 80;
        const isHighlighted = highlighted === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={`flex flex-col items-center transition-all ${
              isHighlighted ? "scale-110" : "hover:scale-105"
            }`}
          >
            <div
              className={`w-16 rounded-t-xl flex items-center justify-center text-3xl transition-all ${
                isHighlighted ? "bg-green-400 shadow-lg" : "bg-indigo-200"
              }`}
              style={{ height }}
            >
              {item.emoji}
            </div>
            <span className="text-xs mt-1 text-gray-600 font-medium">
              {item.fr}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function Grandeurs() {
  const { lang } = useLanguage();
  const [mode, setMode] = useState("explore");
  const [currentCat, setCurrentCat] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [showResult, setShowResult] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const category = grandeurs[currentCat];
  const question = grandeurQuestions[quizIdx];

  const handleExplore = () => {
    playClick();
    speak(lang === "fr" ? category.fr : category.es, lang);
    category.items.forEach((item, i) => {
      setTimeout(
        () => speak(lang === "fr" ? item.fr : item.es, lang),
        600 * (i + 1),
      );
    });
  };

  const startQuiz = () => {
    playWhoosh();
    setMode("quiz");
    setQuizIdx(0);
    setScore(0);
    setTotal(0);
    setShowResult(null);
    setSelectedOption(null);
  };

  const getQuizOptions = (qIdx) => {
    const q = grandeurQuestions[qIdx];
    const cat = grandeurs.find((g) => g.id === q.category);
    const correct = cat.items.find((i) => i.id === q.correctId);
    const others = cat.items.filter((i) => i.id !== q.correctId);
    return [correct, ...others].sort(() => Math.random() - 0.5);
  };

  const quizOptions = mode === "quiz" ? getQuizOptions(quizIdx) : [];

  const handleQuizAnswer = (option) => {
    if (showResult) return;
    setSelectedOption(option);
    const correct = option.id === question.correctId;
    setTotal((t) => t + 1);
    if (correct) {
      setScore((s) => s + 1);
      playSuccess();
      setShowResult("correct");
      speak(lang === "fr" ? question.feedbackFr : question.feedbackEs, lang);
    } else {
      playError();
      setShowResult("wrong");
    }
    setTimeout(() => {
      setShowResult(null);
      setSelectedOption(null);
      if (quizIdx < grandeurQuestions.length - 1) {
        setQuizIdx((i) => i + 1);
      } else {
        setMode("explore");
      }
    }, 2000);
  };

  if (mode === "quiz") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-4 pb-24">
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => {
              playWhoosh();
              setMode("explore");
            }}
            className="text-2xl mb-4 text-amber-600 hover:text-amber-800"
          >
            ← Retour
          </button>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-amber-800">
              {question.questionFr}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {quizIdx + 1} / {grandeurQuestions.length} • Score : {score}/
              {total}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {quizOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleQuizAnswer(opt)}
                disabled={!!showResult}
                className={`p-4 rounded-2xl border-3 transition-all flex flex-col items-center ${
                  showResult && selectedOption?.id === opt.id
                    ? showResult === "correct"
                      ? "border-green-400 bg-green-50 scale-105"
                      : "border-red-400 bg-red-50"
                    : showResult && opt.id === question.correctId
                      ? "border-green-400 bg-green-50"
                      : "border-gray-200 bg-white hover:border-amber-300 hover:bg-amber-50"
                }`}
              >
                <span className="text-4xl mb-2">{opt.emoji}</span>
                <span className="text-sm font-medium text-gray-700">
                  {opt.fr}
                </span>
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
                ? question.feedbackFr
                : question.feedbackEs}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-4 pb-24">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center text-amber-800 mb-6">
          📏 Grandeurs
        </h1>

        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold text-center text-amber-700 mb-4">
            {category.fr}
          </h2>
          <SizeBar
            items={category.items}
            highlighted={null}
            onSelect={(item) => {
              playPop();
              speak(lang === "fr" ? item.fr : item.es, lang);
            }}
          />
          <button
            onClick={handleExplore}
            className="w-full py-3 bg-amber-500 text-white rounded-2xl text-lg font-bold hover:bg-amber-600 active:scale-95 transition-all"
          >
            🔊 Écouter
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => {
              playClick();
              setCurrentCat(
                (i) => (i - 1 + grandeurs.length) % grandeurs.length,
              );
            }}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-2xl text-lg font-bold hover:bg-gray-300 active:scale-95"
          >
            ←
          </button>
          <button
            onClick={() => {
              playClick();
              setCurrentCat((i) => (i + 1) % grandeurs.length);
            }}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-2xl text-lg font-bold hover:bg-gray-300 active:scale-95"
          >
            →
          </button>
        </div>

        <button
          onClick={startQuiz}
          className="w-full py-4 bg-orange-500 text-white rounded-2xl text-xl font-bold hover:bg-orange-600 active:scale-95 transition-all shadow-lg"
        >
          🎯 Quiz Grandeurs
        </button>
      </div>
    </div>
  );
}
