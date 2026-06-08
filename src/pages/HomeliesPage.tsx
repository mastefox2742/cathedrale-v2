import { useEffect, useRef, useState } from 'react'
import { getHomelies, type Homelie } from '../services/homelies'
import { Play, Pause, Volume2 } from 'lucide-react'

// ── Données de secours ─────────────────────────────────────────────────────
const FALLBACK: Homelie[] = [
  {
    id: '1', titre: 'Le Pain de Vie — Méditation sur Jean 6',
    pretre: 'Abbé Pierre Ndamba', date: '2026-06-01',
    liturgieRef: 'Jean 6, 41-51',
    texte: 'Frères et sœurs, la Parole de Dieu que nous venons d\'entendre nous invite à une réflexion profonde sur notre relation avec le Christ, vrai Pain descendu du ciel. Jésus dit : "Je suis le pain vivant, descendu du ciel. Celui qui mangera de ce pain vivra éternellement." Cette affirmation audacieuse a suscité l\'incompréhension de ses contemporains, comme elle peut encore aujourd\'hui déranger nos certitudes.\n\nPourtant, c\'est précisément dans cet étonnement que commence la foi. Dieu ne se laisse pas réduire à nos catégories humaines. Il se donne à nous sous des formes humbles — le pain, la parole, le frère — pour que nous apprenions à le reconnaître là où il se cache.\n\nQue cette eucharistie que nous allons célébrer soit pour chacun d\'entre nous un renouvellement de notre désir de Dieu, une faim nouvelle de sa Parole et de sa présence.',
    publie: true,
  },
  {
    id: '2', titre: 'La Prière du Serviteur — Dimanche de la Miséricorde',
    pretre: 'Père Jean-Baptiste Moussounga', date: '2026-05-18',
    liturgieRef: 'Luc 15, 11-32',
    texte: 'La parabole de l\'enfant prodigue — ou plutôt du père miséricordieux — est l\'une des plus belles histoires jamais racontées. Elle résume à elle seule l\'Évangile tout entier : l\'homme qui s\'éloigne de Dieu, Dieu qui guette son retour, et la fête qui éclate quand l\'enfant revient.\n\nCe père qui court vers son fils, qui lui tombe dans les bras avant même qu\'il ait terminé son discours de repentir — c\'est l\'image de Dieu que Jésus veut nous donner. Un Dieu qui ne comptabilise pas nos fautes, mais qui les oublie dans l\'étreinte du pardon.',
    publie: true,
  },
  {
    id: '3', titre: 'Sumus corpus Christi — Fête du Saint-Sacrement',
    pretre: 'Mgr l\'Archevêque', date: '2026-05-04',
    liturgieRef: '1 Corinthiens 11, 23-26',
    texte: 'Nous sommes le Corps du Christ. Cette devise qui est la nôtre depuis des générations n\'est pas une simple formule. Elle est une vocation, un programme de vie, un défi.\n\nSaint Paul nous rappelle que chaque fois que nous mangeons ce pain et buvons cette coupe, nous proclamons la mort du Seigneur jusqu\'à ce qu\'il vienne. L\'Eucharistie n\'est pas un acte privé de piété. Elle est la source et le sommet de notre vie commune, le lieu où l\'Église devient ce qu\'elle reçoit.',
    publie: true,
  },
]

// ── Lecteur audio mini ─────────────────────────────────────────────────────
function AudioPlayer({ url }: { url: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) { a.pause(); setPlaying(false) }
    else { a.play(); setPlaying(true) }
  }

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--bg-alt)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
      <audio ref={audioRef} src={url}
        onTimeUpdate={e => setProgress((e.currentTarget.currentTime / e.currentTarget.duration) * 100 || 0)}
        onLoadedMetadata={e => setDuration(e.currentTarget.duration)}
        onEnded={() => setPlaying(false)}
      />
      <button onClick={toggle} style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {playing
          ? <Pause size={16} color="#fff" />
          : <Play size={16} color="#fff" style={{ marginLeft: 2 }} />
        }
      </button>
      <div style={{ flex: 1 }}>
        <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }}
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            const pct = (e.clientX - rect.left) / rect.width
            if (audioRef.current) audioRef.current.currentTime = pct * audioRef.current.duration
          }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'var(--blue)', borderRadius: 2, transition: 'width .1s' }} />
        </div>
      </div>
      <span style={{ fontSize: 11, color: 'var(--text-light)', flexShrink: 0 }}>
        {duration ? fmt(duration) : '—'}
      </span>
      <Volume2 size={14} color="var(--text-light)" />
    </div>
  )
}

// ── Carte homélie ──────────────────────────────────────────────────────────
function HomelieCard({ h }: { h: Homelie }) {
  const [open, setOpen] = useState(false)
  const d = new Date(h.date + 'T12:00:00')
  const dateStr = d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  const preview = h.texte.slice(0, 200)

  return (
    <article style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r-md)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      marginBottom: 12,
      transition: 'box-shadow .2s',
    }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = 'var(--shadow-md)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'var(--shadow-sm)')}
    >
      {/* Barre top bleue */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, var(--primary), var(--blue))' }} />

      <div style={{ padding: '24px 28px' }}>
        {/* En-tête */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 16 }}>
          {/* Date */}
          <div style={{ textAlign: 'center', flexShrink: 0, minWidth: 52 }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--primary)', lineHeight: 1 }}>
              {d.toLocaleDateString('fr-FR', { day: '2-digit' })}
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-light)', marginTop: 2 }}>
              {d.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '')}
            </div>
            <div style={{ fontSize: 9, color: 'var(--text-light)' }}>
              {d.getFullYear()}
            </div>
          </div>

          {/* Séparateur */}
          <div style={{ width: 1, background: 'var(--border)', alignSelf: 'stretch', flexShrink: 0 }} />

          {/* Infos */}
          <div style={{ flex: 1 }}>
            {h.liturgieRef && (
              <span style={{
                display: 'inline-block', marginBottom: 8,
                padding: '3px 10px', borderRadius: 'var(--r-full)',
                background: 'rgba(74,127,181,.1)', border: '1px solid rgba(74,127,181,.2)',
                fontSize: 10, fontWeight: 600, color: 'var(--blue)', letterSpacing: '.06em',
              }}>
                📖 {h.liturgieRef}
              </span>
            )}
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: 19, fontWeight: 700,
              color: 'var(--text)', lineHeight: 1.3, marginBottom: 6,
            }}>
              {h.titre}
            </h2>
            <p style={{ fontSize: 12, color: 'var(--text-light)' }}>
              {h.pretre} · {dateStr}
            </p>
          </div>

          {/* Bouton lire */}
          <button onClick={() => setOpen(!open)} style={{
            flexShrink: 0, width: 36, height: 36, borderRadius: '50%',
            border: '1px solid var(--border)', background: 'none',
            cursor: 'pointer', color: 'var(--primary)', fontSize: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform .3s, background .2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-alt)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >∨</button>
        </div>

        {/* Aperçu */}
        {!open && (
          <p style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7,
            cursor: 'pointer',
          }} onClick={() => setOpen(true)}>
            {preview}… <span style={{ color: 'var(--blue)', fontStyle: 'normal', fontWeight: 600 }}>Lire la suite</span>
          </p>
        )}

        {/* Texte complet */}
        {open && (
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
            {h.texte.split('\n\n').map((para, i) => (
              <p key={i} style={{
                fontFamily: 'var(--font-serif)', fontSize: 16,
                lineHeight: 1.95, color: 'var(--text)',
                marginBottom: 16,
              }}>
                {para}
              </p>
            ))}

            {/* Lecteur audio si disponible */}
            {h.audioUrl && (
              <div style={{ marginTop: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--accent-dark)', marginBottom: 10 }}>
                  🎙️ Écouter l'homélie
                </p>
                <AudioPlayer url={h.audioUrl} />
              </div>
            )}

            <button onClick={() => setOpen(false)} style={{
              marginTop: 20, background: 'none', border: 'none',
              cursor: 'pointer', fontSize: 12, color: 'var(--text-light)',
              textDecoration: 'underline', padding: 0,
            }}>
              Réduire
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────
export function HomeliesPage() {
  const [homelies, setHomelies] = useState<Homelie[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getHomelies().then(setHomelies).catch(() => setHomelies(FALLBACK)).finally(() => setLoading(false))
  }, [])

  const filtered = homelies.filter(h =>
    search === '' ||
    h.titre.toLowerCase().includes(search.toLowerCase()) ||
    h.pretre.toLowerCase().includes(search.toLowerCase()) ||
    (h.liturgieRef ?? '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-content">
          <p className="page-hero-eyebrow">Prédication</p>
          <h1>Homélies <em style={{ color: 'var(--accent-light)', fontStyle: 'italic' }}>&amp; Méditations</em></h1>
        </div>
      </div>

      {/* Intro + recherche */}
      <div style={{ background: 'var(--bg-alt)', borderBottom: '1px solid var(--border)', padding: '24px 0' }}>
        <div className="inner" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <p style={{ fontSize: 14, color: 'var(--text-mid)', flex: 1, fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
            « La foi vient de ce qu'on entend. » — Romains 10, 17
          </p>
          <input
            type="search"
            placeholder="Rechercher une homélie, un prêtre…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="dark-input"
            style={{ width: 280 }}
          />
        </div>
      </div>

      {/* Liste */}
      <div style={{ background: 'var(--bg)', padding: 'var(--space-lg) 0 var(--space-xl)' }}>
        <div className="inner">

          {loading && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div className="page-loader-ring" style={{ margin: '0 auto 16px' }} />
              <p style={{ fontSize: 12, color: 'var(--text-light)', letterSpacing: '.12em', textTransform: 'uppercase' }}>Chargement…</p>
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--primary)', marginBottom: 10 }}>✝</p>
              <p style={{ color: 'var(--text-light)' }}>Aucune homélie trouvée.</p>
            </div>
          )}

          {!loading && filtered.map(h => <HomelieCard key={h.id} h={h} />)}

        </div>
      </div>
    </>
  )
}
