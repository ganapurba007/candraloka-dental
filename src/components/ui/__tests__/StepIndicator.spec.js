import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StepIndicator from '../StepIndicator.vue'

describe('StepIndicator.vue', () => {
  const steps = [
    { number: 1, title: 'Layanan' },
    { number: 2, title: 'Dokter' },
    { number: 3, title: 'Jadwal' },
    { number: 4, title: 'Konfirmasi' },
  ]

  it('renders all steps and marks the current step with aria-current="step"', () => {
    const wrapper = mount(StepIndicator, {
      props: {
        steps,
        currentStep: 2,
      },
    })

    const currentStepEl = wrapper.find('[aria-current="step"]')
    expect(currentStepEl.exists()).toBe(true)
    expect(currentStepEl.text()).toBe('2')
  })

  it('renders check icon on completed steps', () => {
    const wrapper = mount(StepIndicator, {
      props: {
        steps,
        currentStep: 3,
      },
    })

    // Step 1 and 2 are completed and should contain svg icon
    const listItems = wrapper.findAll('li')
    expect(listItems[0].find('svg').exists()).toBe(true)
    expect(listItems[1].find('svg').exists()).toBe(true)
  })
})
