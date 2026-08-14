import { useState } from 'react'
import type { GameConfig } from '../types'

const STORAGE_KEY = 'garabatazo-config'

function loadConfig(): GameConfig {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (saved) return saved
  } catch {
    // ignore malformed storage
  }
  return { cellCount: 32, frequencySeconds: 1.5 }
}

export function ConfigScreen({ onStart }: { onStart: (config: GameConfig) => void }) {
  const [config, setConfig] = useState<GameConfig>(loadConfig)

  function handleStart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
    onStart(config)
  }

  return (
    <div className="w-full max-w-sm p-5 text-center">
      <h1 className="mb-6 text-xl font-semibold">Configuración</h1>

      <div className="mb-4 text-left">
        <label className="mb-1 block text-sm text-neutral-400" htmlFor="cellCount">
          Número de casillas
        </label>
        <input
          id="cellCount"
          type="number"
          min={1}
          value={config.cellCount}
          onChange={(e) => setConfig({ ...config, cellCount: Number(e.target.value) })}
          className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2"
        />
      </div>

      <div className="mb-4 text-left">
        <label className="mb-1 block text-sm text-neutral-400" htmlFor="frequency">
          Frecuencia (segundos entre palabras)
        </label>
        <input
          id="frequency"
          type="number"
          min={0.1}
          step={0.1}
          value={config.frequencySeconds}
          onChange={(e) => setConfig({ ...config, frequencySeconds: Number(e.target.value) })}
          className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2"
        />
      </div>

      <button
        onClick={handleStart}
        className="mt-2 rounded-md bg-green-600 px-6 py-3 font-medium hover:bg-green-700"
      >
        Comenzar
      </button>
    </div>
  )
}
