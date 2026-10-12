<script setup>
import { computed } from 'vue'
import { CalendarCheck, MessageCircle, Sparkles } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import clinicData from '@/data/clinic.json'

const waNumber = clinicData.contact.whatsapp
const waUrl = computed(() => {
  const text = encodeURIComponent('Halo Candraloka Dental Care, saya ingin konsultasi mengenai reservasi jadwal.')
  return `https://wa.me/${waNumber}?text=${text}`
})
</script>

<template>
  <section class="py-16 sm:py-20 bg-navy-900 text-white relative overflow-hidden">
    <!-- Decorative background glow -->
    <div class="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
    <div class="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800 border border-navy-700 text-primary-300 text-xs font-semibold">
        <Sparkles class="w-3.5 h-3.5 text-primary-400" aria-hidden="true" />
        <span>Kesehatan Gigi Keluarga Anda</span>
      </div>

      <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
        Siap Mendapatkan Senyum Sehat dan Percaya Diri?
      </h2>

      <p class="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
        Pilih dokter dan jadwal yang Anda inginkan dengan alur reservasi online praktis, cepat, dan transparan.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
        <Button to="/reservasi" variant="primary" size="lg" class="w-full sm:w-auto font-semibold shadow-lg">
          <CalendarCheck class="w-5 h-5 mr-2" aria-hidden="true" />
          <span>Buat Reservasi Online</span>
        </Button>
        <a
          :href="waUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-navy-700 bg-navy-800 hover:bg-navy-700 text-white font-semibold text-base transition-colors w-full sm:w-auto min-h-[48px]"
        >
          <MessageCircle class="w-5 h-5 mr-2 text-emerald-400" aria-hidden="true" />
          <span>Konsultasi WhatsApp</span>
        </a>
      </div>
    </div>
  </section>
</template>
