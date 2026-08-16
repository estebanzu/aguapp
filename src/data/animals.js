export const animals = [
  { id: 'cat', emoji: '🐱', fr: 'Chat', es: 'Gato', sound: 'Miaou' },
  { id: 'dog', emoji: '🐶', fr: 'Chien', es: 'Perro', sound: 'Ouaf' },
  { id: 'bird', emoji: '🐦', fr: 'Oiseau', es: 'Pájaro', sound: 'Tchip' },
  { id: 'fish', emoji: '🐟', fr: 'Poisson', es: 'Pez', sound: 'Glouglou' },
  { id: 'rabbit', emoji: '🐰', fr: 'Lapin', es: 'Conejo', sound: null },
  { id: 'cow', emoji: '🐄', fr: 'Vache', es: 'Vaca', sound: 'Meuh' },
  { id: 'horse', emoji: '🐴', fr: 'Cheval', es: 'Caballo', sound: 'Hiiih' },
  { id: 'sheep', emoji: '🐑', fr: 'Mouton', es: 'Oveja', sound: 'Bêê' },
  { id: 'duck', emoji: '🦆', fr: 'Canard', es: 'Pato', sound: 'Coin' },
  { id: 'frog', emoji: '🐸', fr: 'Grenouille', es: 'Rana', sound: 'Coin' },
];

export const countQuestions = [
  {
    id: 1,
    questionFr: 'Comptes les chats',
    questionEs: 'Cuenta los gatos',
    targetAnimal: 'cat',
    count: 3,
    feedbackFr: 'Bravo ! Il y a trois chats !',
    feedbackEs: '¡Bravo! ¡Hay tres gatos!',
  },
  {
    id: 2,
    questionFr: 'Comptes les chiens',
    questionEs: 'Cuenta los perros',
    targetAnimal: 'dog',
    count: 2,
    feedbackFr: 'Super ! Il y a deux chiens !',
    feedbackEs: '¡Super! ¡Hay dos perros!',
  },
  {
    id: 3,
    questionFr: 'Comptes les oiseaux',
    questionEs: 'Cuenta los pájaros',
    targetAnimal: 'bird',
    count: 5,
    feedbackFr: 'Merveilleux ! Il y a cinq oiseaux !',
    feedbackEs: '¡Maravilloso! ¡Hay cinco pájaros!',
  },
  {
    id: 4,
    questionFr: 'Comptes les poissons',
    questionEs: 'Cuenta los peces',
    targetAnimal: 'fish',
    count: 4,
    feedbackFr: 'Formidable ! Il y a quatre poissons !',
    feedbackEs: '¡Fantástico! ¡Hay cuatro peces!',
  },
  {
    id: 5,
    questionFr: 'Comptes les lapins',
    questionEs: 'Cuenta los conejos',
    targetAnimal: 'rabbit',
    count: 1,
    feedbackFr: 'Oui ! Il y a un lapin !',
    feedbackEs: '¡Sí! ¡Hay un conejo!',
  },
];

export const classifyColors = [
  { id: 'red', fr: 'Rouge', es: 'Rojo', hex: '#EF4444' },
  { id: 'blue', fr: 'Bleu', es: 'Azul', hex: '#3B82F6' },
  { id: 'yellow', fr: 'Jaune', es: 'Amarillo', hex: '#EAB308' },
];

export const classifyItems = [
  { id: 'apple', emoji: '🍎', colorId: 'red', fr: 'Pomme', es: 'Manzana' },
  { id: 'ball', emoji: '⚽', colorId: 'red', fr: 'Balle', es: 'Pelota' },
  { id: 'car', emoji: '🚗', colorId: 'red', fr: 'Voiture', es: 'Coche' },
  { id: 'fish', emoji: '🐟', colorId: 'blue', fr: 'Poisson', es: 'Pez' },
  { id: ' balloon', emoji: '🎈', colorId: 'blue', fr: 'Ballon', es: 'Globo' },
  { id: 'bird', emoji: '🐦', colorId: 'blue', fr: 'Oiseau', es: 'Pájaro' },
  { id: 'sun', emoji: '🌞', colorId: 'yellow', fr: 'Soleil', es: 'Sol' },
  { id: 'star', emoji: '⭐', colorId: 'yellow', fr: 'Étoile', es: 'Estrella' },
  { id: 'duck', emoji: '🦆', colorId: 'yellow', fr: 'Canard', es: 'Pato' },
];
