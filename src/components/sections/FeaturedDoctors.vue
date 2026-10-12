<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, Award, Calendar } from 'lucide-vue-next'
import doctorsData from '@/data/doctors.json'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'

// 3 Featured doctors (FR-2.6)
const featuredDoctors = computed(() => {
  return doctorsData.filter((d) => d.featured).slice(0, 3)
})
</script>

<template>
  <section class="py-16 sm:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div class="max-w-2xl space-y-2">
          <span class="text-xs font-bold uppercase tracking-wider text-primary-600">
            Tenaga Medis Berdedikasi
          </span>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight">
            Dokter Gigi Unggulan
          </h2>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
            Didukung dokter gigi umum dan spesialis berpengalaman yang siap memberikan perawatan terbaik untuk Anda.
          </p>
        </div>
        <div class="flex-shrink-0">
          <Button to="/dokter" variant="outline" size="md" class="font-semibold hover:border-primary-400">
            <span>Lihat Semua Dokter</span>
            <ArrowRight class="w-4 h-4 ml-1.5" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <!-- Doctors Grid (3 Cards) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <RouterLink
          v-for="doc in featuredDoctors"
          :key="doc.id"
          :to="`/dokter/${doc.slug}`"
          class="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-2xl"
        >
          <Card
            :hoverable="true"
            padding="none"
            class="h-full flex flex-col group-hover:border-primary-200"
          >
            <!-- Doctor Photo -->
            <div class="relative overflow-hidden aspect-[4/5] bg-slate-100">
              <ResponsiveImage
                :src="doc.photo"
                :alt="doc.name"
                aspect-ratio="4/5"
                img-class="group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm flex items-center gap-1.5 text-xs font-semibold text-navy-900">
                <Award class="w-3.5 h-3.5 text-primary-600" aria-hidden="true" />
                <span>{{ doc.experienceYears }}+ Tahun Pengalaman</span>
              </div>
            </div>

            <!-- Doctor Details -->
            <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div class="space-y-1.5">
                <span class="text-xs font-semibold text-primary-600 uppercase tracking-wider block">
                  {{ doc.specialty }}
                </span>
                <h3 class="text-lg font-bold text-navy-900 group-hover:text-primary-600 transition-colors">
                  {{ doc.name }}
                </h3>
                <p class="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed pt-1">
                  {{ doc.bio }}
                </p>
              </div>

              <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-primary-600 group-hover:text-primary-700">
                <span>Lihat Profil & Jadwal</span>
                <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </div>
          </Card>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
