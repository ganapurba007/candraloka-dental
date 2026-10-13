<script setup>
import { useHead } from '@unhead/vue'
import AboutHeader from '@/components/sections/AboutHeader.vue'
import AboutStory from '@/components/sections/AboutStory.vue'
import AboutValues from '@/components/sections/AboutValues.vue'
import AboutFacilities from '@/components/sections/AboutFacilities.vue'
import AboutVisitFlow from '@/components/sections/AboutVisitFlow.vue'
import FeaturedDoctors from '@/components/sections/FeaturedDoctors.vue'
import AboutLocation from '@/components/sections/AboutLocation.vue'
import HomeCtaBanner from '@/components/sections/HomeCtaBanner.vue'

useHead({
  title: 'Tentang Kami | Candraloka Dental Care',
  meta: [
    {
      name: 'description',
      content: 'Mengenal klinik gigi Candraloka Dental Care, visi, misi, nilai pelayanan, fasilitas higienis modern, dan dokter gigi berdedikasi kami.',
    },
  ],
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

    <!-- FR-3.7: Lokasi, Jam Praktek, & Peta -->
    <AboutLocation />

    <!-- FR-3.8: Banner CTA Reservasi -->
    <HomeCtaBanner />
  </div>
</template>
