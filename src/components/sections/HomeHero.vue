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

// Support slides from home.json or fallback to single slide
const slides = computed(() => {
  if (hero.slides && hero.slides.length > 0) {
    return hero.slides
  }
  return [
    {
      id: 1,
      badge: 'Klinik Gigi Ramah & Terpercaya di Jakarta',
      title: 'Candraloka',
      subtitle: 'Dental Center in Jakarta',
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
    class="relative bg-navy-950 text-white min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center overflow-hidden"
    style="background-color: #081330;"
  >
    <!-- 1. Full-bleed Background Photograph with ResponsiveImage -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <ResponsiveImage
        :src="currentSlide.image"
        alt="Pelayanan ramah Candraloka Dental Care"
        loading="eager"
        fetchpriority="high"
        aspect-ratio="16/9"
        img-class="w-full h-full object-cover object-[25%_center] sm:object-center transform scale-105 transition-all duration-700"
      />
    </div>

    <!-- 2. Dual-Layer Dental Sapphire Blue Overlay matching the reference image -->
    <!-- Layer A: Horizontal gradient - translucent on dentist photo (left) to deep dental sapphire on right -->
    <div class="absolute inset-0 z-[1] bg-gradient-to-r from-navy-950/45 via-primary-700/80 to-navy-900/95" />

    <!-- Layer B: Vertical depth vignette -->
    <div class="absolute inset-0 z-[2] bg-gradient-to-t from-navy-950/85 via-transparent to-navy-950/30" />
    <div class="absolute right-0 top-0 bottom-0 w-full lg:w-2/3 bg-gradient-to-l from-primary-600/20 via-primary-500/10 to-transparent pointer-events-none z-[2]" />

    <!-- 3. Navigation Controls (Chevron Left & Right on sides) -->
    <button
      v-if="slides.length > 1"
      type="button"
      aria-label="Slide sebelumnya"
      class="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 bg-black/25 hover:bg-white/20 text-white items-center justify-center backdrop-blur-md transition-all duration-200 z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      @click="prevSlide"
    >
      <ChevronLeft class="w-6 h-6 stroke-[2.5]" />
    </button>

    <button
      v-if="slides.length > 1"
      type="button"
      aria-label="Slide berikutnya"
      class="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 bg-black/25 hover:bg-white/20 text-white items-center justify-center backdrop-blur-md transition-all duration-200 z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      @click="nextSlide"
    >
      <ChevronRight class="w-6 h-6 stroke-[2.5]" />
    </button>

    <!-- 4. Hero Content Container (positioned right-of-center with watermark tooth) -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 sm:py-24 lg:py-32">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <!-- Spacer column for dental clinical photo on the left -->
        <div class="hidden lg:block lg:col-span-5" />

        <!-- Content Column (Right 7 cols) with Watermark Tooth Line-Art Background -->
        <div class="lg:col-span-7 relative">
          <!-- Watermark Line-Art Tooth behind text block (like the reference design) -->
          <div class="absolute -right-8 -top-12 sm:-right-4 sm:-top-8 w-72 h-80 sm:w-96 sm:h-96 lg:w-[460px] lg:h-[460px] pointer-events-none select-none z-0 opacity-15 transform rotate-6">
            <svg
              viewBox="0 0 200 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-full h-full stroke-white"
              stroke-width="3.5"
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
            <!-- Glowing Tooth Badge on top -->
            <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold tracking-wide shadow-lg">
              <Sparkles class="w-4 h-4 text-primary-300" aria-hidden="true" />
              <span>{{ currentSlide.badge }}</span>
            </div>

            <!-- Big Brand Title & Subtitle (like Mediz / Dental Center in London) -->
            <div class="space-y-1.5">
              <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none drop-shadow-md">
                {{ currentSlide.title }}
              </h1>
              <p class="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-200 tracking-tight leading-snug">
                {{ currentSlide.subtitle }}
              </p>
            </div>

            <!-- Headline & Description Paragraph -->
            <div class="space-y-2 max-w-xl mx-auto lg:mx-0">
              <h2 class="text-base sm:text-lg font-bold text-white/95 leading-snug">
                {{ currentSlide.headline }}
              </h2>
              <p class="text-sm sm:text-base text-slate-200 leading-relaxed">
                {{ currentSlide.description }}
              </p>
            </div>

            <!-- CTA Actions (White pill button + secondary outline button) -->
            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <Button
                :to="currentSlide.ctaTo"
                variant="white"
                size="lg"
                class="w-full sm:w-auto rounded-full bg-white hover:bg-slate-100 text-primary-700 font-extrabold uppercase tracking-wider px-8 py-3.5 shadow-2xl hover:scale-105 active:scale-100 transition-all border-2 border-white"
              >
                <CalendarCheck class="w-5 h-5 mr-2 text-primary-600" aria-hidden="true" />
                <span>{{ currentSlide.ctaText }}</span>
              </Button>

              <Button
                :to="currentSlide.secondaryTo"
                variant="ghost"
                size="lg"
                class="w-full sm:w-auto rounded-full text-white hover:bg-white/15 border border-white/30 font-semibold px-6 transition-all"
              >
                <Clock class="w-5 h-5 mr-2 text-primary-300" aria-hidden="true" />
                <span>{{ currentSlide.secondaryText }}</span>
              </Button>
            </div>

            <!-- Trust Highlights Badges -->
            <div class="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-200 font-medium">
              <div class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-primary-300 flex-shrink-0" />
                <span>Jadwal Terstruktur & Bebas Antre</span>
              </div>
              <div class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-primary-300 flex-shrink-0" />
                <span>Dokter Spesialis Berpengalaman</span>
              </div>
              <div class="flex items-center gap-2">
                <ShieldCheck class="w-4 h-4 text-primary-300 flex-shrink-0" />
                <span>Standar Sterilisasi Medis Tinggi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. Slider Dots (Mobile & Desktop) -->
    <div
      v-if="slides.length > 1"
      class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5"
    >
      <button
        v-for="(s, sIdx) in slides"
        :key="s.id"
        type="button"
        :aria-label="`Buka slide ${sIdx + 1}`"
        class="h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none"
        :class="currentSlideIndex === sIdx ? 'w-8 bg-white shadow-md' : 'w-2.5 bg-white/40 hover:bg-white/70'"
        @click="goToSlide(sIdx)"
      />
    </div>
  </section>
</template>
