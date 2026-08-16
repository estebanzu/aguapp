export const motifs = [
  {
    id: "ab",
    pattern: ["red", "blue"],
    fr: "Rouge, Bleu",
    es: "Rojo, Azul",
    difficulty: 1,
  },
  {
    id: "abc",
    pattern: ["red", "blue", "green"],
    fr: "Rouge, Bleu, Vert",
    es: "Rojo, Azul, Verde",
    difficulty: 2,
  },
  {
    id: "aab",
    pattern: ["red", "red", "blue"],
    fr: "Rouge, Rouge, Bleu",
    es: "Rojo, Rojo, Azul",
    difficulty: 2,
  },
  {
    id: "abb",
    pattern: ["red", "blue", "blue"],
    fr: "Rouge, Bleu, Bleu",
    es: "Rojo, Azul, Azul",
    difficulty: 2,
  },
  {
    id: "aabb",
    pattern: ["red", "red", "blue", "blue"],
    fr: "Rouge, Rouge, Bleu, Bleu",
    es: "Rojo, Rojo, Azul, Azul",
    difficulty: 3,
  },
  {
    id: "abab",
    pattern: ["red", "blue", "red", "blue"],
    fr: "Rouge, Bleu, Rouge, Bleu",
    es: "Rojo, Azul, Rojo, Azul",
    difficulty: 3,
  },
];

export const motifColors = {
  red: { hex: "#EF4444", fr: "Rouge", es: "Rojo" },
  blue: { hex: "#3B82F6", fr: "Bleu", es: "Azul" },
  green: { hex: "#22C55E", fr: "Vert", es: "Verde" },
  yellow: { hex: "#EAB308", fr: "Jaune", es: "Amarillo" },
  orange: { hex: "#F97316", fr: "Orange", es: "Naranja" },
  purple: { hex: "#A855F7", fr: "Violet", es: "Morado" },
};
