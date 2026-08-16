import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { speak } from "../utils/speech";
import { useLanguage } from "../context/LanguageContext";
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
    color: "from-[#9BB5C4] to-[#7BA7BC]",
    shadow: "shadow-[#9BB5C4]/30",
    masteryKey: "colors",
  },
  {
    to: "/numeros",
    labelFr: "Nombres",
    labelEs: "Números",
    emoji: "🔢",
    color: "from-[#B8C9A3] to-[#9AB88A]",
    shadow: "shadow-[#B8C9A3]/30",
    masteryKey: "numbers",
  },
  {
    to: "/cuerpo",
    labelFr: "Corps",
    labelEs: "Cuerpo",
    emoji: "🧍",
    color: "from-[#D4A5A5] to-[#C48E8E]",
    shadow: "shadow-[#D4A5A5]/30",
    masteryKey: "bodyParts",
  },
  {
    to: "/formas",
    labelFr: "Formes",
    labelEs: "Formas",
    emoji: "🔷",
    color: "from-[#C9A9D4] to-[#B895C4]",
    shadow: "shadow-[#C9A9D4]/30",
    masteryKey: "formas",
  },
  {
    to: "/contar",
    labelFr: "Compter",
    labelEs: "Contar",
    emoji: "🐾",
    color: "from-[#E8C97A] to-[#D4B56A]",
    shadow: "shadow-[#E8C97A]/30",
    masteryKey: null,
  },
  {
    to: "/clasificar",
    labelFr: "Trier",
    labelEs: "Clasificar",
    emoji: "🎯",
    color: "from-[#C9886E] to-[#B8775E]",
    shadow: "shadow-[#C9886E]/30",
    masteryKey: null,
  },
  {
    to: "/motifs",
    labelFr: "Motifs",
    labelEs: "Motivos",
    emoji: "🔴",
    color: "from-[#D4A5A5] to-[#C9886E]",
    shadow: "shadow-[#D4A5A5]/30",
    masteryKey: "motifs",
  },
  {
    to: "/grandeurs",
    labelFr: "Grandeurs",
    labelEs: "Tamaños",
    emoji: "📏",
    color: "from-[#E8C97A] to-[#C9886E]",
    shadow: "shadow-[#E8C97A]/30",
    masteryKey: "grandeurs",
  },
  {
    to: "/vocabulaire",
    labelFr: "Vocabulaire",
    labelEs: "Vocabulario",
    emoji: "📚",
    color: "from-[#9BB5C4] to-[#C9A9D4]",
    shadow: "shadow-[#9BB5C4]/30",
    masteryKey: "vocabulaire",
  },
  {
    to: "/problemes",
    labelFr: "Problèmes",
    labelEs: "Problemas",
    emoji: "➕",
    color: "from-[#B8C9A3] to-[#7BA7BC]",
    shadow: "shadow-[#B8C9A3]/30",
    masteryKey: "problemes",
  },
  {
    to: "/comptines",
    labelFr: "Comptines",
    labelEs: "Canciones",
    emoji: "🎵",
    color: "from-[#C9A9D4] to-[#D4A5A5]",
    shadow: "shadow-[#C9A9D4]/30",
    masteryKey: "comptines",
  },
  {
    to: "/defi",
    labelFr: "Défi du jour",
    labelEs: "Reto del día",
    emoji: "⭐",
    color: "from-[#E8C97A] to-[#D4A5A5]",
    shadow: "shadow-[#E8C97A]/30",
    masteryKey: null,
  },
];

export default function Home() {
  const { lang } = useLanguage();
  const [perfil] = useState(() => cargarProgreso());
  const [showDashboard, setShowDashboard] = useState(false);
  const [logoTapCount, setLogoTapCount] = useState(0);
  const [showMascot, setShowMascot] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      speak(
        lang === "fr"
          ? "Bonjour ! Bienvenue dans Petit Monde !"
          : "¡Hola ! Bienvenido a Petit Monde !",
        lang,
      );
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
        className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg shadow-sage/30 animate-glow active:scale-95 transition-transform mb-3 bg-cream border-2 border-sage"
      >
        <img src="/logo.svg" alt="Petit Monde" className="w-20 h-20" />
      </button>

      <h1
        className="font-display text-3xl font-black text-center text-charcoal mb-0.5 animate-bounce-in"
        style={{ animationDelay: "0.2s" }}
      >
        Petit Monde
      </h1>
      <p
        className="font-body text-sm text-charcoal/60 mb-3 text-center animate-bounce-in"
        style={{ animationDelay: "0.3s" }}
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
          <span className="font-display text-sm font-bold text-muted-terracotta">
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
              <span className="leading-tight">
                {lang === "fr" ? section.labelFr : section.labelEs}
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

      <p className="font-body text-[10px] text-charcoal/40 text-center">
        Touche le logo 5 fois pour les paramètres parents 👆
      </p>
    </div>
  );
}
