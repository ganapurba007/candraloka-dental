/**
 * availability.js — Logika murni perhitungan ketersediaan slot jadwal dokter.
 * Semua fungsi menerima `now` (Date | string) sebagai parameter agar 100% deterministic & testable.
 */

import {
  timeToMinutes,
  minutesToTime,
  toIsoDateString,
  getIsoDayOfWeek,
  diffDays,
} from './time'
import { generateSlotsForSession } from './schedule'

/**
 * Cek apakah tanggal berada dalam jendela pemesanan (hari ini s/d bookingWindowDays ke depan).
 * @param {string} targetIsoDate - "YYYY-MM-DD"
 * @param {Date|string} now - Waktu acuan saat ini
 * @param {number} bookingWindowDays - default 30
 * @returns {boolean}
 */
export function isDateInBookingWindow(targetIsoDate, now, bookingWindowDays = 30) {
  const todayIso = toIsoDateString(now)
  const daysDiff = diffDays(todayIso, targetIsoDate)
  return daysDiff >= 0 && daysDiff <= bookingWindowDays
}

/**
 * Cek apakah dua rentang waktu tumpang tindih (overlap).
 */
export function isTimeRangeOverlap(start1, dur1, start2, dur2) {
  return start1 < start2 + dur2 && start1 + dur1 > start2
}

/**
 * Cek apakah dokter sedang cuti pada tanggal tertentu.
 * @param {object} doctor
 * @param {string} targetIsoDate
 * @returns {boolean}
 */
export function isDoctorOnLeave(doctor, targetIsoDate) {
  return Array.isArray(doctor.leaveDates) && doctor.leaveDates.includes(targetIsoDate)
}

/**
 * Mengambil semua sesi praktek dokter pada hari tertentu.
 * @param {object} doctor
 * @param {string} targetIsoDate
 * @returns {Array<{ day: number, start: string, end: string }>}
 */
export function getDoctorSessionsForDate(doctor, targetIsoDate) {
  if (!doctor || !Array.isArray(doctor.practiceHours)) return []
  const dayOfWeek = getIsoDayOfWeek(targetIsoDate)
  return doctor.practiceHours.filter((session) => session.day === dayOfWeek)
}

/**
 * Mengumpulkan semua slot terisi (booked) untuk dokter pada tanggal tertentu,
 * menggabungkan data awal dokter (`bookedSlots`) dan reservasi tersimpan (`savedReservations`).
 * @param {object} doctor
 * @param {string} targetIsoDate
 * @param {Array<object>} savedReservations
 * @returns {Array<{ time: string, durationMinutes: number }>}
 */
export function getDoctorBookingsForDate(doctor, targetIsoDate, savedReservations = []) {
  const initialBooked = (doctor.bookedSlots || []).filter((b) => b.date === targetIsoDate)
  const localBooked = savedReservations
    .filter((r) => r.doctorId === doctor.id && r.date === targetIsoDate)
    .map((r) => ({ time: r.time, durationMinutes: r.durationMinutes }))

  return [...initialBooked, ...localBooked]
}

/**
 * Mengevaluasi ketersediaan sebuah slot untuk satu dokter.
 * @param {object} params
 * @returns {{ status: 'tersedia'|'penuh'|'lewat'|'libur', reason?: string }}
 */
export function evaluateSingleDoctorSlot({
  doctor,
  session,
  targetIsoDate,
  slotTime,
  durationMinutes,
  bookings,
  now,
  minLeadMinutes = 60,
}) {
  const slotStartMin = timeToMinutes(slotTime)
  const sessionEndMin = timeToMinutes(session.end)

  // 1. Durasi harus muat penuh di dalam satu sesi praktek
  if (slotStartMin + durationMinutes > sessionEndMin) {
    return { status: 'penuh', reason: 'Durasi melebihi sesi praktek' }
  }

  // 2. Jika hari ini, cek batas minimal lead time (60 menit)
  const todayIso = toIsoDateString(now)
  if (targetIsoDate === todayIso) {
    const nowDate = now instanceof Date ? now : new Date(now)
    const nowMin = nowDate.getHours() * 60 + nowDate.getMinutes()
    if (slotStartMin < nowMin + minLeadMinutes) {
      return { status: 'lewat', reason: 'Waktu sudah lewat / terlalu dekat' }
    }
  }

  // 3. Cek bentrok dengan slot yang sudah terisi (booked)
  const isBooked = bookings.some((b) => {
    const bookedStartMin = timeToMinutes(b.time)
    return isTimeRangeOverlap(slotStartMin, durationMinutes, bookedStartMin, b.durationMinutes)
  })

  if (isBooked) {
    return { status: 'penuh', reason: 'Slot sudah terisi' }
  }

  return { status: 'tersedia' }
}

/**
 * Menghitung seluruh slot untuk dokter tertentu pada tanggal tertentu.
 * @returns {Array<object>} daftar SlotInfo
 */
export function getSlotsForDoctor({
  doctor,
  targetIsoDate,
  durationMinutes = 30,
  slotMinutes = 30,
  savedReservations = [],
  now,
  minLeadMinutes = 60,
}) {
  if (isDoctorOnLeave(doctor, targetIsoDate)) {
    return []
  }

  const sessions = getDoctorSessionsForDate(doctor, targetIsoDate)
  if (sessions.length === 0) {
    return []
  }

  const bookings = getDoctorBookingsForDate(doctor, targetIsoDate, savedReservations)
  const slotsMap = new Map()

  for (const session of sessions) {
    const slotTimes = generateSlotsForSession(session.start, session.end, slotMinutes)

    for (const time of slotTimes) {
      const evaluation = evaluateSingleDoctorSlot({
        doctor,
        session,
        targetIsoDate,
        slotTime: time,
        durationMinutes,
        bookings,
        now,
        minLeadMinutes,
      })

      const endTime = minutesToTime(timeToMinutes(time) + durationMinutes)

      // Simpan status
      slotsMap.set(time, {
        time,
        endTime,
        status: evaluation.status,
        reason: evaluation.reason,
        doctorId: doctor.id,
        doctorIds: evaluation.status === 'tersedia' ? [doctor.id] : [],
      })
    }
  }

  // Urutkan berdasarkan waktu mulai
  return Array.from(slotsMap.values()).sort(
    (a, b) => timeToMinutes(a.time) - timeToMinutes(b.time)
  )
}

/**
 * Menghitung ketersediaan slot untuk opsi "Dokter Mana Saja" (any doctor).
 * Aturan PRD §5:
 * - Filter dokter yang menangani layanan (serviceId).
 * - Slot tersedia jika minimal satu dokter yang menangani layanan itu kosong.
 * - Dokter yang ditetapkan adalah yang paling sedikit terisi pada hari itu (seri -> id terkecil).
 */
export function getSlotsForAnyDoctor({
  doctors,
  serviceId,
  targetIsoDate,
  durationMinutes = 30,
  slotMinutes = 30,
  savedReservations = [],
  now,
  minLeadMinutes = 60,
}) {
  // 1. Filter dokter yang menangani layanan dan tidak cuti
  const eligibleDoctors = doctors.filter(
    (doc) =>
      Array.isArray(doc.serviceIds) &&
      doc.serviceIds.includes(serviceId) &&
      !isDoctorOnLeave(doc, targetIsoDate)
  )

  if (eligibleDoctors.length === 0) {
    return []
  }

  // 2. Hitung jumlah keterisian masing-masing dokter pada hari itu
  const doctorWorkload = new Map()
  for (const doc of eligibleDoctors) {
    const bookings = getDoctorBookingsForDate(doc, targetIsoDate, savedReservations)
    doctorWorkload.set(doc.id, bookings.length)
  }

  // 3. Kumpulkan slot per dokter
  const doctorSlots = eligibleDoctors.map((doc) => ({
    doctor: doc,
    slots: getSlotsForDoctor({
      doctor: doc,
      targetIsoDate,
      durationMinutes,
      slotMinutes,
      savedReservations,
      now,
      minLeadMinutes,
    }),
  }))

  // 4. Gabungkan seluruh waktu slot unik
  const allUniqueTimes = new Set()
  doctorSlots.forEach(({ slots }) => {
    slots.forEach((s) => allUniqueTimes.add(s.time))
  })

  const sortedTimes = Array.from(allUniqueTimes).sort(
    (a, b) => timeToMinutes(a) - timeToMinutes(b)
  )

  const combinedSlots = []

  for (const time of sortedTimes) {
    const availableDoctorIds = []
    let bestDoctorId = null
    let minLoad = Infinity
    let latestStatus = 'penuh'
    let reason = 'Semua dokter terisi'

    for (const { doctor, slots } of doctorSlots) {
      const slot = slots.find((s) => s.time === time)
      if (slot) {
        if (slot.status === 'tersedia') {
          availableDoctorIds.push(doctor.id)
          const load = doctorWorkload.get(doctor.id) || 0

          // Aturan: dokter dengan load terkecil, bila seri pilih id terkecil
          if (load < minLoad || (load === minLoad && (!bestDoctorId || doctor.id < bestDoctorId))) {
            minLoad = load
            bestDoctorId = doctor.id
          }
        } else if (slot.status === 'lewat') {
          latestStatus = 'lewat'
          reason = 'Waktu sudah lewat'
        }
      }
    }

    const isAvailable = availableDoctorIds.length > 0
    const finalStatus = isAvailable ? 'tersedia' : latestStatus
    const endTime = minutesToTime(timeToMinutes(time) + durationMinutes)

    combinedSlots.push({
      time,
      endTime,
      status: finalStatus,
      reason: isAvailable ? undefined : reason,
      doctorId: isAvailable ? bestDoctorId : undefined,
      doctorIds: availableDoctorIds,
    })
  }

  return combinedSlots
}

/**
 * Menghitung status ringkasan sebuah tanggal (Tersedia / Penuh / Libur)
 * untuk digunakan pada date strip navigator (FR-7.4 & UX-2).
 * @returns {'tersedia'|'penuh'|'libur'}
 */
export function getDateAvailabilityStatus({
  doctors,
  serviceId,
  doctorId, // number | 'any'
  targetIsoDate,
  durationMinutes = 30,
  slotMinutes = 30,
  savedReservations = [],
  now,
  minLeadMinutes = 60,
}) {
  let slots = []

  if (doctorId && doctorId !== 'any') {
    const doc = doctors.find((d) => d.id === doctorId)
    if (!doc || isDoctorOnLeave(doc, targetIsoDate)) {
      return 'libur'
    }
    const sessions = getDoctorSessionsForDate(doc, targetIsoDate)
    if (sessions.length === 0) {
      return 'libur'
    }
    slots = getSlotsForDoctor({
      doctor: doc,
      targetIsoDate,
      durationMinutes,
      slotMinutes,
      savedReservations,
      now,
      minLeadMinutes,
    })
  } else {
    // any doctor
    const eligible = doctors.filter(
      (d) =>
        Array.isArray(d.serviceIds) &&
        d.serviceIds.includes(serviceId) &&
        !isDoctorOnLeave(d, targetIsoDate)
    )
    const hasPracticingDoctors = eligible.some(
      (d) => getDoctorSessionsForDate(d, targetIsoDate).length > 0
    )
    if (!hasPracticingDoctors) {
      return 'libur'
    }

    slots = getSlotsForAnyDoctor({
      doctors,
      serviceId,
      targetIsoDate,
      durationMinutes,
      slotMinutes,
      savedReservations,
      now,
      minLeadMinutes,
    })
  }

  if (slots.length === 0) {
    return 'libur'
  }

  const hasAvailable = slots.some((s) => s.status === 'tersedia')
  return hasAvailable ? 'tersedia' : 'penuh'
}
