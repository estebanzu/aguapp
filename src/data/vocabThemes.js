export const vocabThemes = [
  {
    id: "animaux",
    fr: "Animaux",
    es: "Animales",
    emoji: "🐾",
    words: [
      { id: "chat", emoji: "🐱", fr: "Chat", es: "Gato" },
      { id: "chien", emoji: "🐶", fr: "Chien", es: "Perro" },
      { id: "oiseau", emoji: "🐦", fr: "Oiseau", es: "Pájaro" },
      { id: "poisson", emoji: "🐟", fr: "Poisson", es: "Pez" },
      { id: "lapin", emoji: "🐰", fr: "Lapin", es: "Conejo" },
      { id: "vache", emoji: "🐄", fr: "Vache", es: "Vaca" },
      { id: "cheval", emoji: "🐴", fr: "Cheval", es: "Caballo" },
      { id: "mouton", emoji: "🐑", fr: "Mouton", es: "Oveja" },
    ],
  },
  {
    id: "aliments",
    fr: "Aliments",
    es: "Alimentos",
    emoji: "🍎",
    words: [
      { id: "pomme", emoji: "🍎", fr: "Pomme", es: "Manzana" },
      { id: "banane", emoji: "🍌", fr: "Banane", es: "Plátano" },
      { id: "orange", emoji: "🍊", fr: "Orange", es: "Naranja" },
      { id: "fromage", emoji: "🧀", fr: "Fromage", es: "Queso" },
      { id: "pain", emoji: "🍞", fr: "Pain", es: "Pan" },
      { id: "lait", emoji: "🥛", fr: "Lait", es: "Leche" },
      { id: "gateau", emoji: "🎂", fr: "Gâteau", es: "Pastel" },
      { id: "bonbon", emoji: "🍬", fr: "Bonbon", es: "Caramelo" },
    ],
  },
  {
    id: "vetements",
    fr: "Vêtements",
    es: "Ropa",
    emoji: "👕",
    words: [
      { id: "chemise", emoji: "👕", fr: "Chemise", es: "Camisa" },
      { id: "pantalon", emoji: "👖", fr: "Pantalon", es: "Pantalón" },
      { id: "chaussure", emoji: "👟", fr: "Chaussure", es: "Zapato" },
      { id: "chapeau", emoji: "🎩", fr: "Chapeau", es: "Sombrero" },
      { id: "robe", emoji: "👗", fr: "Robe", es: "Vestido" },
      { id: "manteau", emoji: "🧥", fr: "Manteau", es: "Abrigo" },
      { id: "gant", emoji: "🧤", fr: "Gant", es: "Guante" },
      { id: "écharpe", emoji: "🧣", fr: "Écharpe", es: "Bufanda" },
    ],
  },
  {
    id: "couleurs",
    fr: "Couleurs",
    es: "Colores",
    emoji: "🌈",
    words: [
      { id: "rouge", emoji: "🔴", fr: "Rouge", es: "Rojo" },
      { id: "bleu", emoji: "🔵", fr: "Bleu", es: "Azul" },
      { id: "vert", emoji: "🟢", fr: "Vert", es: "Verde" },
      { id: "jaune", emoji: "🟡", fr: "Jaune", es: "Amarillo" },
      { id: "orange", emoji: "🟠", fr: "Orange", es: "Naranja" },
      { id: "violet", emoji: "🟣", fr: "Violet", es: "Morado" },
      { id: "rose", emoji: "💗", fr: "Rose", es: "Rosa" },
      { id: "noir", emoji: "⚫", fr: "Noir", es: "Negro" },
    ],
  },
  {
    id: "maison",
    fr: "La Maison",
    es: "La Casa",
    emoji: "🏠",
    words: [
      { id: "porte", emoji: "🚪", fr: "Porte", es: "Puerta" },
      { id: "fenetre", emoji: "🪟", fr: "Fenêtre", es: "Ventana" },
      { id: "lit", emoji: "🛏️", fr: "Lit", es: "Cama" },
      { id: "table", emoji: "🪑", fr: "Table", es: "Mesa" },
      { id: "baignoire", emoji: "🛁", fr: "Baignoire", es: "Bañera" },
      { id: "fourchette", emoji: "🍴", fr: "Fourchette", es: "Tenedor" },
      { id: "assiette", emoji: "🍽️", fr: "Assiette", es: "Plato" },
      { id: "tasse", emoji: "☕", fr: "Tasse", es: "Taza" },
    ],
  },
];

export function getWeeklyTheme() {
  const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  return vocabThemes[weekNumber % vocabThemes.length];
}
