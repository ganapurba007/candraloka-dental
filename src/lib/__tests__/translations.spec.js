import { describe, it, expect } from 'vitest'
import {
  translate,
  getServiceName,
  getDoctorSpecialty,
  getCategoryLabel,
  dictionaries,
} from '../translations'

describe('translations (Pure Translation Engine)', () => {
  it('translates Indonesian and English keys correctly', () => {
    expect(translate('id', 'nav.home')).toBe('Beranda')
    expect(translate('en', 'nav.home')).toBe('Home')
    expect(translate('id', 'nav.bookNow')).toBe('Buat Reservasi')
    expect(translate('en', 'nav.bookNow')).toBe('Book Appointment')
  })

  it('interpolates parameters correctly', () => {
    expect(translate('id', 'topbar.operatingHours', { tz: 'WIB' })).toBe(
      'Senin – Sabtu: 09:00 – 20:00 WIB'
    )
    expect(translate('en', 'topbar.operatingHours', { tz: 'SGT' })).toBe(
      'Monday – Saturday: 09:00 – 20:00 SGT'
    )
    expect(translate('id', 'services.durationMinutes', { min: 30 })).toBe('30 Menit')
    expect(translate('en', 'services.durationMinutes', { min: 30 })).toBe('30 Minutes')
  })

  it('falls back to Indonesian if key is missing in English, and to path if missing everywhere', () => {
    expect(translate('en', 'nonexistent.deep.key')).toBe('nonexistent.deep.key')
  })

  it('translates service names accurately', () => {
    const scaling = { slug: 'pembersihan-karang-gigi', name: 'Pembersihan Karang Gigi (Scaling)' }
    expect(getServiceName(scaling, 'id')).toBe('Pembersihan Karang Gigi (Scaling)')
    expect(getServiceName(scaling, 'en')).toBe('Scaling & Calculus Removal')

    const filling = { slug: 'penambalan-gigi', name: 'Penambalan Gigi Komposit' }
    expect(getServiceName(filling, 'en')).toBe('Composite Tooth Filling')
  })

  it('translates doctor specialties', () => {
    expect(getDoctorSpecialty('Spesialis Konservasi Gigi', 'en')).toBe(
      'Conservative Dentistry Specialist'
    )
    expect(getDoctorSpecialty('Spesialis Ortodonti', 'en')).toBe('Orthodontics Specialist')
    expect(getDoctorSpecialty('Spesialis Kedokteran Gigi Anak', 'en')).toBe(
      'Pediatric Dentistry Specialist'
    )
  })

  it('translates categories', () => {
    expect(getCategoryLabel('Umum', 'en')).toBe('General')
    expect(getCategoryLabel('Estetika', 'en')).toBe('Aesthetic')
    expect(getCategoryLabel('Semua Layanan', 'en')).toBe('All Services')
  })
})
