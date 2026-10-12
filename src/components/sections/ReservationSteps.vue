<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
  CalendarCheck,
  ArrowRight,
  ClipboardList,
  UserCheck,
  CalendarClock,
  ShieldCheck,
} from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import homeData from '@/data/home.json'

const { reservationSteps } = homeData

const stepsWithMeta = computed(() => {
  const meta = [
    {
      icon: ClipboardList,
      actionText: 'Lihat Pilihan Layanan',
      to: '/layanan',
    },
    {
      icon: UserCheck,
      actionText: 'Kenali Dokter Spesialis',
      to: '/dokter',
    },
    {
      icon: CalendarClock,
      actionText: 'Cek Jadwal Praktek',
      to: '/jadwal',
    },
    {
      icon: ShieldCheck,
      actionText: 'Buat Reservasi Sekarang',
      to: '/reservasi',
    },
  ]

  return reservationSteps.map((step, idx) => ({
    ...step,
    ...(meta[idx] || meta[0]),
  }))
})
</script>

<template>
  <section class="py-16 sm:py-24 bg-surface-100 border-y border-slate-200/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
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

      <!-- 4 Steps Grid with Medcity Style & Rich Hover Animations (FR-2.5) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <RouterLink
          v-for="(step, index) in stepsWithMeta"
          :key="step.number"
          :to="step.to"
          class="group relative bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-2xl hover:-translate-y-2.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
          :class="index === 0 ? 'border-l-4 border-l-primary-500' : 'hover:border-l-4 hover:border-l-primary-500'"
        >
          <!-- Top Row: Icon on Left, Big Translucent Number on Right -->
          <div class="flex items-center justify-between mb-6">
            <div
              class="w-13 h-13 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center p-3 border border-primary-100 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xs"
            >
              <component :is="step.icon" class="w-6 h-6 stroke-[2.2]" aria-hidden="true" />
            </div>

            <span
              class="text-5xl sm:text-6xl font-black text-slate-200 group-hover:text-primary-200 transition-colors duration-300 select-none tracking-tighter"
            >
              0{{ step.number }}
            </span>
          </div>

          <!-- Content: Title and Description -->
          <div class="space-y-2.5 mb-6 flex-1">
            <h3 class="text-base sm:text-lg font-bold text-navy-900 group-hover:text-primary-700 transition-colors duration-200 leading-snug">
              {{ step.title }}
            </h3>
            <p class="text-xs sm:text-sm text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors duration-200">
              {{ step.description }}
            </p>
          </div>

          <!-- Bottom Action Link with Animated Arrow -->
          <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-navy-900 group-hover:text-primary-600 transition-colors duration-200">
            <span>{{ step.actionText }}</span>
            <ArrowRight class="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200" aria-hidden="true" />
          </div>
        </RouterLink>
      </div>

      <!-- CTA Bottom -->
      <div class="mt-12 text-center">
        <Button to="/reservasi" variant="primary" size="lg" class="rounded-full shadow-md hover:shadow-xl hover:scale-102 transition-all font-semibold">
          <CalendarCheck class="w-5 h-5 mr-2" aria-hidden="true" />
          <span>Mulai Buat Reservasi Sekarang</span>
        </Button>
      </div>
    </div>
  </section>
</template>
