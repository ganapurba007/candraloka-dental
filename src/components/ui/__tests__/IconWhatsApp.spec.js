import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IconWhatsApp from '../IconWhatsApp.vue'

describe('IconWhatsApp.vue', () => {
  it('renders SVG with correct viewBox and attributes', () => {
    const wrapper = mount(IconWhatsApp, {
      attrs: {
        class: 'w-6 h-6 text-white',
      },
    })

    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('viewBox')).toBe('0 0 24 24')
    expect(svg.attributes('fill')).toBe('currentColor')
    expect(svg.classes()).toContain('w-6')
    expect(svg.classes()).toContain('h-6')
    expect(wrapper.find('path').exists()).toBe(true)
  })
})
