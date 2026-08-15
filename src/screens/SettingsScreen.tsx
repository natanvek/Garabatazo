import { useState } from 'react'
import type { GameConfig } from '../types'
import { loadConfig, saveConfig } from '../lib/gameConfig'

export function SettingsScreen({ onBack }: { onBack: () => void }) {
  const [config, setConfig] = useState<GameConfig>(loadConfig)
  // Tracked as raw text, separate from the numeric config: feeding a
  // Number(...)-rounded value straight back into `value` on every keystroke
  // strips an in-progress "2." down to "2", making decimals untypeable.
  const [cellCountText, setCellCountText] = useState(() => String(config.cellCount))
  const [frequencyText, setFrequencyText] = useState(() => String(config.frequencySeconds))

  function update(patch: Partial<GameConfig>) {
    const next = { ...config, ...patch }
    setConfig(next)
    saveConfig(next)
  }

  function handleCellCountChange(raw: string) {
    setCellCountText(raw)
    const parsed = Number(raw)
    if (raw !== '' && Number.isFinite(parsed)) update({ cellCount: parsed })
  }

  function handleFrequencyChange(raw: string) {
    setFrequencyText(raw)
    const parsed = Number(raw)
    if (raw !== '' && Number.isFinite(parsed)) update({ frequencySeconds: parsed })
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
          value={cellCountText}
          onChange={(e) => handleCellCountChange(e.target.value)}
          className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2"
        />
      </div>

      <div className="mb-4 text-left">
        <label className="mb-1 block text-sm text-neutral-400" htmlFor="frequency">
          Frecuencia (segundos entre palabras)
        </label>
        <input
          id="frequency"
          type="text"
          inputMode="decimal"
          value={frequencyText}
          onChange={(e) => handleFrequencyChange(e.target.value)}
          className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2"
        />
      </div>

      <div className="mb-4 flex items-center justify-between text-left">
        <label className="text-sm text-neutral-400" htmlFor="voiceEnabled">
          Leer palabras en voz alta
        </label>
        <input
          id="voiceEnabled"
          type="checkbox"
          checked={config.voiceEnabled}
          onChange={(e) => update({ voiceEnabled: e.target.checked })}
          className="h-5 w-5 accent-green-600"
        />
      </div>

      <button
        onClick={onBack}
        className="mt-2 rounded-md bg-neutral-700 px-6 py-3 font-medium hover:bg-neutral-600"
      >
        Volver
      </button>
    </div>
  )
}
