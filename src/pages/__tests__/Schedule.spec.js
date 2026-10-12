import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createUnhead, headSymbol } from '@unhead/vue'
import Schedule from '../Schedule.vue'

let mockQuery = {}

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRoute: () => ({
      query: mockQuery,
      path: '/jadwal',
    }),
    useRouter: () => ({
      replace: vi.fn().mockResolvedValue(),
    }),
  }
})

describe('Schedule.vue (FR-6.1 - FR-6.6)', () => {
  function createWrapper() {
    const unhead = createUnhead()
    return mount(Schedule, {
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

  it('renders header, operational hours, and WIB timezone label (FR-6.6)', () => {
    mockQuery = {}
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('Jadwal Praktek Dokter Mingguan')
    expect(wrapper.text()).toContain('WIB')
    expect(wrapper.text()).toContain('Senin–Jumat 09:00–20:00')
  })

  it('renders weekly table with doctors and days columns (FR-6.1)', () => {
    mockQuery = {}
    const wrapper = createWrapper()

    // Doctor rows
    expect(wrapper.text()).toContain('drg. Andi Pratama, Sp.KG')
    expect(wrapper.text()).toContain('drg. Farhan Maulana, Sp.Ort')

    // Days
    expect(wrapper.text()).toContain('Senin')
    expect(wrapper.text()).toContain('Selasa')
    expect(wrapper.text()).toContain('Rabu')
    expect(wrapper.text()).toContain('Kamis')
    expect(wrapper.text()).toContain('Jumat')
    expect(wrapper.text()).toContain('Sabtu')
    expect(wrapper.text()).toContain('Minggu')

    // Today marker (FR-6.3)
    expect(wrapper.text()).toContain('Hari Ini')
  })

  it('displays doctor leave notices (FR-6.4)', () => {
    mockQuery = {}
    const wrapper = createWrapper()

    // Dr. Andi has leave on 25 Oktober
    expect(wrapper.text()).toContain('Cuti:')
  })

  it('renders reservation button per doctor (FR-6.5)', () => {
    mockQuery = {}
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('Reservasi')
  })

  it('filters doctors when doctor selector is changed (FR-6.2)', async () => {
    mockQuery = {}
    const wrapper = createWrapper()

    const select = wrapper.find('#doctor-filter')
    expect(select.exists()).toBe(true)

    // Select Dr. Andi Pratama
    await select.setValue('drg-andi-pratama-sp-kg')
    const tbody = wrapper.find('tbody')
    expect(tbody.text()).toContain('drg. Andi Pratama, Sp.KG')
    expect(tbody.text()).not.toContain('drg. Farhan Maulana, Sp.Ort')
  })
})
