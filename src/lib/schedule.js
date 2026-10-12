/**
 * schedule.js — Helper murni untuk kalkulasi pembagian slot jadwal praktek.
 */
import { timeToMinutes, minutesToTime } from './time'

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
 * Mengelompokkan daftar slot ke dalam 3 periode: Pagi, Siang, Sore.
 * @param {Array<{ time: string, [key: string]: any }>} slots
 * @returns {Array<{ id: string, name: string, slots: any[] }>}
 */
export function groupSlotsByPeriod(slots) {
  const periods = [
    { id: 'pagi', name: 'Pagi', label: 'Pagi (Sebelum 12:00)', slots: [] },
    { id: 'siang', name: 'Siang', label: 'Siang (12:00 – 15:00)', slots: [] },
    { id: 'sore', name: 'Sore & Malam', label: 'Sore & Malam (15:00 ke atas)', slots: [] },
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
