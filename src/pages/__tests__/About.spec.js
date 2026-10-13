import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createUnhead, headSymbol } from '@unhead/vue'
import About from '../About.vue'

describe('About.vue (FR-3.x)', () => {
  it('renders all main sections of the about page correctly', () => {
    const unhead = createUnhead()
    const wrapper = mount(About, {
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

    // FR-3.1 Header with Title & CTAs
    expect(wrapper.text()).toContain('Tentang Candraloka Dental Care')
    expect(wrapper.text()).toContain('Lihat Dokter')
    expect(wrapper.text()).toContain('Layanan Kami')

    // FR-3.2 Story, Vision & Mission
    expect(wrapper.text()).toContain('Cerita & Filosofi Kami')
    expect(wrapper.text()).toContain('Visi Kami')
    expect(wrapper.text()).toContain('Misi Utama')

    // FR-3.3 Values
    expect(wrapper.text()).toContain('Nilai Layanan Kami')
    expect(wrapper.text()).toContain('Pelayanan Empatis')
    expect(wrapper.text()).toContain('Standar Higienis')

    // FR-3.4 Facilities
    expect(wrapper.text()).toContain('Fasilitas Klinik Modern')
    expect(wrapper.text()).toContain('Ruang Perawatan Ergonomis')
    expect(wrapper.text()).toContain('Sterilisasi Alat Bertaraf Medis')

    // FR-3.5 Visit Steps
    expect(wrapper.text()).toContain('Alur Kunjungan Pasien')
    expect(wrapper.text()).toContain('Reservasi Online / WhatsApp')
    expect(wrapper.text()).toContain('Edukasi Pasca Tindakan')

    // FR-3.6 Doctors Team Callout
    expect(wrapper.text()).toContain('Tenaga Medis Berdedikasi')
    expect(wrapper.text()).toContain('Lihat Semua Dokter')
  })
})
