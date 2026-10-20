<script setup>
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import HomeHero from '@/components/sections/HomeHero.vue'
import QuickInfoStrip from '@/components/sections/QuickInfoStrip.vue'
import HomeAboutBrief from '@/components/sections/HomeAboutBrief.vue'
import FeaturedServices from '@/components/sections/FeaturedServices.vue'
import ReservationSteps from '@/components/sections/ReservationSteps.vue'
import FeaturedDoctors from '@/components/sections/FeaturedDoctors.vue'
import { useClinic } from '@/composables/useClinic'
import { useI18n } from '@/composables/useI18n'

const { clinic } = useClinic()
const { isEnglish } = useI18n()

useHead({
  title: computed(() =>
    isEnglish.value
      ? `${clinic.value.name} — Modern & Friendly Dental Care`
      : `${clinic.value.name} — ${clinic.value.tagline || 'Klinik Gigi Modern & Ramah'}`
  ),
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
  </main>
</template>
