<script setup>
import { useHead } from '@unhead/vue'
import { RouterLink } from 'vue-router'
import { Home, Sparkles, CalendarCheck, HelpCircle } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

useHead({
  title: 'Halaman Tidak Ditemukan (404) | Candraloka Dental Care',
  meta: [
    {
      name: 'description',
      content: 'Halaman yang Anda cari tidak ditemukan. Kembali ke beranda atau telusuri layanan klinik gigi Candraloka.',
    },
  ],
})
</script>

<template>
  <main class="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-lg w-full text-center">
      <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6 shadow-sm border border-primary-100">
        <HelpCircle class="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />
      </div>

      <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-600 mb-3 tracking-wide">
        Error 404
      </span>

      <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
        Halaman Tidak Ditemukan
      </h1>

      <p class="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed">
        Mohon maaf, halaman yang Anda tuju mungkin telah dipindahkan atau alamat yang dimasukkan belum tepat. Silakan gunakan pilihan navigasi di bawah ini.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button to="/" variant="primary" size="md" class="w-full sm:w-auto">
          <Home class="w-4 h-4 mr-2" aria-hidden="true" />
          Kembali ke Beranda
        </Button>
        <Button to="/layanan" variant="outline" size="md" class="w-full sm:w-auto">
          <Sparkles class="w-4 h-4 mr-2" aria-hidden="true" />
          Lihat Layanan
        </Button>
        <Button to="/reservasi" variant="secondary" size="md" class="w-full sm:w-auto">
          <CalendarCheck class="w-4 h-4 mr-2" aria-hidden="true" />
          Buat Reservasi
        </Button>
      </div>
    </div>
  </main>
</template>
