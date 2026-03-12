import { useState } from 'react'
import { useLang } from '../../context/LanguageContext'
import Navbar from '../../components/Navbar'

const WHATSAPP = 'https://wa.me/237600000000'

/* ── Reusable section label ── */
function Eyebrow({ children }) {
  return (
    <div className="inline-flex items-center gap-3 mb-4">
      <span className="w-6 h-px" style={{ background: 'var(--gold)' }} />
      <span className="text-xs uppercase tracking-widest font-medium" style={{ color: 'var(--gold)' }}>
        {children}
      </span>
    </div>
  )
}

/* ── Hero ── */
function Hero({ t }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden"
             style={{ background: 'linear-gradient(160deg, var(--navy2) 0%, #071020 100%)' }}>
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             backgroundImage: 'linear-gradient(rgba(201,168,76,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.03) 1px,transparent 1px)',
             backgroundSize: '60px 60px',
           }} />
      {/* Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle,rgba(201,168,76,.06) 0%,transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="fade-up">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h1 className="font-serif font-light leading-none mb-6"
              style={{ fontSize: 'clamp(3rem,6vw,5.5rem)' }}>
            {t.h1_1} <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>{t.h1_em}</em><br />
            {t.h1_2}
          </h1>
          <p className="text-base leading-relaxed mb-10 max-w-xl"
             style={{ color: 'rgba(248,246,241,.6)', fontWeight: 300 }}>
            {t.desc}
          </p>
          <div className="flex flex-wrap gap-4 mb-16">
            <a href="#contact"
               className="px-6 py-3 rounded text-sm font-medium uppercase tracking-wider transition-all"
               style={{ background: 'var(--gold)', color: 'var(--navy)' }}
               onMouseOver={e => e.currentTarget.style.background='var(--gold2)'}
               onMouseOut={e => e.currentTarget.style.background='var(--gold)'}>
              {t.cta}
            </a>
            <a href="#services"
               className="px-6 py-3 rounded text-sm font-medium uppercase tracking-wider transition-all"
               style={{ border: '1px solid var(--border)', color: 'var(--white)' }}
               onMouseOver={e => e.currentTarget.style.borderColor='var(--gold)'}
               onMouseOut={e => e.currentTarget.style.borderColor='var(--border)'}>
              {t.services}
            </a>
          </div>
          {/* Stats */}
          <div className="flex flex-wrap gap-10">
            {[['500+', t.stats[0]], ['4', t.stats[1]], ['98%', t.stats[2]]].map(([val, label]) => (
              <div key={label}>
                <div className="font-serif text-3xl font-light" style={{ color: 'var(--gold)' }}>{val}</div>
                <div className="text-xs uppercase tracking-wider mt-1" style={{ color: 'var(--muted)' }}>{label}</div>
              </div>
            ))}
          </div>
          </div>
          {/* Right column — Rings */}
          <div className="hidden md:flex items-center justify-center">
            <EstablishedRings lang={t.lang} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-8" style={{ background: 'var(--gold)' }} />
        <div className="text-xs tracking-widest uppercase" style={{ color: 'var(--gold)', fontSize: '.6rem' }}>scroll</div>
      </div>
    </section>
  )
}

/* ── Services ── */
function Services({ t }) {
  return (
    <section id="services" className="py-28"
             style={{ background: 'var(--navy)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-xl mb-16">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="font-serif font-light leading-tight"
              style={{ fontSize: 'clamp(2.2rem,4vw,3.2rem)' }}>
            {t.title.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
          </h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: 'rgba(248,246,241,.5)' }}>
            {t.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
             style={{ background: 'var(--border)' }}>
          {t.items.map((item, i) => (
            <div key={i} className="p-8 transition-all duration-300 group cursor-default"
                 style={{ background: 'var(--navy)' }}
                 onMouseOver={e => e.currentTarget.style.background='var(--navy2)'}
                 onMouseOut={e => e.currentTarget.style.background='var(--navy)'}>
              <div className="text-3xl mb-5">{item.icon}</div>
              <h3 className="font-serif text-lg font-medium mb-3">{item.name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,246,241,.5)' }}>{item.desc}</p>
              <div className="mt-6 w-6 h-px transition-all duration-300 group-hover:w-12"
                   style={{ background: 'var(--gold)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


/* ── Animated Rings ── */
function EstablishedRings({ lang }) {
  return (
    <div className="flex items-center justify-center py-12">
      <style>{`
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .ring-outer { animation: spinSlow 18s linear infinite; }
        .ring-inner { animation: spinReverse 12s linear infinite; }
      `}</style>
      <div style={{ position: 'relative', width: '220px', height: '220px' }}>
        {/* Outer rotating ring */}
        <div className="ring-outer" style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: '1.5px solid rgba(201,168,76,0.35)',
          boxShadow: '0 0 30px rgba(201,168,76,0.08)',
        }}>
          {/* Dot on outer ring */}
          <div style={{
            position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)',
            width: '8px', height: '8px', borderRadius: '50%',
            background: 'var(--gold)', boxShadow: '0 0 8px rgba(201,168,76,0.8)',
          }} />
        </div>
        {/* Inner rotating ring */}
        <div className="ring-inner" style={{
          position: 'absolute', inset: '24px',
          borderRadius: '50%',
          border: '1px solid rgba(201,168,76,0.2)',
        }}>
          {/* Dot on inner ring */}
          <div style={{
            position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)',
            width: '5px', height: '5px', borderRadius: '50%',
            background: 'rgba(201,168,76,0.6)',
          }} />
        </div>
        {/* Centre content */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '2px',
        }}>
          <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.8rem', fontWeight: 300, lineHeight: 1, color: 'var(--gold)' }}>10</div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(248,246,241,0.5)' }}>
            {lang === 'fr' ? `ANS D'EXPÉRIENCE` : 'YEARS OF EXPERTISE'}
          </div>
          <div style={{ width: '24px', height: '1px', background: 'rgba(201,168,76,0.4)', margin: '4px 0' }} />
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(201,168,76,0.7)' }}>EST. 2016</div>
        </div>
      </div>
    </div>
  )
}

/* ── About ── */
function About({ t }) {
  return (
    <section id="about" className="py-28" style={{ background: 'var(--navy2)' }}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="font-serif font-light leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem,3.5vw,2.8rem)' }}>
            {t.title.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(248,246,241,.6)', fontWeight: 300 }}>
            {t.body}
          </p>
          <ul className="space-y-3">
            {t.points.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(248,246,241,.7)' }}>
                <span style={{ color: 'var(--gold)', marginTop: 2 }}>✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        {/* Partner card */}
        <div className="rounded-lg p-8" style={{ border: '1px solid var(--border)', background: 'rgba(10,22,40,.5)' }}>
          <div className="text-xs uppercase tracking-widest mb-5" style={{ color: 'var(--muted)' }}>
            {t.partnerLabel}
          </div>
          <div className="font-serif text-2xl font-medium mb-1">Chanas Assurances S.A.</div>
          <div className="text-xs mb-6" style={{ color: 'var(--gold)' }}>{t.partner}</div>
          <div className="text-xs leading-relaxed mb-6" style={{ color: 'rgba(248,246,241,.45)' }}>
            {t.chanasSub}
          </div>
          <a href="https://www.chanasassurances.com" target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-2 text-sm transition-colors"
             style={{ color: 'var(--gold)' }}>
            {t.visitBtn}
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── Why Us ── */
function WhyUs({ t }) {
  return (
    <section id="why" className="py-28" style={{ background: 'var(--navy)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="font-serif font-light leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem,3.5vw,2.8rem)' }}>
            {t.title.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
          </h2>
          <p className="text-sm" style={{ color: 'rgba(248,246,241,.5)' }}>{t.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.items.map((item, i) => (
            <div key={i} className="p-6 rounded-lg transition-all duration-300"
                 style={{ border: '1px solid var(--border)', background: 'transparent' }}
                 onMouseOver={e => { e.currentTarget.style.background='var(--navy2)'; e.currentTarget.style.borderColor='rgba(201,168,76,.35)' }}
                 onMouseOut={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='var(--border)' }}>
              <div className="text-2xl mb-4">{item.icon}</div>
              <h3 className="font-serif text-base font-medium mb-2">{item.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(248,246,241,.5)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Contact ── */
function Contact({ t }) {
  const [form, setForm] = useState({ firstName:'', lastName:'', phone:'', type:'', message:'' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit() {
    if (!form.firstName || !form.phone || !form.type) return
    setSending(true)
    try {
      const res = await fetch('/api/enquiries/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed')
      setSent(true)
      setForm({ firstName:'', lastName:'', phone:'', type:'', message:'' })
      setTimeout(() => setSent(false), 5000)
    } catch {
      setError(true)
      setTimeout(() => setError(false), 4000)
    } finally {
      setSending(false)
    }
  }

  const infos = [
    { icon:'📍', label: t.labels.address, value: t.address },
    { icon:'📞', label: t.labels.phone,   value: t.phone },
    { icon:'✉️', label: t.labels.email,   value: t.email },
    { icon:'🕐', label: t.labels.hours,   value: t.hours },
  ]

  return (
    <section id="contact" className="py-28" style={{ background: 'var(--navy2)' }}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        {/* Left info */}
        <div>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 className="font-serif font-light leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem,3.5vw,2.8rem)' }}>
            {t.title.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
          </h2>
          <p className="text-sm mb-10 leading-relaxed" style={{ color: 'rgba(248,246,241,.55)' }}>{t.subtitle}</p>
          <div className="space-y-5 mb-8">
            {infos.map(info => (
              <div key={info.label} className="flex items-start gap-4">
                <span className="text-xl mt-0.5">{info.icon}</span>
                <div>
                  <div className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'var(--muted)' }}>{info.label}</div>
                  <div className="text-sm" style={{ color: 'rgba(248,246,241,.8)' }}>{info.value}</div>
                </div>
              </div>
            ))}
          </div>
          <a href={WHATSAPP} target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium transition-all"
             style={{ background: '#25D366', color: '#fff' }}
             onMouseOver={e => e.currentTarget.style.opacity='0.85'}
             onMouseOut={e => e.currentTarget.style.opacity='1'}>
            💬 {t.whatsapp}
          </a>
        </div>

        {/* Form */}
        <div className="rounded-lg p-8" style={{ border: '1px solid var(--border)', background: 'rgba(10,22,40,.4)' }}>
          <h3 className="font-serif text-lg font-medium mb-6">{t.formTitle}</h3>
          {error && (
            <div className="mb-4 px-4 py-3 rounded text-sm"
                 style={{ background: 'rgba(231,76,60,.1)', border: '1px solid rgba(231,76,60,.3)', color: '#e74c3c' }}>
              Something went wrong. Please try again.
            </div>
          )}
          {sent && (
            <div className="mb-4 px-4 py-3 rounded text-sm"
                 style={{ background: 'rgba(46,204,113,.1)', border: '1px solid rgba(46,204,113,.3)', color: '#2ecc71' }}>
              {t.successMsg}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {['firstName','lastName'].map(field => (
              <div key={field}>
                <label className="text-xs uppercase tracking-wider block mb-1.5" style={{ color: 'var(--muted)' }}>
                  {t.fields[field]}
                </label>
                <input value={form[field]} onChange={e => setForm(f => ({...f,[field]:e.target.value}))}
                       placeholder={t.placeholders[field]}
                       className="w-full px-3 py-2.5 rounded text-sm outline-none transition-all"
                       style={{ background: 'rgba(248,246,241,.04)', border: '1px solid rgba(248,246,241,.1)', color: 'var(--white)' }}
                       onFocus={e => e.target.style.borderColor='var(--gold)'}
                       onBlur={e => e.target.style.borderColor='rgba(248,246,241,.1)'} />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="text-xs uppercase tracking-wider block mb-1.5" style={{ color: 'var(--muted)' }}>{t.fields.phone}</label>
            <input value={form.phone} onChange={e => setForm(f => ({...f,phone:e.target.value}))}
                   placeholder={t.placeholders.phone}
                   className="w-full px-3 py-2.5 rounded text-sm outline-none"
                   style={{ background: 'rgba(248,246,241,.04)', border: '1px solid rgba(248,246,241,.1)', color: 'var(--white)' }}
                   onFocus={e => e.target.style.borderColor='var(--gold)'}
                   onBlur={e => e.target.style.borderColor='rgba(248,246,241,.1)'} />
          </div>
          <div className="mb-4">
            <label className="text-xs uppercase tracking-wider block mb-1.5" style={{ color: 'var(--muted)' }}>{t.fields.type}</label>
            <select value={form.type} onChange={e => setForm(f => ({...f,type:e.target.value}))}
                    className="w-full px-3 py-2.5 rounded text-sm outline-none"
                    style={{ background: 'var(--navy)', border: '1px solid rgba(248,246,241,.1)', color: form.type ? 'var(--white)' : 'var(--muted)' }}
                    onFocus={e => e.target.style.borderColor='var(--gold)'}
                    onBlur={e => e.target.style.borderColor='rgba(248,246,241,.1)'}>
              <option value="">{t.selectDefault}</option>
              {t.options.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="mb-6">
            <label className="text-xs uppercase tracking-wider block mb-1.5" style={{ color: 'var(--muted)' }}>{t.fields.message}</label>
            <textarea value={form.message} onChange={e => setForm(f => ({...f,message:e.target.value}))}
                      placeholder={t.placeholders.message} rows={3}
                      className="w-full px-3 py-2.5 rounded text-sm outline-none resize-none"
                      style={{ background: 'rgba(248,246,241,.04)', border: '1px solid rgba(248,246,241,.1)', color: 'var(--white)' }}
                      onFocus={e => e.target.style.borderColor='var(--gold)'}
                      onBlur={e => e.target.style.borderColor='rgba(248,246,241,.1)'} />
          </div>
          <button onClick={handleSubmit}
                  className="w-full py-3 rounded text-sm font-medium uppercase tracking-wider transition-all"
                  style={{ background: 'var(--gold)', color: 'var(--navy)', opacity: sending ? 0.7 : 1 }}
                  disabled={sending}
                  onMouseOver={e => e.currentTarget.style.background='var(--gold2)'}
                  onMouseOut={e => e.currentTarget.style.background='var(--gold)'}>
            {sending ? '...' : t.submit}
          </button>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ── */
function Footer({ t }) {
  return (
    <footer className="py-8" style={{ borderTop: '1px solid var(--border)', background: 'var(--navy)' }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs" style={{ color: 'var(--muted)' }}>
          © {new Date().getFullYear()} Diko's Assurances SARL. {t.rights}
        </div>
        <div className="text-xs" style={{ color: 'rgba(201,168,76,.5)' }}>{t.partner}</div>
      </div>
    </footer>
  )
}

/* ── Main export ── */
export default function Home() {
  const { t } = useLang()
  return (
    <>
      <Navbar />
      <main>
        <Hero    t={t.hero} />
        <Services t={t.services} />
        <About   t={t.about} />
        <WhyUs   t={t.why} />
        <Contact t={t.contact} />
      </main>
      <Footer t={t.footer} />
    </>
  )
}
