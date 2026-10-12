import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('Button.vue', () => {
  it('renders default button element with text slot', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Klik Saya',
      },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.text()).toContain('Klik Saya')
    expect(wrapper.classes()).toContain('bg-primary-600')
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'outline',
      },
      slots: {
        default: 'Outline Button',
      },
    })

    expect(wrapper.classes()).toContain('border')
    expect(wrapper.classes()).toContain('border-slate-300')
  })

  it('renders as anchor tag when href is provided', () => {
    const wrapper = mount(Button, {
      props: {
        href: 'https://wa.me/6281234567890',
      },
      slots: {
        default: 'Hubungi WhatsApp',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('https://wa.me/6281234567890')
  })

  it('disables button and displays loading spinner when loading is true', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
      slots: {
        default: 'Simpan',
      },
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.attributes('aria-disabled')).toBe('true')
    expect(wrapper.find('svg.animate-spin').exists()).toBe(true)
  })
})
