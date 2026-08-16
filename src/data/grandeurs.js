export const grandeurs = [
  {
    id: "size",
    fr: "Grandeur",
    es: "Tamaño",
    items: [
      { id: "big", emoji: "🐘", fr: "Grand", es: "Grande", value: 3 },
      { id: "medium", emoji: "🐕", fr: "Moyen", es: "Mediano", value: 2 },
      { id: "small", emoji: "🐁", fr: "Petit", es: "Pequeño", value: 1 },
    ],
  },
  {
    id: "height",
    fr: "Hauteur",
    es: "Altura",
    items: [
      { id: "tall", emoji: "🦒", fr: "Haut", es: "Alto", value: 3 },
      { id: "mid", emoji: "🦊", fr: "Moyen", es: "Medio", value: 2 },
      { id: "short", emoji: "🐢", fr: "Bas", es: "Bajo", value: 1 },
    ],
  },
  {
    id: "length",
    fr: "Longueur",
    es: "Largo",
    items: [
      { id: "long", emoji: "🐍", fr: "Long", es: "Largo", value: 3 },
      { id: "mid", emoji: "🐟", fr: "Moyen", es: "Medio", value: 2 },
      { id: "short", emoji: "🐛", fr: "Court", es: "Corto", value: 1 },
    ],
  },
  {
    id: "weight",
    fr: "Masse",
    es: "Peso",
    items: [
      { id: "heavy", emoji: "🐘", fr: "Lourd", es: "Pesado", value: 3 },
      { id: "mid", emoji: "🐕", fr: "Moyen", es: "Medio", value: 2 },
      { id: "light", emoji: "🪶", fr: "Léger", es: "Ligero", value: 1 },
    ],
  },
];

export const grandeurQuestions = [
  {
    id: 1,
    questionFr: "Lequel est le plus grand ?",
    questionEs: "¿Cuál es el más grande?",
    category: "size",
    correctId: "big",
    feedbackFr: "Bravo ! L'éléphant est le plus grand !",
    feedbackEs: "¡Bravo! ¡El elefante es el más grande!",
  },
  {
    id: 2,
    questionFr: "Lequel est le plus petit ?",
    questionEs: "¿Cuál es el más pequeño?",
    category: "size",
    correctId: "small",
    feedbackFr: "Super ! La souris est la plus petite !",
    feedbackEs: "¡Super! ¡El ratón es el más pequeño!",
  },
  {
    id: 3,
    questionFr: "Lequel est le plus haut ?",
    questionEs: "¿Cuál es el más alto?",
    category: "height",
    correctId: "tall",
    feedbackFr: "Oui ! La girafe est la plus haute !",
    feedbackEs: "¡Sí! ¡La jirafa es la más alta!",
  },
  {
    id: 4,
    questionFr: "Lequel est le plus long ?",
    questionEs: "¿Cuál es el más largo?",
    category: "length",
    correctId: "long",
    feedbackFr: "Formidable ! Le serpent est le plus long !",
    feedbackEs: "¡Fantástico! ¡La serpiente es la más larga!",
  },
  {
    id: 5,
    questionFr: "Lequel est le plus lourd ?",
    questionEs: "¿Cuál es el más pesado?",
    category: "weight",
    correctId: "heavy",
    feedbackFr: "Merveilleux ! L'éléphant est le plus lourd !",
    feedbackEs: "¡Maravilloso! ¡El elefante es el más pesado!",
  },
];
