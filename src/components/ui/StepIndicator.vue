<script setup>
import { Check } from 'lucide-vue-next'

const props = defineProps({
  steps: {
    type: Array,
    required: true,
    // [{ number: 1, title: 'Layanan' }, ...]
  },
  currentStep: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <nav aria-label="Tahapan Reservasi" class="w-full">
    <ol class="flex items-center justify-between gap-2 sm:gap-4">
      <li
        v-for="(step, index) in steps"
        :key="step.number"
        class="flex-1 flex items-center"
      >
        <div class="flex items-center gap-2 sm:gap-3 flex-1">
          <!-- Step circle -->
          <div
            :class="[
              'w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-200 flex-shrink-0',
              step.number < currentStep
                ? 'bg-primary-600 text-white'
                : step.number === currentStep
                ? 'bg-primary-600 text-white ring-4 ring-primary-100 shadow-sm'
                : 'bg-slate-100 text-slate-500 border border-slate-200',
            ]"
            :aria-current="step.number === currentStep ? 'step' : undefined"
          >
            <Check v-if="step.number < currentStep" class="w-4 h-4 stroke-[3]" />
            <span v-else>{{ step.number }}</span>
          </div>

          <!-- Step label (hidden on small mobile, visible on sm) -->
          <div class="hidden sm:block min-w-0">
            <p
              :class="[
                'text-xs font-semibold uppercase tracking-wider',
                step.number === currentStep
                  ? 'text-primary-700'
                  : step.number < currentStep
                  ? 'text-slate-800'
                  : 'text-slate-400',
              ]"
            >
              Langkah {{ step.number }}
            </p>
            <p
              :class="[
                'text-xs sm:text-sm font-medium truncate',
                step.number === currentStep
                  ? 'text-slate-900 font-semibold'
                  : step.number < currentStep
                  ? 'text-slate-600'
                  : 'text-slate-400',
              ]"
            >
              {{ step.title }}
            </p>
          </div>
        </div>

        <!-- Divider line -->
        <div
          v-if="index < steps.length - 1"
          :class="[
            'h-0.5 flex-1 mx-2 sm:mx-3 transition-colors duration-200',
            step.number < currentStep ? 'bg-primary-500' : 'bg-slate-200',
          ]"
          aria-hidden="true"
        />
      </li>
    </ol>
  </nav>
</template>
