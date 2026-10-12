import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/Home.vue'),
    },
    {
      path: '/tentang',
      name: 'about',
      component: () => import('@/pages/About.vue'),
    },
    {
      path: '/layanan',
      name: 'services',
      component: () => import('@/pages/Services.vue'),
    },
    {
      path: '/layanan/:slug',
      name: 'service-detail',
      component: () => import('@/pages/ServiceDetail.vue'),
    },
    {
      path: '/dokter',
      name: 'doctors',
      component: () => import('@/pages/Doctors.vue'),
    },
    {
      path: '/dokter/:slug',
      name: 'doctor-detail',
      component: () => import('@/pages/DoctorDetail.vue'),
    },
    {
      path: '/jadwal',
      name: 'schedule',
      component: () => import('@/pages/Schedule.vue'),
    },
    {
      path: '/reservasi',
      name: 'booking',
      component: () => import('@/pages/Booking.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFound.vue'),
    },
  ],
})

export default router
