# Dictionary word guidelines

Reference for curating built-in dictionaries and validating personalized
ones — for humans and for AI-assisted curation alike. See
`GAME_DESIGN.md` for why word choice matters in the first place.

## The core rule

The bar is **word familiarity**, not literal concreteness. A word is good
if most players would (a) recognize it the instant it's read aloud and (b)
land on roughly the same simple picture for it. That's why "corazón" and
"eclipse" are fine — both have one obvious, iconic, universally-known
symbol (♥; a sun/moon overlap) — while "zarigüeya" or "tapete" aren't,
regardless of how "concrete" an opossum or a rug technically is.

## A good word passes all of these

1. **Everyday vocabulary.** A kid or a non-specialist adult recognizes it
   immediately, with no regional, technical, or rare terms.
2. **One dominant visual shorthand.** Most people would draw roughly the
   same picture. If ten random players would draw ten unrelated things,
   it's a bad word — this is what actually disqualifies most "abstract"
   nouns, not abstractness itself.
3. **One common meaning.** Avoid words whose most common everyday sense is
   ambiguous (e.g. "colonia" — cologne vs. neighborhood).
4. **Quick to sketch.** Nothing that needs intricate detail to be
   recognizable — matters more at fast reveal frequencies.
5. **Pronounced correctly by the text-to-speech voice.** Every word gets
   read aloud (see `ROADMAP.md`, Phase 3), so a word the TTS engine
   mangles — commonly foreign loanwords like "iceberg" — is confusing even
   if the word itself is otherwise perfectly familiar. Check by ear, not
   just on paper.

## Red flags — double-check before including

- **Foreign loanwords**, even common ones — they're the words most likely
  to come out wrong from the Spanish TTS voice ("iceberg" was removed for
  exactly this).
- **Regional/dialectal words** that are common in one Spanish-speaking
  country and obscure in another.
- **Narrow technical variants** of something a more common umbrella word
  already covers (e.g. a specific appliance sub-type), when the variant
  itself isn't independently iconic.
- **Near-duplicate synonyms** of a word already in the dictionary — not
  forbidden, but worth a second look; duplicates dilute variety without
  adding anything.
- **Pure abstractions with no simple universal symbol** — feelings like
  "envidia," concepts like "libertad." This is the real dividing line from
  words like "corazón"/"eclipse," which *are* abstract-ish but do have an
  iconic symbol.

## Worked examples

| Word | Verdict | Why |
|---|---|---|
| corazón | good | universally known ♥ symbol |
| eclipse | good | iconic sun/moon-overlap image |
| guitarra | good | common, single unambiguous shape |
| zarigüeya | bad | obscure animal name |
| tapete | bad | uncommon/regional word for something "alfombra" already covers |
| temporizador | bad | abstract technical term, redundant with "cronómetro" |
| colonia | bad | ambiguous — most readers think "neighborhood," not "cologne" |
| libertad *(hypothetical)* | bad | pure abstraction, no simple symbol |
| iceberg | bad | Spanish TTS voices mispronounce this loanword |

## Strategies for extending the list

1. **Brainstorm by category, not at random.** The current list is already
   organized around real-world domains — home/furniture, kitchen,
   bathroom, clothing, body parts, animals by habitat, food/produce,
   vehicles, school/office supplies, tools, nature/weather/geography, sea
   life, insects. Filling gaps within an existing category finds better
   candidates than free-associating new words.
2. **Borrow from children's/early-reader vocabulary lists.** Words taught
   to kids learning to read are, almost by definition, common and
   concrete — a solid proxy for "everyone knows this."
3. **Cross-check against word-frequency lists.** A candidate that shows up
   as low-frequency in a Spanish frequency corpus is very likely one of
   the obscure ones, even if it doesn't "feel" rare in isolation.
4. **Let real play sessions correct the list.** Once there's any way to
   notice it (even informally), a word that repeatedly gets misdrawn or
   unguessed is a removal candidate — regardless of how reasonable it
   seemed on paper.
5. **For future non-Spanish dictionaries: check translatability.** A word
   that doesn't map to one common word in the target language is often a
   sign it's narrower or more regional than assumed — worth a second look
   even in the source list.
6. **When genuinely borderline, ask a human rather than guess.** That's
   how the current `es-common` pass handled cases like "wok," "bidé," and
   "géiser" — flag them, don't silently decide.
