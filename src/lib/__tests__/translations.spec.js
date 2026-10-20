import { describe, it, expect } from 'vitest'
import {
  translate,
  getServiceName,
  getServiceSummary,
  getServiceDescription,
  getServiceWhenNeeded,
  getServiceProcedure,
  getServicePreparation,
  getDoctorSpecialty,
  getDoctorName,
  getDoctorDegree,
  getDoctorBio,
  getDoctorInterest,
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

  it('translates full service details (summary, description, procedures)', () => {
    const scaling = {
      slug: 'pembersihan-karang-gigi',
      name: 'Pembersihan Karang Gigi (Scaling)',
      summary: 'Ringkasan ID',
      description: 'Deskripsi ID',
      whenNeeded: ['Indikasi 1'],
      procedure: [{ title: 'Tahap 1', description: 'Detail 1' }],
      preparation: ['Persiapan 1'],
    }

    expect(getServiceSummary(scaling, 'en')).toContain('Ultrasonic plaque and calculus removal')
    expect(getServiceSummary(scaling, 'id')).toContain('Pembersihan plak dan karang gigi')

    expect(getServiceDescription(scaling, 'en')).toContain('Calculus and hardened bacterial plaque removal')
    expect(getServiceWhenNeeded(scaling, 'en').length).toBeGreaterThan(0)
    expect(getServiceProcedure(scaling, 'en')[0].title).toBe('Initial Examination')
    expect(getServicePreparation(scaling, 'en').length).toBeGreaterThan(0)
  })

  it('translates doctor specialties', () => {
    expect(getDoctorSpecialty('Spesialis Konservasi Gigi', 'en')).toBe(
      'Conservative Dentistry Specialist'
    )
    expect(getDoctorSpecialty('Spesialis Ortodonti', 'en')).toBe('Orthodontics Specialist')
    expect(getDoctorSpecialty('Spesialis Kedokteran Gigi Anak', 'en')).toBe(
      'Pediatric Dentistry Specialist'
    )
    expect(getDoctorSpecialty('Spesialis Bedah Mulut & Maksilofasial', 'en')).toBe(
      'Oral & Maxillofacial Surgery Specialist'
    )
  })

  it('formats doctor names and degrees for English/Indonesian presentation', () => {
    expect(getDoctorName('drg. Andi Pratama, Sp.KG', 'id')).toBe('drg. Andi Pratama, Sp.KG')
    expect(getDoctorName('drg. Andi Pratama, Sp.KG', 'en')).toBe('Dr. Andi Pratama, Sp.KG')

    expect(getDoctorDegree('Dokter Gigi (drg.)', 'en')).toBe('Doctor of Dental Surgery (DDS)')
    expect(getDoctorDegree('Spesialis Konservasi Gigi (Sp.KG)', 'en')).toBe(
      'Conservative Dentistry Specialist (Sp.KG)'
    )
  })

  it('translates doctor interests and bios', () => {
    expect(getDoctorInterest('Endodonti Modern', 'en')).toBe('Modern Endodontics')
    expect(getDoctorInterest('Endodonti Modern', 'id')).toBe('Endodonti Modern')

    const doc = { slug: 'drg-andi-pratama-sp-kg', bio: 'Bio ID' }
    expect(getDoctorBio(doc, 'en')).toContain('Dental specialist in conservative dentistry')
  })

  it('translates categories', () => {
    expect(getCategoryLabel('Umum', 'en')).toBe('General')
    expect(getCategoryLabel('Estetika', 'en')).toBe('Aesthetic')
    expect(getCategoryLabel('Semua Layanan', 'en')).toBe('All Services')
  })
})
