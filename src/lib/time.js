/**
 * time.js — Helper murni untuk manipulasi waktu & zona WIB (UTC+7).
 * Semua fungsi bersifat murni tanpa ketergantungan side-effect.
 */

/**
 * Konversi jam "HH:mm" menjadi total menit dari 00:00.
 * @param {string} timeStr - misal "09:30"
 * @returns {number} misal 570
 */
export function timeToMinutes(timeStr) {
  if (!timeStr || typeof timeStr !== 'string') return 0
  const [h, m] = timeStr.split(':').map(Number)
  return (h || 0) * 60 + (m || 0)
}

/**
 * Konversi menit menjadi string "HH:mm" (2 digit).
 * @param {number} minutes
 * @returns {string} misal "09:30"
 */
export function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  const hh = String(h).padStart(2, '0')
  const mm = String(m).padStart(2, '0')
  return `${hh}:${mm}`
}

/**
 * Mendapatkan representasi Date atau komponen waktu dalam zona WIB (UTC+7).
 * @param {Date|string|number} inputDate
 * @returns {Date} Date object dalam UTC+7
 */
export function toWibDate(inputDate) {
  const d = inputDate instanceof Date ? inputDate : new Date(inputDate)
  // Hitung offset WIB (UTC+7, selisih 420 menit)
  const utc = d.getTime() + d.getTimezoneOffset() * 60000
  return new Date(utc + 7 * 3600000)
}

/**
 * Format tanggal menjadi format ISO "YYYY-MM-DD" dalam zona WIB.
 * @param {Date|string|number} date
 * @returns {string} misal "2026-10-15"
 */
export function toIsoDateString(date) {
  const wib = toWibDate(date)
  const y = wib.getFullYear()
  const m = String(wib.getMonth() + 1).padStart(2, '0')
  const d = String(wib.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/**
 * Mendapatkan nomor hari ISO (1 = Senin, 2 = Selasa, ..., 7 = Minggu).
 * @param {string} isoDate - "YYYY-MM-DD"
 * @returns {number} 1..7
 */
export function getIsoDayOfWeek(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, d))
  const day = date.getUTCDay()
  return day === 0 ? 7 : day
}

/**
 * Menambahkan sejumlah hari ke string tanggal ISO.
 * @param {string} isoDate - "YYYY-MM-DD"
 * @param {number} days
 * @returns {string} "YYYY-MM-DD"
 */
export function addDaysToIso(isoDate, days) {
  const [y, m, d] = isoDate.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, d + days))
  const ry = date.getUTCFullYear()
  const rm = String(date.getUTCMonth() + 1).padStart(2, '0')
  const rd = String(date.getUTCDate()).padStart(2, '0')
  return `${ry}-${rm}-${rd}`
}

/**
 * Hitung selisih hari antara dua tanggal ISO (date2 - date1).
 * @param {string} isoDate1
 * @param {string} isoDate2
 * @returns {number}
 */
export function diffDays(isoDate1, isoDate2) {
  const [y1, m1, d1] = isoDate1.split('-').map(Number)
  const [y2, m2, d2] = isoDate2.split('-').map(Number)
  const t1 = Date.UTC(y1, m1 - 1, d1)
  const t2 = Date.UTC(y2, m2 - 1, d2)
  return Math.round((t2 - t1) / (1000 * 60 * 60 * 24))
}
