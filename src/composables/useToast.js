import { ref } from 'vue'

const toasts = ref([])
let idCounter = 0

export function useToast() {
  function showToast({ message, type = 'info', duration = 4000 }) {
    const id = ++idCounter
    const toast = { id, message, type }
    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        dismissToast(id)
      }, duration)
    }

    return id
  }

  function dismissToast(id) {
    const idx = toasts.value.findIndex((t) => t.id === id)
    if (idx !== -1) {
      toasts.value.splice(idx, 1)
    }
  }

  function success(message, duration) {
    return showToast({ message, type: 'success', duration })
  }

  function error(message, duration) {
    return showToast({ message, type: 'error', duration })
  }

  function info(message, duration) {
    return showToast({ message, type: 'info', duration })
  }

  return {
    toasts,
    showToast,
    dismissToast,
    success,
    error,
    info,
  }
}
