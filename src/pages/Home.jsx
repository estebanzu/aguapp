import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { speak } from "../utils/speech";
import { playClick } from "../utils/sound";
import { cargarProgreso } from "../utils/storage";
import Mascot from "../components/Mascot";
import Dashboard from "../components/Dashboard";

const sections = [
  {
    to: "/colores",
    labelFr: "Couleurs",
    labelEs: "Colores",
    emoji: "🎨",
    color: "from-red-400 to-orange-400",
    shadow: "shadow-red-200",
    masteryKey: "colors",
  },
  {
    to: "/numeros",
    labelFr: "Nombres",
    labelEs: "Números",
    emoji: "🔢",
    color: "from-blue-400 to-purple-400",
    shadow: "shadow-blue-200",
    masteryKey: "numbers",
  },
  {
    to: "/cuerpo",
    labelFr: "Corps",
    labelEs: "Cuerpo",
    emoji: "🧍",
    color: "from-green-400 to-teal-400",
    shadow: "shadow-green-200",
    masteryKey: "bodyParts",
  },
  {
    to: "/formas",
    labelFr: "Formes",
    labelEs: "Formas",
    emoji: "🔷",
    color: "from-pink-400 to-rose-400",
    shadow: "shadow-pink-200",
    masteryKey: "formas",
  },
  {
    to: "/contar",
    labelFr: "Compter",
    labelEs: "Contar",
    emoji: "🐾",
    color: "from-amber-400 to-yellow-400",
    shadow: "shadow-amber-200",
    masteryKey: null,
  },
  {
    to: "/clasificar",
    labelFr: "Trier",
    labelEs: "Clasificar",
    emoji: "🎯",
    color: "from-indigo-400 to-blue-400",
    shadow: "shadow-indigo-200",
    masteryKey: null,
  },
  {
    to: "/motifs",
    labelFr: "Motifs",
    labelEs: "Motivos",
    emoji: "🔴",
    color: "from-violet-400 to-purple-400",
    shadow: "shadow-violet-200",
    masteryKey: "motifs",
  },
  {
    to: "/grandeurs",
    labelFr: "Grandeurs",
    labelEs: "Tamaños",
    emoji: "📏",
    color: "from-orange-400 to-amber-400",
    shadow: "shadow-orange-200",
    masteryKey: "grandeurs",
  },
  {
    to: "/vocabulaire",
    labelFr: "Vocabulaire",
    labelEs: "Vocabulario",
    emoji: "📚",
    color: "from-rose-400 to-pink-400",
    shadow: "shadow-rose-200",
    masteryKey: "vocabulaire",
  },
  {
    to: "/problemes",
    labelFr: "Problèmes",
    labelEs: "Problemas",
    emoji: "➕",
    color: "from-emerald-400 to-teal-400",
    shadow: "shadow-emerald-200",
    masteryKey: "problemes",
  },
  {
    to: "/comptines",
    labelFr: "Comptines",
    labelEs: "Canciones",
    emoji: "🎵",
    color: "from-purple-400 to-violet-400",
    shadow: "shadow-purple-200",
    masteryKey: "comptines",
  },
  {
    to: "/defi",
    labelFr: "Défi du jour",
    labelEs: "Reto del día",
    emoji: "⭐",
    color: "from-yellow-400 to-orange-400",
    shadow: "shadow-yellow-200",
    masteryKey: null,
  },
];

export default function Home() {
  const [perfil] = useState(() => cargarProgreso());
  const [showDashboard, setShowDashboard] = useState(false);
  const [logoTapCount, setLogoTapCount] = useState(0);
  const [showMascot, setShowMascot] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      speak("Bonjour ! Apprendre avec Agus !", "fr-FR");
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
    setLogoTapCount((prev) => prev + 1);
  };

  const calculateMastery = (section) => {
    const concepts = perfil.concepts?.[section];
    if (!concepts || Object.keys(concepts).length === 0) return 0;
    const values = Object.values(concepts);
    return (
      (values.reduce((sum, c) => sum + (c.mastery || 0), 0) / values.length) *
      100
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
      {showDashboard && <Dashboard onClose={() => setShowDashboard(false)} />}

      <button
        onClick={handleLogoTap}
        className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg shadow-yellow-200 animate-glow active:scale-95 transition-transform mb-3"
      >
        <span className="text-4xl font-display font-black">A</span>
      </button>

      <h1
        className="font-display text-3xl font-black text-center text-gray-800 mb-0.5 animate-bounce-in"
        style={{ animationDelay: "0.2s" }}
      >
        Apprendre avec
      </h1>
      <h1
        className="font-display text-4xl font-black text-center text-amber-600 mb-2 animate-bounce-in"
        style={{ animationDelay: "0.3s" }}
      >
        Agus
      </h1>
      <p
        className="font-body text-sm text-gray-500 mb-3 text-center animate-bounce-in"
        style={{ animationDelay: "0.4s" }}
      >
        Apprends en français et en espagnol !
      </p>

      {showMascot && (
        <div
          className="mb-4 animate-bounce-in"
          style={{ animationDelay: "0.45s" }}
        >
          <Mascot message="welcome" size="sm" />
        </div>
      )}

      {(perfil.currentStreak || 0) > 0 && (
        <div
          className="mb-3 px-4 py-1.5 bg-orange-50 rounded-full border border-orange-200 animate-bounce-in"
          style={{ animationDelay: "0.5s" }}
        >
          <span className="font-display text-sm font-bold text-orange-600">
            🔥 {perfil.currentStreak} jour{perfil.currentStreak > 1 ? "s" : ""}{" "}
            !
          </span>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 w-full max-w-md mb-4">
        {sections.map((section, index) => {
          const mastery = section.masteryKey
            ? calculateMastery(section.masteryKey)
            : null;
          return (
            <Link
              key={section.to}
              to={section.to}
              onClick={() => playClick()}
              className={`animate-bounce-in bg-gradient-to-r ${section.color} text-white font-display font-bold text-sm py-4 px-2 rounded-2xl flex flex-col items-center gap-1 shadow-lg ${section.shadow} hover:scale-105 active:scale-95 transition-transform duration-200`}
              style={{ animationDelay: `${0.55 + index * 0.07}s` }}
            >
              <span className="text-2xl">{section.emoji}</span>
              <span className="leading-tight">{section.labelFr}</span>
              <span className="text-[10px] opacity-80 leading-tight">
                {section.labelEs}
              </span>
              {mastery !== null && mastery > 0 && (
                <div className="w-full bg-white/30 rounded-full h-1 mt-0.5">
                  <div
                    className="bg-white rounded-full h-1 transition-all"
                    style={{ width: `${mastery}%` }}
                  />
                </div>
              )}
            </Link>
          );
        })}
      </div>

      <p className="font-body text-[10px] text-gray-400 text-center">
        Touche le logo 5 fois pour les paramètres parents 👆
      </p>
    </div>
  );
}
