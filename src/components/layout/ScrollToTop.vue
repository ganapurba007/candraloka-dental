<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const isVisible = ref(false)

function checkScroll() {
  isVisible.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 translate-y-3"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-3"
  >
    <button
      v-if="isVisible"
      type="button"
      @click="scrollToTop"
      aria-label="Kembali ke atas halaman"
      class="fixed bottom-20 right-4 sm:bottom-20 sm:right-6 z-30 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-primary-700 shadow-md border border-slate-200/80 backdrop-blur-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 hover:-translate-y-0.5 active:translate-y-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
    >
      <ArrowUp class="w-5 h-5" aria-hidden="true" />
    </button>
  </Transition>
</template>
