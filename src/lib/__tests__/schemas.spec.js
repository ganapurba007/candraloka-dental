import { describe, it, expect } from 'vitest'
import { patientFormSchema, reservationRecordSchema } from '../schemas'

describe('schemas.js', () => {
  describe('patientFormSchema', () => {
    it('accepts valid patient data', () => {
      const valid = {
        name: 'Ahmad Dahlan',
        whatsapp: '081234567890',
        email: 'ahmad@example.com',
        notes: 'Pembersihan rutin',
        isNewPatient: true,
      }

      const parsed = patientFormSchema.safeParse(valid)
      expect(parsed.success).toBe(true)
    })

    it('accepts empty email and empty notes', () => {
      const valid = {
        name: 'Siti Aminah',
        whatsapp: '085678901234',
        email: '',
        notes: '',
        isNewPatient: false,
      }

      const parsed = patientFormSchema.safeParse(valid)
      expect(parsed.success).toBe(true)
    })

    it('rejects short or invalid names', () => {
      expect(patientFormSchema.safeParse({ name: 'Al', whatsapp: '081234567890', isNewPatient: true }).success).toBe(false)
      expect(patientFormSchema.safeParse({ name: 'Ahmad 123', whatsapp: '081234567890', isNewPatient: true }).success).toBe(false)
    })

    it('rejects invalid Indonesian WhatsApp numbers', () => {
      // Too short
      expect(patientFormSchema.safeParse({ name: 'Budi', whatsapp: '0812', isNewPatient: true }).success).toBe(false)
      // Non Indonesian prefix
      expect(patientFormSchema.safeParse({ name: 'Budi', whatsapp: '02112345678', isNewPatient: true }).success).toBe(false)
      // Contains letters
      expect(patientFormSchema.safeParse({ name: 'Budi', whatsapp: '0812abcd99', isNewPatient: true }).success).toBe(false)
    })

    it('rejects malformed email when provided', () => {
      const invalid = {
        name: 'Budi Santoso',
        whatsapp: '081234567890',
        email: 'budi-bukan-email',
        isNewPatient: true,
      }
      expect(patientFormSchema.safeParse(invalid).success).toBe(false)
    })

    it('rejects notes exceeding 300 characters', () => {
      const invalid = {
        name: 'Budi Santoso',
        whatsapp: '081234567890',
        notes: 'A'.repeat(301),
        isNewPatient: true,
      }
      expect(patientFormSchema.safeParse(invalid).success).toBe(false)
    })
  })

  describe('reservationRecordSchema', () => {
    it('validates a complete reservation record', () => {
      const record = {
        code: 'CDC-261015-K79A',
        serviceId: 1,
        doctorId: 2,
        date: '2026-10-15',
        time: '09:00',
        durationMinutes: 30,
        patient: {
          name: 'Ratna Sari',
          whatsapp: '081234567890',
          isNewPatient: true,
        },
        status: 'menunggu-konfirmasi',
        createdAt: new Date().toISOString(),
      }

      const parsed = reservationRecordSchema.safeParse(record)
      expect(parsed.success).toBe(true)
    })
  })
})
