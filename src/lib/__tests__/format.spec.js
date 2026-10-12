import { describe, it, expect } from 'vitest'
import {
  formatDate,
  formatDateShort,
  formatTimeWib,
  formatTimeRangeWib,
  formatDuration,
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
})
