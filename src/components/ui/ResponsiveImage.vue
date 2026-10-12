<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  width: {
    type: [Number, String],
    default: undefined,
  },
  height: {
    type: [Number, String],
    default: undefined,
  },
  sizes: {
    type: String,
    default: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1280px',
  },
  loading: {
    type: String,
    default: 'lazy',
    validator: (val) => ['lazy', 'eager'].includes(val),
  },
  fetchpriority: {
    type: String,
    default: 'auto',
    validator: (val) => ['auto', 'high', 'low'].includes(val),
  },
  aspectRatio: {
    type: String,
    default: undefined,
  },
  imgClass: {
    type: String,
    default: '',
  },
  wrapperClass: {
    type: String,
    default: '',
  },
})

const isWebp = computed(() => props.src?.endsWith('.webp'))

const srcset = computed(() => {
  if (!isWebp.value) return undefined

  const dotIdx = props.src.lastIndexOf('.')
  if (dotIdx === -1) return undefined

  const base = props.src.slice(0, dotIdx)
  const ext = props.src.slice(dotIdx)

  return `${base}-480${ext} 480w, ${base}-768${ext} 768w, ${props.src} 1280w`
})

const aspectStyle = computed(() => {
  return props.aspectRatio ? { aspectRatio: props.aspectRatio } : {}
})
</script>

<template>
  <div :class="['relative overflow-hidden', wrapperClass]" :style="aspectStyle">
    <img
      :src="src"
      :alt="alt"
      :srcset="srcset"
      :sizes="srcset ? sizes : undefined"
      :width="width"
      :height="height"
      :loading="loading"
      :fetchpriority="fetchpriority"
      decoding="async"
      :class="['w-full h-full object-cover', imgClass]"
    />
  </div>
</template>
