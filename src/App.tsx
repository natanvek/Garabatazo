import { useEffect, useState } from 'react'
import { ConfigScreen } from './screens/ConfigScreen'
import { GameScreen } from './screens/GameScreen'
import { EndScreen } from './screens/EndScreen'
import { ensureSeedDictionaries } from './lib/seedDictionaries'
import { db, type Dictionary } from './lib/db'
import type { GameConfig } from './types'

type Screen = 'config' | 'game' | 'end'

export default function App() {
  const [screen, setScreen] = useState<Screen>('config')
  const [dictionary, setDictionary] = useState<Dictionary | null>(null)
  const [config, setConfig] = useState<GameConfig | null>(null)
  const [sequence, setSequence] = useState<string[]>([])

  useEffect(() => {
    ensureSeedDictionaries().then(async () => {
      const dict = await db.dictionaries.where('language').equals('es').first()
      setDictionary(dict ?? null)
    })
  }, [])

  function startGame(cfg: GameConfig) {
    if (!dictionary) return
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
      {screen === 'config' && <ConfigScreen onStart={startGame} />}
      {screen === 'game' && config && (
        <GameScreen
          sequence={sequence}
          frequencySeconds={config.frequencySeconds}
          onFinish={() => setScreen('end')}
        />
      )}
      {screen === 'end' && <EndScreen sequence={sequence} onRestart={() => setScreen('config')} />}
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
