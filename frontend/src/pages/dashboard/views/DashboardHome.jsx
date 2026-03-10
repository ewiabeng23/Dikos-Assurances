import { useState } from 'react'
import { useLang } from '../../../context/LanguageContext'
import { StatusBadge, TypeBadge, DaysBadge } from '../../../components/Badges'
import Modal, { FormField, FormInput, FormSelect } from '../../../components/Modal'
import { sampleClients, daysUntil, fmtDate, fmtXAF } from '../../../utils/data'

const CARD_ICONS   = ['👥','✅','⚠️','❌']
const CARD_VALUES  = [48, 41, 5, 2]
const TREND_COLORS = ['#2ecc71','#2ecc71','#f39c12','#e74c3c']
const QUICK_ACTIONS_FN = ['addClient','addPolicy','sendReminder','generateQuote']

export default function DashboardHome({ onNavigate }) {
  const { t } = useLang()
  const d = t.dash
  const [modal, setModal] = useState(null)

  const expiring = sampleClients.filter(c => c.status !== 'active').slice(0,5)
  const recent   = sampleClients.slice(0,6)

  function saveClient() { setModal(null); alert(d.savedClient) }
  function savePolicy() { setModal(null); alert(d.savedPolicy) }

  return (
    <div className="space-y-6">

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {d.cards.map((label, i) => (
          <div key={i} className="rounded-lg p-5 transition-all"
               style={{ border: '1px solid var(--border)', background: 'var(--navy2)' }}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-xl">{CARD_ICONS[i]}</span>
              <span className="text-xs" style={{ color: TREND_COLORS[i] }}>{d.cardTrends[i]}</span>
            </div>
            <div className="font-serif text-3xl font-light mb-1" style={{ color: 'var(--gold)' }}>
              {CARD_VALUES[i]}
            </div>
            <div className="text-xs font-medium mb-0.5">{label}</div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>{d.cardSubs[i]}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium">{d.quickActions}</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {d.quickLabels.map((label, i) => (
            <button key={i}
                    onClick={() => i < 2 ? setModal(i === 0 ? 'addClient' : 'addPolicy') : undefined}
                    className="p-4 rounded-lg text-left transition-all"
                    style={{ border: '1px solid var(--border)', background: 'transparent' }}
                    onMouseOver={e => { e.currentTarget.style.background='var(--navy2)'; e.currentTarget.style.borderColor='rgba(201,168,76,.3)' }}
                    onMouseOut={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='var(--border)' }}>
              <div className="text-xl mb-2">{d.quickIcons[i]}</div>
              <div className="text-xs font-medium mb-0.5">{label}</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>{d.quickSubs[i]}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Expiring Policies table */}
        <div className="lg:col-span-2 rounded-lg overflow-hidden"
             style={{ border: '1px solid var(--border)', background: 'var(--navy2)' }}>
          <div className="flex items-center justify-between px-5 py-4"
               style={{ borderBottom: '1px solid var(--border)' }}>
            <h2 className="text-sm font-medium">{d.expiringTitle}</h2>
            <button onClick={() => onNavigate('expiring')} className="text-xs transition-colors"
                    style={{ color: 'var(--gold)' }}>{d.seeAll}</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {[d.th.client, d.th.type, d.th.expiry, d.th.days, d.th.status, ''].map((h,i) => (
                    <th key={i} className="px-4 py-3 text-left font-medium uppercase tracking-wider"
                        style={{ color: 'var(--muted)', fontSize: '.6rem' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {expiring.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid rgba(201,168,76,.06)' }}>
                    <td className="px-4 py-3 font-medium">{c.name}</td>
                    <td className="px-4 py-3"><TypeBadge type={c.type} /></td>
                    <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>{fmtDate(c.expiry)}</td>
                    <td className="px-4 py-3"><DaysBadge days={daysUntil(c.expiry)} /></td>
                    <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="text-sm px-1.5 py-0.5 rounded transition-opacity hover:opacity-70">📧</button>
                        <button className="text-sm px-1.5 py-0.5 rounded transition-opacity hover:opacity-70">👁</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg" style={{ border: '1px solid var(--border)', background: 'var(--navy2)' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <h2 className="text-sm font-medium">{d.recentActivity}</h2>
          </div>
          <div className="px-5 py-4 space-y-4">
            {d.activity.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.dot }} />
                <div>
                  <div className="text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: a.text }} />
                  <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent clients table */}
      <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--navy2)' }}>
        <div className="flex items-center justify-between px-5 py-4"
             style={{ borderBottom: '1px solid var(--border)' }}>
          <h2 className="text-sm font-medium">{d.clientsTitle}</h2>
          <button onClick={() => onNavigate('clients')} className="text-xs" style={{ color: 'var(--gold)' }}>
            {d.seeAllClients}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {[d.th.num, d.th.name, d.th.phone, d.th.type, d.th.status, d.th.premium, ''].map((h,i) => (
                  <th key={i} className="px-4 py-3 text-left font-medium uppercase tracking-wider"
                      style={{ color: 'var(--muted)', fontSize: '.6rem' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((c,i) => (
                <tr key={c.id} style={{ borderBottom: '1px solid rgba(201,168,76,.06)' }}>
                  <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>#{String(i+1).padStart(3,'0')}</td>
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>{c.phone}</td>
                  <td className="px-4 py-3"><TypeBadge type={c.type} /></td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3" style={{ color: 'var(--muted)' }}>{fmtXAF(c.premium)}</td>
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

      {/* Add Client Modal */}
      {modal === 'addClient' && (
        <Modal title={d.modal.addClient} onClose={() => setModal(null)}
               onSave={saveClient} saveLabel={d.modal.saveClient} cancelLabel={d.modal.cancel}>
          <div className="grid grid-cols-2 gap-3">
            <FormField label={d.formLabels.firstName}><FormInput placeholder="Jean" /></FormField>
            <FormField label={d.formLabels.lastName}><FormInput placeholder="Dupont" /></FormField>
          </div>
          <FormField label={d.formLabels.phone}><FormInput placeholder="+237 600 000 000" /></FormField>
          <FormField label={d.formLabels.email}><FormInput placeholder="email@exemple.com" type="email" /></FormField>
          <FormField label={d.formLabels.cni}><FormInput placeholder="123456789" /></FormField>
          <FormField label={d.formLabels.address}><FormInput placeholder="Douala, Cameroun" /></FormField>
          <FormField label={d.formLabels.insuranceType}>
            <FormSelect>
              {['Auto','Habitation','Santé','Vie'].map(o => <option key={o}>{o}</option>)}
            </FormSelect>
          </FormField>
        </Modal>
      )}

      {/* Add Policy Modal */}
      {modal === 'addPolicy' && (
        <Modal title={d.modal.addPolicy} onClose={() => setModal(null)}
               onSave={savePolicy} saveLabel={d.modal.savePolicy} cancelLabel={d.modal.cancel}>
          <FormField label={d.formLabels.policyNo + ' / ' + d.modal.selectClient.split(' ')[0]}>
            <FormSelect>
              <option value="">{d.modal.selectClient}</option>
              {sampleClients.map(c => <option key={c.id}>{c.name}</option>)}
            </FormSelect>
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label={d.formLabels.policyNo}><FormInput placeholder="POL-2025-001" /></FormField>
            <FormField label={d.formLabels.type}>
              <FormSelect>
                {['Auto','Habitation','Santé','Vie'].map(o => <option key={o}>{o}</option>)}
              </FormSelect>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label={d.formLabels.startDate}><FormInput type="date" /></FormField>
            <FormField label={d.formLabels.expiryDate}><FormInput type="date" /></FormField>
          </div>
          <FormField label={d.formLabels.premium}><FormInput placeholder="150 000" /></FormField>
          <FormField label={d.formLabels.notes}>
            <textarea className="w-full px-3 py-2 rounded text-sm outline-none resize-none"
                      style={{ background: 'rgba(248,246,241,.04)', border: '1px solid rgba(248,246,241,.1)', color: 'var(--white)', minHeight: 70 }}
                      onFocus={e => e.target.style.borderColor='var(--gold)'}
                      onBlur={e => e.target.style.borderColor='rgba(248,246,241,.1)'} />
          </FormField>
        </Modal>
      )}
    </div>
  )
}
