import { useState, useEffect, useCallback } from 'react';
import { speak, speakExcited } from '../utils/speech';
import { animals, countQuestions } from '../data/animals';
import { shuffleArray } from '../utils/animations';
import { playPop, playSuccess, playError, playCelebration } from '../utils/sound';
import { cargarProgreso, registrarIntento } from '../utils/storage';

function Confetti() {
  const colors = ['#EF4444', '#22C55E', '#3B82F6', '#EAB308', '#F97316', '#A855F7'];
  const pieces = Array.from({ length: 20 }, (_, i) => ({
    id: i, color: colors[i % colors.length],
    left: Math.random() * 100, delay: Math.random() * 0.5, size: 6 + Math.random() * 8,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map(p => (
        <div key={p.id} className="absolute animate-confetti"
          style={{ left: `${p.left}%`, top: '-10px', width: `${p.size}px`, height: `${p.size}px`, backgroundColor: p.color, borderRadius: '50%', animationDelay: `${p.delay}s` }} />
      ))}
    </div>
  );
}

export default function Contar() {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [counted, setCounted] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [perfil] = useState(() => cargarProgreso());

  useEffect(() => {
    setQuestions(shuffleArray(countQuestions).slice(0, 5));
  }, []);

  const current = questions[currentIdx];

  const askQuestion = useCallback(() => {
    if (!current) return;
    speak(current.questionFr, 'fr-FR');
    setTimeout(() => speak(current.questionEs, 'es-ES'), 1200);
  }, [current]);

  useEffect(() => {
    if (current && !feedback) {
      const t = setTimeout(askQuestion, 500);
      return () => clearTimeout(t);
    }
  }, [current, feedback, askQuestion]);

  const handleCountAnimal = (animalId) => {
    if (feedback) return;
    playPop();
    setCounted(prev => {
      if (prev.includes(animalId)) return prev.filter(id => id !== animalId);
      return [...prev, animalId];
    });
  };

  const handleValidate = () => {
    if (!current || feedback) return;
    const isCorrect = counted.length === current.count;

    if (isCorrect) {
      playSuccess();
      registrarIntento(perfil, 'count', current.targetAnimal, true);
      setScore(prev => prev + 1);
      setFeedback({ type: 'correct', text: current.feedbackFr });
      speakExcited(current.feedbackFr, 'fr-FR');
      setTimeout(() => speakExcited(current.feedbackEs, 'es-ES'), 1000);

      setTimeout(() => {
        if (currentIdx + 1 < questions.length) {
          setCurrentIdx(prev => prev + 1);
          setCounted([]);
          setFeedback(null);
        } else {
          setShowConfetti(true);
          playCelebration();
          setIsComplete(true);
        }
      }, 2500);
    } else {
      playError();
      registrarIntento(perfil, 'count', current.targetAnimal, false);
      setFeedback({ type: 'error', text: counted.length < current.count
        ? `Il y en a ${current.count} ! Comptes encore ! / ¡Hay ${current.count}! ¡Cuenta otra vez!`
        : `Non, il y en a ${current.count} ! / ¡No, hay ${current.count}!`
      });
      speak(`Il y en a ${current.count}`, 'fr-FR');
      setTimeout(() => {
        setCounted([]);
        setFeedback(null);
      }, 2500);
    }
  };

  const restart = () => {
    setQuestions(shuffleArray(countQuestions).slice(0, 5));
    setCurrentIdx(0);
    setCounted([]);
    setScore(0);
    setFeedback(null);
    setIsComplete(false);
    setShowConfetti(false);
  };

  if (!current) return null;

  const targetAnimalData = animals.find(a => a.id === current.targetAnimal);

  if (isComplete) {
    return (
      <>
        {showConfetti && <Confetti />}
        <div className="px-6 py-8">
          <div className="flex flex-col items-center justify-center gap-6 py-12 animate-bounce-in">
            <div className="text-6xl animate-pop">🎉</div>
            <div className="text-center">
              <p className="font-display text-4xl font-black text-yellow-500">{score}/{questions.length}</p>
              <p className="font-display text-xl font-bold text-gray-700 mt-2">
                {score === questions.length ? 'Parfait ! / ¡Perfecto!' : 'Très bien ! / ¡Muy bien!'}
              </p>
            </div>
            <div className="flex gap-3">
              {[...Array(score)].map((_, i) => (
                <span key={i} className="text-4xl animate-pop" style={{ animationDelay: `${i * 0.15}s` }}>⭐</span>
              ))}
            </div>
            <button onClick={restart} className="mt-4 px-8 py-4 bg-blue-500 text-white font-display font-bold text-lg rounded-2xl hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-200">
              🔁 Rejouer
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-black text-gray-800">🐾 Compter</h1>
          <p className="font-body text-gray-500">Contar animales</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-bold text-gray-400">{currentIdx + 1}/{questions.length}</span>
          <div className="flex gap-1">{[...Array(score)].map((_, i) => <span key={i} className="text-lg">⭐</span>)}</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg px-6 py-5 text-center max-w-sm w-full border-2 border-yellow-200 mb-6">
        <p className="font-display text-lg font-bold text-gray-700">{current.questionFr}</p>
        <p className="font-body text-sm text-gray-500 mt-1">{current.questionEs}</p>
      </div>

      <p className="font-body text-gray-500 text-center mb-4">
        Touche les {targetAnimalData?.fr?.toLowerCase()}s pour les compter !
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-md mx-auto mb-6">
        {animals.slice(0, 10).map((animal) => {
          const isSelected = counted.includes(animal.id);
          const isTarget = animal.id === current.targetAnimal;
          return (
            <button
              key={animal.id}
              onClick={() => handleCountAnimal(animal.id)}
              className={`
                aspect-square rounded-2xl flex flex-col items-center justify-center gap-1
                bg-white border-2 transition-all duration-200 shadow-md
                ${isSelected ? 'border-yellow-400 bg-yellow-50 scale-110 shadow-lg' : 'border-gray-100 hover:border-blue-200 hover:scale-105'}
                active:scale-95
              `}
            >
              <span className="text-3xl">{animal.emoji}</span>
              <span className="font-display text-[10px] font-bold text-gray-500">{animal.fr}</span>
            </button>
          );
        })}
      </div>

      <div className="text-center mb-4">
        <span className="font-display text-2xl font-black text-blue-500">{counted.length}</span>
        <span className="font-body text-gray-400 ml-2">/ {current.count}</span>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleValidate}
          disabled={counted.length === 0 || !!feedback}
          className={`px-8 py-4 rounded-2xl font-display font-bold text-lg transition-all shadow-lg ${
            counted.length > 0 && !feedback
              ? 'bg-green-500 text-white hover:bg-green-600 active:scale-95 shadow-green-200'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          ✅ Valider
        </button>
      </div>

      {feedback && (
        <div className={`fixed inset-x-0 top-8 mx-auto w-fit px-8 py-4 rounded-2xl font-display font-bold text-xl text-white shadow-xl animate-float z-50 ${
          feedback.type === 'correct' ? 'bg-green-500' : 'bg-red-400'
        }`}>
          {feedback.type === 'correct' ? '✅ ' : '❌ '}{feedback.text}
        </div>
      )}
    </div>
  );
}
