<script setup>
import { computed } from 'vue'
import clinicData from '@/data/clinic.json'
import { MessageCircle } from 'lucide-vue-next'

const waNumber = clinicData.contact.whatsapp

const waUrl = computed(() => {
  const message = encodeURIComponent(
    'Halo Candraloka Dental Care, saya ingin bertanya informasi mengenai konsultasi dan jadwal dokter.'
  )
  return `https://wa.me/${waNumber}?text=${message}`
})
</script>

<template>
  <aside aria-label="Bantuan WhatsApp Langsung">
    <a
      :href="waUrl"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi kami melalui WhatsApp"
      class="fixed bottom-6 right-4 sm:bottom-6 sm:right-6 z-30 group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 min-h-[48px] min-w-[48px]"
    >
      <MessageCircle class="w-6 h-6 flex-shrink-0" aria-hidden="true" />
      <span class="hidden sm:inline-block text-xs font-semibold tracking-wide pr-1">
        Chat WhatsApp
      </span>
    </a>
  </aside>
</template>
