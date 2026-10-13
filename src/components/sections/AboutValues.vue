<script setup>
import { RouterLink } from 'vue-router'
import {
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Clock,
  Smile,
  Users,
  ArrowRight,
} from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
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
  <section class="py-16 sm:py-24 bg-surface-100 border-y border-slate-200/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Medcity 2-Column Heading Layout (features-layout1) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-14">
        <div class="lg:col-span-6 space-y-3">
          <span class="text-xs font-bold uppercase tracking-wider text-primary-600 block">
            Nilai Layanan Kami
          </span>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
            Memberikan Pelayanan Medis Gigi Terbaik untuk Senyum Anda.
          </h2>
        </div>

        <div class="lg:col-span-6 space-y-5">
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
            Candraloka Dental Care menerapkan protokol kebersihan ketat, komunikasi yang terbuka, dan teknik perawatan modern untuk memastikan kunjungan klinik Anda senantiasa aman, nyaman, dan memuaskan.
          </p>

          <div class="flex flex-wrap items-center gap-4">
            <Button
              to="/reservasi"
              variant="primary"
              size="md"
              class="font-semibold shadow-md hover:-translate-y-0.5 transition-all"
            >
              <span>Buat Reservasi Sekarang</span>
              <ArrowRight class="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>

            <RouterLink
              to="/layanan"
              class="inline-flex items-center gap-2 text-sm font-bold text-navy-900 hover:text-primary-600 transition-colors"
            >
              <div class="w-8 h-8 rounded-full bg-white border border-slate-200 text-primary-600 flex items-center justify-center shadow-sm">
                <ArrowRight class="w-4 h-4" aria-hidden="true" />
              </div>
              <span>Jelajahi Layanan</span>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Medcity Feature Items Grid (6 Cards) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div
          v-for="(val, idx) in values"
          :key="idx"
          class="group relative bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-card-hover hover:-translate-y-1.5 hover:border-primary-300 transition-all duration-300 flex flex-col justify-between"
        >
          <div class="space-y-4">
            <!-- Icon Container -->
            <div class="flex items-center justify-between">
              <div class="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <component
                  :is={...iconMap}[val.icon] || Sparkles
                  class="w-7 h-7"
                  aria-hidden="true"
                />
              </div>

              <!-- Medcity styled corner arrow icon -->
              <div class="w-8 h-8 rounded-full border border-slate-200 text-slate-400 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200">
                <ArrowRight class="w-4 h-4" aria-hidden="true" />
              </div>
            </div>

            <!-- Title & Description -->
            <div class="space-y-2 pt-2">
              <h3 class="text-lg font-bold text-navy-900 group-hover:text-primary-700 transition-colors">
                {{ val.title }}
              </h3>
              <p class="text-sm text-slate-600 leading-relaxed">
                {{ val.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Medcity Bottom Row Note -->
      <div class="mt-14 text-center max-w-2xl mx-auto">
        <p class="text-sm text-slate-600">
          Mengabdi untuk senyum sehat dan rasa percaya diri keluarga Anda.
          <RouterLink to="/jadwal" class="text-primary-700 hover:text-primary-800 font-bold ml-1 inline-flex items-center gap-1">
            <span>Pelajari selengkapnya tentang jadwal & layanan kami</span>
            <ArrowRight class="w-3.5 h-3.5" aria-hidden="true" />
          </RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>
