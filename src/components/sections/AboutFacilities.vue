<script setup>
import clinicData from '@/data/clinic.json'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import { Sparkles } from 'lucide-vue-next'

const facilities = clinicData.about.facilities
</script>

<template>
  <section class="py-16 sm:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span class="text-xs font-bold uppercase tracking-wider text-primary-600 block">
          Kenyamanan & Kebersihan
        </span>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
          Fasilitas Klinik Modern & Higienis
        </h2>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
          Ruang perawatan ergonomis, instrumen steril bertaraf medis, dan area tunggu yang ramah bagi seluruh keluarga.
        </p>
      </div>

      <!-- Facilities Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div
          v-for="(facility, idx) in facilities"
          :key="idx"
          class="group overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-card-hover hover:border-primary-300 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
        >
          <div class="relative aspect-[16/10] overflow-hidden bg-slate-100">
            <ResponsiveImage
              :src="facility.image"
              :alt="facility.title"
              aspect-ratio="16/10"
              img-class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute top-4 right-4 bg-navy-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white flex items-center gap-1.5 shadow-md">
              <Sparkles class="w-3 h-3 text-primary-400" aria-hidden="true" />
              <span>Fasilitas Terstandarisasi</span>
            </div>
          </div>

          <div class="p-6 sm:p-7 flex-1 flex flex-col justify-between">
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-navy-900 group-hover:text-primary-700 transition-colors">
                {{ facility.title }}
              </h3>
              <p class="text-sm text-slate-600 leading-relaxed">
                {{ facility.caption }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
