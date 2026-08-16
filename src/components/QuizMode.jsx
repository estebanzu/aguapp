import { useState, useEffect } from "react";
import { speak, speakExcited } from "../utils/speech";
import { useLanguage } from "../context/LanguageContext";

export default function QuizMode({
  questions,
  renderOption,
  onBack,
  totalQuestions = 5,
  maxOptions = 4,
}) {
  const { lang } = useLanguage();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showResult, setShowResult] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [completed, setCompleted] = useState(false);

  const question = questions[currentQ];

  const handleSelect = (option) => {
    if (disabled || completed) return;
    setDisabled(true);

    const correct = option.id === question.correctId;
    setAttempts((a) => a + 1);

    if (correct) {
      setScore((s) => s + 1);
      setShowResult("correct");
      speakExcited(question.feedbackFr || "Bravo !", lang);
      setTimeout(() => {
        nextQuestion();
      }, 1800);
    } else if (attempts >= 1) {
      setShowResult("wrong");
      speak(question.questionFr || "Regarde !", lang);
      setTimeout(() => {
        setShowResult("hint");
        setDisabled(false);
      }, 1500);
    } else {
      setShowResult("wrong");
      speak("Essaie encore !", lang);
      setTimeout(() => {
        setShowResult(null);
        setDisabled(false);
      }, 1200);
    }
  };

  const nextQuestion = () => {
    if (currentQ < totalQuestions - 1) {
      setCurrentQ((q) => q + 1);
      setShowResult(null);
      setAttempts(0);
      setDisabled(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4 animate-bounceIn">
          {score === totalQuestions
            ? "🏆"
            : score >= totalQuestions * 0.7
              ? "⭐"
              : "💪"}
        </div>
        <h2 className="font-display text-3xl font-black text-gray-800 mb-2">
          {score === totalQuestions
            ? lang === "fr"
              ? "Parfait !"
              : "¡Perfecto!"
            : lang === "fr"
              ? "Bravo !"
              : "¡Bravo!"}
        </h2>
        <p className="font-body text-lg text-gray-500 mb-6">
          {score}/{totalQuestions}{" "}
          {lang === "fr" ? "bonnes réponses" : "respuestas correctas"}
        </p>
        <button
          onClick={onBack}
          className="px-8 py-3 bg-gray-800 text-white rounded-2xl font-display font-bold hover:bg-gray-700 active:scale-95 transition-all"
        >
          {lang === "fr" ? "Retour" : "Volver"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="text-2xl mb-4 text-gray-600 hover:text-gray-800"
      >
        ←
      </button>

      <div className="text-center mb-6">
        <p className="font-body text-sm text-gray-400 mb-1">
          {currentQ + 1} / {totalQuestions}
        </p>
        <p className="font-display text-xl font-bold text-gray-800">
          {lang === "fr" ? question.questionFr : question.questionEs}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {question.options.slice(0, maxOptions).map((opt, i) =>
          renderOption(opt, {
            isCorrect:
              showResult === "correct" && opt.id === question.correctId,
            isSelectedWrong: showResult === "wrong",
            onSelect: () => handleSelect(opt),
            disabled,
          }),
        )}
      </div>

      {showResult === "correct" && (
        <div className="mt-4 p-3 rounded-2xl text-center font-bold bg-green-100 text-green-700 animate-bounceIn">
          {lang === "fr" ? "Bravo !" : "¡Muy bien!"}
        </div>
      )}
      {showResult === "wrong" && (
        <div className="mt-4 p-3 rounded-2xl text-center font-bold bg-red-100 text-red-700 animate-bounceIn">
          {lang === "fr" ? "Essaie encore." : "Inténtalo otra vez."}
        </div>
      )}
      {showResult === "hint" && (
        <div className="mt-4 p-3 rounded-2xl text-center font-bold bg-blue-100 text-blue-700 animate-bounceIn">
          {lang === "fr" ? "Regarde ! C'est celui-ci !" : "¡Mira! ¡Es este!"}
        </div>
      )}
    </div>
  );
}
