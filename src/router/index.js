import { createRouter, createWebHistory } from 'vue-router'
import { useClinic } from '@/composables/useClinic'
import { useI18n } from '@/composables/useI18n'

const basePageRoutes = [
  { path: '', nameSuffix: 'home', component: () => import('@/pages/Home.vue') },
  { path: 'tentang', nameSuffix: 'about', component: () => import('@/pages/About.vue') },
  { path: 'layanan', nameSuffix: 'services', component: () => import('@/pages/Services.vue') },
  { path: 'layanan/:slug', nameSuffix: 'service-detail', component: () => import('@/pages/ServiceDetail.vue') },
  { path: 'dokter', nameSuffix: 'doctors', component: () => import('@/pages/Doctors.vue') },
  { path: 'dokter/:slug', nameSuffix: 'doctor-detail', component: () => import('@/pages/DoctorDetail.vue') },
  { path: 'jadwal', nameSuffix: 'schedule', component: () => import('@/pages/Schedule.vue') },
  { path: 'reservasi', nameSuffix: 'booking', component: () => import('@/pages/Booking.vue') },
  { path: 'kontak', nameSuffix: 'contact', component: () => import('@/pages/Contact.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    // 1. Standard Root Routes (Default Candraloka)
    ...basePageRoutes.map((r) => ({
      path: r.path ? `/${r.path}` : '/',
      name: r.nameSuffix,
      component: r.component,
    })),

    // 2. Subpath Repo Prefix (e.g. /candraloka-dental/:clinicSlug/...)
    ...basePageRoutes.map((r) => ({
      path: r.path ? `/candraloka-dental/:clinicSlug/${r.path}` : '/candraloka-dental/:clinicSlug',
      name: `repo-clinic-${r.nameSuffix}`,
      component: r.component,
    })),

    // 3. Dynamic Client Mockup Routes (e.g. /:clinicSlug/...)
    ...basePageRoutes.map((r) => ({
      path: r.path ? `/:clinicSlug/${r.path}` : '/:clinicSlug',
      name: `clinic-${r.nameSuffix}`,
      component: r.component,
    })),

    // 4. Catch-all 404 Route
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFound.vue'),
    },
  ],
})

// Navigation Guard: Synchronize active clinic state on route navigation
router.beforeEach((to, from, next) => {
  const { setClinic } = useClinic()
  const { setLocale } = useI18n()

  // 1. Language query override (?lang=en or ?lang=id)
  if (to.query.lang && typeof to.query.lang === 'string') {
    const targetLang = to.query.lang.trim().toLowerCase()
    if (['id', 'en'].includes(targetLang)) {
      setLocale(targetLang, true)
    }
  }

  // 2. Extract clinic slug from route param
  let slug = to.params.clinicSlug

  // 3. Fallback to query param (?client=... or ?mockup=... or ?clinic=...)
  if (!slug && (to.query.client || to.query.mockup || to.query.clinic)) {
    slug = to.query.client || to.query.mockup || to.query.clinic
  }

  if (slug) {
    setClinic(slug)
  } else {
    setClinic('candraloka')
  }

  next()
})

export default router
