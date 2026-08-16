import { useState, useEffect } from "react";
import {
  cargarProgreso,
  guardarProgreso,
  obtenerConceptosDebiles,
} from "../utils/storage";
import ProgressBar from "./ProgressBar";
import { playClick, playWhoosh } from "../utils/sound";

const allSections = [
  { key: "colors", fr: "Couleurs", es: "Colores", emoji: "🎨", color: "blue" },
  { key: "numbers", fr: "Nombres", es: "Números", emoji: "🔢", color: "green" },
  { key: "bodyParts", fr: "Corps", es: "Cuerpo", emoji: "🧍", color: "orange" },
  { key: "formas", fr: "Formas", es: "Formas", emoji: "🔷", color: "purple" },
  { key: "motifs", fr: "Motifs", es: "Motivos", emoji: "🔴", color: "pink" },
  {
    key: "grandeurs",
    fr: "Grandeurs",
    es: "Tamaños",
    emoji: "📏",
    color: "amber",
  },
  {
    key: "vocabulaire",
    fr: "Vocabulaire",
    es: "Vocabulario",
    emoji: "📚",
    color: "rose",
  },
  {
    key: "problemes",
    fr: "Problèmes",
    es: "Problemas",
    emoji: "➕",
    color: "emerald",
  },
  {
    key: "comptines",
    fr: "Comptines",
    es: "Canciones",
    emoji: "🎵",
    color: "violet",
  },
];

function MiniChart({ value, label, color }) {
  const colors = {
    blue: "bg-blue-400",
    green: "bg-green-400",
    orange: "bg-orange-400",
    purple: "bg-purple-400",
    pink: "bg-pink-400",
    amber: "bg-amber-400",
    rose: "bg-rose-400",
    emerald: "bg-emerald-400",
    violet: "bg-violet-400",
  };
  return (
    <div className="flex flex-col items-center">
      <div className="w-10 h-24 bg-gray-100 rounded-full overflow-hidden relative">
        <div
          className={`absolute bottom-0 w-full rounded-full transition-all duration-500 ${colors[color]}`}
          style={{ height: `${Math.min(value, 100)}%` }}
        />
      </div>
      <span className="text-xs mt-1 text-gray-500">{Math.round(value)}%</span>
    </div>
  );
}

export default function Dashboard({ onClose }) {
  const [perfil, setPerfil] = useState(() => cargarProgreso());
  const [settings, setSettings] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("agus-settings")) || {
          maxMinutes: 15,
          soloExplorar: false,
          language: "both",
        }
      );
    } catch {
      return { maxMinutes: 15, soloExplorar: false, language: "both" };
    }
  });

  useEffect(() => {
    localStorage.setItem("agus-settings", JSON.stringify(settings));
  }, [settings]);

  const debiles = obtenerConceptosDebiles(perfil);

  const calculateMastery = (section) => {
    const concepts = perfil.concepts?.[section];
    if (!concepts || Object.keys(concepts).length === 0) return 0;
    const values = Object.values(concepts);
    const avg =
      values.reduce((sum, c) => sum + (c.mastery || 0), 0) / values.length;
    return avg * 100;
  };

  const totalMastery =
    allSections.reduce((sum, s) => sum + calculateMastery(s.key), 0) /
    allSections.length;

  return (
    <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
      <div className="bg-cream rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-sand/50">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-black text-charcoal">
              🔒 Tableau de bord
            </h2>
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-sand/50 hover:bg-sand"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="w-5 h-5 text-charcoal/60"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-muted-blue/10 rounded-2xl p-3 text-center">
              <p className="font-display text-2xl font-black text-muted-blue">
                {perfil.totalSessions || 0}
              </p>
              <p className="font-body text-xs text-muted-blue/70">Sessions</p>
            </div>
            <div className="bg-muted-terracotta/10 rounded-2xl p-3 text-center">
              <p className="font-display text-2xl font-black text-muted-terracotta">
                🔥 {perfil.currentStreak || 0}
              </p>
              <p className="font-body text-xs text-muted-terracotta/70">Streak</p>
            </div>
            <div className="bg-sage/20 rounded-2xl p-3 text-center">
              <p className="font-display text-2xl font-black text-sage">
                {Math.round(totalMastery)}%
              </p>
              <p className="font-body text-xs text-sage/70">Global</p>
            </div>
          </div>

          {/* Mini bar chart */}
          <div className="mb-6">
            <h3 className="font-display text-sm font-bold text-charcoal/50 mb-3">
              📊 Progression
            </h3>
            <div className="bg-sand/30 rounded-2xl p-4">
              <div className="flex items-end justify-between gap-2">
                {allSections.map((s) => (
                  <MiniChart
                    key={s.key}
                    value={calculateMastery(s.key)}
                    label={s.fr}
                    color={s.color}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {allSections.map((s) => (
                  <span
                    key={s.key}
                    className="text-xs text-charcoal/40 w-6 text-center truncate"
                  >
                    {s.emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Progress per section */}
          <div className="mb-6">
            <h3 className="font-display text-sm font-bold text-charcoal/50 mb-3">
              📋 Détails
            </h3>
            <div className="space-y-2">
              {allSections.map((s) => (
                <ProgressBar
                  key={s.key}
                  value={calculateMastery(s.key)}
                  label={`${s.emoji} ${s.fr}`}
                />
              ))}
            </div>
          </div>

          {/* Weak concepts */}
          {debiles.length > 0 && (
            <div className="mb-6">
              <h3 className="font-display text-sm font-bold text-charcoal/50 mb-3">
                ⚠️ À renforcer
              </h3>
              <div className="space-y-2">
                {debiles.slice(0, 5).map((d, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-rose/10 rounded-xl p-3"
                  >
                    <span className="text-xl">❌</span>
                    <div>
                      <p className="font-display text-sm font-bold text-charcoal">
                        {d.concept}
                      </p>
                      <p className="font-body text-xs text-rose">
                        {Math.round(d.mastery * 100)}% de réussite
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="mb-6">
            <h3 className="font-display text-sm font-bold text-charcoal/50 mb-3">
              💡 Recommandations
            </h3>
            <div className="space-y-2">
              {allSections
                .filter((s) => calculateMastery(s.key) < 50)
                .slice(0, 3)
                .map((s) => (
                  <div
                    key={s.key}
                    className="flex items-center gap-3 bg-muted-gold/10 rounded-xl p-3"
                  >
                    <span className="text-xl">{s.emoji}</span>
                    <p className="font-body text-sm text-charcoal">
                      Continue à pratiquer <strong>{s.fr}</strong> (
                      {Math.round(calculateMastery(s.key))}%)
                    </p>
                  </div>
                ))}
              {allSections.every((s) => calculateMastery(s.key) >= 50) && (
                <div className="flex items-center gap-3 bg-sage/20 rounded-xl p-3">
                  <span className="text-xl">🌟</span>
                  <p className="font-body text-sm text-charcoal">
                    Excellent ! Tous les modules sont bien maîtrisés.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold text-charcoal/50">
              ⚙️ Paramètres
            </h3>

            <div className="flex items-center justify-between bg-sand/30 rounded-xl p-3">
              <span className="font-display text-sm text-charcoal">
                Durée max
              </span>
              <select
                value={settings.maxMinutes}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    maxMinutes: Number(e.target.value),
                  }))
                }
                className="bg-cream border border-sand rounded-lg px-3 py-1 font-display text-sm text-charcoal"
              >
                <option value={10}>10 min</option>
                <option value={15}>15 min</option>
                <option value={20}>20 min</option>
                <option value={30}>30 min</option>
              </select>
            </div>

            <div className="flex items-center justify-between bg-sand/30 rounded-xl p-3">
              <span className="font-display text-sm text-charcoal">
                Modo solo explorer
              </span>
              <button
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    soloExplorar: !prev.soloExplorar,
                  }))
                }
                className={`w-12 h-6 rounded-full transition-all ${settings.soloExplorar ? "bg-sage" : "bg-sand"}`}
              >
                <div
                  className={`w-5 h-5 bg-cream rounded-full shadow transition-transform ${settings.soloExplorar ? "translate-x-6" : "translate-x-0.5"}`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between bg-sand/30 rounded-xl p-3">
              <span className="font-display text-sm text-charcoal">Langue</span>
              <select
                value={settings.language}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, language: e.target.value }))
                }
                className="bg-cream border border-sand rounded-lg px-3 py-1 font-display text-sm text-charcoal"
              >
                <option value="both">FR + ES</option>
                <option value="fr">Solo Francés</option>
                <option value="es">Solo Español</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
