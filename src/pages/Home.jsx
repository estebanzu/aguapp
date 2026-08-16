import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { speak } from '../utils/speech';
import { playClick } from '../utils/sound';
import { cargarProgreso } from '../utils/storage';
import Mascot from '../components/Mascot';
import ProgressBar from '../components/ProgressBar';
import Dashboard from '../components/Dashboard';

const sections = [
  { to: '/colores', labelFr: 'Couleurs', labelEs: 'Colores', emoji: '🎨', color: 'from-red-400 to-orange-400', shadow: 'shadow-red-200', masteryKey: 'colors' },
  { to: '/numeros', labelFr: 'Nombres', labelEs: 'Números', emoji: '🔢', color: 'from-blue-400 to-purple-400', shadow: 'shadow-blue-200', masteryKey: 'numbers' },
  { to: '/cuerpo', labelFr: 'Corps', labelEs: 'Cuerpo', emoji: '🧍', color: 'from-green-400 to-teal-400', shadow: 'shadow-green-200', masteryKey: 'bodyParts' },
  { to: '/formas', labelFr: 'Formes', labelEs: 'Formas', emoji: '📐', color: 'from-pink-400 to-rose-400', shadow: 'shadow-pink-200', masteryKey: null },
  { to: '/contar', labelFr: 'Compter', labelEs: 'Contar', emoji: '🐾', color: 'from-amber-400 to-yellow-400', shadow: 'shadow-amber-200', masteryKey: null },
  { to: '/clasificar', labelFr: 'Trier', labelEs: 'Clasificar', emoji: '🎯', color: 'from-indigo-400 to-blue-400', shadow: 'shadow-indigo-200', masteryKey: null },
];

export default function Home() {
  const [perfil] = useState(() => cargarProgreso());
  const [showDashboard, setShowDashboard] = useState(false);
  const [logoTapCount, setLogoTapCount] = useState(0);
  const [showMascot, setShowMascot] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      speak('Bonjour ! Apprendre avec Agus !', 'fr-FR');
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (logoTapCount >= 5) {
      setShowDashboard(true);
      setLogoTapCount(0);
    }
  }, [logoTapCount]);

  const handleLogoTap = () => {
    playClick();
    setLogoTapCount(prev => prev + 1);
  };

  const calculateMastery = (section) => {
    const concepts = perfil.concepts?.[section];
    if (!concepts || Object.keys(concepts).length === 0) return 0;
    const values = Object.values(concepts);
    return (values.reduce((sum, c) => sum + (c.mastery || 0), 0) / values.length) * 100;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      {showDashboard && <Dashboard onClose={() => setShowDashboard(false)} />}

      <div className="animate-bounce-in mb-4">
        <button
          onClick={handleLogoTap}
          className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg shadow-yellow-200 animate-glow active:scale-95 transition-transform"
        >
          <span className="text-5xl font-display font-black">A</span>
        </button>
      </div>

      <h1 className="font-display text-4xl font-black text-center text-gray-800 mb-1 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
        Apprendre avec
      </h1>
      <h1 className="font-display text-5xl font-black text-center text-amber-600 mb-2 animate-bounce-in" style={{ animationDelay: '0.3s' }}>
        Agus
      </h1>
      <p className="font-body text-lg text-gray-500 mb-4 text-center animate-bounce-in" style={{ animationDelay: '0.4s' }}>
        Apprends en français et en espagnol !
      </p>

      {showMascot && (
        <div className="mb-6 animate-bounce-in" style={{ animationDelay: '0.45s' }}>
          <Mascot message="welcome" size="sm" />
        </div>
      )}

      {/* Streak */}
      {(perfil.currentStreak || 0) > 0 && (
        <div className="mb-4 px-4 py-2 bg-orange-50 rounded-full border border-orange-200 animate-bounce-in" style={{ animationDelay: '0.5s' }}>
          <span className="font-display text-sm font-bold text-orange-600">
            🔥 {perfil.currentStreak} jour{perfil.currentStreak > 1 ? 's' : ''} !
          </span>
        </div>
      )}

      {/* Sections grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-6">
        {sections.map((section, index) => {
          const mastery = section.masteryKey ? calculateMastery(section.masteryKey) : null;
          return (
            <Link
              key={section.to}
              to={section.to}
              onClick={() => playClick()}
              className={`
                animate-bounce-in
                bg-gradient-to-r ${section.color}
                text-white font-display font-bold text-lg
                py-5 px-4 rounded-3xl
                flex flex-col items-center gap-2
                shadow-xl ${section.shadow}
                hover:scale-105 active:scale-95
                transition-transform duration-200
              `}
              style={{ animationDelay: `${0.55 + index * 0.1}s` }}
            >
              <span className="text-3xl">{section.emoji}</span>
              <span>{section.labelFr}</span>
              <span className="text-xs opacity-80">{section.labelEs}</span>
              {mastery !== null && mastery > 0 && (
                <div className="w-full bg-white/30 rounded-full h-1.5 mt-1">
                  <div className="bg-white rounded-full h-1.5 transition-all" style={{ width: `${mastery}%` }} />
                </div>
              )}
            </Link>
          );
        })}
      </div>

      <p className="font-body text-xs text-gray-400 text-center">
        Touche le logo 5 fois pour les paramètres parents 👆
      </p>
    </div>
  );
}
