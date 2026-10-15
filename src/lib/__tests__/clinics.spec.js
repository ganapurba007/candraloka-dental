import { describe, it, expect } from 'vitest'
import { getRegisteredClinics, getClinicBySlug } from '../clinics'

describe('clinics.js (Clinic Registry & Fallback Functions)', () => {
  it('getRegisteredClinics returns all defined presets with essential info', () => {
    const list = getRegisteredClinics()
    expect(list.length).toBeGreaterThanOrEqual(2)

    const candraloka = list.find((c) => c.slug === 'candraloka')
    expect(candraloka).toBeDefined()
    expect(candraloka.name).toBe('Candraloka Dental Care')

    const surya = list.find((c) => c.slug === 'surya-dental')
    expect(surya).toBeDefined()
    expect(surya.name).toBe('Surya Dental Care')
  })

  it('getClinicBySlug loads custom preset correctly for surya-dental', () => {
    const clinic = getClinicBySlug('surya-dental')
    expect(clinic.slug).toBe('surya-dental')
    expect(clinic.name).toBe('Surya Dental Care')
    expect(clinic.shortName).toBe('Surya')
    expect(clinic.colors.primary).toBe('#059669')
    expect(clinic.logo).toBe('/images/logos/surya-dental.svg')
    expect(clinic.contact.phone).toBe('021-77889900')
    // Fallback fields inherited from base clinic
    expect(clinic.operatingHours.length).toBeGreaterThan(0)
    expect(clinic.about.values.length).toBe(6)
  })

  it('getClinicBySlug safely falls back to default candraloka when slug is unknown or empty', () => {
    const fallbackEmpty = getClinicBySlug('')
    expect(fallbackEmpty.slug).toBe('candraloka')
    expect(fallbackEmpty.name).toBe('Candraloka Dental Care')

    const fallbackUnknown = getClinicBySlug('non-existent-clinic-slug')
    expect(fallbackUnknown.slug).toBe('candraloka')
    expect(fallbackUnknown.name).toBe('Candraloka Dental Care')
  })
})
