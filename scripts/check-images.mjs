import fs from 'node:fs'
import path from 'node:path'

const PUBLIC_DIR = path.resolve('public')
const DATA_DIR = path.resolve('src/data')

const BUDGET_480_KB = 40
const BUDGET_1280_KB = 150

function findImagePathsInObject(obj, paths = []) {
  if (!obj) return paths
  if (typeof obj === 'string') {
    if (obj.startsWith('/images/') || /\.(webp|jpg|jpeg|png|svg)$/i.test(obj)) {
      paths.push(obj)
    }
  } else if (Array.isArray(obj)) {
    for (const item of obj) {
      findImagePathsInObject(item, paths)
    }
  } else if (typeof obj === 'object') {
    for (const value of Object.values(obj)) {
      findImagePathsInObject(value, paths)
    }
  }
  return paths
}

async function checkImages() {
  const errors = []
  console.log('[CHECK:IMAGES] Validating images...')

  if (!fs.existsSync(DATA_DIR)) {
    console.log('[CHECK:IMAGES] src/data directory not present yet. Skipping check.')
    return
  }

  const jsonFiles = fs.readdirSync(DATA_DIR).filter((file) => file.endsWith('.json'))
  const imagePaths = new Set()

  for (const file of jsonFiles) {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf-8'))
      const extracted = findImagePathsInObject(content)
      extracted.forEach((p) => imagePaths.add(p))
    } catch (err) {
      errors.push(`Failed to parse JSON file: ${file} - ${err.message}`)
    }
  }

  if (imagePaths.size === 0) {
    console.log('[CHECK:IMAGES] No images defined in JSON data yet. All clear.')
    return
  }

  for (const imgPath of imagePaths) {
    // 1. Logos & icons (exempt from content 3-variant WebP rule as per PRD §12.1)
    if (imgPath.startsWith('/images/logos/') || imgPath.endsWith('.svg') || imgPath.endsWith('.ico')) {
      const fullPath = path.join(PUBLIC_DIR, imgPath)
      if (!fs.existsSync(fullPath)) {
        errors.push(`Logo or icon file does not exist: ${imgPath}`)
      }
      continue
    }

    // 2. Must be .webp for content images
    if (!imgPath.endsWith('.webp')) {
      errors.push(`Image path '${imgPath}' must be .webp format as per PRD §12.1`)
      continue
    }

    const fullPath = path.join(PUBLIC_DIR, imgPath)
    if (!fs.existsSync(fullPath)) {
      errors.push(`Main image file does not exist: ${imgPath}`)
      continue
    }

    const mainStat = fs.statSync(fullPath)
    const mainKb = mainStat.size / 1024
    if (mainKb > BUDGET_1280_KB) {
      errors.push(`Image '${imgPath}' exceeds budget (${Math.round(mainKb)} KB > ${BUDGET_1280_KB} KB)`)
    }

    // Check variants: -768 and -480
    const ext = path.extname(imgPath)
    const base = imgPath.slice(0, -ext.length)
    const var768 = `${base}-768${ext}`
    const var480 = `${base}-480${ext}`

    const full768 = path.join(PUBLIC_DIR, var768)
    const full480 = path.join(PUBLIC_DIR, var480)

    if (!fs.existsSync(full768)) {
      errors.push(`Missing 768px variant for '${imgPath}': expected '${var768}'`)
    }
    if (!fs.existsSync(full480)) {
      errors.push(`Missing 480px variant for '${imgPath}': expected '${var480}'`)
    } else {
      const stat480 = fs.statSync(full480)
      const kb480 = stat480.size / 1024
      if (kb480 > BUDGET_480_KB) {
        errors.push(`480px variant '${var480}' exceeds budget (${Math.round(kb480)} KB > ${BUDGET_480_KB} KB)`)
      }
    }
  }

  if (errors.length > 0) {
    console.error(`[CHECK:IMAGES] FAILED with ${errors.length} error(s):`)
    errors.forEach((err) => console.error(`  - ${err}`))
    process.exit(1)
  }

  console.log(`[CHECK:IMAGES] Passed. Verified ${imagePaths.size} image(s).`)
}

checkImages().catch((err) => {
  console.error('[CHECK:IMAGES] Unexpected error:', err)
  process.exit(1)
})
