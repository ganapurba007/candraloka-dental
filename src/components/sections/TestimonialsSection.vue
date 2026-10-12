<script setup>
import { computed } from 'vue'
import { Star, Quote } from 'lucide-vue-next'
import testimonialsData from '@/data/testimonials.json'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'

// 3 Testimonials (FR-2.7)
const testimonials = computed(() => testimonialsData.slice(0, 3))
</script>

<template>
  <section class="py-16 sm:py-24 bg-surface-50 border-t border-slate-200/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span class="text-xs font-bold uppercase tracking-wider text-primary-600">
          Ulasan Pasien
        </span>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight">
          Apa Kata Mereka Tentang Kami
        </h2>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
          Pengalaman nyata pasien yang telah mempercayakan senyum sehat mereka di Candraloka Dental Care.
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="item in testimonials"
          :key="item.id"
          class="bg-white p-7 rounded-2xl border border-slate-100 shadow-card flex flex-col justify-between hover:shadow-card-hover transition-all"
        >
          <div class="space-y-4">
            <!-- 5 Stars & Quote Icon -->
            <div class="flex items-center justify-between">
              <div class="flex items-center text-amber-400 gap-1">
                <Star v-for="i in 5" :key="i" class="w-4 h-4 fill-current" aria-hidden="true" />
              </div>
              <Quote class="w-6 h-6 text-slate-200" aria-hidden="true" />
            </div>

            <p class="text-sm text-slate-700 italic leading-relaxed">
              "{{ item.quote }}"
            </p>
          </div>

          <!-- Patient Profile -->
          <div class="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-full overflow-hidden border border-slate-200 flex-shrink-0 bg-slate-100">
              <ResponsiveImage
                :src="item.avatar"
                :alt="item.name"
                aspect-ratio="1/1"
              />
            </div>
            <div>
              <p class="text-sm font-bold text-navy-900 leading-snug">
                {{ item.name }}
              </p>
              <p class="text-xs text-primary-600 font-medium">
                {{ item.service }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
