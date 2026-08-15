# Roadmap

## Phase 1 — Foundation (this scaffold)

- [x] Migrate off the single-file prototype to React + TypeScript + Vite +
      Tailwind + Dexie.
- [x] Port the Config → Game → End loop with cell-grid terminology (default
      32 cells).
- [x] Seed a built-in Spanish dictionary (`es-common`), ported as-is from
      the prototype's word list.
- [x] Curate `es-common` for drawability — removed ~25 obscure/uncommon
      words (e.g. "zarigüeya", "tapete", "biombo", "wok", "tundra"). The bar
      is word familiarity, not literal concreteness — "corazón" and
      "eclipse" stayed since they have simple, iconic, widely-recognized
      symbols. See `docs/GAME_DESIGN.md`.

## Phase 2 — Dictionaries

- [ ] Dictionary editor UI: create/edit/delete personalized dictionaries.
- [ ] Multi-language support: add English (and others) as built-in
      dictionaries; language becomes a first-class selector in Config.
- [ ] UI translation via i18next once a second UI language is needed
      (distinct from dictionary language).
- [ ] Guidance/validation nudging users toward common, drawable words when
      authoring personalized dictionaries — see `docs/DICTIONARY_GUIDELINES.md`.

## Phase 3 — Voice

- [x] Read each word aloud as it appears, via the browser's Web Speech API
      (`src/lib/tts.ts`), matching the dictionary's language.
- [ ] Swap in `@capacitor-community/text-to-speech` once wrapped natively —
      iOS webview `SpeechSynthesis` support is inconsistent.
- [x] Voice on/off toggle, in Config, persisted like the other settings.

## Phase 4 — Mobile stores

- [ ] Wrap with Capacitor, test on Android and iOS.
- [ ] Publish to Google Play and the App Store.

## Phase 5 — Monetization

- [ ] Integrate `@capacitor-community/admob` once there's traction.

## Under consideration (not committed)

- Digitizing the drawing/recall/scoring steps (currently done on paper) —
  e.g. photographing grids, in-app self-entry of guesses and scoring. See
  `docs/GAME_DESIGN.md`, "What the app is responsible for".
