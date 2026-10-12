<script setup>
import { RouterLink } from 'vue-router'
import { CalendarCheck, Clock, Sparkles } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import homeData from '@/data/home.json'

const { hero } = homeData
</script>

<template>
  <section class="relative bg-gradient-to-b from-primary-50/50 via-white to-surface-50 pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Text Column -->
        <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100/80 border border-primary-200/80 text-navy-900 text-xs font-semibold tracking-wide shadow-sm">
            <Sparkles class="w-3.5 h-3.5 text-primary-600" aria-hidden="true" />
            <span>Klinik Gigi Ramah & Terpercaya di Jakarta</span>
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-[1.18]">
            {{ hero.headline }}
          </h1>

          <p class="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {{ hero.subheadline }}
          </p>

          <!-- 2 CTA Buttons (FR-2.1) -->
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
            <Button
              to="/reservasi"
              variant="primary"
              size="lg"
              class="w-full sm:w-auto shadow-md hover:shadow-lg font-semibold"
            >
              <CalendarCheck class="w-5 h-5 mr-2" aria-hidden="true" />
              Buat Reservasi Online
            </Button>
            <Button
              to="/jadwal"
              variant="outline"
              size="lg"
              class="w-full sm:w-auto font-semibold hover:border-primary-400 hover:text-primary-700"
            >
              <Clock class="w-5 h-5 mr-2" aria-hidden="true" />
              Lihat Jadwal Praktek
            </Button>
          </div>

          <!-- Trust Badges -->
          <div class="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Jadwal Terstruktur & Bebas Antre</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-primary-500"></span>
              <span>Dokter Spesialis Berpengalaman</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-navy-600"></span>
              <span>Standar Sterilisasi Medis Tinggi</span>
            </div>
          </div>
        </div>

        <!-- Image Column (LCP with loading="eager" and fetchpriority="high") -->
        <div class="lg:col-span-5 relative">
          <div class="relative mx-auto max-w-md lg:max-w-none">
            <!-- Decorative backdrop glow -->
            <div class="absolute -inset-4 bg-gradient-to-tr from-primary-200/50 to-navy-200/30 rounded-3xl blur-2xl -z-10" />

            <div class="rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white aspect-[4/3] sm:aspect-[16/11]">
              <ResponsiveImage
                :src="hero.image"
                alt="Fasilitas dan pelayanan ramah Candraloka Dental Care"
                loading="eager"
                fetchpriority="high"
                aspect-ratio="16/11"
                img-class="hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
