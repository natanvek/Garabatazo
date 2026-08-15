# Architecture

## Stack and why

The project is intended to be built (and maintained) almost entirely by AI
coding assistants. That's the deciding factor behind every choice below,
ahead of the usual "best tool for the job" reasoning: prefer stacks with the
largest training-data footprint, the most stable/current APIs, and the
clearest, most complete documentation — because that's what makes AI-written
code reliably correct.

- **React + TypeScript** — by far the largest training corpus and most
  consistent conventions of any frontend framework. TypeScript matters
  specifically for AI-authored code: type errors catch hallucinated
  props/APIs before they become runtime bugs.
- **Vite** — standard build tool, extremely well documented, first-class
  Capacitor support for when we wrap this as a mobile app.
- **Tailwind CSS** instead of hand-written CSS — the most common styling
  approach in AI-generated frontend code today, keeps styling co-located
  with markup so it can't silently drift out of sync.
- **Dexie** (IndexedDB wrapper) for storing dictionaries — more popular and
  better documented than lower-level alternatives, typed, promise-based,
  well-known query patterns.
- **Vitest + React Testing Library** — standard pairing with Vite + React,
  gives an AI-coded project a way to self-verify changes instead of relying
  on manual QA every time.

Deliberately avoided: bleeding-edge or niche frameworks (Svelte 5 runes,
Solid, Qwik) — thin/fragmented documentation and frequent breaking API
changes tend to produce mixed old/new syntax in AI-generated code.

Planned, not yet wired in (see `ROADMAP.md` for when):

- **Capacitor** — wraps the web app for Google Play / App Store distribution
  without a rewrite.
- **i18next** — de facto standard for UI translation strings, large number
  of React integration examples (`react-i18next`). Deferred until a second
  UI language is actually needed (currently Spanish-only).
- **`@capacitor-community/text-to-speech`** — voice-over for words, falling
  back to the browser's Web Speech API (`SpeechSynthesis`) when running as a
  plain web app.
- **`@capacitor-community/admob`** — ad monetization, deferred until there's
  traction.

## Data model

```ts
interface Dictionary {
  id?: number
  name: string
  language: string   // ISO code: "es", "en", ...
  isBuiltIn: boolean
  words: string[]
}
```

Stored in IndexedDB via Dexie (`src/lib/db.ts`). Note: `isBuiltIn` is
deliberately *not* part of the Dexie index — IndexedDB key paths can't be
boolean, so built-in dictionaries are found with `.filter()` in JS rather
than `.where(...).equals(...)`.

Personalized/custom dictionaries (user-authored, per-player) will reuse this
same shape with `isBuiltIn: false` once the dictionary editor ships.

## Folder structure

```
src/
  App.tsx              screen state machine (start/settings/game/end)
  main.tsx             entry point
  types.ts             shared types (GameConfig, ...)
  screens/
    StartScreen.tsx     big "Comenzar" button + settings (⚙) entry point
    SettingsScreen.tsx  cell count, frequency, voice toggle
    GameScreen.tsx      reveals words on a timer; Stop ends early
    EndScreen.tsx       answer key / restart
  lib/
    db.ts                Dexie database + Dictionary type
    gameConfig.ts         load/save GameConfig to localStorage
    seedDictionaries.ts   keeps built-in dictionaries in sync with source
    tts.ts                Web Speech API wrapper
    dictionaries/
      es-common.ts        built-in Spanish word list, curated — see
                           DICTIONARY_GUIDELINES.md
  test/
    setup.ts              jest-dom matchers for Vitest
docs/
  ARCHITECTURE.md            (this file)
  GAME_DESIGN.md              game rules and constraints they imply
  DICTIONARY_GUIDELINES.md    what makes a word good or bad
  ROADMAP.md                  phased plan
```

## Current state vs. original prototype

The original single-file prototype (`git log` — "Add word-frequency reading
game") had the same core loop: configure count + frequency, reveal words on
a timer, show an answer key at the end. This scaffold reimplements that
exact loop in the new stack (cell count default changed from 20 to 32 to
match the grid-paper default) as the foundation the rest of the roadmap
builds on.
