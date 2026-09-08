import { useEffect, useState } from 'react'
import { useLang } from '../context/LanguageContext'
import ModakSvg from './ModakSvg'

export default function Header() {
  const { t, isHi, toggle } = useLang()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a className="brand" href="#top">
          <ModakSvg variant="ivory" className="brand__mark" />
          <span className="brand__name">
            {isHi ? (
              <>
                मोदक <em>भवन</em>
              </>
            ) : (
              <>
                Modak <em>Bhavan</em>
              </>
            )}
          </span>
        </a>

        <nav className="nav">
          <a href="#menu">{t('nav.menu')}</a>
          <a href="#order">{t('nav.order')}</a>
          <a href="#why">{t('nav.why')}</a>
          <a href="#pickup">{t('nav.pickup')}</a>
        </nav>

        <button className="lang-toggle" onClick={toggle} aria-label="Switch language">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
          {t('lang.other')}
        </button>
      </div>
    </header>
  )
}
