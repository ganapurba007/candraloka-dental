<script setup>
import { useHead } from '@unhead/vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'

useHead({
  title: 'Tim Dokter Gigi | Candraloka Dental Care',
  meta: [
    {
      name: 'description',
      content: 'Profil tim dokter gigi profesional dan berpengalaman di Candraloka Dental Care.',
    },
  ],
})

const breadcrumbs = [{ label: 'Dokter' }]
</script>

<template>
  <div class="flex-1 flex flex-col">
    <Breadcrumb :items="breadcrumbs" />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
      <h1 class="text-3xl font-bold text-slate-900 tracking-tight mb-4">Tim Dokter Gigi</h1>
      <p class="text-slate-600 max-w-2xl leading-relaxed">
        Profil dokter gigi umum dan spesialis kami. (Segera hadir di Fase 6).
      </p>
    </main>
  </div>
</template>
