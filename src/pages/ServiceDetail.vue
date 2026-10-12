<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import servicesData from '@/data/services.json'

const route = useRoute()
const service = computed(() => servicesData.find((s) => s.slug === route.params.slug))

useHead({
  title: computed(() => (service.value ? `${service.value.name} | Candraloka Dental Care` : 'Layanan | Candraloka Dental Care')),
})

const breadcrumbs = computed(() => [
  { label: 'Layanan', to: '/layanan' },
  { label: service.value ? service.value.name : 'Detail Layanan' },
])
</script>

<template>
  <div class="flex-1 flex flex-col">
    <Breadcrumb :items="breadcrumbs" />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
      <div v-if="service">
        <h1 class="text-3xl font-bold text-slate-900 tracking-tight mb-4">{{ service.name }}</h1>
        <p class="text-slate-600 max-w-2xl leading-relaxed">{{ service.description }}</p>
      </div>
      <div v-else>
        <p class="text-slate-500">Layanan tidak ditemukan.</p>
      </div>
    </main>
  </div>
</template>
