import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import LangToggle from './LangToggle'

export default function Navbar() {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.about,    href: '#about' },
    { label: t.nav.whyUs,    href: '#why' },
    { label: t.nav.contact,  href: '#contact' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,22,40,.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-9 h-9 flex items-center justify-center rounded-md text-base font-semibold"
               style={{ border: '1.5px solid var(--gold)', color: 'var(--gold)', fontFamily: '"Cormorant Garamond", serif' }}>
            D
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Diko's Assurances
            </div>
            <div className="text-xs tracking-widest uppercase" style={{ color: 'var(--gold)', fontSize: '.55rem' }}>
              {t.nav.broker}
            </div>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(l => (
            <a key={l.href} href={l.href}
               className="text-sm transition-colors duration-200 hover:text-gold"
               style={{ color: 'rgba(248,246,241,.65)' }}
               onMouseOver={e => e.target.style.color='var(--gold)'}
               onMouseOut={e => e.target.style.color='rgba(248,246,241,.65)'}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LangToggle />
          <Link to="/login"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded text-sm font-medium transition-all"
                style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}
                onMouseOver={e => { e.currentTarget.style.background='var(--gold)'; e.currentTarget.style.color='var(--navy)' }}
                onMouseOut={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--gold)' }}>
            {t.nav.clientLogin}
          </Link>
          {/* Mobile hamburger */}
          <button className="md:hidden text-xl" style={{ color: 'var(--muted)' }}
                  onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3"
             style={{ background: 'rgba(10,22,40,.96)', borderTop: '1px solid var(--border)' }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
               className="text-sm py-1" style={{ color: 'rgba(248,246,241,.7)' }}>
              {l.label}
            </a>
          ))}
          <Link to="/login" onClick={() => setMenuOpen(false)}
                className="text-sm py-1" style={{ color: 'var(--gold)' }}>
            {t.nav.clientLogin}
          </Link>
        </div>
      )}
    </nav>
  )
}
