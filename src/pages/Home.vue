<script setup>
import { useHead } from '@unhead/vue'

useHead({
  title: 'Beranda | Candraloka Dental Care',
  meta: [
    {
      name: 'description',
      content: 'Klinik gigi modern dengan layanan profesional dan reservasi online mudah.',
    },
  ],
})
</script>

<template>
  <main class="flex-1 flex flex-col items-center justify-center p-8 text-center">
    <div class="max-w-md p-6 bg-white rounded-2xl shadow-card border border-slate-100">
      <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800 mb-3">
        Fase 0 — Setup
      </span>
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight mb-2">
        Candraloka Dental Care
      </h1>
      <p class="text-sm text-slate-600">
        Fondasi proyek telah siap. Tailwind CSS, Vue Router, Vitest, dan pipeline gambar aktif.
      </p>
    </div>
  </main>
</template>
