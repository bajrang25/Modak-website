/* ==========================================================================
   Turns the big camera PNGs in assets-src/ into small web images in
   public/img/. Runs automatically before every `npm run build`.

   HOW TO SWAP A PHOTO
     1. Drop the new file into assets-src/ using the SAME name
        (chocolate-modak.png, pan-modak.png, steam-modak.png, modaks.png)
     2. npm run images
   Anything already up to date is skipped, so re-running is cheap.

   Never put the originals in public/ — Vite copies that folder verbatim and
   the 2 MB files would ship to every customer's phone.
   ========================================================================== */

import sharp from 'sharp'
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(ROOT, 'assets-src')
const OUT = path.join(ROOT, 'public', 'img')

/* Square product shots are shown as circular medallions on the cards and as
   small thumbnails in the cart, so 400/800 covers 1x through 3x screens.
   The platter is the wide hero shot. */
const JOBS = [
  { src: 'chocolate-modak.png', name: 'chocolate', widths: [400, 800], fit: 'cover', ar: 1 },
  { src: 'pan-modak.png', name: 'paan', widths: [400, 800], fit: 'cover', ar: 1 },
  { src: 'steam-modak.png', name: 'classic', widths: [400, 800], fit: 'cover', ar: 1 },
  { src: 'modaks.png', name: 'platter', widths: [800, 1400], fit: 'cover', ar: 3 / 2 },
]

/* The link preview card on WhatsApp and Instagram. */
const OG = { src: 'modaks.png', out: 'og.jpg', width: 1200, height: 630 }

const kb = (n) => `${(n / 1024).toFixed(0)} KB`

async function newer(src, out) {
  if (!existsSync(out)) return true
  const [a, b] = await Promise.all([stat(src), stat(out)])
  return a.mtimeMs > b.mtimeMs
}

async function run() {
  if (!existsSync(SRC)) {
    console.log('[images] no assets-src/ folder — nothing to do')
    return
  }
  await mkdir(OUT, { recursive: true })

  let made = 0
  let skipped = 0
  let bytes = 0

  for (const job of JOBS) {
    const src = path.join(SRC, job.src)
    if (!existsSync(src)) {
      console.log(`[images] MISSING ${job.src} — skipping`)
      continue
    }

    for (const w of job.widths) {
      const h = Math.round(w / job.ar)

      for (const [ext, encode] of [
        ['webp', (p) => p.webp({ quality: 78, effort: 5 })],
        ['jpg', (p) => p.jpeg({ quality: 80, mozjpeg: true, progressive: true })],
      ]) {
        const out = path.join(OUT, `${job.name}-${w}.${ext}`)
        if (!(await newer(src, out))) {
          skipped++
          bytes += (await stat(out)).size
          continue
        }
        const buf = await encode(
          sharp(src).resize(w, h, { fit: job.fit, position: 'centre' }),
        ).toBuffer()
        await writeFile(out, buf)
        console.log(`[images] ${path.basename(out).padEnd(22)} ${kb(buf.length).padStart(8)}`)
        made++
        bytes += buf.length
      }
    }
  }

  /* Social preview */
  const ogSrc = path.join(SRC, OG.src)
  const ogOut = path.join(ROOT, 'public', OG.out)
  if (existsSync(ogSrc) && (await newer(ogSrc, ogOut))) {
    const buf = await sharp(ogSrc)
      .resize(OG.width, OG.height, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer()
    await writeFile(ogOut, buf)
    console.log(`[images] ${OG.out.padEnd(22)} ${kb(buf.length).padStart(8)}`)
    made++
    bytes += buf.length
  } else if (existsSync(ogOut)) {
    skipped++
  }

  const originals = (await readdir(SRC))
    .filter((f) => /\.(png|jpe?g)$/i.test(f))
    .map((f) => path.join(SRC, f))
  let before = 0
  for (const f of originals) before += (await stat(f)).size

  console.log(
    `[images] ${made} written, ${skipped} already current — ` +
      `${kb(before)} of originals → ${kb(bytes)} shipped`,
  )
}

run().catch((err) => {
  console.error('[images] failed:', err.message)
  process.exit(1)
})
