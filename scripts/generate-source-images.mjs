import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const services = [
  { name: 'scaling', label: 'Pembersihan Karang Gigi', color: '#0d9488' },
  { name: 'tambal', label: 'Penambalan Gigi Komposit', color: '#0284c7' },
  { name: 'cabut', label: 'Pencabutan Gigi', color: '#4f46e5' },
  { name: 'bleaching', label: 'Pemutihan Gigi', color: '#d97706' },
  { name: 'behel', label: 'Perawatan Behel', color: '#059669' },
  { name: 'psa', label: 'Perawatan Saluran Akar', color: '#e11d48' },
  { name: 'veneer', label: 'Veneer Gigi Estetik', color: '#7c3aed' },
  { name: 'anak', label: 'Perawatan Gigi Anak', color: '#0284c7' },
]

async function generate() {
  const dir = path.resolve('src-images/services')
  await fs.promises.mkdir(dir, { recursive: true })

  for (const s of services) {
    const svg = `
    <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${s.color}" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      <circle cx="1100" cy="150" r="280" fill="white" fill-opacity="0.05" />
      <circle cx="200" cy="600" r="350" fill="white" fill-opacity="0.03" />
      <text x="100" y="320" font-family="sans-serif" font-size="44" font-weight="bold" fill="white">${s.label}</text>
      <text x="100" y="380" font-family="sans-serif" font-size="24" fill="#cbd5e1">Candraloka Dental Care — Layanan Profesional</text>
    </svg>
    `

    const outPng = path.join(dir, `${s.name}.png`)
    await sharp(Buffer.from(svg)).png().toFile(outPng)
    console.log(`Generated src-images/services/${s.name}.png`)
  }
}

generate().catch(console.error)
