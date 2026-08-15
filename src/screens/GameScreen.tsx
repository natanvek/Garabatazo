import { useEffect, useState } from 'react'
import { speak, stopSpeaking } from '../lib/tts'

interface Props {
  sequence: string[]
  frequencySeconds: number
  language: string
  voiceEnabled: boolean
  onFinish: (shown: string[]) => void
  onCancel: () => void
}

const READY_SECONDS = 3
// TTS engines take a moment to start audio after speak() is called, so we
// fire it this far ahead of the visual switch to keep voice and word in sync.
const SPEECH_LEAD_MS = 250

export function GameScreen({ sequence, frequencySeconds, language, voiceEnabled, onFinish, onCancel }: Props) {
  const [countdown, setCountdown] = useState(READY_SECONDS)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  // Borrow lead time from the countdown's last second so word 0 gets the
  // same head start as every other word.
  useEffect(() => {
    if (!voiceEnabled || countdown !== 1 || !sequence[0]) return
    const timer = setTimeout(() => speak(sequence[0], language), 1000 - SPEECH_LEAD_MS)
    return () => clearTimeout(timer)
  }, [countdown, sequence, language, voiceEnabled])

  useEffect(() => {
    if (countdown > 0) return
    if (index >= sequence.length) {
      onFinish(sequence)
      return
    }

    const intervalMs = frequencySeconds * 1000
    const leadMs = Math.min(SPEECH_LEAD_MS, intervalMs / 2)

    const advanceTimer = setTimeout(() => setIndex((i) => i + 1), intervalMs)
    const speakNextTimer = voiceEnabled
      ? setTimeout(() => {
          const next = sequence[index + 1]
          if (next) speak(next, language)
        }, intervalMs - leadMs)
      : undefined

    return () => {
      clearTimeout(advanceTimer)
      clearTimeout(speakNextTimer)
    }
  }, [countdown, index, sequence, frequencySeconds, language, voiceEnabled, onFinish])

  useEffect(() => stopSpeaking, [])

  function handleStop() {
    if (countdown > 0) {
      onCancel()
    } else {
      onFinish(sequence.slice(0, index + 1))
    }
  }

  if (countdown > 0) {
    return (
      <div className="text-center">
        <div className="flex h-24 items-center justify-center text-6xl font-bold">{countdown}</div>
        <div className="mt-5 text-neutral-500">Prepárate...</div>
        <StopButton onClick={handleStop} />
      </div>
    )
  }

  const current = sequence[index]

  return (
    <div className="text-center">
      <div className="flex h-24 items-center justify-center text-6xl font-bold">{current}</div>
      <div className="mt-5 text-neutral-500">
        {Math.min(index + 1, sequence.length)} / {sequence.length}
      </div>
      <StopButton onClick={handleStop} />
    </div>
  )
}

function StopButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-8 rounded-md bg-neutral-700 px-5 py-2.5 text-neutral-200 hover:bg-neutral-600"
    >
      Detener
    </button>
  )
}
