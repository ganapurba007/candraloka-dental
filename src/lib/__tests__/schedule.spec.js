import { describe, it, expect } from 'vitest'
import {
  generateSlotsForSession,
  getTimePeriod,
  groupSlotsByPeriod,
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
})
