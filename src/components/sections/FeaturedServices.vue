<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, Clock } from 'lucide-vue-next'
import servicesData from '@/data/services.json'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import { useClinic } from '@/composables/useClinic'
import { useI18n } from '@/composables/useI18n'

const { clinicLink } = useClinic()
const { t, getServiceName, getServiceSummary, isEnglish } = useI18n()

// 6 Featured services (FR-2.4)
const featuredServices = computed(() => {
  return servicesData.filter((s) => s.featured).slice(0, 6)
})
</script>

<template>
  <section class="py-16 sm:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div class="max-w-2xl space-y-2">
          <span class="text-xs font-bold uppercase tracking-wider text-primary-600">
            {{ isEnglish ? 'Premium Dental Care' : 'Perawatan Gigi Berkualitas' }}
          </span>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tight">
            {{ t('services.featured') }}
          </h2>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
            {{ t('services.subtitle') }}
          </p>
        </div>
        <div class="flex-shrink-0">
          <Button :to="clinicLink('/layanan')" variant="outline" size="md" class="font-semibold hover:border-primary-400">
            <span>{{ t('services.allServices') }}</span>
            <ArrowRight class="w-4 h-4 ml-1.5" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <!-- Services Grid (6 Cards) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <RouterLink
          v-for="service in featuredServices"
          :key="service.id"
          :to="clinicLink(`/layanan/${service.slug}`)"
          class="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-2xl"
        >
          <Card
            :hoverable="true"
            padding="none"
            class="h-full flex flex-col group-hover:border-primary-200"
          >
            <!-- Card Image -->
            <div class="relative overflow-hidden aspect-[16/9] bg-slate-100">
              <ResponsiveImage
                :src="service.image"
                :alt="getServiceName(service)"
                aspect-ratio="16/9"
                img-class="group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <!-- Card Content -->
            <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div class="space-y-2">
                <div class="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Clock class="w-3.5 h-3.5 text-primary-600" aria-hidden="true" />
                  <span>{{ t('services.duration') }}: {{ t('services.durationMinutes', { min: service.durationMinutes }) }}</span>
                </div>
                <h3 class="text-lg font-bold text-navy-900 group-hover:text-primary-600 transition-colors">
                  {{ getServiceName(service) }}
                </h3>
                <p class="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {{ getServiceSummary(service) }}
                </p>
              </div>

              <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-primary-600 group-hover:text-primary-700">
                <span>{{ t('common.readMore') }}</span>
                <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </div>
          </Card>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
