import { describe, it, expect } from 'vitest'
import {
  formatDate,
  formatDateShort,
  formatTimeWib,
  formatTimeRangeWib,
  formatDuration,
  formatPracticeDaysSummary,
  getDayName,
} from '../format'

describe('format.js', () => {
  it('formats Indonesian date with day name', () => {
    // 2026-10-15 is Thursday (Kamis)
    const formatted = formatDate('2026-10-15', true)
    expect(formatted).toBe('Kamis, 15 Oktober 2026')
  })

  it('formats Indonesian date without day name', () => {
    const formatted = formatDate('2026-10-15', false)
    expect(formatted).toBe('15 Oktober 2026')
  })

  it('formats short date for date strip', () => {
    expect(formatDateShort('2026-10-15')).toBe('15 Okt')
  })

  it('formats time with WIB suffix', () => {
    expect(formatTimeWib('09:00')).toBe('09:00 WIB')
  })

  it('formats time range with WIB suffix', () => {
    expect(formatTimeRangeWib('09:00', '14:00')).toBe('09:00 – 14:00 WIB')
  })

  it('formats duration in minutes', () => {
    expect(formatDuration(30)).toBe('30 menit')
    expect(formatDuration(60)).toBe('60 menit (1 jam)')
    expect(formatDuration(120)).toBe('120 menit (2 jam)')
  })

  it('returns day name for ISO day numbers', () => {
    expect(getDayName(1)).toBe('Senin')
    expect(getDayName(6)).toBe('Sabtu')
    expect(getDayName(7)).toBe('Minggu')
    expect(getDayName(8)).toBe('')
  })

  it('formats doctor practice days summary', () => {
    const hours = [
      { day: 1, start: '09:00', end: '14:00' },
      { day: 3, start: '09:00', end: '14:00' },
      { day: 5, start: '14:00', end: '20:00' },
    ]
    expect(formatPracticeDaysSummary(hours)).toBe('Senin, Rabu, Jumat')
    expect(formatPracticeDaysSummary([])).toBe('Sesuai perjanjian')
  })

  it('formats dates, durations, and days in English when locale is en', () => {
    expect(formatDate('2026-10-15', true, 'en')).toBe('Thursday, 15 October 2026')
    expect(formatDate('2026-10-15', false, 'en')).toBe('15 October 2026')
    expect(formatDateShort('2026-10-15', 'en')).toBe('15 Oct')
    expect(getDayName(1, 'en')).toBe('Monday')
    expect(getDayName(7, 'en')).toBe('Sunday')
    expect(formatDuration(30, 'en')).toBe('30 minutes')
    expect(formatDuration(60, 'en')).toBe('60 minutes (1 hour)')
    expect(formatDuration(120, 'en')).toBe('120 minutes (2 hours)')

    const hours = [
      { day: 1, start: '09:00', end: '14:00' },
      { day: 3, start: '09:00', end: '14:00' },
    ]
    expect(formatPracticeDaysSummary(hours, 'en')).toBe('Monday, Wednesday')
    expect(formatPracticeDaysSummary([], 'en')).toBe('By appointment')
  })
})
