<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  as: {
    type: [String, Object],
    default: 'button',
  },
  to: {
    type: [String, Object],
    default: undefined,
  },
  href: {
    type: String,
    default: undefined,
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'outline', 'white', 'navy', 'ghost', 'danger'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const isRouterLink = computed(() => !!props.to)
const isExternalLink = computed(() => !!props.href)

const componentType = computed(() => {
  if (isRouterLink.value) return RouterLink
  if (isExternalLink.value) return 'a'
  return props.as
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-md hover:shadow-lg focus-visible:ring-primary-500'
    case 'secondary':
      return 'bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-200 focus-visible:ring-primary-500'
    case 'outline':
      return 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-navy-900 hover:border-primary-400 active:bg-slate-100 focus-visible:ring-primary-500'
    case 'white':
      return 'bg-white text-navy-900 border border-slate-200 hover:bg-slate-100 active:bg-slate-200 shadow-md hover:shadow-lg focus-visible:ring-primary-500'
    case 'navy':
      return 'bg-navy-900 text-white hover:bg-navy-950 active:bg-black shadow-md hover:shadow-lg focus-visible:ring-primary-500'
    case 'ghost':
      return 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-400'
    case 'danger':
      return 'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 focus-visible:ring-rose-500'
    default:
      return ''
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'min-h-[38px] px-4 py-1.5 text-xs font-semibold rounded-full gap-1.5'
    case 'lg':
      return 'min-h-[48px] px-7 py-3 text-base font-bold rounded-full gap-2.5'
    case 'md':
    default:
      return 'min-h-[44px] px-5 py-2.5 text-sm font-semibold rounded-full gap-2'
  }
})
</script>

<template>
  <component
    :is="componentType"
    :to="isRouterLink ? to : undefined"
    :href="isExternalLink ? href : undefined"
    :type="!isRouterLink && !isExternalLink ? type : undefined"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center font-sans tracking-wide transition-colors duration-150 cursor-pointer',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'select-none touch-manipulation',
      variantClasses,
      sizeClasses,
      (disabled || loading) && 'opacity-60 !cursor-not-allowed pointer-events-none shadow-none',
    ]"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot />
  </component>
</template>
