<script setup>
import { computed } from 'vue'

const props = defineProps({
  hoverable: {
    type: Boolean,
    default: false,
  },
  padding: {
    type: String,
    default: 'normal',
    validator: (v) => ['none', 'sm', 'normal', 'lg'].includes(v),
  },
  as: {
    type: String,
    default: 'div',
  },
})

const paddingClasses = computed(() => {
  switch (props.padding) {
    case 'none':
      return ''
    case 'sm':
      return 'p-4'
    case 'lg':
      return 'p-6 sm:p-8'
    case 'normal':
    default:
      return 'p-5 sm:p-6'
  }
})
</script>

<template>
  <component
    :is="as"
    :class="[
      'bg-white rounded-2xl border border-slate-100 shadow-card transition-all duration-200 overflow-hidden',
      hoverable && 'hover:shadow-card-hover hover:-translate-y-0.5 hover:border-slate-200 cursor-pointer',
      paddingClasses,
    ]"
  >
    <div v-if="$slots.header" class="mb-4 pb-3 border-b border-slate-100">
      <slot name="header" />
    </div>
    <slot />
    <div v-if="$slots.footer" class="mt-4 pt-3 border-t border-slate-100">
      <slot name="footer" />
    </div>
  </component>
</template>
