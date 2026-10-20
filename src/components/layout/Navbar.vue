<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Menu, X, CalendarCheck } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
import { useClinic } from '@/composables/useClinic'
import { useI18n } from '@/composables/useI18n'

const route = useRoute()
const isMobileMenuOpen = ref(false)
const { clinic, clinicLink } = useClinic()
const { t } = useI18n()

const navLinks = computed(() => [
  { name: t('nav.home'), to: '/' },
  { name: t('nav.about'), to: '/tentang' },
  { name: t('nav.services'), to: '/layanan' },
  { name: t('nav.doctors'), to: '/dokter' },
  { name: t('nav.schedule'), to: '/jadwal' },
  { name: t('nav.contact'), to: '/kontak' },
])

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

// Close on route change
watch(
  () => route.path,
  () => {
    closeMobileMenu()
  }
)

// Close on Esc key
function handleKeyDown(e) {
  if (e.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

// Lock body scroll when mobile menu is open
watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})

function isActive(to) {
  const target = clinicLink(to)
  if (to === '/') {
    return route.path === target || route.path === '/'
  }
  return route.path === target || route.path.startsWith(target)
}
</script>

<template>
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow duration-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-20">
        <!-- Brand Logo -->
        <RouterLink
          :to="clinicLink('/')"
          class="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg p-1"
          :aria-label="`${clinic.name} Beranda`"
        >
          <img
            :src="clinic.logo"
            :alt="clinic.name"
            class="w-10 h-10 object-contain rounded-xl shadow-xs group-hover:scale-105 transition-transform"
            width="40"
            height="40"
          />
          <div class="flex flex-col">
            <span class="text-base sm:text-lg font-bold text-navy-900 tracking-tight leading-tight group-hover:text-primary-600 transition-colors">
              {{ clinic.shortName }}
            </span>
            <span class="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-widest leading-none">
              {{ clinic.subName }}
            </span>
          </div>
        </RouterLink>

        <!-- Desktop Navigation Links -->
        <nav aria-label="Navigasi Utama" class="hidden md:flex items-center space-x-1 lg:space-x-2">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="clinicLink(link.to)"
            :class="[
              'px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
              isActive(link.to)
                ? 'text-primary-700 bg-primary-50 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
            ]"
            :aria-current="isActive(link.to) ? 'page' : undefined"
          >
            {{ link.name }}
          </RouterLink>
        </nav>

        <!-- Desktop CTA Button & Language Switcher -->
        <div class="hidden md:flex items-center space-x-3">
          <LanguageSwitcher variant="light" size="sm" class="hidden lg:inline-flex" />
          <Button
            :to="clinicLink('/reservasi')"
            variant="primary"
            size="md"
            class="shadow-sm font-semibold"
          >
            <CalendarCheck class="w-4 h-4 mr-1.5" aria-hidden="true" />
            {{ t('nav.bookNow') }}
          </Button>
        </div>

        <!-- Mobile Hamburger Button -->
        <div class="flex md:hidden items-center gap-2">
          <LanguageSwitcher variant="light" size="xs" />
          <button
            type="button"
            :aria-expanded="isMobileMenuOpen"
            aria-controls="mobile-navigation"
            aria-label="Buka navigasi menu"
            class="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 min-h-[44px] min-w-[44px] flex items-center justify-center"
            @click="toggleMobileMenu"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" aria-hidden="true" />
            <X v-else class="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Drawer Backdrop & Content -->
    <Transition
      enter-active-class="transition-opacity ease-linear duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
        @click="closeMobileMenu"
        aria-hidden="true"
      />
    </Transition>

    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="-translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-4 opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        id="mobile-navigation"
        class="md:hidden border-b border-slate-200 bg-white shadow-xl relative z-50 px-4 pt-3 pb-6"
      >
        <nav aria-label="Navigasi Menu Mobile" class="flex flex-col space-y-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="clinicLink(link.to)"
            :class="[
              'px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between',
              'min-h-[44px]',
              isActive(link.to)
                ? 'bg-primary-50 text-primary-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900',
            ]"
            :aria-current="isActive(link.to) ? 'page' : undefined"
            @click="closeMobileMenu"
          >
            <span>{{ link.name }}</span>
            <span v-if="isActive(link.to)" class="w-1.5 h-1.5 rounded-full bg-primary-600" />
          </RouterLink>

          <div class="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-3">
            <div class="flex items-center justify-between px-2">
              <span class="text-xs font-medium text-slate-500">{{ t('common.switchLanguage') }}</span>
              <LanguageSwitcher variant="light" size="sm" />
            </div>
            <Button
              :to="clinicLink('/reservasi')"
              variant="primary"
              size="lg"
              class="w-full justify-center text-center font-semibold"
              @click="closeMobileMenu"
            >
              <CalendarCheck class="w-5 h-5 mr-2" aria-hidden="true" />
              {{ t('nav.bookNow') }}
            </Button>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
