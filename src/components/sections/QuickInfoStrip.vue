<script setup>
import { computed } from 'vue'
import { useClinic } from '@/composables/useClinic'
import { useI18n } from '@/composables/useI18n'
import { getClinicOpenStatus } from '@/lib/schedule'
import { Clock, Phone, MapPin } from 'lucide-vue-next'
import IconWhatsApp from '@/components/ui/IconWhatsApp.vue'

const { clinic } = useClinic()
const { t, isEnglish } = useI18n()

const clinicStatus = computed(() => {
  return getClinicOpenStatus(clinic.value.operatingHours, new Date(), isEnglish.value ? 'en' : 'id')
})

const phone = computed(() => clinic.value.contact.phone)
const whatsapp = computed(() => clinic.value.contact.whatsapp)
const address = computed(() => {
  const parts = (clinic.value.contact.address || '').split(',')
  return parts.length >= 2 ? parts.slice(-2).join(',').trim() : clinic.value.contact.address
})

const waUrl = computed(() => {
  const greeting = isEnglish.value
    ? `Hello ${clinic.value.name}, I would like to inquire about the clinic operating hours.`
    : `Halo ${clinic.value.name}, saya ingin bertanya jam praktek klinik.`
  const text = encodeURIComponent(greeting)
  return `https://wa.me/${whatsapp.value}?text=${text}`
})
</script>

<template>
  <div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 mb-12">
    <div class="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 p-5 sm:p-7 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
      <!-- Item 1: Practice Status Today (FR-2.2) -->
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-primary-100/80">
          <Clock class="w-6 h-6" aria-hidden="true" />
        </div>
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {{ t('quickInfo.todayPractice') }}
            </span>
            <span
              class="inline-flex items-center gap-1.5 text-xs font-semibold"
              :class="clinicStatus.isOpen ? 'text-emerald-600' : 'text-slate-500'"
            >
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="clinicStatus.isOpen ? 'bg-emerald-500' : 'bg-slate-400'"
              />
              <span>{{ clinicStatus.statusBadge }}</span>
            </span>
          </div>
          <p class="text-sm font-bold text-navy-900">
            {{ clinicStatus.hoursText }}
          </p>
          <p class="text-xs text-slate-500">
            {{ t('quickInfo.online24h') }}
          </p>
        </div>
      </div>

      <!-- Item 2: Telepon & WhatsApp -->
      <div class="flex items-start gap-4 pt-4 md:pt-0 md:pl-6">
        <div class="w-12 h-12 rounded-2xl bg-navy-50 text-navy-700 flex items-center justify-center flex-shrink-0 mt-0.5 border border-navy-100/80">
          <Phone class="w-6 h-6" aria-hidden="true" />
        </div>
        <div class="space-y-1">
          <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
            Kontak Cepat
          </span>
          <div class="flex items-center gap-3">
            <a
              :href="`tel:${phone}`"
              class="text-sm font-bold text-navy-900 hover:text-primary-600 transition-colors"
            >
              {{ phone }}
            </a>
            <span class="text-slate-300">|</span>
            <a
              :href="waUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <IconWhatsApp class="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
          <p class="text-xs text-slate-500">
            Konsultasi & respon cepat tim resepsionis
          </p>
        </div>
      </div>

      <!-- Item 3: Lokasi & Petunjuk Arah -->
      <div class="flex items-start gap-4 pt-4 md:pt-0 md:pl-6">
        <div class="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-primary-100/80">
          <MapPin class="w-6 h-6" aria-hidden="true" />
        </div>
        <div class="space-y-1">
          <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
            Lokasi Klinik
          </span>
          <p class="text-sm font-bold text-navy-900">
            {{ address }}
          </p>
          <a
            :href="clinic.contact.mapUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block text-xs font-semibold text-primary-600 hover:text-primary-700 hover:underline pt-0.5"
          >
            Lihat di Google Maps &rarr;
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
