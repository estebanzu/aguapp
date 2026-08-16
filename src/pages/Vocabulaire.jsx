import { useState } from "react";
import { vocabThemes, getWeeklyTheme } from "../data/vocabThemes";
import { speak } from "../utils/speech";
import {
  playPop,
  playSuccess,
  playError,
  playClick,
  playWhoosh,
} from "../utils/sound";

export default function Vocabulaire() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [showResult, setShowResult] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const weekly = getWeeklyTheme();
  const theme = selectedTheme || weekly;
  const word = theme.words[currentWordIdx];

  const handleExplore = () => {
    playPop();
    speak(word.fr, "fr");
    setTimeout(() => speak(word.es, "es"), 1000);
  };

  const startQuiz = (th) => {
    playWhoosh();
    setSelectedTheme(th);
    setQuizMode(true);
    setQuizIdx(0);
    setScore(0);
    setTotal(0);
    setShowResult(null);
    setSelectedOption(null);
  };

  const getQuizOptions = (th, idx) => {
    const correct = th.words[idx % th.words.length];
    const pool = th.words.filter((w) => w.id !== correct.id);
    const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, 3);
    return [correct, ...shuffled].sort(() => Math.random() - 0.5);
  };

  const quizTheme = quizMode ? theme : null;
  const quizWord = quizMode
    ? quizTheme.words[quizIdx % quizTheme.words.length]
    : null;
  const quizOptions = quizMode ? getQuizOptions(quizTheme, quizIdx) : [];

  const handleQuizAnswer = (option) => {
    if (showResult) return;
    setSelectedOption(option);
    const correct = option.id === quizWord.id;
    setTotal((t) => t + 1);
    if (correct) {
      setScore((s) => s + 1);
      playSuccess();
      setShowResult("correct");
      speak(quizWord.fr, "fr");
    } else {
      playError();
      setShowResult("wrong");
    }
    setTimeout(() => {
      setShowResult(null);
      setSelectedOption(null);
      if (quizIdx < quizTheme.words.length - 1) {
        setQuizIdx((i) => i + 1);
      } else {
        setQuizMode(false);
        setSelectedTheme(null);
      }
    }, 1800);
  };

  if (quizMode) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 p-4 pb-24">
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => {
              playWhoosh();
              setQuizMode(false);
              setSelectedTheme(null);
            }}
            className="text-2xl mb-4 text-pink-600 hover:text-pink-800"
          >
            ← Retour
          </button>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-pink-800">
              Comment dit-on <span className="text-3xl">{quizWord.emoji}</span>{" "}
              en français ?
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {quizIdx + 1} / {quizTheme.words.length} • Score : {score}/{total}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {quizOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleQuizAnswer(opt)}
                disabled={!!showResult}
                className={`p-4 rounded-2xl border-3 transition-all text-lg font-bold ${
                  showResult && selectedOption?.id === opt.id
                    ? showResult === "correct"
                      ? "border-green-400 bg-green-50 scale-105"
                      : "border-red-400 bg-red-50"
                    : showResult && opt.id === quizWord.id
                      ? "border-green-400 bg-green-50"
                      : "border-gray-200 bg-white hover:border-pink-300 hover:bg-pink-50"
                }`}
              >
                {opt.fr}
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
                ? `Bravo ! ${quizWord.fr} = ${quizWord.es}`
                : `Non, c'était ${quizWord.fr} (${quizWord.es})`}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-50 p-4 pb-24">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center text-pink-800 mb-2">
          📚 Vocabulaire
        </h1>
        <p className="text-center text-sm text-pink-600 mb-6">
          Thème de la semaine : {weekly.emoji} {weekly.fr}
        </p>

        {selectedTheme ? (
          <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
            <button
              onClick={() => setSelectedTheme(null)}
              className="text-sm text-pink-500 mb-4 hover:text-pink-700"
            >
              ← Changer de thème
            </button>
            <h2 className="text-xl font-bold text-center text-pink-700 mb-4">
              {theme.emoji} {theme.fr}
            </h2>

            <div className="grid grid-cols-4 gap-3 mb-6">
              {theme.words.map((w, i) => (
                <button
                  key={w.id}
                  onClick={() => {
                    setCurrentWordIdx(i);
                    playPop();
                    speak(w.fr, "fr");
                    setTimeout(() => speak(w.es, "es"), 1000);
                  }}
                  className={`flex flex-col items-center p-3 rounded-2xl transition-all ${
                    currentWordIdx === i
                      ? "bg-pink-200 scale-105 shadow-md"
                      : "bg-pink-50 hover:bg-pink-100"
                  }`}
                >
                  <span className="text-3xl">{w.emoji}</span>
                  <span className="text-xs mt-1 font-medium text-gray-700">
                    {w.fr}
                  </span>
                </button>
              ))}
            </div>

            <div className="text-center mb-4">
              <span className="text-4xl">{word.emoji}</span>
              <p className="text-xl font-bold text-pink-700 mt-2">{word.fr}</p>
              <p className="text-sm text-gray-500">{word.es}</p>
            </div>

            <button
              onClick={handleExplore}
              className="w-full py-3 bg-pink-500 text-white rounded-2xl text-lg font-bold hover:bg-pink-600 active:scale-95 transition-all"
            >
              🔊 Écouter
            </button>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {vocabThemes.map((th) => (
              <button
                key={th.id}
                onClick={() => {
                  playClick();
                  setSelectedTheme(th);
                  setCurrentWordIdx(0);
                }}
                className="w-full p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-4"
              >
                <span className="text-3xl">{th.emoji}</span>
                <div className="text-left flex-1">
                  <p className="font-bold text-pink-700">{th.fr}</p>
                  <p className="text-sm text-gray-500">
                    {th.words.length} mots
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startQuiz(th);
                  }}
                  className="px-4 py-2 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600"
                >
                  Quiz
                </button>
              </button>
            ))}
          </div>
        )}

        {!selectedTheme && (
          <button
            onClick={() => startQuiz(weekly)}
            className="w-full py-4 bg-rose-500 text-white rounded-2xl text-xl font-bold hover:bg-rose-600 active:scale-95 transition-all shadow-lg"
          >
            🎯 Quiz du thème de la semaine
          </button>
        )}
      </div>
    </div>
  );
}
