import { ref, computed } from 'vue'
import {
  translate,
  dictionaries,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  getServiceName,
  getDoctorSpecialty,
  getCategoryLabel,
} from '@/lib/translations'
import clinicsRegistry from '@/data/clinics.json'

// Global reactive state
const currentLocale = ref(clinicsRegistry?.defaultLanguage || DEFAULT_LOCALE)
const isUserExplicit = ref(false)

export function useI18n() {
  const locale = computed(() => currentLocale.value)
  const isEnglish = computed(() => currentLocale.value === 'en')
  const isIndonesian = computed(() => currentLocale.value === 'id')

  /**
   * Set active locale.
   *
   * @param {'id' | 'en'} newLocale
   * @param {boolean} [explicit=true] - whether this change is explicit by user action
   */
  function setLocale(newLocale, explicit = true) {
    if (!SUPPORTED_LOCALES.includes(newLocale)) return
    currentLocale.value = newLocale
    if (explicit) {
      isUserExplicit.value = true
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('candraloka_preferred_locale', newLocale)
        }
      } catch (_) {}
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale
    }
  }

  function toggleLocale() {
    setLocale(currentLocale.value === 'id' ? 'en' : 'id', true)
  }

  /**
   * Synchronize locale based on clinic preset defaultLanguage.
   *
   * @param {string} [clinicDefaultLang]
   */
  function syncLocaleWithClinic(clinicDefaultLang) {
    // If user explicitly chose a language in this active session, preserve user's choice
    if (isUserExplicit.value) return

    const target =
      clinicDefaultLang && SUPPORTED_LOCALES.includes(clinicDefaultLang)
        ? clinicDefaultLang
        : clinicsRegistry?.defaultLanguage || DEFAULT_LOCALE

    currentLocale.value = target
    if (typeof document !== 'undefined') {
      document.documentElement.lang = target
    }
  }

  /**
   * Reset explicit user flag (useful for testing).
   */
  function resetExplicitFlag() {
    isUserExplicit.value = false
  }

  function t(path, params) {
    return translate(currentLocale.value, path, params)
  }

  return {
    locale,
    currentLocale,
    isEnglish,
    isIndonesian,
    isUserExplicit,
    setLocale,
    toggleLocale,
    syncLocaleWithClinic,
    resetExplicitFlag,
    t,
    getServiceName: (svc) => getServiceName(svc, currentLocale.value),
    getDoctorSpecialty: (spec) => getDoctorSpecialty(spec, currentLocale.value),
    getCategoryLabel: (cat) => getCategoryLabel(cat, currentLocale.value),
  }
}
