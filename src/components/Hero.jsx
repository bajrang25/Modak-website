import { useLang } from '../context/LanguageContext'
import Photo from './Photo'
import Countdown from './Countdown'
import Reveal from './Reveal'
import { IconLeaf, IconSpark, IconHeart, IconArrow } from './Icons'

export default function Hero() {
  const { t, isHi } = useLang()

  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <Reveal className="hero__copy">
          <span className="hero__pill">
            <span className="dot" />
            {t('hero.preorder')}
          </span>

          <h1 className="hero__logo">
            {isHi ? 'मोदक' : 'Modak'}
            <span className="sep">❖</span>
            <span className="aangan">{isHi ? 'आंगन' : 'Aangan'}</span>
          </h1>
          <p className="hero__tagline">{t('hero.tagline')}</p>

          <div className="hero__badges">
            <span>
              <IconSpark width="17" height="17" /> {t('hero.badge1')}
            </span>
            <span>
              <IconLeaf width="17" height="17" /> {t('hero.badge2')}
            </span>
            <span>
              <IconHeart width="17" height="17" /> {t('hero.badge3')}
            </span>
          </div>

          <h2 className="hero__headline">
            <span>{t('hero.headline1')}</span>
            <span>{t('hero.headline2')}</span>
          </h2>
          <p className="hero__body">{t('hero.body')}</p>

          <div className="hero__actions">
            <a className="btn btn--primary btn--lg" href="#menu">
              {t('hero.cta')} <IconArrow width="18" height="18" />
            </a>
            <a className="btn btn--ghost btn--lg" href="#menu">
              {t('hero.cta2')}
            </a>
          </div>
          <p className="hero__note">✦ {t('hero.note')}</p>
        </Reveal>

        <Reveal className="platter" delay={120}>
          {/* eager: this is the largest thing above the fold, so it should
              start downloading immediately rather than lazily. */}
          <Photo
            name="platter"
            widths={[800, 1400]}
            sizes="(max-width: 900px) min(92vw, 420px), min(46vw, 520px)"
            alt={
              isHi
                ? 'पीतल की थाली में चॉकलेट, पान और क्लासिक स्टीम मोदक'
                : 'Chocolate, paan and classic steam modaks on a brass thali'
            }
            className="platter__photo"
            eager
          />
        </Reveal>
      </div>

      {/* Renders nothing at all once the festival date arrives */}
      <Countdown />
    </section>
  )
}
