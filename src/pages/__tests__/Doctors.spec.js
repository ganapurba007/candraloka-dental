import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createUnhead, headSymbol } from '@unhead/vue'
import Doctors from '../Doctors.vue'

describe('Doctors.vue (FR-5.1)', () => {
  function createWrapper() {
    const unhead = createUnhead()
    return mount(Doctors, {
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

  it('renders header, specialty chips, and search input', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Tim Dokter Gigi Berpengalaman & Terpercaya')
    expect(wrapper.text()).toContain('Semua')
    expect(wrapper.text()).toContain('Spesialis Konservasi Gigi')
    expect(wrapper.text()).toContain('Spesialis Ortodonti')
    expect(wrapper.find('input[type="search"]').exists()).toBe(true)
  })

  it('filters doctors based on search input', async () => {
    const wrapper = createWrapper()
    const input = wrapper.find('input[type="search"]')

    await input.setValue('Andi')
    expect(wrapper.text()).toContain('drg. Andi Pratama')
    expect(wrapper.text()).not.toContain('drg. Farhan Maulana')

    // Clear input
    await input.setValue('')
    expect(wrapper.text()).toContain('drg. Farhan Maulana')
  })

  it('filters doctors based on specialty chip', async () => {
    const wrapper = createWrapper()
    const buttons = wrapper.findAll('button')
    const ortoBtn = buttons.find((b) => b.text().includes('Spesialis Ortodonti'))
    expect(ortoBtn).toBeDefined()

    await ortoBtn.trigger('click')
    expect(wrapper.text()).toContain('drg. Farhan Maulana')
    expect(wrapper.text()).not.toContain('drg. Nadia Safira')
  })

  it('shows empty state when no doctors match search query', async () => {
    const wrapper = createWrapper()
    const input = wrapper.find('input[type="search"]')
    await input.setValue('dokter-fiktif-xyz')

    expect(wrapper.text()).toContain('Dokter tidak ditemukan')
  })

  it('renders doctor card details including practice days summary and actions', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Tahun Pengalaman')
    expect(wrapper.text()).toContain('Hari praktek:')
    expect(wrapper.text()).toContain('Lihat Profil')
    expect(wrapper.text()).toContain('Reservasi')
  })
})
