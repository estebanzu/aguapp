import { useState } from "react";
import { motifs, motifColors } from "../data/motifs";
import { speak } from "../utils/speech";
import {
  playPop,
  playSuccess,
  playError,
  playClick,
  playWhoosh,
} from "../utils/sound";

const SHAPES = ["circle", "square", "star", "triangle"];

function ShapeCell({ colorKey, shape, size = 48, delay = 0 }) {
  const color = motifColors[colorKey]?.hex || "#888";
  const style = {
    width: size,
    height: size,
    animationDelay: `${delay}ms`,
  };

  if (shape === "circle") {
    return (
      <div
        style={{ ...style, backgroundColor: color, borderRadius: "50%" }}
        className="animate-bounceIn inline-block shadow-md"
      />
    );
  }
  if (shape === "square") {
    return (
      <div
        style={{ ...style, backgroundColor: color, borderRadius: 6 }}
        className="animate-bounceIn inline-block shadow-md"
      />
    );
  }
  if (shape === "star") {
    return (
      <div
        style={{ ...style, fontSize: size * 0.8 }}
        className="animate-bounceIn inline-block"
      >
        ⭐
      </div>
    );
  }
  return (
    <div
      style={{
        ...style,
        backgroundColor: color,
        borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
      }}
      className="animate-bounceIn inline-block shadow-md"
    />
  );
}

export default function Motifs() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [showResult, setShowResult] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const motif = motifs[currentIdx];
  const shape = SHAPES[currentIdx % SHAPES.length];

  const handleExplore = () => {
    playClick();
    const frText = motif.fr;
    speak(frText, "fr");
    setTimeout(() => speak(motif.es, "es"), 1200);
  };

  const startQuiz = () => {
    playWhoosh();
    setQuizMode(true);
    setQuizIdx(0);
    setScore(0);
    setTotal(0);
    setShowResult(null);
    setSelectedOption(null);
  };

  const getQuizOptions = (idx) => {
    const current = motifs[idx % motifs.length];
    const correct = current.pattern;
    const options = [correct];
    const pool = motifs.filter((m) => m.id !== current.id);
    const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, 3);
    shuffled.forEach((m) => options.push(m.pattern));
    return options.sort(() => Math.random() - 0.5);
  };

  const quizOptions = quizMode ? getQuizOptions(quizIdx) : [];
  const currentQuiz = quizMode ? motifs[quizIdx % motifs.length] : null;

  const handleQuizAnswer = (option) => {
    if (showResult) return;
    setSelectedOption(option);
    const correct = option.join(",") === currentQuiz.pattern.join(",");
    setTotal((t) => t + 1);
    if (correct) {
      setScore((s) => s + 1);
      playSuccess();
      setShowResult("correct");
      speak(currentQuiz.fr, "fr");
    } else {
      playError();
      setShowResult("wrong");
    }
    setTimeout(() => {
      setShowResult(null);
      setSelectedOption(null);
      if (quizIdx < motifs.length - 1) {
        setQuizIdx((i) => i + 1);
      } else {
        setQuizMode(false);
      }
    }, 1800);
  };

  if (quizMode) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 p-4 pb-24">
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => {
              playWhoosh();
              setQuizMode(false);
            }}
            className="text-2xl mb-4 text-indigo-600 hover:text-indigo-800"
          >
            ← Retour
          </button>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-800">
              Quel motif continue la série ?
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {quizIdx + 1} / {motifs.length} • Score : {score}/{total}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
            <p className="text-center text-sm text-gray-500 mb-4">La série :</p>
            <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
              {currentQuiz.pattern.map((c, i) => (
                <ShapeCell
                  key={i}
                  colorKey={c}
                  shape={shape}
                  size={52}
                  delay={i * 100}
                />
              ))}
              <div className="w-12 h-12 border-3 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-2xl">
                ?
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {quizOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleQuizAnswer(opt)}
                disabled={!!showResult}
                className={`p-4 rounded-2xl border-3 transition-all ${
                  showResult && selectedOption === opt
                    ? showResult === "correct"
                      ? "border-green-400 bg-green-50 scale-105"
                      : "border-red-400 bg-red-50"
                    : showResult &&
                        opt.join(",") === currentQuiz.pattern.join(",")
                      ? "border-green-400 bg-green-50"
                      : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {opt.map((c, j) => (
                    <ShapeCell
                      key={j}
                      colorKey={c}
                      shape={shape}
                      size={32}
                      delay={0}
                    />
                  ))}
                </div>
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
                ? "Bravo ! C'est le bon motif !"
                : `Non, la bonne réponse était : ${currentQuiz.fr}`}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 p-4 pb-24">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-800 mb-6">
          🔷 Motifs
        </h1>

        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
            {motif.pattern.map((c, i) => (
              <ShapeCell
                key={i}
                colorKey={c}
                shape={shape}
                size={56}
                delay={i * 100}
              />
            ))}
          </div>

          <button
            onClick={handleExplore}
            className="w-full py-3 bg-indigo-500 text-white rounded-2xl text-lg font-bold hover:bg-indigo-600 active:scale-95 transition-all"
          >
            🔊 Écouter le motif
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => {
              playClick();
              setCurrentIdx((i) => (i - 1 + motifs.length) % motifs.length);
            }}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-2xl text-lg font-bold hover:bg-gray-300 active:scale-95"
          >
            ←
          </button>
          <button
            onClick={() => {
              playClick();
              setCurrentIdx((i) => (i + 1) % motifs.length);
            }}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-2xl text-lg font-bold hover:bg-gray-300 active:scale-95"
          >
            →
          </button>
        </div>

        <button
          onClick={startQuiz}
          className="w-full py-4 bg-purple-500 text-white rounded-2xl text-xl font-bold hover:bg-purple-600 active:scale-95 transition-all shadow-lg"
        >
          🎯 Quiz
        </button>
      </div>
    </div>
  );
}
