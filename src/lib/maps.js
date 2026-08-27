import { SHOP } from '../data/shop'

/* ==========================================================================
   Every Google Maps URL the site builds, in one place.
   These are plain external links — they behave the same on Netlify, on a
   local dev server, or anywhere else. Nothing here depends on hosting.
   ========================================================================== */

const hasPin = () =>
  typeof SHOP.pickup.lat === 'number' && typeof SHOP.pickup.lng === 'number'

/** [lat, lng] of the shop, for centring a map. */
export function shopLatLng() {
  return hasPin() ? [SHOP.pickup.lat, SHOP.pickup.lng] : null
}

/** Shows the shop as a pin. Opens the Maps app on a phone. */
export function shopMapsUrl() {
  if (!hasPin()) return null
  return `https://www.google.com/maps/search/?api=1&query=${SHOP.pickup.lat},${SHOP.pickup.lng}`
}

/**
 * Starts navigation to the shop straight away — Maps opens already routing
 * from wherever the customer is. This is the one a pickup customer wants.
 */
export function shopDirectionsUrl() {
  if (!hasPin()) return null
  return `https://www.google.com/maps/dir/?api=1&destination=${SHOP.pickup.lat},${SHOP.pickup.lng}`
}

/** A customer's dropped delivery pin, as a link you can tap to navigate. */
export function pinUrl({ lat, lng }) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
}
