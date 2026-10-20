import { describe, it, expect, beforeEach } from 'vitest'
import { useI18n } from '../useI18n'

describe('useI18n Composable', () => {
  beforeEach(() => {
    const { setLocale, resetExplicitFlag } = useI18n()
    resetExplicitFlag()
    setLocale('id', false)
  })

  it('initializes with default locale id', () => {
    const { locale, isIndonesian, isEnglish } = useI18n()
    expect(locale.value).toBe('id')
    expect(isIndonesian.value).toBe(true)
    expect(isEnglish.value).toBe(false)
  })

  it('switches locale dynamically with setLocale()', () => {
    const { locale, setLocale, isEnglish, isIndonesian } = useI18n()
    setLocale('en', true)

    expect(locale.value).toBe('en')
    expect(isEnglish.value).toBe(true)
    expect(isIndonesian.value).toBe(false)
  })

  it('toggles locale between id and en', () => {
    const { locale, toggleLocale } = useI18n()
    expect(locale.value).toBe('id')

    toggleLocale()
    expect(locale.value).toBe('en')

    toggleLocale()
    expect(locale.value).toBe('id')
  })

  it('syncLocaleWithClinic updates locale when user has not explicitly set locale', () => {
    const { locale, syncLocaleWithClinic } = useI18n()
    syncLocaleWithClinic('en')
    expect(locale.value).toBe('en')

    syncLocaleWithClinic('id')
    expect(locale.value).toBe('id')
  })

  it('t() reactively returns translated text according to active locale', () => {
    const { t, setLocale } = useI18n()
    setLocale('id', true)
    expect(t('nav.home')).toBe('Beranda')

    setLocale('en', true)
    expect(t('nav.home')).toBe('Home')
  })
})
