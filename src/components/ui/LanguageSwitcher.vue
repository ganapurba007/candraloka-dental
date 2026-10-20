<script setup>
import { Globe } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const props = defineProps({
  variant: {
    type: String,
    default: 'light', // 'light' (on white/light bg) | 'dark' (on navy/dark bg)
  },
  size: {
    type: String,
    default: 'sm', // 'xs' | 'sm' | 'md'
  },
})

const { locale, setLocale } = useI18n()
</script>

<template>
  <div
    role="group"
    :aria-label="locale === 'id' ? 'Pilih Bahasa' : 'Select Language'"
    :class="[
      'inline-flex items-center rounded-lg p-0.5 transition-all select-none',
      variant === 'dark'
        ? 'bg-navy-800/80 border border-navy-700/60 text-slate-300'
        : 'bg-slate-100 border border-slate-200/80 text-slate-600',
    ]"
  >
    <!-- Globe Icon -->
    <span
      class="flex items-center justify-center pl-1.5 pr-1"
      :class="variant === 'dark' ? 'text-slate-400' : 'text-slate-400'"
      aria-hidden="true"
    >
      <Globe class="w-3.5 h-3.5" />
    </span>

    <!-- ID Button -->
    <button
      type="button"
      :aria-pressed="locale === 'id'"
      :class="[
        'font-bold tracking-wider rounded-md transition-all duration-150',
        size === 'xs' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs',
        locale === 'id'
          ? variant === 'dark'
            ? 'bg-primary-600 text-white shadow-xs'
            : 'bg-white text-primary-700 shadow-xs font-extrabold border border-slate-200/50'
          : variant === 'dark'
            ? 'text-slate-400 hover:text-white'
            : 'text-slate-500 hover:text-slate-800',
      ]"
      @click="setLocale('id', true)"
    >
      ID
    </button>

    <!-- EN Button -->
    <button
      type="button"
      :aria-pressed="locale === 'en'"
      :class="[
        'font-bold tracking-wider rounded-md transition-all duration-150',
        size === 'xs' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs',
        locale === 'en'
          ? variant === 'dark'
            ? 'bg-primary-600 text-white shadow-xs'
            : 'bg-white text-primary-700 shadow-xs font-extrabold border border-slate-200/50'
          : variant === 'dark'
            ? 'text-slate-400 hover:text-white'
            : 'text-slate-500 hover:text-slate-800',
      ]"
      @click="setLocale('en', true)"
    >
      EN
    </button>
  </div>
</template>
