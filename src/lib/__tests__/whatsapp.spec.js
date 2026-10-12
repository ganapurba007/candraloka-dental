import { describe, it, expect } from 'vitest'
import { buildReservationWhatsApp } from '../whatsapp'

describe('whatsapp.js', () => {
  it('builds pre-filled message and encoded URL', () => {
    const payload = {
      clinicWhatsapp: '6281234567890',
      code: 'CDC-261015-K79A',
      patient: {
        name: 'Budi Santoso',
        whatsapp: '081299887766',
        email: 'budi@example.com',
        notes: 'Gigi geraham belakang ngilu',
        isNewPatient: true,
      },
      serviceName: 'Penambalan Gigi Komposit',
      doctorName: 'drg. Andi Pratama, Sp.KG',
      date: '2026-10-15',
      time: '10:00',
    }

    const { text, url } = buildReservationWhatsApp(payload)

    expect(text).toContain('CDC-261015-K79A')
    expect(text).toContain('Budi Santoso')
    expect(text).toContain('Pasien Baru')
    expect(text).toContain('Penambalan Gigi Komposit')
    expect(text).toContain('drg. Andi Pratama, Sp.KG')
    expect(text).toContain('10:00 WIB')
    expect(text).toContain('Gigi geraham belakang ngilu')

    expect(url).toContain('https://wa.me/6281234567890?text=')
    expect(url).toContain(encodeURIComponent('CDC-261015-K79A'))
  })
})
