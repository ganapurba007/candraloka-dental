import { describe, it, expect } from 'vitest'
import {
  timeToMinutes,
  minutesToTime,
  toIsoDateString,
  getIsoDayOfWeek,
  addDaysToIso,
  diffDays,
} from '../time'

describe('time.js', () => {
  it('converts HH:mm to total minutes and back', () => {
    expect(timeToMinutes('09:30')).toBe(570)
    expect(timeToMinutes('00:00')).toBe(0)
    expect(timeToMinutes('23:59')).toBe(1439)

    expect(minutesToTime(570)).toBe('09:30')
    expect(minutesToTime(0)).toBe('00:00')
  })

  it('calculates ISO day of week correctly (1 = Senin..7 = Minggu)', () => {
    // 2026-10-12 is Monday (Senin) = 1
    expect(getIsoDayOfWeek('2026-10-12')).toBe(1)
    // 2026-10-18 is Sunday (Minggu) = 7
    expect(getIsoDayOfWeek('2026-10-18')).toBe(7)
  })

  it('adds days to ISO date', () => {
    expect(addDaysToIso('2026-10-12', 3)).toBe('2026-10-15')
    expect(addDaysToIso('2026-10-31', 1)).toBe('2026-11-01')
  })

  it('calculates diff in days between two ISO dates', () => {
    expect(diffDays('2026-10-12', '2026-10-15')).toBe(3)
    expect(diffDays('2026-10-15', '2026-10-12')).toBe(-3)
    expect(diffDays('2026-10-12', '2026-10-12')).toBe(0)
  })

  it('converts Date to ISO string in WIB timezone', () => {
    // 2026-10-12T08:00:00Z -> in WIB (UTC+7) is 2026-10-12 15:00
    const d = new Date('2026-10-12T08:00:00Z')
    expect(toIsoDateString(d)).toBe('2026-10-12')
  })
})
