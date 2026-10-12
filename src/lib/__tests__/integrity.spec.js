import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import clinicData from '@/data/clinic.json'
import servicesData from '@/data/services.json'
import doctorsData from '@/data/doctors.json'
import testimonialsData from '@/data/testimonials.json'
import homeData from '@/data/home.json'
import { timeToMinutes } from '../time'

describe('Data Integrity (PRD §8.3)', () => {
  const serviceIds = new Set(servicesData.map((s) => s.id))
  const slotMinutes = clinicData.reservation.slotMinutes

  it('all doctor serviceIds exist in services.json', () => {
    for (const doc of doctorsData) {
      expect(doc.serviceIds.length).toBeGreaterThan(0)
      for (const sId of doc.serviceIds) {
        expect(serviceIds.has(sId)).toBe(true)
      }
    }
  })

  it('service slugs and doctor slugs are strictly unique', () => {
    const serviceSlugs = servicesData.map((s) => s.slug)
    expect(new Set(serviceSlugs).size).toBe(serviceSlugs.length)

    const doctorSlugs = doctorsData.map((d) => d.slug)
    expect(new Set(doctorSlugs).size).toBe(doctorSlugs.length)
  })

  it('service durationMinutes is a multiple of slotMinutes', () => {
    for (const service of servicesData) {
      expect(service.durationMinutes % slotMinutes).toBe(0)
    }
  })

  it('doctor practice sessions do not overlap on the same day', () => {
    for (const doc of doctorsData) {
      const byDay = new Map()
      for (const session of doc.practiceHours) {
        if (!byDay.has(session.day)) byDay.set(session.day, [])
        byDay.get(session.day).push(session)
      }

      for (const sessions of byDay.values()) {
        for (let i = 0; i < sessions.length; i++) {
          for (let j = i + 1; j < sessions.length; j++) {
            const startA = timeToMinutes(sessions[i].start)
            const endA = timeToMinutes(sessions[i].end)
            const startB = timeToMinutes(sessions[j].start)
            const endB = timeToMinutes(sessions[j].end)

            // Must not overlap
            const overlap = startA < endB && endA > startB
            expect(overlap).toBe(false)
          }
        }
      }
    }
  })

  it('all image paths in JSON files are .webp and exist on disk', () => {
    const allObjects = [clinicData, servicesData, doctorsData, testimonialsData, homeData]
    const imagePaths = []

    function extractImages(obj) {
      if (!obj) return
      if (typeof obj === 'string') {
        if (obj.startsWith('/images/')) imagePaths.push(obj)
      } else if (Array.isArray(obj)) {
        obj.forEach(extractImages)
      } else if (typeof obj === 'object') {
        Object.values(obj).forEach(extractImages)
      }
    }

    allObjects.forEach(extractImages)

    expect(imagePaths.length).toBeGreaterThan(0)

    for (const imgPath of imagePaths) {
      expect(imgPath.endsWith('.webp')).toBe(true)
      const fullPath = path.resolve('public', imgPath.replace(/^\//, ''))
      expect(fs.existsSync(fullPath)).toBe(true)
    }
  })
})
