import { type ReactNode, useEffect } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutProps {
  children: ReactNode
  transparent?: boolean  // header transparent pour pages avec hero plein écran
}

export function Layout({ children, transparent = false }: LayoutProps) {
  // Reveal : MutationObserver pour détecter les éléments ajoutés par le lazy-loading
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 60)
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.08 })

    function observe(root: Element | Document = document) {
      root.querySelectorAll('.reveal:not(.anim)').forEach(el => {
        el.classList.add('anim')
        io.observe(el)
      })
    }

    // Observer les éléments déjà présents
    observe()

    // MutationObserver : surveille les nouveaux nœuds (lazy-loaded pages)
    const mo = new MutationObserver(() => observe())
    mo.observe(document.body, { childList: true, subtree: true })

    return () => { io.disconnect(); mo.disconnect() }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Header transparent={transparent} />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />

      {/* ── Responsive global overrides ── */}
      <style>{`
        /* Hero mobile */
        @media (max-width: 640px) {
          section { padding: 48px 0 !important; }
          /* Hero accueil */
          .hero-btns { flex-direction: column !important; align-items: flex-start !important; }
        }

        /* Liturgie barre date */
        @media (max-width: 640px) {
          .date-bar-inner { gap: 8px !important; }
          .date-bar-inner input[type=date] { width: 140px !important; font-size: 11px !important; }
          .date-bar-inner .couleur-badge { display: none; }
        }

        /* Annonces liste — colonnes mobile */
        @media (max-width: 640px) {
          .annonce-row { grid-template-columns: 52px 1fr !important; }
          .annonce-arrow-col { display: none !important; }
        }

        /* Horaires — sacrements & contact grids */
        @media (max-width: 640px) {
          .sacrement-grid-resp,
          .contact-grid-resp { grid-template-columns: 1fr !important; }
        }

        /* Dons — montants */
        @media (max-width: 480px) {
          .montants-grid { grid-template-columns: 1fr 1fr !important; }
          .canaux-grid { grid-template-columns: 1fr !important; }
        }

        /* Catéchèse — parcours */
        @media (max-width: 640px) {
          .parcours-grid { grid-template-columns: 1fr !important; }
          .equipe-grid   { grid-template-columns: 1fr 1fr !important; }
        }

        /* Vie spirituelle — formations */
        @media (max-width: 640px) {
          .formation-item { grid-template-columns: 1fr !important; }
          .formation-num, .formation-meta { display: none !important; }
          .groupes-grid { grid-template-columns: 1fr !important; }
        }

        /* Événements — grille vidéos */
        @media (max-width: 640px) {
          .events-grid { grid-template-columns: 1fr !important; }
        }

        /* Homelies — date col */
        @media (max-width: 480px) {
          .homelie-date-col { display: none !important; }
          .homelie-sep { display: none !important; }
        }

        /* Texte heroïque accueil */
        @media (max-width: 480px) {
          .hero-title { font-size: 38px !important; }
        }
      `}</style>
    </div>
  )
}
