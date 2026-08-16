import { useState, useEffect } from 'react';
import { cargarProgreso, guardarProgreso, obtenerConceptosDebiles } from '../utils/storage';
import ProgressBar from './ProgressBar';
import { playClick } from '../utils/sound';

export default function Dashboard({ onClose }) {
  const [perfil, setPerfil] = useState(() => cargarProgreso());
  const [settings, setSettings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('agus-settings')) || {
        maxMinutes: 15,
        soloExplorar: false,
        language: 'both',
      };
    } catch {
      return { maxMinutes: 15, soloExplorar: false, language: 'both' };
    }
  });

  useEffect(() => {
    localStorage.setItem('agus-settings', JSON.stringify(settings));
  }, [settings]);

  const debiles = obtenerConceptosDebiles(perfil);

  const calculateMastery = (section) => {
    const concepts = perfil.concepts?.[section];
    if (!concepts || Object.keys(concepts).length === 0) return 0;
    const values = Object.values(concepts);
    const avg = values.reduce((sum, c) => sum + (c.mastery || 0), 0) / values.length;
    return avg * 100;
  };

  const sections = [
    { key: 'colors', fr: 'Couleurs', es: 'Colores', emoji: '🎨' },
    { key: 'numbers', fr: 'Nombres', es: 'Números', emoji: '🔢' },
    { key: 'bodyParts', fr: 'Corps', es: 'Cuerpo', emoji: '🧍' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-black text-gray-800">
              🔒 Tableau de bord
            </h2>
            <button onClick={() => { playClick(); onClose(); }} className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-gray-600">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <p className="font-display text-2xl font-black text-blue-600">{perfil.totalSessions || 0}</p>
              <p className="font-body text-xs text-blue-500">Sessions</p>
            </div>
            <div className="bg-orange-50 rounded-2xl p-4 text-center">
              <p className="font-display text-2xl font-black text-orange-600">🔥 {perfil.currentStreak || 0}</p>
              <p className="font-body text-xs text-orange-500">Streak jours</p>
            </div>
          </div>

          {/* Progress per section */}
          <div className="mb-6">
            <h3 className="font-display text-sm font-bold text-gray-500 mb-3">📊 Progrès</h3>
            <div className="space-y-3">
              {sections.map(s => (
                <ProgressBar key={s.key} value={calculateMastery(s.key)} label={`${s.emoji} ${s.fr}`} />
              ))}
            </div>
          </div>

          {/* Weak concepts */}
          {debiles.length > 0 && (
            <div className="mb-6">
              <h3 className="font-display text-sm font-bold text-gray-500 mb-3">⚠️ À renforcer</h3>
              <div className="space-y-2">
                {debiles.slice(0, 5).map((d, i) => (
                  <div key={i} className="flex items-center gap-3 bg-red-50 rounded-xl p-3">
                    <span className="text-xl">❌</span>
                    <div>
                      <p className="font-display text-sm font-bold text-gray-700">{d.concept}</p>
                      <p className="font-body text-xs text-red-500">{Math.round(d.mastery * 100)}% de réussite</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold text-gray-500">⚙️ Paramètres</h3>

            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
              <span className="font-display text-sm text-gray-700">Durée max</span>
              <select
                value={settings.maxMinutes}
                onChange={(e) => setSettings(prev => ({ ...prev, maxMinutes: Number(e.target.value) }))}
                className="bg-white border border-gray-200 rounded-lg px-3 py-1 font-display text-sm"
              >
                <option value={10}>10 min</option>
                <option value={15}>15 min</option>
                <option value={20}>20 min</option>
                <option value={30}>30 min</option>
              </select>
            </div>

            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
              <span className="font-display text-sm text-gray-700">Modo solo explorer</span>
              <button
                onClick={() => setSettings(prev => ({ ...prev, soloExplorar: !prev.soloExplorar }))}
                className={`w-12 h-6 rounded-full transition-all ${settings.soloExplorar ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${settings.soloExplorar ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
              <span className="font-display text-sm text-gray-700">Langue</span>
              <select
                value={settings.language}
                onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                className="bg-white border border-gray-200 rounded-lg px-3 py-1 font-display text-sm"
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
