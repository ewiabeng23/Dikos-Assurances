import { useLang } from '../../../context/LanguageContext'

export default function PlaceholderView({ icon, msgKey }) {
  const { t } = useLang()
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <p className="text-sm max-w-sm" style={{ color: 'rgba(248,246,241,.4)' }}>
        {t.dash[msgKey]}
      </p>
    </div>
  )
}
