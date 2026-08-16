import { useState, useEffect, useCallback } from 'react';
import { speak, speakExcited } from '../utils/speech';
import { shuffleArray } from '../utils/animations';
import { playSuccess, playError, playCelebration } from '../utils/sound';

function Confetti() {
  const colors = ['#EF4444', '#22C55E', '#3B82F6', '#EAB308', '#F97316', '#A855F7'];
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    rotation: Math.random() * 360,
    size: 6 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            left: `${p.left}%`,
            top: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: p.size % 2 === 0 ? '50%' : '2px',
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default function QuizMode({
  questions,
  renderOption,
  onCorrectFeedback,
  onBack,
  totalQuestions = 5,
  maxOptions = 4,
}) {
  const [shuffled, setShuffled] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [selectedWrong, setSelectedWrong] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showCorrectHint, setShowCorrectHint] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const q = shuffleArray(questions).slice(0, totalQuestions);
    setShuffled(q);
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setIsComplete(false);
    setWrongAttempts(0);
    setShowCorrectHint(false);
  }, [questions, totalQuestions]);

  const currentQuestion = shuffled[currentIndex];

  const askQuestion = useCallback(() => {
    if (!currentQuestion) return;
    speak(currentQuestion.questionFr, 'fr-FR');
    setTimeout(() => {
      speak(currentQuestion.questionEs, 'es-ES');
    }, 1200);
  }, [currentQuestion]);

  useEffect(() => {
    if (currentQuestion && !feedback) {
      const timer = setTimeout(askQuestion, 500);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion, feedback, askQuestion]);

  const advanceQuestion = useCallback(() => {
    setWrongAttempts(0);
    setShowCorrectHint(false);
    if (currentIndex + 1 < shuffled.length) {
      setCurrentIndex(prev => prev + 1);
      setFeedback(null);
    } else {
      setShowConfetti(true);
      playCelebration();
      setIsComplete(true);
    }
  }, [currentIndex, shuffled.length]);

  const handleAnswer = (answerId) => {
    if (isWaiting || isComplete) return;

    const isCorrect = answerId === currentQuestion.correctId ||
      answerId === currentQuestion.correctNum;

    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      setFeedback({ type: 'correct', text: currentQuestion.feedbackFr });
      playSuccess();

      speakExcited(currentQuestion.feedbackFr, 'fr-FR');
      setTimeout(() => {
        speakExcited(currentQuestion.feedbackEs, 'es-ES');
      }, 1000);

      onCorrectFeedback?.();

      setTimeout(advanceQuestion, 2500);
    } else {
      const newWrongCount = wrongAttempts + 1;
      setWrongAttempts(newWrongCount);
      setSelectedWrong(answerId);
      setIsWaiting(true);
      playError();

      if (newWrongCount >= 2) {
        setShowCorrectHint(true);
        speak('Regarde ! C\'est celui-ci !', 'fr-FR');
        setTimeout(() => {
          speak('¡Mira! ¡Es este!', 'es-ES');
        }, 1000);

        setTimeout(() => {
          setSelectedWrong(null);
          setIsWaiting(false);
          setShowCorrectHint(false);
          advanceQuestion();
        }, 3000);
      } else {
        speak('Essaie encore !', 'fr-FR');
        setTimeout(() => {
          speak('¡Inténtalo de nuevo!', 'es-ES');
        }, 800);

        setTimeout(() => {
          setSelectedWrong(null);
          setIsWaiting(false);
          speak(currentQuestion.questionFr, 'fr-FR');
          setTimeout(() => {
            speak(currentQuestion.questionEs, 'es-ES');
          }, 1200);
        }, 2000);
      }
    }
  };

  const restart = () => {
    const q = shuffleArray(questions).slice(0, totalQuestions);
    setShuffled(q);
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setIsComplete(false);
    setSelectedWrong(null);
    setWrongAttempts(0);
    setShowCorrectHint(false);
    setShowConfetti(false);
  };

  if (shuffled.length === 0) return null;

  if (isComplete) {
    return (
      <>
        {showConfetti && <Confetti />}
        <div className="flex flex-col items-center justify-center gap-6 py-12 animate-bounce-in">
          <div className="text-6xl animate-pop">🎉</div>
          <div className="text-center">
            <p className="font-display text-4xl font-black text-yellow-500">
              {score}/{shuffled.length}
            </p>
            <p className="font-display text-xl font-bold text-gray-700 mt-2">
              {score === shuffled.length
                ? 'Parfait ! Tu es un champion ! / ¡Perfecto! ¡Eres un campeón!'
                : score >= shuffled.length * 0.6
                  ? 'Très bien ! / ¡Muy bien!'
                  : 'Bon effort ! / ¡Buen esfuerzo!'}
            </p>
          </div>
          <div className="flex gap-3">
            {[...Array(Math.min(score, 5))].map((_, i) => (
              <span key={i} className="text-4xl animate-pop" style={{ animationDelay: `${i * 0.15}s` }}>
                ⭐
              </span>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={restart}
              className="px-8 py-4 bg-blue-500 text-white font-display font-bold text-lg rounded-2xl hover:bg-blue-600 active:scale-95 transition-all duration-200 shadow-lg shadow-blue-200"
            >
              🔁 Rejouer
            </button>
            {onBack && (
              <button
                onClick={onBack}
                className="px-8 py-4 bg-gray-200 text-gray-700 font-display font-bold text-lg rounded-2xl hover:bg-gray-300 active:scale-95 transition-all duration-200"
              >
                ← Retour
              </button>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 py-4">
      <div className="flex items-center justify-between w-full max-w-sm px-4">
        {onBack ? (
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-600">
              <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
            </svg>
          </button>
        ) : <div className="w-10" />}
        <span className="font-display text-sm font-bold text-gray-400">
          {currentIndex + 1} / {shuffled.length}
        </span>
        <div className="flex gap-1">
          {[...Array(score)].map((_, i) => (
            <span key={i} className="text-lg animate-pop">⭐</span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg px-6 py-5 text-center max-w-sm w-full border-2 border-yellow-200">
        <p className="font-display text-lg font-bold text-gray-700">
          {currentQuestion.questionFr}
        </p>
        <p className="font-body text-sm text-gray-500 mt-1">
          {currentQuestion.questionEs}
        </p>
      </div>

      <button
        onClick={askQuestion}
        className="px-5 py-2 bg-gray-100 rounded-full text-gray-600 font-display text-sm font-bold hover:bg-gray-200 active:scale-95 transition-all"
      >
        🔊 Réécouter
      </button>

      <div className={`grid gap-4 w-full max-w-sm px-4 ${maxOptions <= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {currentQuestion.options.slice(0, maxOptions).map((option) => {
          const isCorrectOption = option.id === currentQuestion.correctId ||
                                  option.num === currentQuestion.correctNum;
          return (
            <div key={option.id || option.num}>
              {renderOption(option, {
                isCorrect: showCorrectHint && isCorrectOption,
                isSelectedWrong: option.id === selectedWrong ||
                                 option.num === selectedWrong,
                onSelect: () => handleAnswer(option.id || option.num),
                disabled: isWaiting,
              })}
            </div>
          );
        })}
      </div>

      {feedback && (
        <div
          className={`fixed inset-x-0 top-8 mx-auto w-fit px-8 py-4 rounded-2xl font-display font-bold text-xl text-white shadow-xl animate-float z-50 ${
            feedback.type === 'correct' ? 'bg-green-500' : 'bg-red-400'
          }`}
        >
          {feedback.type === 'correct' ? '✅ ' : '❌ '}
          {feedback.text}
        </div>
      )}
    </div>
  );
}
