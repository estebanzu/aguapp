const VOICE_PRIORITY = {
  "fr-FR": [
    "Amélie",
    "Thomas",
    "Audrey",
    "Marie",
    "Virginie",
    "Julie",
    "Mathieu",
    "Inès",
    "Élodie",
    "Margaux",
    "France",
    "Charlotte",
    "Aurélie",
    "Nathalie",
    "Hélène",
    "Brigitte",
    "Céline",
    "Sylvie",
  ],
  "es-ES": [
    "Helena",
    "Elvira",
    "Álvaro",
    "Carlos",
    "Lucía",
    "Mónica",
    "Enrique",
    "Rodrigo",
    "Paloma",
    "Pilar",
    "Conchita",
    "Estrella",
    "Laura",
    "Jorge",
    "Diego",
    "Carmen",
    "Ana",
    "Sergio",
  ],
};

const WARMUP_PHRASES = {
  "fr-FR": "Bonjour",
  "es-ES": "Hola",
};

let selectedVoices = {};
let voicesLoaded = false;

function loadVoices() {
  if (voicesLoaded) return;
  if (!window.speechSynthesis) return;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return;

  Object.keys(VOICE_PRIORITY).forEach((lang) => {
    if (selectedVoices[lang]) return;

    const langVoices = voices.filter(
      (v) => v.lang === lang || v.lang.startsWith(lang.split("-")[0] + "-"),
    );

    const priorityList = VOICE_PRIORITY[lang];
    let best = null;

    for (const name of priorityList) {
      const found = langVoices.find((v) =>
        v.name.toLowerCase().includes(name.toLowerCase()),
      );
      if (found) {
        best = found;
        break;
      }
    }

    if (!best) {
      best = langVoices.find((v) => v.localService === false) || langVoices[0];
    }

    selectedVoices[lang] = best;
  });

  voicesLoaded = true;
}

if (typeof window !== "undefined") {
  window.speechSynthesis?.addEventListener?.("voiceschanged", () => {
    voicesLoaded = false;
    loadVoices();
  });
  loadVoices();
}

function getVoice(lang) {
  loadVoices();
  const code = lang === "fr" ? "fr-FR" : lang === "es" ? "es-ES" : lang;
  return selectedVoices[code] || null;
}

function getLangCode(lang) {
  if (lang === "fr") return "fr-FR";
  if (lang === "es") return "es-ES";
  if (lang === "fr-FR" || lang === "es-ES") return lang;
  return "fr-FR";
}

export function speak(text, lang = "fr") {
  if (!window.speechSynthesis || !text) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const langCode = getLangCode(lang);
  utterance.lang = langCode;
  utterance.rate = 0.82;
  utterance.pitch = 1.1;
  utterance.volume = 1;

  const voice = getVoice(langCode);
  if (voice) utterance.voice = voice;

  window.speechSynthesis.speak(utterance);
}

export function speakExcited(text, lang = "fr") {
  if (!window.speechSynthesis || !text) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const langCode = getLangCode(lang);
  utterance.lang = langCode;
  utterance.rate = 0.88;
  utterance.pitch = 1.3;

  const voice = getVoice(langCode);
  if (voice) utterance.voice = voice;

  window.speechSynthesis.speak(utterance);
}

export function speakBilingual(frText, esText, onComplete) {
  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const frUtterance = new SpeechSynthesisUtterance(frText);
  frUtterance.lang = "fr-FR";
  frUtterance.rate = 0.82;
  frUtterance.pitch = 1.1;

  const esUtterance = new SpeechSynthesisUtterance(esText);
  esUtterance.lang = "es-ES";
  esUtterance.rate = 0.82;
  esUtterance.pitch = 1.1;

  const frVoice = getVoice("fr-FR");
  const esVoice = getVoice("es-ES");
  if (frVoice) frUtterance.voice = frVoice;
  if (esVoice) esUtterance.voice = esVoice;

  frUtterance.onend = () => {
    setTimeout(() => {
      esUtterance.onend = onComplete;
      window.speechSynthesis.speak(esUtterance);
    }, 700);
  };

  window.speechSynthesis.speak(frUtterance);
}

export function speakSingle(text, lang = "fr") {
  speak(text, lang);
}

export function getAvailableVoices() {
  if (!window.speechSynthesis) return [];
  return window.speechSynthesis.getVoices();
}

export function getSelectedVoice(lang) {
  return getVoice(lang);
}
