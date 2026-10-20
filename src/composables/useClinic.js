import { ref, computed } from 'vue'
import { getClinicBySlug, getRegisteredClinics } from '@/lib/clinics'
import {
  generateColorShades,
  shadesToCssVariables,
  applyCssVariablesToElement,
} from '@/lib/theme'
import { useI18n } from '@/composables/useI18n'

// Shared reactive state
const currentSlug = ref('candraloka')

export function useClinic() {
  const clinic = computed(() => getClinicBySlug(currentSlug.value))
  const availableClinics = computed(() => getRegisteredClinics())
  const isDefaultClinic = computed(() => currentSlug.value === 'candraloka')

  /**
   * Set active clinic by slug and dynamically apply CSS theme variables.
   *
   * @param {string} slug
   */
  function setClinic(slug) {
    const resolved = getClinicBySlug(slug)
    currentSlug.value = resolved.slug

    // Sync default language configured for this clinic preset
    const { syncLocaleWithClinic } = useI18n()
    syncLocaleWithClinic(resolved.defaultLanguage)

    // Apply CSS Variables in browser
    if (typeof document !== 'undefined') {
      const primaryShades = generateColorShades(resolved.colors.primary)
      const primaryVars = shadesToCssVariables(primaryShades, 'primary')

      const navyShades = generateColorShades(resolved.colors.navy)
      const navyVars = shadesToCssVariables(navyShades, 'navy')

      applyCssVariablesToElement({
        ...primaryVars,
        ...navyVars,
      })

      // Update favicon or title if needed
      if (document.title && !document.title.includes(resolved.name)) {
        document.title = `${resolved.name} — ${resolved.tagline || 'Klinik Gigi Modern'}`
      }
    }
  }

  /**
   * Helper to generate context-aware navigation links.
   * For non-default clinics, prefixes the path with /:slug (e.g. /surya-dental/layanan).
   *
   * @param {string} to
   * @returns {string}
   */
  function clinicLink(to) {
    if (!to || typeof to !== 'string') return '/'
    if (currentSlug.value === 'candraloka') return to

    const cleanPath = to.startsWith('/') ? to : `/${to}`
    if (cleanPath === '/') {
      return `/${currentSlug.value}`
    }
    return `/${currentSlug.value}${cleanPath}`
  }

  return {
    currentSlug,
    clinic,
    availableClinics,
    isDefaultClinic,
    setClinic,
    clinicLink,
  }
}
