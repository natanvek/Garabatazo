# Game design

## How it's played

1. Each player has a piece of paper ruled into a grid — 32 cells by default,
   but the count is configurable.
2. Words appear on screen one at a time, fairly quickly (interval
   configurable, default 1.5s).
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
enough to recognize it later, **dictionary words must be concrete and
drawable** — physical objects, animals, simple scenes. Abstract nouns,
emotions, and phenomena that don't reduce to a simple doodle (e.g.
"corazón"/heart as a concept, "eclipse", "constelación") work poorly and
should be avoided or flagged.

This is a first-class constraint on the dictionary system, not just a
content-curation afterthought:

- Built-in dictionaries should eventually be reviewed word-by-word for
  drawability (tracked in `ROADMAP.md`).
- The dictionary editor (personalized dictionaries) should nudge users
  toward concrete nouns — at minimum through guidance text, potentially
  through a "drawability" flag or filter later on.
