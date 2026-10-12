<script setup>
import { ArrowRight, Stethoscope, Sparkles } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import clinicData from '@/data/clinic.json'
</script>

<template>
  <section class="py-12 sm:py-16 bg-gradient-to-b from-navy-900 via-navy-850 to-navy-900 text-white relative overflow-hidden">
    <!-- Decorative background glow -->
    <div class="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
    <div class="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-primary-400/10 blur-3xl pointer-events-none" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800 border border-navy-700 text-primary-300 text-xs font-semibold">
        <Sparkles class="w-3.5 h-3.5 text-primary-400" aria-hidden="true" />
        <span>Tentang Candraloka Dental Care</span>
      </div>

      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight text-white">
        Merawat Senyum Sehat dengan Sentuhan Empati & Keahlian
      </h1>

      <p class="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
        {{ clinicData.tagline }}
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
        <Button to="/dokter" variant="primary" size="lg" class="w-full sm:w-auto font-semibold shadow-lg">
          <Stethoscope class="w-5 h-5 mr-2" aria-hidden="true" />
          <span>Lihat Dokter</span>
        </Button>
        <Button
          to="/layanan"
          variant="outline"
          size="lg"
          class="w-full sm:w-auto font-semibold border-navy-600 bg-navy-800/80 text-white hover:bg-navy-700 hover:text-white"
        >
          <span>Layanan Kami</span>
          <ArrowRight class="w-4 h-4 ml-2" aria-hidden="true" />
        </Button>
      </div>
    </div>
  </section>
</template>
