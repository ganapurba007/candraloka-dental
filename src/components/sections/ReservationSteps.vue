<script setup>
import { RouterLink } from 'vue-router'
import { CalendarCheck, ArrowRight } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import homeData from '@/data/home.json'

const { reservationSteps } = homeData
</script>

<template>
  <section class="py-16 sm:py-24 bg-surface-100 border-y border-slate-200/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span class="text-xs font-bold uppercase tracking-wider text-primary-600">
          Alur Mudah & Praktis
        </span>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight">
          Reservasi Online dalam 4 Langkah
        </h2>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
          Pilih jadwal yang cocok langsung dari smartphone Anda tanpa perlu antre di klinik.
        </p>
      </div>

      <!-- 4 Steps Grid (FR-2.5) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <div
          v-for="(step, index) in reservationSteps"
          :key="step.number"
          class="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-card flex flex-col justify-between hover:shadow-card-hover transition-all group"
        >
          <!-- Top badge -->
          <div class="flex items-center justify-between mb-4">
            <span class="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors flex items-center justify-center font-bold text-sm border border-primary-100">
              0{{ step.number }}
            </span>
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Tahap {{ step.number }}
            </span>
          </div>

          <div class="space-y-2 flex-1">
            <h3 class="text-base font-bold text-navy-900 group-hover:text-primary-700 transition-colors">
              {{ step.title }}
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- CTA Bottom -->
      <div class="mt-12 text-center">
        <Button to="/reservasi" variant="primary" size="lg" class="shadow-md font-semibold">
          <CalendarCheck class="w-5 h-5 mr-2" aria-hidden="true" />
          <span>Mulai Buat Reservasi Sekarang</span>
        </Button>
      </div>
    </div>
  </section>
</template>
