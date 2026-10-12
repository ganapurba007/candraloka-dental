import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Accordion from '../Accordion.vue'

describe('Accordion.vue', () => {
  const sampleItems = [
    { id: '1', title: 'Apakah scaling sakit?', content: 'Scaling menggunakan getaran ultrasonik dan air dingin.' },
    { id: '2', title: 'Berapa lama tambal gigi?', content: 'Proses penambalan rata-rata sekitar 30 menit.' },
  ]

  it('renders all accordion items closed by default', () => {
    const wrapper = mount(Accordion, {
      props: {
        items: sampleItems,
      },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(2)
    expect(buttons[0].attributes('aria-expanded')).toBe('false')
  })

  it('toggles item open and closed upon click', async () => {
    const wrapper = mount(Accordion, {
      props: {
        items: sampleItems,
      },
    })

    const firstButton = wrapper.findAll('button')[0]
    await firstButton.trigger('click')

    expect(firstButton.attributes('aria-expanded')).toBe('true')
    expect(wrapper.text()).toContain('Scaling menggunakan getaran ultrasonik')

    await firstButton.trigger('click')
    expect(firstButton.attributes('aria-expanded')).toBe('false')
  })
})
