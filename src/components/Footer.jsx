import { SHOP } from '../data/shop'
import { useLang } from '../context/LanguageContext'
import { whatsappUrl } from '../lib/order'
import { IconInstagram, IconWhatsApp, IconPhone } from './Icons'

export default function Footer() {
  const { t, isHi } = useLang()
  const year = new Date().getFullYear()
  const hello = isHi
    ? 'नमस्ते! मुझे मोदक ऑर्डर करने हैं।'
    : 'Hello! I would like to order some modaks.'

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <p className="footer__logo">
              {isHi ? 'मोदक ' : 'Modak '}
              <em>{isHi ? 'आंगन' : 'Aangan'}</em>
            </p>
            <p className="footer__tag">{t('hero.tagline')}</p>
          </div>

          <div>
            <p className="footer__k">{t('foot.follow')}</p>
            <a
              className="social"
              href={`https://instagram.com/${SHOP.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconInstagram />@{SHOP.instagram}
            </a>
          </div>

          <div>
            <p className="footer__k">{t('foot.dm')}</p>
            <a
              className="social"
              href={whatsappUrl(hello)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconWhatsApp />
              <span className="footer__phone">{SHOP.phoneDisplay}</span>
            </a>
            <p style={{ marginTop: '0.6rem' }}>
              <a
                href={`tel:+${SHOP.whatsapp}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.88rem',
                  opacity: 0.75,
                }}
              >
                <IconPhone width="16" height="16" /> +91 {SHOP.phoneDisplay}
              </a>
            </p>
          </div>
        </div>

        <div className="footer__strip">
          <span>✦ {t('foot.tag1')}</span>
          <span>✦ {t('foot.tag2')}</span>
          <span>✦ {t('foot.tag3')}</span>
        </div>
      </div>

      <p className="footer__copy">
        © {year} {isHi ? 'मोदक आंगन' : 'Modak Aangan'} — {t('foot.rights')}
      </p>
    </footer>
  )
}
