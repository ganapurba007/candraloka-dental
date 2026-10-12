<script setup>
import { useHead } from '@unhead/vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'

useHead({
  title: 'Reservasi Online | Candraloka Dental Care',
  meta: [
    {
      name: 'description',
      content: 'Buat janji temu online dengan dokter gigi pilihan di klinik Candraloka Dental Care.',
    },
  ],
})

const breadcrumbs = [{ label: 'Reservasi Online' }]
</script>

<template>
  <div class="flex-1 flex flex-col">
    <Breadcrumb :items="breadcrumbs" />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
      <h1 class="text-3xl font-bold text-slate-900 tracking-tight mb-4">Reservasi Janji Temu</h1>
      <p class="text-slate-600 max-w-2xl leading-relaxed">
        Alur reservasi online berbasis ketersediaan waktu nyata. (Segera hadir di Fase 8).
      </p>
    </main>
  </div>
</template>
