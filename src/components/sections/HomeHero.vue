<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
  CalendarCheck,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import homeData from '@/data/home.json'

const { hero } = homeData

// Slide data with clean, focused copy
const slides = computed(() => {
  if (hero.slides && hero.slides.length > 0) {
    return hero.slides
  }
  return [
    {
      id: 1,
      badge: 'Klinik Gigi Ramah & Terpercaya di Jakarta',
      title: 'Candraloka Dental Care',
      headline: hero.headline,
      description: hero.subheadline,
      image: hero.image,
      ctaText: 'Buat Reservasi Online',
      ctaTo: '/reservasi',
      secondaryText: 'Lihat Jadwal Praktek',
      secondaryTo: '/jadwal',
    },
  ]
})

const currentSlideIndex = ref(0)
const currentSlide = computed(() => slides.value[currentSlideIndex.value] || slides.value[0])

function nextSlide() {
  currentSlideIndex.value = (currentSlideIndex.value + 1) % slides.value.length
}

function prevSlide() {
  currentSlideIndex.value =
    (currentSlideIndex.value - 1 + slides.value.length) % slides.value.length
}

function goToSlide(index) {
  currentSlideIndex.value = index
}
</script>

<template>
  <section
    class="relative bg-navy-950 text-white min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden pb-36 sm:pb-44 lg:pb-48"
    style="background-color: #081330;"
  >
    <!-- 1. Full-bleed Photographic Background -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <ResponsiveImage
        :src="currentSlide.image"
        alt="Fasilitas dan perawatan klinik Candraloka Dental Care"
        loading="eager"
        fetchpriority="high"
        aspect-ratio="16/9"
        img-class="w-full h-full object-cover object-[25%_center] sm:object-center transform scale-105 transition-all duration-700"
      />
    </div>

    <!-- 2. Clean, Silky Gradient Overlay -->
    <!-- Preserves dental operatory visible on left while providing a solid, rich sapphire-blue canvas for text on the right -->
    <div
      class="absolute inset-0 z-[1]"
      style="background: linear-gradient(90deg, rgba(8, 20, 50, 0.40) 0%, rgba(18, 60, 150, 0.85) 38%, rgba(14, 38, 98, 0.98) 65%, rgba(8, 19, 48, 1) 100%);"
    />
    <!-- Subtle top and bottom vignettes for smooth edge blending -->
    <div class="absolute inset-0 z-[2] bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/40 pointer-events-none" />

    <!-- 3. Navigation Controls (Chevrons) -->
    <button
      v-if="slides.length > 1"
      type="button"
      aria-label="Slide sebelumnya"
      class="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-navy-950/40 hover:bg-white hover:text-navy-900 text-white items-center justify-center backdrop-blur-md transition-all duration-200 z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg"
      @click="prevSlide"
    >
      <ChevronLeft class="w-5 h-5 stroke-[2.5]" />
    </button>

    <button
      v-if="slides.length > 1"
      type="button"
      aria-label="Slide berikutnya"
      class="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 bg-navy-950/40 hover:bg-white hover:text-navy-900 text-white items-center justify-center backdrop-blur-md transition-all duration-200 z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg"
      @click="nextSlide"
    >
      <ChevronRight class="w-5 h-5 stroke-[2.5]" />
    </button>

    <!-- 4. Hero Content Container -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 sm:pt-20 lg:pt-24">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <!-- Spacer column: lets the clinic interior on the left breathe cleanly -->
        <div class="hidden lg:block lg:col-span-5" />

        <!-- Content Column: Clean, uncluttered, effortlessly readable -->
        <div class="lg:col-span-7 relative">
          <!-- Subtle Decorative Tooth Watermark (Pushed far right, completely clear of text) -->
          <div class="absolute -right-12 lg:-right-20 top-1/2 -translate-y-1/2 w-72 h-80 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] pointer-events-none select-none z-0 opacity-[0.07] transform rotate-6">
            <svg
              viewBox="0 0 200 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-full h-full stroke-white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M50 20 C20 20, 10 60, 15 110 C20 150, 40 220, 65 220 C85 220, 85 170, 100 170 C115 170, 115 220, 135 220 C160 220, 180 150, 185 110 C190 60, 180 20, 150 20 C125 20, 112 45, 100 45 C88 45, 75 20, 50 20 Z" />
              <path d="M70 70 Q100 95 130 70" stroke-dasharray="4 6" opacity="0.6" />
              <path d="M100 95 L100 135" opacity="0.5" />
            </svg>
          </div>

          <!-- Main Text Stack -->
          <div class="relative z-10 space-y-6 text-center lg:text-left">
            <!-- Badge: Clean and compact -->
            <div>
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-xs font-semibold tracking-wide shadow-sm">
                <Sparkles class="w-3.5 h-3.5 text-primary-300" aria-hidden="true" />
                <span>Klinik Gigi Ramah & Terpercaya di Jakarta</span>
              </div>
            </div>

            <!-- Big, Bold Brand Heading -->
            <div class="space-y-1">
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                Candraloka
                <span class="block text-2xl sm:text-3xl lg:text-4xl font-normal text-blue-200 mt-2 tracking-normal">
                  Dental Care Jakarta
                </span>
              </h1>
            </div>

            <!-- Description: High contrast, clean leading -->
            <div class="max-w-xl mx-auto lg:mx-0">
              <p class="text-base sm:text-lg text-blue-100/90 leading-relaxed font-normal">
                Senyum Sehat dan Percaya Diri Dimulai dari Sini. Perawatan gigi komprehensif bersama tim dokter berpengalaman, teknologi modern, dan alur reservasi tepat waktu tanpa antrean panjang.
              </p>
            </div>

            <!-- CTA Action Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
              <Button
                :to="currentSlide.ctaTo"
                variant="white"
                size="lg"
                class="w-full sm:w-auto rounded-full bg-white hover:bg-slate-100 text-primary-800 font-bold uppercase tracking-wider px-8 py-3.5 shadow-xl hover:shadow-2xl hover:scale-102 active:scale-100 transition-all border-none text-sm"
              >
                <CalendarCheck class="w-4 h-4 mr-2 text-primary-600" aria-hidden="true" />
                <span>{{ currentSlide.ctaText }}</span>
              </Button>

              <Button
                :to="currentSlide.secondaryTo"
                variant="ghost"
                size="lg"
                class="w-full sm:w-auto rounded-full text-white hover:bg-white/10 border border-white/30 font-semibold px-6 py-3.5 transition-all text-sm"
              >
                <Clock class="w-4 h-4 mr-2 text-blue-300" aria-hidden="true" />
                <span>{{ currentSlide.secondaryText }}</span>
              </Button>
            </div>

            <!-- Trust Highlights (3 compact trust badges with clear spacing) -->
            <div class="pt-5 border-t border-white/15 flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-6 text-xs text-blue-100/80 font-medium">
              <div class="flex items-center gap-1.5">
                <CheckCircle2 class="w-4 h-4 text-primary-300 flex-shrink-0" />
                <span>Jadwal Bebas Antre</span>
              </div>
              <div class="flex items-center gap-1.5">
                <CheckCircle2 class="w-4 h-4 text-primary-300 flex-shrink-0" />
                <span>Dokter Spesialis</span>
              </div>
              <div class="flex items-center gap-1.5">
                <ShieldCheck class="w-4 h-4 text-primary-300 flex-shrink-0" />
                <span>Sterilisasi Medis Tinggi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. Slider Dots (Elevated clearance well above QuickInfoStrip) -->
    <div
      v-if="slides.length > 1"
      class="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
    >
      <button
        v-for="(s, sIdx) in slides"
        :key="s.id"
        type="button"
        :aria-label="`Buka slide ${sIdx + 1}`"
        class="h-2 rounded-full transition-all duration-300 focus-visible:outline-none"
        :class="currentSlideIndex === sIdx ? 'w-7 bg-white shadow-md' : 'w-2 bg-white/40 hover:bg-white/70'"
        @click="goToSlide(sIdx)"
      />
    </div>
  </section>
</template>
