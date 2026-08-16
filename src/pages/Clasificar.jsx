import { useState, useCallback } from "react";
import { speak, speakExcited } from "../utils/speech";
import { classifyColors, classifyItems } from "../data/animals";
import { playPop, playSuccess, playError, playClick } from "../utils/sound";
import { cargarProgreso, registrarIntento } from "../utils/storage";

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Clasificar() {
  const [level, setLevel] = useState(0);
  const [placed, setPlaced] = useState({});
  const [dragging, setDragging] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [perfil] = useState(() => cargarProgreso());

  const levels = [
    {
      colors: classifyColors.slice(0, 2),
      items: classifyItems
        .filter((i) => ["red", "blue"].includes(i.colorId))
        .slice(0, 6),
    },
    { colors: classifyColors, items: classifyItems },
  ];

  const current = levels[Math.min(level, levels.length - 1)];
  const unplaced = current.items.filter((item) => !placed[item.id]);
  const totalItems = current.items.length;
  const placedCount = Object.keys(placed).length;

  const handleDragStart = (itemId) => {
    playPop();
    setDragging(itemId);
  };

  const handleDrop = useCallback(
    (colorId) => {
      if (!dragging) return;
      const item = current.items.find((i) => i.id === dragging);
      if (!item) return;

      if (item.colorId === colorId) {
        playSuccess();
        setPlaced((prev) => ({ ...prev, [dragging]: colorId }));
        setScore((prev) => prev + 1);
        registrarIntento(perfil, "classify", item.colorId, true);
        speak(
          `${item.fr} est ${classifyColors.find((c) => c.id === colorId).fr}`,
          "fr-FR",
        );

        const newPlacedCount = Object.keys({
          ...placed,
          [dragging]: colorId,
        }).length;
        if (newPlacedCount >= totalItems) {
          setTimeout(() => {
            playSuccess();
            setIsComplete(true);
          }, 500);
        }
      } else {
        playError();
        registrarIntento(perfil, "classify", item.colorId, false);
        setFeedback({
          type: "error",
          text: "Essaie encore ! / ¡Inténtalo de nuevo!",
        });
        setTimeout(() => setFeedback(null), 1500);
      }
      setDragging(null);
    },
    [dragging, current.items, placed, totalItems, perfil],
  );

  const handleTouchDrop = (colorId) => {
    if (dragging) {
      handleDrop(colorId);
    }
  };

  const restart = () => {
    setPlaced({});
    setScore(0);
    setLevel(0);
    setIsComplete(false);
    setDragging(null);
  };

  const nextLevel = () => {
    if (level + 1 < levels.length) {
      setLevel((prev) => prev + 1);
      setPlaced({});
      setScore(0);
      setIsComplete(false);
    } else {
      restart();
    }
  };

  if (isComplete) {
    return (
      <div className="px-6 py-8">
        <div className="flex flex-col items-center justify-center gap-6 py-12 animate-bounce-in">
          <div className="text-6xl animate-pop">🎉</div>
          <div className="text-center">
            <p className="font-display text-3xl font-black text-green-500">
              Terminé !
            </p>
            <p className="font-display text-xl font-bold text-gray-700 mt-2">
              {level + 1 < levels.length
                ? "Prêt pour la suite ? / ¿Listo para seguir?"
                : "Champion du tri ! / ¡Campeón del clasificar!"}
            </p>
          </div>
          <div className="flex gap-3">
            {level + 1 < levels.length ? (
              <button
                onClick={nextLevel}
                className="px-8 py-4 bg-blue-500 text-white font-display font-bold text-lg rounded-2xl hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-200"
              >
                Niveau suivant →
              </button>
            ) : (
              <button
                onClick={restart}
                className="px-8 py-4 bg-blue-500 text-white font-display font-bold text-lg rounded-2xl hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-200"
              >
                🔁 Rejouer
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-black text-gray-800">
            🎯 Trier
          </h1>
          <p className="font-body text-gray-500">Clasificar por color</p>
        </div>
        <span className="font-display text-sm font-bold text-gray-400">
          {placedCount} / {totalItems}
        </span>
      </div>

      <p className="font-body text-gray-500 text-center mb-6">
        Touche un objet, puis touche la couleur ! / ¡Toca un objeto, luego toca
        el color!
      </p>

      {/* Color buckets */}
      <div className="flex justify-center gap-4 mb-8">
        {current.colors.map((color) => (
          <button
            key={color.id}
            onClick={() => handleTouchDrop(color.id)}
            className={`
              w-24 h-28 rounded-2xl flex flex-col items-center justify-center gap-1
              font-display font-bold text-white text-sm
              transition-all duration-200 shadow-lg border-3 border-white/30
              ${dragging ? "scale-105 animate-glow" : ""}
              ${feedback?.type === "error" ? "animate-shake" : ""}
            `}
            style={{ backgroundColor: color.hex }}
          >
            <span className="text-2xl">🫧</span>
            <span>{color.fr}</span>
            <span className="text-xs opacity-80">{color.es}</span>
          </button>
        ))}
      </div>

      {/* Items to classify */}
      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
        {current.items.map((item) => {
          const isPlaced = placed[item.id] !== undefined;
          const isSelected = dragging === item.id;
          return (
            <button
              key={item.id}
              onClick={() => !isPlaced && handleDragStart(item.id)}
              disabled={isPlaced}
              className={`
                aspect-square rounded-2xl flex flex-col items-center justify-center gap-1
                bg-white border-2 transition-all duration-200 shadow-md
                ${
                  isPlaced
                    ? "border-green-300 bg-green-50 opacity-50"
                    : isSelected
                      ? "border-yellow-400 bg-yellow-50 scale-110 shadow-lg"
                      : "border-gray-100 hover:border-blue-200 hover:scale-105"
                }
                active:scale-95
              `}
            >
              <span className="text-3xl">{item.emoji}</span>
              <span className="font-display text-xs font-bold text-gray-600">
                {item.fr}
              </span>
            </button>
          );
        })}
      </div>

      {feedback && (
        <div
          className={`fixed inset-x-0 top-8 mx-auto w-fit px-8 py-4 rounded-2xl font-display font-bold text-xl text-white shadow-xl animate-float z-50 ${
            feedback.type === "error" ? "bg-red-400" : "bg-green-500"
          }`}
        >
          {feedback.text}
        </div>
      )}
    </div>
  );
}
