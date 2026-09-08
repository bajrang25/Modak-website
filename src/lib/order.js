import { SHOP } from '../data/shop'
import { pinUrl } from './maps'

/* ==========================================================================
   Everything about turning a filled form into a WhatsApp message.
   This is the ONLY file that knows how an order leaves the site — so if you
   later want to also log orders to a Google Sheet or send yourself an email,
   add it inside submitOrder() and nothing else has to change.
   ========================================================================== */

/** Short human-friendly reference, e.g. "MA-7K3Q". Handy on a phone call. */
export function makeOrderRef() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no I/O/0/1 — misread on calls
  let s = ''
  for (let i = 0; i < 4; i++) {
    s += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return `MA-${s}`
}

/** "2026-09-14" → "14 सितंबर 2026" / "14 September 2026" */
export function formatDate(isoDate, lang) {
  if (!isoDate) return ''
  const d = new Date(`${isoDate}T00:00:00`)
  if (Number.isNaN(d.getTime())) return isoDate
  return d.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** Today + minLeadDays, as YYYY-MM-DD, for the date input's min attribute. */
export function earliestOrderDate() {
  const d = new Date()
  d.setDate(d.getDate() + SHOP.minLeadDays)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/**
 * Compose the message that lands in your WhatsApp.
 * *Asterisks* render as bold inside WhatsApp.
 */
export function buildOrderMessage({ ref, lines, total, totalPieces, form, lang, t, pick }) {
  const hi = lang === 'hi'
  const cur = SHOP.currency
  const L = []

  L.push(hi ? '*नया ऑर्डर — मोदक भवन*' : '*New order — Modak Bhavan*')
  L.push(`${hi ? 'ऑर्डर नं.' : 'Order no.'} ${ref}`)
  L.push('')

  L.push(`*${hi ? 'नाम' : 'Name'}:* ${form.name.trim()}`)
  L.push(`*${hi ? 'फ़ोन' : 'Phone'}:* ${form.phone.trim()}`)
  L.push('')

  L.push(`*${hi ? 'ऑर्डर' : 'Order'}:*`)
  for (const l of lines) {
    const name = pick(l.product.name)
    const unit = `${l.packQty} ${t('menu.pieces')}`
    L.push(`• ${name} — ${unit} × ${l.count} = ${cur}${l.subtotal}`)
  }
  L.push('')

  L.push(`*${hi ? 'कुल' : 'Total'}: ${cur}${total}*  (${totalPieces} ${t('menu.pieces')})`)
  /* Payment is settled by hand, on this chat or a call. This line is for the
     shop rather than the customer: during festival week a dozen orders sit in
     the inbox at once, and each one carries its own reminder that the money
     has not been collected yet. */
  L.push(
    `*${hi ? 'पेमेंट' : 'Payment'}:* ${hi ? 'चैट/कॉल पर तय करना है' : 'to settle on chat/call'}`
  )
  L.push('')

  L.push(`*${hi ? 'कब चाहिए' : 'Needed on'}:* ${formatDate(form.date, lang)}`)
  const slot = SHOP.slots.find((s) => s.id === form.slot)
  if (slot) L.push(`*${hi ? 'समय' : 'Time'}:* ${pick(slot)}`)

  /* The line you look at first when the message arrives — keep it loud. */
  const isDelivery = form.mode === 'delivery'
  L.push(`*${isDelivery ? (hi ? '🛵 डिलीवरी' : '🛵 DELIVERY') : hi ? '🏠 पिकअप' : '🏠 PICKUP'}*`)
  if (isDelivery) {
    if (form.address.trim()) {
      L.push(`*${hi ? 'पता' : 'Address'}:* ${form.address.trim()}`)
    }
    /* A tappable Google Maps link straight to the customer's pin. Opens the
       Maps app on a phone with a Directions button already there. */
    if (form.geo) {
      L.push(`*${hi ? '📍 मैप लोकेशन' : '📍 Map location'}:* ${pinUrl(form.geo)}`)
      if (form.geo.accuracy) {
        L.push(`_${hi ? 'GPS सटीकता लगभग' : 'GPS accurate to about'} ${form.geo.accuracy} m_`)
      }
    }
  }

  if (form.notes.trim()) {
    L.push('')
    L.push(`*${hi ? 'नोट' : 'Note'}:* ${form.notes.trim()}`)
  }

  return L.join('\n')
}

export function whatsappUrl(message) {
  return `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(message)}`
}

/**
 * Send the order. Returns the URL that was opened, so the confirmation
 * dialog can offer a "didn't open? tap here" fallback link.
 *
 * Must be called straight from a click/submit handler — browsers block
 * window.open() that isn't tied to a user gesture.
 *
 * ---- Want a backup copy of every order later? ----------------------------
 * Add it right here, before the window.open, e.g.
 *     fetch(SHEET_WEBHOOK_URL, { method: 'POST', mode: 'no-cors',
 *                                body: JSON.stringify(payload) })
 * Nothing else in the app needs to change.
 * -------------------------------------------------------------------------
 */
export function submitOrder(payload) {
  const message = buildOrderMessage(payload)
  const url = whatsappUrl(message)
  window.open(url, '_blank', 'noopener,noreferrer')
  return url
}
