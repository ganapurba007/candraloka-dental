/**
 * clinics.js — Pure functions for clinic profile resolution and multi-tenant fallback.
 */
import baseClinicData from '@/data/clinic.json'
import clinicsRegistry from '@/data/clinics.json'

/**
 * Get the list of all registered clinic presets.
 *
 * @returns {Array<{ slug: string, name: string, shortName: string, logo: string, primaryColor: string }>}
 */
export function getRegisteredClinics() {
  const list = []
  const clinics = clinicsRegistry?.clinics || {}

  for (const [slug, item] of Object.entries(clinics)) {
    list.push({
      slug,
      name: item.name || slug,
      shortName: item.shortName || item.name || slug,
      logo: item.logo || baseClinicData.about?.image || '/icon.jpg',
      primaryColor: item.colors?.primary || '#1e60d5',
    })
  }

  return list
}

/**
 * Retrieve and construct a complete clinic profile by slug.
 * If the slug is not found or empty, safely falls back to the default clinic.
 *
 * @param {string} [slug]
 * @returns {object} Full merged clinic object
 */
export function getClinicBySlug(slug) {
  const defaultSlug = clinicsRegistry?.default || 'candraloka'
  const targetSlug = slug && typeof slug === 'string' ? slug.trim().toLowerCase() : defaultSlug
  const isFound = Boolean(clinicsRegistry?.clinics?.[targetSlug])
  const activeSlug = isFound ? targetSlug : defaultSlug
  const registered = clinicsRegistry?.clinics?.[activeSlug]

  // Base fallback clone from original clinic.json
  const merged = JSON.parse(JSON.stringify(baseClinicData))

  if (!registered) {
    return {
      ...merged,
      slug: defaultSlug,
      shortName: 'Candraloka',
      subName: 'Dental Care',
      logo: '/images/logos/candraloka.svg',
      colors: {
        primary: '#1e60d5',
        navy: '#0e204d',
      },
    }
  }

  // Merge registered customizations on top of base clinic
  merged.slug = activeSlug
  if (registered.name) merged.name = registered.name
  merged.shortName = registered.shortName || registered.name || 'Candraloka'
  merged.subName = registered.subName || 'Dental Care'
  if (registered.tagline) merged.tagline = registered.tagline
  merged.logo = registered.logo || '/images/logos/candraloka.svg'

  // Colors
  merged.colors = {
    primary: registered.colors?.primary || '#1e60d5',
    navy: registered.colors?.navy || '#0e204d',
  }

  // Contact overrides
  if (registered.contact) {
    merged.contact = {
      ...merged.contact,
      ...registered.contact,
    }
  }

  return merged
}
