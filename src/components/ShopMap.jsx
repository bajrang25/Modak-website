import { useEffect, useRef } from 'react'
import { shopLatLng } from '../lib/maps'
import { useLang } from '../context/LanguageContext'

/* A small read-only map showing where the shop is, so a customer can see the
   spot before deciding to come. Leaflet is dynamically imported, exactly like
   the delivery picker — nobody downloads it unless they open a map. */

const PIN_SVG = `<svg viewBox="0 0 24 32" width="30" height="40" aria-hidden="true">
  <path d="M12 0C5.4 0 0 5.4 0 12c0 8.4 12 20 12 20s12-11.6 12-20C24 5.4 18.6 0 12 0z"
        fill="#7B1523" stroke="#C9A227" stroke-width="1.6"/>
  <circle cx="12" cy="12" r="4.4" fill="#F0DDA4"/>
</svg>`

export default function ShopMap() {
  const { t } = useLang()
  const boxRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    let map

    ;(async () => {
      const [{ default: L }] = await Promise.all([
        import('leaflet'),
        import('leaflet/dist/leaflet.css'),
      ])
      const centre = shopLatLng()
      if (cancelled || !boxRef.current || !centre) return

      map = L.map(boxRef.current, {
        zoomControl: true,
        scrollWheelZoom: false, // don't hijack the page scroll on the way past
      }).setView(centre, 16)

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap',
      }).addTo(map)

      L.marker(centre, {
        icon: L.divIcon({
          className: 'map-pin',
          html: PIN_SVG,
          iconSize: [30, 40],
          iconAnchor: [15, 40],
        }),
        keyboard: false,
      }).addTo(map)

      setTimeout(() => map.invalidateSize(), 60)
    })()

    return () => {
      cancelled = true
      if (map) map.remove()
    }
  }, [])

  return (
    <div className="map-box map-box--shop" ref={boxRef} role="img" aria-label={t('pickup.mapAria')} />
  )
}
