import { db } from './db'
import { ES_COMMON_WORDS } from './dictionaries/es-common'

const BUILT_IN_DICTIONARIES = [{ name: 'Español (común)', language: 'es', words: ES_COMMON_WORDS }]

// Built-in dictionaries are code, not user data — keep the stored copy in
// sync with source on every load instead of seeding once, so word-list
// edits reach users who already have one cached in IndexedDB.
export async function ensureSeedDictionaries() {
  for (const builtIn of BUILT_IN_DICTIONARIES) {
    const existing = await db.dictionaries
      .where('language')
      .equals(builtIn.language)
      .filter((d) => d.isBuiltIn)
      .first()

    if (existing?.id !== undefined) {
      await db.dictionaries.update(existing.id, { name: builtIn.name, words: builtIn.words })
    } else {
      await db.dictionaries.add({ ...builtIn, isBuiltIn: true })
    }
  }
}
