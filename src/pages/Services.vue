<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import {
  Search,
  X,
  Clock,
  ArrowRight,
  CalendarCheck,
  Info,
  SearchX,
} from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import HomeCtaBanner from '@/components/sections/HomeCtaBanner.vue'
import servicesData from '@/data/services.json'
import { formatDuration } from '@/lib/format'

useHead({
  title: 'Layanan Perawatan Gigi | Candraloka Dental Care',
  meta: [
    {
      name: 'description',
      content: 'Daftar lengkap layanan perawatan gigi komprehensif di Candraloka Dental Care: scaling, tambal gigi, behel ortodonti, bleaching, cabut gigi, dan perawatan anak.',
    },
  ],
})

const categories = ['Semua', 'Umum', 'Estetika', 'Ortodonti', 'Bedah', 'Anak']
const selectedCategory = ref('Semua')
const searchQuery = ref('')

const filteredServices = computed(() => {
  let list = servicesData

  // Filter category
  if (selectedCategory.value !== 'Semua') {
    list = list.filter((s) => s.category === selectedCategory.value)
  }

  // Filter search
  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter((s) => {
      return (
        s.name.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      )
    })
  }

  return list
})

function getCategoryCount(cat) {
  if (cat === 'Semua') return servicesData.length
  return servicesData.filter((s) => s.category === cat).length
}

function clearFilters() {
  selectedCategory.value = 'Semua'
  searchQuery.value = ''
}
</script>

<template>
  <div class="flex-1 flex flex-col bg-surface-50">
    <!-- Header Section -->
    <section class="py-12 sm:py-16 bg-navy-900 text-white relative overflow-hidden" style="background-color: #0e204d;">
      <div class="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
      <div class="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-primary-400/10 blur-3xl pointer-events-none" />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight text-white">
          Layanan Perawatan Gigi Komprehensif
        </h1>

        <p class="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Pilihan perawatan gigi preventif hingga estetika yang dirancang khusus untuk kenyamanan dan senyum sehat keluarga Anda.
        </p>
      </div>
    </section>

    <!-- Main Content Area -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-10">
      <!-- Search & Category Filters (FR-4.1) -->
      <div class="space-y-6">
        <!-- Search bar -->
        <div class="relative max-w-xl mx-auto">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search class="w-5 h-5" aria-hidden="true" />
          </div>
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Cari layanan (mis. scaling, tambal, behel)..."
            aria-label="Cari nama layanan gigi"
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

        <!-- Category Chip Filter (FR-4.1) -->
        <div class="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all flex-shrink-0 cursor-pointer"
            :class="
              selectedCategory === cat
                ? 'bg-primary-600 text-white shadow-sm ring-2 ring-primary-600/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-700 hover:bg-slate-50'
            "
            @click="selectedCategory = cat"
          >
            <span>{{ cat }}</span>
            <span
              class="px-2 py-0.5 rounded-full text-xs"
              :class="selectedCategory === cat ? 'bg-primary-700 text-white' : 'bg-slate-100 text-slate-500'"
            >
              {{ getCategoryCount(cat) }}
            </span>
          </button>
        </div>
      </div>

      <!-- Services Grid (FR-4.1) -->
      <div v-if="filteredServices.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          v-for="srv in filteredServices"
          :key="srv.id"
          :hoverable="true"
          padding="none"
          class="group flex flex-col h-full bg-white border border-slate-200/80 hover:border-primary-200 overflow-hidden"
        >
          <!-- Service Image -->
          <div class="relative aspect-[16/9] overflow-hidden bg-slate-100">
            <ResponsiveImage
              :src="srv.image"
              :alt="srv.name"
              aspect-ratio="16/9"
              img-class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <!-- Service Content -->
          <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div class="space-y-2.5">
              <h2 class="text-lg font-bold text-navy-900 group-hover:text-primary-700 transition-colors leading-snug">
                <RouterLink :to="`/layanan/${srv.slug}`" class="focus-visible:outline-none focus-visible:underline">
                  {{ srv.name }}
                </RouterLink>
              </h2>
              <p class="text-sm text-slate-600 leading-relaxed line-clamp-3">
                {{ srv.summary }}
              </p>
            </div>

            <!-- Duration & CTAs -->
            <div class="pt-4 border-t border-slate-100 space-y-4">
              <div class="flex items-center gap-2 text-xs font-medium text-slate-500">
                <Clock class="w-4 h-4 text-primary-600" aria-hidden="true" />
                <span>Estimasi durasi: {{ formatDuration(srv.durationMinutes) }}</span>
              </div>

              <div class="grid grid-cols-2 gap-2.5">
                <Button
                  :to="`/layanan/${srv.slug}`"
                  variant="outline"
                  size="sm"
                  class="w-full justify-center text-xs font-semibold"
                >
                  <span>Detail</span>
                  <ArrowRight class="w-3.5 h-3.5 ml-1" aria-hidden="true" />
                </Button>
                <Button
                  :to="`/reservasi?layanan=${srv.slug}`"
                  variant="primary"
                  size="sm"
                  class="w-full justify-center text-xs font-semibold"
                >
                  <CalendarCheck class="w-3.5 h-3.5 mr-1" aria-hidden="true" />
                  <span>Reservasi</span>
                </Button>
              </div>
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
        <h3 class="text-lg font-bold text-navy-900">Tidak ada layanan ditemukan</h3>
        <p class="text-sm text-slate-500 leading-relaxed">
          Tidak ditemukan layanan dengan kata kunci "{{ searchQuery }}" pada kategori {{ selectedCategory }}.
        </p>
        <Button variant="outline" size="sm" class="font-semibold" @click="clearFilters">
          Reset Filter & Pencarian
        </Button>
      </div>

      <!-- Pricing Notice (FR-4.4) -->
      <div class="p-6 rounded-2xl bg-surface-100 border border-slate-200 flex items-start gap-4 max-w-4xl mx-auto">
        <div class="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Info class="w-5 h-5" aria-hidden="true" />
        </div>
        <div class="space-y-1 text-sm">
          <h4 class="font-bold text-navy-900">Transparansi Rincian Biaya</h4>
          <p class="text-slate-600 leading-relaxed">
            Candraloka Dental Care tidak menampilkan estimasi harga sepihak karena setiap kondisi gigi memiliki tingkat kompleksitas berbeda. Rincian biaya disampaikan dokter setelah pemeriksaan fisik secara jelas dan transparan sebelum tindakan dilakukan.
          </p>
        </div>
      </div>
    </main>

    <!-- Closing CTA Banner -->
    <HomeCtaBanner />
  </div>
</template>
