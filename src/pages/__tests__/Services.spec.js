import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createUnhead, headSymbol } from '@unhead/vue'
import Services from '../Services.vue'

describe('Services.vue (FR-4.1, FR-4.4)', () => {
  function createWrapper() {
    const unhead = createUnhead()
    return mount(Services, {
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

  it('renders page header, category filter chips, and search input', () => {
    const wrapper = createWrapper()
    expect(wrapper.text()).toContain('Layanan Perawatan Gigi')
    expect(wrapper.text()).toContain('Semua')
    expect(wrapper.text()).toContain('Umum')
    expect(wrapper.text()).toContain('Estetika')
    expect(wrapper.find('input[type="search"]').exists()).toBe(true)
  })

  it('filters services reactively based on search input', async () => {
    const wrapper = createWrapper()
    const input = wrapper.find('input[type="search"]')

    await input.setValue('scaling')
    expect(wrapper.text()).toContain('Pembersihan Karang Gigi (Scaling)')
    expect(wrapper.text()).not.toContain('Perawatan Behel (Ortodonti)')

    // Clear input
    await input.setValue('')
    expect(wrapper.text()).toContain('Perawatan Behel (Ortodonti)')
  })

  it('filters services based on category chip', async () => {
    const wrapper = createWrapper()
    const buttons = wrapper.findAll('button')
    const ortoBtn = buttons.find((b) => b.text().includes('Ortodonti'))
    expect(ortoBtn).toBeDefined()

    await ortoBtn.trigger('click')
    expect(wrapper.text()).toContain('Perawatan Behel (Ortodonti)')
    expect(wrapper.text()).not.toContain('Pembersihan Karang Gigi (Scaling)')
  })

  it('shows friendly empty state when no services match query', async () => {
    const wrapper = createWrapper()
    const input = wrapper.find('input[type="search"]')
    await input.setValue('layanan-yang-tidak-ada-xyz')

    expect(wrapper.text()).toContain('Tidak ada layanan ditemukan')
  })
})
