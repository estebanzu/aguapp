import { useState, useEffect } from 'react';
import { speakBilingual, speak } from '../utils/speech';
import { bodyParts, bodyQuestions } from '../data/bodyParts';
import { playPop, playClick } from '../utils/sound';
import { cargarProgreso, registrarIntento, esPrimeraVisita, marcarVisita } from '../utils/storage';
import QuizMode from '../components/QuizMode';

const partEmojis = {
  head: '🗣️', eyes: '👀', nose: '👃', mouth: '👄', ears: '👂',
  arms: '💪', hands: '🖐️', belly: '🫃', legs: '🦵', feet: '🦶',
};

function BodySVG({ activePart, onPartClick }) {
  const partStyles = (id) => {
    const isActive = activePart === id;
    return {
      fill: isActive ? '#FBBF24' : '#93C5FD',
      stroke: isActive ? '#F59E0B' : '#3B82F6',
      strokeWidth: isActive ? 2.5 : 1.5,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      filter: isActive ? 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))' : 'none',
    };
  };

  return (
    <svg viewBox="0 0 200 340" className="w-full max-w-[240px] mx-auto">
      <circle cx="100" cy="40" r="28" style={partStyles('head')} onClick={() => onPartClick('head')} />
      <ellipse cx="68" cy="40" rx="8" ry="12" style={partStyles('ears')} onClick={() => onPartClick('ears')} />
      <ellipse cx="132" cy="40" rx="8" ry="12" style={partStyles('ears')} onClick={() => onPartClick('ears')} />
      <circle cx="88" cy="36" r="5" style={partStyles('eyes')} onClick={() => onPartClick('eyes')} />
      <circle cx="112" cy="36" r="5" style={partStyles('eyes')} onClick={() => onPartClick('eyes')} />
      <ellipse cx="100" cy="46" rx="4" ry="3" style={partStyles('nose')} onClick={() => onPartClick('nose')} />
      <path d="M 90 55 Q 100 62 110 55" style={{ ...partStyles('mouth'), fill: 'none', strokeWidth: 2.5 }} onClick={() => onPartClick('mouth')} />
      <rect x="92" y="68" width="16" height="12" rx="4" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1" />
      <rect x="60" y="80" width="80" height="80" rx="16" style={partStyles('belly')} onClick={() => onPartClick('belly')} />
      <rect x="28" y="84" width="30" height="14" rx="7" style={partStyles('arms')} onClick={() => onPartClick('arms')} />
      <rect x="142" y="84" width="30" height="14" rx="7" style={partStyles('arms')} onClick={() => onPartClick('arms')} />
      <circle cx="24" cy="91" r="10" style={partStyles('hands')} onClick={() => onPartClick('hands')} />
      <circle cx="176" cy="91" r="10" style={partStyles('hands')} onClick={() => onPartClick('hands')} />
      <rect x="62" y="162" width="24" height="70" rx="12" style={partStyles('legs')} onClick={() => onPartClick('legs')} />
      <rect x="114" y="162" width="24" height="70" rx="12" style={partStyles('legs')} onClick={() => onPartClick('legs')} />
      <ellipse cx="74" cy="240" rx="16" ry="10" style={partStyles('feet')} onClick={() => onPartClick('feet')} />
      <ellipse cx="126" cy="240" rx="16" ry="10" style={partStyles('feet')} onClick={() => onPartClick('feet')} />
    </svg>
  );
}

export default function Cuerpo() {
  const [mode, setMode] = useState('explore');
  const [activePart, setActivePart] = useState(null);
  const [perfil] = useState(() => cargarProgreso());
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (esPrimeraVisita(perfil, 'cuerpo')) {
      setShowGuide(true);
      marcarVisita(perfil, 'cuerpo');
      const timer = setTimeout(() => setShowGuide(false), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handlePartTap = (partId) => {
    const part = bodyParts.find(p => p.id === partId);
    if (!part) return;
    playPop();
    setActivePart(partId);
    registrarIntento(perfil, 'bodyParts', partId, true);
    speakBilingual(part.frComplete, part.esComplete, () => {
      setTimeout(() => setActivePart(null), 800);
    });
  };

  const handleRepeat = () => {
    if (!activePart) return;
    const part = bodyParts.find(p => p.id === activePart);
    if (part) {
      playClick();
      speakBilingual(part.frComplete, part.esComplete);
    }
  };

  const renderBodyPartOption = (part, { isCorrect, isSelectedWrong, onSelect, disabled }) => (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`
        w-full py-4 rounded-2xl flex items-center justify-center gap-3
        bg-white font-display font-bold text-lg text-gray-700
        transition-all duration-200 shadow-md border-2 border-gray-100
        ${isSelectedWrong ? 'animate-shake opacity-50 border-red-300 bg-red-50' : ''}
        ${isCorrect ? 'animate-pop ring-4 ring-yellow-400 ring-offset-2 border-yellow-300 bg-yellow-50' : ''}
        ${disabled ? 'cursor-not-allowed' : 'active:scale-95 hover:scale-105 hover:shadow-lg'}
      `}
    >
      <span className="text-2xl">{partEmojis[part.id]}</span>
      <div className="flex flex-col items-start">
        <span>{part.fr}</span>
        <span className="text-sm text-gray-400">{part.es}</span>
      </div>
    </button>
  );

  return (
    <div className="px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-black text-gray-800">
            🧍 Corps
          </h1>
          <p className="font-body text-gray-500">Cuerpo</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setMode('explore'); playClick(); }}
            className={`px-4 py-2 rounded-xl font-display font-bold text-sm transition-all ${
              mode === 'explore'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🔍 Explorer
          </button>
          <button
            onClick={() => { setMode('quiz'); playClick(); }}
            className={`px-4 py-2 rounded-xl font-display font-bold text-sm transition-all ${
              mode === 'quiz'
                ? 'bg-yellow-400 text-gray-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            ⭐ Jouer
          </button>
        </div>
      </div>

      {showGuide && (
        <div className="mb-4 p-4 bg-blue-50 rounded-2xl border-2 border-blue-200 animate-bounce-in">
          <p className="font-display text-sm font-bold text-blue-700 text-center">
            👆 Touche une partie du corps !
          </p>
          <p className="font-body text-xs text-blue-500 text-center mt-1">
            Toca una parte del cuerpo
          </p>
        </div>
      )}

      {mode === 'explore' ? (
        <>
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
            <BodySVG activePart={activePart} onPartClick={handlePartTap} />
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {bodyParts.map((part) => (
              <button
                key={part.id}
                onClick={() => handlePartTap(part.id)}
                className={`
                  py-3 px-4 rounded-2xl flex items-center gap-3
                  bg-white font-display font-bold text-gray-700
                  transition-all duration-200 shadow-md border-2
                  ${activePart === part.id
                    ? 'border-yellow-400 bg-yellow-50 scale-105'
                    : 'border-gray-100 hover:border-blue-200 hover:scale-105'
                  }
                  active:scale-95
                `}
              >
                <span className="text-xl">{partEmojis[part.id]}</span>
                <div className="flex flex-col items-start">
                  <span className="text-sm">{part.fr}</span>
                  <span className="text-xs text-gray-400">{part.es}</span>
                </div>
              </button>
            ))}
          </div>

          {activePart && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleRepeat}
                className="px-6 py-3 bg-white rounded-2xl shadow-md border-2 border-gray-100 font-display font-bold text-gray-700 hover:scale-105 active:scale-95 transition-all"
              >
                🔁 Répète après moi / Repite después de mí
              </button>
            </div>
          )}
        </>
      ) : (
        <QuizMode
          questions={bodyQuestions.map(q => ({
            ...q,
            options: (() => {
              const correct = bodyParts.find(p => p.id === q.correctId);
              const others = bodyParts.filter(p => p.id !== q.correctId);
              const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3);
              return [...shuffled, correct].sort(() => Math.random() - 0.5);
            })(),
          }))}
          renderOption={renderBodyPartOption}
          onBack={() => setMode('explore')}
          totalQuestions={5}
          maxOptions={4}
        />
      )}
    </div>
  );
}
