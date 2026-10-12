import { describe, it, expect, beforeEach } from 'vitest'
import {
  generateReservationCode,
  isValidReservationCode,
  getStoredReservations,
  saveReservationToStorage,
  clearStoredReservations,
  getBookingDraft,
  saveBookingDraft,
  clearBookingDraft,
} from '../reservation'

describe('reservation.js', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it('generates valid reservation code with CDC prefix', () => {
    const code = generateReservationCode('2026-10-15')
    expect(code).toMatch(/^CDC-261015-[2-9A-HJ-NP-Z]{4}$/)
    expect(isValidReservationCode(code)).toBe(true)
  })

  it('is deterministic when custom randomFn is provided', () => {
    // Return index 0 each time -> first char is '2'
    const mockRandom = () => 0
    const code = generateReservationCode('2026-10-15', mockRandom)
    expect(code).toBe('CDC-261015-2222')
  })

  it('rejects ambiguous characters like O, 0, I, 1', () => {
    expect(isValidReservationCode('CDC-261015-O01I')).toBe(false)
    expect(isValidReservationCode('DNT-261015-ABCD')).toBe(false) // wrong prefix
    expect(isValidReservationCode('invalid-code')).toBe(false)
  })

  it('manages localStorage reservations correctly', () => {
    expect(getStoredReservations()).toEqual([])

    const sample = { code: 'CDC-261015-2222', doctorId: 1, date: '2026-10-15', time: '09:00' }
    saveReservationToStorage(sample)

    expect(getStoredReservations()).toHaveLength(1)
    expect(getStoredReservations()[0].code).toBe('CDC-261015-2222')

    clearStoredReservations()
    expect(getStoredReservations()).toEqual([])
  })

  it('manages sessionStorage booking drafts correctly', () => {
    expect(getBookingDraft()).toBeNull()

    const draft = { step: 2, serviceId: 1 }
    saveBookingDraft(draft)

    expect(getBookingDraft()).toEqual(draft)

    clearBookingDraft()
    expect(getBookingDraft()).toBeNull()
  })
})

