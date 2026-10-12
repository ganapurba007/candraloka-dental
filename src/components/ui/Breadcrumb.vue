<script setup>
import { RouterLink } from 'vue-router'
import { ChevronRight, Home } from 'lucide-vue-next'

defineProps({
  items: {
    type: Array,
    required: true,
    // [{ label: 'Layanan', to: '/layanan' }, { label: 'Scaling Gigi' }]
  },
})
</script>

<template>
  <nav aria-label="Breadcrumb" class="py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
    <ol class="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
      <li class="flex items-center">
        <RouterLink
          to="/"
          class="flex items-center hover:text-primary-600 transition-colors focus-visible:outline-none focus-visible:text-primary-700"
          aria-label="Beranda"
        >
          <Home class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-slate-400" />
          <span>Beranda</span>
        </RouterLink>
      </li>

      <li v-for="(item, index) in items" :key="index" class="flex items-center">
        <ChevronRight class="w-3.5 h-3.5 text-slate-300 mx-1 flex-shrink-0" aria-hidden="true" />
        
        <RouterLink
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="hover:text-primary-600 transition-colors focus-visible:outline-none focus-visible:text-primary-700"
        >
          {{ item.label }}
        </RouterLink>
        <span
          v-else
          class="font-medium text-slate-800"
          aria-current="page"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
