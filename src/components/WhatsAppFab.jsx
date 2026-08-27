import { useLang } from '../context/LanguageContext'
import { whatsappUrl } from '../lib/order'
import { IconWhatsApp } from './Icons'

export default function WhatsAppFab({ raised = false }) {
  const { t, isHi } = useLang()
  const hello = isHi
    ? 'नमस्ते! मुझे मोदक के बारे में पूछना है।'
    : 'Hello! I have a question about your modaks.'

  return (
    <a
      className={`fab ${raised ? 'fab--raised' : ''}`}
      href={whatsappUrl(hello)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('fab.aria')}
      title={t('fab.aria')}
    >
      <IconWhatsApp />
    </a>
  )
}
