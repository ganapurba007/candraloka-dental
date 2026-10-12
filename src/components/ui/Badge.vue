<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'neutral',
    validator: (v) => ['success', 'warning', 'danger', 'info', 'neutral'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md'].includes(v),
  },
  dot: {
    type: Boolean,
    default: false,
  },
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
    case 'warning':
      return 'bg-amber-50 text-amber-700 border-amber-200/60'
    case 'danger':
      return 'bg-rose-50 text-rose-700 border-rose-200/60'
    case 'info':
      return 'bg-sky-50 text-sky-700 border-sky-200/60'
    case 'neutral':
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200/60'
  }
})

const dotColorClasses = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'bg-emerald-500'
    case 'warning':
      return 'bg-amber-500'
    case 'danger':
      return 'bg-rose-500'
    case 'info':
      return 'bg-sky-500'
    case 'neutral':
    default:
      return 'bg-slate-400'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-[11px] px-2 py-0.5 rounded-md gap-1'
    case 'md':
    default:
      return 'text-xs px-2.5 py-1 rounded-lg gap-1.5'
  }
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center font-medium border leading-none tracking-wide select-none',
      variantClasses,
      sizeClasses,
    ]"
  >
    <span
      v-if="dot"
      :class="['w-1.5 h-1.5 rounded-full flex-shrink-0', dotColorClasses]"
      aria-hidden="true"
    />
    <slot />
  </span>
</template>
