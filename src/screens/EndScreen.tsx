import { useState } from 'react'
import { GearIcon } from '../components/GearIcon'

interface Props {
  sequence: string[]
  onRestart: () => void
  onOpenSettings: () => void
}

export function EndScreen({ sequence, onRestart, onOpenSettings }: Props) {
  const [showList, setShowList] = useState(false)

  return (
    <div className="relative w-full max-w-lg px-4 text-center">
      <button
        onClick={onOpenSettings}
        aria-label="Configuración"
        className="absolute right-4 top-0 rounded-full p-2 text-neutral-400 transition hover:bg-neutral-800 hover:text-neutral-100"
      >
        <GearIcon className="h-6 w-6" />
      </button>

      <h1 className="mb-6 text-xl font-semibold">Fin de la partida</h1>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setShowList((v) => !v)}
          className="rounded-md bg-neutral-700 px-5 py-2.5 hover:bg-neutral-600"
        >
          {showList ? 'Ocultar palabras mostradas' : 'Ver palabras mostradas'}
        </button>
        <button
          onClick={onRestart}
          className="rounded-md bg-green-600 px-5 py-2.5 hover:bg-green-700"
        >
          Jugar de nuevo
        </button>
      </div>

      {showList && (
        <ol className="mt-5 columns-2 rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-left max-h-[50vh] overflow-y-auto">
          {sequence.map((word, i) => (
            <li key={i} className="py-0.5">
              {word}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
