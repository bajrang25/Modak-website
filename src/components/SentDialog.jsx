import { useEffect, useRef } from 'react'
import { useLang } from '../context/LanguageContext'
import { IconWhatsApp } from './Icons'

/**
 * onDismiss — backdrop tap or Escape. Non-destructive: the cart and the
 *             typed details stay exactly as they were.
 * onDone     — the explicit confirm button. Clears the order for a fresh one.
 */
export default function SentDialog({ orderRef, url, onDismiss, onDone }) {
  const { t } = useLang()
  const doneBtn = useRef(null)

  useEffect(() => {
    doneBtn.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onDismiss()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onDismiss])

  return (
    <div className="overlay" onClick={onDismiss} role="presentation">
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-label={t('sent.title')}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialog__icon">
          <IconWhatsApp />
        </div>
        <h3 className="dialog__title">{t('sent.title')}</h3>
        <span className="dialog__ref">{orderRef}</span>
        <p className="dialog__body">{t('sent.body')}</p>
        <p className="dialog__pay">{t('sent.pay')}</p>
        <a className="dialog__retry" href={url} target="_blank" rel="noopener noreferrer">
          {t('sent.retry')}
        </a>
        <button ref={doneBtn} type="button" className="btn btn--primary" onClick={onDone}>
          {t('sent.close')}
        </button>
      </div>
    </div>
  )
}
