export function speak(text, lang = 'fr-FR') {
  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.75;
  utterance.pitch = 1.15;
  utterance.volume = 1;

  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => v.lang === lang);
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export function speakBilingual(frText, esText, onComplete) {
  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const frUtterance = new SpeechSynthesisUtterance(frText);
  frUtterance.lang = 'fr-FR';
  frUtterance.rate = 0.75;
  frUtterance.pitch = 1.15;

  const esUtterance = new SpeechSynthesisUtterance(esText);
  esUtterance.lang = 'es-ES';
  esUtterance.rate = 0.75;
  esUtterance.pitch = 1.15;

  const voices = window.speechSynthesis.getVoices();
  const frVoice = voices.find(v => v.lang === 'fr-FR');
  const esVoice = voices.find(v => v.lang === 'es-ES');
  if (frVoice) frUtterance.voice = frVoice;
  if (esVoice) esUtterance.voice = esVoice;

  frUtterance.onend = () => {
    setTimeout(() => {
      esUtterance.onend = onComplete;
      window.speechSynthesis.speak(esUtterance);
    }, 800);
  };

  window.speechSynthesis.speak(frUtterance);
}

export function speakExcited(text, lang = 'fr-FR') {
  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.85;
  utterance.pitch = 1.4;

  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find(v => v.lang === lang);
  if (voice) utterance.voice = voice;

  window.speechSynthesis.speak(utterance);
}

if (typeof window !== 'undefined') {
  window.speechSynthesis?.getVoices();
}
