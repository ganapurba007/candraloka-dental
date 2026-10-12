<script setup>
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    // item: { id, title, content }
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  defaultOpen: {
    type: [String, Number, Array],
    default: () => [],
  },
})

const openIds = ref(
  Array.isArray(props.defaultOpen)
    ? [...props.defaultOpen]
    : props.defaultOpen ? [props.defaultOpen] : []
)

function toggle(id) {
  if (props.multiple) {
    if (openIds.value.includes(id)) {
      openIds.value = openIds.value.filter((i) => i !== id)
    } else {
      openIds.value.push(id)
    }
  } else {
    if (openIds.value.includes(id)) {
      openIds.value = []
    } else {
      openIds.value = [id]
    }
  }
}

function isOpen(id) {
  return openIds.value.includes(id)
}
</script>

<template>
  <div class="divide-y divide-slate-100 rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm">
    <div
      v-for="(item, idx) in items"
      :key="item.id || idx"
      class="group transition-colors"
    >
      <button
        type="button"
        :aria-expanded="isOpen(item.id || idx)"
        :aria-controls="`accordion-panel-${item.id || idx}`"
        :id="`accordion-header-${item.id || idx}`"
        class="w-full py-4 px-5 flex items-center justify-between text-left text-sm sm:text-base font-semibold text-slate-800 hover:text-primary-700 transition-colors focus-visible:outline-none focus-visible:bg-slate-50 min-h-[48px]"
        @click="toggle(item.id || idx)"
      >
        <span>{{ item.title }}</span>
        <ChevronDown
          class="w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ml-4 group-hover:text-primary-600"
          :class="{ 'rotate-180 text-primary-600': isOpen(item.id || idx) }"
          aria-hidden="true"
        />
      </button>

      <div
        v-show="isOpen(item.id || idx)"
        :id="`accordion-panel-${item.id || idx}`"
        role="region"
        :aria-labelledby="`accordion-header-${item.id || idx}`"
        class="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed transition-all"
      >
        <slot :name="`content-${item.id || idx}`" :item="item">
          {{ item.content }}
        </slot>
      </div>
    </div>
  </div>
</template>
