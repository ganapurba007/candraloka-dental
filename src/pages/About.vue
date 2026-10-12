<script setup>
import { useHead } from '@unhead/vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'

useHead({
  title: 'Tentang Kami | Candraloka Dental Care',
  meta: [
    {
      name: 'description',
      content: 'Mengenal klinik gigi Candraloka Dental Care, visi, misi, nilai pelayanan, dan fasilitas modern kami.',
    },
  ],
})

const breadcrumbs = [{ label: 'Tentang Kami' }]
</script>

<template>
  <div class="flex-1 flex flex-col">
    <Breadcrumb :items="breadcrumbs" />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
      <h1 class="text-3xl font-bold text-slate-900 tracking-tight mb-4">Tentang Candraloka Dental Care</h1>
      <p class="text-slate-600 max-w-2xl leading-relaxed">
        Halaman profil klinik, fasilitas, visi, dan misi. (Segera hadir di Fase 4).
      </p>
    </main>
  </div>
</template>
