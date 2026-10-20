<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import testimonialsData from '@/data/testimonials.json'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import { useI18n } from '@/composables/useI18n'

const { isEnglish } = useI18n()

const testimonialsTranslations = {
  1: {
    service: 'Dental Scaling & Polishing',
    quote: 'The scaling procedure at Candraloka was very gentle and comfortable. The dentist was extremely meticulous and careful. The clinic is clean, modern, and very relaxing.',
  },
  2: {
    service: 'Orthodontic Braces Care',
    quote: 'The dentist thoroughly explained my entire braces treatment roadmap. Control visits are always strictly on-schedule without long waiting times.',
  },
  3: {
    service: 'Composite Dental Filling',
    quote: 'The filling matches my natural tooth color seamlessly. I no longer feel any pain or sensitivity when enjoying cold drinks or meals.',
  },
  4: {
    service: 'Pediatric Dental Care',
    quote: 'My child, who usually gets anxious at dental visits, was completely calm and happy thanks to the warm and communicative doctor.',
  },
}

// Auto-sliding Testimonials Carousel (FR-2.7)
const currentIndex = ref(0)
const slideDirection = ref('next')
const isPaused = ref(false)
let timer = null

const totalSlides = testimonialsData.length
const currentTestimonial = computed(() => {
  const item = testimonialsData[currentIndex.value]
  if (!item) return {}
  if (isEnglish.value && testimonialsTranslations[item.id]) {
    return {
      ...item,
      service: testimonialsTranslations[item.id].service,
      quote: testimonialsTranslations[item.id].quote,
    }
  }
  return item
})

function nextSlide() {
  slideDirection.value = 'next'
  currentIndex.value = (currentIndex.value + 1) % totalSlides
}

function prevSlide() {
  slideDirection.value = 'prev'
  currentIndex.value = (currentIndex.value - 1 + totalSlides) % totalSlides
}

function goToSlide(index) {
  if (index === currentIndex.value) return
  slideDirection.value = index > currentIndex.value ? 'next' : 'prev'
  currentIndex.value = index
  resetTimer()
}

function startTimer() {
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    if (!isPaused.value) {
      nextSlide()
    }
  }, 5000)
}

function resetTimer() {
  startTimer()
}

function pauseAutoSlide() {
  isPaused.value = true
}

function resumeAutoSlide() {
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
  <section class="py-16 sm:py-24 bg-surface-50 border-t border-slate-200/60 relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-100/40 rounded-full blur-3xl pointer-events-none" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
        <span class="text-xs font-bold uppercase tracking-wider text-primary-600">
          {{ isEnglish ? 'Patient Testimonials' : 'Ulasan Pasien' }}
        </span>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight">
          {{ isEnglish ? 'What Patients Say About Us' : 'Apa Kata Mereka Tentang Kami' }}
        </h2>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
          {{ isEnglish ? 'Real patient experiences who trusted their healthy smiles to Candraloka Dental Care.' : 'Pengalaman nyata pasien yang telah mempercayakan senyum sehat mereka di Candraloka Dental Care.' }}
        </p>
      </div>

      <!-- Carousel Wrapper -->
      <div
        class="max-w-4xl mx-auto relative"
        @mouseenter="pauseAutoSlide"
        @mouseleave="resumeAutoSlide"
        @focusin="pauseAutoSlide"
        @focusout="resumeAutoSlide"
      >
        <!-- Featured Testimonial Card -->
        <div class="relative bg-white rounded-3xl border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300 py-8 px-10 sm:py-12 sm:px-16 md:py-14 md:px-20 overflow-hidden min-h-[380px] sm:min-h-[360px] flex flex-col justify-center items-center">
          <!-- Background Quote Watermark -->
          <Quote
            class="absolute top-4 right-6 sm:top-8 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 text-slate-100/70 rotate-180 pointer-events-none select-none"
            aria-hidden="true"
          />

          <!-- Slide Content Transition -->
          <Transition
            :name="slideDirection === 'next' ? 'slide-left' : 'slide-right'"
            mode="out-in"
          >
            <div
              :key="currentTestimonial.id"
              class="w-full flex flex-col items-center text-center space-y-6 sm:space-y-8 relative z-10"
            >
              <!-- 5 Stars Rating -->
              <div class="flex items-center text-amber-400 gap-1.5 justify-center">
                <Star
                  v-for="i in 5"
                  :key="i"
                  class="w-5 h-5 fill-current filter drop-shadow-sm"
                  aria-hidden="true"
                />
              </div>

              <!-- Testimonial Quote -->
              <blockquote class="max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 font-medium leading-relaxed italic">
                &ldquo;{{ currentTestimonial.quote }}&rdquo;
              </blockquote>

              <!-- Patient Profile -->
              <div class="flex flex-col items-center gap-3 pt-2">
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-primary-500 shadow-md ring-4 ring-primary-50 bg-slate-100 flex-shrink-0">
                  <ResponsiveImage
                    :src="currentTestimonial.avatar"
                    :alt="currentTestimonial.name"
                    aspect-ratio="1/1"
                  />
                </div>
                <div class="space-y-1">
                  <p class="text-base sm:text-lg font-bold text-navy-900 leading-snug">
                    {{ currentTestimonial.name }}
                  </p>
                  <span class="inline-flex items-center text-xs sm:text-sm font-semibold text-primary-700 bg-primary-50 px-3.5 py-1 rounded-full border border-primary-100/80">
                    {{ currentTestimonial.service }}
                  </span>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Left / Right Navigation Chevrons -->
        <button
          type="button"
          class="cursor-pointer absolute left-1 sm:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-lg text-slate-700 hover:text-primary-600 hover:bg-white hover:border-primary-300 hover:scale-105 active:scale-95 transition-all flex items-center justify-center z-20 focus:outline-none focus:ring-2 focus:ring-primary-500"
          :aria-label="isEnglish ? 'Previous testimonial' : 'Ulasan sebelumnya'"
          @click="handleManualPrev"
        >
          <ChevronLeft class="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
        </button>

        <button
          type="button"
          class="cursor-pointer absolute right-1 sm:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-lg text-slate-700 hover:text-primary-600 hover:bg-white hover:border-primary-300 hover:scale-105 active:scale-95 transition-all flex items-center justify-center z-20 focus:outline-none focus:ring-2 focus:ring-primary-500"
          :aria-label="isEnglish ? 'Next testimonial' : 'Ulasan berikutnya'"
          @click="handleManualNext"
        >
          <ChevronRight class="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
        </button>

        <!-- Pagination Dots -->
        <div class="flex items-center justify-center gap-2 mt-8" role="tablist" :aria-label="isEnglish ? 'Testimonials navigation' : 'Navigasi ulasan'">
          <button
            v-for="(item, index) in testimonialsData"
            :key="item.id"
            type="button"
            role="tab"
            :aria-selected="currentIndex === index"
            :aria-label="`${isEnglish ? 'Testimonial' : 'Ulasan'} ${index + 1}: ${item.name}`"
            class="cursor-pointer transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            :class="[
              currentIndex === index
                ? 'w-8 h-2.5 bg-primary-600 shadow-sm'
                : 'w-2.5 h-2.5 bg-slate-300 hover:bg-primary-300'
            ]"
            @click="goToSlide(index)"
          />
        </div>
      </div>

      <!-- Medcity Rating Summary Badge (testimonials__rating) -->
      <div class="mt-12 max-w-md mx-auto bg-white rounded-full py-3.5 px-7 border border-slate-200/90 shadow-md flex items-center justify-center gap-4">
        <span class="text-2xl font-black text-navy-900">4.9</span>
        <div class="text-left text-xs">
          <div class="flex items-center text-amber-400 gap-0.5">
            <Star v-for="i in 5" :key="i" class="w-3.5 h-3.5 fill-current" aria-hidden="true" />
          </div>
          <span class="text-slate-500 font-medium">{{ isEnglish ? 'Patient Satisfaction & Positive Reviews' : 'Tingkat Kepuasan & Ulasan Positif Pasien' }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Slide Left Animation */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(32px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-32px);
}

/* Slide Right Animation */
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-32px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(32px);
}

@media (prefers-reduced-motion: reduce) {
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: opacity 0.2s ease;
    transform: none !important;
  }
}
</style>
