import { describe, it, expect } from 'vitest'
import {
  generateReservationCode,
  isValidReservationCode,
} from '../reservation'

describe('reservation.js', () => {
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
})
