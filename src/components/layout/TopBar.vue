<script setup>
import { computed } from 'vue'
import clinicData from '@/data/clinic.json'
import { Phone, MessageCircle, MapPin, Clock } from 'lucide-vue-next'

const phone = clinicData.contact.phone
const whatsapp = clinicData.contact.whatsapp
const addressShort = 'Kebayoran Baru, Jakarta Selatan'

const waUrl = computed(() => {
  const text = encodeURIComponent('Halo Candraloka Dental Care, saya ingin bertanya mengenai layanan klinik.')
  return `https://wa.me/${whatsapp}?text=${text}`
})
</script>

<template>
  <aside
    aria-label="Informasi Kontak Cepat"
    class="hidden md:block bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Left side: Location and Hours -->
      <div class="flex items-center space-x-6">
        <div class="flex items-center space-x-1.5">
          <MapPin class="w-3.5 h-3.5 text-primary-400" aria-hidden="true" />
          <span>{{ addressShort }}</span>
        </div>
        <div class="flex items-center space-x-1.5">
          <Clock class="w-3.5 h-3.5 text-primary-400" aria-hidden="true" />
          <span>Senin – Sabtu: 09:00 – 20:00 {{ clinicData.timezoneLabel }}</span>
        </div>
      </div>

      <!-- Right side: Phone & WhatsApp click-to-contact -->
      <div class="flex items-center space-x-5">
        <a
          :href="`tel:${phone}`"
          class="flex items-center space-x-1.5 hover:text-white transition-colors focus-visible:outline-none focus-visible:text-white"
        >
          <Phone class="w-3.5 h-3.5 text-primary-400" aria-hidden="true" />
          <span>{{ phone }}</span>
        </a>
        <a
          :href="waUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-300 transition-colors focus-visible:outline-none focus-visible:text-white"
        >
          <MessageCircle class="w-3.5 h-3.5" aria-hidden="true" />
          <span>WhatsApp Kami</span>
        </a>
      </div>
    </div>
  </aside>
</template>
