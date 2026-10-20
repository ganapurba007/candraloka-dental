<script setup>
import { computed } from 'vue'
import { useClinic } from '@/composables/useClinic'
import { useI18n } from '@/composables/useI18n'
import { Phone, MapPin, Clock } from 'lucide-vue-next'
import IconWhatsApp from '@/components/ui/IconWhatsApp.vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'

const { clinic } = useClinic()
const { t, isEnglish } = useI18n()

const phone = computed(() => clinic.value.contact.phone)
const whatsapp = computed(() => clinic.value.contact.whatsapp)
const addressShort = computed(() => {
  const parts = (clinic.value.contact.address || '').split(',')
  return parts.length >= 2 ? parts.slice(-2).join(',').trim() : clinic.value.contact.address
})

const waUrl = computed(() => {
  const greeting = isEnglish.value
    ? `Hello ${clinic.value.name}, I would like to inquire about your clinic services.`
    : `Halo ${clinic.value.name}, saya ingin bertanya mengenai layanan klinik.`
  const text = encodeURIComponent(greeting)
  return `https://wa.me/${whatsapp.value}?text=${text}`
})
</script>

<template>
  <aside
    :aria-label="t('topbar.ariaLabel')"
    class="hidden md:block bg-navy-900 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-navy-800"
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
          <span>{{ t('topbar.operatingHours', { tz: clinic.timezoneLabel }) }}</span>
        </div>
      </div>

      <!-- Right side: Phone, WhatsApp, and Language Switcher -->
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
          <IconWhatsApp class="w-3.5 h-3.5" />
          <span>{{ t('topbar.whatsappUs') }}</span>
        </a>

        <!-- Language Switcher -->
        <div class="pl-2 border-l border-navy-800">
          <LanguageSwitcher variant="dark" size="xs" />
        </div>
      </div>
    </div>
  </aside>
</template>
