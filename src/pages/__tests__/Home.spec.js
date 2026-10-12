import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createUnhead, headSymbol } from '@unhead/vue'
import Home from '../Home.vue'

describe('Home.vue (FR-2.x)', () => {
  it('renders all main sections of the landing page', () => {
    const unhead = createUnhead()
    const wrapper = mount(Home, {
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

    // FR-2.1 Hero headline
    expect(wrapper.text()).toContain('Senyum Sehat dan Percaya Diri')

    // FR-2.2 Quick info
    expect(wrapper.text()).toContain('Praktek Hari Ini')
    expect(wrapper.text()).toContain('Kontak Cepat')

    // FR-2.3 About Brief & Stats
    expect(wrapper.text()).toContain('Tahun Melayani')
    expect(wrapper.text()).toContain('Pasien Terlayani')

    // FR-2.4 Featured Services
    expect(wrapper.text()).toContain('Layanan Unggulan Kami')
    expect(wrapper.text()).toContain('Pembersihan Karang Gigi')

    // FR-2.5 Reservation Steps
    expect(wrapper.text()).toContain('Reservasi Online dalam 4 Langkah')

    // FR-2.6 Featured Doctors
    expect(wrapper.text()).toContain('Dokter Gigi Unggulan')
    expect(wrapper.text()).toContain('drg. Andi Pratama')

    // FR-2.7 Testimonials
    expect(wrapper.text()).toContain('Apa Kata Mereka Tentang Kami')
  })
})
