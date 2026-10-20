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
 * Doctor name formatting for bilingual display.
 * In English, Indonesian prefix 'drg.' (dokter gigi) is localized to 'Dr.'.
 */
export function getDoctorName(name, locale = 'id') {
  if (!name) return ''
  if (locale === 'en') {
    return name.replace(/^drg\.\s*/i, 'Dr. ')
  }
  return name
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
  'Spesialis Bedah Mulut & Maksilofasial': {
    en: 'Oral & Maxillofacial Surgery Specialist',
    id: 'Spesialis Bedah Mulut & Maksilofasial',
  },
  'Spesialis Bedah Mulut': {
    en: 'Oral & Maxillofacial Surgery Specialist',
    id: 'Spesialis Bedah Mulut',
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
 * Degree mapping for doctor education credentials.
 */
const degreeTranslations = {
  'Dokter Gigi (drg.)': {
    en: 'Doctor of Dental Surgery (DDS)',
    id: 'Dokter Gigi (drg.)',
  },
  'Spesialis Konservasi Gigi (Sp.KG)': {
    en: 'Conservative Dentistry Specialist (Sp.KG)',
    id: 'Spesialis Konservasi Gigi (Sp.KG)',
  },
  'Spesialis Kedokteran Gigi Anak (Sp.KGA)': {
    en: 'Pediatric Dentistry Specialist (Sp.KGA)',
    id: 'Spesialis Kedokteran Gigi Anak (Sp.KGA)',
  },
  'Spesialis Gigi Anak (Sp.KGA)': {
    en: 'Pediatric Dentistry Specialist (Sp.KGA)',
    id: 'Spesialis Gigi Anak (Sp.KGA)',
  },
  'Spesialis Ortodonti (Sp.Ort)': {
    en: 'Orthodontics Specialist (Sp.Ort)',
    id: 'Spesialis Ortodonti (Sp.Ort)',
  },
  'Spesialis Bedah Mulut (Sp.BM)': {
    en: 'Oral & Maxillofacial Surgery Specialist (Sp.BM)',
    id: 'Spesialis Bedah Mulut (Sp.BM)',
  },
  'Sarjana Kedokteran Gigi (S.KG)': {
    en: 'Bachelor of Dental Surgery (BDS)',
    id: 'Sarjana Kedokteran Gigi (S.KG)',
  },
}

export function getDoctorDegree(degree, locale = 'id') {
  if (!degree) return ''
  return degreeTranslations[degree]?.[locale] || degree
}

/**
 * Clinical interests mapping for doctor profiles.
 */
const interestTranslations = {
  'Endodonti Modern': { en: 'Modern Endodontics', id: 'Endodonti Modern' },
  'Restorasi Komposit Estetik': { en: 'Aesthetic Composite Restoration', id: 'Restorasi Komposit Estetik' },
  'Smile Enhancement': { en: 'Smile Enhancement', id: 'Smile Enhancement' },
  'Perawatan Gigi Anak': { en: 'Pediatric Dental Care', id: 'Perawatan Gigi Anak' },
  'Preventive Dentistry': { en: 'Preventive Dentistry', id: 'Preventive Dentistry' },
  'Manajemen Kecemasan Dental': { en: 'Dental Anxiety Management', id: 'Manajemen Kecemasan Dental' },
  'Braket Self-Ligating': { en: 'Self-Ligating Brackets', id: 'Braket Self-Ligating' },
  'Koreksi Gigitan Kompleks': { en: 'Complex Bite Correction', id: 'Koreksi Gigitan Kompleks' },
  'Ortodonti Estetik': { en: 'Aesthetic Orthodontics', id: 'Ortodonti Estetik' },
  'Scaling & Polishing': { en: 'Scaling & Polishing', id: 'Scaling & Polishing' },
  'Penambalan Estetik': { en: 'Aesthetic Fillings', id: 'Penambalan Estetik' },
  'Edukasi Higiene Oral': { en: 'Oral Hygiene Education', id: 'Edukasi Higiene Oral' },
  'Odontektomi Gigi Bungsu': { en: 'Wisdom Tooth Odontectomy', id: 'Odontektomi Gigi Bungsu' },
  'Bedah Minor Preprostetik': { en: 'Preprosthetic Minor Surgery', id: 'Bedah Minor Preprostetik' },
  'Trauma Dentoalveolar': { en: 'Dentoalveolar Trauma', id: 'Trauma Dentoalveolar' },
}

export function getDoctorInterest(interest, locale = 'id') {
  if (!interest) return ''
  return interestTranslations[interest]?.[locale] || interest
}

/**
 * Doctor bio translations for portfolio presentation.
 */
const doctorBioTranslations = {
  'drg-andi-pratama-sp-kg': {
    en: 'Dental specialist in conservative dentistry focusing on aesthetic restorations, micro root canal treatments, and restoring natural tooth function with minimally traumatic approaches.',
    id: 'Dokter gigi spesialis konservasi gigi yang berfokus pada restorasi estetik, perawatan saluran akar mikro, dan pemulihan fungsi gigi alami dengan pendekatan minim trauma.',
  },
  'drg-nadia-safira-sp-kga': {
    en: 'Experienced in toddler and pediatric dental health using pleasant communication methods to build trust and fear-free healthy dental habits.',
    id: 'Berpengalaman menangani kesehatan gigi balita dan anak-anak dengan metode komunikasi menyenangkan untuk membangun kepercayaan dan kebiasaan gigi sehat bebas rasa takut.',
  },
  'drg-farhan-maulana-sp-ort': {
    en: 'Specializes in orthodontic braces and complex malocclusion alignment using modern techniques to achieve harmonious smile aesthetics and balanced facial profiles.',
    id: 'Menangani perawatan kawat gigi (behel) dan perataan maloklusi kompleks menggunakan teknik modern untuk mencapai harmonisasi senyum dan profil wajah seimbang.',
  },
  'drg-citra-lestari': {
    en: 'Meticulous and communicative general dentist focusing on preventive care, routine scaling, composite fillings, and family oral hygiene education.',
    id: 'Dokter gigi umum yang teliti dan komunikatif, fokus pada perawatan pencegahan, scaling berkala, penambalan komposit, serta edukasi kesehatan mulut keluarga.',
  },
  'drg-bambang-wicaksono-sp-bm': {
    en: 'Expert in minor dental surgeries, impacted wisdom tooth extractions, and oral surgery procedures with precise anesthesia and rapid recovery.',
    id: 'Ahli dalam bedah minor gigi, ekstraksi gigi bungsu impaksi, serta penanganan bedah mulut dengan prosedur anestesi terukur dan pemulihan cepat.',
  },
}

export function getDoctorBio(doctor, locale = 'id') {
  if (!doctor) return ''
  const slug = doctor.slug || ''
  if (doctorBioTranslations[slug]?.[locale]) {
    return doctorBioTranslations[slug][locale]
  }
  return doctor.bio || ''
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
