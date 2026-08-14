import { useState } from 'react'

export function EndScreen({ sequence, onRestart }: { sequence: string[]; onRestart: () => void }) {
  const [showList, setShowList] = useState(false)

  return (
    <div className="w-full max-w-lg px-4 text-center">
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
