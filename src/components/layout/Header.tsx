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
      <header
        className={`site-header${isScrolled ? ' scrolled' : ''}${transparent ? ' transparent' : ''}`}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: isScrolled ? '12px var(--pad-x)' : '18px var(--pad-x)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: headerBg,
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(30,58,95,.1)' : 'none',
          boxShadow: isScrolled ? '0 2px 20px rgba(30,58,95,.08)' : 'none',
          transition: 'all .35s ease',
        }}>
        {/* Logo */}
        <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div
            onMouseDown={startPress} onMouseUp={endPress} onMouseLeave={endPress}
            onTouchStart={startPress} onTouchEnd={endPress}
            style={{
              width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
              border: `1.5px solid ${isScrolled ? 'var(--border-accent)' : 'rgba(255,255,255,.5)'}`,
              overflow: 'hidden', cursor: 'pointer',
              boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none',
            }}
          >
            <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
            <span className="logo-name" style={{
              fontFamily: 'var(--font-serif)', fontSize: 'clamp(13px, 3.5vw, 15px)',
              fontWeight: 600, color: textColor, letterSpacing: '.03em',
              transition: 'color .35s', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              Cathédrale Sacré-Cœur
            </span>
            <span className="logo-sub header-subtitle" style={{
              fontSize: 8, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase',
              color: subColor, transition: 'color .35s',
            }}>
              Archidiocèse de Brazzaville
            </span>
          </div>
        </NavLink>

        {/* Menu button */}
        <button onClick={() => setMenuOpen(true)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flexShrink: 0, padding: '4px 0 4px 12px' }}
          aria-label="Menu">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: 4 }}>
            <span className="menu-bar" style={{ display: 'block', height: 1.5, width: 26, background: barColor, transition: 'all .3s' }} />
            <span className="menu-bar menu-bar-accent" style={{ display: 'block', height: 1.5, width: 18, background: barAccent, transition: 'all .3s' }} />
            <span className="menu-bar" style={{ display: 'block', height: 1.5, width: 26, background: barColor, transition: 'all .3s' }} />
          </div>
          <span className="menu-label-txt" style={{ fontSize: 8, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: subColor, transition: 'color .35s' }}>Menu</span>
        </button>
      </header>

      <style>{`
        /* ── Header mobile : toujours fond visible ── */
        @media (max-width: 768px) {
          .site-header.transparent:not(.scrolled) {
            background: rgba(250,247,242,.95) !important;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(30,58,95,.08) !important;
          }
          /* Barres du menu : forcées en couleur sombre sur mobile */
          .site-header.transparent:not(.scrolled) .menu-bar { background: var(--primary) !important; }
          .site-header.transparent:not(.scrolled) .menu-bar-accent { background: var(--blue) !important; }
          .site-header.transparent:not(.scrolled) .menu-label-txt { color: var(--text-light) !important; }
          .site-header.transparent:not(.scrolled) .logo-name { color: var(--primary) !important; }
          .site-header.transparent:not(.scrolled) .logo-sub  { color: var(--blue) !important; }
        }
        @media (max-width: 480px) {
          .header-subtitle { display: none; }
        }
      `}</style>

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
