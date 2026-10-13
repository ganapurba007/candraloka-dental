<script setup>
import { ArrowRight } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
</script>

<template>
  <section class="relative bg-primary-800 text-white py-16 sm:py-20 lg:py-24 overflow-hidden" style="background-color: #133f94;">
    <!-- Photographic Background & Sapphire Blue Wash (Reference Medcity Style) -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <img
        :src="'/images/clinic/page-header.webp'"
        alt=""
        class="w-full h-full object-cover object-bottom scale-100"
        loading="eager"
      />
      <div
        class="absolute inset-0"
        style="background: linear-gradient(180deg, rgba(15, 42, 98, 0.35) 0%, rgba(10, 26, 64, 0.60) 100%);"
      />
    </div>

    <!-- Center-aligned Header Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
      <span class="text-xs font-bold uppercase tracking-wider text-blue-200 block">
        Tentang Candraloka Dental Care
      </span>

      <!-- Heading -->
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
        Tentang Kami
      </h1>

      <!-- Description / Subtitle -->
      <p class="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
        Merawat kesehatan gigi dan senyum bahagia keluarga dengan pelayanan medis terpercaya, pendekatan ramah, dan suasana klinik yang menenangkan.
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Button
          to="/dokter"
          variant="white"
          size="md"
          class="font-semibold shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <span>Lihat Dokter</span>
          <ArrowRight class="w-4 h-4 ml-2" aria-hidden="true" />
        </Button>

        <Button
          to="/layanan"
          variant="outline"
          size="md"
          class="font-semibold text-white border-white/60 bg-white/10 hover:bg-white/20 hover:border-white shadow-lg transition-all"
        >
          <span>Layanan Kami</span>
          <ArrowRight class="w-4 h-4 ml-2" aria-hidden="true" />
        </Button>
      </div>
    </div>
  </section>
</template>
