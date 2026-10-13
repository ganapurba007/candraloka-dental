<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import {
  Calendar,
  Clock,
  CalendarCheck,
  User,
  AlertCircle,
  Info,
  RotateCcw,
  Stethoscope,
} from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import HomeCtaBanner from '@/components/sections/HomeCtaBanner.vue'
import doctorsData from '@/data/doctors.json'
import clinicData from '@/data/clinic.json'
import { getDayName, formatDate, formatTimeRangeWib } from '@/lib/format'
import {
  getClinicOpenStatus,
  isDoctorSessionActiveNow,
  isDoctorPracticingOn,
} from '@/lib/schedule'
import { getIsoDayOfWeek, toIsoDateString } from '@/lib/time'

useHead({
  title: 'Jadwal Praktek Dokter | Candraloka Dental Care',
  meta: [
    {
      name: 'description',
      content: 'Jadwal praktek mingguan dokter gigi umum dan spesialis di Candraloka Dental Care. Cek waktu praktek hari ini dan reservasi online berbasis WIB.',
    },
  ],
})

const route = useRoute()
const router = useRouter()

const now = new Date()
const currentIsoDay = getIsoDayOfWeek(toIsoDateString(now))

// Filter states (FR-6.2)
const selectedDoctorSlug = ref('all')
const selectedDay = ref('all') // 'all' or 1..7 for desktop; for mobile default to today
const mobileSelectedDay = ref(currentIsoDay)

// Sync filters from URL query on load
onMounted(() => {
  if (route.query.dokter) {
    const exists = doctorsData.some((d) => d.slug === route.query.dokter)
    if (exists) selectedDoctorSlug.value = String(route.query.dokter)
  }
  if (route.query.hari) {
    const dayNum = Number(route.query.hari)
    if (dayNum >= 1 && dayNum <= 7) {
      selectedDay.value = dayNum
      mobileSelectedDay.value = dayNum
    }
  }
})

// Update URL query when filters change (FR-6.2)
watch([selectedDoctorSlug, selectedDay], ([doc, day]) => {
  const query = {}
  if (doc && doc !== 'all') query.dokter = doc
  if (day && day !== 'all') query.hari = String(day)

  if (router && typeof router.replace === 'function') {
    const res = router.replace({ query })
    if (res && typeof res.catch === 'function') {
      res.catch(() => {})
    }
  }
})

function resetFilters() {
  selectedDoctorSlug.value = 'all'
  selectedDay.value = 'all'
  mobileSelectedDay.value = currentIsoDay
}

const clinicStatus = computed(() => {
  return getClinicOpenStatus(clinicData.operatingHours, now)
})

// Filtered doctors list
const displayedDoctors = computed(() => {
  let list = doctorsData
  if (selectedDoctorSlug.value !== 'all') {
    list = list.filter((d) => d.slug === selectedDoctorSlug.value)
  }
  return list
})

// 7 days definition
const daysList = [1, 2, 3, 4, 5, 6, 7].map((day) => ({
  day,
  dayName: getDayName(day),
  isToday: day === currentIsoDay,
}))

// Filtered columns for desktop
const displayedDays = computed(() => {
  if (selectedDay.value !== 'all') {
    return daysList.filter((d) => d.day === Number(selectedDay.value))
  }
  return daysList
})

// Helper for doctor sessions in a day
function getDoctorSessions(doc, day) {
  return doc.practiceHours.filter((h) => h.day === day)
}

// Doctors practicing on mobile selected day
const mobileDayDoctors = computed(() => {
  const day = Number(mobileSelectedDay.value)
  return displayedDoctors.value
    .map((doc) => {
      const sessions = getDoctorSessions(doc, day)
      const onLeave =
        doc.leaveDates && doc.leaveDates.includes(toIsoDateString(now)) && day === currentIsoDay
      return {
        ...doc,
        sessions,
        hasPractice: sessions.length > 0 && !onLeave,
        onLeave,
      }
    })
    .filter((doc) => doc.hasPractice || selectedDoctorSlug.value !== 'all')
})
</script>

<template>
  <div class="flex-1 flex flex-col bg-surface-50">
    <!-- Header Section (FR-6.6) -->
    <section class="py-12 sm:py-16 bg-navy-900 text-white relative overflow-hidden" style="background-color: #0e204d;">
      <div class="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
      <div class="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-primary-400/10 blur-3xl pointer-events-none" />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight text-white">
          Jadwal Praktek Dokter Mingguan
        </h1>

        <p class="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Temukan waktu konsultasi yang tepat bersama dokter pilihan Anda. Seluruh jadwal mengacu pada waktu Indonesia Barat (WIB).
        </p>

        <!-- Clinic Operating Hours & Timezone Strip (FR-6.6) -->
        <div class="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
          <div class="px-4 py-2 rounded-xl bg-navy-800/80 border border-navy-700 text-slate-200 flex items-center gap-2">
            <Clock class="w-4 h-4 text-primary-400" aria-hidden="true" />
            <span>Operasional: Senin–Jumat 09:00–20:00, Sabtu 09:00–17:00 ({{ clinicData.timezoneLabel }})</span>
          </div>

          <div
            class="px-3.5 py-2 rounded-xl border font-semibold flex items-center gap-2"
            :class="clinicStatus.isOpen ? 'bg-emerald-950/80 border-emerald-700/60 text-emerald-300' : 'bg-navy-800 border-navy-700 text-slate-300'"
          >
            <span
              class="w-2 h-2 rounded-full"
              :class="clinicStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'"
            />
            <span>{{ clinicStatus.statusBadge }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Area -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
      <!-- Filter Bar (FR-6.2) -->
      <div class="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto">
          <!-- Doctor Selector -->
          <div class="w-full sm:w-64">
            <label for="doctor-filter" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Pilih Dokter
            </label>
            <select
              id="doctor-filter"
              v-model="selectedDoctorSlug"
              class="w-full px-3.5 py-2.5 bg-surface-50 border border-slate-300 rounded-xl text-navy-900 text-base sm:text-sm font-medium focus:ring-2 focus:ring-primary-500 focus:outline-none min-h-[44px]"
            >
              <option value="all">Semua Dokter</option>
              <option v-for="d in doctorsData" :key="d.id" :value="d.slug">
                {{ d.name }}
              </option>
            </select>
          </div>

          <!-- Day Selector for Desktop -->
          <div class="w-full sm:w-52 hidden md:block">
            <label for="day-filter" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Pilih Hari
            </label>
            <select
              id="day-filter"
              v-model="selectedDay"
              class="w-full px-3.5 py-2.5 bg-surface-50 border border-slate-300 rounded-xl text-navy-900 text-sm font-medium focus:ring-2 focus:ring-primary-500 focus:outline-none"
            >
              <option value="all">Semua Hari (Senin–Minggu)</option>
              <option v-for="d in daysList" :key="d.day" :value="d.day">
                {{ d.dayName }} {{ d.isToday ? '(Hari Ini)' : '' }}
              </option>
            </select>
          </div>
        </div>

        <!-- Reset Button -->
        <button
          v-if="selectedDoctorSlug !== 'all' || selectedDay !== 'all'"
          type="button"
          class="inline-flex items-center gap-1.5 text-xs text-primary-700 hover:text-primary-800 font-semibold py-2 px-3 rounded-lg hover:bg-primary-50 transition-colors"
          @click="resetFilters"
        >
          <RotateCcw class="w-3.5 h-3.5" aria-hidden="true" />
          <span>Reset Filter</span>
        </button>
      </div>

      <!-- DESKTOP VIEW: Weekly Matrix Table (FR-6.1, FR-6.3, FR-6.4, FR-6.5) -->
      <div class="hidden md:block bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-left">
            <thead>
              <tr class="bg-navy-900 text-white border-b border-navy-800 text-xs uppercase tracking-wider">
                <th class="p-4 sm:p-5 font-bold min-w-[220px]">Dokter Gigi</th>
                <th
                  v-for="d in displayedDays"
                  :key="d.day"
                  class="p-4 font-bold text-center min-w-[120px]"
                  :class="d.isToday ? 'bg-primary-700/40 text-white ring-1 ring-primary-400/30' : ''"
                >
                  <div class="space-y-0.5">
                    <div>{{ d.dayName }}</div>
                    <span
                      v-if="d.isToday"
                      class="inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-primary-400 text-navy-950 uppercase"
                    >
                      Hari Ini
                    </span>
                  </div>
                </th>
                <th class="p-4 sm:p-5 font-bold text-center min-w-[110px]">Aksi</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100 text-sm">
              <tr
                v-for="doc in displayedDoctors"
                :key="doc.id"
                class="hover:bg-slate-50/60 transition-colors"
              >
                <!-- Doctor Info Column -->
                <td class="p-4 sm:p-5 align-top">
                  <div class="flex items-start gap-3">
                    <div class="w-11 h-11 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                      <ResponsiveImage
                        :src="doc.photo"
                        :alt="doc.name"
                        aspect-ratio="1/1"
                        img-class="w-full h-full object-cover"
                      />
                    </div>
                    <div class="space-y-1 min-w-0">
                      <RouterLink
                        :to="`/dokter/${doc.slug}`"
                        class="font-bold text-navy-900 hover:text-primary-700 transition-colors leading-snug block"
                      >
                        {{ doc.name }}
                      </RouterLink>
                      <p class="text-xs text-slate-500 font-medium leading-relaxed">
                        {{ doc.specialty }}
                      </p>

                      <!-- Leave notice (FR-6.4) -->
                      <div
                        v-if="doc.leaveDates && doc.leaveDates.length > 0"
                        class="text-[11px] text-amber-700 font-medium flex items-center gap-1 pt-1"
                      >
                        <AlertCircle class="w-3.5 h-3.5 text-amber-600 flex-shrink-0" aria-hidden="true" />
                        <span>Cuti: {{ doc.leaveDates.map((ld) => formatDate(ld, false)).join(', ') }}</span>
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Day Schedule Columns -->
                <td
                  v-for="d in displayedDays"
                  :key="d.day"
                  class="p-4 align-top text-center text-xs"
                  :class="d.isToday ? 'bg-primary-50/40' : ''"
                >
                  <template v-if="getDoctorSessions(doc, d.day).length > 0">
                    <div class="space-y-2">
                      <div
                        v-for="(session, sIdx) in getDoctorSessions(doc, d.day)"
                        :key="sIdx"
                        class="p-2 rounded-xl bg-surface-100 border border-slate-200/60 font-semibold text-navy-900"
                      >
                        <div>{{ session.start }} – {{ session.end }}</div>

                        <!-- Active session indicator (FR-6.3) -->
                        <div
                          v-if="isDoctorSessionActiveNow(doc, session, now)"
                          class="mt-1"
                        >
                          <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white animate-pulse">
                            <span class="w-1.5 h-1.5 rounded-full bg-white" />
                            Sedang Praktek
                          </span>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <span class="text-slate-300 font-medium select-none">—</span>
                  </template>
                </td>

                <!-- Reservation Action Column (FR-6.5) -->
                <td class="p-4 sm:p-5 align-middle text-center">
                  <Button
                    :to="`/reservasi?dokter=${doc.slug}`"
                    variant="primary"
                    size="sm"
                    class="font-semibold text-xs shadow-sm"
                  >
                    <span>Reservasi</span>
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- MOBILE VIEW: Day Tabs & Doctor Cards (FR-6.1, FR-6.3, FR-6.4, FR-6.5) -->
      <div class="block md:hidden space-y-5">
        <!-- Day Selector Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            v-for="d in daysList"
            :key="d.day"
            type="button"
            class="px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer"
            :class="
              mobileSelectedDay === d.day
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-primary-300'
            "
            @click="mobileSelectedDay = d.day"
          >
            <span>{{ d.dayName }}</span>
            <span
              v-if="d.isToday"
              class="px-1.5 py-0.2 rounded-full text-[9px] uppercase tracking-wider"
              :class="mobileSelectedDay === d.day ? 'bg-white text-primary-800' : 'bg-primary-100 text-primary-800 font-extrabold'"
            >
              Hari Ini
            </span>
          </button>
        </div>

        <!-- Mobile Doctor Cards for Selected Day -->
        <div v-if="mobileDayDoctors.length > 0" class="space-y-4">
          <div
            v-for="doc in mobileDayDoctors"
            :key="doc.id"
            class="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4"
          >
            <div class="flex items-start gap-3.5">
              <div class="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                <ResponsiveImage
                  :src="doc.photo"
                  :alt="doc.name"
                  aspect-ratio="1/1"
                  img-class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1 min-w-0 space-y-1">
                <RouterLink
                  :to="`/dokter/${doc.slug}`"
                  class="text-base font-bold text-navy-900 hover:text-primary-700 transition-colors leading-snug block"
                >
                  {{ doc.name }}
                </RouterLink>
                <p class="text-xs text-slate-500 font-medium">
                  {{ doc.specialty }}
                </p>
              </div>
            </div>

            <!-- Sessions info -->
            <div class="p-3.5 rounded-xl bg-surface-100 border border-slate-200/60 space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="text-slate-500 font-medium">Jam Praktek:</span>
                <div class="space-y-1 text-right">
                  <div
                    v-for="(session, sIdx) in doc.sessions"
                    :key="sIdx"
                    class="font-bold text-navy-900"
                  >
                    {{ session.start }} – {{ session.end }} WIB
                    <span
                      v-if="isDoctorSessionActiveNow(doc, session, now)"
                      class="ml-1.5 px-1.5 py-0.5 rounded text-[10px] bg-emerald-600 text-white font-bold"
                    >
                      Sedang Praktek
                    </span>
                  </div>
                </div>
              </div>

              <!-- Leave notice if applicable -->
              <div
                v-if="doc.onLeave"
                class="pt-2 text-xs text-amber-700 font-semibold flex items-center gap-1.5"
              >
                <AlertCircle class="w-4 h-4 text-amber-600" aria-hidden="true" />
                <span>Dokter cuti pada hari ini</span>
              </div>
            </div>

            <!-- Action button -->
            <Button
              :to="`/reservasi?dokter=${doc.slug}`"
              variant="primary"
              size="sm"
              class="w-full justify-center font-semibold text-xs shadow-sm"
            >
              <CalendarCheck class="w-4 h-4 mr-1.5" aria-hidden="true" />
              <span>Reservasi Jadwal Ini</span>
            </Button>
          </div>
        </div>

        <div
          v-else
          class="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-2"
        >
          <p class="text-sm font-bold text-navy-900">Tidak ada jadwal praktek</p>
          <p class="text-xs text-slate-500">
            Tidak ada dokter yang berpraktek pada hari {{ getDayName(mobileSelectedDay) }}.
          </p>
        </div>
      </div>
    </main>

    <!-- Closing CTA Banner -->
    <HomeCtaBanner />
  </div>
</template>
