import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { I18N } from '../data/i18n'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'modak-aangan:lang'

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'hi' || saved === 'en') return saved
    } catch {
      /* private mode / storage blocked — fall through to the default */
    }
    return 'hi'
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* nothing to do — the choice just won't be remembered */
    }
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => {
    const dict = I18N[lang]
    return {
      lang,
      isHi: lang === 'hi',
      toggle: () => setLang((l) => (l === 'hi' ? 'en' : 'hi')),
      /** t('some.key') → the string, or the key itself if it's missing */
      t: (key) => dict[key] ?? key,
      /** pick({ hi: '…', en: '…' }) → the right half of a data object */
      pick: (obj) => (obj ? (obj[lang] ?? obj.hi ?? '') : ''),
    }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}
