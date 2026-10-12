import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from '../Badge.vue'

describe('Badge.vue', () => {
  it('renders default neutral badge with text', () => {
    const wrapper = mount(Badge, {
      slots: {
        default: 'Pemeriksaan',
      },
    })

    expect(wrapper.text()).toContain('Pemeriksaan')
    expect(wrapper.classes()).toContain('bg-slate-100')
  })

  it('renders success variant with dot', () => {
    const wrapper = mount(Badge, {
      props: {
        variant: 'success',
        dot: true,
      },
      slots: {
        default: 'Tersedia',
      },
    })

    expect(wrapper.text()).toContain('Tersedia')
    expect(wrapper.classes()).toContain('bg-emerald-50')
    expect(wrapper.find('span.rounded-full').classes()).toContain('bg-emerald-500')
  })
})
