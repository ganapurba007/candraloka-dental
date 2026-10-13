<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import {
  Search,
  X,
  CalendarCheck,
  ArrowRight,
  Calendar,
  Award,
  SearchX,
  CheckCircle2,
} from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import HomeCtaBanner from '@/components/sections/HomeCtaBanner.vue'
import doctorsData from '@/data/doctors.json'
import { formatPracticeDaysSummary } from '@/lib/format'
import { isDoctorPracticingOn } from '@/lib/schedule'

useHead({
  title: 'Tim Dokter Gigi | Candraloka Dental Care',
  meta: [
    {
      name: 'description',
      content: 'Temui tim dokter gigi umum dan spesialis berpengalaman di Candraloka Dental Care: spesialis konservasi gigi, ortodonti, bedah mulut, dan dokter gigi anak.',
    },
  ],
})

const selectedSpecialty = ref('Semua')
const searchQuery = ref('')

const specialties = computed(() => [
  'Semua',
  ...new Set(doctorsData.map((d) => d.specialty)),
])

const filteredDoctors = computed(() => {
  let list = doctorsData

  // Filter specialty
  if (selectedSpecialty.value !== 'Semua') {
    list = list.filter((d) => d.specialty === selectedSpecialty.value)
  }

  // Filter search
  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q) ||
        d.bio.toLowerCase().includes(q)
    )
  }

  return list
})

function clearFilters() {
  selectedSpecialty.value = 'Semua'
  searchQuery.value = ''
}
</script>

<template>
  <div class="flex-1 flex flex-col bg-surface-50">
    <!-- Header Section -->
    <section class="py-14 sm:py-20 bg-primary-800 text-white relative overflow-hidden" style="background-color: #133f94;">
      <!-- Photographic Background & Sapphire Blue Wash (Reference Medcity Style) -->
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          :src="'/images/clinic/page-header.webp'"
          alt=""
          class="w-full h-full object-cover object-bottom scale-100"
          loading="eager"
        />
        <div
          class="absolute inset-0"
          style="background: linear-gradient(180deg, rgba(15, 42, 98, 0.35) 0%, rgba(10, 26, 64, 0.60) 100%);"
        />
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight text-white">
          Tim Dokter Gigi Berpengalaman & Terpercaya
        </h1>

        <p class="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Dokter gigi umum dan spesialis berdedikasi tinggi dengan pendekatan komunikatif, teliti, dan bebas trauma.
        </p>
      </div>
    </section>

    <!-- Main Content Area (FR-5.1) -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-10">
      <!-- Search & Specialty Filter Bar -->
      <div class="space-y-6">
        <!-- Search input -->
        <div class="relative max-w-xl mx-auto">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search class="w-5 h-5" aria-hidden="true" />
          </div>
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Cari nama dokter atau keahlian..."
            aria-label="Cari nama dokter gigi"
            class="w-full pl-11 pr-10 py-3.5 bg-white border border-slate-300 rounded-2xl text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition-all text-base"
          />
          <button
            v-if="searchQuery"
            type="button"
            aria-label="Hapus kata kunci pencarian"
            class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
            @click="searchQuery = ''"
          >
            <X class="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <!-- Specialty Filter Chips -->
        <div class="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            v-for="spec in specialties"
            :key="spec"
            type="button"
            class="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all flex-shrink-0 cursor-pointer"
            :class="
              selectedSpecialty === spec
                ? 'bg-primary-600 text-white shadow-sm ring-2 ring-primary-600/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-700 hover:bg-slate-50'
            "
            @click="selectedSpecialty = spec"
          >
            <span>{{ spec }}</span>
          </button>
        </div>
      </div>

      <!-- Doctors Grid (FR-5.1) -->
      <div v-if="filteredDoctors.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          v-for="doc in filteredDoctors"
          :key="doc.id"
          :hoverable="true"
          padding="none"
          class="group flex flex-col h-full bg-white border border-slate-200/80 hover:border-primary-200 overflow-hidden"
        >
          <!-- Doctor Photo -->
          <div class="relative aspect-[4/5] overflow-hidden bg-slate-100">
            <ResponsiveImage
              :src="doc.photo"
              :alt="doc.name"
              aspect-ratio="4/5"
              img-class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <!-- Doctor Info -->
          <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div class="space-y-2">
              <p class="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                {{ doc.specialty }}
              </p>
              <h2 class="text-lg font-bold text-navy-900 group-hover:text-primary-700 transition-colors leading-snug">
                <RouterLink :to="`/dokter/${doc.slug}`" class="focus-visible:outline-none focus-visible:underline">
                  {{ doc.name }}
                </RouterLink>
              </h2>

              <div class="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Award class="w-4 h-4 text-primary-600 flex-shrink-0" aria-hidden="true" />
                <span>{{ doc.experienceYears }} Tahun Pengalaman</span>
              </div>

              <div class="flex items-start gap-1.5 text-xs text-slate-600 pt-1">
                <Calendar class="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span class="leading-relaxed">Hari praktek: {{ formatPracticeDaysSummary(doc.practiceHours) }}</span>
              </div>
            </div>

            <!-- Actions (FR-5.1) -->
            <div class="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5">
              <Button
                :to="`/dokter/${doc.slug}`"
                variant="outline"
                size="sm"
                class="w-full justify-center text-xs font-semibold"
              >
                <span>Lihat Profil</span>
                <ArrowRight class="w-3.5 h-3.5 ml-1" aria-hidden="true" />
              </Button>
              <Button
                :to="`/reservasi?dokter=${doc.slug}`"
                variant="primary"
                size="sm"
                class="w-full justify-center text-xs font-semibold"
              >
                <CalendarCheck class="w-3.5 h-3.5 mr-1" aria-hidden="true" />
                <span>Reservasi</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-4 max-w-lg mx-auto"
      >
        <div class="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <SearchX class="w-8 h-8" aria-hidden="true" />
        </div>
        <h3 class="text-lg font-bold text-navy-900">Dokter tidak ditemukan</h3>
        <p class="text-sm text-slate-500 leading-relaxed">
          Tidak ada dokter yang cocok dengan kriteria pencarian "{{ searchQuery }}".
        </p>
        <Button variant="outline" size="sm" class="font-semibold" @click="clearFilters">
          Reset Filter & Pencarian
        </Button>
      </div>
    </main>

    <!-- Closing CTA Banner -->
    <HomeCtaBanner />
  </div>
</template>
