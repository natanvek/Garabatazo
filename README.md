# Garabatazo

A fast-paced drawing-and-memory party game. Words flash on screen one at a
time; each player races to sketch every word into a numbered cell on a
physical grid sheet (32 cells by default). Once all the words have appeared,
players write down what each of their own drawings represents — whoever
recalls the most cells with the exact correct word wins.

Because players have to *draw* each word under time pressure, the dictionary
is restricted to concrete, easily-drawable nouns. See
[`docs/GAME_DESIGN.md`](docs/GAME_DESIGN.md) for the full rules and why that
constraint matters.

## Stack

React + TypeScript + Vite + Tailwind CSS + Dexie (IndexedDB), chosen
specifically to be easy for AI coding tools to work in correctly. Full
rationale in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Getting started

```
npm install
npm run dev      # start dev server
npm run build    # typecheck + production build
npm test         # run unit tests
```

## Docs

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — stack choices and
  rationale, folder structure, data model
- [`docs/GAME_DESIGN.md`](docs/GAME_DESIGN.md) — how the game is played, and
  the constraints that follow from it
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — phased plan for dictionaries,
  voice, mobile stores, and monetization
