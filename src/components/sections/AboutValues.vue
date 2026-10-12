<script setup>
import {
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Clock,
  Smile,
  Users,
} from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import clinicData from '@/data/clinic.json'

const iconMap = {
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Clock,
  Smile,
  Users,
}

const values = clinicData.about.values
</script>

<template>
  <section class="py-16 sm:py-24 bg-surface-100 border-y border-slate-200/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span class="text-xs font-bold uppercase tracking-wider text-primary-600">
          Standar & Dedikasi
        </span>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight">
          Nilai Layanan Kami
        </h2>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
          Enam prinsip fundamental yang kami jaga dalam setiap interaksi dan tindakan medis.
        </p>
      </div>

      <!-- Values Grid (6 Cards) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <Card
          v-for="(val, idx) in values"
          :key="idx"
          :hoverable="true"
          class="flex flex-col p-6 sm:p-7 h-full group bg-white border border-slate-200/80 hover:border-primary-200"
        >
          <div class="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-200">
            <component
              :is="iconMap[val.icon] || Sparkles"
              class="w-6 h-6"
              aria-hidden="true"
            />
          </div>

          <h3 class="text-lg font-bold text-navy-900 mb-2 group-hover:text-primary-700 transition-colors">
            {{ val.title }}
          </h3>

          <p class="text-sm text-slate-600 leading-relaxed">
            {{ val.description }}
          </p>
        </Card>
      </div>
    </div>
  </section>
</template>
