const STORAGE_KEY = "petit-monde-progress";

function crearPerfilInicial() {
  return {
    name: "Petit Monde",
    age: 4,
    startDate: new Date().toISOString(),
    concepts: {
      colors: {},
      numbers: {},
      bodyParts: {},
    },
    sessions: [],
    currentStreak: 0,
    longestStreak: 0,
    lastPlayDate: null,
    totalSessions: 0,
    totalMinutes: 0,
    firstVisit: { colores: true, numeros: true, cuerpo: true },
  };
}

export function cargarProgreso() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return crearPerfilInicial();
    const parsed = JSON.parse(data);
    return { ...crearPerfilInicial(), ...parsed };
  } catch {
    return crearPerfilInicial();
  }
}

export function guardarProgreso(perfil) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(perfil));
  } catch {
    // localStorage unavailable
  }
}

export function registrarIntento(perfil, seccion, concepto, esCorrecto) {
  if (!perfil.concepts[seccion]) {
    perfil.concepts[seccion] = {};
  }
  if (!perfil.concepts[seccion][concepto]) {
    perfil.concepts[seccion][concepto] = {
      attempts: 0,
      correct: 0,
      mastery: 0,
    };
  }
  const c = perfil.concepts[seccion][concepto];
  c.attempts++;
  if (esCorrecto) c.correct++;
  c.mastery = c.correct / c.attempts;
  c.lastSeen = new Date().toISOString();
  guardarProgreso(perfil);
  return c;
}

export function registrarSesion(perfil, duracionSegundos, secciones, score) {
  perfil.sessions.push({
    date: new Date().toISOString(),
    duration: duracionSegundos,
    sections: secciones,
    score,
  });
  perfil.totalSessions++;
  perfil.totalMinutes += Math.round(duracionSegundos / 60);
  actualizarStreak(perfil);
  guardarProgreso(perfil);
}

function actualizarStreak(perfil) {
  const hoy = new Date().toDateString();
  if (perfil.lastPlayDate === hoy) return;

  const ayer = new Date();
  ayer.setDate(ayer.getDate() - 1);

  if (perfil.lastPlayDate === ayer.toDateString()) {
    perfil.currentStreak++;
  } else if (perfil.lastPlayDate !== hoy) {
    perfil.currentStreak = 1;
  }
  perfil.lastPlayDate = hoy;
  perfil.longestStreak = Math.max(perfil.longestStreak, perfil.currentStreak);
}

export function marcarVisita(perfil, seccion) {
  if (perfil.firstVisit) {
    perfil.firstVisit[seccion] = false;
    guardarProgreso(perfil);
  }
}

export function esPrimeraVisita(perfil, seccion) {
  return perfil.firstVisit?.[seccion] !== false;
}

export function obtenerConceptosDebiles(perfil) {
  const debiles = [];
  for (const [seccion, conceptos] of Object.entries(perfil.concepts)) {
    for (const [concepto, datos] of Object.entries(conceptos)) {
      if (datos.attempts >= 3 && datos.mastery < 0.6) {
        debiles.push({
          section: seccion,
          concept: concepto,
          mastery: datos.mastery,
        });
      }
    }
  }
  return debiles.sort((a, b) => a.mastery - b.mastery);
}

export function obtenerMastery(perfil, seccion, concepto) {
  return perfil.concepts?.[seccion]?.[concepto]?.mastery ?? 0;
}
