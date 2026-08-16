# Agus App

**"Apprendre avec Agus"** — Because apparently the iPad needed another app for a 4-year-old.

---

## What is this?

A bilingual (French/Spanish) educational app designed for one very specific child named Agus, who is 4 years old and attending Maternelle in France. It teaches colors, numbers, body parts, shapes, counting, and color classification — through interactive quizzes and a bear mascot that won't stop talking.

If your name isn't Agus, you can still use it. We don't judge.

## Features

- **Bilingual TTS** — Speaks French first, then Spanish, because why learn one language when you can traumatize a child with two
- **Interactive SVG body** — Tap on body parts to hear their names. Very educational. Slightly unsettling out of context.
- **Quiz mode** — Shuffle questions, reward correct answers with confetti, punish wrong ones with a sad sound
- **Progress tracking** — localStorage, because a 4-year-old doesn't have a database
- **Streak counter** — Daily streaks. We're building habits early.
- **Parent dashboard** — Hidden behind 5 secret taps on the logo. Because toddlers will tap anything.
- **Sound effects** — All synthesized with Web Audio API. No external assets. Very professional beeps.
- **Zero backend** — No servers were harmed in the making of this app

## Tech Stack

| Tech | Why |
|------|-----|
| React 18 | Because Vue is for quitters |
| Vite | Fast builds, unlike npm scripts |
| Tailwind CSS | Utility classes > writing CSS like it's 2012 |
| Web Speech API | Free TTS, no API keys needed |
| Web Audio API | Synthesizing sounds with oscillators, like a real musician |
| localStorage | Where data goes to live forever |

## Getting Started

```bash
# Install dependencies
make install

# Start dev server
make start

# Build for production
make build

# Stop the dev server
make stop

# Lint (if you dare)
make lint

# Format code (pretend we care about style)
make format
```

Or if you prefer the old ways:

```bash
npm install
npm run dev
```

## Project Structure

```
agus-app/
├── src/
│   ├── components/     # React components that actually work
│   ├── pages/          # 7 pages of educational bliss
│   ├── data/           # Colors, numbers, animals, shapes, body parts
│   ├── utils/          # Speech, sounds, storage, and a shuffle function
│   └── App.jsx         # The one file that holds it all together
├── public/             # Just a favicon, nothing to see here
├── Makefile            # Because we're civilized developers
└── package.json        # Where dependencies go to bloat your node_modules
```

## The Mascot

A bear. It has a speech bubble. It says things in French and Spanish. That's all you need to know.

## Hidden Features

- Tap the logo 5 times fast → Parent dashboard appears
- The mascot gets excited if you get a perfect score
- Confetti explodes if you finish a quiz perfectly
- Daily streaks are tracked (your 4-year-old now has more discipline than you)

## License

MIT — Do whatever you want. Just don't break Agus's learning streak.
