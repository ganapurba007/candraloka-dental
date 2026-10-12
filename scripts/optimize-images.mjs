import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SRC_DIR = path.resolve('src-images')
const OUT_DIR = path.resolve('public/images')

const SIZES = [
  { suffix: '', width: 1280 },
  { suffix: '-768', width: 768 },
  { suffix: '-480', width: 480 },
]

async function getFiles(dir) {
  if (!fs.existsSync(dir)) return []
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name)
      return dirent.isDirectory() ? getFiles(res) : res
    })
  )
  return files.flat()
}

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    return
  }

  const relativePath = path.relative(SRC_DIR, filePath)
  const dirName = path.dirname(relativePath)
  const baseName = path.basename(filePath, ext)

  const targetDir = path.join(OUT_DIR, dirName)
  await fs.promises.mkdir(targetDir, { recursive: true })

  const metadata = await sharp(filePath).metadata()
  const origWidth = metadata.width || 1280

  for (const size of SIZES) {
    const targetWidth = Math.min(size.width, origWidth)
    const outFilename = `${baseName}${size.suffix}.webp`
    const outPath = path.join(targetDir, outFilename)

    await sharp(filePath)
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(outPath)

    const stats = await fs.promises.stat(outPath)
    console.log(`[OPTIMIZE] Created ${path.relative(process.cwd(), outPath)} (${Math.round(stats.size / 1024)} KB)`)
  }
}

async function main() {
  console.log(`Scanning ${SRC_DIR} for source images...`)
  const files = await getFiles(SRC_DIR)
  if (files.length === 0) {
    console.log('No images found in src-images/.')
    return
  }

  for (const file of files) {
    try {
      await processImage(file)
    } catch (err) {
      console.error(`Error processing ${file}:`, err)
    }
  }
  console.log('Image optimization complete.')
}

main().catch((err) => {
  console.error('Fatal error optimizing images:', err)
  process.exit(1)
})
