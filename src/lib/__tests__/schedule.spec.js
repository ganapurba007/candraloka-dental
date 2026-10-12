import { describe, it, expect } from 'vitest'
import {
  generateSlotsForSession,
  getTimePeriod,
  groupSlotsByPeriod,
  getClinicOpenStatus,
  isDoctorPracticingOn,
  isDoctorSessionActiveNow,
} from '../schedule'

describe('schedule.js', () => {
  it('generates 30-min interval slots for session', () => {
    const slots = generateSlotsForSession('09:00', '11:00', 30)
    expect(slots).toEqual(['09:00', '09:30', '10:00', '10:30'])
  })

  it('determines period of day accurately', () => {
    expect(getTimePeriod('09:00')).toBe('Pagi')
    expect(getTimePeriod('11:30')).toBe('Pagi')
    expect(getTimePeriod('12:00')).toBe('Siang')
    expect(getTimePeriod('14:30')).toBe('Siang')
    expect(getTimePeriod('15:00')).toBe('Sore')
    expect(getTimePeriod('19:30')).toBe('Sore')
  })

  it('groups slot objects by period', () => {
    const sampleSlots = [
      { time: '09:00', status: 'tersedia' },
      { time: '13:00', status: 'tersedia' },
      { time: '16:00', status: 'penuh' },
    ]

    const grouped = groupSlotsByPeriod(sampleSlots)
    expect(grouped.length).toBe(3)
    expect(grouped[0].name).toBe('Pagi')
    expect(grouped[0].slots.length).toBe(1)
    expect(grouped[1].name).toBe('Siang')
    expect(grouped[1].slots.length).toBe(1)
    expect(grouped[2].name).toBe('Sore & Malam')
    expect(grouped[2].slots.length).toBe(1)
  })

  it('calculates clinic open status correctly', () => {
    const hours = [
      { day: 1, open: '09:00', close: '20:00' }, // Monday
    ]

    // Monday 10:00 -> Open
    const duringOpen = new Date('2026-10-12T10:00:00+07:00')
    const openRes = getClinicOpenStatus(hours, duringOpen)
    expect(openRes.isOpen).toBe(true)
    expect(openRes.statusBadge).toBe('Buka Sekarang')

    // Monday 07:00 -> Before open
    const beforeOpen = new Date('2026-10-12T07:00:00+07:00')
    const beforeRes = getClinicOpenStatus(hours, beforeOpen)
    expect(beforeRes.isOpen).toBe(false)
    expect(beforeRes.statusBadge).toContain('Buka 09:00 WIB')

    // Sunday (day 7) -> Closed all day
    const sunday = new Date('2026-10-18T12:00:00+07:00')
    const sunRes = getClinicOpenStatus(hours, sunday)
    expect(sunRes.isOpen).toBe(false)
    expect(sunRes.statusBadge).toBe('Tutup Hari Ini')
  })

  it('determines if doctor is practicing on a given date considering leave', () => {
    const doctor = {
      practiceHours: [
        { day: 1, start: '09:00', end: '14:00' }, // Monday
        { day: 3, start: '09:00', end: '14:00' }, // Wednesday
      ],
      leaveDates: ['2026-10-19'], // A Monday on leave
    }

    // Monday 2026-10-12 (day 1, normal) -> practicing
    expect(isDoctorPracticingOn(doctor, '2026-10-12')).toBe(true)

    // Tuesday 2026-10-13 (day 2, not in practiceHours) -> false
    expect(isDoctorPracticingOn(doctor, '2026-10-13')).toBe(false)

    // Monday 2026-10-19 (day 1, but on leave) -> false
    expect(isDoctorPracticingOn(doctor, '2026-10-19')).toBe(false)
  })

  it('determines if a doctor session is actively ongoing right now', () => {
    const doctor = {
      leaveDates: ['2026-10-19'],
    }
    const sessionMondayMorning = { day: 1, start: '09:00', end: '14:00' }

    // Monday 2026-10-12 at 10:30 WIB -> active
    expect(isDoctorSessionActiveNow(doctor, sessionMondayMorning, '2026-10-12T10:30:00+07:00')).toBe(true)

    // Monday 2026-10-12 at 08:30 WIB (before session) -> inactive
    expect(isDoctorSessionActiveNow(doctor, sessionMondayMorning, '2026-10-12T08:30:00+07:00')).toBe(false)

    // Monday 2026-10-12 at 15:00 WIB (after session) -> inactive
    expect(isDoctorSessionActiveNow(doctor, sessionMondayMorning, '2026-10-12T15:00:00+07:00')).toBe(false)

    // Tuesday 2026-10-13 at 10:30 WIB (different day) -> inactive
    expect(isDoctorSessionActiveNow(doctor, sessionMondayMorning, '2026-10-13T10:30:00+07:00')).toBe(false)

    // Monday 2026-10-19 at 10:30 WIB (on leave) -> inactive
    expect(isDoctorSessionActiveNow(doctor, sessionMondayMorning, '2026-10-19T10:30:00+07:00')).toBe(false)
  })
})
