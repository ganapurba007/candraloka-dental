<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import {
  CalendarCheck,
  Award,
  Globe,
  GraduationCap,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Stethoscope,
} from 'lucide-vue-next'
import IconWhatsApp from '@/components/ui/IconWhatsApp.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import NotFound from '@/pages/NotFound.vue'
import doctorsData from '@/data/doctors.json'
import servicesData from '@/data/services.json'
import clinicData from '@/data/clinic.json'
import { useClinic } from '@/composables/useClinic'
import { getDayName, formatDate, formatTimeRangeWib } from '@/lib/format'
import { isDoctorPracticingOn } from '@/lib/schedule'
import { getIsoDayOfWeek, toIsoDateString } from '@/lib/time'

const route = useRoute()
const { clinic, clinicLink } = useClinic()
const doctor = computed(() => doctorsData.find((d) => d.slug === route.params.slug))

useHead({
  title: computed(() =>
    doctor.value
      ? `${doctor.value.name} | ${clinic.value.name}`
      : `Dokter Tidak Ditemukan | ${clinic.value.name}`
  ),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        doctor.value
          ? `Profil ${doctor.value.name}, ${doctor.value.specialty} dengan ${doctor.value.experienceYears} tahun pengalaman di ${clinic.value.name}.`
          : 'Profil dokter yang Anda cari tidak ditemukan.'
      ),
    },
  ],
})


// Services handled by this doctor (FR-5.2)
const handledServices = computed(() => {
  if (!doctor.value || !doctor.value.serviceIds) return []
  return servicesData.filter((s) => doctor.value.serviceIds.includes(s.id))
})

// Weekly schedule mapping (Days 1 to 7)
const weeklySchedule = computed(() => {
  if (!doctor.value || !doctor.value.practiceHours) return []
  const todayDay = getIsoDayOfWeek(toIsoDateString(new Date()))

  const days = []
  for (let day = 1; day <= 7; day++) {
    const sessions = doctor.value.practiceHours.filter((h) => h.day === day)
    days.push({
      day,
      dayName: getDayName(day),
      isToday: day === todayDay,
      hasPractice: sessions.length > 0,
      sessionsText:
        sessions.length > 0
          ? sessions.map((s) => formatTimeRangeWib(s.start, s.end)).join(', ')
          : 'Tidak ada praktek',
    })
  }
  return days
})

const isPracticingToday = computed(() => {
  return doctor.value ? isDoctorPracticingOn(doctor.value, new Date()) : false
})

// WhatsApp consultation URL
const waDoctorUrl = computed(() => {
  if (!doctor.value) return '#'
  const text = encodeURIComponent(
    `Halo ${clinic.value.name}, saya ingin membuat janji dengan ${doctor.value.name}.`
  )
  return `https://wa.me/${clinic.value.contact.whatsapp}?text=${text}`
})
</script>

<template>
  <!-- FR-5.4: If doctor not found, render NotFound -->
  <NotFound v-if="!doctor" />

  <div v-else class="flex-1 flex flex-col bg-surface-50 pb-20 lg:pb-0">
    <!-- Doctor Header Profile Section -->
    <section class="py-10 sm:py-12 lg:py-14 bg-navy-950 text-white relative overflow-hidden" style="background-color: #081434;">
      <!-- Photographic Background & Balanced Sapphire Blue Tint -->
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          :src="'/images/clinic/header-doctors.webp'"
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
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <!-- Doctor Photo -->
          <div class="lg:col-span-4 flex justify-center lg:justify-start">
            <div class="relative w-56 sm:w-64 lg:w-72 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-navy-700 bg-slate-100">
              <ResponsiveImage
                :src="doctor.photo"
                :alt="doctor.name"
                aspect-ratio="4/5"
                img-class="w-full h-full object-cover"
              />
            </div>
          </div>

          <!-- Doctor Basic Info -->
          <div class="lg:col-span-8 space-y-5 text-center lg:text-left">
            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span class="text-xs font-semibold text-primary-300 uppercase tracking-wider">
                {{ doctor.specialty }}
              </span>
              <span class="text-xs text-primary-200 flex items-center gap-1">
                <Award class="w-4 h-4 text-primary-400" aria-hidden="true" />
                <span>{{ doctor.experienceYears }} Tahun Pengalaman</span>
              </span>
            </div>

            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {{ doctor.name }}
            </h1>

            <p class="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {{ doctor.bio }}
            </p>

            <!-- Language and Specialization Strip -->
            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs sm:text-sm text-slate-300">
              <div class="flex items-center gap-1.5">
                <Globe class="w-4 h-4 text-primary-400" aria-hidden="true" />
                <span>Bahasa: {{ doctor.languages.join(', ') }}</span>
              </div>
            </div>

            <!-- CTAs -->
            <div class="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <Button
                :to="`/reservasi?dokter=${doctor.slug}`"
                variant="primary"
                size="lg"
                class="font-semibold shadow-lg"
              >
                <CalendarCheck class="w-5 h-5 mr-2" aria-hidden="true" />
                <span>Reservasi dengan Dokter Ini</span>
              </Button>
              <a
                :href="waDoctorUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-navy-700 bg-navy-800/80 hover:bg-navy-700 text-white font-medium text-sm transition-colors"
              >
                <IconWhatsApp class="w-4 h-4 mr-2 text-emerald-400" />
                <span>Tanya via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Detailed Content Layout (FR-5.2) -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <!-- Left Column: Education, Interests, Handled Services (8 cols) -->
        <div class="lg:col-span-8 space-y-10">
          <!-- Education History (Riwayat Pendidikan) -->
          <section class="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
            <h2 class="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2.5">
              <GraduationCap class="w-6 h-6 text-primary-600" aria-hidden="true" />
              <span>Riwayat Pendidikan & Gelar</span>
            </h2>

            <div class="divide-y divide-slate-100">
              <div
                v-for="(edu, idx) in doctor.education"
                :key="idx"
                class="py-3.5 first:pt-0 last:pb-0 flex items-start gap-4"
              >
                <div class="w-9 h-9 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Award class="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 class="text-base font-bold text-navy-900">
                    {{ edu.degree }}
                  </h3>
                  <p class="text-sm text-slate-600">
                    {{ edu.institution }} • Lulus {{ edu.year }}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Clinical Interests (Fokus & Minat Klinis) -->
          <section class="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 class="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2.5">
              <Stethoscope class="w-6 h-6 text-primary-600" aria-hidden="true" />
              <span>Fokus & Minat Klinis</span>
            </h2>

            <div class="flex flex-wrap gap-2.5 pt-1">
              <span
                v-for="(interest, idx) in doctor.interests"
                :key="idx"
                class="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-surface-100 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium"
              >
                {{ interest }}
              </span>
            </div>
          </section>

          <!-- Handled Services (Layanan yang Ditangani) -->
          <section class="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div class="space-y-1">
              <h2 class="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2.5">
                <ShieldCheck class="w-6 h-6 text-primary-600" aria-hidden="true" />
                <span>Layanan yang Ditangani</span>
              </h2>
              <p class="text-sm text-slate-500">
                Pilih layanan terkait untuk melihat prosedur lengkap dan membuat reservasi.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RouterLink
                v-for="srv in handledServices"
                :key="srv.id"
                :to="`/layanan/${srv.slug}`"
                class="group p-4 rounded-2xl bg-surface-50 border border-slate-200/60 hover:border-primary-300 hover:bg-white transition-all flex items-center justify-between gap-3"
              >
                <div class="space-y-1 min-w-0">
                  <span class="text-xs font-semibold text-primary-600 uppercase">{{ srv.category }}</span>
                  <p class="text-sm font-bold text-navy-900 group-hover:text-primary-700 transition-colors truncate">
                    {{ srv.name }}
                  </p>
                </div>
                <ArrowRight class="w-4 h-4 text-slate-400 group-hover:text-primary-600 transition-colors flex-shrink-0" aria-hidden="true" />
              </RouterLink>
            </div>
          </section>
        </div>

        <!-- Right Column: Weekly Schedule & Leave Notes (4 cols) -->
        <aside class="lg:col-span-4 space-y-8">
          <!-- Weekly Schedule Card (FR-5.2) -->
          <Card class="p-6 sm:p-7 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-6">
            <div class="space-y-1.5">
              <div class="flex items-center gap-2 text-primary-600">
                <Calendar class="w-5 h-5" aria-hidden="true" />
                <span class="text-xs font-bold uppercase tracking-wider">Jadwal Mingguan</span>
              </div>
              <h3 class="text-lg font-bold text-navy-900">
                Waktu Praktek di Klinik
              </h3>
            </div>

            <div class="divide-y divide-slate-100 text-xs sm:text-sm">
              <div
                v-for="item in weeklySchedule"
                :key="item.day"
                class="py-2.5 flex items-center justify-between"
                :class="item.isToday ? 'bg-primary-50/70 -mx-3 px-3 rounded-lg font-semibold' : ''"
              >
                <div class="flex items-center gap-2">
                  <span class="text-navy-900">{{ item.dayName }}</span>
                  <span
                    v-if="item.isToday"
                    class="px-1.5 py-0.5 rounded text-[10px] bg-primary-600 text-white font-bold"
                  >
                    Hari ini
                  </span>
                </div>
                <span :class="item.hasPractice ? 'text-slate-700 font-medium' : 'text-slate-400 italic'">
                  {{ item.sessionsText }}
                </span>
              </div>
            </div>

            <!-- Leave Dates Notice (if any) -->
            <div
              v-if="doctor.leaveDates && doctor.leaveDates.length > 0"
              class="p-3.5 rounded-xl bg-amber-50 border border-amber-200/60 flex items-start gap-2.5 text-xs text-amber-800"
            >
              <AlertCircle class="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div class="space-y-1">
                <span class="font-bold">Pemberitahuan Cuti:</span>
                <p>
                  Dokter tidak praktek pada:
                  <span class="font-medium">
                    {{ doctor.leaveDates.map((d) => formatDate(d, true)).join(', ') }}
                  </span>
                </p>
              </div>
            </div>

            <!-- Book with Doctor CTA Button -->
            <Button
              :to="`/reservasi?dokter=${doctor.slug}`"
              variant="primary"
              size="md"
              class="w-full justify-center font-semibold shadow-md"
            >
              <CalendarCheck class="w-4 h-4 mr-2" aria-hidden="true" />
              <span>Buat Janji dengan Dokter Ini</span>
            </Button>
          </Card>
        </aside>
      </div>
    </main>

    <!-- Mobile Fixed Bottom CTA Bar (FR-5.3) -->
    <div class="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:p-4 z-40 lg:hidden shadow-lg">
      <div class="max-w-md mx-auto flex items-center justify-between gap-3">
        <div class="min-w-0 flex-1">
          <p class="text-xs text-slate-500 truncate">Dokter Terpilih</p>
          <p class="text-sm font-bold text-navy-900 truncate">{{ doctor.name }}</p>
        </div>
        <Button
          :to="`/reservasi?dokter=${doctor.slug}`"
          variant="primary"
          size="sm"
          class="font-semibold flex-shrink-0 shadow-md"
        >
          <CalendarCheck class="w-4 h-4 mr-1.5" aria-hidden="true" />
          <span>Reservasi</span>
        </Button>
      </div>
    </div>
  </div>
</template>
