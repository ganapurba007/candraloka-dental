<script setup>
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'

const route = useRoute()

useHead({
  title: 'Profil Dokter | Candraloka Dental Care',
})

const breadcrumbs = [
  { label: 'Dokter', to: '/dokter' },
  { label: 'Profil Dokter' },
]
</script>

<template>
  <div class="flex-1 flex flex-col">
    <Breadcrumb :items="breadcrumbs" />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
      <h1 class="text-3xl font-bold text-slate-900 tracking-tight mb-4">Profil Dokter</h1>
      <p class="text-slate-600 max-w-2xl leading-relaxed">
        Detail dokter dan jadwal prakteknya. (Segera hadir di Fase 6).
      </p>
    </main>
  </div>
</template>
