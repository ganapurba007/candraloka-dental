<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useClinic } from '@/composables/useClinic'
import { useI18n } from '@/composables/useI18n'
import servicesData from '@/data/services.json'
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
} from 'lucide-vue-next'
import IconWhatsApp from '@/components/ui/IconWhatsApp.vue'

const { clinic, clinicLink } = useClinic()
const { t, getServiceName } = useI18n()
const currentYear = new Date().getFullYear()
const featuredServices = servicesData.slice(0, 5)

const navLinks = computed(() => [
  { name: t('nav.home'), to: '/' },
  { name: t('nav.about'), to: '/tentang' },
  { name: t('nav.services'), to: '/layanan' },
  { name: t('nav.doctors'), to: '/dokter' },
  { name: t('nav.schedule'), to: '/jadwal' },
  { name: t('nav.bookNow'), to: '/reservasi' },
  { name: t('nav.contact'), to: '/kontak' },
])
</script>

<template>
  <footer class="bg-navy-900 text-slate-300 pt-16 pb-12 border-t border-navy-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
        <!-- Col 1: Clinic Summary -->
        <div class="space-y-4">
          <div class="flex items-center gap-2.5">
            <img
              :src="clinic.logo"
              :alt="clinic.name"
              class="w-9 h-9 object-contain rounded-xl shadow-xs"
              width="36"
              height="36"
            />
            <div>
              <span class="text-lg font-bold text-white tracking-tight leading-none block">
                {{ clinic.shortName }}
              </span>
              <span class="text-[10px] font-medium text-slate-400 uppercase tracking-widest leading-none block mt-0.5">
                {{ clinic.subName }}
              </span>
            </div>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed">
            {{ clinic.tagline }}
          </p>
          <div class="text-xs text-slate-500 pt-1">
            {{ t('footer.servingSince', { year: clinic.establishedYear }) }}
          </div>
        </div>

        <!-- Col 2: Quick Links -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-white mb-4">
            {{ t('footer.quickLinks') }}
          </h3>
          <ul class="space-y-2.5 text-sm">
            <li v-for="link in navLinks" :key="link.to">
              <RouterLink
                :to="clinicLink(link.to)"
                class="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:text-primary-400 inline-block py-0.5"
              >
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Col 3: Services List -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-white mb-4">
            {{ t('footer.services') }}
          </h3>
          <ul class="space-y-2.5 text-sm">
            <li v-for="srv in featuredServices" :key="srv.id">
              <RouterLink
                :to="clinicLink(`/layanan/${srv.slug}`)"
                class="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:text-primary-400 inline-block py-0.5"
              >
                {{ getServiceName(srv) }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Col 4: Contact & Directions -->
        <div class="space-y-4">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-white mb-4">
            {{ t('footer.contactInfo') }}
          </h3>
          <ul class="space-y-3 text-sm text-slate-400">
            <li class="flex items-start gap-2.5">
              <MapPin class="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{{ clinic.contact.address }}</span>
            </li>
            <li class="flex items-center gap-2.5">
              <Phone class="w-4 h-4 text-primary-400 flex-shrink-0" aria-hidden="true" />
              <a :href="`tel:${clinic.contact.phone}`" class="hover:text-white transition-colors">
                {{ clinic.contact.phone }}
              </a>
            </li>
            <li class="flex items-center gap-2.5">
              <IconWhatsApp class="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <a
                :href="`https://wa.me/${clinic.contact.whatsapp}`"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-white transition-colors"
              >
                +{{ clinic.contact.whatsapp }}
              </a>
            </li>
            <li class="flex items-center gap-2.5">
              <Clock class="w-4 h-4 text-primary-400 flex-shrink-0" aria-hidden="true" />
              <span>{{ t('topbar.operatingHours', { tz: clinic.timezoneLabel }) }}</span>
            </li>
          </ul>

          <div class="pt-2">
            <a
              :href="clinic.contact.mapUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white text-xs font-semibold transition-colors border border-navy-700/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 min-h-[44px]"
            >
              <span>{{ t('about.directions') }}</span>
              <ExternalLink class="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-6 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {{ currentYear }} {{ clinic.name }}. {{ t('footer.allRightsReserved') }}</p>
      </div>
    </div>
  </footer>
</template>
