/**
 * format.js — Helper murni untuk format tanggal, jam, dan teks berbahasa Indonesia dengan label WIB.
 */

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

const MONTH_SHORT_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
]

const DAY_NAMES = [
  'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'
]

/**
 * Mendapatkan nama hari dari nomor hari ISO (1 = Senin .. 7 = Minggu).
 * @param {number} dayNumber
 * @returns {string}
 */
export function getDayName(dayNumber) {
  if (dayNumber < 1 || dayNumber > 7) return ''
  return DAY_NAMES[dayNumber - 1]
}

/**
 * Format tanggal ISO (YYYY-MM-DD) ke dalam format bahasa Indonesia lengkap.
 * Contoh: "Kamis, 15 Oktober 2026" atau "15 Oktober 2026"
 * @param {string} isoDate - "YYYY-MM-DD"
 * @param {boolean} includeDayName - default true
 * @returns {string}
 */
export function formatDate(isoDate, includeDayName = true) {
  if (!isoDate || typeof isoDate !== 'string') return ''
  const parts = isoDate.split('-').map(Number)
  if (parts.length !== 3) return isoDate
  const [y, m, d] = parts

  const monthName = MONTH_NAMES[m - 1] || ''
  const dateStr = `${d} ${monthName} ${y}`

  if (!includeDayName) return dateStr

  const dateObj = new Date(Date.UTC(y, m - 1, d))
  const dayIndex = dateObj.getUTCDay()
  const isoDay = dayIndex === 0 ? 7 : dayIndex
  const dayName = getDayName(isoDay)

  return `${dayName}, ${dateStr}`
}

/**
 * Format ringkas untuk tab / strip tanggal.
 * Contoh: "15 Okt"
 * @param {string} isoDate
 * @returns {string}
 */
export function formatDateShort(isoDate) {
  if (!isoDate) return ''
  const parts = isoDate.split('-').map(Number)
  if (parts.length !== 3) return isoDate
  const [, m, d] = parts
  const monthShort = MONTH_SHORT_NAMES[m - 1] || ''
  return `${d} ${monthShort}`
}

/**
 * Format jam dengan label zona WIB.
 * Contoh: "09:00 WIB"
 * @param {string} timeStr - "09:00"
 * @returns {string}
 */
export function formatTimeWib(timeStr) {
  if (!timeStr) return ''
  return `${timeStr} WIB`
}

/**
 * Format rentang jam dengan label WIB.
 * Contoh: "09:00 – 14:00 WIB"
 * @param {string} startTime
 * @param {string} endTime
 * @returns {string}
 */
export function formatTimeRangeWib(startTime, endTime) {
  if (!startTime || !endTime) return ''
  return `${startTime} – ${endTime} WIB`
}

/**
 * Format durasi menit ke dalam teks Indonesia.
 * Contoh: 30 -> "30 menit", 60 -> "60 menit (1 jam)"
 * @param {number} minutes
 * @returns {string}
 */
export function formatDuration(minutes) {
  if (!minutes) return '0 menit'
  if (minutes === 60) return '60 menit (1 jam)'
  if (minutes > 60 && minutes % 60 === 0) {
    return `${minutes} menit (${minutes / 60} jam)`
  }
  return `${minutes} menit`
}

/**
 * Format ringkas hari praktek dokter.
 * Contoh: [{ day: 1 }, { day: 3 }, { day: 5 }] -> "Senin, Rabu, Jumat"
 * @param {Array<{ day: number }>} practiceHours
 * @returns {string}
 */
export function formatPracticeDaysSummary(practiceHours = []) {
  if (!practiceHours || practiceHours.length === 0) return 'Sesuai perjanjian'
  const uniqueDays = [...new Set(practiceHours.map((h) => h.day))].sort((a, b) => a - b)
  return uniqueDays.map(getDayName).join(', ')
}
