<script setup>
import { ArrowRight, Stethoscope, Sparkles } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import clinicData from '@/data/clinic.json'
</script>

<template>
  <section class="relative bg-navy-900 text-white py-20 sm:py-24 lg:py-28 overflow-hidden">
    <!-- Decorative background glow & medical geometric lines -->
    <div class="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-850 opacity-95" />
    <div class="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-primary-600/10 to-transparent pointer-events-none" />
    <div class="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-primary-500/15 blur-3xl pointer-events-none" />
    <div class="absolute left-1/3 -bottom-24 w-80 h-80 rounded-full bg-primary-400/10 blur-3xl pointer-events-none" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="max-w-2xl space-y-6">
        <!-- Subtitle Badge -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/90 border border-navy-700/80 text-primary-300 text-xs font-semibold tracking-wide shadow-sm">
          <Sparkles class="w-3.5 h-3.5 text-primary-400" aria-hidden="true" />
          <span>Tentang Candraloka Dental Care</span>
        </div>

        <!-- Heading (Medcity pagetitle__heading) -->
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
          Merawat Kesehatan Gigi & Kenyamanan Seluruh Keluarga.
        </h1>

        <!-- Description (Medcity pagetitle__desc) -->
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed">
          Candraloka Dental Care hadir dengan dedikasi memberikan pelayanan medis kedokteran gigi terpercaya, mengutamakan pendekatan personal minim rasa cemas dalam suasana klinik yang ramah dan menenangkan.
        </p>

        <!-- Dual Action Buttons (Medcity Find A Doctor + Our Services) -->
        <div class="flex flex-wrap items-center gap-4 pt-2">
          <Button
            to="/dokter"
            variant="primary"
            size="lg"
            class="font-semibold shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <span>Lihat Dokter</span>
            <ArrowRight class="w-4 h-4 ml-2" aria-hidden="true" />
          </Button>

          <Button
            to="/layanan"
            variant="white"
            size="lg"
            class="font-semibold shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <span>Layanan Kami</span>
            <ArrowRight class="w-4 h-4 ml-2" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
