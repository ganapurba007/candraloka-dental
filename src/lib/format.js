/**
 * format.js — Helper murni untuk format tanggal, jam, dan teks dengan dukungan bilingual (ID/EN) dan label WIB.
 */

const MONTH_NAMES_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

const MONTH_NAMES_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const MONTH_SHORT_NAMES_ID = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
]

const MONTH_SHORT_NAMES_EN = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

const DAY_NAMES_ID = [
  'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'
]

const DAY_NAMES_EN = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
]

/**
 * Mendapatkan nama hari dari nomor hari ISO (1 = Senin .. 7 = Minggu).
 * @param {number} dayNumber
 * @param {string} [locale='id']
 * @returns {string}
 */
export function getDayName(dayNumber, locale = 'id') {
  if (dayNumber < 1 || dayNumber > 7) return ''
  const days = locale === 'en' ? DAY_NAMES_EN : DAY_NAMES_ID
  return days[dayNumber - 1]
}

/**
 * Format tanggal ISO (YYYY-MM-DD) ke dalam format bahasa yang dipilih.
 * Contoh ID: "Kamis, 15 Oktober 2026" atau "15 Oktober 2026"
 * Contoh EN: "Thursday, 15 October 2026" atau "15 October 2026"
 * @param {string} isoDate - "YYYY-MM-DD"
 * @param {boolean} [includeDayName=true]
 * @param {string} [locale='id']
 * @returns {string}
 */
export function formatDate(isoDate, includeDayName = true, locale = 'id') {
  if (!isoDate || typeof isoDate !== 'string') return ''
  const parts = isoDate.split('-').map(Number)
  if (parts.length !== 3) return isoDate
  const [y, m, d] = parts

  const monthNames = locale === 'en' ? MONTH_NAMES_EN : MONTH_NAMES_ID
  const monthName = monthNames[m - 1] || ''
  const dateStr = `${d} ${monthName} ${y}`

  if (!includeDayName) return dateStr

  const dateObj = new Date(Date.UTC(y, m - 1, d))
  const dayIndex = dateObj.getUTCDay()
  const isoDay = dayIndex === 0 ? 7 : dayIndex
  const dayName = getDayName(isoDay, locale)

  return `${dayName}, ${dateStr}`
}

/**
 * Format ringkas untuk tab / strip tanggal.
 * Contoh ID: "15 Okt", EN: "15 Oct"
 * @param {string} isoDate
 * @param {string} [locale='id']
 * @returns {string}
 */
export function formatDateShort(isoDate, locale = 'id') {
  if (!isoDate) return ''
  const parts = isoDate.split('-').map(Number)
  if (parts.length !== 3) return isoDate
  const [, m, d] = parts
  const shortNames = locale === 'en' ? MONTH_SHORT_NAMES_EN : MONTH_SHORT_NAMES_ID
  const monthShort = shortNames[m - 1] || ''
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
 * Format durasi menit ke dalam teks.
 * Contoh ID: 30 -> "30 menit", 60 -> "60 menit (1 jam)"
 * Contoh EN: 30 -> "30 minutes", 60 -> "60 minutes (1 hour)"
 * @param {number} minutes
 * @param {string} [locale='id']
 * @returns {string}
 */
export function formatDuration(minutes, locale = 'id') {
  const isEn = locale === 'en'
  const minText = isEn ? 'minutes' : 'menit'
  const hourText = isEn ? 'hour' : 'jam'
  const hoursText = isEn ? 'hours' : 'jam'

  if (!minutes) return isEn ? '0 minutes' : '0 menit'
  if (minutes === 60) {
    return isEn ? '60 minutes (1 hour)' : '60 menit (1 jam)'
  }
  if (minutes > 60 && minutes % 60 === 0) {
    const hrs = minutes / 60
    const hLabel = isEn && hrs > 1 ? hoursText : hourText
    return `${minutes} ${minText} (${hrs} ${hLabel})`
  }
  return `${minutes} ${minText}`
}

/**
 * Format ringkas hari praktek dokter.
 * Contoh: [{ day: 1 }, { day: 3 }, { day: 5 }] -> "Senin, Rabu, Jumat" (ID) / "Monday, Wednesday, Friday" (EN)
 * @param {Array<{ day: number }>} practiceHours
 * @param {string} [locale='id']
 * @returns {string}
 */
export function formatPracticeDaysSummary(practiceHours = [], locale = 'id') {
  if (!practiceHours || practiceHours.length === 0) {
    return locale === 'en' ? 'By appointment' : 'Sesuai perjanjian'
  }
  const uniqueDays = [...new Set(practiceHours.map((h) => h.day))].sort((a, b) => a - b)
  return uniqueDays.map((d) => getDayName(d, locale)).join(', ')
}
