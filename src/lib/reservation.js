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
