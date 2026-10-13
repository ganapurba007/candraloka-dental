<script setup>
import {
  HeartHandshake,
  ShieldCheck,
  Cpu,
  Clock,
  Smile,
  Users,
} from 'lucide-vue-next'
import clinicData from '@/data/clinic.json'

const iconMap = {
  HeartHandshake,
  ShieldCheck,
  Cpu,
  Clock,
  Smile,
  Users,
}

const values = clinicData.about.values
</script>

<template>
  <section class="py-14 sm:py-20 lg:py-24 bg-surface-100 border-y border-slate-200/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Heading -->
      <div class="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <span class="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-100/70 border border-primary-200/60">
          Nilai Layanan Kami
        </span>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
          Memberikan Pelayanan Medis Gigi Terbaik untuk Senyum Anda.
        </h2>
      </div>

      <!-- Feature Items Grid (6 Cards) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
        <div
          v-for="(val, idx) in values"
          :key="idx"
          class="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:border-primary-300 transition-all duration-300 flex flex-col justify-between"
        >
          <div class="space-y-4">
            <!-- Icon Container -->
            <div class="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-xs">
              <component
                :is="{...iconMap}[val.icon] || HeartHandshake"
                class="w-6 h-6"
                aria-hidden="true"
              />
            </div>

            <!-- Title & Description -->
            <div class="space-y-2">
              <h3 class="text-base sm:text-lg font-bold text-navy-900 group-hover:text-primary-700 transition-colors">
                {{ val.title }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {{ val.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
