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
  RotateCcw,
  Stethoscope,
} from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import doctorsData from '@/data/doctors.json'
import clinicData from '@/data/clinic.json'
import { getDayName, formatDate, formatTimeRangeWib } from '@/lib/format'
import {
  getClinicOpenStatus,
  isDoctorSessionActiveNow,
  isDoctorPracticingOn,
} from '@/lib/schedule'
import { getIsoDayOfWeek, toIsoDateString } from '@/lib/time'
import { useClinic } from '@/composables/useClinic'
import { useI18n } from '@/composables/useI18n'

const { clinic, clinicLink } = useClinic()
const { t, getDoctorSpecialty, getDoctorName, isEnglish } = useI18n()

useHead({
  title: computed(() => isEnglish.value ? `Doctor Practice Schedule | ${clinic.value.name}` : `Jadwal Praktek Dokter | ${clinic.value.name}`),
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
  return getClinicOpenStatus(clinicData.operatingHours, now, isEnglish.value ? 'en' : 'id')
})

// Filtered doctors list
const displayedDoctors = computed(() => {
  let list = doctorsData
  if (selectedDoctorSlug.value !== 'all') {
    list = list.filter((d) => d.slug === selectedDoctorSlug.value)
  }
  return list
})

const englishDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

// 7 days definition
const daysList = computed(() =>
  [1, 2, 3, 4, 5, 6, 7].map((day) => ({
    day,
    dayName: isEnglish.value ? englishDays[day - 1] : getDayName(day),
    isToday: day === currentIsoDay,
  }))
)

// Filtered columns for desktop
const displayedDays = computed(() => {
  if (selectedDay.value !== 'all') {
    return daysList.value.filter((d) => d.day === Number(selectedDay.value))
  }
  return daysList.value
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
    <section class="py-10 sm:py-12 lg:py-14 bg-navy-950 text-white relative overflow-hidden" style="background-color: #081434;">
      <!-- Photographic Background & Balanced Sapphire Blue Tint -->
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          :src="'/images/clinic/header-schedule.webp'"
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
          {{ t('schedule.title') }}
        </h1>

        <p class="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {{ t('schedule.subtitle') }}
        </p>

        <!-- Clinic Operating Hours & Timezone Strip (FR-6.6) -->
        <div class="pt-2 flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm">
          <div class="px-4 py-2 rounded-xl bg-navy-950/60 border border-primary-300/30 text-blue-100 flex items-center gap-2 backdrop-blur-md shadow-sm">
            <Clock class="w-4 h-4 text-blue-300 flex-shrink-0" aria-hidden="true" />
            <span class="font-medium">{{ t('schedule.operatingHoursBanner', { hours: t('schedule.operatingHoursText'), tz: clinicData.timezoneLabel }) }}</span>
          </div>

          <div
            class="px-3.5 py-2 rounded-xl border font-semibold flex items-center gap-2 backdrop-blur-md shadow-sm"
            :class="clinicStatus.isOpen ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300' : 'bg-navy-950/60 border-primary-300/30 text-blue-100'"
          >
            <span
              class="w-2 h-2 rounded-full flex-shrink-0"
              :class="clinicStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'"
            />
            <span>{{ clinicStatus.statusBadge }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Area -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-8">
      <!-- Filter Bar (FR-6.2) -->
      <div class="bg-white rounded-2xl border border-slate-200/90 shadow-card p-4 sm:p-5">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <!-- Filter Dropdowns -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 flex-1 max-w-2xl">
            <!-- Doctor Selector -->
            <div>
              <label for="doctor-filter" class="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                <Stethoscope class="w-3.5 h-3.5 text-primary-600" aria-hidden="true" />
                <span>{{ t('schedule.selectDoctor') }}</span>
              </label>
              <select
                id="doctor-filter"
                v-model="selectedDoctorSlug"
                class="w-full px-3.5 py-2.5 bg-surface-50 hover:bg-white focus:bg-white border border-slate-300 hover:border-slate-400 rounded-xl text-navy-900 text-sm font-medium focus:ring-2 focus:ring-primary-500 focus:outline-none transition-colors min-h-[44px]"
              >
                <option value="all">{{ t('schedule.allDoctorsCount', { count: doctorsData.length }) }}</option>
                <option v-for="d in doctorsData" :key="d.id" :value="d.slug">
                  {{ getDoctorName(d.name) }}
                </option>
              </select>
            </div>

            <!-- Day Selector for Desktop -->
            <div>
              <label for="day-filter" class="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                <Calendar class="w-3.5 h-3.5 text-primary-600" aria-hidden="true" />
                <span>{{ t('schedule.selectDay') }}</span>
              </label>
              <select
                id="day-filter"
                v-model="selectedDay"
                class="w-full px-3.5 py-2.5 bg-surface-50 hover:bg-white focus:bg-white border border-slate-300 hover:border-slate-400 rounded-xl text-navy-900 text-sm font-medium focus:ring-2 focus:ring-primary-500 focus:outline-none transition-colors min-h-[44px]"
              >
                <option value="all">{{ t('schedule.allDaysRange') }}</option>
                <option v-for="d in daysList" :key="d.day" :value="d.day">
                  {{ d.dayName }} {{ d.isToday ? (isEnglish ? '(Today)' : '(Hari Ini)') : '' }}
                </option>
              </select>
            </div>
          </div>

          <!-- Status & Reset Actions -->
          <div class="flex items-center justify-between lg:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <span class="inline-flex items-center px-3 py-1.5 rounded-lg bg-surface-100 text-xs text-slate-600 font-medium border border-slate-200/60">
              {{ isEnglish ? 'Showing ' : 'Menampilkan ' }}&nbsp;<strong class="text-navy-900 font-bold">{{ displayedDoctors.length }}</strong>&nbsp;{{ isEnglish ? 'dentists' : 'dokter' }}
            </span>

            <button
              v-if="selectedDoctorSlug !== 'all' || selectedDay !== 'all'"
              type="button"
              class="inline-flex items-center gap-1.5 text-xs text-primary-700 hover:text-primary-800 font-bold py-2 px-3.5 rounded-xl bg-primary-50 hover:bg-primary-100 border border-primary-200 transition-colors"
              @click="resetFilters"
            >
              <RotateCcw class="w-3.5 h-3.5" aria-hidden="true" />
              <span>{{ t('schedule.resetFilter') }}</span>
            </button>
          </div>
        </div>

        <!-- Quick Day Filter Tabs (Desktop & Tablet) -->
        <div class="hidden md:flex items-center gap-1.5 pt-4 mt-4 border-t border-slate-100 overflow-x-auto">
          <span class="text-xs font-bold text-slate-500 mr-2 flex-shrink-0">{{ t('schedule.quickFilter') }}</span>
          <button
            type="button"
            class="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex-shrink-0"
            :class="selectedDay === 'all' ? 'bg-primary-600 text-white shadow-xs' : 'bg-surface-100 text-slate-700 hover:bg-surface-200 border border-slate-200/80'"
            @click="selectedDay = 'all'"
          >
            {{ t('schedule.allDays') }}
          </button>
          <button
            v-for="d in daysList"
            :key="d.day"
            type="button"
            class="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 flex-shrink-0"
            :class="
              selectedDay === d.day
                ? 'bg-primary-600 text-white shadow-xs'
                : 'bg-surface-100 text-slate-700 hover:bg-surface-200 border border-slate-200/80'
            "
            @click="selectedDay = d.day"
          >
            <span>{{ d.dayName }}</span>
            <span
              v-if="d.isToday"
              class="px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase"
              :class="selectedDay === d.day ? 'bg-white/20 text-white' : 'bg-primary-100 text-primary-800'"
            >
              {{ isEnglish ? 'Today' : 'Hari Ini' }}
            </span>
          </button>
        </div>
      </div>

      <!-- DESKTOP VIEW: Weekly Matrix Table (FR-6.1, FR-6.3, FR-6.4, FR-6.5) -->
      <div class="hidden md:block bg-white rounded-3xl border border-slate-200/90 shadow-card overflow-hidden">
        <div class="w-full">
          <table class="w-full table-fixed border-collapse text-left">
            <thead>
              <tr class="bg-navy-950 text-white text-xs uppercase tracking-wider">
                <th
                  class="p-3 lg:p-4 font-bold border-r border-navy-900/60"
                  :class="displayedDays.length > 1 ? 'w-[23%]' : 'w-1/2'"
                >
                  {{ t('schedule.dentistColumn') }}
                </th>
                <th
                  v-for="d in displayedDays"
                  :key="d.day"
                  class="p-2 lg:p-2.5 font-bold text-center border-r border-navy-900/60 transition-colors"
                  :class="[
                    displayedDays.length > 1 ? 'w-[9.5%]' : 'w-1/4',
                    d.isToday ? 'bg-navy-900 text-white' : ''
                  ]"
                >
                  <div class="flex flex-col items-center justify-center gap-0.5">
                    <span class="tracking-wide text-[11px] lg:text-xs font-bold">{{ d.dayName }}</span>
                    <span
                      v-if="d.isToday"
                      class="inline-block px-1.5 py-0.2 rounded-full text-[8px] lg:text-[9px] font-extrabold bg-primary-500 text-white uppercase shadow-xs"
                    >
                      {{ isEnglish ? 'Today' : 'Hari Ini' }}
                    </span>
                  </div>
                </th>
                <th
                  class="p-3 lg:p-4 font-bold text-center"
                  :class="displayedDays.length > 1 ? 'w-[10.5%]' : 'w-1/4'"
                >
                  {{ t('schedule.actionColumn') }}
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100 text-sm">
              <tr
                v-for="doc in displayedDoctors"
                :key="doc.id"
                class="hover:bg-slate-50/80 transition-colors"
              >
                <!-- Doctor Info Column (Centered Vertically) -->
                <td class="p-3 lg:p-4 align-middle border-r border-slate-100">
                  <div class="flex items-center gap-2.5 lg:gap-3 min-w-0">
                    <div class="w-10 h-10 lg:w-11 lg:h-11 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200 shadow-xs">
                      <ResponsiveImage
                        :src="doc.photo"
                        :alt="doc.name"
                        aspect-ratio="1/1"
                        img-class="w-full h-full object-cover"
                      />
                    </div>
                    <div class="space-y-0.5 min-w-0 flex-1">
                      <RouterLink
                        :to="clinicLink(`/dokter/${doc.slug}`)"
                        class="font-bold text-navy-900 hover:text-primary-700 transition-colors leading-snug block text-xs lg:text-sm truncate"
                        :title="doc.name"
                      >
                        {{ getDoctorName(doc.name) }}
                      </RouterLink>
                      <p class="text-[10px] lg:text-[11px] text-slate-500 font-medium leading-tight truncate" :title="getDoctorSpecialty(doc.specialty)">
                        {{ getDoctorSpecialty(doc.specialty) }}
                      </p>

                      <!-- Leave notice badge (FR-6.4) -->
                      <div
                        v-if="doc.leaveDates && doc.leaveDates.length > 0"
                        class="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-amber-50 border border-amber-200/80 text-[9px] lg:text-[10px] text-amber-800 font-semibold mt-0.5 max-w-full truncate"
                      >
                        <AlertCircle class="w-2.5 h-2.5 text-amber-600 flex-shrink-0" aria-hidden="true" />
                        <span class="truncate">{{ isEnglish ? 'On Leave: ' : 'Cuti: ' }}{{ doc.leaveDates.map((ld) => formatDate(ld, false, isEnglish ? 'en' : 'id')).join(', ') }}</span>
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Day Schedule Columns (Centered Vertically) -->
                <td
                  v-for="d in displayedDays"
                  :key="d.day"
                  class="p-1 lg:p-1.5 align-middle text-center text-xs border-r border-slate-100 transition-colors"
                  :class="d.isToday ? 'bg-primary-50/30' : ''"
                >
                  <template v-if="getDoctorSessions(doc, d.day).length > 0">
                    <div class="space-y-1 flex flex-col items-center justify-center">
                      <div
                        v-for="(session, sIdx) in getDoctorSessions(doc, d.day)"
                        :key="sIdx"
                        class="w-full px-1 py-1 lg:px-1.5 lg:py-1 rounded-lg bg-surface-50 border border-slate-200/90 shadow-xs text-center space-y-0.5 hover:border-primary-300 hover:bg-white transition-all"
                      >
                        <div class="font-bold tracking-tight text-[10px] lg:text-[11px] text-navy-950 whitespace-nowrap">
                          {{ session.start }} – {{ session.end }}
                        </div>

                        <!-- Active session indicator (FR-6.3) -->
                        <div
                          v-if="isDoctorSessionActiveNow(doc, session, now)"
                          class="pt-0.5"
                        >
                          <span class="inline-flex items-center justify-center gap-1 px-1 py-0.2 rounded text-[8px] lg:text-[9px] font-bold bg-emerald-600 text-white shadow-xs w-full truncate">
                            <span class="w-1 h-1 rounded-full bg-white animate-pulse" />
                            {{ t('schedule.practicingNow') }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="flex items-center justify-center py-1">
                      <span class="text-slate-300 font-bold select-none text-xs lg:text-sm">—</span>
                    </div>
                  </template>
                </td>

                <!-- Reservation Action Column (Centered Vertically) -->
                <td class="p-2 lg:p-3 align-middle text-center">
                  <Button
                    :to="clinicLink(`/reservasi?dokter=${doc.slug}`)"
                    variant="primary"
                    size="sm"
                    class="w-full justify-center font-bold text-[11px] lg:text-xs py-1.5 px-2 shadow-xs"
                  >
                    <span>{{ isEnglish ? 'Book' : 'Reservasi' }}</span>
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- MOBILE VIEW: Day Tabs & Doctor Cards (FR-6.1, FR-6.3, FR-6.4, FR-6.5) -->
      <div class="block md:hidden space-y-5">
        <!-- Day Selector Tabs with consistent height -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            v-for="d in daysList"
            :key="d.day"
            type="button"
            class="px-4 py-3 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center min-w-[76px] h-[58px] flex-shrink-0 cursor-pointer shadow-xs"
            :class="
              mobileSelectedDay === d.day
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-primary-300'
            "
            @click="mobileSelectedDay = d.day"
          >
            <span class="text-sm font-extrabold">{{ d.dayName }}</span>
            <span
              v-if="d.isToday"
              class="px-1.5 py-0.2 rounded-full text-[9px] uppercase tracking-wider font-extrabold mt-0.5"
              :class="mobileSelectedDay === d.day ? 'bg-white text-primary-800' : 'bg-primary-100 text-primary-800'"
            >
              {{ isEnglish ? 'Today' : 'Hari Ini' }}
            </span>
            <span v-else class="text-[9px] text-transparent leading-tight mt-0.5 select-none">-</span>
          </button>
        </div>

        <!-- Mobile Doctor Cards for Selected Day -->
        <div v-if="mobileDayDoctors.length > 0" class="space-y-4">
          <div
            v-for="doc in mobileDayDoctors"
            :key="doc.id"
            class="p-5 bg-white rounded-3xl border border-slate-200 shadow-card space-y-4"
          >
            <div class="flex items-start gap-3.5">
              <div class="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200 shadow-xs">
                <ResponsiveImage
                  :src="doc.photo"
                  :alt="doc.name"
                  aspect-ratio="1/1"
                  img-class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1 min-w-0 space-y-1">
                <RouterLink
                  :to="clinicLink(`/dokter/${doc.slug}`)"
                  class="text-base font-bold text-navy-900 hover:text-primary-700 transition-colors leading-snug block"
                >
                  {{ getDoctorName(doc.name) }}
                </RouterLink>
                <p class="text-xs text-slate-500 font-medium">
                  {{ getDoctorSpecialty(doc.specialty) }}
                </p>
              </div>
            </div>

            <!-- Sessions info -->
            <div class="p-3.5 rounded-2xl bg-surface-100 border border-slate-200/80 space-y-2.5">
              <div class="flex items-start justify-between text-xs gap-3">
                <span class="text-slate-500 font-medium pt-0.5">{{ t('schedule.practiceHoursLabel') }}</span>
                <div class="space-y-1.5 text-right flex-1">
                  <div
                    v-for="(session, sIdx) in doc.sessions"
                    :key="sIdx"
                    class="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-1.5 font-bold text-navy-900"
                  >
                    <span>{{ session.start }} – {{ session.end }} WIB</span>
                    <span
                      v-if="isDoctorSessionActiveNow(doc, session, now)"
                      class="px-1.5 py-0.5 rounded-md text-[10px] bg-emerald-600 text-white font-bold shadow-xs"
                    >
                      {{ t('schedule.practicingNow') }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Leave notice if applicable -->
              <div
                v-if="doc.onLeave"
                class="pt-2 border-t border-slate-200 text-xs text-amber-700 font-semibold flex items-center gap-1.5"
              >
                <AlertCircle class="w-4 h-4 text-amber-600 flex-shrink-0" aria-hidden="true" />
                <span>{{ t('schedule.doctorOnLeaveToday') }}</span>
              </div>
            </div>

            <!-- Action button -->
            <Button
              :to="clinicLink(`/reservasi?dokter=${doc.slug}`)"
              variant="primary"
              size="md"
              class="w-full justify-center font-bold text-sm shadow-xs"
            >
              <CalendarCheck class="w-4 h-4 mr-2" aria-hidden="true" />
              <span>{{ t('schedule.bookThisSchedule') }}</span>
            </Button>
          </div>
        </div>

        <div
          v-else
          class="p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2"
        >
          <p class="text-sm font-bold text-navy-900">{{ t('schedule.noPracticeSchedule') }}</p>
          <p class="text-xs text-slate-500">
            {{ t('schedule.noDoctorPracticingDay', { day: isEnglish ? englishDays[mobileSelectedDay - 1] : getDayName(mobileSelectedDay) }) }}
          </p>
        </div>
      </div>

    </main>
  </div>
</template>
