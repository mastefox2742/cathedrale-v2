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
    <div style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', flexDirection: 'column' }}>
      <Header transparent={transparent} />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
