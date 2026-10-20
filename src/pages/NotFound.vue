<script setup>
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { Home, CalendarCheck, HelpCircle, ArrowRight } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import { useClinic } from '@/composables/useClinic'
import { useI18n } from '@/composables/useI18n'

const { clinic, clinicLink } = useClinic()
const { isEnglish } = useI18n()

useHead({
  title: computed(() =>
    isEnglish.value
      ? `Page Not Found (404) | ${clinic.value.name}`
      : `Halaman Tidak Ditemukan (404) | ${clinic.value.name}`
  ),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        isEnglish.value
          ? `The page you are looking for was not found. Return to home or explore dental services at ${clinic.value.name}.`
          : `Halaman yang Anda cari tidak ditemukan. Kembali ke beranda atau telusuri layanan klinik gigi ${clinic.value.name}.`
      ),
    },
  ],
})
</script>

<template>
  <main class="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
    <div class="max-w-lg w-full text-center">
      <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6 shadow-sm border border-primary-100">
        <HelpCircle class="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />
      </div>

      <p class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
        Error 404
      </p>

      <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
        {{ isEnglish ? 'Page Not Found' : 'Halaman Tidak Ditemukan' }}
      </h1>

      <p class="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed">
        {{
          isEnglish
            ? 'We are sorry, the page you requested may have moved or the URL entered is incorrect. Please use the navigation links below.'
            : 'Mohon maaf, halaman yang Anda tuju mungkin telah dipindahkan atau alamat yang dimasukkan belum tepat. Silakan gunakan pilihan navigasi di bawah ini.'
        }}
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button :to="clinicLink('/')" variant="primary" size="md" class="w-full sm:w-auto">
          <Home class="w-4 h-4 mr-2" aria-hidden="true" />
          {{ isEnglish ? 'Back to Home' : 'Kembali ke Beranda' }}
        </Button>
        <Button :to="clinicLink('/layanan')" variant="outline" size="md" class="w-full sm:w-auto">
          <ArrowRight class="w-4 h-4 mr-2" aria-hidden="true" />
          {{ isEnglish ? 'View Services' : 'Lihat Layanan' }}
        </Button>
        <Button :to="clinicLink('/reservasi')" variant="secondary" size="md" class="w-full sm:w-auto">
          <CalendarCheck class="w-4 h-4 mr-2" aria-hidden="true" />
          {{ isEnglish ? 'Book Appointment' : 'Buat Reservasi' }}
        </Button>
      </div>
    </div>
  </main>
</template>
