import { describe, it, expect } from 'vitest'
import {
  isDateInBookingWindow,
  isTimeRangeOverlap,
  isDoctorOnLeave,
  getDoctorSessionsForDate,
  getSlotsForDoctor,
  getSlotsForAnyDoctor,
  getDateAvailabilityStatus,
} from '../availability'

describe('availability.js', () => {
  const mockDoctor1 = {
    id: 1,
    name: 'drg. Andi Pratama',
    serviceIds: [1, 2],
    practiceHours: [
      { day: 1, start: '09:00', end: '12:00' }, // Monday 09:00 - 12:00
    ],
    leaveDates: ['2026-10-19'],
    bookedSlots: [
      { date: '2026-10-12', time: '10:00', durationMinutes: 30 },
    ],
  }

  const mockDoctor2 = {
    id: 2,
    name: 'drg. Nadia Safira',
    serviceIds: [1, 8],
    practiceHours: [
      { day: 1, start: '09:00', end: '12:00' }, // Monday 09:00 - 12:00
    ],
    leaveDates: [],
    bookedSlots: [],
  }

  const mockDoctors = [mockDoctor1, mockDoctor2]

  describe('isDateInBookingWindow', () => {
    const fixedNow = new Date('2026-10-12T07:00:00') // Monday

    it('returns true for today and up to 30 days', () => {
      expect(isDateInBookingWindow('2026-10-12', fixedNow, 30)).toBe(true)
      expect(isDateInBookingWindow('2026-11-11', fixedNow, 30)).toBe(true)
    })

    it('returns false for past dates or beyond window', () => {
      expect(isDateInBookingWindow('2026-10-11', fixedNow, 30)).toBe(false)
      expect(isDateInBookingWindow('2026-11-12', fixedNow, 30)).toBe(false)
    })
  })

  describe('isTimeRangeOverlap', () => {
    it('detects overlapping and non-overlapping intervals', () => {
      // 09:00 - 09:30 (540, 30) vs 09:15 - 09:45 (555, 30)
      expect(isTimeRangeOverlap(540, 30, 555, 30)).toBe(true)
      // 09:00 - 09:30 vs 09:30 - 10:00 (adjacent, not overlapping)
      expect(isTimeRangeOverlap(540, 30, 570, 30)).toBe(false)
      // 09:00 - 10:00 vs 09:30 - 10:00
      expect(isTimeRangeOverlap(540, 60, 570, 30)).toBe(true)
    })
  })

  describe('isDoctorOnLeave', () => {
    it('returns true when date is in leaveDates', () => {
      expect(isDoctorOnLeave(mockDoctor1, '2026-10-19')).toBe(true)
      expect(isDoctorOnLeave(mockDoctor1, '2026-10-12')).toBe(false)
    })
  })

  describe('getDoctorSessionsForDate', () => {
    it('returns practice sessions matching ISO day of week', () => {
      // 2026-10-12 is Monday (day 1)
      const sessions = getDoctorSessionsForDate(mockDoctor1, '2026-10-12')
      expect(sessions.length).toBe(1)
      expect(sessions[0].start).toBe('09:00')
      expect(sessions[0].end).toBe('12:00')

      // 2026-10-13 is Tuesday (day 2)
      expect(getDoctorSessionsForDate(mockDoctor1, '2026-10-13')).toEqual([])
    })
  })

  describe('getSlotsForDoctor', () => {
    it('marks slot as penuh when overlapping with initial bookedSlots', () => {
      // Future date, no lead-time constraint
      const futureNow = new Date('2026-10-10T08:00:00')
      const slots = getSlotsForDoctor({
        doctor: mockDoctor1,
        targetIsoDate: '2026-10-12', // Monday
        durationMinutes: 30,
        slotMinutes: 30,
        savedReservations: [],
        now: futureNow,
      })

      const slot1000 = slots.find((s) => s.time === '10:00')
      expect(slot1000.status).toBe('penuh')
      expect(slot1000.reason).toContain('terisi')

      const slot0900 = slots.find((s) => s.time === '09:00')
      expect(slot0900.status).toBe('tersedia')
    })

    it('marks slot as penuh when overlapping with saved local reservations', () => {
      const futureNow = new Date('2026-10-10T08:00:00')
      const localReservations = [
        { doctorId: 1, date: '2026-10-12', time: '09:00', durationMinutes: 30 },
      ]

      const slots = getSlotsForDoctor({
        doctor: mockDoctor1,
        targetIsoDate: '2026-10-12',
        durationMinutes: 30,
        slotMinutes: 30,
        savedReservations: localReservations,
        now: futureNow,
      })

      const slot0900 = slots.find((s) => s.time === '09:00')
      expect(slot0900.status).toBe('penuh')
    })

    it('enforces minLeadMinutes for today (at least 60 min ahead)', () => {
      // If now is 09:15 on 2026-10-12:
      // Slots before 10:15 (i.e. 09:00, 09:30, 10:00) should be 'lewat'
      const todayNow = new Date('2026-10-12T09:15:00')
      const slots = getSlotsForDoctor({
        doctor: mockDoctor1,
        targetIsoDate: '2026-10-12',
        durationMinutes: 30,
        slotMinutes: 30,
        savedReservations: [],
        now: todayNow,
        minLeadMinutes: 60,
      })

      const slot0900 = slots.find((s) => s.time === '09:00')
      const slot0930 = slots.find((s) => s.time === '09:30')
      const slot1000 = slots.find((s) => s.time === '10:00')
      const slot1030 = slots.find((s) => s.time === '10:30')

      expect(slot0900.status).toBe('lewat')
      expect(slot0930.status).toBe('lewat')
      expect(slot1000.status).toBe('lewat')
      expect(slot1030.status).toBe('tersedia')
    })

    it('marks slot as penuh if duration exceeds session end', () => {
      // Sesi 09:00 - 12:00. Jika duration 60 menit, slot 11:30 akan selesai 12:30 (> 12:00)
      const futureNow = new Date('2026-10-10T08:00:00')
      const slots = getSlotsForDoctor({
        doctor: mockDoctor1,
        targetIsoDate: '2026-10-12',
        durationMinutes: 60,
        slotMinutes: 30,
        savedReservations: [],
        now: futureNow,
      })

      const slot1130 = slots.find((s) => s.time === '11:30')
      expect(slot1130.status).toBe('penuh')
      expect(slot1130.reason).toContain('melebihi')
    })

    it('returns empty array when doctor is on leave', () => {
      const slots = getSlotsForDoctor({
        doctor: mockDoctor1,
        targetIsoDate: '2026-10-19', // on leave
        durationMinutes: 30,
        slotMinutes: 30,
        savedReservations: [],
        now: new Date('2026-10-10T08:00:00'),
      })
      expect(slots).toEqual([])
    })
  })

  describe('getSlotsForAnyDoctor', () => {
    it('assigns doctor with lowest workload, tie-breaking by lowest ID', () => {
      // Service 1 is handled by both Doctor 1 and Doctor 2.
      // Doctor 1 has 1 booked slot at 10:00, Doctor 2 has 0 booked slots.
      // At 09:00, both are free -> Doctor 2 should be assigned (0 bookings vs 1 booking).
      const futureNow = new Date('2026-10-10T08:00:00')
      const slots = getSlotsForAnyDoctor({
        doctors: mockDoctors,
        serviceId: 1,
        targetIsoDate: '2026-10-12',
        durationMinutes: 30,
        slotMinutes: 30,
        savedReservations: [],
        now: futureNow,
      })

      const slot0900 = slots.find((s) => s.time === '09:00')
      expect(slot0900.status).toBe('tersedia')
      expect(slot0900.doctorId).toBe(2) // Nadia has less workload than Andi

      // At 10:00, Doctor 1 is booked, but Doctor 2 is free -> available via Doctor 2
      const slot1000 = slots.find((s) => s.time === '10:00')
      expect(slot1000.status).toBe('tersedia')
      expect(slot1000.doctorId).toBe(2)
    })
  })

  describe('getDateAvailabilityStatus', () => {
    it('returns libur when doctor has no practice hours or is on leave', () => {
      const futureNow = new Date('2026-10-10T08:00:00')
      // Tuesday -> Doctor 1 doesn't practice
      expect(
        getDateAvailabilityStatus({
          doctors: mockDoctors,
          serviceId: 1,
          doctorId: 1,
          targetIsoDate: '2026-10-13',
          now: futureNow,
        })
      ).toBe('libur')

      // Monday 2026-10-19 -> Doctor 1 is on leave
      expect(
        getDateAvailabilityStatus({
          doctors: mockDoctors,
          serviceId: 1,
          doctorId: 1,
          targetIsoDate: '2026-10-19',
          now: futureNow,
        })
      ).toBe('libur')
    })

    it('returns tersedia when slots are open', () => {
      const futureNow = new Date('2026-10-10T08:00:00')
      expect(
        getDateAvailabilityStatus({
          doctors: mockDoctors,
          serviceId: 1,
          doctorId: 1,
          targetIsoDate: '2026-10-12',
          now: futureNow,
        })
      ).toBe('tersedia')
    })
  })
})
