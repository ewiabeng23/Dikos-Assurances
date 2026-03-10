import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useLang } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'
import LangToggle from '../../components/LangToggle'

export default function Login() {
  const { t } = useLang()
  const { login } = useAuth()
  const navigate = useNavigate()
  const l = t.login

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(false)
  const [alert, setAlert] = useState(null)   // { msg, type }
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setAlert(null)
    if (!username || !password) { setAlert({ msg: l.errFields, type: 'error' }); return }

    setLoading(true)
    try {
      await login(username, password)
      setAlert({ msg: l.successMsg, type: 'success' })
      setTimeout(() => navigate('/dashboard'), 900)
    } catch {
      setAlert({ msg: l.errCreds, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    { num: '500+', label: l.statLabels[0] },
    { num: '4',    label: l.statLabels[1] },
    { num: '30d',  label: l.statLabels[2] },
    { num: '100%', label: l.statLabels[3] },
  ]

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: 'var(--navy)' }}>
      {/* Lang toggle — absolute */}
      <div className="absolute top-5 right-5 z-10">
        <LangToggle />
      </div>

      {/* LEFT PANEL */}
      <div className="hidden md:flex w-5/12 flex-shrink-0 flex-col justify-between p-12 relative overflow-hidden"
           style={{ background: 'linear-gradient(160deg,var(--navy2) 0%,#071020 100%)', borderRight: '1px solid var(--border)' }}>
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none"
             style={{
               backgroundImage: 'linear-gradient(rgba(201,168,76,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.03) 1px,transparent 1px)',
               backgroundSize: '50px 50px',
               maskImage: 'radial-gradient(ellipse at 60% 40%,black 20%,transparent 65%)',
             }} />
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
             style={{ transform: 'translate(30%,-30%)', background: 'radial-gradient(circle,rgba(201,168,76,.07) 0%,transparent 70%)' }} />

        {/* Logo */}
        <div className="relative z-10 fade-up">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 flex items-center justify-center rounded-md text-lg font-semibold"
                 style={{ border: '1.5px solid var(--gold)', color: 'var(--gold)', fontFamily: '"Cormorant Garamond",serif' }}>
              D
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ fontFamily: '"Cormorant Garamond",serif' }}>Diko's Assurances SARL</div>
              <div className="text-xs tracking-widest uppercase" style={{ color: 'var(--gold)', fontSize: '.55rem' }}>{l.portalLabel}</div>
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="relative z-10 fade-up">
          <h1 className="font-serif font-light leading-tight mb-4" style={{ fontSize: 'clamp(2.2rem,3vw,3rem)' }}>
            {l.leftTagline}<br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>{l.leftEm}</em>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,246,241,.45)', fontWeight: 300, maxWidth: 320 }}>
            {l.leftDesc}
          </p>
        </div>

        {/* Stats grid */}
        <div className="relative z-10 fade-up grid grid-cols-2 gap-px rounded overflow-hidden"
             style={{ border: '1px solid var(--border)', background: 'var(--border)' }}>
          {stats.map((s, i) => (
            <div key={i} className="px-5 py-4" style={{ background: 'rgba(10,22,40,.6)' }}>
              <div className="font-serif text-xl" style={{ color: 'var(--gold)' }}>{s.num}</div>
              <div className="text-xs uppercase tracking-wider mt-1" style={{ color: 'var(--muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm fade-up" style={{ animationDelay: '.1s' }}>
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="w-5 h-px" style={{ background: 'var(--gold)' }} />
              <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--gold)' }}>{l.eyebrow}</span>
            </div>
            <h2 className="font-serif font-light leading-tight mb-2" style={{ fontSize: '2rem' }}
                dangerouslySetInnerHTML={{ __html: l.title.replace('\n','<br/>') }} />
            <p className="text-xs" style={{ color: 'rgba(248,246,241,.4)' }}>{l.sub}</p>
          </div>

          {/* Alert */}
          {alert && (
            <div className="mb-4 px-4 py-2.5 rounded text-sm"
                 style={{
                   background: alert.type === 'error' ? 'rgba(231,76,60,.1)' : 'rgba(46,204,113,.1)',
                   border: `1px solid ${alert.type === 'error' ? 'rgba(231,76,60,.3)' : 'rgba(46,204,113,.3)'}`,
                   color: alert.type === 'error' ? '#e74c3c' : '#2ecc71',
                 }}>
              {alert.msg}
            </div>
          )}

          {/* Username */}
          <div className="mb-4">
            <label className="text-xs uppercase tracking-wider block mb-1.5" style={{ color: 'var(--muted)' }}>{l.username}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 text-sm">👤</span>
              <input value={username} onChange={e => setUsername(e.target.value)}
                     onKeyDown={e => e.key === 'Enter' && handleLogin()}
                     placeholder={l.userPlaceholder} type="text"
                     className="w-full pl-9 pr-3 py-2.5 rounded text-sm outline-none transition-all"
                     style={{ background: 'rgba(248,246,241,.04)', border: '1px solid rgba(248,246,241,.1)', color: 'var(--white)' }}
                     onFocus={e => e.target.style.borderColor='var(--gold)'}
                     onBlur={e => e.target.style.borderColor='rgba(248,246,241,.1)'} />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-xs uppercase tracking-wider block mb-1.5" style={{ color: 'var(--muted)' }}>{l.password}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 text-sm">🔒</span>
              <input value={password} onChange={e => setPassword(e.target.value)}
                     onKeyDown={e => e.key === 'Enter' && handleLogin()}
                     placeholder="••••••••••" type={showPw ? 'text' : 'password'}
                     className="w-full pl-9 pr-10 py-2.5 rounded text-sm outline-none transition-all"
                     style={{ background: 'rgba(248,246,241,.04)', border: '1px solid rgba(248,246,241,.1)', color: 'var(--white)' }}
                     onFocus={e => e.target.style.borderColor='var(--gold)'}
                     onBlur={e => e.target.style.borderColor='rgba(248,246,241,.1)'} />
              <button onClick={() => setShowPw(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm transition-colors"
                      style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                {showPw ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                     className="w-3.5 h-3.5 accent-yellow-500" />
              <span className="text-xs" style={{ color: 'rgba(248,246,241,.5)' }}>{l.remember}</span>
            </label>
            <a href="#" className="text-xs transition-opacity" style={{ color: 'var(--gold)' }}>{l.forgot}</a>
          </div>

          {/* Submit */}
          <button onClick={handleLogin} disabled={loading}
                  className="w-full py-3 rounded text-sm font-medium uppercase tracking-wider transition-all mb-6"
                  style={{ background: loading ? 'rgba(201,168,76,.6)' : 'var(--gold)', color: 'var(--navy)', cursor: loading ? 'wait' : 'pointer' }}
                  onMouseOver={e => !loading && (e.currentTarget.style.background='var(--gold2)')}
                  onMouseOut={e => !loading && (e.currentTarget.style.background='var(--gold)')}>
            {loading ? '...' : l.submit}
          </button>

          <div className="text-center mb-4">
            <div className="w-full h-px mb-4" style={{ background: 'var(--border)' }} />
            <Link to="/" className="text-xs transition-colors" style={{ color: 'rgba(248,246,241,.35)' }}
                  onMouseOver={e => e.currentTarget.style.color='var(--gold)'}
                  onMouseOut={e => e.currentTarget.style.color='rgba(248,246,241,.35)'}>
              {l.back}
            </Link>
          </div>

          <div className="text-center text-xs" style={{ color: 'rgba(248,246,241,.25)' }}>{l.security}</div>
        </div>
      </div>
    </div>
  )
}
