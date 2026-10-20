<script setup>
import { computed } from 'vue'
import { useClinic } from '@/composables/useClinic'
import { useI18n } from '@/composables/useI18n'
import IconWhatsApp from '@/components/ui/IconWhatsApp.vue'

const { clinic } = useClinic()
const { isEnglish } = useI18n()

const waUrl = computed(() => {
  const greeting = isEnglish.value
    ? `Hello ${clinic.value.name}, I would like to ask about consultation and doctor schedules.`
    : `Halo ${clinic.value.name}, saya ingin bertanya informasi mengenai konsultasi dan jadwal dokter.`
  const message = encodeURIComponent(greeting)
  return `https://wa.me/${clinic.value.contact.whatsapp}?text=${message}`
})
</script>

<template>
  <aside :aria-label="isEnglish ? 'Direct WhatsApp Assistance' : 'Bantuan WhatsApp Langsung'">
    <a
      :href="waUrl"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="isEnglish ? 'Contact us via WhatsApp' : 'Hubungi kami melalui WhatsApp'"
      class="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-30 group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 min-h-[48px] min-w-[48px]"
    >
      <IconWhatsApp class="w-6 h-6 flex-shrink-0" />
      <span class="hidden sm:inline-block text-xs font-semibold tracking-wide pr-1">
        {{ isEnglish ? 'WhatsApp Us' : 'Chat WhatsApp' }}
      </span>
    </a>
  </aside>
</template>
