<script setup>
import { computed } from 'vue'
import { CheckCircle2, Award, Heart, Target, ArrowRight, ShieldCheck } from 'lucide-vue-next'
import { useClinic } from '@/composables/useClinic'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import Button from '@/components/ui/Button.vue'

const { clinic, clinicLink } = useClinic()
const about = computed(() => clinic.value.about)
</script>

<template>
  <section class="py-16 sm:py-24 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Medcity Top Heading Layout -->
      <div class="max-w-3xl mb-12 space-y-3">
        <span class="text-xs font-bold uppercase tracking-wider text-primary-600 block">
          Cerita & Filosofi Kami
        </span>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
          Meningkatkan Kualitas Hidup Anda Melalui Kesehatan Gigi yang Optimal.
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <!-- Left: Medcity about__Text -->
        <div class="lg:col-span-7 space-y-6">
          <p class="text-base sm:text-lg text-slate-600 leading-relaxed">
            Tujuan utama kami adalah menghadirkan pelayanan kesehatan gigi komprehensif dengan pendekatan yang ramah, penuh empati, dan bebas rasa takut. Kami berkomitmen menjadi mitra terpercaya keluarga Anda dalam merawat senyum sehat sepanjang usia.
          </p>

          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
            Didukung peralatan modern bertaraf medis, kami menyusun rencana perawatan yang transparan dan terpersonalisasi untuk setiap pasien—dari pembersihan karang rutin, perawatan estetika, hingga tindakan bedah mulut minim trauma.
          </p>

          <!-- Visi & Misi Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <!-- Visi Card -->
            <div class="p-5 rounded-2xl bg-surface-100 border border-slate-200/80 space-y-2.5">
              <div class="inline-flex p-2 rounded-xl bg-primary-100 text-primary-700">
                <Target class="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 class="text-sm font-bold text-navy-900">Visi Kami</h3>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {{ about.vision }}
              </p>
            </div>

            <!-- Misi Card -->
            <div class="p-5 rounded-2xl bg-surface-100 border border-slate-200/80 space-y-2.5">
              <div class="inline-flex p-2 rounded-xl bg-navy-100 text-navy-700">
                <Heart class="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 class="text-sm font-bold text-navy-900">Misi Utama</h3>
              <ul class="space-y-1.5">
                <li
                  v-for="(item, idx) in about.mission"
                  :key="idx"
                  class="flex items-start gap-1.5 text-xs text-slate-600"
                >
                  <CheckCircle2 class="w-3.5 h-3.5 text-primary-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Medcity Action Row: Meet Our Doctors + Signature / Trust Badge -->
          <div class="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-100">
            <Button
              :to="clinicLink('/dokter')"
              variant="primary"
              size="md"
              class="font-semibold shadow-md hover:-translate-y-0.5 transition-all"
            >
              <span>Kenali Dokter Kami</span>
              <ArrowRight class="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>

            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center border border-primary-100">
                <ShieldCheck class="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p class="text-xs font-bold text-navy-900">Standar Medis Higienis</p>
                <p class="text-[11px] text-slate-500">Berdiri Sejak {{ clinic.establishedYear }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Medcity video-banner style photo card -->
        <div class="lg:col-span-5 relative">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
            <ResponsiveImage
              :src="about.image"
              :alt="`Profil Klinik ${clinic.name}`"
              aspect-ratio="16/11"
              img-class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <!-- Subtle Overlay with Clinical Certification Seal -->
            <div class="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent flex items-end p-6">
              <div class="bg-white/95 backdrop-blur-md rounded-2xl p-4 w-full shadow-lg border border-slate-100/80 flex items-center gap-3.5">
                <div class="w-12 h-12 rounded-xl bg-primary-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <Award class="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p class="text-xs font-extrabold uppercase tracking-wider text-primary-700">Dedikasi Portofolio Medis</p>
                  <p class="text-sm font-bold text-navy-900">{{ clinic.name }}</p>
                  <p class="text-[11px] text-slate-500">{{ clinic.contact.address }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Floating decorative accent -->
          <div class="absolute -top-4 -right-4 w-24 h-24 bg-primary-200/40 rounded-full blur-xl -z-10" />
          <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-navy-200/40 rounded-full blur-2xl -z-10" />
        </div>
      </div>
    </div>
  </section>
</template>
