let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(frequency, duration, type = 'sine', volume = 0.3) {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch {
    // Audio not available
  }
}

export function playPop() {
  playTone(600, 0.08, 'sine', 0.25);
  setTimeout(() => playTone(800, 0.06, 'sine', 0.15), 30);
}

export function playSuccess() {
  playTone(523, 0.12, 'sine', 0.3);
  setTimeout(() => playTone(659, 0.12, 'sine', 0.3), 100);
  setTimeout(() => playTone(784, 0.15, 'sine', 0.3), 200);
}

export function playError() {
  playTone(300, 0.15, 'square', 0.15);
  setTimeout(() => playTone(250, 0.2, 'square', 0.1), 120);
}

export function playClick() {
  playTone(1000, 0.03, 'sine', 0.1);
}

export function playCelebration() {
  const notes = [523, 587, 659, 698, 784, 880, 988, 1047];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.1, 'sine', 0.2), i * 60);
  });
}

export function playWhoosh() {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  } catch {}
}

export function playUnlock() {
  playTone(880, 0.1, 'sine', 0.25);
  setTimeout(() => playTone(1100, 0.1, 'sine', 0.25), 80);
  setTimeout(() => playTone(1320, 0.15, 'sine', 0.3), 160);
}
