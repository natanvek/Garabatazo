import { db } from './db'
import { ES_COMMON_WORDS } from './dictionaries/es-common'

export async function ensureSeedDictionaries() {
  const builtIns = await db.dictionaries.filter((d) => d.isBuiltIn).count()
  if (builtIns > 0) return

  await db.dictionaries.add({
    name: 'Español (común)',
    language: 'es',
    isBuiltIn: true,
    words: ES_COMMON_WORDS,
  })
}
