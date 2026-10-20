<script setup>
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import AboutHeader from '@/components/sections/AboutHeader.vue'
import AboutStory from '@/components/sections/AboutStory.vue'
import AboutValues from '@/components/sections/AboutValues.vue'
import AboutFacilities from '@/components/sections/AboutFacilities.vue'
import AboutVisitFlow from '@/components/sections/AboutVisitFlow.vue'
import FeaturedDoctors from '@/components/sections/FeaturedDoctors.vue'
import { useClinic } from '@/composables/useClinic'
import { useI18n } from '@/composables/useI18n'

const { clinic } = useClinic()
const { isEnglish } = useI18n()

useHead({
  title: computed(() => isEnglish.value ? `About Us | ${clinic.value.name}` : `Tentang Kami | ${clinic.value.name}`),
})
</script>

<template>
  <div class="flex-1 flex flex-col">

    <!-- FR-3.1: Header -->
    <AboutHeader />

    <!-- FR-3.2: Profil Klinik, Visi & Misi -->
    <AboutStory />

    <!-- FR-3.3: Nilai Layanan -->
    <AboutValues />

    <!-- FR-3.4: Fasilitas Klinik -->
    <AboutFacilities />

    <!-- FR-3.5: Alur Kunjungan Pasien -->
    <AboutVisitFlow />

    <!-- FR-3.6: Tim Dokter Ringkas -->
    <FeaturedDoctors
      badge="Tim Dokter Berpengalaman"
      title="Tenaga Medis Berdedikasi"
      description="Didukung dokter gigi umum dan spesialis yang siap memberikan perawatan terbaik dengan komunikasi yang jelas."
    />
  </div>
</template>
