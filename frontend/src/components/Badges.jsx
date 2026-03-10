import { useLang } from '../context/LanguageContext'

export function StatusBadge({ status }) {
  const { t } = useLang()
  const map = {
    active:   { label: t.dash.status.active,   bg: 'rgba(46,204,113,.12)',  color: '#2ecc71' },
    expiring: { label: t.dash.status.expiring,  bg: 'rgba(243,156,18,.12)', color: '#f39c12' },
    expired:  { label: t.dash.status.expired,   bg: 'rgba(231,76,60,.12)',  color: '#e74c3c' },
  }
  const s = map[status] || map.active
  return (
    <span className="text-xs px-2 py-1 rounded-full font-medium"
          style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  )
}

export function TypeBadge({ type }) {
  return (
    <span className="text-xs px-2 py-1 rounded"
          style={{ background: 'rgba(201,168,76,.1)', color: 'var(--gold)' }}>
      {type}
    </span>
  )
}

export function DaysBadge({ days }) {
  const color = days > 14 ? '#f39c12' : '#e74c3c'
  const bg    = days > 14 ? 'rgba(243,156,18,.12)' : 'rgba(231,76,60,.12)'
  const label = days <= 0 ? '—' : `${days}j`
  return (
    <span className="text-xs px-2 py-1 rounded font-mono font-medium"
          style={{ background: bg, color }}>
      {label}
    </span>
  )
}
