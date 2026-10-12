<script setup>
import clinicData from '@/data/clinic.json'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import Card from '@/components/ui/Card.vue'

const facilities = clinicData.about.facilities
</script>

<template>
  <section class="py-16 sm:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span class="text-xs font-bold uppercase tracking-wider text-primary-600">
          Kenyamanan & Kebersihan
        </span>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight">
          Fasilitas Klinik Modern
        </h2>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
          Ruang perawatan higienis, alat steril bertaraf medis, dan area tunggu yang ramah keluarga.
        </p>
      </div>

      <!-- Facilities Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Card
          v-for="(facility, idx) in facilities"
          :key="idx"
          :hoverable="true"
          padding="none"
          class="group overflow-hidden rounded-2xl flex flex-col h-full border border-slate-200/80 hover:border-primary-200"
        >
          <div class="relative aspect-[16/9] overflow-hidden bg-slate-100">
            <ResponsiveImage
              :src="facility.image"
              :alt="facility.title"
              aspect-ratio="16/9"
              img-class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div class="p-6 flex-1 flex flex-col justify-between">
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-navy-900 group-hover:text-primary-700 transition-colors">
                {{ facility.title }}
              </h3>
              <p class="text-sm text-slate-600 leading-relaxed">
                {{ facility.caption }}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>
