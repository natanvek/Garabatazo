# Game design

## How it's played

1. Each player has a piece of paper ruled into a grid — 32 cells by default,
   but the count is configurable.
2. Words appear on screen one at a time, fairly quickly (interval
   configurable, default 2.8s).
3. As each word appears, every player races to draw it in the next empty
   cell on their sheet. No labels, no letters — just a doodle standing in
   for the word.
4. Once all words have been shown, players go back over their own grid and
   write, cell by cell, what word they believe each drawing represents.
5. Whoever writes down the most cells with the *exact* correct word wins.

## What the app is responsible for

The app is the "caller": it holds the word list, shuffles it, and reveals
words one at a time at a configurable pace. The drawing, the recall/writing
phase, and the scoring all currently happen on paper, off-screen — the app's
end screen just reveals the answer key (the exact sequence shown) so players
can grade themselves. Digitizing that scoring step (e.g. photographing grids,
self-entry of guesses) is a possible future feature but explicitly out of
scope for now — see `ROADMAP.md`.

## Why word choice matters

Because the entire loop hinges on players being able to sketch a word fast
enough to recognize it later, **dictionary words need a widely-known, simple
visual shorthand**. That's a bar of *word familiarity*, not literal
concreteness — "corazón" (heart) and "eclipse" both work fine because
everyone immediately knows a simple symbol for them (♥, a sun/moon overlap).
What actually breaks the game is **obscure or uncommon vocabulary** —
"zarigüeya" (opossum), "tapete", "biombo" (folding screen) — words a chunk
of players won't even recognize once spoken, let alone draw or write back
correctly.

This is a first-class constraint on the dictionary system, not just a
content-curation afterthought:

- Built-in dictionaries are reviewed for word familiarity (`es-common`'s
  first pass tracked in `ROADMAP.md`; ~25 obscure entries removed).
- The dictionary editor (personalized dictionaries) should nudge users
  toward common, everyday words — at minimum through guidance text.

See [`DICTIONARY_GUIDELINES.md`](DICTIONARY_GUIDELINES.md) for the concrete
checklist, red flags, and strategies used to curate and extend word lists.
