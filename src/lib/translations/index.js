/**
 * Pure translation engine & dictionary index.
 */
import idDictionary from './id'
import enDictionary from './en'

export const dictionaries = {
  id: idDictionary,
  en: enDictionary,
}

export const SUPPORTED_LOCALES = ['id', 'en']
export const DEFAULT_LOCALE = 'id'

/**
 * Pure function: resolve a nested key in a dictionary object with fallback.
 *
 * @param {string} locale - 'id' | 'en'
 * @param {string} path - dot-separated key, e.g. 'nav.home'
 * @param {object} [params] - optional interpolation params, e.g. { tz: 'WIB' }
 * @returns {string}
 */
export function translate(locale, path, params = {}) {
  const currentDict = dictionaries[locale] || dictionaries[DEFAULT_LOCALE]
  const fallbackDict = dictionaries[DEFAULT_LOCALE]

  let value = resolvePath(currentDict, path)

  if (value === undefined && currentDict !== fallbackDict) {
    value = resolvePath(fallbackDict, path)
  }

  if (value === undefined) {
    return path
  }

  if (typeof value !== 'string') {
    return value
  }

  // Parameter interpolation: {key}
  return value.replace(/{([^{}]+)}/g, (_, key) => {
    return params[key] !== undefined ? String(params[key]) : `{${key}}`
  })
}

function resolvePath(obj, path) {
  if (!obj || typeof path !== 'string') return undefined
  const segments = path.split('.')
  let current = obj
  for (const seg of segments) {
    if (current && typeof current === 'object' && seg in current) {
      current = current[seg]
    } else {
      return undefined
    }
  }
  return current
}

/**
 * Service title mapping for bilingual display.
 */
const serviceTranslations = {
  'pembersihan-karang-gigi': {
    en: 'Scaling & Calculus Removal',
    id: 'Pembersihan Karang Gigi (Scaling)',
  },
  'penambalan-gigi': {
    en: 'Composite Tooth Filling',
    id: 'Penambalan Gigi Komposit',
  },
  'pencabutan-gigi': {
    en: 'Tooth Extraction & Odontectomy',
    id: 'Pencabutan Gigi & Odontektomi',
  },
  'perawatan-saluran-akar': {
    en: 'Root Canal Treatment',
    id: 'Perawatan Saluran Akar',
  },
  'pemasangan-kawat-gigi': {
    en: 'Orthodontic Braces',
    id: 'Pemasangan Kawat Gigi (Behel)',
  },
  'pemutihan-gigi': {
    en: 'Teeth Whitening (Bleaching)',
    id: 'Pemutihan Gigi (Bleaching)',
  },
  'mahkota-jembatan-gigi': {
    en: 'Dental Crowns & Bridges',
    id: 'Mahkota & Jembatan Gigi (Crown & Bridge)',
  },
  'perawatan-gigi-anak': {
    en: 'Pediatric Dental Care',
    id: 'Perawatan Gigi Anak (Pediatrik)',
  },
}

export function getServiceName(service, locale = 'id') {
  if (!service) return ''
  const slug = service.slug || ''
  if (serviceTranslations[slug]?.[locale]) {
    return serviceTranslations[slug][locale]
  }
  return service.name || ''
}

/**
 * Specialty mapping for bilingual display.
 */
const specialtyTranslations = {
  'Spesialis Konservasi Gigi': {
    en: 'Conservative Dentistry Specialist',
    id: 'Spesialis Konservasi Gigi',
  },
  'Spesialis Kedokteran Gigi Anak': {
    en: 'Pediatric Dentistry Specialist',
    id: 'Spesialis Kedokteran Gigi Anak',
  },
  'Spesialis Ortodonti': {
    en: 'Orthodontics Specialist',
    id: 'Spesialis Ortodonti',
  },
  'Dokter Gigi Umum': {
    en: 'General Dentist',
    id: 'Dokter Gigi Umum',
  },
}

export function getDoctorSpecialty(specialty, locale = 'id') {
  if (!specialty) return ''
  if (specialtyTranslations[specialty]?.[locale]) {
    return specialtyTranslations[specialty][locale]
  }
  return specialty
}

/**
 * Category mapping for services.
 */
const categoryTranslations = {
  'Semua Layanan': { en: 'All Services', id: 'Semua Layanan' },
  Umum: { en: 'General', id: 'Umum' },
  Spesialis: { en: 'Specialist', id: 'Spesialis' },
  Estetika: { en: 'Aesthetic', id: 'Estetika' },
  Anak: { en: 'Pediatric', id: 'Anak' },
}

export function getCategoryLabel(cat, locale = 'id') {
  if (!cat) return ''
  return categoryTranslations[cat]?.[locale] || cat
}
