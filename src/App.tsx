import { useEffect, useState } from 'react'
import { StartScreen } from './screens/StartScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import { GameScreen } from './screens/GameScreen'
import { EndScreen } from './screens/EndScreen'
import { ensureSeedDictionaries } from './lib/seedDictionaries'
import { loadConfig, saveConfig } from './lib/gameConfig'
import { db, type Dictionary } from './lib/db'
import type { GameConfig } from './types'

type Screen = 'start' | 'settings' | 'game' | 'end'
type SettingsOrigin = 'start' | 'end'

export default function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [settingsOrigin, setSettingsOrigin] = useState<SettingsOrigin>('start')
  const [dictionary, setDictionary] = useState<Dictionary | null>(null)
  const [config, setConfig] = useState<GameConfig | null>(null)
  const [sequence, setSequence] = useState<string[]>([])

  useEffect(() => {
    ensureSeedDictionaries().then(async () => {
      const dict = await db.dictionaries.where('language').equals('es').first()
      setDictionary(dict ?? null)
    })
  }, [])

  function openSettings(origin: SettingsOrigin) {
    setSettingsOrigin(origin)
    setScreen('settings')
  }

  function toggleVoiceEnabled() {
    setConfig((prev) => {
      if (!prev) return prev
      const next = { ...prev, voiceEnabled: !prev.voiceEnabled }
      saveConfig(next)
      return next
    })
  }

  function startGame() {
    if (!dictionary) return
    const cfg = loadConfig()
    const count = Math.min(cfg.cellCount, dictionary.words.length)
    setSequence(shuffle(dictionary.words).slice(0, count))
    setConfig(cfg)
    setScreen('game')
  }

  if (!dictionary) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-900 text-neutral-300">
        Cargando...
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 text-neutral-100">
      {screen === 'start' && (
        <StartScreen onStart={startGame} onOpenSettings={() => openSettings('start')} />
      )}
      {screen === 'settings' && <SettingsScreen onBack={() => setScreen(settingsOrigin)} />}
      {screen === 'game' && config && (
        <GameScreen
          sequence={sequence}
          frequencySeconds={config.frequencySeconds}
          language={dictionary.language}
          voiceEnabled={config.voiceEnabled}
          onToggleVoiceEnabled={toggleVoiceEnabled}
          onFinish={(shown) => {
            setSequence(shown)
            setScreen('end')
          }}
          onCancel={() => setScreen('start')}
        />
      )}
      {screen === 'end' && (
        <EndScreen sequence={sequence} onRestart={startGame} onOpenSettings={() => openSettings('end')} />
      )}
    </div>
  )
}

function shuffle<T>(array: T[]): T[] {
  const a = array.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
