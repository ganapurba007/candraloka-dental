import { ref, onMounted, onUnmounted } from 'vue'

export function useInView(options = { threshold: 0.1, once: true }) {
  const targetRef = ref(null)
  const isInView = ref(false)
  let observer = null

  onMounted(() => {
    if (!targetRef.value || typeof IntersectionObserver === 'undefined') {
      isInView.value = true
      return
    }

    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isInView.value = true
        if (options.once && observer) {
          observer.disconnect()
        }
      } else if (!options.once) {
        isInView.value = false
      }
    }, options)

    observer.observe(targetRef.value)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return { targetRef, isInView }
}
