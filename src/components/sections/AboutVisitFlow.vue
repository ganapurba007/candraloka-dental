<script setup>
import { RouterLink } from 'vue-router'
import {
  CalendarCheck,
  ClipboardList,
  Stethoscope,
  Sparkles,
  HeartHandshake,
  ArrowRight,
  Check,
  ShieldCheck,
} from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import clinicData from '@/data/clinic.json'

const stepIcons = [
  CalendarCheck,
  ClipboardList,
  Stethoscope,
  Sparkles,
  HeartHandshake,
]

const visitSteps = clinicData.about.visitSteps

const highlights = [
  'Pemeriksaan Menyeluruh & Digital',
  'Tindakan Medis Minim Trauma',
  'Dokter Spesialis Berpengalaman',
  'Transparansi Biaya Sebelum Tindakan',
]
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
            Alur Kunjungan Pasien Terstruktur
          </span>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
            Kami Menghadirkan Standar Pelayanan Gigi Lengkap & Nyaman.
          </h2>
        </div>

        <div class="lg:col-span-6 space-y-6">
          <p class="text-sm sm:text-base text-slate-300 leading-relaxed">
            Setiap tahapan dirancang demi kenyamanan dan ketenangan pasien, mulai dari reservasi waktu tanpa antre panjang hingga konsultasi tindak lanjut pasca-perawatan.
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
              :to="step.number === 1 ? '/reservasi' : '/layanan'"
              class="inline-flex items-center gap-1.5 text-xs font-bold text-primary-300 hover:text-white transition-colors"
            >
              <span>{{ step.number === 1 ? 'Pilih Jadwal' : 'Pelajari Detail' }}</span>
              <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Medcity Integrated Bottom CTA Banner (cta bg-primary) -->
      <div class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-7 sm:p-10 shadow-2xl border border-primary-500/50">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div class="hidden sm:flex lg:col-span-2 items-center justify-center">
            <div class="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center shadow-lg">
              <Sparkles class="w-8 h-8 text-white" aria-hidden="true" />
            </div>
          </div>

          <div class="lg:col-span-7 space-y-2 text-center sm:text-left">
            <h4 class="text-xl sm:text-2xl font-extrabold text-white">
              Pelayanan Kesehatan Gigi Terbaik untuk Keluarga Anda!
            </h4>
            <p class="text-sm text-primary-100 leading-relaxed max-w-2xl">
              Kami siap membantu Anda dan keluarga mendapatkan senyum yang sehat, rapi, dan percaya diri dengan proses reservasi tanpa antre panjang.
            </p>
          </div>

          <div class="lg:col-span-3 flex justify-center lg:justify-end">
            <Button
              to="/reservasi"
              variant="navy"
              size="lg"
              class="font-semibold shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto"
            >
              <span>Buat Janji Temu</span>
              <ArrowRight class="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
