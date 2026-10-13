<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import {
  Clock,
  CalendarCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Stethoscope,
  Info,
  ArrowRight,
  ShieldCheck,
} from 'lucide-vue-next'
import IconWhatsApp from '@/components/ui/IconWhatsApp.vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import NotFound from '@/pages/NotFound.vue'
import HomeCtaBanner from '@/components/sections/HomeCtaBanner.vue'
import servicesData from '@/data/services.json'
import doctorsData from '@/data/doctors.json'
import clinicData from '@/data/clinic.json'
import { formatDuration } from '@/lib/format'

const route = useRoute()
const service = computed(() => servicesData.find((s) => s.slug === route.params.slug))

useHead({
  title: computed(() =>
    service.value
      ? `${service.value.name} | Candraloka Dental Care`
      : 'Layanan Tidak Ditemukan | Candraloka Dental Care'
  ),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        service.value
          ? `${service.value.summary} Estimasi durasi: ${service.value.durationMinutes} menit di Candraloka Dental Care.`
          : 'Layanan gigi yang Anda cari tidak ditemukan.'
      ),
    },
  ],
})

// Doctors assigned to this service (FR-4.2)
const assignedDoctors = computed(() => {
  if (!service.value) return []
  return doctorsData.filter((doc) => doc.serviceIds && doc.serviceIds.includes(service.value.id))
})

// Related services in same category or others (FR-4.2)
const relatedServices = computed(() => {
  if (!service.value) return []
  const sameCategory = servicesData.filter(
    (s) => s.id !== service.value.id && s.category === service.value.category
  )
  if (sameCategory.length >= 3) return sameCategory.slice(0, 3)
  const others = servicesData.filter(
    (s) => s.id !== service.value.id && s.category !== service.value.category
  )
  return [...sameCategory, ...others].slice(0, 3)
})

// WhatsApp link
const waConsultUrl = computed(() => {
  if (!service.value) return '#'
  const text = encodeURIComponent(
    `Halo Candraloka Dental Care, saya ingin konsultasi mengenai layanan ${service.value.name}.`
  )
  return `https://wa.me/${clinicData.contact.whatsapp}?text=${text}`
})
</script>

<template>
  <!-- FR-4.5: If service not found, render NotFound page -->
  <NotFound v-if="!service" />

  <div v-else class="flex-1 flex flex-col bg-surface-50 pb-20 lg:pb-0">
    <!-- Service Header Banner -->
    <section class="py-12 sm:py-16 bg-navy-900 text-white relative overflow-hidden" style="background-color: #0e204d;">
      <div class="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
      <div class="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-primary-400/10 blur-3xl pointer-events-none" />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-3xl space-y-4">
          <div class="flex items-center gap-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-primary-300">
              {{ service.category }}
            </span>
            <div class="flex items-center gap-1.5 text-xs text-primary-200">
              <Clock class="w-4 h-4 text-primary-400" aria-hidden="true" />
              <span>Estimasi durasi: {{ formatDuration(service.durationMinutes) }}</span>
            </div>
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {{ service.name }}
          </h1>

          <p class="text-base sm:text-lg text-slate-300 leading-relaxed">
            {{ service.summary }}
          </p>

          <div class="pt-2 flex flex-wrap items-center gap-4">
            <Button
              :to="`/reservasi?layanan=${service.slug}`"
              variant="primary"
              size="lg"
              class="font-semibold shadow-lg"
            >
              <CalendarCheck class="w-5 h-5 mr-2" aria-hidden="true" />
              <span>Reservasi Layanan Ini</span>
            </Button>
            <a
              :href="waConsultUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-navy-700 bg-navy-800/80 hover:bg-navy-700 text-white font-medium text-sm transition-colors"
            >
              <IconWhatsApp class="w-4 h-4 mr-2 text-emerald-400" />
              <span>Tanya via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Layout (FR-4.2) -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <!-- Left Column: Detailed Service Information (8 cols) -->
        <div class="lg:col-span-8 space-y-12">
          <!-- Featured Image -->
          <div class="rounded-3xl overflow-hidden shadow-md border border-slate-200 aspect-[16/9] bg-slate-100">
            <ResponsiveImage
              :src="service.image"
              :alt="service.name"
              aspect-ratio="16/9"
              img-class="w-full h-full object-cover"
            />
          </div>

          <!-- Description -->
          <section class="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 class="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2.5">
              <ShieldCheck class="w-6 h-6 text-primary-600" aria-hidden="true" />
              <span>Tentang Perawatan</span>
            </h2>
            <p class="text-base text-slate-700 leading-relaxed">
              {{ service.description }}
            </p>
          </section>

          <!-- When Needed (Kapan Layanan Dibutuhkan) -->
          <section class="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
            <h2 class="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2.5">
              <HelpCircle class="w-6 h-6 text-primary-600" aria-hidden="true" />
              <span>Kapan Layanan Ini Dibutuhkan?</span>
            </h2>
            <ul class="space-y-3.5">
              <li
                v-for="(item, idx) in service.whenNeeded"
                :key="idx"
                class="flex items-start gap-3 text-slate-700"
              >
                <CheckCircle2 class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span class="text-sm sm:text-base leading-relaxed">{{ item }}</span>
              </li>
            </ul>
          </section>

          <!-- Procedure Steps (Tahapan Perawatan) -->
          <section class="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <div class="space-y-1">
              <h2 class="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight">
                Tahapan Prosedur Perawatan
              </h2>
              <p class="text-sm text-slate-500">
                Langkah sistematis dan higienis yang dilakukan dokter selama tindakan.
              </p>
            </div>

            <div class="space-y-4">
              <div
                v-for="(step, idx) in service.procedure"
                :key="idx"
                class="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-surface-50 border border-slate-200/60"
              >
                <div class="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-extrabold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                  {{ idx + 1 }}
                </div>
                <div class="space-y-1">
                  <h3 class="text-base font-bold text-navy-900">
                    {{ step.title }}
                  </h3>
                  <p class="text-sm text-slate-600 leading-relaxed">
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Preparation (Persiapan Sebelum Datang) -->
          <section class="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
            <h2 class="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight flex items-center gap-2.5">
              <AlertCircle class="w-6 h-6 text-primary-600" aria-hidden="true" />
              <span>Persiapan Sebelum Berkunjung</span>
            </h2>
            <ul class="space-y-3">
              <li
                v-for="(prep, idx) in service.preparation"
                :key="idx"
                class="flex items-start gap-3 text-slate-700"
              >
                <div class="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                <span class="text-sm sm:text-base leading-relaxed">{{ prep }}</span>
              </li>
            </ul>
          </section>

          <!-- Pricing Notice Box (FR-4.4) -->
          <div class="p-6 rounded-2xl bg-surface-100 border border-slate-200 flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info class="w-5 h-5" aria-hidden="true" />
            </div>
            <div class="space-y-1 text-sm">
              <h4 class="font-bold text-navy-900">Informasi Biaya Tindakan</h4>
              <p class="text-slate-600 leading-relaxed">
                Rincian biaya disampaikan dokter setelah pemeriksaan fisik. Setiap tindakan disesuaikan dengan kondisi klinis gigi Anda secara transparan sebelum prosedur dimulai.
              </p>
            </div>
          </div>
        </div>

        <!-- Right Column: Sidebar (Doctors & Related Services) (4 cols) -->
        <aside class="lg:col-span-4 space-y-8">
          <!-- Quick Booking Card -->
          <Card class="p-6 sm:p-7 bg-white border border-slate-200/80 rounded-3xl shadow-sm space-y-6">
            <div class="space-y-2">
              <span class="text-xs font-bold uppercase tracking-wider text-primary-600">
                Pemesanan Jadwal
              </span>
              <h3 class="text-lg font-bold text-navy-900">
                Reservasi Layanan Ini
              </h3>
              <p class="text-xs text-slate-500 leading-relaxed">
                Pilih dokter yang sesuai dan jam kedatangan Anda tanpa antre lama.
              </p>
            </div>

            <div class="p-4 rounded-xl bg-surface-100 border border-slate-200/60 space-y-2.5 text-xs">
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Estimasi Durasi:</span>
                <span class="font-bold text-navy-900">{{ formatDuration(service.durationMinutes) }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-slate-500">Kategori:</span>
                <span class="font-bold text-navy-900">{{ service.category }}</span>
              </div>
            </div>

            <Button
              :to="`/reservasi?layanan=${service.slug}`"
              variant="primary"
              size="md"
              class="w-full justify-center font-semibold shadow-md"
            >
              <CalendarCheck class="w-4 h-4 mr-2" aria-hidden="true" />
              <span>Reservasi Sekarang</span>
            </Button>
          </Card>

          <!-- Assigned Doctors List (FR-4.2) -->
          <div class="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm space-y-5">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <Stethoscope class="w-5 h-5 text-primary-600" aria-hidden="true" />
                <h3 class="text-base font-bold text-navy-900">
                  Dokter yang Menangani
                </h3>
              </div>
              <p class="text-xs text-slate-500">
                Dokter berpengalaman yang menangani layanan ini.
              </p>
            </div>

            <div v-if="assignedDoctors.length > 0" class="divide-y divide-slate-100">
              <RouterLink
                v-for="doc in assignedDoctors"
                :key="doc.id"
                :to="`/dokter/${doc.slug}`"
                class="group py-3.5 first:pt-0 last:pb-0 flex items-center gap-3.5 hover:text-primary-700 transition-colors"
              >
                <div class="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                  <ResponsiveImage
                    :src="doc.photo"
                    :alt="doc.name"
                    aspect-ratio="1/1"
                    img-class="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-navy-900 group-hover:text-primary-700 truncate transition-colors">
                    {{ doc.name }}
                  </p>
                  <p class="text-xs text-slate-500 truncate">
                    {{ doc.specialty }}
                  </p>
                </div>
                <ArrowRight class="w-4 h-4 text-slate-400 group-hover:text-primary-600 transition-colors flex-shrink-0" aria-hidden="true" />
              </RouterLink>
            </div>
            <p v-else class="text-xs text-slate-500 italic">
              Ditangani oleh seluruh tim dokter klinik.
            </p>
          </div>

          <!-- Related Services (FR-4.2) -->
          <div class="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 class="text-base font-bold text-navy-900">
              Layanan Terkait
            </h3>
            <div class="space-y-3">
              <RouterLink
                v-for="rel in relatedServices"
                :key="rel.id"
                :to="`/layanan/${rel.slug}`"
                class="block p-3.5 rounded-2xl bg-surface-50 border border-slate-200/60 hover:border-primary-300 hover:bg-white transition-all group"
              >
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs font-semibold text-primary-600">{{ rel.category }}</span>
                  <span class="text-[11px] text-slate-400">{{ formatDuration(rel.durationMinutes) }}</span>
                </div>
                <p class="text-sm font-bold text-navy-900 group-hover:text-primary-700 transition-colors line-clamp-1">
                  {{ rel.name }}
                </p>
              </RouterLink>
            </div>
          </div>
        </aside>
      </div>
    </main>

    <!-- Mobile Fixed Bottom CTA Bar (FR-4.3) -->
    <div class="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:p-4 z-40 lg:hidden shadow-lg">
      <div class="max-w-md mx-auto flex items-center justify-between gap-3">
        <div class="min-w-0 flex-1">
          <p class="text-xs text-slate-500 truncate">Layanan Terpilih</p>
          <p class="text-sm font-bold text-navy-900 truncate">{{ service.name }}</p>
        </div>
        <Button
          :to="`/reservasi?layanan=${service.slug}`"
          variant="primary"
          size="sm"
          class="font-semibold flex-shrink-0 shadow-md"
        >
          <CalendarCheck class="w-4 h-4 mr-1.5" aria-hidden="true" />
          <span>Reservasi</span>
        </Button>
      </div>
    </div>

    <!-- Closing CTA Banner -->
    <HomeCtaBanner />
  </div>
</template>
