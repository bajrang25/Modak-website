import { useEffect, useState } from 'react'

/** Counts down to midnight-at-the-start of the given YYYY-MM-DD, in the
 *  visitor's own timezone.
 *
 *  It rests on 00:00:00 for the final second, then returns null — which is
 *  the signal for <Countdown /> to take itself off the page. Nobody has to
 *  edit anything on the day; the banner just goes. Point festivalDate at the
 *  next occasion and it comes back on its own.
 *
 *  Returns null straight away for a date already past or an unparseable one,
 *  so a typo in shop.js hides the timer rather than showing nonsense.      */
export function useCountdown(dateString) {
  const target = new Date(`${dateString}T00:00:00`).getTime()

  const compute = () => {
    if (Number.isNaN(target)) return null
    const diff = target - Date.now()
    if (diff <= -1000) return null // a second past zero — done, hide it
    const left = Math.max(diff, 0) // hold at 00:00:00 for that last second
    return {
      days: Math.floor(left / 86400000),
      hours: Math.floor((left / 3600000) % 24),
      mins: Math.floor((left / 60000) % 60),
      secs: Math.floor((left / 1000) % 60),
    }
  }

  const [left, setLeft] = useState(compute)

  useEffect(() => {
    const id = setInterval(() => setLeft(compute()), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateString])

  return left
}
