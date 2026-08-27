/* A hand-drawn modak. Pure SVG, so it stays crisp at any size and adds
   nothing to the page weight. `variant` matches a product's `theme`.      */

const PALETTES = {
  cocoa: { light: '#8A5136', mid: '#4A251A', dark: '#2C1410', pleat: '#1B0C08', gloss: '#E8952A' },
  leaf: { light: '#A8D46E', mid: '#6E9A45', dark: '#2E4A2A', pleat: '#1C3319', gloss: '#EFFFD6' },
  ivory: { light: '#FFFDF6', mid: '#F6EAD1', dark: '#DCC49A', pleat: '#C2A374', gloss: '#FFFFFF' },
}

const BODY =
  'M50 6 C51.5 16 53.5 23 57.5 31 C64 44 82 56 82 74 C82 90 68 100 50 100 C32 100 18 90 18 74 C18 56 36 44 42.5 31 C46.5 23 48.5 16 50 6 Z'

const TIP = 'M50 1 C52.4 8 53.4 12.5 52.8 16.5 C51.7 20 48.3 20 47.2 16.5 C46.6 12.5 47.6 8 50 1 Z'

const PLEATS = [
  'M50 22 C50 48 50 72 50 99',
  'M45.5 27 C39 50 33 73 31.5 93',
  'M40 35 C31 55 23.5 71 21.5 84',
  'M54.5 27 C61 50 67 73 68.5 93',
  'M60 35 C69 55 76.5 71 78.5 84',
]

export default function ModakSvg({ variant = 'ivory', className = '', title, ...rest }) {
  const c = PALETTES[variant] ?? PALETTES.ivory
  const gid = `modak-grad-${variant}`

  return (
    <svg
      viewBox="0 0 100 108"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : 'true'}
      {...rest}
    >
      <defs>
        <linearGradient id={gid} x1="18%" y1="4%" x2="88%" y2="96%">
          <stop offset="0%" stopColor={c.light} />
          <stop offset="52%" stopColor={c.mid} />
          <stop offset="100%" stopColor={c.dark} />
        </linearGradient>
      </defs>

      {/* contact shadow on the plate */}
      <ellipse cx="50" cy="101.5" rx="29" ry="5.5" fill="#2B1A12" opacity="0.22" />

      <path d={BODY} fill={`url(#${gid})`} />

      {PLEATS.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={c.pleat}
          strokeWidth={i === 0 ? 1.5 : 1.3}
          strokeLinecap="round"
          opacity="0.4"
        />
      ))}

      {/* glossy highlight so it reads as a sweet, not a cone */}
      <ellipse
        cx="37"
        cy="63"
        rx="8"
        ry="15"
        fill={c.gloss}
        opacity="0.16"
        transform="rotate(-16 37 63)"
      />

      <path d={TIP} fill={c.light} />
      <path d={TIP} fill={c.pleat} opacity="0.18" />
    </svg>
  )
}
