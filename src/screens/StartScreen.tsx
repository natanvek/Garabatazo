import { Logo } from '../components/Logo'
import { GearIcon } from '../components/GearIcon'

interface Props {
  onStart: () => void
  onOpenSettings: () => void
}

export function StartScreen({ onStart, onOpenSettings }: Props) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden p-5 text-center">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-72 w-72 rounded-full bg-gradient-to-br from-rose-500/20 via-orange-500/20 to-amber-400/20 blur-3xl" />
      </div>

      <button
        onClick={onOpenSettings}
        aria-label="Configuración"
        className="absolute right-4 top-4 z-10 rounded-full p-2 text-neutral-400 transition hover:bg-neutral-800 hover:text-neutral-100"
      >
        <GearIcon className="h-6 w-6" />
      </button>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <Logo className="h-24 w-24 drop-shadow-lg" />

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Garabatazo</h1>
          <p className="mt-2 text-sm text-neutral-400">Dibuja rápido, recuerda mejor</p>
        </div>

        <button
          onClick={onStart}
          className="rounded-full bg-green-600 px-14 py-7 text-2xl font-semibold shadow-lg shadow-green-600/20 transition hover:scale-105 hover:bg-green-700"
        >
          Comenzar
        </button>
      </div>
    </div>
  )
}
