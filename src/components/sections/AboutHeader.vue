<script setup>
import { ArrowRight } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
</script>

<template>
  <section class="relative bg-navy-950 text-white py-10 sm:py-12 lg:py-14 overflow-hidden" style="background-color: #081434;">
    <!-- Photographic Background & Balanced Sapphire Blue Tint -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <img
        :src="'/images/clinic/header-about.webp'"
        alt=""
        class="w-full h-full object-cover object-center scale-100 opacity-65 sm:opacity-75"
        loading="eager"
      />
      <div
        class="absolute inset-0"
        style="background: linear-gradient(180deg, rgba(8, 20, 52, 0.62) 0%, rgba(13, 36, 88, 0.48) 50%, rgba(8, 20, 52, 0.76) 100%);"
      />
    </div>

    <!-- Center-aligned Header Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
      <span class="text-xs font-bold uppercase tracking-wider text-blue-200 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
        Tentang Candraloka Dental Care
      </span>

      <!-- Heading -->
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
        Tentang Kami
      </h1>

      <!-- Description / Subtitle -->
      <p class="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
        Merawat kesehatan gigi dan senyum bahagia keluarga dengan pelayanan medis terpercaya, pendekatan ramah, dan suasana klinik yang menenangkan.
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center justify-center gap-3.5 pt-1.5">
        <Button
          to="/dokter"
          variant="white"
          size="md"
          class="font-semibold shadow-lg hover:-translate-y-0.5 transition-all text-navy-950"
        >
          <span>Lihat Dokter</span>
          <ArrowRight class="w-4 h-4 ml-2" aria-hidden="true" />
        </Button>

        <Button
          to="/layanan"
          variant="ghost"
          size="md"
          class="font-semibold !text-white border-2 border-white/80 bg-white/10 hover:!bg-white hover:!text-navy-950 shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <span>Layanan Kami</span>
          <ArrowRight class="w-4 h-4 ml-2" aria-hidden="true" />
        </Button>
      </div>
    </div>
  </section>
</template>
