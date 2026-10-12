<script setup>
import { computed } from 'vue'
import { CalendarCheck, MessageCircle, Sparkles, ArrowRight } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import clinicData from '@/data/clinic.json'

const waNumber = clinicData.contact.whatsapp
const waUrl = computed(() => {
  const text = encodeURIComponent('Halo Candraloka Dental Care, saya ingin konsultasi mengenai reservasi jadwal dokter gigi.')
  return `https://wa.me/${waNumber}?text=${text}`
})
</script>

<template>
  <section class="py-16 sm:py-24 bg-surface-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Medcity styled CTA Banner Container (cta bg-primary) -->
      <div class="relative bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 sm:p-12 lg:p-14 text-white shadow-2xl overflow-hidden border border-primary-500/40">
        <!-- Decorative circular backdrop glow -->
        <div class="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div class="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-black/10 blur-2xl pointer-events-none" />

        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Icon Column -->
          <div class="hidden sm:flex lg:col-span-2 items-center justify-center">
            <div class="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-inner">
              <Sparkles class="w-10 h-10 text-white" aria-hidden="true" />
            </div>
          </div>

          <!-- Content Column -->
          <div class="lg:col-span-6 space-y-3 text-center sm:text-left">
            <span class="text-xs font-bold uppercase tracking-widest text-primary-200 block">
              Pelayanan Terbaik untuk Keluarga
            </span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
              Siap Mendapatkan Senyum Sehat dan Percaya Diri?
            </h2>
            <p class="text-sm sm:text-base text-primary-100 leading-relaxed max-w-xl">
              Pilih layanan dan dokter spesialis yang sesuai dengan kebutuhan Anda. Jadwal terstruktur rapi, tanpa antre panjang di klinik.
            </p>
          </div>

          <!-- Actions Column -->
          <div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center lg:items-end">
            <Button
              to="/reservasi"
              variant="navy"
              size="lg"
              class="font-bold shadow-xl hover:-translate-y-0.5 transition-all w-full text-center justify-center"
            >
              <CalendarCheck class="w-5 h-5 mr-2" aria-hidden="true" />
              <span>Buat Reservasi Online</span>
            </Button>

            <a
              :href="waUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-sm transition-all border border-white/25 w-full min-h-[44px]"
            >
              <MessageCircle class="w-4 h-4 mr-2" aria-hidden="true" />
              <span>Konsultasi via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
