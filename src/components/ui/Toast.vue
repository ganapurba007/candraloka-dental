<script setup>
import { useToast } from '@/composables/useToast'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-vue-next'

const { toasts, dismissToast } = useToast()

function getIcon(type) {
  switch (type) {
    case 'success':
      return CheckCircle2
    case 'error':
      return AlertCircle
    case 'warning':
      return AlertCircle
    case 'info':
    default:
      return Info
  }
}

function getTypeClasses(type) {
  switch (type) {
    case 'success':
      return 'bg-emerald-900/90 text-white border-emerald-700/50'
    case 'error':
      return 'bg-rose-900/90 text-white border-rose-700/50'
    case 'warning':
      return 'bg-amber-900/90 text-white border-amber-700/50'
    case 'info':
    default:
      return 'bg-slate-900/90 text-white border-slate-700/50'
  }
}
</script>

<template>
  <div
    class="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    role="region"
    aria-label="Notifikasi"
  >
    <TransitionGroup
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        role="status"
        aria-live="polite"
        :class="[
          'pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm text-sm',
          getTypeClasses(toast.type),
        ]"
      >
        <div class="flex items-center gap-3">
          <component :is="getIcon(toast.type)" class="w-5 h-5 flex-shrink-0" aria-hidden="true" />
          <span class="font-medium leading-snug">{{ toast.message }}</span>
        </div>
        <button
          type="button"
          class="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none"
          aria-label="Tutup notifikasi"
          @click="dismissToast(toast.id)"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
