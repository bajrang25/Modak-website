import { SHOP } from '../data/shop'
import { useCountdown } from '../hooks/useCountdown'
import { useLang } from '../context/LanguageContext'
import Reveal from './Reveal'

export default function Countdown() {
  const { t, isHi } = useLang()
  const left = useCountdown(SHOP.festivalDate)

  /* Null means the date has arrived (or was never valid). Returning null here
     removes the whole block — wrapper included — so no empty gap is left
     behind in the hero. It happens live on the open page, no refresh needed. */
  if (!left) return null

  const festival = isHi ? SHOP.festivalNameHi : SHOP.festivalNameEn
  const units = [
    { n: left.days, cap: t('count.days') },
    { n: left.hours, cap: t('count.hours') },
    { n: left.mins, cap: t('count.mins') },
    { n: left.secs, cap: t('count.secs') },
  ]

  return (
    <div className="container countdown-wrap">
      <Reveal>
        <div className="countdown">
          <p className="countdown__label">
            {isHi ? `${festival} ${t('count.label')}` : `${t('count.label')} ${festival}`}
          </p>
          <div className="countdown__units">
            {units.map((u) => (
              <div className="countdown__unit" key={u.cap}>
                <span className="countdown__num">{String(u.n).padStart(2, '0')}</span>
                <span className="countdown__cap">{u.cap}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  )
}
