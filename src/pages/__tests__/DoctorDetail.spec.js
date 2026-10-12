import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createUnhead, headSymbol } from '@unhead/vue'
import DoctorDetail from '../DoctorDetail.vue'

let mockRouteParams = { slug: 'drg-andi-pratama-sp-kg' }

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRoute: () => ({
      params: mockRouteParams,
      path: `/dokter/${mockRouteParams.slug}`,
    }),
  }
})

describe('DoctorDetail.vue (FR-5.2, FR-5.3, FR-5.4)', () => {
  function createWrapper() {
    const unhead = createUnhead()
    return mount(DoctorDetail, {
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
  }

  it('renders complete doctor profile details when valid slug is provided', () => {
    mockRouteParams = { slug: 'drg-andi-pratama-sp-kg' }
    const wrapper = createWrapper()

    // Doctor basic info
    expect(wrapper.text()).toContain('drg. Andi Pratama, Sp.KG')
    expect(wrapper.text()).toContain('Spesialis Konservasi Gigi')
    expect(wrapper.text()).toContain('9 Tahun Pengalaman')
    expect(wrapper.text()).toContain('Bahasa Indonesia')

    // Education & Interests
    expect(wrapper.text()).toContain('Riwayat Pendidikan & Gelar')
    expect(wrapper.text()).toContain('Universitas Indonesia')
    expect(wrapper.text()).toContain('Fokus & Minat Klinis')
    expect(wrapper.text()).toContain('Endodonti Modern')

    // Handled services
    expect(wrapper.text()).toContain('Layanan yang Ditangani')
    expect(wrapper.text()).toContain('Pembersihan Karang Gigi (Scaling)')

    // Weekly schedule & leave notice (Dr. Andi has leave on 2026-10-25)
    expect(wrapper.text()).toContain('Waktu Praktek di Klinik')
    expect(wrapper.text()).toContain('Pemberitahuan Cuti')

    // FR-5.3 Reservation button
    expect(wrapper.text()).toContain('Reservasi dengan Dokter Ini')
    expect(wrapper.text()).toContain('Buat Janji dengan Dokter Ini')
  })

  it('renders 404 NotFound component when slug does not exist (FR-5.4)', () => {
    mockRouteParams = { slug: 'dokter-tidak-ada-xyz' }
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('Halaman Tidak Ditemukan')
    expect(wrapper.text()).toContain('Kembali ke Beranda')
  })
})
