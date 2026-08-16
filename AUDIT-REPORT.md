# Informe de Auditoría — Apprendre avec Agus
## Auditor UX/UI, Pedagógica y de Gamificación para Educación Infantil (2-5 años)

**Fecha:** Agosto 2026  
**Aplicación:** Apprendre avec Agus (Vite + React + Tailwind CSS)  
**Alumno objetivo:** 4 años, Maternelle Petite Section (colegio francés)  
**Idiomas:** Francés (fr-FR) / Español (es-ES)

---

## 1. Resumen Ejecutivo

### Hallazgo principal
La app es una **base técnica sólida** con arquitectura limpia, audio bilingual funcional y un quiz interactivo bien diseñado. Sin embargo, desde la perspectiva pedagógica alineada al currículo oficial francés de Maternelle (programa 2024-2025, BO 31 octubre 2024), la app cubre solo **aproximadamente el 15-20% de los objetivos de aprendizaje** de Petite Section en los dominios de lenguaje y matemáticas.

### Lo que funciona bien
- Arquitectura de código modular y mantenible
- Web Speech API configurada correctamente (rate 0.75, pitch 1.15)
- QuizMode como componente reutilizable con refuerzo positivo
- SVG interactivo del cuerpo humano
- Diseño touch-friendly (tap targets grandes, sin double-tap zoom)

### Lo que necesita mejoras urgentes
- **Contenido limitado:** Solo 25 ítems de vocabulario (5 colores, 10 números, 10 partes del cuerpo)
- **Faltan actividades alineadas al currículo:** No hay clasificación, conteo real, motivos organizados, ni exploración de formas/grandezas
- **Sin adaptación inteligente:** No detecta errores frecuentes ni refuerza conceptos débiles
- **Sin panel de padres:** No hay progreso, ni configuración, ni control
- **Gamificación básica:** Solo estrellas al final del quiz, sin progresión visible

---

## 2. Evaluación Pedagógica vs. Currículo Oficial Francés

### Referencia: Programme Cycle 1 — Maternelle (BO 31/10/2024)

El programa francés de Cycle 1 está estructurado en **5 dominios de aprendizaje**. A continuación se evalúa la cobertura de la app en cada uno:

### Dominio 1: Développement et structuration du langage oral et écrit

| Área curricular | Objetivo Petite Section (3-4 ans) | Cobertura actual | Nivel | Recomendación |
|---|---|---|---|---|
| **Enrichir son vocabulaire** | Comprendre, mémoriser, réemployer les mots des corpus enseignés (2 par période) | Parcial: vocabulario de colores, números y partes del cuerpo | 🟡 Medio | Agregar corpus temáticos: animaux, aliments, vêtements, émotions. El currículo pide 2 corpus/periodo = ~20 palabras/nuevo cada 6 semanas |
| **Organiser les mots en catégorie** | Classer des objets par catégorie (couleur, forme, taille, fonction) | No existe actividad de clasificación | 🔴 Bajo | **CRÍTICO:** Agregar juego de arrastrar/clasificar objetos por color o forma |
| **Développer sa syntaxe** | Diversifier les pronoms employés | Parcial: usa "C'est la tête" / "Ce sont les yeux" (singular/plural) | 🟡 Medio | Expandir con frases de 2-3 palabras: "Je vois un chat rouge", "Il y a trois balles" |
| **Articuler distinctement** | Prononcer correctement les couples de consonnes proches (t/k, f/s, m/n) | No abordado | 🔴 Bajo | Agregar actividades de repetición de sonidos específicos |
| **Produire des discours variés** | Raconter, décrire, expliquer | Solo escucha pasiva, no hay producción oral guiada | 🔴 Bajo | Agregar "Répète après moi" con frases simples |
| **S'éveiller à la diversité linguistique** | Comprendre qu'il existe d'autres langues | ✅ Bilingüe FR/ES | 🟢 Alto | Mantener y expandir |
| **Habiletés phonologiques** | Écouter, identifier, discriminer des sons | No abordado | 🔴 Bajo | Fase futura: conciencia fonológica |

### Dominio 4: Acquisition des premiers outils mathématiques

| Área curricular | Objetivo Petite Section (3-4 ans) | Cobertura actual | Nivel | Recomendación |
|---|---|---|---|---|
| **Découvrir les nombres** | Associer une quantité, le nom d'un nombre et une écriture chiffrée (hasta 3-4) | Parcial: muestra cifra + dots, pero no hay manipulación de colecciones reales | 🟡 Medio | Agregar juego de "Comptes les pommes" donde el niño cuenta objetos reales |
| **Exprimer une quantité** | Percevoir globalement une petite quantité (subitization) | Parcial: DotGrid muestra cantidad visualmente | 🟡 Medio | Agregar subitization nativa: mostrar 3 balones brevemente y preguntar "Combien?" |
| **Composer et décomposer** | Comprendre que 3 = 2 + 1 | No existe | 🔴 Bajo | Agregar juego de descomposición: "3, c'est 1 et encore 2" |
| **Comparer des quantités** | Plus/moins autant que | No existe | 🔴 Bajo | Agregar juego de comparación: "Lequel a plus?" |
| **Résoudre des problèmes** | Problèmes de réunion (ajout/retrait) hasta 3-4 | No existe | 🔴 Bajo | **CRÍTICO:** Agregar problemas concretos: "Tu as 2 bonbons, j'en ajoute 1" |
| **Explorer les formes planes** | Reconnaître, trier, classer selon la forme (carré, triangle, disque) | No existe | 🔴 Bajo | Agregar módulo de formas |
| **Explorer les grandeurs** | Comparer longueurs, masses (grand/petit, lourd/léger) | No existe | 🔴 Bajo | Agregar juego de comparación de tamaños |
| **Motifs organisés** | Copier, identifier, mémoriser, compléter, prolonger un motif répétitif | No existe | 🔴 Bajo | **PRIORITARIO:** Motivos son la base del pensamiento algebraico. Agregar: 🔴🔵🔴🔵🔴? |
| **Formes et solides** | Identifier cube, boule, cylindre; carré, triangle, disque | No existe | 🔴 Bajo | Agregar módulo de geometría básica |

### Dominio 2: Activités physiques
| Área | Cobertura | Recomendación |
|---|---|---|
| Motricité fine via interacción táctil | 🟡 Parcial (toque de botones) | Agregar arrastrar (drag & drop), trazado de dedo |

### Dominio 3: Activités artistiques
| Área | Cobertura | Recomendación |
|---|---|---|
| Exploration musicale | 🔴 Ninguno | Agregar comptines (nursery rhymes) bilingües |
| Création plastique | 🔴 Ninguno | Fase futura: colorear, dibujar |

### Dominio 5: Explorer le monde
| Área | Cobertura | Recomendación |
|---|---|---|
| Découvrir le vivant | 🟡 Parcial (partes del cuerpo) | Agregar animaux, plantas, cuerpo humano más detallado |
| Découvrir la matière | 🔴 Ninguno | Fase futura |

### Resumen de cobertura curricular

| Dominio | Cobertura estimada | Prioridad |
|---|---|---|
| Langage oral et écrit | 25% | Alta |
| Activités physiques | 15% | Media |
| Activités artistiques | 5% | Baja |
| Outils mathématiques | 20% | **Muy Alta** |
| Se repérer (temps/espace) | 0% | Baja |
| Explorer le monde | 10% | Media |

---

## 3. Evaluación UX/UI Infantil

### 3.1 Evaluación por criterios

| Criterio | Estado actual | Valoración | Detalle |
|---|---|---|---|
| **Tamaño de botones** | ✅ Grande (aspect-square, px-5 py-3+) | 🟢 Bueno | Touch targets >48px. Cumple recomendación Google (48dp mínimo) |
| **Contraste** | ⚠️ Variable | 🟡 Mejorable | Texto blanco sobre colores claros (amarillo) tiene bajo contraste. Botones de quiz en fondo blanco son correctos |
| **Legibilidad** | ✅ Buena | 🟢 Bueno | Nunito (display) + Inter (body) son legibles. Tamaños de texto apropiados |
| **Elementos por pantalla** | ✅ Contenido | 🟢 Bueno | Grid 2-3 columnas, sin saturación visual |
| **Distracciones visuales** | ✅ Mínimas | 🟢 Bueno | Fondo crema limpio, sin banners, sin elementos decorativos innecesarios |
| **Navegación** | ✅ Clara | 🟢 Bueno | Bottom nav fija con 4 iconos. Pero: sin botón "atrás" para niños que navegan a sub-secciones |
| **No lectores** | ⚠️ Parcial | 🟡 Mejorable | Iconos + emojis ayudan, pero labels en texto (Couleurs, Nombres) requieren leer. Los niños de 3-4 años no leen |
| **Feedback visual** | ✅ Bueno | 🟢 Bueno | Animaciones de bounce, shake, glow, pop. Inmediato y claro |
| **Feedback auditivo** | ✅ Bueno | 🟢 Bueno | TTS bilingüe, tono pausado, pitch infantil |
| **Onboarding** | ❌ No existe | 🔴 Crítico | No hay tutorial. El niño debe descubrir todo por exploración |
| **Prevención de errores** | ⚠️ Parcial | 🟡 Mejorable | En quiz, si toca mal, se repite la pregunta. Pero no hay "zona segura" para volver |
| **Sobrecarga cognitiva** | ⚠️ Riesgo en quiz | 🟡 Mejorable | 4 opciones de colores simultáneas pueden ser muchas para un niño de 3 años. Considerar empezar con 2-3 opciones |

### 3.2 Problemas críticos

1. **Sin feedback de error explícito:** Cuando el niño toca un color incorrecto en el quiz, solo se escucha "Essaie encore" pero no se muestra visualmente cuál es el correcto. El currículo francés enfatiza el "error como oportunidad de aprendizaje".

2. **Sin modo de exploración guiada:** El niño entra a una sección y debe descubrir por sí solo qué hacer. Para un usuario de 3-4 años, se necesita un "coach" visual (flecha animada,.highlight pulsante).

3. **Navegación sin botón "atrás":** Los niños pequeños no entienden la navegación por tabs. Si accidentalmente tocan "Maison" durante un quiz, pierden todo el progreso.

### 3.3 Problemas importantes

4. **Contraste insuficiente en amarillo:** El texto blanco sobre fondo amarillo (#EAB308) no cumple WCAG AA (ratio 1.85:1, mínimo 4.5:1).

5. **QuizMode no muestra la respuesta correcta tras error:** El niño puede intentar indefinidamente sin aprender cuál era la respuesta correcta.

6. **Sin persistencia de estado:** Al recargar la página, se pierde el progreso del quiz.

### 3.4 Mejoras recomendadas (por prioridad)

| # | Mejora | Impacto | Esfuerzo |
|---|---|---|---|
| 1 | Agregar flecha/guía visual en primera visita a cada sección | Alto | Bajo |
| 2 | Mostrar respuesta correcta tras 2 intentos fallidos | Alto | Bajo |
| 3 | Agregar botón "volver" en quiz | Alto | Bajo |
| 4 | Corregir contraste amarillo (cambiar texto a gris oscuro) | Medio | Bajo |
| 5 | Reducir opciones de quiz a 2-3 para niños <4 años | Medio | Bajo |
| 6 | Agregar sonido de "tap" en interacciones | Bajo | Bajo |

---

## 4. Evaluación de Gamificación

### 4.1 Elementos de gamificación actuales

| Elemento | ¿Existe? | Calidad | Comentario |
|---|---|---|---|
| **Recompensas inmediatas** | ✅ | 🟡 Básica | Solo audio "Bravo!" y animación pop. Sin monedas, puntos, ni ítems coleccionables |
| **Celebraciones** | ✅ | 🟡 Básica | Confeti emoji + estrellas al final del quiz. No hay celebración por acierto individual |
| **Refuerzo positivo** | ✅ | 🟡 Parcial | Audio excited funciona, pero es solo auditivo. Falta feedback visual más espectacular |
| **Progresión visible** | ❌ | 🔴 Ausente | No hay barra de progreso, nivel, ni indicador de avance en la sección |
| **Sistema de niveles** | ❌ | 🔴 Ausente | Todos los quiz son iguales. Sin dificultad creciente |
| **Coleccionables** | ❌ | 🔴 Ausente | No hay estampillas, medallas, niPersonajes que desbloquear |
| **Desbloqueos** | ❌ | 🔴 Ausente | No hay contenido que se desbloquee al completar tareas |
| **Motivadores para 2-5 años** | ⚠️ | 🟡 Insuficiente | Los niños de esta edad responden a: personajes simpáticos, animaciones divertidas, sonidos graciosos, "¡lo hice yo!" |
| **Retención** | ❌ | 🔴 Ausente | No hay razón para volver al día siguiente. Sin streaks, sin daily challenge |
| **Narrativa** | ❌ | 🔴 Ausente | Sin personaje guía, sin historia, sin contexto lúdico |

### 4.2 Sistema de gamificación propuesto

#### Nivel 1: Refuerzo inmediato (cada acierto)
```
Acierto → Animación de estrella flotante + sonido "pop" + 
           emoji celebración (🎉⭐🌟) + voz "Bravo [nombre]!"
```

#### Nivel 2: Progresión por sección
```
Cada sección tiene 5 "niveles" de dificultad:
  Nivel 1: 2 opciones, conceptos básicos
  Nivel 2: 3 opciones, conceptos conocidos
  Nivel 3: 4 opciones, mezcla de conceptos
  Nivel 4: Quiz rápido (tiempo visual)
  Nivel 5: "Maestro" - desafío especial
```

#### Nivel 3: Coleccionables temáticos
```
Completar nivel → Desbloquear una "estampa" temática:
  Colores: 🎨 Palette de colores, 🖌️ Pincel, 🌈 Arcoíris
  Números: 🔢 Abaco, 🎲 Dado, ⏰ Reloj
  Cuerpo: 🧍 Silueta, 💪 Músculo, 🏃 Corredor
  
Coleccionar 5 estampas de una categoría → Desbloquear "Medalla de oro"
```

#### Nivel 4: Streak diario
```
Usar la app cada día → contador de días consecutivos
  3 días → 🔥 Fuego emoji
  7 días → ⭐ Estrella dorada  
  14 días → 🏆 Trofeo
  30 días → 👑 Corona
```

#### Nivel 5: Desafío del día
```
Cada día, una pregunta nueva de cada sección
Completar los 3 desafíos → "Défi du jour terminé!"
```

---

## 5. Nuevas Actividades Recomendadas

### 5.1 Colores — Actividades adicionales

#### Actividad 1: Clasificar por color (Arrastrar y soltar)
```
Objetivo curricular: "Organiser les mots en catégorie et en réseau"
Diseño: 
  - En la parte superior: 3 "cubetas" de color (rojo, azul, amarillo)
  - En la parte inferior: 8 objetos de diferentes colores (manzana roja, 
    pelota azul, sol amarillo, etc.)
  - El niño arrastra cada objeto a su cubeta correspondiente
  - Feedback: objeto entra con animación "snap" si es correcto, 
    rebota si es incorrecto
  - Voz: "La manzana est roja / La manzana es roja"
```

#### Actividad 2: Encuentra el color que suena
```
Objetivo curricular: Compréhension orale
Diseño:
  - Se escucha un color en francés
  - Aparecen 3-4 tarjetas de colores
  - El niño toca la que escuchó
  - Sin texto visible (solo color)
  - Evalúa comprensión auditiva pura
```

#### Actividad 3: Mezcla de colores interactiva
```
Objetivo curricular: "Découvrir le monde" (propiedades de la materia)
Diseño:
  - 2 cubetas de color base (amarillo + azul)
  - El niño arrastra una gota de cada una a un recipiente central
  - Animación de mezcla → aparece el color resultante (verde)
  - Voz: " Jaune et bleu, ça fait vert! / ¡Amarillo y azul, hace verde!"
  - Extensible: rojo+amarillo=naranja, rojo+azul=morado
```

#### Actividad 4: Elige tu color favorito
```
Objetivo: Expresión personal + vocabulario
Diseño:
  - Muestra todos los colores
  - Pregunta: "Quelle est ta couleur préférée?" / "¿Cuál es tu color favorito?"
  - El niño toca uno → se guarda como favorito
  - Aparece en su perfil con su nombre
  - Refuerza la idea de que el color tiene un nombre y es "suyo"
```

### 5.2 Números — Actividades adicionales

#### Actividad 5: Contar animales
```
Objetivo curricular: "Dénombrer une collection d'objets"
Diseño:
  - Aparecen 1-5 animales en pantalla (gatos, perros, pájaros)
  - Voz: "Comptes les chats!" / "¡Cuenta los gatos!"
  - El niño toca cada animal → se ilumina y suena el número
  - Al final: "Il y a trois chats!" / "¡Hay tres gatos!"
  - Los animales están dispuestos de forma irregular 
    (el currículo enfatiza que la cantidad es independiente 
    de la posición)
```

#### Actividad 6: Relacionar número y cantidad (Drag & Drop)
```
Objetivo curricular: "Associer une quantité, le nom d'un nombre 
et une écriture chiffrée"
Diseño:
  - Columna izquierda: cifras (1, 2, 3)
  - Columna derecha: grupos de objetos (2 manzanas, 3 estrellas, 1 sol)
  - El niño arrastra la cifra al grupo correcto
  - Feedback con voz al conectar
```

#### Actividad 7: Completar secuencia
```
Objetivo curricular: "Se familiariser avec les motifs organisés"
Diseño:
  - Secuencia: 1, 2, 3, ___, 5
  - El niño toca el hueco → aparecen opciones (4, 6, 8)
  - Al seleccionar correcto: la secuencia se completa con animación
  - Voz: "Un, deux, trois, QUATRE, cinq!"
```

#### Actividad 8: Alimentar al personaje
```
Objetivo curricular: "Utiliser les nombres pour résoudre des problèmes"
Diseño:
  - Personaje (osito) con la boca abierta
  - Número grande mostrando cuántos quiere comer
  - Platos con diferentes cantidades de frutas
  - El niño toca el plato con la cantidad correcta
  - El personaje "come" con animación feliz
  - Voz: "L'ours veut trois pommes! / ¡El oso quiere tres manzanas!"
```

### 5.3 Francés-Español — Actividades adicionales

#### Actividad 9: Escuchar y repetir
```
Objetivo curricular: "Articuler distinctement"
Diseño:
  - Imagen de un objeto/animal + nombre en francés
  - Botón de "escuchar" → se pronuncia
  - Botón de "grabar" → el niño repite (opcional, con Web Audio API)
  - Se compara con la pronunciación original (visual, no comparación exacta)
  - Refuerzo: "Très bien!" si la duración es similar
```

#### Actividad 10: Asociar imagen-palabra
```
Objetivo curricular: "Enrichir son vocabulaire"
Diseño:
  - 4 imágenes de animales/objetos
  - Se escucha una palabra en francés
  - El niño toca la imagen correspondiente
  - Sin texto (solo imagen + audio)
  - Evalúa comprensión léxica
```

#### Actividad 11: Identificar sonidos (Primeros pasos fonológicos)
```
Objetivo curricular: "Acquérir les habiletés phonologiques"
Diseño (simplificado para 3-4 años):
  - Se pronuncia un animal: "Le chat fait miaou"
  - 3 imágenes de animales
  - El niño toca el animal que hace ese sonido
  - Refuerza asociación sonido-significado
```

#### Actividad 12: Vocabulario temático semanal
```
Objetivo curricular: "Comprendre, mémoriser, réemployer les mots 
des corpus enseignés (2 par période)"
Diseño:
  - Cada semana, un nuevo tema: animaux, aliments, vêtements
  - Lunes: Presentación de 5 palabras nuevas (audio + imagen)
  - Martes a jueves: Juegos de repetición
  - Viernes: Quiz de repaso
  - Las palabras se repiten en múltiples contextos
```

---

## 6. Sistema de Adaptación Inteligente

### 6.1 Arquitectura de datos

```javascript
// Modelo de progreso del niño
const childProfile = {
  name: "Agus",
  age: 4,
  startDate: "2026-08-16",
  
  // Progreso por concepto
  concepts: {
    colors: {
      rouge: { attempts: 12, correct: 10, lastSeen: "2026-08-16", mastery: 0.83 },
      bleu: { attempts: 8, correct: 3, lastSeen: "2026-08-15", mastery: 0.375 },
      vert: { attempts: 10, correct: 9, lastSeen: "2026-08-16", mastery: 0.9 },
      // ...
    },
    numbers: {
      1: { attempts: 15, correct: 14, mastery: 0.93 },
      2: { attempts: 12, correct: 11, mastery: 0.92 },
      3: { attempts: 10, correct: 6, mastery: 0.6 },
      // ...
    },
    bodyParts: {
      tete: { attempts: 8, correct: 7, mastery: 0.875 },
      // ...
    }
  },
  
  // Conceptos débiles (mastery < 0.6)
  weakConcepts: [],
  
  // Sesiones
  sessions: [
    { date: "2026-08-16", duration: 300, sections: ["colores", "numeros"], score: 0.75 },
    // ...
  ],
  
  // Streak
  currentStreak: 0,
  longestStreak: 0,
  lastPlayDate: null,
  
  // Logros
  achievements: [],
  unlockedStamps: []
};
```

### 6.2 Algoritmo de selección de preguntas

```
Función seleccionarPregunta(perfil, seccion):
  1. Identificar conceptos débiles (mastery < 0.6)
  2. Si hay conceptos débiles:
     - 70% probabilidad de pregunta sobre concepto débil
     - 30% probabilidad de pregunta sobre concepto nuevo/aleatorio
  3. Si no hay conceptos débiles:
     - Seleccionar concepto no visto recientemente
     - O introducir concepto nuevo
  4. Ajustar dificultad según historial:
     - Si mastery > 0.8: 4 opciones
     - Si mastery 0.5-0.8: 3 opciones
     - Si mastery < 0.5: 2 opciones + respuesta correcta resaltada
  5. Registrar intento en perfil
```

### 6.3 Detección de conceptos problemáticos

```javascript
function identificarDebilidades(perfil) {
  const debiles = [];
  
  for (const [seccion, conceptos] of Object.entries(perfil.concepts)) {
    for (const [concepto, datos] of Object.entries(conceptos)) {
      if (datos.attempts >= 3 && datos.mastery < 0.6) {
        debiles.push({
          section: seccion,
          concept: concepto,
          mastery: datos.mastery,
          priority: datos.mastery < 0.3 ? 'alta' : 'media'
        });
      }
    }
  }
  
  return debiles.sort((a, b) => a.mastery - b.mastery);
}
```

### 6.4 Ajuste de dificultad dinámico

| Mastery del concepto | Dificultad | Opciones en quiz | Frecuencia de práctica |
|---|---|---|---|
| < 0.3 | Fácil | 2 (correcta + 1 distractor) | Muy alta (cada sesión) |
| 0.3 - 0.6 | Medio | 3 | Alta (cada 2 sesiones) |
| 0.6 - 0.8 | Normal | 4 | Normal |
| > 0.8 | Avanzado | 4 + distractors similares | Baja (repaso semanal) |

### 6.5 Persistencia con localStorage

```javascript
// Guardar progreso
function guardarProgreso(perfil) {
  localStorage.setItem('agus-progress', JSON.stringify(perfil));
}

// Cargar progreso
function cargarProgreso() {
  const data = localStorage.getItem('agus-progress');
  return data ? JSON.parse(data) : crearPerfilInicial();
}

// Reset diario (para streak)
function verificarStreak(perfil) {
  const hoy = new Date().toDateString();
  const ultimo = perfil.lastPlayDate;
  
  if (ultimo === hoy) return; // Ya jugó hoy
  
  const ayer = new Date();
  ayer.setDate(ayer.getDate() - 1);
  
  if (ultimo === ayer.toDateString()) {
    perfil.currentStreak++;
  } else {
    perfil.currentStreak = 1;
  }
  
  perfil.lastPlayDate = hoy;
  perfil.longestStreak = Math.max(perfil.longestStreak, perfil.currentStreak);
}
```

---

## 7. Dashboard para Padres

### 7.1 Pantalla principal del dashboard

```
┌─────────────────────────────────────────────┐
│  👋 Bonjour! Tableau de bord des parents    │
│                                              │
│  ┌──────────────┐  ┌──────────────┐         │
│  │ ⏱️ Temps     │  │ 🔥 Streak    │         │
│  │ aujourd'hui  │  │ 5 jours      │         │
│  │ 12 min       │  │              │         │
│  └──────────────┘  └──────────────┘         │
│                                              │
│  📊 Progrès cette semaine                    │
│  ┌─────────────────────────────────────┐    │
│  │ Colores  ████████░░ 80%            │    │
│  │ Nombres  ██████░░░░ 60%            │    │
│  │ Corps    █████████░ 90%            │    │
│  └─────────────────────────────────────┘    │
│                                              │
│  ⚠️ Concepts à renforcer                     │
│  ┌─────────────────────────────────────┐    │
│  │ 🔵 Bleu/Azul - 37% de réussite     │    │
│  │ 🔢 3/Trois - 60% de réussite       │    │
│  │ 👂 Oreilles - 50% de réussite      │    │
│  └─────────────────────────────────────┘    │
│                                              │
│  🎯 Objectifs de la semaine                  │
│  ┌─────────────────────────────────────┐    │
│  │ ☐ Jouer 5 jours cette semaine       │    │
│  │ ☐ Compléter le défi quotidien       │    │
│  │ ☐ Améliorer le score en "Bleu"      │    │
│  └─────────────────────────────────────┘    │
│                                              │
│  ⚙️ Paramètres                               │
│  [Durée max: 15 min] [Son: ON] [FR/ES/Les deux] │
└─────────────────────────────────────────────┘
```

### 7.2 Funcionalidades del dashboard

| Funcionalidad | Descripción | Prioridad |
|---|---|---|
| **Tiempo de uso** | Timer visible + límite configurable (15, 20, 30 min) | Alta |
| **Conceptos dominados** | Lista verde de conceptos con mastery > 80% | Alta |
| **Conceptos en dificultad** | Lista roja de conceptos con mastery < 60% | Alta |
| **Historial de progreso** | Gráfico simple de progreso por semana | Media |
| **Recomendaciones** | "Agus debe practicar más los colores" | Media |
| **Objetivos semanales** | Metas configurables por el padre | Media |
| **Control de contenido** | Activar/desactivar secciones, dificultad | Alta |
| **Modo "solo explorar"** | Desactivar quiz, solo modo exploración | Baja |
| **Registro de actividad** | Log de cada sesión con timestamp | Baja |

### 7.3 Acceso al dashboard

El dashboard debe estar **protegido** para que solo los padres accedan:

```
Pantalla de acceso:
  - Toque largo (3 segundos) en el logo "A" de la pantalla de inicio
  - O: 5 toques rápidos en el logo
  - O: PIN de 4 dígitos (configurable)
  
Razón: El niño no debe poder acceder a configuraciones 
que podrían cambiar su experiencia de aprendizaje
```

---

## 8. Roadmap Priorizado

### Fase 1: Quick Wins (1 semana)
**Objetivo:** Mejoras inmediatas con alto impacto, sin cambiar arquitectura

| # | Cambio | Archivos afectados | Impacto |
|---|---|---|---|
| 1 | Corregir contraste de texto amarillo (texto→gray-800) | Colores.jsx, Numeros.jsx | UX |
| 2 | Agregar botón "volver" en quiz (icono flecha) | QuizMode.jsx | UX crítico |
| 3 | Mostrar respuesta correcta tras 2 intentos fallidos | QuizMode.jsx | Pedagógico |
| 4 | Agregar sonido de "pop" al tocar botones (Web Audio API) | Nuevo: sound.js | Engagement |
| 5 | Guardar/cargar progreso desde localStorage | Nuevo: storage.js, todas las páginas | Pedagógico |
| 6 | Agregar animación de "flecha guía" en primera visita | Layout.jsx, todas las páginas | UX |
| 7 | Reducir opciones de quiz a 3 para niños <4 años | QuizMode.jsx | UX |
| 8 | Agregar "Répète après moi" button en modo explorar | Todas las páginas | Pedagógico |
| 9 | Feedback visual de acierto más espectacular (confeti CSS real) | QuizMode.jsx | Gamificación |
| 10 | Ocultar SpeechButton.jsx y getRandomItems (código muerto) | Limpiar imports | Técnico |

### Fase 2: Medium Impact (1 mes)
**Objetivo:** Nuevas actividades y gamificación básica

| # | Feature | Archivos nuevos/modificados | Prioridad |
|---|---|---|---|
| 1 | **Módulo de clasificación** (arrastrar objetos por color) | Nuevo: Clasificar.jsx, drag-and-drop utils | Alta |
| 2 | **Módulo de formas** (círculo, cuadrado, triángulo) | Nuevo: Formas.jsx, formas.js data | Alta |
| 3 | **Contar animales** (conteo real con objeto por toque) | Nuevo: Contar.jsx | Alta |
| 4 | **Sistema de niveles por sección** (5 niveles de dificultad) | QuizMode.jsx refactor | Alta |
| 5 | **Personaje guía** (oso simpático que acompaña) | Nuevo: Mascot.jsx, mascot SVG | Media |
| 6 | **Sonidos de ambiente** (pop, success, error, click) | sound.js expand | Media |
| 7 | **Panel de padres básico** (progreso + configuración) | Nuevo: Dashboard.jsx, protegido | Media |
| 8 | **Streak diario** (contador de días consecutivos) | storage.js expand | Media |
| 9 | **Modo "solo explorar"** (sin quiz) | Configuración dashboard | Baja |
| 10 | **Idioma configurable** (solo FR, solo ES, o ambos) | Todas las páginas | Baja |

### Fase 3: Major Features (3-6 meses)
**Objetivo:** Plataforma educativa completa alineada al currículo

| # | Feature | Complejidad | Prioridad |
|---|---|---|---|
| 1 | **Sistema de adaptación inteligente** (detectar debilidades, ajustar dificultad) | Alta | **Muy Alta** |
| 2 | **Módulo de motivos organizés** (patrones ABAB, AABBAABB) | Media | **Alta** (currículo 2025) |
| 3 | **Módulo de grandezas** (comparar tamaños, pesos) | Media | Alta |
| 4 | **Vocabulario temático semanal** (animales, aliments, vêtements) | Media | Alta |
| 5 | **Problemas aritméticos** (ajout/retrait con objetos) | Alta | Alta |
| 6 | **Dashboard completo** (gráfico de progreso, recomendaciones, controles) | Alta | Media |
| 7 | **Comptines bilingües** (nursery rhymes con animación) | Media | Media |
| 8 | **Modo offline completo** (Service Worker + cache de assets) | Alta | Media |
| 9 | **Desafío del diario** (pregunta diaria de cada sección) | Baja | Media |
| 10 | **Multi-usuario** (hermanos con perfiles separados) | Alta | Baja |
| 11 | **Tracing / escritura** (trazado de dedo para letras y números) | Muy Alta | Baja (futuro) |
| 12 | **Conciencia fonológica** (identificar sonidos iniciales) | Alta | Baja (futuro) |

---

## 9. Mockups Conceptuales

### 9.1 Pantalla de Inicio (actualizada)

```
┌─────────────────────────────────────────┐
│                                         │
│            ┌─────────┐                  │
│            │    A    │ ← Logo animado   │
│            └─────────┘   con glow       │
│                                         │
│       Apprendre avec                    │
│          ✨ Agus ✨                      │
│                                         │
│    Apprends en français                 │
│       et en espagnol !                  │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  🎨  Couleurs / Colores    →   │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │  🔢  Nombres / Números     →   │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │  🧍  Corps / Cuerpo        →   │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │  📐  Formes / Formas       →   │   │ ← NUEVO
│  └─────────────────────────────────┘   │
│                                         │
│  🔥 Streak: 5 jours!                    │
│                                         │
├─────────────────────────────────────────┤
│ 🏠      🎨      🔢      🧍      📐     │
│ Maison Couleurs Nombres Corps  Formes   │
└─────────────────────────────────────────┘
```

### 9.2 Modo Quiz (actualizado)

```
┌─────────────────────────────────────────┐
│ ← Retour            Question 2/5  ⭐⭐  │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │   Montre-moi le rouge           │   │
│  │   Muéstrame el rojo             │   │
│  └─────────────────────────────────┘   │
│                                         │
│         🔊 Réécouter                    │
│                                         │
│  ┌───────────┐    ┌───────────┐        │
│  │           │    │           │        │
│  │   🔵      │    │   🔴      │        │
│  │  Bleu     │    │  Rouge    │        │
│  │  Azul     │    │  Rojo     │        │
│  └───────────┘    └───────────┘        │
│                                         │
│  ┌───────────┐    ┌───────────┐        │
│  │           │    │           │        │
│  │   🟢      │    │   🟡      │        │
│  │  Vert     │    │  Jaune    │        │
│  │  Verde    │    │  Amarillo │        │
│  └───────────┘    └───────────┘        │
│                                         │
│  (si error → "Essaie encore!" +        │
│   la opción incorrecta se atenúa)      │
└─────────────────────────────────────────┘
```

### 9.3 Pantalla de Clasificación (nueva)

```
┌─────────────────────────────────────────┐
│ ← Retour     Tri par couleur    1/8    │
│                                         │
│     ┌─────┐  ┌─────┐  ┌─────┐         │
│     │ 🔴  │  │ 🔵  │  │ 🟡  │         │
│     │ROUGE│  │BLEU │  │JAUNE│         │
│     └──┬──┘  └──┬──┘  └──┬──┘         │
│        │        │        │              │
│   ┌────┴────┬───┴───┬────┴────┐        │
│   │ Manzana │ Pelota│  Sol    │ ← Cubetas│
│   └─────────┘───────┘─────────┘        │
│                                         │
│  🍎  ⚽  🌞  🍊  🎱  🌙              │
│  (objetos para arrastrar)              │
│                                         │
│  Arrastra cada objeto a su color!       │
└─────────────────────────────────────────┘
```

### 9.4 Panel de Padres (nuevo)

```
┌─────────────────────────────────────────┐
│ 🔒 Tableau de bord parental            │
│                                         │
│ 📊 Résumé de la semaine                 │
│ ┌─────────────────────────────────────┐ │
│ │ Temps total: 45 min (5 sessions)    │ │
│ │ Streak: 🔥 5 jours                  │ │
│ │ Score moyen: 75%                    │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ 📈 Progrès par domaine                  │
│ ┌─────────────────────────────────────┐ │
│ │ 🎨 Couleurs ████████░░ 80%  ↑12%   │ │
│ │ 🔢 Nombres  ██████░░░░ 60%  ↑5%    │ │
│ │ 🧍 Corps    █████████░ 90%  ↑3%    │ │
│ │ 📐 Formes   ██░░░░░░░░ 20%  nouveau │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ⚠️ À travailler                        │
│ • 🔵 Bleu: 37% → Pratiquer!            │
│ • 🔢 Nombre 3: 60% → Réviser!          │
│                                         │
│ ⚙️ Paramètres                           │
│ • Durée max: [15 min ▼]                │
│ • Mode: [Apprendre ▼]                  │
│ • Langue: [FR + ES ▼]                  │
│                                         │
│ 🚪 Fermer le tableau de bord            │
└─────────────────────────────────────────┘
```

---

## 10. Conclusión y Recomendaciones

### Prioridades inmediatas (esta semana)

1. **Corregir bugs UX** (contraste, botón volver, feedback de error)
2. **Agregar persistencia** (localStorage para no perder progreso)
3. **Agregar sonidos de interacción** (pop, success, error)

### Prioridades del mes

1. **Módulo de formas** (alineado al currículo de geometría)
2. **Actividad de clasificación** (arrastrar por color)
3. **Contar animales** (conteo real, no solo dots)
4. **Panel de padres básico** (progreso + configuración)

### Visión a 6 meses

La app debería cubrir **al menos el 60% de los objetivos de Petite Section** en los dominios de lenguaje y matemáticas, con:
- 8-10 secciones de contenido
- Sistema de adaptación inteligente
- Dashboard completo para padres
- Gamificación efectiva (niveles, colecciónables, streaks)
- Soporte offline
- Alineación verificable con el programa Cycle 1

---

*Informe generado por auditoría multidisciplinaria.*
*Referencias: Programme Cycle1 (BO 31/10/2024), Livret d'accompagnement Petite Section, Google Design Guidelines for Kids, Nielsen Norman Group UX for Children.*
