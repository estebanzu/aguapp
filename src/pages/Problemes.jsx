import { useState } from "react";
import { problemes } from "../data/problemes";
import { speak } from "../utils/speech";
import { useLanguage } from "../context/LanguageContext";
import {
  playPop,
  playSuccess,
  playError,
  playClick,
  playWhoosh,
} from "../utils/sound";

function ObjectRow({ emoji, count }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="text-3xl animate-bounceIn"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}

function MathSymbol({ symbol }) {
  return (
    <div className="text-4xl font-bold text-center text-gray-400 my-2">
      {symbol}
    </div>
  );
}

export default function Problemes() {
  const { lang } = useLanguage();
  const [mode, setMode] = useState("explore");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [showResult, setShowResult] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const problem = problemes[currentIdx];

  const handleExplore = () => {
    playClick();
    const text = lang === "fr" ? problem.fr : problem.es;
    const ctx = text.contexte
      .replace("{n1}", problem.n1)
      .replace("{n2}", problem.n2);
    speak(ctx, lang);
    setTimeout(() => speak(text.question, lang), 2000);
    setTimeout(() => {
      const ans =
        lang === "fr"
          ? `Réponse : ${problem.n1} ${problem.type === "ajout" ? "plus" : "moins"} ${problem.n2} égale ${problem.answer}`
          : `Respuesta : ${problem.n1} ${problem.type === "ajout" ? "más" : "menos"} ${problem.n2} es igual a ${problem.answer}`;
      speak(ans, lang);
    }, 3500);
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

  const getQuizOptions = (idx) => {
    const p = problemes[idx % problemes.length];
    const correct = p.answer;
    const options = new Set([correct]);
    while (options.size < 4) {
      const delta = Math.floor(Math.random() * 3) - 1;
      const opt = correct + delta;
      if (opt >= 0 && opt <= 5) options.add(opt);
    }
    return Array.from(options).sort(() => Math.random() - 0.5);
  };

  const quizProblem =
    mode === "quiz" ? problemes[quizIdx % problemes.length] : null;
  const quizOptions = mode === "quiz" ? getQuizOptions(quizIdx) : [];

  const handleQuizAnswer = (option) => {
    if (showResult) return;
    setSelectedOption(option);
    const correct = option === quizProblem.answer;
    setTotal((t) => t + 1);
    if (correct) {
      setScore((s) => s + 1);
      playSuccess();
      setShowResult("correct");
      const fb = (
        lang === "fr" ? quizProblem.feedbackFr : quizProblem.feedbackEs
      )
        .replace("{n1}", quizProblem.n1)
        .replace("{n2}", quizProblem.n2)
        .replace("{answer}", quizProblem.answer);
      speak(fb, lang);
    } else {
      playError();
      setShowResult("wrong");
    }
    setTimeout(() => {
      setShowResult(null);
      setSelectedOption(null);
      if (quizIdx < problemes.length - 1) {
        setQuizIdx((i) => i + 1);
      } else {
        setMode("explore");
      }
    }, 2200);
  };

  if (mode === "quiz") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50 p-4 pb-24">
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => {
              playWhoosh();
              setMode("explore");
            }}
            className="text-2xl mb-4 text-emerald-600 hover:text-emerald-800"
          >
            ← Retour
          </button>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-emerald-800">
              {quizProblem.fr.question}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {quizIdx + 1} / {problemes.length} • Score : {score}/{total}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
            <p className="text-center text-gray-600 mb-4">
              {quizProblem.fr.contexte
                .replace("{n1}", quizProblem.n1)
                .replace("{n2}", quizProblem.n2)}
            </p>
            <ObjectRow emoji={quizProblem.emoji} count={quizProblem.n1} />
            <MathSymbol symbol={quizProblem.type === "ajout" ? "+" : "−"} />
            <ObjectRow emoji={quizProblem.emoji} count={quizProblem.n2} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {quizOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => handleQuizAnswer(opt)}
                disabled={!!showResult}
                className={`p-5 rounded-2xl border-3 transition-all text-3xl font-bold ${
                  showResult && selectedOption === opt
                    ? showResult === "correct"
                      ? "border-green-400 bg-green-50 scale-105"
                      : "border-red-400 bg-red-50"
                    : showResult && opt === quizProblem.answer
                      ? "border-green-400 bg-green-50"
                      : "border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50"
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
                ? `Bravo ! ${quizProblem.n1} ${quizProblem.type === "ajout" ? "+" : "−"} ${quizProblem.n2} = ${quizProblem.answer}`
                : `Non, la réponse était ${quizProblem.answer}`}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50 p-4 pb-24">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center text-emerald-800 mb-6">
          ➕ Problèmes
        </h1>

        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <p className="text-center text-gray-600 mb-4">
            {problem.fr.contexte
              .replace("{n1}", problem.n1)
              .replace("{n2}", problem.n2)}
          </p>
          <ObjectRow emoji={problem.emoji} count={problem.n1} />
          <MathSymbol symbol={problem.type === "ajout" ? "+" : "−"} />
          <ObjectRow emoji={problem.emoji} count={problem.n2} />
          <div className="text-center mt-4 text-2xl font-bold text-emerald-700">
            {problem.fr.question}
          </div>
          <button
            onClick={handleExplore}
            className="w-full py-3 bg-emerald-500 text-white rounded-2xl text-lg font-bold hover:bg-emerald-600 active:scale-95 transition-all mt-4"
          >
            🔊 Écouter le problème
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => {
              playClick();
              setCurrentIdx(
                (i) => (i - 1 + problemes.length) % problemes.length,
              );
            }}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-2xl text-lg font-bold hover:bg-gray-300 active:scale-95"
          >
            ←
          </button>
          <button
            onClick={() => {
              playClick();
              setCurrentIdx((i) => (i + 1) % problemes.length);
            }}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-2xl text-lg font-bold hover:bg-gray-300 active:scale-95"
          >
            →
          </button>
        </div>

        <button
          onClick={startQuiz}
          className="w-full py-4 bg-teal-500 text-white rounded-2xl text-xl font-bold hover:bg-teal-600 active:scale-95 transition-all shadow-lg"
        >
          🎯 Quiz Problèmes
        </button>
      </div>
    </div>
  );
}
