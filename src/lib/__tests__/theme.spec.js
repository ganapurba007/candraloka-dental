import { describe, it, expect } from 'vitest'
import {
  hexToRgb,
  mixRgb,
  generateColorShades,
  shadesToCssVariables,
  applyCssVariablesToElement,
} from '../theme'

describe('theme.js (Pure Theme Functions)', () => {
  it('hexToRgb correctly parses 6-digit hex', () => {
    expect(hexToRgb('#1e60d5')).toEqual({ r: 30, g: 96, b: 213 })
    expect(hexToRgb('#059669')).toEqual({ r: 5, g: 150, b: 105 })
    expect(hexToRgb('ffffff')).toEqual({ r: 255, g: 255, b: 255 })
  })

  it('hexToRgb handles 3-digit hex and invalid inputs safely', () => {
    expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 })
    expect(hexToRgb('invalid')).toEqual({ r: 30, g: 96, b: 213 })
    expect(hexToRgb(null)).toEqual({ r: 30, g: 96, b: 213 })
  })

  it('mixRgb linearly blends colors between 0 and 1', () => {
    const black = { r: 0, g: 0, b: 0 }
    const white = { r: 200, g: 200, b: 200 }
    expect(mixRgb(black, white, 0)).toEqual(black)
    expect(mixRgb(black, white, 1)).toEqual(white)
    expect(mixRgb(black, white, 0.5)).toEqual({ r: 100, g: 100, b: 100 })
  })

  it('generateColorShades returns complete 50-950 scale', () => {
    const shades = generateColorShades('#059669')
    const keys = Object.keys(shades)
    expect(keys).toEqual(['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'])
    expect(shades['500']).toEqual({ r: 5, g: 150, b: 105 })
    // Shade 50 should be significantly lighter than 500
    expect(shades['50'].r).toBeGreaterThan(shades['500'].r)
    // Shade 950 should be darker than 500
    expect(shades['950'].g).toBeLessThan(shades['500'].g)
  })

  it('shadesToCssVariables produces space-separated CSS variable mappings', () => {
    const shades = generateColorShades('#1e60d5')
    const vars = shadesToCssVariables(shades, 'primary')
    expect(vars['--color-primary-500']).toBe('30 96 213')
    expect(vars['--color-primary-50']).toBeDefined()
    expect(vars['--color-primary-950']).toBeDefined()
  })

  it('applyCssVariablesToElement sets style properties on DOM elements', () => {
    const dummyEl = {
      style: {
        properties: {},
        setProperty(prop, val) {
          this.properties[prop] = val
        },
      },
    }

    applyCssVariablesToElement({ '--color-primary-500': '5 150 105' }, dummyEl)
    expect(dummyEl.style.properties['--color-primary-500']).toBe('5 150 105')
  })
})
