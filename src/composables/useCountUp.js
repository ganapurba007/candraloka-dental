import { ref, watch } from 'vue'

export function useCountUp(targetNumber, isTriggeredRef, duration = 1500) {
  const displayValue = ref(0)
  let animationFrameId = null

  function startAnimation() {
    // Check prefers-reduced-motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      displayValue.value = targetNumber
      return
    }

    const startTime = performance.now()
    const startVal = 0
    const endVal = targetNumber

    function easeOutQuad(t) {
      return t * (2 - t)
    }

    function animate(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutQuad(progress)

      displayValue.value = Math.floor(startVal + (endVal - startVal) * eased)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        displayValue.value = endVal
      }
    }

    animationFrameId = requestAnimationFrame(animate)
  }

  watch(
    () => isTriggeredRef.value,
    (triggered) => {
      if (triggered) {
        startAnimation()
      }
    },
    { immediate: true }
  )

  return { displayValue }
}
