import { useLang } from '../context/LanguageContext'
import Reveal from './Reveal'
import { IconMortar, IconHandHeart, IconGift, IconBox } from './Icons'

const ITEMS = [
  { Icon: IconMortar, t: 'why.1t', b: 'why.1b' },
  { Icon: IconHandHeart, t: 'why.2t', b: 'why.2b' },
  { Icon: IconGift, t: 'why.3t', b: 'why.3b' },
  { Icon: IconBox, t: 'why.4t', b: 'why.4b' },
]

export default function WhyUs() {
  const { t } = useLang()

  return (
    <section className="section section--tint" id="why">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t('why.eyebrow')}</span>
          <h2 className="section-title">{t('why.title')}</h2>
        </div>

        <div className="why__grid">
          {ITEMS.map((item, i) => (
            <Reveal key={item.t} delay={i * 80}>
              <div className="why__item">
                <span className="why__icon">
                  <item.Icon />
                </span>
                <h3 className="why__t">{t(item.t)}</h3>
                <p className="why__b">{t(item.b)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
