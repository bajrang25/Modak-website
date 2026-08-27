import { useCallback, useEffect, useRef, useState } from 'react'
import { shopLatLng } from '../lib/maps'
import { useLang } from '../context/LanguageContext'
import { IconCrosshair, IconMap, IconPin, IconCheck } from './Icons'

/* Where the map opens when no location has been shared yet — the shop's own
   pin, so a customer who declines GPS still starts somewhere local. */
const DEFAULT_CENTRE = [17.385, 78.4867] // Hyderabad, if no shop pin is set

const round = (n) => Math.round(n * 1e6) / 1e6

/* Leaflet's default marker is a PNG resolved by relative path, which breaks
   under a bundler. An inline SVG divIcon sidesteps that and lets the pin match
   the shop's colours. */
const PIN_SVG = `<svg viewBox="0 0 24 32" width="28" height="37" aria-hidden="true">
  <path d="M12 0C5.4 0 0 5.4 0 12c0 8.4 12 20 12 20s12-11.6 12-20C24 5.4 18.6 0 12 0z"
        fill="#7B1523" stroke="#C9A227" stroke-width="1.6"/>
  <circle cx="12" cy="12" r="4.4" fill="#F0DDA4"/>
</svg>`

export default function LocationPicker({ value, onChange }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [locating, setLocating] = useState(false)
  const [error, setError] = useState(null)

  const boxRef = useRef(null)
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  /* Moves the pin if the map happens to be open, and always reports upward. */
  const apply = useCallback((lat, lng, accuracy = null) => {
    const next = { lat: round(lat), lng: round(lng), accuracy }
    onChangeRef.current(next)
    if (mapRef.current && markerRef.current) {
      markerRef.current.setLatLng([next.lat, next.lng])
      mapRef.current.setView([next.lat, next.lng], Math.max(mapRef.current.getZoom(), 17))
    }
  }, [])

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setError(t('geo.unsupported'))
      setOpen(true)
      return
    }
    setLocating(true)
    setError(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false)
        apply(pos.coords.latitude, pos.coords.longitude, Math.round(pos.coords.accuracy))
        /* Always show the map afterwards — GPS is routinely 10-30 m out, and
           in a flat complex that is the difference between two buildings. */
        setOpen(true)
      },
      (err) => {
        setLocating(false)
        setError(err.code === err.PERMISSION_DENIED ? t('geo.denied') : t('geo.failed'))
        setOpen(true) // they can still place the pin by hand
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
    )
  }

  /* Leaflet and its CSS are pulled in only when the map is actually opened,
     so a pickup customer never downloads any of it. */
  useEffect(() => {
    if (!open) return
    let cancelled = false
    let map

    ;(async () => {
      const [{ default: L }] = await Promise.all([
        import('leaflet'),
        import('leaflet/dist/leaflet.css'),
      ])
      if (cancelled || !boxRef.current) return

      const start = value ? [value.lat, value.lng] : (shopLatLng() ?? DEFAULT_CENTRE)
      map = L.map(boxRef.current, { zoomControl: true }).setView(start, value ? 17 : 13)

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap',
      }).addTo(map)

      const icon = L.divIcon({
        className: 'map-pin',
        html: PIN_SVG,
        iconSize: [28, 37],
        iconAnchor: [14, 37],
      })
      const marker = L.marker(start, { draggable: true, icon, autoPan: true }).addTo(map)

      const report = (ll) => onChangeRef.current({ lat: round(ll.lat), lng: round(ll.lng), accuracy: null })
      marker.on('dragend', () => report(marker.getLatLng()))
      map.on('click', (e) => {
        marker.setLatLng(e.latlng)
        report(e.latlng)
      })

      mapRef.current = map
      markerRef.current = marker
      /* The container animates open, so Leaflet measures it too early. */
      setTimeout(() => map.invalidateSize(), 60)
    })()

    return () => {
      cancelled = true
      if (map) map.remove()
      mapRef.current = null
      markerRef.current = null
    }
    // `value` is only the opening view; re-running on every drag would fight the pin
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <div className="geo">
      {value ? (
        <div className="geo__set">
          <IconCheck width="18" height="18" />
          <div>
            <strong>{t('geo.set')}</strong>
            <span className="geo__coords">
              {value.lat.toFixed(5)}, {value.lng.toFixed(5)}
              {value.accuracy ? ` · ${t('geo.accuracy')} ${value.accuracy} m` : ''}
            </span>
          </div>
          <div className="geo__setActions">
            <button type="button" onClick={() => setOpen((o) => !o)}>
              {open ? t('geo.done') : t('geo.change')}
            </button>
            <button
              type="button"
              className="geo__clear"
              onClick={() => {
                onChange(null)
                setOpen(false)
                setError(null)
              }}
            >
              {t('geo.clear')}
            </button>
          </div>
        </div>
      ) : (
        <div className="geo__actions">
          <button type="button" className="geo__btn" onClick={useMyLocation} disabled={locating}>
            <IconCrosshair width="18" height="18" />
            {locating ? t('geo.locating') : t('geo.useMine')}
          </button>
          <button type="button" className="geo__btn" onClick={() => setOpen((o) => !o)}>
            <IconMap width="18" height="18" />
            {open ? t('geo.hide') : t('geo.pickMap')}
          </button>
        </div>
      )}

      {error && (
        <p className="geo__err">
          <IconPin width="16" height="16" /> {error}
        </p>
      )}

      {open && (
        <>
          <div className="map-box" ref={boxRef} role="application" aria-label={t('geo.title')} />
          <p className="geo__hint">{t('geo.drag')}</p>
        </>
      )}
    </div>
  )
}
