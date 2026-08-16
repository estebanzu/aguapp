import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

const LANGUAGES = {
  fr: { code: "fr-FR", label: "Français", flag: "🇫🇷", short: "FR" },
  es: { code: "es-ES", label: "Español", flag: "🇪🇸", short: "ES" },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("petit-monde-lang") || "fr";
    } catch {
      return "fr";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("petit-monde-lang", lang);
    } catch {}
  }, [lang]);

  const toggle = () => setLang((prev) => (prev === "fr" ? "es" : "fr"));
  const set = (l) => setLang(l);

  return (
    <LanguageContext.Provider value={{ lang, toggle, set, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export { LANGUAGES };
