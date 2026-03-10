import { useLang } from '../../../context/LanguageContext'
import { StatusBadge, TypeBadge } from '../../../components/Badges'
import { sampleClients, fmtDate, fmtXAF } from '../../../utils/data'

export default function PoliciesView() {
  const { t } = useLang()
  const d = t.dash
  return (
    <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--navy2)' }}>
      <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <h2 className="text-sm font-medium">{d.nav.policies}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {[d.th.policy, d.th.client, d.th.type, d.th.start, d.th.expiry, d.th.premium, d.th.status, ''].map((h,i) => (
                <th key={i} className="px-4 py-3 text-left font-medium uppercase tracking-wider"
                    style={{ color: 'var(--muted)', fontSize: '.6rem' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sampleClients.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid rgba(201,168,76,.06)' }}>
                <td className="px-4 py-3 font-mono" style={{ color: 'var(--muted)', fontSize: '.7rem' }}>{c.policyNo}</td>
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3"><TypeBadge type={c.type} /></td>
                <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>{fmtDate(c.start)}</td>
                <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>{fmtDate(c.expiry)}</td>
                <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>{fmtXAF(c.premium)}</td>
                <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="text-sm hover:opacity-70">👁</button>
                    <button className="text-sm hover:opacity-70">✏️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
