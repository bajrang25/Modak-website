import { useRef } from 'react'
import { useLang } from '../context/LanguageContext'
import { SHOP } from '../data/shop'
import Photo from './Photo'

function Pack({ product, pack, cart, t, name }) {
  const count = cart.countOf(product.id, pack.qty)
  const addRef = useRef(null)
  /* Read out by screen readers, e.g. "Paan Modak — 11 pcs, ₹230" */
  const label = `${name} — ${pack.qty} ${t('menu.pieces')}, ${SHOP.currency}${pack.price}`

  const onMinus = (event) => {
    /* At 1 → 0 this button is about to be removed. Hand focus to the button
       that survives BEFORE React flushes, or the browser drops focus to
       <body> and a keyboard user is thrown back to the top of the page.
       The activeElement guard keeps a plain mouse click from pulling focus
       into the card (Safari does not focus buttons on click).             */
    if (count === 1 && document.activeElement === event.currentTarget) {
      addRef.current?.focus()
    }
    cart.decrement(product.id, pack.qty)
  }

  return (
    <div className={`pack ${count > 0 ? 'pack--active' : ''}`}>
      <span className="pack__qty">
        {pack.qty} {t('menu.pieces')}
      </span>
      <span className="pack__price">
        {SHOP.currency}
        {pack.price}
      </span>

      {/* Always mounted and always the same node — a live region that gets
          remounted is silent in every screen reader. */}
      <span className="sr-only" role="status" aria-live="polite">
        {count > 0 ? `${count} × ${label}` : ''}
      </span>

      {/* The price itself is not tappable — only these controls are, so a
          stray tap on the card can never quietly add a pack.
          The Add/plus button is always the LAST child of this container, so
          React reuses that exact DOM node across 0 <-> 1 and focus lives.  */}
      <div
        className="pack__ctl"
        data-empty={count === 0 ? 'true' : 'false'}
        {...(count > 0 ? { role: 'group', 'aria-label': label } : null)}
      >
        {count > 0 && (
          <button
            type="button"
            className="pack__step"
            onClick={onMinus}
            aria-label={`${t('menu.minus')} — ${label}`}
          >
            <span aria-hidden="true">−</span>
          </button>
        )}

        {/* key={count} remounts this so the pop animation replays on every
            change. aria-hidden because the live region above does the
            announcing — otherwise it would be said twice. */}
        {count > 0 && (
          <span key={count} className="pack__num" aria-hidden="true">
            {count}
          </span>
        )}

        <button
          ref={addRef}
          type="button"
          className={count === 0 ? 'pack__add' : 'pack__step'}
          onClick={() => cart.add(product.id, pack.qty)}
          aria-label={`${count === 0 ? t('menu.add') : t('menu.plus')} — ${label}`}
        >
          {count === 0 ? (
            <>
              <span className="plus" aria-hidden="true">
                +
              </span>
              {t('menu.add')}
            </>
          ) : (
            <span aria-hidden="true">+</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default function ProductCard({ product, cart }) {
  const { t, pick } = useLang()
  const name = pick(product.name)

  return (
    <article className={`card card--${product.theme}`}>
      {/* Circular photo medallion with a gold ring — the same treatment the
          shop's printed poster uses for each variety. */}
      <div className="card__top">
        <Photo
          name={product.image}
          sizes="(max-width: 700px) 168px, 184px"
          alt={name}
          className="card__photo"
        />
      </div>

      <div className="card__body">
        <h3 className="card__name">{name}</h3>
        <p className="card__desc">{pick(product.desc)}</p>
      </div>

      <div className="card__packs">
        {product.packs.map((pack) => (
          <Pack
            key={pack.qty}
            product={product}
            pack={pack}
            cart={cart}
            t={t}
            name={name}
          />
        ))}
      </div>
    </article>
  )
}
