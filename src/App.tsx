import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'

// ── Pages publiques (lazy) ────────────────────────────────────────────────
const HomePage          = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })))
const LiturgiePage      = lazy(() => import('./pages/LiturgiePage').then(m => ({ default: m.LiturgiePage })))
const AnnoncesPage      = lazy(() => import('./pages/AnnoncesPage').then(m => ({ default: m.AnnoncesPage })))
const EvenementsPage    = lazy(() => import('./pages/EvenementsPage').then(m => ({ default: m.EvenementsPage })))
const CatechesePage     = lazy(() => import('./pages/CatechesePage').then(m => ({ default: m.CatechesePage })))
const VieSpirituellePage= lazy(() => import('./pages/VieSpirituellePage').then(m => ({ default: m.VieSpirituellePage })))
const HorairesPage      = lazy(() => import('./pages/HorairesPage').then(m => ({ default: m.HorairesPage })))
const DonsPage          = lazy(() => import('./pages/DonsPage').then(m => ({ default: m.DonsPage })))

// ── Loader ────────────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="page-loader">
      <div className="page-loader-ring" />
      <p style={{ fontSize: 12, color: 'var(--grey)', letterSpacing: '.12em', textTransform: 'uppercase' }}>Chargement…</p>
    </div>
  )
}

function W({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

// ── Router ────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home — header transparent sur hero plein écran */}
        <Route path="/" element={
          <Layout transparent>
            <W><HomePage /></W>
          </Layout>
        } />

        {/* Pages publiques */}
        <Route path="/liturgie"         element={<Layout><W><LiturgiePage /></W></Layout>} />
        <Route path="/annonces"         element={<Layout><W><AnnoncesPage /></W></Layout>} />
        <Route path="/evenements"       element={<Layout><W><EvenementsPage /></W></Layout>} />
        <Route path="/catechese"        element={<Layout><W><CatechesePage /></W></Layout>} />
        <Route path="/vie-spirituelle"  element={<Layout><W><VieSpirituellePage /></W></Layout>} />
        <Route path="/horaires"         element={<Layout><W><HorairesPage /></W></Layout>} />
        <Route path="/dons"             element={<Layout><W><DonsPage /></W></Layout>} />

        {/* 404 */}
        <Route path="*" element={
          <Layout>
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 64, color: 'var(--gold)', lineHeight: 1 }}>404</p>
              <p style={{ color: 'var(--grey)', fontSize: 14 }}>Page introuvable</p>
              <a href="/" className="btn-gold" style={{ marginTop: 8 }}>Retour à l'accueil</a>
            </div>
          </Layout>
        } />

      </Routes>
    </BrowserRouter>
  )
}
