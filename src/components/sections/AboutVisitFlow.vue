<script setup>
import {
  CalendarCheck,
  ClipboardList,
  Stethoscope,
  Sparkles,
  HeartHandshake,
} from 'lucide-vue-next'
import clinicData from '@/data/clinic.json'

const stepIcons = [
  CalendarCheck,
  ClipboardList,
  Stethoscope,
  Sparkles,
  HeartHandshake,
]

const visitSteps = clinicData.about.visitSteps
</script>

<template>
  <section class="py-16 sm:py-24 bg-surface-100 border-y border-slate-200/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span class="text-xs font-bold uppercase tracking-wider text-primary-600">
          Pengalaman Nyaman & Praktis
        </span>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight">
          Alur Kunjungan Pasien
        </h2>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
          Lima langkah terstruktur dari awal kedatangan hingga selesai perawatan untuk kenyamanan maksimal Anda.
        </p>
      </div>

      <!-- 5-Step Flow Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div
          v-for="(step, idx) in visitSteps"
          :key="step.number"
          class="relative bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between group hover:border-primary-300 hover:shadow-md transition-all duration-200"
        >
          <!-- Top Step Badge & Icon -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-extrabold text-sm flex items-center justify-center">
                0{{ step.number }}
              </span>
              <div class="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                <component
                  :is="stepIcons[idx] || CalendarCheck"
                  class="w-5 h-5"
                  aria-hidden="true"
                />
              </div>
            </div>

            <!-- Title & Description -->
            <div class="space-y-2">
              <h3 class="text-base font-bold text-navy-900 group-hover:text-primary-700 transition-colors">
                {{ step.title }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
