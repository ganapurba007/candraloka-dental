<script setup>
import { computed } from 'vue'
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  ExternalLink,
} from 'lucide-vue-next'
import IconWhatsApp from '@/components/ui/IconWhatsApp.vue'
import { useClinic } from '@/composables/useClinic'
import { getClinicOpenStatus } from '@/lib/schedule'
import { getDayName } from '@/lib/format'

const { clinic } = useClinic()

const openStatus = computed(() => {
  return getClinicOpenStatus(clinic.value.operatingHours, new Date())
})

const daysList = computed(() => {
  // 1 = Senin to 7 = Minggu
  const result = []
  for (let day = 1; day <= 7; day++) {
    const found = clinic.value.operatingHours.find((h) => h.day === day)
    result.push({
      day,
      dayName: getDayName(day),
      isOpen: !!found,
      hours: found ? `${found.open} – ${found.close} ${clinic.value.timezoneLabel}` : 'Tutup',
    })
  }
  return result
})
</script>

<template>
  <section class="py-16 sm:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span class="text-xs font-bold uppercase tracking-wider text-primary-600">
          Akses & Kunjungan
        </span>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight">
          Lokasi & Jam Praktek
        </h2>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
          Terletak di lokasi strategis yang tenang dan mudah dijangkau dengan fasilitas parkir memadai.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <!-- Left: Address, Status & Operating Hours (5 cols) -->
        <div class="lg:col-span-5 space-y-6">
          <!-- Status Badge Card -->
          <div class="p-6 rounded-2xl bg-surface-100 border border-slate-200/80 space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Clock class="w-5 h-5 text-primary-600" aria-hidden="true" />
                <span class="font-bold text-navy-900">Status Klinik</span>
              </div>
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                :class="openStatus.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'"
              >
                {{ openStatus.statusBadge }}
              </span>
            </div>
            <p class="text-sm text-slate-600">{{ openStatus.hoursText }}</p>
          </div>

          <!-- Contact Details -->
          <div class="p-6 rounded-2xl bg-surface-100 border border-slate-200/80 space-y-5">
            <!-- Address -->
            <div class="flex items-start gap-3.5">
              <div class="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin class="w-5 h-5" aria-hidden="true" />
              </div>
              <div class="space-y-1">
                <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500">Alamat</h4>
                <p class="text-sm font-medium text-navy-900 leading-relaxed">
                  {{ clinic.contact.address }}
                </p>
              </div>
            </div>

            <!-- Phone & WhatsApp -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <a
                :href="`tel:${clinic.contact.phone}`"
                class="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-primary-400 text-slate-700 hover:text-primary-700 transition-colors"
              >
                <Phone class="w-4 h-4 text-primary-600" aria-hidden="true" />
                <div class="text-xs">
                  <p class="text-slate-400">Telepon</p>
                  <p class="font-semibold text-navy-900">{{ clinic.contact.phone }}</p>
                </div>
              </a>

              <a
                :href="`https://wa.me/${clinic.contact.whatsapp}`"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-primary-400 text-slate-700 hover:text-primary-700 transition-colors"
              >
                <IconWhatsApp class="w-4 h-4 text-emerald-600" />
                <div class="text-xs">
                  <p class="text-slate-400">WhatsApp</p>
                  <p class="font-semibold text-navy-900">+{{ clinic.contact.whatsapp }}</p>
                </div>
              </a>
            </div>
          </div>

          <!-- Operating Hours Schedule Table -->
          <div class="p-6 rounded-2xl bg-surface-100 border border-slate-200/80 space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500">Jadwal Jam Buka</h4>
            <div class="divide-y divide-slate-200/60 text-sm">
              <div
                v-for="d in daysList"
                :key="d.day"
                class="py-2.5 flex items-center justify-between"
              >
                <span class="font-medium text-navy-900">{{ d.dayName }}</span>
                <span :class="d.isOpen ? 'text-slate-600' : 'text-slate-400 italic'">
                  {{ d.hours }}
                </span>
              </div>
            </div>
          </div>

          <!-- Directions Action Button -->
          <div class="pt-2">
            <a
              :href="clinic.contact.mapUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center w-full px-7 py-3.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-base transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 gap-2"
            >
              <Navigation class="w-5 h-5" aria-hidden="true" />
              <span>Petunjuk Arah via Google Maps</span>
              <ExternalLink class="w-4 h-4 ml-1 opacity-75" aria-hidden="true" />
            </a>
          </div>
        </div>

        <!-- Right: Embed Google Maps (7 cols) -->
        <div class="lg:col-span-7">
          <div class="rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100 flex flex-col h-full">
            <!-- Map Container -->
            <div class="relative w-full h-[400px] sm:h-[480px] lg:h-full lg:min-h-[580px] overflow-hidden bg-slate-100">
              <iframe
                :title="`Peta Lokasi ${clinic.name}`"
                :src="clinic.contact.mapEmbedUrl"
                width="100%"
                height="100%"
                class="border-0 w-full h-full min-h-[400px] sm:min-h-[480px] lg:min-h-[580px]"
                loading="lazy"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
              />
            </div>

            <!-- Map Bottom Bar -->
            <div class="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <span class="flex items-center gap-1.5 font-medium text-navy-900">
                <MapPin class="w-4 h-4 text-primary-600 flex-shrink-0" aria-hidden="true" />
                {{ clinic.contact.address }}
              </span>
              <a
                :href="clinic.contact.mapUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-primary-700 hover:text-primary-800 font-semibold underline underline-offset-2 flex-shrink-0"
              >
                <span>Buka di Google Maps</span>
                <ExternalLink class="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
