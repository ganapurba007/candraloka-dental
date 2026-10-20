<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import {
  Clock,
  CalendarCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Stethoscope,
  Info,
  ArrowRight,
  ShieldCheck,
} from 'lucide-vue-next'
import IconWhatsApp from '@/components/ui/IconWhatsApp.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import NotFound from '@/pages/NotFound.vue'
import servicesData from '@/data/services.json'
import doctorsData from '@/data/doctors.json'
import { useClinic } from '@/composables/useClinic'
import { useI18n } from '@/composables/useI18n'

const route = useRoute()
const { clinic, clinicLink } = useClinic()
const {
  t,
  getDoctorName,
  getDoctorSpecialty,
  getServiceName,
  getServiceSummary,
  getServiceDescription,
  getServiceWhenNeeded,
  getServiceProcedure,
  getServicePreparation,
  getCategoryLabel,
  formatDuration,
  isEnglish,
} = useI18n()

const service = computed(() => servicesData.find((s) => s.slug === route.params.slug))

useHead({
  title: computed(() =>
    service.value
      ? `${getServiceName(service.value)} | ${clinic.value.name}`
      : `${isEnglish.value ? 'Service Not Found' : 'Layanan Tidak Ditemukan'} | ${clinic.value.name}`
  ),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        service.value
          ? `${getServiceSummary(service.value)} ${isEnglish.value ? 'Estimated duration:' : 'Estimasi durasi:'} ${service.value.durationMinutes} ${isEnglish.value ? 'minutes at' : 'menit di'} ${clinic.value.name}.`
          : (isEnglish.value ? 'The dental service you are looking for was not found.' : 'Layanan gigi yang Anda cari tidak ditemukan.')
      ),
    },
  ],
})

// Doctors assigned to this service (FR-4.2)
const assignedDoctors = computed(() => {
  if (!service.value) return []
  return doctorsData.filter((doc) => doc.serviceIds && doc.serviceIds.includes(service.value.id))
})

// Related services in same category or others (FR-4.2)
const relatedServices = computed(() => {
  if (!service.value) return []
  const sameCategory = servicesData.filter(
    (s) => s.id !== service.value.id && s.category === service.value.category
  )
  if (sameCategory.length >= 3) return sameCategory.slice(0, 3)
  const others = servicesData.filter(
    (s) => s.id !== service.value.id && s.category !== service.value.category
  )
  return [...sameCategory, ...others].slice(0, 3)
})

// WhatsApp link
const waConsultUrl = computed(() => {
  if (!service.value) return '#'
  const serviceName = getServiceName(service.value)
  const greeting = isEnglish.value
    ? `Hello ${clinic.value.name}, I would like to inquire about ${serviceName}.`
    : `Halo ${clinic.value.name}, saya ingin konsultasi mengenai layanan ${serviceName}.`
  const text = encodeURIComponent(greeting)
  return `https://wa.me/${clinic.value.contact.whatsapp}?text=${text}`
})
</script>

<template>
  <!-- FR-4.5: If service not found, render NotFound page -->
  <NotFound v-if="!service" />

  <div v-else class="flex-1 flex flex-col bg-surface-50 pb-20 lg:pb-0">
    <!-- Service Header Banner -->
    <section class="py-10 sm:py-12 lg:py-14 bg-navy-950 text-white relative overflow-hidden" style="background-color: #081434;">
      <!-- Photographic Background & Balanced Sapphire Blue Tint -->
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          :src="'/images/clinic/header-services.webp'"
          alt=""
          class="w-full h-full object-cover object-center scale-100 opacity-65 sm:opacity-75"
          loading="eager"
        />
        <div
          class="absolute inset-0"
          style="background: linear-gradient(180deg, rgba(8, 20, 52, 0.62) 0%, rgba(13, 36, 88, 0.48) 50%, rgba(8, 20, 52, 0.76) 100%);"
        />
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-3xl space-y-4">
          <div class="flex items-center gap-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-primary-300">
              {{ getCategoryLabel(service.category) }}
            </span>
            <div class="flex items-center gap-1.5 text-xs text-primary-200">
              <Clock class="w-4 h-4 text-primary-400" aria-hidden="true" />
              <span>{{ t('services.duration') }}: {{ formatDuration(service.durationMinutes) }}</span>
            </div>
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {{ getServiceName(service) }}
          </h1>

          <p class="text-base sm:text-lg text-slate-300 leading-relaxed">
            {{ getServiceSummary(service) }}
          </p>

          <div class="pt-2 flex flex-wrap items-center gap-4">
            <Button
              :to="clinicLink(`/reservasi?layanan=${service.slug}`)"
              variant="primary"
              size="lg"
              class="font-semibold shadow-lg"
            >
              <CalendarCheck class="w-5 h-5 mr-2" aria-hidden="true" />
              <span>{{ t('serviceDetail.bookThisService') }}</span>
            </Button>
            <a
              :href="waConsultUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-navy-700 bg-navy-800/80 hover:bg-navy-700 text-white font-medium text-sm transition-colors"
            >
              <IconWhatsApp class="w-4 h-4 mr-2 text-emerald-400" />
              <span>{{ t('serviceDetail.askWhatsApp') }}</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Layout (FR-4.2) -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <!-- Left Column: Detailed Service Information (8 cols) -->
        <div class="lg:col-span-8 space-y-12">
          <!-- Featured Image -->
          <div class="rounded-3xl overflow-hidden shadow-md border border-slate-200 aspect-[16/9] bg-slate-100">
            <ResponsiveImage
              :src="service.image"
              :alt="getServiceName(service)"
              aspect-ratio="16/9"
              img-class="w-full h-full object-cover"
            />
          </div>

          <!-- Description -->
          <section class="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 class="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2.5">
              <ShieldCheck class="w-6 h-6 text-primary-600" aria-hidden="true" />
              <span>{{ t('serviceDetail.aboutTreatment') }}</span>
            </h2>
            <p class="text-base text-slate-700 leading-relaxed">
              {{ getServiceDescription(service) }}
            </p>
          </section>

          <!-- When Needed (Kapan Layanan Dibutuhkan) -->
          <section class="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
            <h2 class="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2.5">
              <HelpCircle class="w-6 h-6 text-primary-600" aria-hidden="true" />
              <span>{{ t('serviceDetail.whenNeeded') }}</span>
            </h2>
            <ul class="space-y-3.5">
              <li
                v-for="(item, idx) in getServiceWhenNeeded(service)"
                :key="idx"
                class="flex items-start gap-3 text-slate-700"
              >
                <CheckCircle2 class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span class="text-sm sm:text-base leading-relaxed">{{ item }}</span>
              </li>
            </ul>
          </section>

          <!-- Procedure Steps (Tahapan Perawatan) -->
          <section class="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div class="space-y-1">
              <h2 class="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight">
                {{ t('serviceDetail.procedureTitle') }}
              </h2>
              <p class="text-sm text-slate-500">
                {{ t('serviceDetail.procedureSubtitle') }}
              </p>
            </div>

            <div class="space-y-4">
              <div
                v-for="(step, idx) in getServiceProcedure(service)"
                :key="idx"
                class="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-surface-50 border border-slate-200/60"
              >
                <div class="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-extrabold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                  {{ idx + 1 }}
                </div>
                <div class="space-y-1">
                  <h3 class="text-base font-bold text-navy-900">
                    {{ step.title }}
                  </h3>
                  <p class="text-sm text-slate-600 leading-relaxed">
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Preparation (Persiapan Sebelum Datang) -->
          <section class="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
            <h2 class="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2.5">
              <AlertCircle class="w-6 h-6 text-primary-600" aria-hidden="true" />
              <span>{{ t('serviceDetail.preparationTitle') }}</span>
            </h2>
            <ul class="space-y-3">
              <li
                v-for="(prep, idx) in getServicePreparation(service)"
                :key="idx"
                class="flex items-start gap-3 text-slate-700"
              >
                <div class="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                <span class="text-sm sm:text-base leading-relaxed">{{ prep }}</span>
              </li>
            </ul>
          </section>

          <!-- Pricing Notice Box (FR-4.4) -->
          <div class="p-6 rounded-2xl bg-surface-100 border border-slate-200 flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info class="w-5 h-5" aria-hidden="true" />
            </div>
            <div class="space-y-1 text-sm">
              <h4 class="font-bold text-navy-900">{{ t('serviceDetail.pricingTitle') }}</h4>
              <p class="text-slate-600 leading-relaxed">
                {{ t('serviceDetail.pricingDesc') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right Column: Sidebar (Doctors & Related Services) (4 cols) -->
        <aside class="lg:col-span-4 space-y-8">
          <!-- Quick Booking Card -->
          <Card class="p-6 sm:p-7 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-6">
            <div class="space-y-2">
              <span class="text-xs font-bold uppercase tracking-wider text-primary-600">
                {{ t('serviceDetail.quickBooking') }}
              </span>
              <h3 class="text-lg font-bold text-navy-900">
                {{ t('serviceDetail.bookThisService') }}
              </h3>
              <p class="text-xs text-slate-500 leading-relaxed">
                {{ t('serviceDetail.quickBookingDesc') }}
              </p>
            </div>

            <div class="p-4 rounded-xl bg-surface-100 border border-slate-200/60 space-y-2.5 text-xs">
              <div class="flex items-center justify-between">
                <span class="text-slate-500">{{ t('serviceDetail.estimatedDuration') }}</span>
                <span class="font-bold text-navy-900">{{ formatDuration(service.durationMinutes) }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-500">{{ t('serviceDetail.category') }}</span>
                <span class="font-bold text-navy-900">{{ getCategoryLabel(service.category) }}</span>
              </div>
            </div>

            <Button
              :to="clinicLink(`/reservasi?layanan=${service.slug}`)"
              variant="primary"
              size="md"
              class="w-full justify-center font-semibold shadow-md"
            >
              <CalendarCheck class="w-4 h-4 mr-2" aria-hidden="true" />
              <span>{{ t('serviceDetail.bookNow') }}</span>
            </Button>
          </Card>

          <!-- Assigned Doctors List (FR-4.2) -->
          <div class="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <Stethoscope class="w-5 h-5 text-primary-600" aria-hidden="true" />
                <h3 class="text-base font-bold text-navy-900">
                  {{ t('serviceDetail.assignedDoctors') }}
                </h3>
              </div>
              <p class="text-xs text-slate-500">
                {{ t('serviceDetail.assignedDoctorsDesc') }}
              </p>
            </div>

            <div v-if="assignedDoctors.length > 0" class="divide-y divide-slate-100">
              <RouterLink
                v-for="doc in assignedDoctors"
                :key="doc.id"
                :to="clinicLink(`/dokter/${doc.slug}`)"
                class="group py-3.5 first:pt-0 last:pb-0 flex items-center gap-3.5 hover:text-primary-700 transition-colors"
              >
                <div class="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                  <ResponsiveImage
                    :src="doc.photo"
                    :alt="doc.name"
                    aspect-ratio="1/1"
                    img-class="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-navy-900 group-hover:text-primary-700 truncate transition-colors">
                    {{ getDoctorName(doc.name) }}
                  </p>
                  <p class="text-xs text-slate-500 truncate">
                    {{ getDoctorSpecialty(doc.specialty) }}
                  </p>
                </div>
                <ArrowRight class="w-4 h-4 text-slate-400 group-hover:text-primary-600 transition-colors flex-shrink-0" aria-hidden="true" />
              </RouterLink>
            </div>
            <p v-else class="text-xs text-slate-500 italic">
              {{ t('serviceDetail.allTeamFallback') }}
            </p>
          </div>

          <!-- Related Services (FR-4.2) -->
          <div class="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 class="text-base font-bold text-navy-900">
              {{ t('serviceDetail.relatedServices') }}
            </h3>
            <div class="space-y-3">
              <RouterLink
                v-for="rel in relatedServices"
                :key="rel.id"
                :to="clinicLink(`/layanan/${rel.slug}`)"
                class="block p-3.5 rounded-2xl bg-surface-50 border border-slate-200/60 hover:border-primary-300 hover:bg-white transition-all group"
              >
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs font-semibold text-primary-600">{{ getCategoryLabel(rel.category) }}</span>
                  <span class="text-[11px] text-slate-400">{{ formatDuration(rel.durationMinutes) }}</span>
                </div>
                <p class="text-sm font-bold text-navy-900 group-hover:text-primary-700 transition-colors line-clamp-1">
                  {{ getServiceName(rel) }}
                </p>
              </RouterLink>
            </div>
          </div>
        </aside>
      </div>
    </main>

    <!-- Mobile Fixed Bottom CTA Bar (FR-4.3) -->
    <div class="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:p-4 z-40 lg:hidden shadow-lg">
      <div class="max-w-md mx-auto flex items-center justify-between gap-3">
        <div class="min-w-0 flex-1">
          <p class="text-xs text-slate-500 truncate">{{ t('serviceDetail.selectedService') }}</p>
          <p class="text-sm font-bold text-navy-900 truncate">{{ getServiceName(service) }}</p>
        </div>
        <Button
          :to="clinicLink(`/reservasi?layanan=${service.slug}`)"
          variant="primary"
          size="sm"
          class="font-semibold flex-shrink-0 shadow-md"
        >
          <CalendarCheck class="w-4 h-4 mr-1.5" aria-hidden="true" />
          <span>{{ t('serviceDetail.bookNow') }}</span>
        </Button>
      </div>
    </div>
  </div>
</template>
