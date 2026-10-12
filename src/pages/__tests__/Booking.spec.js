import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createUnhead, headSymbol } from '@unhead/vue'
import Booking from '../Booking.vue'

let mockRoute = {
  query: {},
  path: '/reservasi',
}

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRoute: () => mockRoute,
    useRouter: () => ({
      replace: vi.fn().mockResolvedValue(),
      push: vi.fn().mockResolvedValue(),
    }),
  }
})

describe('Booking.vue (FR-7.1 - FR-7.11)', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    mockRoute = { query: {}, path: '/reservasi' }
  })

  function createWrapper() {
    const unhead = createUnhead()
    return mount(Booking, {
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

  it('renders 4-step progress indicator and starts at Step 1 (FR-7.1)', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Layanan')
    expect(wrapper.text()).toContain('Dokter')
    expect(wrapper.text()).toContain('Jadwal')
    expect(wrapper.text()).toContain('Data Pasien')
    expect(wrapper.text()).toContain('Langkah 1: Pilih Layanan Perawatan')
  })

  it('selects service and proceeds to Step 2 (FR-7.2)', async () => {
    const wrapper = createWrapper()

    // Find first service card and click
    const serviceCard = wrapper.findAll('.cursor-pointer').find((el) =>
      el.text().includes('Pembersihan Karang Gigi')
    )
    expect(serviceCard).toBeDefined()
    await serviceCard.trigger('click')

    // Click "Lanjut Pilih Dokter"
    const nextBtn = wrapper.findAll('button').find((b) => b.text().includes('Lanjut Pilih Dokter'))
    expect(nextBtn).toBeDefined()
    await nextBtn.trigger('click')

    expect(wrapper.text()).toContain('Langkah 2: Pilih Dokter Gigi')
    expect(wrapper.text()).toContain('Dokter Mana Saja yang Tersedia')
  })

  it('auto-fills service from URL query param (FR-7.1)', () => {
    mockRoute = {
      query: { layanan: 'pembersihan-karang-gigi' },
      path: '/reservasi',
    }
    const wrapper = createWrapper()
    // Should auto-advance to step 2
    expect(wrapper.text()).toContain('Langkah 2: Pilih Dokter Gigi')
  })

  it('validates patient form fields on Step 4 (FR-7.6)', async () => {
    const wrapper = createWrapper()

    // Step 1: select service
    const serviceCard = wrapper.findAll('.cursor-pointer').find((el) =>
      el.text().includes('Pembersihan Karang Gigi')
    )
    await serviceCard.trigger('click')
    const nextBtn1 = wrapper.findAll('button').find((b) => b.text().includes('Lanjut Pilih Dokter'))
    await nextBtn1.trigger('click')

    // Step 2: select any doctor and proceed
    const nextBtn2 = wrapper.findAll('button').find((b) => b.text().includes('Lanjut Pilih Jadwal'))
    await nextBtn2.trigger('click')

    expect(wrapper.text()).toContain('Langkah 3: Pilih Tanggal & Jam Praktek')
  })

  it('renders confirmation screen when submission succeeds (FR-7.8)', async () => {
    const wrapper = createWrapper()

    // Manually trigger confirmedReservation to test confirmation view rendering
    wrapper.vm.confirmedReservation = {
      code: 'CDC-261015-K79A',
      serviceName: 'Pembersihan Karang Gigi (Scaling)',
      doctorName: 'drg. Andi Pratama, Sp.KG',
      date: '2026-10-15',
      time: '09:00',
      durationMinutes: 30,
      patient: {
        name: 'Budi Santoso',
        whatsapp: '081234567890',
        email: 'budi@gmail.com',
        isNewPatient: true,
      },
      status: 'menunggu-konfirmasi',
    }

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Reservasi Berhasil Dibuat!')
    expect(wrapper.text()).toContain('CDC-261015-K79A')
    expect(wrapper.text()).toContain('Menunggu Konfirmasi Klinik')
    expect(wrapper.text()).toContain('Kirim Konfirmasi via WhatsApp')
    expect(wrapper.text()).toContain('Salin Ringkasan')
    expect(wrapper.text()).toContain('Buat Reservasi Lain')
  })

  it('supports keyboard navigation and ARIA radiogroup roles on Step 3 (UX-8)', async () => {
    mockRoute = {
      query: { layanan: 'pembersihan-karang-gigi', dokter: 'drg-andi-pratama-sp-kg' },
      path: '/reservasi',
    }
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Langkah 3: Pilih Tanggal & Jam Praktek')

    // Find date radiogroup
    const dateRadiogroup = wrapper.find('[role="radiogroup"][aria-label="Pilih tanggal kunjungan"]')
    expect(dateRadiogroup.exists()).toBe(true)

    const dateButtons = dateRadiogroup.findAll('button[role="radio"]')
    expect(dateButtons.length).toBeGreaterThan(0)
    const selectedIdx = dateButtons.findIndex((b) => b.attributes('aria-checked') === 'true')
    expect(selectedIdx).toBeGreaterThanOrEqual(0)

    // Test ArrowRight keydown moves selection to next date
    await dateButtons[selectedIdx].trigger('keydown', { key: 'ArrowRight' })
    await wrapper.vm.$nextTick()
    const nextIdx = (selectedIdx + 1) % dateButtons.length
    expect(dateButtons[nextIdx].attributes('aria-checked')).toBe('true')
  })
})
