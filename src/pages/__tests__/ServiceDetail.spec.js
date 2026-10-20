import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createUnhead, headSymbol } from '@unhead/vue'
import ServiceDetail from '../ServiceDetail.vue'

let mockRouteParams = { slug: 'pembersihan-karang-gigi' }

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRoute: () => ({
      params: mockRouteParams,
      path: `/layanan/${mockRouteParams.slug}`,
    }),
  }
})

describe('ServiceDetail.vue (FR-4.2, FR-4.3, FR-4.4, FR-4.5)', () => {
  function createWrapper() {
    const unhead = createUnhead()
    return mount(ServiceDetail, {
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

  it('renders complete service details when valid slug is provided', () => {
    mockRouteParams = { slug: 'pembersihan-karang-gigi' }
    const wrapper = createWrapper()

    // Title and category
    expect(wrapper.text()).toContain('Pembersihan Karang Gigi (Scaling)')
    expect(wrapper.text()).toContain('Umum')

    // Sections
    expect(wrapper.text()).toContain('Tentang Perawatan')
    expect(wrapper.text()).toContain('Kapan Layanan Ini Dibutuhkan?')
    expect(wrapper.text()).toContain('Tahapan Prosedur Perawatan')
    expect(wrapper.text()).toContain('Persiapan Sebelum Berkunjung')

    // Assigned doctors (FR-4.2)
    expect(wrapper.text()).toContain('Dokter yang Menangani')
    expect(wrapper.text()).toContain('Dr. Andi Pratama')

    // Related services (FR-4.2)
    expect(wrapper.text()).toContain('Layanan Terkait')

    // FR-4.3 Reservation CTAs
    expect(wrapper.text()).toContain('Reservasi Layanan Ini')

    // FR-4.4 Price disclaimer
    expect(wrapper.text()).toContain('Informasi Biaya Tindakan')
    expect(wrapper.text()).toContain('Rincian biaya disampaikan dokter setelah pemeriksaan fisik')
  })

  it('renders 404 NotFound component when slug does not exist (FR-4.5)', () => {
    mockRouteParams = { slug: 'layanan-fiktif-tidak-ada' }
    const wrapper = createWrapper()

    // NotFound component
    expect(wrapper.text()).toContain('Halaman Tidak Ditemukan')
    expect(wrapper.text()).toContain('Kembali ke Beranda')
  })
})
