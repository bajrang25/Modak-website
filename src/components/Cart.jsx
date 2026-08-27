import { useLang } from '../context/LanguageContext'
import { SHOP } from '../data/shop'
import Photo from './Photo'
import { IconCart } from './Icons'

export default function Cart({ cart }) {
  const { t, pick } = useLang()

  return (
    <div className="panel">
      <h3 className="panel__title">
        {t('order.items')}
        {!cart.isEmpty && (
          <button type="button" className="panel__clear" onClick={cart.clear}>
            {t('order.clear')}
          </button>
        )}
      </h3>

      {cart.isEmpty ? (
        <div className="cart__empty">
          <IconCart />
          <p>{t('order.empty')}</p>
          <a className="btn btn--ghost" href="#menu">
            {t('order.emptyCta')}
          </a>
        </div>
      ) : (
        <>
          <ul className="cart__list">
            {cart.lines.map((line) => (
              <li className="line" key={line.key}>
                <Photo
                  name={line.product.image}
                  widths={[400]}
                  sizes="40px"
                  alt=""
                  className="line__thumb"
                />

                <div>
                  <p className="line__name">{pick(line.product.name)}</p>
                  <p className="line__meta">
                    {line.packQty} {t('menu.pieces')} × {SHOP.currency}
                    {line.unitPrice}
                  </p>
                </div>

                <div className="line__right">
                  <span className="line__sub">
                    {SHOP.currency}
                    {line.subtotal}
                  </span>
                  <div
                    className="stepper"
                    role="group"
                    aria-label={`${pick(line.product.name)} — ${line.packQty} ${t('menu.pieces')}`}
                  >
                    <button
                      type="button"
                      onClick={() => cart.decrement(line.product.id, line.packQty)}
                      aria-label={`${t('menu.minus')} — ${pick(line.product.name)}`}
                    >
                      <span aria-hidden="true">−</span>
                    </button>
                    <span className="stepper__val" role="status" aria-live="polite">
                      {line.count}
                    </span>
                    <button
                      type="button"
                      onClick={() => cart.add(line.product.id, line.packQty)}
                      aria-label={`${t('menu.plus')} — ${pick(line.product.name)}`}
                    >
                      <span aria-hidden="true">+</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <dl className="cart__total">
            <dt>{t('order.total')}</dt>
            <dd>
              {SHOP.currency}
              {cart.total}
            </dd>
          </dl>
          <p className="cart__pieces">
            {cart.totalPieces} {t('menu.pieces')}
          </p>
        </>
      )}
    </div>
  )
}
