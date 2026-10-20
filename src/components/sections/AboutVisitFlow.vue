<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import {
  CalendarCheck,
  ClipboardList,
  Stethoscope,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  Check,
} from 'lucide-vue-next'
import { useClinic } from '@/composables/useClinic'
import { useI18n } from '@/composables/useI18n'
import clinicData from '@/data/clinic.json'

const { clinicLink } = useClinic()
const { isEnglish } = useI18n()

const stepIcons = [
  CalendarCheck,
  ClipboardList,
  Stethoscope,
  ShieldCheck,
  HeartHandshake,
]

const englishSteps = [
  { number: 1, title: 'Online / WhatsApp Booking', description: 'Choose your preferred service, dentist, date, and appointment slot according to your schedule.' },
  { number: 2, title: 'Check-In & Arrival', description: 'Arrive at the clinic 10 minutes prior to your slot and verify your details at registration.' },
  { number: 3, title: 'Consultation & Examination', description: 'Dentist meticulously examines your dental health and explains the tailored treatment plan.' },
  { number: 4, title: 'Treatment Procedure', description: 'Care is performed adhering to high clinical hygiene standards with a gentle touch.' },
  { number: 5, title: 'Post-Treatment Education', description: 'Receive personalized home oral care advice and periodic follow-up schedules if needed.' },
]

const visitSteps = computed(() => isEnglish.value ? englishSteps : clinicData.about.visitSteps)

const highlights = computed(() =>
  isEnglish.value
    ? [
        'Comprehensive & Digital Examination',
        'Minimally Traumatic Dental Care',
        'Experienced Dental Specialists',
        'Transparent Pricing Prior to Treatment',
      ]
    : [
        'Pemeriksaan Menyeluruh & Digital',
        'Tindakan Medis Minim Trauma',
        'Dokter Spesialis Berpengalaman',
        'Transparansi Biaya Sebelum Tindakan',
      ]
)
</script>

<template>
  <section class="py-20 sm:py-28 bg-navy-900 text-white relative overflow-hidden" style="background-color: #0e204d;">
    <!-- Decorative background glow -->
    <div class="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
    <div class="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-primary-400/10 blur-3xl pointer-events-none" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
      <!-- Medcity Top Heading Layout (work-process heading) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div class="lg:col-span-6 space-y-3">
          <span class="text-xs font-bold uppercase tracking-wider text-primary-400 block">
            {{ isEnglish ? 'Structured Patient Visit Flow' : 'Alur Kunjungan Pasien Terstruktur' }}
          </span>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
            {{ isEnglish ? 'Delivering Complete, Seamless, and Comfort-Driven Dental Standards.' : 'Kami Menghadirkan Standar Pelayanan Gigi Lengkap & Nyaman.' }}
          </h2>
        </div>

        <div class="lg:col-span-6 space-y-6">
          <p class="text-sm sm:text-base text-slate-300 leading-relaxed">
            {{
              isEnglish
                ? 'Every phase is crafted for patient peace of mind, from fast queue-free booking to post-treatment follow-up consultations.'
                : 'Setiap tahapan dirancang demi kenyamanan dan ketenangan pasien, mulai dari reservasi waktu tanpa antre panjang hingga konsultasi tindak lanjut pasca-perawatan.'
            }}
          </p>

          <!-- Horizontal Highlight Bullet Points (Medcity list-items-light) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div
              v-for="(item, idx) in highlights"
              :key="idx"
              class="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200"
            >
              <div class="w-5 h-5 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center flex-shrink-0">
                <Check class="w-3.5 h-3.5" aria-hidden="true" />
              </div>
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Medcity 5 Process Items Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div
          v-for="(step, idx) in visitSteps"
          :key="step.number"
          class="relative bg-navy-800/80 rounded-3xl p-6 border border-navy-700/80 flex flex-col justify-between group hover:border-primary-500 hover:bg-navy-800 transition-all duration-300"
        >
          <div class="space-y-4">
            <!-- Step Number & Icon -->
            <div class="flex items-center justify-between">
              <span class="text-3xl font-extrabold text-primary-400/40 group-hover:text-primary-400 transition-colors">
                0{{ step.number }}
              </span>
              <div class="w-12 h-12 rounded-2xl bg-navy-900 border border-navy-700 text-primary-400 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all duration-300 shadow-sm">
                <component
                  :is="stepIcons[idx] || CalendarCheck"
                  class="w-6 h-6"
                  aria-hidden="true"
                />
              </div>
            </div>

            <!-- Title & Description -->
            <div class="space-y-2 pt-2">
              <h3 class="text-base font-bold text-white group-hover:text-primary-300 transition-colors">
                {{ step.title }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {{ step.description }}
              </p>
            </div>
          </div>

          <!-- Bottom Step Link -->
          <div class="pt-6 mt-4 border-t border-navy-700/60">
            <RouterLink
              :to="step.number === 1 ? clinicLink('/reservasi') : clinicLink('/layanan')"
              class="inline-flex items-center gap-1.5 text-xs font-bold text-primary-300 hover:text-white transition-colors"
            >
              <span>{{ step.number === 1 ? (isEnglish ? 'Select Schedule' : 'Pilih Jadwal') : (isEnglish ? 'Learn Details' : 'Pelajari Detail') }}</span>
              <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
