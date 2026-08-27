/* Inline SVG icons — no icon library, nothing extra to download. */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const wrap = (children, extra = {}) => (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...extra} {...props}>
    {children}
  </svg>
)

export const IconLeaf = wrap(
  <>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" {...stroke} />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" {...stroke} />
  </>,
)

export const IconHeart = wrap(
  <path
    d="M19.5 12.6 12 20l-7.5-7.4A4.8 4.8 0 0 1 12 6.3a4.8 4.8 0 0 1 7.5 6.3Z"
    {...stroke}
  />,
)

export const IconSpark = wrap(
  <>
    <path d="M12 3v3M12 18v3M4.2 4.2 6.3 6.3M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8 6.3 17.7M17.7 6.3l2.1-2.1" {...stroke} />
    <circle cx="12" cy="12" r="3.2" {...stroke} />
  </>,
)

export const IconMortar = wrap(
  <>
    <path d="M4 10h16v1a8 8 0 0 1-8 8 8 8 0 0 1-8-8v-1Z" {...stroke} />
    <path d="M12 19v2M8 21h8M15 10 19 4" {...stroke} />
  </>,
)

export const IconHandHeart = wrap(
  <>
    <path d="M11.5 9.2 9 6.9a2 2 0 0 0-2.9 2.8l5.4 5.3 5.4-5.3A2 2 0 0 0 14 6.9l-2.5 2.3Z" {...stroke} />
    <path d="M3 14.5v5M3 16h4l4.5 2.5a2 2 0 0 0 2 0L21 15" {...stroke} />
  </>,
)

export const IconGift = wrap(
  <>
    <rect x="3" y="8.5" width="18" height="12.5" rx="1.6" {...stroke} />
    <path d="M3 13h18M12 8.5V21" {...stroke} />
    <path d="M12 8.5S10.8 3 8.4 3a2.2 2.2 0 0 0 0 5.5ZM12 8.5S13.2 3 15.6 3a2.2 2.2 0 0 1 0 5.5Z" {...stroke} />
  </>,
)

export const IconBox = wrap(
  <>
    <path d="M21 8.4v7.2a1.6 1.6 0 0 1-.85 1.42l-7.4 4a1.6 1.6 0 0 1-1.5 0l-7.4-4A1.6 1.6 0 0 1 3 15.6V8.4a1.6 1.6 0 0 1 .85-1.42l7.4-4a1.6 1.6 0 0 1 1.5 0l7.4 4A1.6 1.6 0 0 1 21 8.4Z" {...stroke} />
    <path d="m3.3 7.5 8.7 4.7 8.7-4.7M12 21v-8.8" {...stroke} />
  </>,
)

export const IconPin = wrap(
  <>
    <path d="M20 10.5c0 5.2-8 12-8 12s-8-6.8-8-12a8 8 0 0 1 16 0Z" {...stroke} />
    <circle cx="12" cy="10.3" r="2.9" {...stroke} />
  </>,
)

export const IconClock = wrap(
  <>
    <circle cx="12" cy="12" r="9" {...stroke} />
    <path d="M12 6.8V12l3.4 2.1" {...stroke} />
  </>,
)

export const IconCheck = wrap(<path d="m4.5 12.8 4.7 4.7L19.5 7.2" {...stroke} />)

export const IconArrow = wrap(<path d="M5 12h13m-5.5-5.5L18.5 12l-6 5.5" {...stroke} />)

export const IconCart = wrap(
  <>
    <path d="M2.5 3.5h2.6l2.2 11a1.7 1.7 0 0 0 1.7 1.4h8.1a1.7 1.7 0 0 0 1.7-1.3l1.6-7H6" {...stroke} />
    <circle cx="9.5" cy="20" r="1.4" {...stroke} />
    <circle cx="17.5" cy="20" r="1.4" {...stroke} />
  </>,
)

export const IconWhatsApp = wrap(
  <path
    fill="currentColor"
    d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.02a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.7.97.99-3.61-.24-.37a9.78 9.78 0 0 1-1.5-5.22 9.82 9.82 0 0 1 16.77-6.94 9.75 9.75 0 0 1 2.88 6.95 9.82 9.82 0 0 1-9.83 9.8M20.5 3.49A11.75 11.75 0 0 0 12.05 0C5.5 0 .18 5.32.17 11.86a11.8 11.8 0 0 0 1.58 5.92L.07 24l6.36-1.67a11.83 11.83 0 0 0 5.62 1.44h.01c6.53 0 11.86-5.32 11.86-11.86a11.8 11.8 0 0 0-3.42-8.42"
  />,
)

export const IconInstagram = wrap(
  <>
    <rect x="3" y="3" width="18" height="18" rx="5" {...stroke} />
    <circle cx="12" cy="12" r="4" {...stroke} />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
  </>,
)

export const IconPhone = wrap(
  <path
    d="M21 16.9v2.6a1.7 1.7 0 0 1-1.9 1.7 17 17 0 0 1-7.4-2.6 16.7 16.7 0 0 1-5.1-5.1A17 17 0 0 1 4 6.1 1.7 1.7 0 0 1 5.7 4.2h2.6a1.7 1.7 0 0 1 1.7 1.5c.1.8.3 1.6.6 2.4a1.7 1.7 0 0 1-.4 1.8l-1.1 1.1a13.6 13.6 0 0 0 5.1 5.1l1.1-1.1a1.7 1.7 0 0 1 1.8-.4c.8.3 1.6.5 2.4.6a1.7 1.7 0 0 1 1.5 1.7Z"
    {...stroke}
  />,
)

export const IconCrosshair = wrap(
  <>
    <circle cx="12" cy="12" r="7" {...stroke} />
    <circle cx="12" cy="12" r="2.4" {...stroke} />
    <path d="M12 1.8v3.4M12 18.8v3.4M1.8 12h3.4M18.8 12h3.4" {...stroke} />
  </>,
)

export const IconMap = wrap(
  <>
    <path d="M9.2 4.2 3.4 6.6v13.2l5.8-2.4 5.6 2.4 5.8-2.4V4.2l-5.8 2.4-5.6-2.4Z" {...stroke} />
    <path d="M9.2 4.2v13.2M14.8 6.6v13.2" {...stroke} />
  </>,
)

export const IconStore = wrap(
  <>
    <path d="M3.6 9.6h16.8V19a1.6 1.6 0 0 1-1.6 1.6H5.2A1.6 1.6 0 0 1 3.6 19V9.6Z" {...stroke} />
    <path d="M2.8 9.6 4.7 4.4h14.6l1.9 5.2" {...stroke} />
    <path d="M9.6 20.6v-5.4h4.8v5.4" {...stroke} />
  </>,
)

export const IconScooter = wrap(
  <>
    <circle cx="5.8" cy="17.2" r="2.9" {...stroke} />
    <circle cx="18.2" cy="17.2" r="2.9" {...stroke} />
    <path d="M8.7 17.2h6.6M12.6 4.6h2.7l2.9 12.6" {...stroke} />
    <path d="M2.9 17.2c0-4.1 2.6-6.5 6.3-7l1.8-3.6" {...stroke} />
  </>,
)

export const IconInfo = wrap(
  <>
    <circle cx="12" cy="12" r="9" {...stroke} />
    <path d="M12 16v-4.5M12 8.2h.01" {...stroke} />
  </>,
)
