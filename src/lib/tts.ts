export function speak(text: string, lang: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

  const synth = window.speechSynthesis
  // Only cancel if something's actually queued/playing. Calling cancel()
  // right before speak() when nothing was speaking can make some browsers
  // (Chrome, notably on a cold page load) silently drop the new utterance.
  if (synth.speaking || synth.pending) synth.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
  synth.speak(utterance)
}

export function stopSpeaking() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
}

// Voice lists load asynchronously in some browsers, so the speech engine
// isn't fully ready right after page load. Calling this as early as
// possible (the game screen mounts, ~3s before the first word needs to be
// spoken) gives it time to initialize and avoids dropped audio on cold starts.
export function primeSpeech() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.getVoices()
}
