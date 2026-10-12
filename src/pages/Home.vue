<script setup>
import { useHead } from '@unhead/vue'
import HomeHero from '@/components/sections/HomeHero.vue'
import QuickInfoStrip from '@/components/sections/QuickInfoStrip.vue'
import HomeAboutBrief from '@/components/sections/HomeAboutBrief.vue'
import FeaturedServices from '@/components/sections/FeaturedServices.vue'
import ReservationSteps from '@/components/sections/ReservationSteps.vue'
import FeaturedDoctors from '@/components/sections/FeaturedDoctors.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import HomeCtaBanner from '@/components/sections/HomeCtaBanner.vue'

useHead({
  title: 'Beranda | Candraloka Dental Care — Klinik Gigi Modern & Ramah',
  meta: [
    {
      name: 'description',
      content: 'Klinik gigi keluarga dengan layanan modern, dokter gigi umum & spesialis berpengalaman, dan sistem reservasi online jadwal waktu nyata.',
    },
  ],
})
</script>

<template>
  <main class="flex-1 flex flex-col">
    <!-- FR-2.1 Hero Section -->
    <HomeHero />

    <!-- FR-2.2 Quick Info Strip -->
    <QuickInfoStrip />

    <!-- FR-2.3 Brief About with CountUp Stats -->
    <HomeAboutBrief />

    <!-- FR-2.4 Featured Services -->
    <FeaturedServices />

    <!-- FR-2.5 4-Step Reservation Process -->
    <ReservationSteps />

    <!-- FR-2.6 Featured Doctors -->
    <FeaturedDoctors />

    <!-- FR-2.7 Patient Testimonials -->
    <TestimonialsSection />

    <!-- FR-2.8 Closing CTA Banner -->
    <HomeCtaBanner />
  </main>
</template>
