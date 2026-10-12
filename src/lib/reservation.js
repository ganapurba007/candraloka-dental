/**
 * reservation.js — Helper murni untuk pembuatan kode reservasi dan manipulasi data reservasi.
 */

// Karakter tanpa karakter ambigu (menghilangkan 0, O, 1, I, L)
const UNAMBIGUOUS_CHARS = '23456789ABCDEFGHJKMNPQRSTUVWXYZ'

/**
 * Menghasilkan kode reservasi berformat `CDC-YYMMDD-XXXX`.
 * Menerima `randomFn` opsional agar deterministik saat pengujian unit test.
 *
 * @param {string} isoDate - misal "2026-10-15"
 * @param {Function} [randomFn=Math.random]
 * @returns {string} misal "CDC-261015-K79A"
 */
export function generateReservationCode(isoDate, randomFn = Math.random) {
  if (!isoDate || typeof isoDate !== 'string') {
    throw new Error('Valid ISO date string is required')
  }

  const parts = isoDate.split('-')
  if (parts.length !== 3) {
    throw new Error('Invalid ISO date format')
  }

  const yearShort = parts[0].slice(-2)
  const month = parts[1]
  const day = parts[2]
  const dateSegment = `${yearShort}${month}${day}`

  let randomSegment = ''
  for (let i = 0; i < 4; i++) {
    const idx = Math.floor(randomFn() * UNAMBIGUOUS_CHARS.length)
    randomSegment += UNAMBIGUOUS_CHARS[idx]
  }

  return `CDC-${dateSegment}-${randomSegment}`
}

/**
 * Validasi apakah sebuah string merupakan format kode reservasi CDC yang valid.
 * @param {string} code
 * @returns {boolean}
 */
export function isValidReservationCode(code) {
  if (!code || typeof code !== 'string') return false
  const regex = /^CDC-\d{6}-[2-9A-HJ-NP-Z]{4}$/
  return regex.test(code)
}

export const RESERVATIONS_STORAGE_KEY = 'reservations'
export const BOOKING_DRAFT_KEY = 'booking_draft'

/**
 * Mengambil daftar reservasi tersimpan dari localStorage.
 * @returns {Array<object>}
 */
export function getStoredReservations() {
  if (typeof window === 'undefined' || !window.localStorage) return []
  try {
    const raw = window.localStorage.getItem(RESERVATIONS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Menyimpan sebuah objek reservasi ke localStorage.
 * @param {object} reservation
 * @returns {boolean}
 */
export function saveReservationToStorage(reservation) {
  if (typeof window === 'undefined' || !window.localStorage) return false
  try {
    const list = getStoredReservations()
    list.push(reservation)
    window.localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(list))
    return true
  } catch {
    return false
  }
}

/**
 * Mengosongkan data reservasi tersimpan di localStorage (FR-7.10).
 * @returns {boolean}
 */
export function clearStoredReservations() {
  if (typeof window === 'undefined' || !window.localStorage) return false
  try {
    window.localStorage.removeItem(RESERVATIONS_STORAGE_KEY)
    return true
  } catch {
    return false
  }
}

/**
 * Mengambil draft isian reservasi dari sessionStorage (FR-7.11).
 * @returns {object|null}
 */
export function getBookingDraft() {
  if (typeof window === 'undefined' || !window.sessionStorage) return null
  try {
    const raw = window.sessionStorage.getItem(BOOKING_DRAFT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * Menyimpan draft isian reservasi ke sessionStorage (FR-7.11).
 * @param {object} draft
 */
export function saveBookingDraft(draft) {
  if (typeof window === 'undefined' || !window.sessionStorage) return
  try {
    window.sessionStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(draft))
  } catch {
    // Ignore storage errors
  }
}

/**
 * Menghapus draft isian reservasi dari sessionStorage.
 */
export function clearBookingDraft() {
  if (typeof window === 'undefined' || !window.sessionStorage) return
  try {
    window.sessionStorage.removeItem(BOOKING_DRAFT_KEY)
  } catch {
    // Ignore
  }
}

