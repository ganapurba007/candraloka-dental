<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  User,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Info,
  Copy,
  Check,
  Stethoscope,
  Trash2,
  HelpCircle,
  ChevronRight,
  UserCheck,
} from 'lucide-vue-next'
import IconWhatsApp from '@/components/ui/IconWhatsApp.vue'
import StepIndicator from '@/components/ui/StepIndicator.vue'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import { useToast } from '@/composables/useToast'
import servicesData from '@/data/services.json'
import doctorsData from '@/data/doctors.json'
import clinicData from '@/data/clinic.json'
import {
  formatDate,
  formatDateShort,
  formatTimeWib,
  formatDuration,
  getDayName,
} from '@/lib/format'
import {
  getSlotsForDoctor,
  getSlotsForAnyDoctor,
  getDateAvailabilityStatus,
} from '@/lib/availability'
import { groupSlotsByPeriod } from '@/lib/schedule'
import {
  generateReservationCode,
  getStoredReservations,
  saveReservationToStorage,
  clearStoredReservations,
  getBookingDraft,
  saveBookingDraft,
  clearBookingDraft,
} from '@/lib/reservation'
import { buildReservationWhatsApp } from '@/lib/whatsapp'
import { patientFormSchema } from '@/lib/schemas'
import { addDaysToIso, toIsoDateString } from '@/lib/time'

useHead({
  title: 'Reservasi Online | Candraloka Dental Care',
  meta: [
    {
      name: 'description',
      content: 'Buat janji temu reservasi online klinik gigi Candraloka Dental Care dalam 4 langkah mudah berbasis ketersediaan waktu nyata.',
    },
  ],
})

const route = useRoute()
const router = useRouter()
const { success: toastSuccess, error: toastError, info: toastInfo } = useToast()


const steps = [
  { number: 1, title: 'Layanan' },
  { number: 2, title: 'Dokter' },
  { number: 3, title: 'Jadwal' },
  { number: 4, title: 'Data Pasien' },
]

// State variables
const currentStep = ref(1)
const selectedServiceId = ref(null)
const selectedDoctorId = ref('any') // 'any' or number
const selectedDate = ref('')
const selectedTime = ref('')
const assignedDoctorId = ref(null)

const patientForm = ref({
  name: '',
  whatsapp: '',
  email: '',
  isNewPatient: true,
  notes: '',
  agreement: false,
  honeypot: '',
})

const formErrors = ref({})
const isSubmitting = ref(false)
const confirmedReservation = ref(null)
const copiedCode = ref(false)
const copiedSummary = ref(false)

// Stored reservations reactive trigger
const storageVersion = ref(0)
const storedReservations = computed(() => {
  // eslint-disable-next-line no-unused-expressions
  storageVersion.value
  return getStoredReservations()
})

// Selected entities
const selectedService = computed(() =>
  servicesData.find((s) => s.id === selectedServiceId.value)
)

const eligibleDoctors = computed(() => {
  if (!selectedService.value) return doctorsData
  return doctorsData.filter(
    (d) => d.serviceIds && d.serviceIds.includes(selectedService.value.id)
  )
})

const selectedDoctor = computed(() => {
  if (selectedDoctorId.value === 'any') {
    return assignedDoctorId.value
      ? doctorsData.find((d) => d.id === assignedDoctorId.value)
      : null
  }
  return doctorsData.find((d) => d.id === selectedDoctorId.value)
})

// 14 days date strip starting from today (FR-7.4)
const dateStrip = computed(() => {
  const now = new Date()
  const days = []
  const dur = selectedService.value ? selectedService.value.durationMinutes : 30

  const todayIso = toIsoDateString(now)
  for (let i = 0; i < 14; i++) {
    const isoDate = addDaysToIso(todayIso, i)
    const status = getDateAvailabilityStatus({
      doctors: doctorsData,
      serviceId: selectedServiceId.value,
      doctorId: selectedDoctorId.value,
      targetIsoDate: isoDate,
      durationMinutes: dur,
      slotMinutes: clinicData.reservation.slotMinutes,
      savedReservations: storedReservations.value,
      now,
      minLeadMinutes: clinicData.reservation.minLeadMinutes,
    })

    days.push({
      isoDate,
      shortDate: formatDateShort(isoDate),
      dayNameShort: getDayName(new Date(isoDate).getUTCDay() === 0 ? 7 : new Date(isoDate).getUTCDay()).slice(0, 3),
      status, // 'tersedia' | 'penuh' | 'libur'
      isToday: i === 0,
    })
  }

  return days
})

// Available time slots on selected date (FR-7.4, FR-7.5)
const availableSlots = computed(() => {
  if (!selectedDate.value || !selectedService.value) return []
  const now = new Date()
  const dur = selectedService.value.durationMinutes

  if (selectedDoctorId.value !== 'any') {
    const doc = doctorsData.find((d) => d.id === selectedDoctorId.value)
    if (!doc) return []
    return getSlotsForDoctor({
      doctor: doc,
      targetIsoDate: selectedDate.value,
      durationMinutes: dur,
      slotMinutes: clinicData.reservation.slotMinutes,
      savedReservations: storedReservations.value,
      now,
      minLeadMinutes: clinicData.reservation.minLeadMinutes,
    })
  } else {
    return getSlotsForAnyDoctor({
      doctors: doctorsData,
      serviceId: selectedService.value.id,
      targetIsoDate: selectedDate.value,
      durationMinutes: dur,
      slotMinutes: clinicData.reservation.slotMinutes,
      savedReservations: storedReservations.value,
      now,
      minLeadMinutes: clinicData.reservation.minLeadMinutes,
    })
  }
})

// Grouped slots by period (Pagi, Siang, Sore)
const groupedSlotPeriods = computed(() => {
  return groupSlotsByPeriod(availableSlots.value)
})

// Initialize from URL query and session draft synchronously
function initBookingState() {
  // 1. Check URL query params (FR-7.1)
  if (route.query && route.query.layanan) {
    const srv = servicesData.find((s) => s.slug === route.query.layanan)
    if (srv) {
      selectedServiceId.value = srv.id
      currentStep.value = 2
    }
  }

  if (route.query && route.query.dokter) {
    const doc = doctorsData.find((d) => d.slug === route.query.dokter)
    if (doc) {
      selectedDoctorId.value = doc.id
      // If service is not yet selected, pick doc's first service
      if (!selectedServiceId.value && doc.serviceIds && doc.serviceIds.length > 0) {
        selectedServiceId.value = doc.serviceIds[0]
      }
      currentStep.value = 3
    }
  }

  // 2. Restore draft from sessionStorage if exists (FR-7.11)
  const draft = getBookingDraft()
  if (draft && (!route.query || (!route.query.layanan && !route.query.dokter))) {
    if (draft.step) currentStep.value = draft.step
    if (draft.serviceId) selectedServiceId.value = draft.serviceId
    if (draft.doctorId !== undefined) selectedDoctorId.value = draft.doctorId
    if (draft.date) selectedDate.value = draft.date
    if (draft.time) selectedTime.value = draft.time
    if (draft.assignedDoctorId) assignedDoctorId.value = draft.assignedDoctorId
    if (draft.patientForm) patientForm.value = { ...patientForm.value, ...draft.patientForm }
  }

  // Auto-select first available date if none selected
  if (!selectedDate.value && dateStrip.value.length > 0) {
    const firstAvail = dateStrip.value.find((d) => d.status === 'tersedia')
    if (firstAvail) {
      selectedDate.value = firstAvail.isoDate
    } else {
      selectedDate.value = dateStrip.value[0].isoDate
    }
  }
}

initBookingState()

// Save draft on state changes (FR-7.11)
watch(
  [
    currentStep,
    selectedServiceId,
    selectedDoctorId,
    selectedDate,
    selectedTime,
    assignedDoctorId,
    patientForm,
  ],
  () => {
    if (!confirmedReservation.value) {
      saveBookingDraft({
        step: currentStep.value,
        serviceId: selectedServiceId.value,
        doctorId: selectedDoctorId.value,
        date: selectedDate.value,
        time: selectedTime.value,
        assignedDoctorId: assignedDoctorId.value,
        patientForm: patientForm.value,
      })
    }
  },
  { deep: true }
)

// Reset date slot if service or doctor changes
watch([selectedServiceId, selectedDoctorId], () => {
  selectedTime.value = ''
  assignedDoctorId.value = null
})

// Step navigation
function goToStep(stepNum) {
  if (stepNum < 1 || stepNum > 4) return
  if (stepNum > 1 && !selectedServiceId.value) return
  if (stepNum > 2 && selectedDoctorId.value === null) return
  if (stepNum > 3 && (!selectedDate.value || !selectedTime.value)) return

  currentStep.value = stepNum
  window.scrollTo({ top: 120, behavior: 'smooth' })
}

function selectService(srvId) {
  selectedServiceId.value = srvId
  // If current selected doctor does not handle this new service, reset doctor
  if (selectedDoctorId.value !== 'any') {
    const doc = doctorsData.find((d) => d.id === selectedDoctorId.value)
    if (!doc || !doc.serviceIds.includes(srvId)) {
      selectedDoctorId.value = 'any'
    }
  }
}

function selectSlot(slot) {
  if (slot.status !== 'tersedia') return
  selectedTime.value = slot.time

  if (selectedDoctorId.value === 'any') {
    assignedDoctorId.value = slot.doctorId
  }
}

function jumpToNextAvailableDate() {
  const currentIdx = dateStrip.value.findIndex((d) => d.isoDate === selectedDate.value)
  const nextAvail = dateStrip.value.slice(currentIdx + 1).find((d) => d.status === 'tersedia')
  if (nextAvail) {
    selectedDate.value = nextAvail.isoDate
    selectedTime.value = ''
  } else {
    toastInfo('Tidak ada tanggal tersedia lainnya dalam 14 hari ke depan.')
  }
}

// Date strip keyboard navigation (UX-8)
function onDateStripKeydown(event, currentIndex) {
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault()
    const nextIndex = (currentIndex + 1) % dateStrip.value.length
    selectedDate.value = dateStrip.value[nextIndex].isoDate
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault()
    const prevIndex = (currentIndex - 1 + dateStrip.value.length) % dateStrip.value.length
    selectedDate.value = dateStrip.value[prevIndex].isoDate
  }
}

// Form validation (FR-7.6)
function validatePatientForm() {
  formErrors.value = {}

  // Honeypot anti-spam check
  if (patientForm.value.honeypot) {
    return false
  }

  // Agreement check
  if (!patientForm.value.agreement) {
    formErrors.value.agreement = 'Centang persetujuan untuk melanjutkan'
  }

  const result = patientFormSchema.safeParse({
    name: patientForm.value.name,
    whatsapp: patientForm.value.whatsapp,
    email: patientForm.value.email,
    isNewPatient: patientForm.value.isNewPatient,
    notes: patientForm.value.notes,
  })

  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0]
      if (!formErrors.value[field]) {
        formErrors.value[field] = issue.message
      }
    }
  }

  return Object.keys(formErrors.value).length === 0
}

// Submit reservation (FR-7.7)
async function submitReservation() {
  if (!validatePatientForm()) return

  isSubmitting.value = true

  // Simulate network check delay (1.2s)
  await new Promise((resolve) => setTimeout(resolve, 1200))

  // Re-check slot availability (anti-collision guard)
  const currentSlots = availableSlots.value
  const targetSlot = currentSlots.find((s) => s.time === selectedTime.value)

  if (!targetSlot || targetSlot.status !== 'tersedia') {
    isSubmitting.value = false
    toastError('Jam ini baru saja terisi, silakan pilih jam lain.')
    currentStep.value = 3
    selectedTime.value = ''
    return
  }

  // Slot confirmed!
  const finalDoctorId =
    selectedDoctorId.value === 'any' ? assignedDoctorId.value : selectedDoctorId.value
  const doctorObj = doctorsData.find((d) => d.id === finalDoctorId)
  const code = generateReservationCode(selectedDate.value)

  const newReservation = {
    code,
    serviceId: selectedService.value.id,
    serviceName: selectedService.value.name,
    doctorId: finalDoctorId,
    doctorName: doctorObj ? doctorObj.name : 'Dokter Klinik',
    date: selectedDate.value,
    time: selectedTime.value,
    durationMinutes: selectedService.value.durationMinutes,
    patient: {
      name: patientForm.value.name,
      whatsapp: patientForm.value.whatsapp,
      email: patientForm.value.email,
      isNewPatient: patientForm.value.isNewPatient,
      notes: patientForm.value.notes,
    },
    status: 'menunggu-konfirmasi',
    createdAt: new Date().toISOString(),
  }

  // Save to localStorage (FR-7.9)
  saveReservationToStorage(newReservation)
  storageVersion.value++
  clearBookingDraft()

  confirmedReservation.value = newReservation
  isSubmitting.value = false
  toastSuccess('Reservasi berhasil dibuat!')
  window.scrollTo({ top: 100, behavior: 'smooth' })
}

// WhatsApp Confirmation Builder (FR-7.8)
const waConfirmationData = computed(() => {
  if (!confirmedReservation.value) return { text: '', url: '#' }
  return buildReservationWhatsApp({
    clinicWhatsapp: clinicData.contact.whatsapp,
    code: confirmedReservation.value.code,
    patient: confirmedReservation.value.patient,
    serviceName: confirmedReservation.value.serviceName,
    doctorName: confirmedReservation.value.doctorName,
    date: confirmedReservation.value.date,
    time: confirmedReservation.value.time,
  })
})

async function copyReservationCode() {
  if (!confirmedReservation.value) return
  try {
    await navigator.clipboard.writeText(confirmedReservation.value.code)
    copiedCode.value = true
    toastSuccess('Kode reservasi berhasil disalin!')
    setTimeout(() => {
      copiedCode.value = false
    }, 2000)
  } catch {
    toastError('Gagal menyalin kode.')
  }
}

async function copyReservationSummary() {
  if (!waConfirmationData.value.text) return
  try {
    await navigator.clipboard.writeText(waConfirmationData.value.text)
    copiedSummary.value = true
    toastSuccess('Ringkasan reservasi berhasil disalin!')
    setTimeout(() => {
      copiedSummary.value = false
    }, 2000)
  } catch {
    toastError('Gagal menyalin ringkasan.')
  }
}

function makeAnotherReservation() {
  confirmedReservation.value = null
  currentStep.value = 1
  selectedServiceId.value = null
  selectedDoctorId.value = 'any'
  selectedDate.value = ''
  selectedTime.value = ''
  assignedDoctorId.value = null
  patientForm.value = {
    name: '',
    whatsapp: '',
    email: '',
    isNewPatient: true,
    notes: '',
    agreement: false,
    honeypot: '',
  }
  clearBookingDraft()
  window.scrollTo({ top: 100, behavior: 'smooth' })
}

// Clear stored reservations on device (FR-7.10)
function handleClearStoredReservations() {
  if (confirm('Hapus seluruh data riwayat reservasi tersimpan di browser ini?')) {
    clearStoredReservations()
    storageVersion.value++
    toastSuccess('Data reservasi di perangkat ini berhasil dikosongkan.')
  }
}
</script>

<template>
  <div class="flex-1 flex flex-col bg-surface-50 min-h-screen">
    <!-- Header Section -->
    <section class="py-10 sm:py-12 lg:py-14 bg-navy-950 text-white relative overflow-hidden" style="background-color: #081434;">
      <!-- Photographic Background & Balanced Sapphire Blue Tint -->
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          :src="'/images/clinic/header-booking.webp'"
          alt=""
          class="w-full h-full object-cover object-center scale-100 opacity-65 sm:opacity-75"
          loading="eager"
        />
        <div
          class="absolute inset-0"
          style="background: linear-gradient(180deg, rgba(8, 20, 52, 0.62) 0%, rgba(13, 36, 88, 0.48) 50%, rgba(8, 20, 52, 0.76) 100%);"
        />
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-2.5">
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
          Buat Janji Temu Perawatan Gigi
        </h1>

        <p class="text-sm sm:text-base text-slate-100 max-w-xl mx-auto leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Pilih layanan, dokter, serta tanggal dan jam yang sesuai. Terjadwal rapi dan transparan.
        </p>
      </div>
    </section>

    <!-- Main Container -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-10">
      <!-- SUCCESS CONFIRMATION STATE (FR-7.8) -->
      <div v-if="confirmedReservation" class="max-w-3xl mx-auto space-y-8">
        <div class="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-10 text-center space-y-6">
          <!-- Animated Check Icon -->
          <div class="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 class="w-10 h-10" aria-hidden="true" />
          </div>

          <div class="space-y-2">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
              Menunggu Konfirmasi Klinik
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              Reservasi Berhasil Dibuat!
            </h2>
            <p class="text-sm text-slate-600 max-w-lg mx-auto">
              Simpan kode reservasi Anda atau langsung kirimkan rincian reservasi melalui WhatsApp resmi klinik.
            </p>
          </div>

          <!-- Code Box -->
          <div class="p-4 sm:p-5 rounded-2xl bg-surface-100 border-2 border-dashed border-primary-300 flex items-center justify-between gap-4 max-w-md mx-auto">
            <div class="text-left space-y-0.5">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Kode Reservasi</span>
              <p class="text-xl sm:text-2xl font-black text-navy-900 tracking-wide font-mono">
                {{ confirmedReservation.code }}
              </p>
            </div>
            <button
              type="button"
              class="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-primary-400 text-slate-700 hover:text-primary-700 font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              @click="copyReservationCode"
            >
              <Check v-if="copiedCode" class="w-4 h-4 text-emerald-600" aria-hidden="true" />
              <Copy v-else class="w-4 h-4 text-primary-600" aria-hidden="true" />
              <span>{{ copiedCode ? 'Tersalin' : 'Salin Kode' }}</span>
            </button>
          </div>

          <!-- Details Summary Table -->
          <div class="p-6 rounded-2xl bg-surface-50 border border-slate-200/80 text-left space-y-3.5 text-sm">
            <h3 class="font-bold text-navy-900 border-b border-slate-200 pb-2">
              Ringkasan Jadwal Kunjungan
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
              <div>
                <span class="text-xs text-slate-400 block">Layanan:</span>
                <span class="font-semibold text-navy-900">{{ confirmedReservation.serviceName }}</span>
              </div>
              <div>
                <span class="text-xs text-slate-400 block">Dokter:</span>
                <span class="font-semibold text-navy-900">{{ confirmedReservation.doctorName }}</span>
              </div>
              <div>
                <span class="text-xs text-slate-400 block">Hari & Tanggal:</span>
                <span class="font-semibold text-navy-900">{{ formatDate(confirmedReservation.date, true) }}</span>
              </div>
              <div>
                <span class="text-xs text-slate-400 block">Jam Praktek:</span>
                <span class="font-semibold text-navy-900">{{ formatTimeWib(confirmedReservation.time) }} (±{{ confirmedReservation.durationMinutes }} mnt)</span>
              </div>
              <div>
                <span class="text-xs text-slate-400 block">Nama Pasien:</span>
                <span class="font-semibold text-navy-900">{{ confirmedReservation.patient.name }}</span>
              </div>
              <div>
                <span class="text-xs text-slate-400 block">No. WhatsApp:</span>
                <span class="font-semibold text-navy-900">{{ confirmedReservation.patient.whatsapp }}</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3 pt-2">
            <a
              :href="waConfirmationData.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition-colors shadow-lg gap-2"
            >
              <IconWhatsApp class="w-5 h-5" />
              <span>Kirim Konfirmasi via WhatsApp</span>
            </a>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="outline"
                size="md"
                class="w-full sm:w-auto text-xs font-semibold"
                @click="copyReservationSummary"
              >
                <Copy class="w-4 h-4 mr-1.5" aria-hidden="true" />
                <span>{{ copiedSummary ? 'Ringkasan Tersalin' : 'Salin Ringkasan' }}</span>
              </Button>

              <Button
                variant="outline"
                size="md"
                class="w-full sm:w-auto text-xs font-semibold"
                @click="makeAnotherReservation"
              >
                <span>Buat Reservasi Lain</span>
              </Button>
            </div>
          </div>

          <!-- Portfolio Project Disclaimer (FR-7.8) -->
          <p class="text-xs text-slate-400 italic pt-4 border-t border-slate-100">
            Situs ini adalah proyek portofolio; reservasi ini disimpan di browser Anda untuk keperluan demonstrasi dan tidak diproses oleh klinik sungguhan.
          </p>
        </div>
      </div>

      <!-- ACTIVE BOOKING FLOW (FR-7.1 - FR-7.7) -->
      <div v-else class="space-y-8">
        <!-- Step Indicator (FR-7.1) -->
        <div class="max-w-3xl mx-auto">
          <StepIndicator :steps="steps" :current-step="currentStep" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Main Step Content (8 cols) -->
          <div class="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-9 space-y-8">
            <!-- LANGKAH 1: PILIH LAYANAN (FR-7.2) -->
            <section v-if="currentStep === 1" class="space-y-6">
              <div class="space-y-1">
                <h2 class="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight">
                  Langkah 1: Pilih Layanan Perawatan
                </h2>
                <p class="text-sm text-slate-500">
                  Pilih salah satu layanan gigi yang Anda butuhkan.
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  v-for="srv in servicesData"
                  :key="srv.id"
                  class="p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
                  :class="
                    selectedServiceId === srv.id
                      ? 'border-primary-500 bg-primary-50/30 ring-2 ring-primary-500/20 shadow-sm'
                      : 'border-slate-200 hover:border-primary-300 hover:bg-slate-50'
                  "
                  @click="selectService(srv.id)"
                >
                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-semibold uppercase tracking-wider text-primary-600">
                        {{ srv.category }}
                      </span>
                      <div
                        class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
                        :class="
                          selectedServiceId === srv.id
                            ? 'border-primary-600 bg-primary-600 text-white'
                            : 'border-slate-300'
                        "
                      >
                        <Check v-if="selectedServiceId === srv.id" class="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>
                    <h3 class="text-base font-bold text-navy-900 group-hover:text-primary-700 transition-colors">
                      {{ srv.name }}
                    </h3>
                    <p class="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {{ srv.summary }}
                    </p>
                  </div>

                  <div class="flex items-center gap-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
                    <Clock class="w-3.5 h-3.5 text-primary-600" aria-hidden="true" />
                    <span>Durasi: {{ formatDuration(srv.durationMinutes) }}</span>
                  </div>
                </div>
              </div>

              <!-- Step 1 Actions -->
              <div class="pt-4 flex justify-end">
                <Button
                  variant="primary"
                  size="md"
                  :disabled="!selectedServiceId"
                  class="font-semibold shadow-md"
                  @click="goToStep(2)"
                >
                  <span>Lanjut Pilih Dokter</span>
                  <ArrowRight class="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
              </div>
            </section>

            <!-- LANGKAH 2: PILIH DOKTER (FR-7.3) -->
            <section v-else-if="currentStep === 2" class="space-y-6">
              <div class="space-y-1">
                <h2 class="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight">
                  Langkah 2: Pilih Dokter Gigi
                </h2>
                <p class="text-sm text-slate-500">
                  Pilih dokter yang menangani {{ selectedService ? selectedService.name : 'layanan ini' }}, atau pilih dokter mana saja yang tersedia.
                </p>
              </div>

              <div class="space-y-4">
                <!-- Option 1: Any doctor (Default) -->
                <div
                  class="p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 group"
                  :class="
                    selectedDoctorId === 'any'
                      ? 'border-primary-500 bg-primary-50/30 ring-2 ring-primary-500/20 shadow-sm'
                      : 'border-slate-200 hover:border-primary-300 hover:bg-slate-50'
                  "
                  @click="selectedDoctorId = 'any'"
                >
                  <div class="flex items-center gap-3.5">
                    <div class="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0">
                      <Stethoscope class="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <h3 class="text-base font-bold text-navy-900 group-hover:text-primary-700 transition-colors">
                          Dokter Mana Saja yang Tersedia
                        </h3>
                        <span class="text-xs font-bold text-primary-600 uppercase tracking-wider">(Rekomendasi)</span>
                      </div>
                      <p class="text-xs text-slate-500 leading-relaxed">
                        Sistem menetapkan dokter yang paling optimal secara otomatis saat Anda memilih jam.
                      </p>
                    </div>
                  </div>

                  <div
                    class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    :class="
                      selectedDoctorId === 'any'
                        ? 'border-primary-600 bg-primary-600 text-white'
                        : 'border-slate-300'
                    "
                  >
                    <Check v-if="selectedDoctorId === 'any'" class="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                <!-- Option 2: Specific Doctors handling this service -->
                <div
                  v-for="doc in eligibleDoctors"
                  :key="doc.id"
                  class="p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 group"
                  :class="
                    selectedDoctorId === doc.id
                      ? 'border-primary-500 bg-primary-50/30 ring-2 ring-primary-500/20 shadow-sm'
                      : 'border-slate-200 hover:border-primary-300 hover:bg-slate-50'
                  "
                  @click="selectedDoctorId = doc.id"
                >
                  <div class="flex items-center gap-3.5">
                    <div class="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                      <ResponsiveImage
                        :src="doc.photo"
                        :alt="doc.name"
                        aspect-ratio="1/1"
                        img-class="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 class="text-base font-bold text-navy-900 group-hover:text-primary-700 transition-colors">
                        {{ doc.name }}
                      </h3>
                      <p class="text-xs text-slate-500">
                        {{ doc.specialty }} • {{ doc.experienceYears }} Thn Pengalaman
                      </p>
                    </div>
                  </div>

                  <div
                    class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    :class="
                      selectedDoctorId === doc.id
                        ? 'border-primary-600 bg-primary-600 text-white'
                        : 'border-slate-300'
                    "
                  >
                    <Check v-if="selectedDoctorId === doc.id" class="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>
              </div>

              <!-- Step 2 Actions -->
              <div class="pt-4 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="md"
                  class="font-semibold text-xs"
                  @click="goToStep(1)"
                >
                  <ArrowLeft class="w-4 h-4 mr-1.5" aria-hidden="true" />
                  <span>Kembali ke Layanan</span>
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  class="font-semibold shadow-md"
                  @click="goToStep(3)"
                >
                  <span>Lanjut Pilih Jadwal</span>
                  <ArrowRight class="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
              </div>
            </section>

            <!-- LANGKAH 3: PILIH TANGGAL & JAM (FR-7.4 & FR-7.5) -->
            <section v-else-if="currentStep === 3" class="space-y-8">
              <div class="space-y-1">
                <h2 class="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight">
                  Langkah 3: Pilih Tanggal & Jam Praktek
                </h2>
                <p class="text-sm text-slate-500">
                  Pilih tanggal dalam 14 hari ke depan dan slot jam yang masih tersedia.
                </p>
              </div>

              <!-- 14 Days Date Strip Navigator (FR-7.4) -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Pilih Tanggal Kunjungan:
                  </span>
                  <button
                    type="button"
                    class="text-xs font-semibold text-primary-700 hover:text-primary-800 underline underline-offset-2"
                    @click="jumpToNextAvailableDate"
                  >
                    Ke Tanggal Tersedia Berikutnya
                  </button>
                </div>

                <div
                  role="radiogroup"
                  aria-label="Pilih tanggal kunjungan"
                  class="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none"
                >
                  <button
                    v-for="(d, idx) in dateStrip"
                    :key="d.isoDate"
                    type="button"
                    role="radio"
                    :aria-checked="selectedDate === d.isoDate"
                    :tabindex="selectedDate === d.isoDate ? 0 : -1"
                    :aria-label="`${d.dayNameShort}, ${d.shortDate}, status: ${d.status === 'tersedia' ? 'Tersedia' : d.status === 'penuh' ? 'Penuh' : 'Libur'}`"
                    class="p-3 rounded-2xl text-xs font-bold flex flex-col items-center gap-1.5 flex-shrink-0 min-w-[76px] transition-all cursor-pointer border"
                    :class="[
                      selectedDate === d.isoDate
                        ? 'border-primary-600 bg-primary-600 text-white shadow-md'
                        : d.status === 'tersedia'
                        ? 'border-slate-200 bg-white text-navy-900 hover:border-primary-300 hover:bg-slate-50'
                        : d.status === 'penuh'
                        ? 'border-rose-200 bg-rose-50/50 text-slate-700'
                        : 'border-slate-100 bg-slate-50 text-slate-400',
                    ]"
                    @click="selectedDate = d.isoDate"
                    @keydown="onDateStripKeydown($event, idx)"
                  >
                    <span class="text-[11px] font-medium uppercase">{{ d.dayNameShort }}</span>
                    <span class="text-sm font-extrabold">{{ d.shortDate }}</span>

                    <!-- Status indicator text (not only color, satisfies UX principles) -->
                    <span
                      class="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold"
                      :class="[
                        selectedDate === d.isoDate
                          ? 'bg-white text-primary-800'
                          : d.status === 'tersedia'
                          ? 'bg-emerald-100 text-emerald-800'
                          : d.status === 'penuh'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-200 text-slate-600',
                      ]"
                    >
                      {{ d.status === 'tersedia' ? 'Tersedia' : d.status === 'penuh' ? 'Penuh' : 'Libur' }}
                    </span>
                  </button>
                </div>
              </div>

              <!-- Time Slots Grouped by Period (Pagi, Siang, Sore) -->
              <div class="space-y-6 pt-2">
                <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 class="text-base font-bold text-navy-900">
                      Slot Jam Tersedia: {{ formatDate(selectedDate, true) }}
                    </h3>
                    <p class="text-xs text-slate-500">
                      Estimasi durasi: {{ selectedService ? formatDuration(selectedService.durationMinutes) : '30 menit' }}
                    </p>
                  </div>
                </div>

                <div v-if="groupedSlotPeriods.length > 0" class="space-y-6">
                  <div
                    v-for="period in groupedSlotPeriods"
                    :key="period.id"
                    class="space-y-3"
                  >
                    <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {{ period.label }}
                    </h4>

                    <div
                      role="radiogroup"
                      :aria-label="`Pilih jam kunjungan sesi ${period.label}`"
                      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5"
                    >
                      <button
                        v-for="slot in period.slots"
                        :key="slot.time"
                        type="button"
                        role="radio"
                        :aria-checked="selectedTime === slot.time"
                        :aria-disabled="slot.status !== 'tersedia'"
                        :aria-label="`${slot.time} WIB, ${slot.status === 'tersedia' ? 'Tersedia' : slot.reason || 'Penuh'}`"
                        :disabled="slot.status !== 'tersedia'"
                        class="p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 min-h-[44px]"
                        :class="[
                          selectedTime === slot.time
                            ? 'bg-primary-600 text-white border-primary-600 shadow-md ring-2 ring-primary-600/30'
                            : slot.status === 'tersedia'
                            ? 'bg-white border-slate-200 text-navy-900 hover:border-primary-400 hover:text-primary-700 hover:bg-primary-50/30 cursor-pointer'
                            : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-75',
                        ]"
                        @click="selectSlot(slot)"
                      >
                        <span class="text-sm font-extrabold">{{ slot.time }} WIB</span>
                        <span
                          class="text-[10px] font-medium"
                          :class="
                            selectedTime === slot.time
                              ? 'text-primary-100'
                              : slot.status === 'tersedia'
                              ? 'text-emerald-700'
                              : 'text-slate-400'
                          "
                        >
                          {{ slot.status === 'tersedia' ? 'Tersedia' : slot.reason || 'Penuh' }}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  v-else
                  class="p-8 text-center bg-surface-50 rounded-2xl border border-slate-200 space-y-2"
                >
                  <p class="text-sm font-bold text-navy-900">Tidak ada jam praktek tersedia</p>
                  <p class="text-xs text-slate-500">
                    Tidak ada dokter yang berpraktek atau seluruh slot pada tanggal ini sudah terisi.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    class="font-semibold text-xs mt-2"
                    @click="jumpToNextAvailableDate"
                  >
                    Cari Tanggal Lain yang Tersedia
                  </Button>
                </div>

                <!-- Assigned Doctor Notice for Any Doctor option -->
                <div
                  v-if="selectedDoctorId === 'any' && selectedTime && assignedDoctorId"
                  class="p-4 rounded-2xl bg-primary-50/60 border border-primary-200 flex items-center gap-3"
                >
                  <div class="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0">
                    <UserCheck class="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div class="text-xs space-y-0.5">
                    <span class="font-bold text-navy-900">
                      Dokter yang Ditetapkan: {{ selectedDoctor ? selectedDoctor.name : '' }}
                    </span>
                    <p class="text-slate-600">
                      {{ selectedDoctor ? selectedDoctor.specialty : '' }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Step 3 Actions -->
              <div class="pt-4 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="md"
                  class="font-semibold text-xs"
                  @click="goToStep(2)"
                >
                  <ArrowLeft class="w-4 h-4 mr-1.5" aria-hidden="true" />
                  <span>Kembali ke Dokter</span>
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  :disabled="!selectedDate || !selectedTime"
                  class="font-semibold shadow-md"
                  @click="goToStep(4)"
                >
                  <span>Lanjut Isi Data Pasien</span>
                  <ArrowRight class="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
              </div>
            </section>

            <!-- LANGKAH 4: DATA PASIEN & KONFIRMASI (FR-7.6 & FR-7.7) -->
            <section v-else-if="currentStep === 4" class="space-y-8">
              <div class="space-y-1">
                <h2 class="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight">
                  Langkah 4: Data Pasien & Konfirmasi
                </h2>
                <p class="text-sm text-slate-500">
                  Lengkapi identitas pasien untuk memproses reservasi janji temu.
                </p>
              </div>

              <form class="space-y-6" @submit.prevent="submitReservation">
                <!-- Honeypot anti-spam field (hidden) -->
                <input
                  v-model="patientForm.honeypot"
                  type="text"
                  name="clinic_hp"
                  class="hidden"
                  tabindex="-1"
                  autocomplete="off"
                />

                <!-- Nama Lengkap -->
                <div class="space-y-1.5">
                  <label for="name" class="block text-xs font-bold uppercase tracking-wider text-navy-900">
                    Nama Lengkap Pasien <span class="text-rose-500">*</span>
                  </label>
                  <input
                    id="name"
                    v-model="patientForm.name"
                    type="text"
                    placeholder="Contoh: Budi Santoso"
                    class="w-full px-4 py-3 bg-surface-50 border rounded-xl text-navy-900 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                    :class="formErrors.name ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'"
                    :aria-invalid="!!formErrors.name"
                    :aria-describedby="formErrors.name ? 'name-error' : undefined"
                  />
                  <p v-if="formErrors.name" id="name-error" class="text-xs text-rose-600 font-medium">
                    {{ formErrors.name }}
                  </p>
                </div>

                <!-- WhatsApp Phone -->
                <div class="space-y-1.5">
                  <label for="whatsapp" class="block text-xs font-bold uppercase tracking-wider text-navy-900">
                    Nomor WhatsApp <span class="text-rose-500">*</span>
                  </label>
                  <input
                    id="whatsapp"
                    v-model="patientForm.whatsapp"
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    class="w-full px-4 py-3 bg-surface-50 border rounded-xl text-navy-900 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                    :class="formErrors.whatsapp ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'"
                    :aria-invalid="!!formErrors.whatsapp"
                    :aria-describedby="formErrors.whatsapp ? 'whatsapp-error' : 'whatsapp-hint'"
                  />
                  <p v-if="formErrors.whatsapp" id="whatsapp-error" class="text-xs text-rose-600 font-medium">
                    {{ formErrors.whatsapp }}
                  </p>
                  <p id="whatsapp-hint" class="text-[11px] text-slate-400">
                    Nomor aktif untuk konfirmasi jadwal dan informasi kedatangan klinik.
                  </p>
                </div>

                <!-- Email (Optional) -->
                <div class="space-y-1.5">
                  <label for="email" class="block text-xs font-bold uppercase tracking-wider text-navy-900">
                    Alamat Email <span class="text-slate-400 text-xs normal-case">(Opsional)</span>
                  </label>
                  <input
                    id="email"
                    v-model="patientForm.email"
                    type="email"
                    placeholder="Contoh: budi@gmail.com"
                    class="w-full px-4 py-3 bg-surface-50 border rounded-xl text-navy-900 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                    :class="formErrors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'"
                    :aria-invalid="!!formErrors.email"
                    :aria-describedby="formErrors.email ? 'email-error' : undefined"
                  />
                  <p v-if="formErrors.email" id="email-error" class="text-xs text-rose-600 font-medium">
                    {{ formErrors.email }}
                  </p>
                </div>

                <!-- Status Pasien (Radio: Pasien Baru / Pasien Lama) -->
                <div class="space-y-2">
                  <span class="block text-xs font-bold uppercase tracking-wider text-navy-900">
                    Status Pasien <span class="text-rose-500">*</span>
                  </span>
                  <div class="grid grid-cols-2 gap-4">
                    <label
                      class="flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all min-h-[44px]"
                      :class="
                        patientForm.isNewPatient === true
                          ? 'border-primary-500 bg-primary-50/30 font-bold text-navy-900'
                          : 'border-slate-200 text-slate-700'
                      "
                    >
                      <input
                        v-model="patientForm.isNewPatient"
                        type="radio"
                        :value="true"
                        name="patient_status"
                        class="text-primary-600 focus:ring-primary-500"
                      />
                      <span class="text-sm">Pasien Baru</span>
                    </label>

                    <label
                      class="flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all min-h-[44px]"
                      :class="
                        patientForm.isNewPatient === false
                          ? 'border-primary-500 bg-primary-50/30 font-bold text-navy-900'
                          : 'border-slate-200 text-slate-700'
                      "
                    >
                      <input
                        v-model="patientForm.isNewPatient"
                        type="radio"
                        :value="false"
                        name="patient_status"
                        class="text-primary-600 focus:ring-primary-500"
                      />
                      <span class="text-sm">Pasien Lama</span>
                    </label>
                  </div>
                  <p v-if="formErrors.isNewPatient" class="text-xs text-rose-600 font-medium">
                    {{ formErrors.isNewPatient }}
                  </p>
                </div>

                <!-- Keluhan / Catatan Tambahan (Textarea with counter, max 300) -->
                <div class="space-y-1.5">
                  <div class="flex items-center justify-between">
                    <label for="notes" class="block text-xs font-bold uppercase tracking-wider text-navy-900">
                      Keluhan / Keperluan <span class="text-slate-400 text-xs normal-case">(Opsional)</span>
                    </label>
                    <span
                      class="text-xs"
                      :class="patientForm.notes.length > 300 ? 'text-rose-600 font-bold' : 'text-slate-400'"
                    >
                      {{ patientForm.notes.length }}/300
                    </span>
                  </div>
                  <textarea
                    id="notes"
                    v-model="patientForm.notes"
                    rows="3"
                    maxlength="300"
                    placeholder="Ceritakan keluhan gigi Anda secara singkat bila ada..."
                    class="w-full px-4 py-3 bg-surface-50 border rounded-xl text-navy-900 text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                    :class="formErrors.notes ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'"
                    :aria-invalid="!!formErrors.notes"
                    :aria-describedby="formErrors.notes ? 'notes-error' : undefined"
                  />
                  <p v-if="formErrors.notes" id="notes-error" class="text-xs text-rose-600 font-medium">
                    {{ formErrors.notes }}
                  </p>
                </div>

                <!-- Persetujuan Checkbox -->
                <div class="space-y-1.5 pt-2">
                  <label class="flex items-start gap-3 cursor-pointer">
                    <input
                      v-model="patientForm.agreement"
                      type="checkbox"
                      class="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 mt-0.5"
                    />
                    <span class="text-xs text-slate-600 leading-relaxed">
                      Saya menyetujui bahwa data yang saya masukkan digunakan oleh pihak Candraloka Dental Care untuk keperluan penjadwalan dan konfirmasi janji temu.
                    </span>
                  </label>
                  <p v-if="formErrors.agreement" class="text-xs text-rose-600 font-medium">
                    {{ formErrors.agreement }}
                  </p>
                </div>

                <!-- Submit Button -->
                <div class="pt-4 flex items-center justify-between border-t border-slate-100">
                  <Button
                    variant="outline"
                    size="md"
                    :disabled="isSubmitting"
                    class="font-semibold text-xs"
                    @click="goToStep(3)"
                  >
                    <ArrowLeft class="w-4 h-4 mr-1.5" aria-hidden="true" />
                    <span>Kembali ke Jadwal</span>
                  </Button>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    :disabled="isSubmitting"
                    class="font-semibold shadow-lg min-w-[200px]"
                  >
                    <span v-if="isSubmitting" class="flex items-center gap-2">
                      <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Memverifikasi slot...</span>
                    </span>
                    <span v-else class="flex items-center gap-2">
                      <CalendarCheck class="w-5 h-5" aria-hidden="true" />
                      <span>Konfirmasi Reservasi</span>
                    </span>
                  </Button>
                </div>
              </form>
            </section>
          </div>

          <!-- Right Column: Booking Summary Sidebar (4 cols) -->
          <aside class="lg:col-span-4 space-y-6">
            <Card class="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-5">
              <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 class="text-base font-bold text-navy-900">
                  Ringkasan Janji Temu
                </h3>
                <span class="text-xs font-semibold text-primary-600">
                  Langkah {{ currentStep }} dari 4
                </span>
              </div>

              <!-- Service summary -->
              <div class="space-y-1">
                <span class="text-xs text-slate-400 font-medium block">Layanan:</span>
                <p v-if="selectedService" class="text-sm font-bold text-navy-900">
                  {{ selectedService.name }}
                </p>
                <p v-else class="text-xs text-slate-400 italic">Belum dipilih</p>
                <span v-if="selectedService" class="text-xs text-slate-500">
                  Estimasi durasi: {{ formatDuration(selectedService.durationMinutes) }}
                </span>
              </div>

              <!-- Doctor summary -->
              <div class="space-y-1 border-t border-slate-100 pt-3">
                <span class="text-xs text-slate-400 font-medium block">Dokter:</span>
                <template v-if="selectedDoctor">
                  <p class="text-sm font-bold text-navy-900">
                    {{ selectedDoctor.name }}
                  </p>
                  <p class="text-xs text-slate-500">
                    {{ selectedDoctor.specialty }}
                  </p>
                </template>
                <template v-else-if="selectedDoctorId === 'any'">
                  <p class="text-sm font-semibold text-navy-900">
                    Dokter mana saja (Otomatis)
                  </p>
                </template>
                <p v-else class="text-xs text-slate-400 italic">Belum dipilih</p>
              </div>

              <!-- Schedule summary -->
              <div class="space-y-1 border-t border-slate-100 pt-3">
                <span class="text-xs text-slate-400 font-medium block">Waktu Kunjungan:</span>
                <template v-if="selectedDate && selectedTime">
                  <p class="text-sm font-bold text-navy-900">
                    {{ formatDate(selectedDate, true) }}
                  </p>
                  <p class="text-xs font-bold text-primary-700">
                    Jam: {{ selectedTime }} WIB
                  </p>
                </template>
                <template v-else-if="selectedDate">
                  <p class="text-sm font-bold text-navy-900">
                    {{ formatDate(selectedDate, true) }}
                  </p>
                  <p class="text-xs text-slate-400 italic">Jam belum dipilih</p>
                </template>
                <p v-else class="text-xs text-slate-400 italic">Belum dipilih</p>
              </div>

              <!-- Info Notice -->
              <div class="p-3.5 rounded-xl bg-surface-100 border border-slate-200/60 flex items-start gap-2.5 text-xs text-slate-600">
                <Info class="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p class="leading-relaxed">
                  Harap hadir 10 menit sebelum jam reservasi untuk verifikasi data di meja pendaftaran.
                </p>
              </div>
            </Card>

            <!-- Device Storage Manager (FR-7.10) -->
            <div class="text-center pt-2">
              <button
                type="button"
                class="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                @click="handleClearStoredReservations"
              >
                <Trash2 class="w-3.5 h-3.5" aria-hidden="true" />
                <span>Hapus data reservasi di perangkat ini</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  </div>
</template>
