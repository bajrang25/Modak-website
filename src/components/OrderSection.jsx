import { useLang } from '../context/LanguageContext'
import Cart from './Cart'
import OrderForm from './OrderForm'
import Reveal from './Reveal'

export default function OrderSection({ cart }) {
  const { t } = useLang()

  return (
    <section className="section" id="order">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t('order.eyebrow')}</span>
          <h2 className="section-title">{t('order.title')}</h2>
          <p className="section-sub">{t('order.sub')}</p>
          <div className="ornament">
            <span>❖</span>
          </div>
        </div>

        <Reveal className="order__panel">
          <Cart cart={cart} />
          <OrderForm cart={cart} />
        </Reveal>
      </div>
    </section>
  )
}
