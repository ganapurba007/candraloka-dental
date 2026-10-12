<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  CalendarCheck,
  Clock,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Sparkles,
  HeartHandshake,
  Cpu,
} from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import homeData from '@/data/home.json'

const { hero } = homeData

const slides = computed(() => {
  if (hero.slides && hero.slides.length > 0) {
    return hero.slides
  }
  return [
    {
      id: 1,
      layout: 'left',
      badge: 'Klinik Gigi Ramah & Terpercaya di Jakarta',
      title: 'Candraloka',
      subtitle: 'Dental Care Jakarta',
      headline: hero.headline,
      description: hero.subheadline,
      image: hero.image,
      ctaText: 'Buat Reservasi Online',
      ctaTo: '/reservasi',
      secondaryText: 'Lihat Jadwal Praktek',
      secondaryTo: '/jadwal',
      highlights: ['Jadwal Bebas Antre', '5 Dokter Spesialis', 'Sterilisasi Medis Tinggi'],
    },
  ]
})

const currentSlideIndex = ref(0)
const slideDirection = ref('next')
const isPaused = ref(false)
let timer = null

const currentSlide = computed(() => slides.value[currentSlideIndex.value] || slides.value[0])

function nextSlide() {
  slideDirection.value = 'next'
  currentSlideIndex.value = (currentSlideIndex.value + 1) % slides.value.length
}

function prevSlide() {
  slideDirection.value = 'prev'
  currentSlideIndex.value =
    (currentSlideIndex.value - 1 + slides.value.length) % slides.value.length
}

function goToSlide(index) {
  if (index === currentSlideIndex.value) return
  slideDirection.value = index > currentSlideIndex.value ? 'next' : 'prev'
  currentSlideIndex.value = index
  resetTimer()
}

function startTimer() {
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    if (!isPaused.value && slides.value.length > 1) {
      nextSlide()
    }
  }, 6500)
}

function resetTimer() {
  startTimer()
}

function pauseTimer() {
  isPaused.value = true
}

function resumeTimer() {
  isPaused.value = false
}

function handleManualNext() {
  nextSlide()
  resetTimer()
}

function handleManualPrev() {
  prevSlide()
  resetTimer()
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})
</script>

<template>
  <section
    class="relative bg-navy-950 text-white min-h-[600px] sm:min-h-[660px] lg:min-h-[720px] flex items-center overflow-hidden pb-36 sm:pb-44 lg:pb-48 select-none"
    style="background-color: #081330;"
    @mouseenter="pauseTimer"
    @mouseleave="resumeTimer"
    @focusin="pauseTimer"
    @focusout="resumeTimer"
  >
    <!-- 1. Animated Full-bleed Photographic Background -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <Transition name="hero-bg" mode="out-in">
        <div :key="currentSlide.id" class="w-full h-full absolute inset-0">
          <ResponsiveImage
            :src="currentSlide.image"
            :alt="currentSlide.headline"
            loading="eager"
            fetchpriority="high"
            aspect-ratio="16/9"
            img-class="w-full h-full object-cover object-[30%_center] sm:object-center transform scale-105"
          />
        </div>
      </Transition>
    </div>

    <!-- 2. Clean Silky Gradient Overlay tailored for clinical elegance -->
    <div
      class="absolute inset-0 z-[1] transition-opacity duration-700"
      :class="currentSlide.layout === 'centered' ? 'opacity-90' : 'opacity-100'"
      style="background: linear-gradient(90deg, rgba(8, 20, 50, 0.45) 0%, rgba(18, 60, 150, 0.85) 38%, rgba(14, 38, 98, 0.98) 65%, rgba(8, 19, 48, 1) 100%);"
    />
    <!-- Subtle edge vignettes -->
    <div class="absolute inset-0 z-[2] bg-gradient-to-t from-navy-950/90 via-transparent to-navy-950/40 pointer-events-none" />

    <!-- 3. Navigation Controls (Chevrons) -->
    <button
      v-if="slides.length > 1"
      type="button"
      aria-label="Slide sebelumnya"
      class="cursor-pointer hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 bg-navy-950/50 hover:bg-white hover:text-navy-900 text-white items-center justify-center backdrop-blur-md transition-all duration-300 z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-xl hover:scale-105 active:scale-95"
      @click="handleManualPrev"
    >
      <ChevronLeft class="w-6 h-6 stroke-[2.5]" />
    </button>

    <button
      v-if="slides.length > 1"
      type="button"
      aria-label="Slide berikutnya"
      class="cursor-pointer hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 bg-navy-950/50 hover:bg-white hover:text-navy-900 text-white items-center justify-center backdrop-blur-md transition-all duration-300 z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-xl hover:scale-105 active:scale-95"
      @click="handleManualNext"
    >
      <ChevronRight class="w-6 h-6 stroke-[2.5]" />
    </button>

    <!-- 4. Hero Content Container -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 sm:pt-20 lg:pt-24 select-text">
      <Transition
        :name="slideDirection === 'next' ? 'slide-content-left' : 'slide-content-right'"
        mode="out-in"
      >
        <!-- LAYOUT 1: Brand Anchor & Clinic Overview (Layout Left / Standard) -->
        <div
          v-if="currentSlide.layout === 'left'"
          :key="currentSlide.id"
          class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          <!-- Spacer column: lets clinic operatory breathe on left -->
          <div class="hidden lg:block lg:col-span-5" />

          <!-- Content Column -->
          <div class="lg:col-span-7 relative">
            <!-- Decorative Tooth Watermark -->
            <div class="absolute -right-12 lg:-right-20 top-1/2 -translate-y-1/2 w-72 h-80 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] pointer-events-none select-none z-0 opacity-[0.07] transform rotate-6">
              <svg viewBox="0 0 200 240" fill="none" class="w-full h-full stroke-white" stroke-width="2">
                <path d="M50 20 C20 20, 10 60, 15 110 C20 150, 40 220, 65 220 C85 220, 85 170, 100 170 C115 170, 115 220, 135 220 C160 220, 180 150, 185 110 C190 60, 180 20, 150 20 C125 20, 112 45, 100 45 C88 45, 75 20, 50 20 Z" />
              </svg>
            </div>

            <div class="relative z-10 space-y-6 text-center lg:text-left">
              <!-- Big Bold Brand Heading & Headline -->
              <div class="space-y-2">
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                  {{ currentSlide.title }}
                  <span class="block text-2xl sm:text-3xl lg:text-4xl font-normal text-blue-200 mt-2 tracking-normal">
                    {{ currentSlide.subtitle }}
                  </span>
                </h1>
                <h2 class="text-lg sm:text-xl font-bold text-blue-100 tracking-tight pt-1">
                  {{ currentSlide.headline }}
                </h2>
              </div>

              <!-- Description -->
              <div class="max-w-xl mx-auto lg:mx-0">
                <p class="text-base sm:text-lg text-blue-100/90 leading-relaxed font-normal">
                  {{ currentSlide.description }}
                </p>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
                <Button
                  :to="currentSlide.ctaTo"
                  variant="white"
                  size="lg"
                  class="cursor-pointer w-full sm:w-auto rounded-full bg-white hover:bg-slate-100 text-primary-800 font-bold uppercase tracking-wider px-8 py-3.5 shadow-xl hover:shadow-2xl hover:scale-102 active:scale-100 transition-all border-none text-sm"
                >
                  <CalendarCheck class="w-4 h-4 mr-2 text-primary-600" aria-hidden="true" />
                  <span>{{ currentSlide.ctaText }}</span>
                </Button>

                <Button
                  :to="currentSlide.secondaryTo"
                  variant="ghost"
                  size="lg"
                  class="cursor-pointer w-full sm:w-auto rounded-full text-white hover:bg-white/10 border border-white/30 font-semibold px-6 py-3.5 transition-all text-sm"
                >
                  <Clock class="w-4 h-4 mr-2 text-blue-300" aria-hidden="true" />
                  <span>{{ currentSlide.secondaryText }}</span>
                </Button>
              </div>

              <!-- Trust Highlights Row -->
              <div class="pt-5 border-t border-white/15 flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-6 text-xs text-blue-100/80 font-medium">
                <div v-for="(h, idx) in currentSlide.highlights" :key="idx" class="flex items-center gap-1.5">
                  <CheckCircle2 class="w-4 h-4 text-primary-300 flex-shrink-0" />
                  <span>{{ h }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- LAYOUT 2: Friendly Family Focus & Compassionate Doctors (Layout Split / Card Highlight) -->
        <div
          v-else-if="currentSlide.layout === 'split'"
          :key="currentSlide.id"
          class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          <!-- Left Content: Warm, Empathetic Family Message -->
          <div class="lg:col-span-8 space-y-6 text-center lg:text-left">
            <!-- Badge Pill -->
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm">
              <HeartHandshake class="w-4 h-4 text-blue-300" />
              <span>{{ currentSlide.badge }}</span>
            </div>

            <!-- Big Emotional Headline -->
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-2xl mx-auto lg:mx-0">
              {{ currentSlide.headline }}
            </h1>

            <!-- Description -->
            <p class="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              {{ currentSlide.description }}
            </p>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                :to="currentSlide.ctaTo"
                variant="white"
                size="lg"
                class="cursor-pointer w-full sm:w-auto rounded-full bg-white hover:bg-slate-100 text-primary-800 font-bold uppercase tracking-wider px-8 py-3.5 shadow-xl hover:shadow-2xl hover:scale-102 active:scale-100 transition-all border-none text-sm"
              >
                <Users class="w-4 h-4 mr-2 text-primary-600" aria-hidden="true" />
                <span>{{ currentSlide.ctaText }}</span>
              </Button>

              <Button
                :to="currentSlide.secondaryTo"
                variant="ghost"
                size="lg"
                class="cursor-pointer w-full sm:w-auto rounded-full text-white hover:bg-white/10 border border-white/30 font-semibold px-6 py-3.5 transition-all text-sm"
              >
                <span>{{ currentSlide.secondaryText }}</span>
              </Button>
            </div>
          </div>

          <!-- Right Feature Box: Highlight Cards Stack -->
          <div class="lg:col-span-4 flex flex-col gap-3.5 max-w-md mx-auto lg:mx-0 w-full">
            <div
              v-for="(h, idx) in currentSlide.highlights"
              :key="idx"
              class="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3.5 shadow-lg transform hover:-translate-y-0.5 transition-transform"
            >
              <div class="w-10 h-10 rounded-xl bg-primary-500/30 flex items-center justify-center flex-shrink-0 text-white">
                <CheckCircle2 class="w-5 h-5 text-primary-300" />
              </div>
              <div>
                <p class="text-sm font-bold text-white">{{ h }}</p>
                <p class="text-xs text-blue-200/80">Kenyamanan &amp; empati untuk Anda</p>
              </div>
            </div>
          </div>
        </div>

        <!-- LAYOUT 3: Modern Precision Technology & Medical Hygiene (Layout Centered / Modern Tech) -->
        <div
          v-else-if="currentSlide.layout === 'centered'"
          :key="currentSlide.id"
          class="max-w-4xl mx-auto text-center space-y-7"
        >
          <!-- Badge Pill -->
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/25 border border-primary-300/40 text-blue-100 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm shadow-inner">
            <Cpu class="w-4 h-4 text-primary-300" />
            <span>{{ currentSlide.badge }}</span>
          </div>

          <!-- Headline -->
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
            {{ currentSlide.headline }}
          </h1>

          <!-- Description -->
          <p class="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-2xl mx-auto font-normal">
            {{ currentSlide.description }}
          </p>

          <!-- 3 Tech Pillar Badges -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-2xl mx-auto pt-2">
            <div
              v-for="(h, idx) in currentSlide.highlights"
              :key="idx"
              class="py-3 px-4 rounded-xl bg-navy-900/60 backdrop-blur-md border border-white/15 text-center shadow-md"
            >
              <div class="flex items-center justify-center gap-2 text-primary-300 mb-1">
                <Sparkles class="w-4 h-4" />
                <span class="text-xs font-bold uppercase tracking-wider text-white">Standar Klinik</span>
              </div>
              <p class="text-xs sm:text-sm font-semibold text-blue-100">{{ h }}</p>
            </div>
          </div>

          <!-- Action Buttons Centered -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <Button
              :to="currentSlide.ctaTo"
              variant="white"
              size="lg"
              class="cursor-pointer w-full sm:w-auto rounded-full bg-white hover:bg-slate-100 text-primary-800 font-bold uppercase tracking-wider px-8 py-3.5 shadow-xl hover:shadow-2xl hover:scale-102 active:scale-100 transition-all border-none text-sm"
            >
              <CalendarCheck class="w-4 h-4 mr-2 text-primary-600" aria-hidden="true" />
              <span>{{ currentSlide.ctaText }}</span>
            </Button>

            <Button
              :to="currentSlide.secondaryTo"
              variant="ghost"
              size="lg"
              class="cursor-pointer w-full sm:w-auto rounded-full text-white hover:bg-white/10 border border-white/30 font-semibold px-6 py-3.5 transition-all text-sm"
            >
              <Clock class="w-4 h-4 mr-2 text-blue-300" aria-hidden="true" />
              <span>{{ currentSlide.secondaryText }}</span>
            </Button>
          </div>
        </div>
      </Transition>
    </div>

    <!-- 5. Slider Dots Navigation -->
    <div
      v-if="slides.length > 1"
      class="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5"
      role="tablist"
      aria-label="Navigasi slide utama"
    >
      <button
        v-for="(s, sIdx) in slides"
        :key="s.id"
        type="button"
        role="tab"
        :aria-selected="currentSlideIndex === sIdx"
        :aria-label="`Buka slide ${sIdx + 1}: ${s.headline}`"
        class="cursor-pointer h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        :class="currentSlideIndex === sIdx ? 'w-8 bg-white shadow-md' : 'w-2.5 bg-white/40 hover:bg-white/70'"
        @click="goToSlide(sIdx)"
      />
    </div>
  </section>
</template>

<style scoped>
/* Background Crossfade & Subtle Zoom */
.hero-bg-enter-active,
.hero-bg-leave-active {
  transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
}
.hero-bg-enter-from {
  opacity: 0;
  transform: scale(1.02);
}
.hero-bg-leave-to {
  opacity: 0;
  transform: scale(1);
}

/* Content Slide Next */
.slide-content-left-enter-active,
.slide-content-left-leave-active,
.slide-content-right-enter-active,
.slide-content-right-leave-active {
  transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-content-left-enter-from {
  opacity: 0;
  transform: translateX(36px);
}
.slide-content-left-leave-to {
  opacity: 0;
  transform: translateX(-36px);
}

/* Content Slide Prev */
.slide-content-right-enter-from {
  opacity: 0;
  transform: translateX(-36px);
}
.slide-content-right-leave-to {
  opacity: 0;
  transform: translateX(36px);
}

@media (prefers-reduced-motion: reduce) {
  .hero-bg-enter-active,
  .hero-bg-leave-active,
  .slide-content-left-enter-active,
  .slide-content-left-leave-active,
  .slide-content-right-enter-active,
  .slide-content-right-leave-active {
    transition: opacity 0.2s ease !important;
    transform: none !important;
  }
}
</style>
