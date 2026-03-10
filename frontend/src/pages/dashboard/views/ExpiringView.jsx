import { useLang } from '../../../context/LanguageContext'
import { StatusBadge, TypeBadge, DaysBadge } from '../../../components/Badges'
import { sampleClients, daysUntil, fmtDate } from '../../../utils/data'

export default function ExpiringView() {
  const { t } = useLang()
  const d = t.dash
  const expiring = sampleClients.filter(c => c.status !== 'active')
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">{d.expiringTitle}</h2>
        <button className="px-3 py-1.5 rounded text-xs font-medium transition-all"
                style={{ background: 'var(--gold)', color: 'var(--navy)' }}
                onMouseOver={e => e.currentTarget.style.background='var(--gold2)'}
                onMouseOut={e => e.currentTarget.style.background='var(--gold)'}>
          📧 Send All Reminders
        </button>
      </div>
      <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--navy2)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {[d.th.client, d.th.phone, d.th.type, d.th.policy, d.th.expiry, d.th.days, d.th.status, ''].map((h,i) => (
                  <th key={i} className="px-4 py-3 text-left font-medium uppercase tracking-wider"
                      style={{ color: 'var(--muted)', fontSize: '.6rem' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {expiring.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid rgba(201,168,76,.06)' }}>
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>{c.phone}</td>
                  <td className="px-4 py-3"><TypeBadge type={c.type} /></td>
                  <td className="px-4 py-3 font-mono" style={{ color: 'var(--muted)', fontSize: '.7rem' }}>{c.policyNo}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>{fmtDate(c.expiry)}</td>
                  <td className="px-4 py-3"><DaysBadge days={daysUntil(c.expiry)} /></td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded"
                          style={{ background: 'rgba(201,168,76,.1)', color: 'var(--gold)' }}>
                      {d.status.pending}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="text-sm hover:opacity-70">📧</button>
                      <button className="text-sm hover:opacity-70">💬</button>
                      <button className="text-sm hover:opacity-70">👁</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
