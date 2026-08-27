import { PRODUCTS } from '../data/shop'
import { useLang } from '../context/LanguageContext'
import ProductCard from './ProductCard'
import Reveal from './Reveal'

export default function Menu({ cart }) {
  const { t } = useLang()

  return (
    <section className="section section--tint" id="menu">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t('menu.eyebrow')}</span>
          <h2 className="section-title">{t('menu.title')}</h2>
          <span className="menu__badge">✦ {t('menu.limited')}</span>
        </div>

        <div className="menu__grid">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.id} delay={i * 90}>
              <ProductCard product={product} cart={cart} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
