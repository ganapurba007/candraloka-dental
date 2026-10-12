<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { CheckCircle2, ArrowRight } from 'lucide-vue-next'
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
          <div class="space-y-2">
            <span class="text-xs font-bold uppercase tracking-wider text-primary-600">
              Tentang Candraloka Dental Care
            </span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
              Kenyamanan dan Kesehatan Senyum Keluarga adalah Prioritas Kami
            </h2>
          </div>

          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
            {{ clinicData.about.story }}
          </p>

          <ul class="space-y-3 pt-1">
            <li v-for="(p, i) in points" :key="i" class="flex items-center gap-3 text-sm font-medium text-slate-700">
              <CheckCircle2 class="w-5 h-5 text-primary-500 flex-shrink-0" aria-hidden="true" />
              <span>{{ p }}</span>
            </li>
          </ul>

          <div class="pt-4">
            <Button to="/tentang" variant="outline" size="md" class="font-semibold hover:border-primary-400">
              <span>Kenali Kami Lebih Dekat</span>
              <ArrowRight class="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <!-- Right: Animated Stats Grid (FR-2.3) -->
        <div class="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
          <div class="bg-white p-6 sm:p-7 rounded-2xl border border-slate-100 shadow-card flex items-center gap-5">
            <div class="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center text-2xl font-black flex-shrink-0 border border-primary-100">
              {{ stat1Display }}<span>+</span>
            </div>
            <div>
              <p class="text-base sm:text-lg font-bold text-navy-900">
                Tahun Melayani
              </p>
              <p class="text-xs text-slate-500">
                Sejak {{ clinicData.establishedYear }} untuk keluarga Indonesia
              </p>
            </div>
          </div>

          <div class="bg-white p-6 sm:p-7 rounded-2xl border border-slate-100 shadow-card flex items-center gap-5">
            <div class="w-14 h-14 rounded-2xl bg-navy-50 text-navy-700 flex items-center justify-center text-xl font-black flex-shrink-0 border border-navy-100">
              {{ stat2Display.toLocaleString('id-ID') }}<span>+</span>
            </div>
            <div>
              <p class="text-base sm:text-lg font-bold text-navy-900">
                Pasien Terlayani
              </p>
              <p class="text-xs text-slate-500">
                Tindakan pencegahan & pemulihan gigi
              </p>
            </div>
          </div>

          <div class="bg-white p-6 sm:p-7 rounded-2xl border border-slate-100 shadow-card flex items-center gap-5">
            <div class="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center text-2xl font-black flex-shrink-0 border border-primary-100">
              {{ stat3Display }}
            </div>
            <div>
              <p class="text-base sm:text-lg font-bold text-navy-900">
                Tim Dokter Gigi
              </p>
              <p class="text-xs text-slate-500">
                Dokter gigi umum dan spesialis berdedikasi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
