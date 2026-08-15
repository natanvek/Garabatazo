import type { GameConfig } from '../types'

const STORAGE_KEY = 'garabatazo-config'
const DEFAULT_CONFIG: GameConfig = { cellCount: 32, frequencySeconds: 2.8, voiceEnabled: true }

export function loadConfig(): GameConfig {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (saved) return { ...DEFAULT_CONFIG, ...saved }
  } catch {
    // ignore malformed storage
  }
  return DEFAULT_CONFIG
}

export function saveConfig(config: GameConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
}
