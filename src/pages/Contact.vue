<script setup>
import { useHead } from '@unhead/vue'
import AboutLocation from '@/components/sections/AboutLocation.vue'

useHead({
  title: 'Kontak & Lokasi Klinik | Candraloka Dental Care',
  meta: [
    {
      name: 'description',
      content: 'Informasi alamat, nomor telepon, WhatsApp, jam operasional, dan peta lokasi klinik Candraloka Dental Care di Kebayoran Baru, Jakarta Selatan.',
    },
  ],
})
</script>

<template>
  <div class="flex-1 flex flex-col bg-surface-50">
    <!-- Header Section -->
    <section class="py-10 sm:py-12 lg:py-14 bg-navy-950 text-white relative overflow-hidden" style="background-color: #081434;">
      <!-- Photographic Background & Balanced Sapphire Blue Tint -->
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          :src="'/images/clinic/header-booking.webp'"
          alt=""
          class="w-full h-full object-cover object-center scale-100 opacity-65 sm:opacity-75"
          loading="eager"
        />
        <div
          class="absolute inset-0"
          style="background: linear-gradient(180deg, rgba(8, 20, 52, 0.62) 0%, rgba(13, 36, 88, 0.48) 50%, rgba(8, 20, 52, 0.76) 100%);"
        />
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
          Kontak & Akses Klinik
        </h1>

        <p class="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Temukan petunjuk arah, jadwal operasional, dan saluran komunikasi langsung bersama tim Candraloka Dental Care.
        </p>
      </div>
    </section>

    <!-- Main Content: Akses & Kunjungan (Location, Hours, Contacts & Map) -->
    <main class="flex-1">
      <AboutLocation />
    </main>
  </div>
</template>
