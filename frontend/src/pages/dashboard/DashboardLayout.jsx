import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'
import LangToggle from '../../components/LangToggle'
import DashboardHome  from './views/DashboardHome'
import ClientsView    from './views/ClientsView'
import PoliciesView   from './views/PoliciesView'
import ExpiringView   from './views/ExpiringView'
import PlaceholderView from './views/PlaceholderView'

const VIEWS = ['dashboard','clients','policies','expiring','reminders','quotes','settings']

export default function DashboardLayout() {
  const { t } = useLang()
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const d = t.dash

  const [view, setView] = useState('dashboard')
  const [search, setSearch] = useState('')

  function handleLogout() { logout(); navigate('/login') }

  const navGroups = [
    { label: d.sections.main, items: [
      { id:'dashboard', icon:'📊' },
      { id:'clients',   icon:'👥', badge: null },
      { id:'policies',  icon:'📋', badge: '12', badgeGold: true },
    ]},
    { label: d.sections.management, items: [
      { id:'expiring',  icon:'⏰', badge: '5' },
      { id:'reminders', icon:'🔔' },
      { id:'quotes',    icon:'💼' },
    ]},
    { label: d.sections.system, items: [
      { id:'settings',   icon:'⚙️' },
    ]},
  ]

  const [title, subtitle] = d.viewTitles[view] || [view, '']
  const locale = t === t ? (d.nav.dashboard === 'Tableau de Bord' ? 'fr-FR' : 'en-GB') : 'fr-FR'
  const dateStr = new Date().toLocaleDateString(locale, { weekday:'long', day:'numeric', month:'long', year:'numeric' })

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--navy)' }}>

      {/* ── SIDEBAR ── */}
      <aside className="w-56 flex-shrink-0 flex flex-col"
             style={{ background: 'var(--navy2)', borderRight: '1px solid var(--border)', position: 'sticky', top: 0, height: '100vh' }}>
        {/* Logo */}
        <div className="px-5 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 flex items-center justify-center rounded text-sm font-semibold flex-shrink-0"
                 style={{ border: '1.5px solid var(--gold)', color: 'var(--gold)', fontFamily: '"Cormorant Garamond",serif' }}>D</div>
            <div>
              <div className="text-xs font-semibold leading-tight" style={{ fontFamily: '"Cormorant Garamond",serif' }}>Diko's Assurances</div>
              <div className="text-xs" style={{ color: 'var(--gold)', fontSize: '.52rem', letterSpacing: '.12em', textTransform: 'uppercase' }}>SARL</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navGroups.map(group => (
            <div key={group.label} className="mb-5">
              <div className="text-xs uppercase tracking-widest px-2 mb-2" style={{ color: 'rgba(138,150,168,.5)', fontSize: '.58rem' }}>
                {group.label}
              </div>
              {group.items.map(item => {
                const active = view === item.id
                return (
                  <button key={item.id}
                          onClick={() => setView(item.id)}
                          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded text-xs mb-0.5 transition-all text-left"
                          style={{
                            background: active ? 'rgba(201,168,76,.1)' : 'transparent',
                            color: active ? 'var(--gold)' : 'rgba(248,246,241,.55)',
                            borderLeft: active ? '2px solid var(--gold)' : '2px solid transparent',
                          }}>
                    <span className="text-sm">{item.icon}</span>
                    <span className="flex-1">{d.nav[item.id]}</span>
                    {item.badge && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full"
                            style={{
                              background: item.badgeGold ? 'rgba(201,168,76,.2)' : 'rgba(231,76,60,.2)',
                              color: item.badgeGold ? 'var(--gold)' : '#e74c3c',
                            }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}

          {/* Divider */}
          <div className="my-3" style={{ borderTop: '1px solid var(--border)' }} />
          <Link to="/"
                className="flex items-center gap-2.5 px-2.5 py-2 rounded text-xs mb-0.5 transition-colors"
                style={{ color: 'rgba(248,246,241,.4)' }}>
            <span className="text-sm">🌐</span>
            <span>{d.nav.publicSite}</span>
          </Link>
          <button onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded text-xs transition-colors text-left"
                  style={{ color: 'rgba(231,76,60,.6)' }}
                  onMouseOver={e => e.currentTarget.style.color='#e74c3c'}
                  onMouseOut={e => e.currentTarget.style.color='rgba(231,76,60,.6)'}>
            <span className="text-sm">🚪</span>
            <span>{d.logout}</span>
          </button>
        </nav>

        {/* User */}
        <div className="px-4 py-4" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                 style={{ background: 'rgba(201,168,76,.2)', color: 'var(--gold)' }}>
              {(user?.username?.[0] || 'A').toUpperCase()}
            </div>
            <div>
              <div className="text-xs font-medium">{user?.username || 'Admin'}</div>
              <div className="text-xs" style={{ color: 'var(--muted)', fontSize: '.6rem' }}>Administrateur</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-3 flex-shrink-0"
                style={{ borderBottom: '1px solid var(--border)', background: 'rgba(10,22,40,.6)', backdropFilter: 'blur(8px)', position: 'sticky', top: 0, zIndex: 20 }}>
          <div>
            <h1 className="font-serif text-base font-medium">{title}</h1>
            <p className="text-xs capitalize" style={{ color: 'var(--muted)' }}>{subtitle} — {dateStr}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden sm:block">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs opacity-40">🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)}
                     placeholder={d.search}
                     className="pl-7 pr-3 py-1.5 rounded text-xs outline-none"
                     style={{ background: 'rgba(248,246,241,.05)', border: '1px solid var(--border)', color: 'var(--white)', width: 180 }}
                     onFocus={e => e.target.style.borderColor='var(--gold)'}
                     onBlur={e => e.target.style.borderColor='var(--border)'} />
            </div>
            <LangToggle />
            {/* Notification bell */}
            <div className="relative cursor-pointer">
              <span className="text-base" style={{ color: 'var(--muted)' }}>🔔</span>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-xs"
                    style={{ background: '#e74c3c', color: '#fff', fontSize: '.5rem' }}>5</span>
            </div>
            {/* New client btn */}
            <button onClick={() => setView('clients')}
                    className="px-3 py-1.5 rounded text-xs font-medium transition-all hidden sm:block"
                    style={{ background: 'var(--gold)', color: 'var(--navy)' }}
                    onMouseOver={e => e.currentTarget.style.background='var(--gold2)'}
                    onMouseOut={e => e.currentTarget.style.background='var(--gold)'}>
              {d.newClient}
            </button>
          </div>
        </header>

        {/* View content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {view === 'dashboard'  && <DashboardHome  onNavigate={setView} />}
          {view === 'clients'    && <ClientsView />}
          {view === 'policies'   && <PoliciesView />}
          {view === 'expiring'   && <ExpiringView />}
          {view === 'reminders'  && <PlaceholderView icon="🔔" msgKey="reminderMsg" />}
          {view === 'quotes'     && <PlaceholderView icon="💼" msgKey="quotesMsg" />}
          {view === 'settings'   && <PlaceholderView icon="⚙️" msgKey="settingsMsg" />}
        </main>
      </div>
    </div>
  )
}
