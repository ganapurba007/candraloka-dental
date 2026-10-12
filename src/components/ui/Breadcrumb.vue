<script setup>
import { RouterLink } from 'vue-router'
import { ChevronRight, Home } from 'lucide-vue-next'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    // [{ label: 'Layanan', to: '/layanan' }, { label: 'Scaling Gigi' }]
  },
  dark: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <nav aria-label="Breadcrumb" class="py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
    <ol
      class="flex items-center space-x-2 text-xs sm:text-sm overflow-x-auto whitespace-nowrap"
      :class="dark ? 'text-slate-300' : 'text-slate-500'"
    >
      <li class="flex items-center">
        <RouterLink
          to="/"
          class="flex items-center transition-colors focus-visible:outline-none"
          :class="dark ? 'hover:text-white text-slate-300' : 'hover:text-primary-600 text-slate-500'"
          aria-label="Beranda"
        >
          <Home
            class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1"
            :class="dark ? 'text-slate-300' : 'text-slate-400'"
          />
          <span>Beranda</span>
        </RouterLink>
      </li>

      <li v-for="(item, index) in items" :key="index" class="flex items-center">
        <ChevronRight
          class="w-3.5 h-3.5 mx-1 flex-shrink-0"
          :class="dark ? 'text-slate-400' : 'text-slate-300'"
          aria-hidden="true"
        />

        <RouterLink
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="transition-colors focus-visible:outline-none"
          :class="dark ? 'hover:text-white text-slate-300' : 'hover:text-primary-600 text-slate-500'"
        >
          {{ item.label }}
        </RouterLink>
        <span
          v-else
          class="font-medium"
          :class="dark ? 'text-white' : 'text-slate-800'"
          aria-current="page"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
