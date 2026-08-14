import { useEffect, useState } from 'react'

interface Props {
  sequence: string[]
  frequencySeconds: number
  onFinish: () => void
}

export function GameScreen({ sequence, frequencySeconds, onFinish }: Props) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index >= sequence.length) {
      onFinish()
      return
    }
    const timer = setTimeout(() => setIndex((i) => i + 1), frequencySeconds * 1000)
    return () => clearTimeout(timer)
  }, [index, sequence.length, frequencySeconds, onFinish])

  const current = sequence[index]

  return (
    <div className="text-center">
      <div className="flex h-24 items-center justify-center text-6xl font-bold">{current}</div>
      <div className="mt-5 text-neutral-500">
        {Math.min(index + 1, sequence.length)} / {sequence.length}
      </div>
    </div>
  )
}
