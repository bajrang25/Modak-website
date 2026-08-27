import { useEffect } from 'react'
import { SHOP } from '../data/shop'
import { useLang } from '../context/LanguageContext'
import { IconArrow } from './Icons'

/** Sticky summary on phones so the running total is always visible.
 *  Hidden on wide screens by CSS — there the cart panel is already on-screen. */
export default function CartBar({ cart }) {
  const { t } = useLang()

  useEffect(() => {
    document.body.classList.toggle('has-cart', !cart.isEmpty)
    return () => document.body.classList.remove('has-cart')
  }, [cart.isEmpty])

  if (cart.isEmpty) return null

  return (
    <div className="cartbar">
      <div className="cartbar__info">
        <div className="cartbar__count">
          {cart.totalPieces} {t('menu.pieces')}
        </div>
        <div className="cartbar__total">
          {SHOP.currency}
          {cart.total}
        </div>
      </div>
      <a className="btn btn--gold" href="#order">
        {t('nav.order')} <IconArrow width="18" height="18" />
      </a>
    </div>
  )
}
