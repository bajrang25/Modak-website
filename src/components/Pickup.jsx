import { useState } from 'react'
import { SHOP } from '../data/shop'
import { useLang } from '../context/LanguageContext'
import { whatsappUrl } from '../lib/order'
import { shopMapsUrl, shopDirectionsUrl } from '../lib/maps'
import Reveal from './Reveal'
import Photo from './Photo'
import ShopMap from './ShopMap'
import { IconPin, IconClock, IconArrow, IconWhatsApp, IconScooter, IconMap } from './Icons'

export default function Pickup() {
  const { t, isHi } = useLang()
  const [showMap, setShowMap] = useState(false)

  const address = (isHi ? SHOP.pickup.addressHi : SHOP.pickup.addressEn).trim()
  const hours = (isHi ? SHOP.pickup.hoursHi : SHOP.pickup.hoursEn).trim()
  const mapsUrl = shopMapsUrl()
  const directionsUrl = shopDirectionsUrl()

  const askForAddress = isHi
    ? 'नमस्ते! पिकअप का पता बता दीजिए।'
    : 'Hello! Could you share the pickup address?'

  return (
    <section className="section" id="pickup">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t('pickup.eyebrow')}</span>
          <h2 className="section-title">{t('pickup.title')}</h2>
        </div>

        <Reveal className="pickup__card">
          <div>
            <div className="pickup__row">
              <IconPin />
              <div>
                <p className="pickup__k">{t('pickup.addr')}</p>
                {/* No written address in shop.js → we don't publish one. With a
                    pin set we point at the map; without either, WhatsApp. */}
                <p className="pickup__v">
                  {address || (directionsUrl ? t('pickup.viaMap') : t('pickup.ask'))}
                </p>
              </div>
            </div>

            {hours && (
              <div className="pickup__row">
                <IconClock />
                <div>
                  <p className="pickup__k">{t('pickup.hours')}</p>
                  <p className="pickup__v">{hours}</p>
                </div>
              </div>
            )}

            {directionsUrl ? (
              <>
                <div className="pickup__actions">
                  {/* Opens Maps already routing from wherever they are — the
                      one thing a customer coming to collect actually wants. */}
                  <a
                    className="btn btn--gold"
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconArrow width="18" height="18" /> {t('pickup.directions')}
                  </a>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => setShowMap((s) => !s)}
                    aria-expanded={showMap}
                  >
                    <IconMap width="18" height="18" />
                    {showMap ? t('pickup.hideMap') : t('pickup.showMap')}
                  </button>
                </div>

                <p className="pickup__alt">
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                    {t('pickup.maps')}
                  </a>
                </p>
              </>
            ) : (
              <a
                className="btn btn--gold"
                href={whatsappUrl(askForAddress)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconWhatsApp width="18" height="18" /> {t('pickup.askCta')}
              </a>
            )}

            {SHOP.deliveryEnabled && (
              <p className="pickup__delivery">
                <IconScooter width="20" height="20" />
                {t('pickup.delivery')}
              </p>
            )}

            <p className="pickup__note">{t('pickup.note')}</p>
          </div>

          {/* The map takes the photo's place once opened */}
          <div className="pickup__aside">
            {showMap ? (
              <ShopMap />
            ) : (
              <Photo
                name="classic"
                sizes="(max-width: 640px) 160px, 200px"
                alt=""
                className="pickup__photo"
              />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
