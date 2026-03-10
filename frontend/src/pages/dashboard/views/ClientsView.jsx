import { useLang } from '../../../context/LanguageContext'
import { StatusBadge, TypeBadge } from '../../../components/Badges'
import { sampleClients, fmtXAF } from '../../../utils/data'

export default function ClientsView() {
  const { t } = useLang()
  const d = t.dash
  return (
    <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--navy2)' }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <h2 className="text-sm font-medium">{d.nav.clients}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {[d.th.num, d.th.name, d.th.phone, d.th.email, d.th.type, d.th.status, d.th.premium, ''].map((h,i) => (
                <th key={i} className="px-4 py-3 text-left font-medium uppercase tracking-wider"
                    style={{ color: 'var(--muted)', fontSize: '.6rem' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sampleClients.map((c,i) => (
              <tr key={c.id} style={{ borderBottom: '1px solid rgba(201,168,76,.06)' }}>
                <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>#{String(i+1).padStart(3,'0')}</td>
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>{c.phone}</td>
                <td className="px-4 py-3" style={{ color: 'var(--muted)', fontSize: '.7rem' }}>{c.email}</td>
                <td className="px-4 py-3"><TypeBadge type={c.type} /></td>
                <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>{fmtXAF(c.premium)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="text-sm hover:opacity-70">👁</button>
                    <button className="text-sm hover:opacity-70">✏️</button>
                    <button className="text-sm hover:opacity-70">🗑</button>
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
