import { useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/',              label: 'Accueil',           section: 'Spirituel' },
  { to: '/liturgie',      label: 'Liturgie du jour',  section: 'Spirituel' },
  { to: '/homelies',      label: 'Homélies',          section: 'Spirituel' },
  { to: '/annonces',      label: 'Annonces & Agenda', section: 'Paroisse' },
  { to: '/evenements',    label: 'Médias & Lives',    section: 'Paroisse' },
  { to: '/catechese',     label: 'Catéchèse',         section: 'Paroisse' },
  { to: '/vie-spirituelle', label: 'Vie spirituelle', section: 'Paroisse' },
  { to: '/horaires',      label: 'Horaires & Contact',section: 'Paroisse' },
  { to: '/dons',          label: 'Don & Offrande',    section: 'Soutien' },
  { to: '/abonnements',   label: 'S\'abonner',        section: 'Soutien' },
]

const SECTIONS = ['Spirituel', 'Paroisse', 'Soutien']

interface HeaderProps { transparent?: boolean }

export function Header({ transparent = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Ferme le menu sur navigation
  useEffect(() => { setMenuOpen(false) }, [])

  // Long press logo → admin
  const startPress = () => { pressTimer.current = setTimeout(() => navigate('/admin'), 3000) }
  const endPress = () => { if (pressTimer.current) clearTimeout(pressTimer.current) }

  const isScrolled = scrolled || !transparent
  const headerBg   = isScrolled ? 'rgba(250,247,242,.97)' : 'rgba(250,247,242,.0)'
  const textColor  = isScrolled ? 'var(--primary)' : '#fff'
  const subColor   = isScrolled ? 'var(--blue)' : 'rgba(255,255,255,.8)'
  const barColor   = isScrolled ? 'var(--primary)' : '#fff'
  const barAccent  = isScrolled ? 'var(--blue)' : 'rgba(255,255,255,.6)'

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: isScrolled ? '12px 48px' : '22px 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: headerBg,
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(30,58,95,.1)' : 'none',
        boxShadow: isScrolled ? '0 2px 20px rgba(30,58,95,.08)' : 'none',
        transition: 'all .35s ease',
      }}>
        {/* Logo */}
        <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            onMouseDown={startPress} onMouseUp={endPress} onMouseLeave={endPress}
            onTouchStart={startPress} onTouchEnd={endPress}
            style={{
              width: 38, height: 38, borderRadius: '50%',
              border: `1.5px solid ${isScrolled ? 'var(--border-accent)' : 'rgba(255,255,255,.5)'}`,
              overflow: 'hidden', flexShrink: 0, cursor: 'pointer',
              boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none',
            }}
          >
            <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: textColor, letterSpacing: '.04em', transition: 'color .35s' }}>
              Cathédrale Sacré-Cœur
            </span>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: subColor, transition: 'color .35s' }}>
              Archidiocèse de Brazzaville
            </span>
          </div>
        </NavLink>

        {/* Menu button */}
        <button onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }} aria-label="Menu">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: 6 }}>
            <span style={{ display: 'block', height: 1.5, width: 28, background: barColor, transition: 'all .3s' }} />
            <span style={{ display: 'block', height: 1.5, width: 20, background: barAccent, transition: 'all .3s' }} />
            <span style={{ display: 'block', height: 1.5, width: 28, background: barColor, transition: 'all .3s' }} />
          </div>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: subColor, transition: 'color .35s' }}>Menu</span>
        </button>
      </header>

      {/* Overlay */}
      <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: menuOpen ? 'rgba(30,58,95,.4)' : 'rgba(30,58,95,0)', pointerEvents: menuOpen ? 'all' : 'none', transition: 'background .4s' }} />

      {/* Side menu — fond crème */}
      <nav style={{
        position: 'fixed', top: 0, right: 0,
        width: 'min(380px, 90vw)', height: '100vh',
        background: 'var(--surface)',
        zIndex: 201,
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform var(--t-slow)',
        display: 'flex', flexDirection: 'column',
        borderLeft: '1px solid var(--border)',
        boxShadow: '-8px 0 40px rgba(30,58,95,.12)',
        overflowY: 'auto',
      }}>
        {/* Tête */}
        <div style={{ padding: '22px 28px 18px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg)' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 16, color: 'var(--primary)', fontWeight: 600 }}>Navigation</span>
          <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-mid)', width: 32, height: 32, borderRadius: '50%', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--blue)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--blue)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-mid)' }}
          >✕</button>
        </div>

        {/* Liens groupés */}
        {SECTIONS.map(section => (
          <div key={section} style={{ padding: '16px 28px 4px' }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent-dark)', marginBottom: 8 }}>{section}</p>
            {NAV_LINKS.filter(l => l.section === section).map(link => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setMenuOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 0', textDecoration: 'none',
                  color: isActive ? 'var(--primary)' : 'var(--text-mid)',
                  fontSize: 14, fontWeight: isActive ? 600 : 400,
                  borderBottom: '1px solid var(--border)',
                  transition: 'color .2s, padding-left .2s',
                })}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--primary)'; (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '5px' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '0' }}
              >
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--blue)', flexShrink: 0 }} />
                {link.label}
              </NavLink>
            ))}
          </div>
        ))}

        {/* CTAs */}
        <div style={{ margin: '20px 28px 28px', display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
          <NavLink to="/dons" onClick={() => setMenuOpen(false)} className="btn-gold" style={{ justifyContent: 'center', textDecoration: 'none' }}>
            ✦ Don &amp; Offrande
          </NavLink>
        </div>
      </nav>
    </>
  )
}
