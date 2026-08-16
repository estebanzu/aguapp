import { useState } from "react";
import { comptines } from "../data/comptines";
import { speak } from "../utils/speech";
import { playPop, playClick, playWhoosh } from "../utils/sound";

export default function Comptines() {
  const [selected, setSelected] = useState(null);
  const [lang, setLang] = useState("fr");

  const handlePlay = (c) => {
    playPop();
    speak(c.audio[lang], lang);
  };

  if (selected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 to-purple-50 p-4 pb-24">
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => {
              playWhoosh();
              setSelected(null);
            }}
            className="text-2xl mb-4 text-violet-600 hover:text-violet-800"
          >
            ← Retour
          </button>

          <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
            <div className="text-center mb-4">
              <span className="text-5xl">{selected.emoji}</span>
              <h2 className="text-2xl font-bold text-violet-800 mt-2">
                {selected.id}
              </h2>
            </div>

            <div className="flex justify-center gap-2 mb-6">
              <button
                onClick={() => setLang("fr")}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  lang === "fr"
                    ? "bg-violet-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                🇫🇷 Français
              </button>
              <button
                onClick={() => setLang("es")}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  lang === "es"
                    ? "bg-violet-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                🇪🇸 Español
              </button>
            </div>

            <div className="bg-violet-50 rounded-2xl p-5 mb-4">
              <pre className="text-center text-lg font-medium text-violet-900 whitespace-pre-wrap leading-relaxed">
                {selected[lang]}
              </pre>
            </div>

            <button
              onClick={() => handlePlay(selected)}
              className="w-full py-3 bg-violet-500 text-white rounded-2xl text-lg font-bold hover:bg-violet-600 active:scale-95 transition-all"
            >
              🔊 Écouter la comptine
            </button>
          </div>

          <button
            onClick={() => handlePlay(selected)}
            className="w-full py-4 bg-purple-500 text-white rounded-2xl text-xl font-bold hover:bg-purple-600 active:scale-95 transition-all shadow-lg"
          >
            🎵 Chanter !
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-purple-50 p-4 pb-24">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-center text-violet-800 mb-6">
          🎵 Comptines
        </h1>

        <div className="space-y-3">
          {comptines.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                playClick();
                setSelected(c);
              }}
              className="w-full p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-4"
            >
              <span className="text-4xl">{c.emoji}</span>
              <div className="text-left flex-1">
                <p className="font-bold text-violet-700">{c.id}</p>
                <p className="text-sm text-gray-500">
                  Niveau {c.difficulty === 1 ? " facile" : " intermédiaire"}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlay(c);
                }}
                className="px-4 py-2 bg-violet-500 text-white rounded-xl font-bold hover:bg-violet-600"
              >
                🔊
              </button>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
