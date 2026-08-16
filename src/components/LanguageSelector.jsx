import { useLanguage } from "../context/LanguageContext";
import { playClick } from "../utils/sound";

export default function LanguageSelector() {
  const { lang, toggle, LANGUAGES } = useLanguage();
  const current = LANGUAGES[lang];

  const handleToggle = () => {
    playClick();
    toggle();
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed top-3 right-3 z-40 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md border border-gray-100 hover:shadow-lg active:scale-95 transition-all"
      aria-label={`Cambiar a ${lang === "fr" ? "Español" : "Français"}`}
    >
      <span className="text-lg">{current.flag}</span>
      <span className="text-xs font-display font-bold text-gray-700">
        {current.short}
      </span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-3 h-3 text-gray-400"
      >
        <path d="M7 10l5 5 5-5" />
      </svg>
    </button>
  );
}
