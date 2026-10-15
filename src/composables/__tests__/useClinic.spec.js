import { describe, it, expect, beforeEach } from 'vitest'
import { useClinic } from '../useClinic'

describe('useClinic Composable', () => {
  beforeEach(() => {
    const { setClinic } = useClinic()
    setClinic('candraloka')
  })

  it('initializes with default candraloka branding', () => {
    const { clinic, isDefaultClinic, currentSlug } = useClinic()
    expect(currentSlug.value).toBe('candraloka')
    expect(clinic.value.name).toBe('Candraloka Dental Care')
    expect(clinic.value.shortName).toBe('Candraloka')
    expect(clinic.value.colors.primary).toBe('#1e60d5')
    expect(isDefaultClinic.value).toBe(true)
  })

  it('switches to surya-dental with dynamic logo, name, and color', () => {
    const { clinic, setClinic, currentSlug, isDefaultClinic } = useClinic()
    setClinic('surya-dental')

    expect(currentSlug.value).toBe('surya-dental')
    expect(clinic.value.name).toBe('Surya Dental Care')
    expect(clinic.value.shortName).toBe('Surya')
    expect(clinic.value.logo).toBe('/images/logos/surya-dental.svg')
    expect(clinic.value.colors.primary).toBe('#059669')
    expect(clinic.value.contact.phone).toBe('021-77889900')
    expect(isDefaultClinic.value).toBe(false)
  })

  it('generates context-aware links via clinicLink()', () => {
    const { setClinic, clinicLink } = useClinic()

    // Default Candraloka link
    setClinic('candraloka')
    expect(clinicLink('/')).toBe('/')
    expect(clinicLink('/layanan')).toBe('/layanan')
    expect(clinicLink('/reservasi')).toBe('/reservasi')

    // Surya Dental dynamic link
    setClinic('surya-dental')
    expect(clinicLink('/')).toBe('/surya-dental')
    expect(clinicLink('/layanan')).toBe('/surya-dental/layanan')
    expect(clinicLink('/reservasi')).toBe('/surya-dental/reservasi')
  })

  it('safely falls back to default candraloka when given unknown slug', () => {
    const { clinic, setClinic, currentSlug } = useClinic()
    setClinic('unknown-client-slug')

    expect(currentSlug.value).toBe('candraloka')
    expect(clinic.value.name).toBe('Candraloka Dental Care')
  })
})
