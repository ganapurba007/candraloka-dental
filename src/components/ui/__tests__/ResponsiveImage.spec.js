import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ResponsiveImage from '../ResponsiveImage.vue'

describe('ResponsiveImage.vue', () => {
  it('renders correctly with given src and alt', () => {
    const wrapper = mount(ResponsiveImage, {
      props: {
        src: '/images/doctors/dr-andi.webp',
        alt: 'Dr. Andi Pratama',
      },
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/images/doctors/dr-andi.webp')
    expect(img.attributes('alt')).toBe('Dr. Andi Pratama')
    expect(img.attributes('loading')).toBe('lazy')
    expect(img.attributes('decoding')).toBe('async')
  })

  it('generates correct webp srcset for 480w, 768w, and 1280w', () => {
    const wrapper = mount(ResponsiveImage, {
      props: {
        src: '/images/clinic/hero.webp',
        alt: 'Klinik Candraloka',
      },
    })

    const img = wrapper.find('img')
    expect(img.attributes('srcset')).toBe(
      '/images/clinic/hero-480.webp 480w, /images/clinic/hero-768.webp 768w, /images/clinic/hero.webp 1280w'
    )
  })

  it('handles non-webp files without srcset generation', () => {
    const wrapper = mount(ResponsiveImage, {
      props: {
        src: '/images/logo.svg',
        alt: 'Candraloka Logo',
      },
    })

    const img = wrapper.find('img')
    expect(img.attributes('srcset')).toBeUndefined()
  })

  it('sets eager loading and high priority when specified for LCP images', () => {
    const wrapper = mount(ResponsiveImage, {
      props: {
        src: '/images/clinic/hero.webp',
        alt: 'Hero',
        loading: 'eager',
        fetchpriority: 'high',
      },
    })

    const img = wrapper.find('img')
    expect(img.attributes('loading')).toBe('eager')
    expect(img.attributes('fetchpriority')).toBe('high')
  })

  it('applies aspectRatio style to wrapper', () => {
    const wrapper = mount(ResponsiveImage, {
      props: {
        src: '/images/clinic/facility.webp',
        alt: 'Fasilitas',
        aspectRatio: '16/9',
      },
    })

    expect(wrapper.attributes('style')).toMatch(/aspect-ratio:\s*16\s*\/\s*9/)
  })
})
