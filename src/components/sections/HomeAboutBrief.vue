<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { CheckCircle2, ArrowRight, Award, Users, Stethoscope } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import { useInView } from '@/composables/useInView'
import { useCountUp } from '@/composables/useCountUp'
import clinicData from '@/data/clinic.json'
import homeData from '@/data/home.json'

const { targetRef, isInView } = useInView({ threshold: 0.2, once: true })

// 3 Stats with CountUp animations (FR-2.3)
const stat1Target = homeData.stats[0]?.value || 7
const stat2Target = homeData.stats[1]?.value || 12500
const stat3Target = homeData.stats[2]?.value || 5

const { displayValue: stat1Display } = useCountUp(stat1Target, isInView, 1600)
const { displayValue: stat2Display } = useCountUp(stat2Target, isInView, 1800)
const { displayValue: stat3Display } = useCountUp(stat3Target, isInView, 1400)

const points = [
  'Pendekatan perawatan ramah & bebas rasa cemas',
  'Peralatan dan teknologi sterilisasi bertaraf medis tinggi',
  'Sistem reservasi transparan dengan dokter spesialis',
]
</script>

<template>
  <section ref="targetRef" class="py-16 sm:py-24 bg-surface-50 border-y border-slate-200/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <!-- Left: Text Summary -->
        <div class="lg:col-span-7 space-y-6">
          <div class="space-y-3">
            <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-600">
              <span class="w-1.5 h-1.5 rounded-full bg-primary-600"></span>
              <span>Tentang Candraloka Dental Care</span>
            </div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
              Kenyamanan dan Kesehatan Senyum Keluarga adalah Prioritas Kami
            </h2>
          </div>

          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
            {{ clinicData.about.story }}
          </p>

          <ul class="space-y-3 pt-1">
            <li v-for="(p, i) in points" :key="i" class="flex items-start sm:items-center gap-3 text-sm font-medium text-slate-700">
              <CheckCircle2 class="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
              <span>{{ p }}</span>
            </li>
          </ul>

          <div class="pt-2">
            <Button to="/tentang" variant="outline" size="md" class="rounded-full font-semibold hover:border-primary-400">
              <span>Kenali Kami Lebih Dekat</span>
              <ArrowRight class="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <!-- Right: Animated Stats Cards (FR-2.3) -->
        <div class="lg:col-span-5 flex flex-col gap-4">
          <!-- Card 1: Tahun Melayani -->
          <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-card hover:shadow-lg hover:border-primary-200/70 transition-all duration-300 flex items-center gap-5 group">
            <div class="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 border border-primary-100/70 group-hover:scale-105 transition-transform duration-300">
              <Award class="w-7 h-7" aria-hidden="true" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight leading-none mb-1">
                {{ stat1Display }}<span class="text-primary-600">+</span>
              </div>
              <p class="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                Tahun Melayani
              </p>
              <p class="text-xs text-slate-500 mt-0.5">
                Sejak {{ clinicData.establishedYear }} untuk keluarga Indonesia
              </p>
            </div>
          </div>

          <!-- Card 2: Pasien Terlayani -->
          <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-card hover:shadow-lg hover:border-primary-200/70 transition-all duration-300 flex items-center gap-5 group">
            <div class="w-14 h-14 rounded-2xl bg-navy-50 text-navy-700 flex items-center justify-center flex-shrink-0 border border-navy-100/70 group-hover:scale-105 transition-transform duration-300">
              <Users class="w-7 h-7" aria-hidden="true" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight leading-none mb-1">
                {{ stat2Display.toLocaleString('id-ID') }}<span class="text-primary-600">+</span>
              </div>
              <p class="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                Pasien Terlayani
              </p>
              <p class="text-xs text-slate-500 mt-0.5">
                Tindakan pencegahan & pemulihan gigi
              </p>
            </div>
          </div>

          <!-- Card 3: Tim Dokter Gigi -->
          <div class="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-card hover:shadow-lg hover:border-primary-200/70 transition-all duration-300 flex items-center gap-5 group">
            <div class="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 border border-primary-100/70 group-hover:scale-105 transition-transform duration-300">
              <Stethoscope class="w-7 h-7" aria-hidden="true" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight leading-none mb-1">
                {{ stat3Display }}
              </div>
              <p class="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                Tim Dokter Gigi
              </p>
              <p class="text-xs text-slate-500 mt-0.5">
                Dokter gigi umum dan spesialis berdedikasi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
