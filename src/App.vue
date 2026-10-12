<script setup>
import { RouterView } from 'vue-router'
import TopBar from '@/components/layout/TopBar.vue'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import FloatingWhatsapp from '@/components/layout/FloatingWhatsapp.vue'
import ScrollToTop from '@/components/layout/ScrollToTop.vue'
import Toast from '@/components/ui/Toast.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface-50 text-slate-800 antialiased font-sans">
    <!-- Global Header -->
    <TopBar />
    <Navbar />

    <!-- Main Dynamic Content -->
    <div class="flex-1 flex flex-col">
      <RouterView />
    </div>

    <!-- Global Footer -->
    <Footer />

    <!-- Floating Global Controls -->
    <ScrollToTop />
    <FloatingWhatsapp />
    <Toast />
  </div>
</template>
