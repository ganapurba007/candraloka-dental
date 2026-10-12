<script setup>
import { useHead } from '@unhead/vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'

useHead({
  title: 'Jadwal Praktek Dokter | Candraloka Dental Care',
  meta: [
    {
      name: 'description',
      content: 'Informasi lengkap jadwal praktek dokter gigi klinik Candraloka Dental Care.',
    },
  ],
})

const breadcrumbs = [{ label: 'Jadwal Praktek' }]
</script>

<template>
  <div class="flex-1 flex flex-col">
    <Breadcrumb :items="breadcrumbs" />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
      <h1 class="text-3xl font-bold text-slate-900 tracking-tight mb-4">Jadwal Praktek Dokter</h1>
      <p class="text-slate-600 max-w-2xl leading-relaxed">
        Jadwal praktek mingguan dan status buka klinik hari ini. (Segera hadir di Fase 7).
      </p>
    </main>
  </div>
</template>
