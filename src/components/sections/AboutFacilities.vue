<script setup>
import { computed } from 'vue'
import clinicData from '@/data/clinic.json'
import { useI18n } from '@/composables/useI18n'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'

const { isEnglish } = useI18n()

const englishFacilities = [
  {
    title: 'Ergonomic Treatment Suites',
    image: '/images/facilities/ruang-perawatan.webp',
    caption: 'Modern dental units featuring eye-friendly surgical lighting and ergonomic patient seating.',
  },
  {
    title: 'Serene & Comfortable Waiting Lounge',
    image: '/images/facilities/ruang-tunggu.webp',
    caption: 'Air-conditioned atmosphere, relaxing ambient music, refreshments, and informative reading.',
  },
  {
    title: 'Medical-Grade Instrument Sterilization',
    image: '/images/facilities/sterilisasi.webp',
    caption: 'High-pressure autoclave sterilization with individually sealed sterile instrument pouches.',
  },
  {
    title: 'Child-Friendly Corner',
    image: '/images/facilities/ruang-anak.webp',
    caption: 'Playful area with educational toys to help children feel relaxed and calm prior to examination.',
  },
]

const facilities = computed(() => isEnglish.value ? englishFacilities : clinicData.about.facilities)
</script>

<template>
  <section class="py-16 sm:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span class="text-xs font-bold uppercase tracking-wider text-primary-600 block">
          {{ isEnglish ? 'Comfort & Hygiene' : 'Kenyamanan & Kebersihan' }}
        </span>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
          {{ isEnglish ? 'Modern & Hygienic Clinic Facilities' : 'Fasilitas Klinik Modern & Higienis' }}
        </h2>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
          {{
            isEnglish
              ? 'Ergonomic treatment suites, medical-grade sterilized instruments, and a family-friendly waiting environment.'
              : 'Ruang perawatan ergonomis, instrumen steril bertaraf medis, dan area tunggu yang ramah bagi seluruh keluarga.'
          }}
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
