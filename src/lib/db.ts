import Dexie, { type Table } from 'dexie'

export interface Dictionary {
  id?: number
  name: string
  language: string
  isBuiltIn: boolean
  words: string[]
}

export class GarabatazoDB extends Dexie {
  dictionaries!: Table<Dictionary, number>

  constructor() {
    super('garabatazo')
    // isBuiltIn is intentionally not indexed: IndexedDB key paths can't be
    // boolean, so it's filtered in JS instead of queried via .where().
    this.version(1).stores({
      dictionaries: '++id, name, language',
    })
  }
}

export const db = new GarabatazoDB()
