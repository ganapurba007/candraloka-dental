<script setup>
import { CheckCircle2, Award, Heart, Target } from 'lucide-vue-next'
import clinicData from '@/data/clinic.json'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'

const about = clinicData.about
</script>

<template>
  <section class="py-16 sm:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <!-- Left: Image with decorative badges -->
        <div class="lg:col-span-5 relative">
          <div class="relative rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-slate-100">
            <ResponsiveImage
              :src="about.image"
              alt="Profil Klinik Candraloka Dental Care"
              aspect-ratio="16/9"
              img-class="w-full h-full object-cover"
            />
          </div>

          <!-- Floating badge: Established Year -->
          <div class="absolute -bottom-6 -right-4 sm:right-6 bg-navy-900 text-white rounded-2xl p-4 shadow-xl border border-navy-800 flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-xl bg-primary-500/20 text-primary-400 flex items-center justify-center flex-shrink-0">
              <Award class="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <p class="text-xs uppercase font-bold tracking-wider text-primary-300">Berdiri Sejak</p>
              <p class="text-xl font-extrabold text-white">{{ clinicData.establishedYear }}</p>
            </div>
          </div>
        </div>

        <!-- Right: Story, Vision, Mission -->
        <div class="lg:col-span-7 space-y-8">
          <div class="space-y-3">
            <span class="text-xs font-bold uppercase tracking-wider text-primary-600">
              Cerita & Filosofi Kami
            </span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight leading-tight">
              Mengutamakan Kenyamanan dan Keamanan Pasien
            </h2>
            <p class="text-base sm:text-lg text-slate-600 leading-relaxed pt-2">
              {{ about.story }}
            </p>
          </div>

          <!-- Visi & Misi Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <!-- Visi Card -->
            <div class="p-5 rounded-2xl bg-surface-100 border border-slate-200/80 space-y-3">
              <div class="inline-flex p-2.5 rounded-xl bg-primary-100 text-primary-700">
                <Target class="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 class="text-base font-bold text-navy-900">Visi Kami</h3>
              <p class="text-sm text-slate-600 leading-relaxed">
                {{ about.vision }}
              </p>
            </div>

            <!-- Misi Card -->
            <div class="p-5 rounded-2xl bg-surface-100 border border-slate-200/80 space-y-3">
              <div class="inline-flex p-2.5 rounded-xl bg-navy-100 text-navy-700">
                <Heart class="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 class="text-base font-bold text-navy-900">Misi Utama</h3>
              <ul class="space-y-2.5">
                <li
                  v-for="(item, idx) in about.mission"
                  :key="idx"
                  class="flex items-start gap-2 text-xs sm:text-sm text-slate-600"
                >
                  <CheckCircle2 class="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
