import { useState } from 'react'
import { SHOP } from '../data/shop'
import { useLang } from '../context/LanguageContext'
import { earliestOrderDate, makeOrderRef, submitOrder } from '../lib/order'
import { IconInfo, IconWhatsApp, IconStore, IconScooter } from './Icons'
import SentDialog from './SentDialog'
import LocationPicker from './LocationPicker'

/* mode defaults to pickup; the field is only shown when delivery is on. */
const EMPTY = {
  name: '',
  phone: '',
  date: '',
  slot: '',
  notes: '',
  mode: 'pickup',
  address: '',
  geo: null, // { lat, lng, accuracy } once a pin is dropped
}

export default function OrderForm({ cart }) {
  const { t, lang, pick } = useLang()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(null) // { ref, url }

  const set = (field) => (e) => {
    const value = field === 'phone' ? e.target.value.replace(/\D/g, '').slice(0, 10) : e.target.value
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((err) => (err[field] ? { ...err, [field]: undefined } : err))
  }

  const isDelivery = SHOP.deliveryEnabled && form.mode === 'delivery'

  const validate = () => {
    const e = {}
    if (cart.isEmpty) e.cart = t('err.empty')
    if (!form.name.trim()) e.name = t('err.name')
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = t('err.phone')
    if (!form.date) e.date = t('err.date')
    if (!form.slot) e.slot = t('err.slot')
    /* Either is enough on its own: a map pin gets the rider to the gate,
       a written address gets them to the door. A one-word "home" does
       neither, so short text without a pin does not count. */
    if (isDelivery && !form.geo && form.address.trim().length < 12) {
      e.address = t('err.address')
    }
    return e
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) {
      if (found.cart) document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    const ref = makeOrderRef()
    // Called straight from the submit gesture — browsers block a delayed window.open.
    const url = submitOrder({
      ref,
      lines: cart.lines,
      total: cart.total,
      totalPieces: cart.totalPieces,
      form,
      lang,
      t,
      pick,
    })
    setSent({ ref, url })
  }

  /* Backdrop tap or Escape — an accidental gesture. Close the dialog and
     leave the cart and the typed details completely alone, so nothing is
     lost if WhatsApp never opened and they want to try again. */
  const dismissDialog = () => setSent(null)

  /* The explicit "Got it" button — the customer is telling us they are
     done, so it is safe to reset for a fresh order. */
  const finishOrder = () => {
    setSent(null)
    setForm(EMPTY)
    cart.clear()
  }

  return (
    <div className="panel">
      <h3 className="panel__title">{t('order.title')}</h3>

      <form onSubmit={onSubmit} noValidate>
        {SHOP.deliveryEnabled && (
          <div className="field">
            <span className="field__label" id="mode-label">
              {t('form.mode')} <span className="req">*</span>
            </span>
            <div className="segmented" role="radiogroup" aria-labelledby="mode-label">
              {[
                { id: 'pickup', Icon: IconStore },
                { id: 'delivery', Icon: IconScooter },
              ].map(({ id, Icon }) => (
                <label key={id} className="segmented__opt">
                  <input
                    type="radio"
                    name="mode"
                    value={id}
                    checked={form.mode === id}
                    onChange={set('mode')}
                  />
                  <span>
                    <Icon width="18" height="18" />
                    {t(`form.${id}`)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        <p className="form__note">
          <IconInfo width="18" height="18" style={{ flex: 'none', marginTop: 2 }} />
          {isDelivery ? t('form.deliveryNote') : t('form.pickupNote')}
        </p>

        <div className={`field ${errors.name ? 'field--error' : ''}`}>
          <label className="field__label" htmlFor="f-name">
            {t('form.name')} <span className="req">*</span>
          </label>
          <input
            id="f-name"
            type="text"
            autoComplete="name"
            placeholder={t('form.namePh')}
            value={form.name}
            onChange={set('name')}
          />
          {errors.name && <span className="field__err">{errors.name}</span>}
        </div>

        <div className={`field ${errors.phone ? 'field--error' : ''}`}>
          <label className="field__label" htmlFor="f-phone">
            {t('form.phone')} <span className="req">*</span>
          </label>
          <div className="phone-wrap">
            <span>+91</span>
            <input
              id="f-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder={t('form.phonePh')}
              value={form.phone}
              onChange={set('phone')}
            />
          </div>
          {errors.phone && <span className="field__err">{errors.phone}</span>}
        </div>

        <div className="field-row">
          <div className={`field ${errors.date ? 'field--error' : ''}`}>
            <label className="field__label" htmlFor="f-date">
              {t('form.date')} <span className="req">*</span>
            </label>
            <input
              id="f-date"
              type="date"
              min={earliestOrderDate()}
              value={form.date}
              onChange={set('date')}
            />
            {errors.date && <span className="field__err">{errors.date}</span>}
          </div>

          <div className={`field ${errors.slot ? 'field--error' : ''}`}>
            <label className="field__label" htmlFor="f-slot">
              {isDelivery ? t('form.slotDelivery') : t('form.slotPickup')}{' '}
              <span className="req">*</span>
            </label>
            <select id="f-slot" value={form.slot} onChange={set('slot')}>
              <option value="">{t('form.slotPh')}</option>
              {SHOP.slots.map((s) => (
                <option key={s.id} value={s.id}>
                  {pick(s)}
                </option>
              ))}
            </select>
            {errors.slot && <span className="field__err">{errors.slot}</span>}
          </div>
        </div>

        {isDelivery && (
          <div className={`field ${errors.address ? 'field--error' : ''}`}>
            <label className="field__label" htmlFor="f-address">
              {t('form.address')} <span className="req">*</span>
            </label>
            <p className="field__help">{t('geo.hint')}</p>
            <textarea
              id="f-address"
              rows="3"
              autoComplete="street-address"
              placeholder={t('form.addressPh')}
              value={form.address}
              onChange={set('address')}
            />

            <div className="geo__or">
              <span>{t('form.or')}</span>
            </div>

            <LocationPicker
              value={form.geo}
              onChange={(geo) => {
                setForm((f) => ({ ...f, geo }))
                setErrors((e) => (e.address ? { ...e, address: undefined } : e))
              }}
            />

            {errors.address && <span className="field__err">{errors.address}</span>}
          </div>
        )}

        <div className="field">
          <label className="field__label" htmlFor="f-notes">
            {t('form.notes')}
          </label>
          <textarea
            id="f-notes"
            rows="3"
            placeholder={t('form.notesPh')}
            value={form.notes}
            onChange={set('notes')}
          />
        </div>

        {errors.cart && (
          <p className="field__err" style={{ marginBottom: '0.75rem' }}>
            {errors.cart}
          </p>
        )}

        <button type="submit" className="btn btn--wa btn--block btn--lg">
          <IconWhatsApp width="21" height="21" />
          {t('form.submit')}
        </button>
      </form>

      {sent && (
        <SentDialog
          orderRef={sent.ref}
          url={sent.url}
          onDismiss={dismissDialog}
          onDone={finishOrder}
        />
      )}
    </div>
  )
}
