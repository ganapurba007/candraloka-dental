import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createUnhead, headSymbol } from '@unhead/vue'
import Contact from '../Contact.vue'

describe('Contact.vue', () => {
  it('renders contact page header, location details, operating hours, and map', () => {
    const unhead = createUnhead()
    const wrapper = mount(Contact, {
      global: {
        provide: {
          [headSymbol]: unhead,
        },
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    // Header
    expect(wrapper.text()).toContain('Kontak & Akses Klinik')

    // Location & Hours (from AboutLocation component)
    expect(wrapper.text()).toContain('Akses & Kunjungan')
    expect(wrapper.text()).toContain('Lokasi & Jam Praktek')
    expect(wrapper.text()).toContain('Status Klinik')
    expect(wrapper.text()).toContain('Alamat')
    expect(wrapper.text()).toContain('Jadwal Jam Buka')
    expect(wrapper.text()).toContain('Petunjuk Arah via Google Maps')

    // Embedded Google Maps iframe
    const iframe = wrapper.find('iframe')
    expect(iframe.exists()).toBe(true)
    expect(iframe.attributes('title')).toBe('Peta Lokasi Candraloka Dental Care')
  })
})
