import { useLang } from '../context/LanguageContext'

export default function LangToggle({ className = '' }) {
  const { lang, setLang } = useLang()
  return (
    <div className={`flex border rounded overflow-hidden ${className}`}
         style={{ borderColor: 'var(--border)' }}>
      {['fr', 'en'].map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="px-3 py-1 text-xs font-medium uppercase tracking-wide transition-all duration-200"
          style={lang === l
            ? { background: 'var(--gold)', color: 'var(--navy)' }
            : { background: 'transparent', color: 'var(--muted)' }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
