/**
 * schedule.js — Helper murni untuk kalkulasi pembagian slot jadwal praktek.
 */
import {
  timeToMinutes,
  minutesToTime,
  getIsoDayOfWeek,
  toIsoDateString,
  toWibDate,
} from './time'

/**
 * Menghasilkan daftar slot jam awal dari sebuah sesi waktu.
 * Contoh: start="09:00", end="11:00", step=30 -> ["09:00", "09:30", "10:00", "10:30"]
 * @param {string} sessionStart
 * @param {string} sessionEnd
 * @param {number} slotMinutes
 * @returns {string[]}
 */
export function generateSlotsForSession(sessionStart, sessionEnd, slotMinutes = 30) {
  const startMin = timeToMinutes(sessionStart)
  const endMin = timeToMinutes(sessionEnd)
  const slots = []

  for (let m = startMin; m + slotMinutes <= endMin; m += slotMinutes) {
    slots.push(minutesToTime(m))
  }

  return slots
}

/**
 * Menentukan periode waktu (Pagi / Siang / Sore).
 * @param {string} timeStr - "09:00"
 * @returns {'Pagi'|'Siang'|'Sore'}
 */
export function getTimePeriod(timeStr) {
  const min = timeToMinutes(timeStr)
  if (min < 720) return 'Pagi' // < 12:00
  if (min < 900) return 'Siang' // 12:00 - 15:00
  return 'Sore' // >= 15:00
}

/**
 * Mengelompokkan daftar slot ke dalam 3 periode: Pagi, Siang, Sore (ID/EN).
 * @param {Array<{ time: string, [key: string]: any }>} slots
 * @param {string} [locale='id']
 * @returns {Array<{ id: string, name: string, label: string, slots: any[] }>}
 */
export function groupSlotsByPeriod(slots, locale = 'id') {
  const isEn = locale === 'en'
  const periods = [
    {
      id: 'pagi',
      name: isEn ? 'Morning' : 'Pagi',
      label: isEn ? 'Morning (Before 12:00)' : 'Pagi (Sebelum 12:00)',
      slots: [],
    },
    {
      id: 'siang',
      name: isEn ? 'Afternoon' : 'Siang',
      label: isEn ? 'Afternoon (12:00 – 15:00)' : 'Siang (12:00 – 15:00)',
      slots: [],
    },
    {
      id: 'sore',
      name: isEn ? 'Evening' : 'Sore & Malam',
      label: isEn ? 'Evening (15:00 onwards)' : 'Sore & Malam (15:00 ke atas)',
      slots: [],
    },
  ]

  for (const slot of slots) {
    const period = getTimePeriod(slot.time)
    if (period === 'Pagi') {
      periods[0].slots.push(slot)
    } else if (period === 'Siang') {
      periods[1].slots.push(slot)
    } else {
      periods[2].slots.push(slot)
    }
  }

  // Hanya return periode yang memiliki slot
  return periods.filter((p) => p.slots.length > 0)
}

/**
 * Menghitung status buka/tutup klinik hari ini berdasarkan jam operasional dan waktu WIB (ID/EN).
 * @param {Array<{ day: number, open: string, close: string }>} operatingHours
 * @param {Date|string} [now=new Date()]
 * @param {string} [locale='id']
 * @returns {{ isOpen: boolean, statusBadge: string, hoursText: string }}
 */
export function getClinicOpenStatus(operatingHours = [], now = new Date(), locale = 'id') {
  const isEn = locale === 'en'
  const todayIso = toIsoDateString(now)
  const dayOfWeek = getIsoDayOfWeek(todayIso)

  const schedule = operatingHours.find((h) => h.day === dayOfWeek)
  if (!schedule) {
    return {
      isOpen: false,
      statusBadge: isEn ? 'Closed Today' : 'Tutup Hari Ini',
      hoursText: isEn ? 'Clinic is closed today' : 'Klinik libur hari ini',
    }
  }

  const wib = toWibDate(now)
  const currentMin = wib.getHours() * 60 + wib.getMinutes()
  const openMin = timeToMinutes(schedule.open)
  const closeMin = timeToMinutes(schedule.close)

  if (currentMin >= openMin && currentMin < closeMin) {
    return {
      isOpen: true,
      statusBadge: isEn ? 'Open Now' : 'Buka Sekarang',
      hoursText: isEn
        ? `Today: ${schedule.open} – ${schedule.close} WIB`
        : `Hari ini: ${schedule.open} – ${schedule.close} WIB`,
    }
  }

  if (currentMin < openMin) {
    return {
      isOpen: false,
      statusBadge: isEn ? `Opens at ${schedule.open} WIB` : `Buka ${schedule.open} WIB`,
      hoursText: isEn
        ? `Today: ${schedule.open} – ${schedule.close} WIB`
        : `Hari ini: ${schedule.open} – ${schedule.close} WIB`,
    }
  }

  return {
    isOpen: false,
    statusBadge: isEn ? 'Closed' : 'Sudah Tutup',
    hoursText: isEn ? 'Reopens tomorrow' : 'Buka kembali besok',
  }
}

/**
 * Mengetahui apakah dokter memiliki sesi praktek pada hari tertentu (default hari ini WIB).
 * Memperhitungkan cuti (leaveDates).
 * @param {object} doctor
 * @param {Date|string} [now=new Date()]
 * @returns {boolean}
 */
export function isDoctorPracticingOn(doctor, now = new Date()) {
  if (!doctor || !doctor.practiceHours || !Array.isArray(doctor.practiceHours)) return false
  const todayIso = toIsoDateString(now)
  if (doctor.leaveDates && doctor.leaveDates.includes(todayIso)) {
    return false
  }
  const dayOfWeek = getIsoDayOfWeek(todayIso)
  return doctor.practiceHours.some((h) => h.day === dayOfWeek)
}

/**
 * Mengetahui apakah sesi dokter tertentu sedang aktif berlangsung saat ini (berdasarkan hari dan jam WIB).
 * Mengembalikan false bila dokter sedang cuti hari ini atau waktu di luar rentang sesi.
 * @param {object} doctor
 * @param {{ day: number, start: string, end: string }} session
 * @param {Date|string} [now=new Date()]
 * @returns {boolean}
 */
export function isDoctorSessionActiveNow(doctor, session, now = new Date()) {
  if (!doctor || !session || typeof session.day !== 'number') return false
  const todayIso = toIsoDateString(now)
  if (doctor.leaveDates && doctor.leaveDates.includes(todayIso)) {
    return false
  }
  const dayOfWeek = getIsoDayOfWeek(todayIso)
  if (session.day !== dayOfWeek) {
    return false
  }

  const wib = toWibDate(now)
  const currentMin = wib.getHours() * 60 + wib.getMinutes()
  const startMin = timeToMinutes(session.start)
  const endMin = timeToMinutes(session.end)

  return currentMin >= startMin && currentMin < endMin
}


