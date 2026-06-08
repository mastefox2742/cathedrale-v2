import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const PARCOURS = [
  { num: '01', emoji: '🌿', tranche: '6 – 8 ans', nom: 'Éveil à la Foi', desc: 'Premier contact avec la Bible, les sacrements et la vie de Jésus. Activités ludiques et adaptées aux tout-petits.', horaire: 'Samedi 8h30 – 10h00', lieu: 'Salle paroissiale' },
  { num: '02', emoji: '🍞', tranche: '8 – 10 ans', nom: 'Première Communion', desc: 'Préparation au sacrement de l\'Eucharistie. Approfondissement de la Parole et introduction à la vie sacramentelle.', horaire: 'Samedi 10h00 – 12h00', lieu: 'Salle paroissiale' },
  { num: '03', emoji: '🔥', tranche: '12 – 15 ans', nom: 'Confirmation', desc: 'Préparation au sacrement de Confirmation. Engagement de foi personnel et insertion dans la vie communautaire.', horaire: 'Samedi 10h00 – 12h00', lieu: 'Salle Saint-Thomas' },
  { num: '04', emoji: '💧', tranche: 'Adultes', nom: 'RICA', desc: 'Rite d\'Initiation Chrétienne des Adultes. Parcours ouvert à toute personne souhaitant rejoindre l\'Église ou approfondir sa foi.', horaire: 'Mercredi 18h00 – 19h30', lieu: 'Salle de réunion · Oct–Pâques' },
]

const CATECHISTES = [
  { initiale: 'A', nom: 'Mme Angélique M.', role: 'Éveil à la Foi', exp: '10 ans d\'expérience' },
  { initiale: 'J', nom: 'M. Joseph K.', role: 'Catéchisme junior', exp: '7 ans d\'expérience' },
  { initiale: 'M', nom: 'Sœur Marie-Claire', role: 'Confirmation', exp: '15 ans d\'expérience' },
  { initiale: 'P', nom: 'Père Paul N.', role: 'RICA adultes', exp: 'Curé adjoint' },
]

const FAQ = [
  { q: 'Mon enfant n\'est pas baptisé, peut-il s\'inscrire ?', r: 'Oui, tout enfant est le bienvenu. Nous proposons un parcours d\'initiation qui peut inclure le baptême à Pâques, en accord avec les parents.' },
  { q: 'Combien coûte la catéchèse ?', r: 'La catéchèse est gratuite pour tous. Une participation libre aux frais de matériel est appréciée mais non obligatoire. Aucun enfant ne sera refusé pour raisons financières.' },
  { q: 'Jusqu\'à quel âge peut-on suivre le catéchisme ?', r: 'Il n\'y a pas de limite d\'âge. Le parcours RICA est spécialement conçu pour les adultes de tout âge souhaitant découvrir ou approfondir la foi chrétienne.' },
  { q: 'Comment se déroule une séance de catéchèse ?', r: 'Chaque séance commence par un temps de prière, suivi d\'un enseignement thématique, d\'activités adaptées à l\'âge, et se termine par un partage en groupe.' },
  { q: 'Quels documents sont requis pour l\'inscription ?', r: 'Acte de baptême (si baptisé), photo d\'identité, carnet de santé pour les enfants. L\'inscription se fait au secrétariat du lundi au vendredi de 9h à 13h.' },
]

function FaqItem({ item }: { item: typeof FAQ[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', marginBottom: 2 }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
        textAlign: 'left', padding: '20px 28px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
        color: 'var(--text)', fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600,
        transition: 'color .2s',
      }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
      >
        {item.q}
        <ChevronDown size={18} color="var(--gold)" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .3s' }} />
      </button>
      {open && (
        <div style={{ padding: '0 28px 20px', fontSize: 14, color: 'var(--text-light)', fontWeight: 300, lineHeight: 1.8 }}>
          {item.r}
        </div>
      )}
    </div>
  )
}

export function CatechesePage() {
  return (
    <>
      <div className="page-hero" style={{ background: undefined }}>
        <div className="page-hero-content">
          <p className="page-hero-eyebrow">Formation de la foi</p>
          <h1>Catéchèse <em style={{ color: 'var(--blue)', fontStyle: 'italic' }}>&amp; Parcours</em></h1>
        </div>
      </div>

      <div style={{ padding: 'var(--space-xl) 0' }}>
        <div className="inner">

          {/* ── Parcours ── */}
          <div className="reveal" style={{ maxWidth: 560, marginBottom: 48 }}>
            <span className="section-label">Nos parcours</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 700, color: 'var(--text)' }}>
              Un chemin pour <em style={{ color: 'var(--blue)', fontStyle: 'italic' }}>chaque âge</em>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 1, background: 'rgba(193,164,97,.08)', marginBottom: 'var(--space-xl)' }}>
            {PARCOURS.map((p, i) => (
              <div key={i} className="reveal" style={{
                background: 'var(--surface)', padding: '36px 28px',
                display: 'flex', flexDirection: 'column', gap: 14,
                position: 'relative', overflow: 'hidden',
                transition: 'background .3s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-alt)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--surface)'}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--gold-dark)' }} />
                <span style={{ fontSize: 9, color: 'var(--accent-dark)', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase' }}>Niveau {p.num}</span>
                <span style={{ fontSize: 32 }}>{p.emoji}</span>
                <span style={{ display: 'inline-block', padding: '4px 12px', border: '1px solid rgba(193,164,97,.25)', fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--blue)', width: 'fit-content' }}>{p.tranche}</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{p.nom}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-light)', fontWeight: 300, lineHeight: 1.7, flex: 1 }}>{p.desc}</p>
                <div style={{ paddingTop: 16, borderTop: '1px solid rgba(193,164,97,.1)', fontSize: 12 }}>
                  <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: 2 }}>{p.horaire}</strong>
                  <span style={{ color: 'var(--text-light)' }}>{p.lieu}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Inscription band ── */}
          <div className="reveal" style={{ background: 'var(--surface)', border: '1px solid var(--border-accent)', padding: 40, marginBottom: 'var(--space-xl)', display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>Inscriptions ouvertes pour 2026–2027</h2>
              <p style={{ fontSize: 14, color: 'var(--text-light)', fontWeight: 300, lineHeight: 1.7 }}>
                Rendez-vous au secrétariat de la paroisse du lundi au vendredi de 9h à 13h. Documents requis : acte de baptême, photo d'identité, carnet de santé pour les enfants.
              </p>
            </div>
            <Link to="/horaires" className="btn-gold" style={{ flexShrink: 0 }}>Nous contacter →</Link>
          </div>

          {/* ── Catéchistes ── */}
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <div className="reveal" style={{ marginBottom: 32 }}>
              <span className="section-label">Notre équipe</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, color: 'var(--text)' }}>
                Les <em style={{ color: 'var(--blue)', fontStyle: 'italic' }}>catéchistes</em>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 1, background: 'rgba(193,164,97,.06)' }}>
              {CATECHISTES.map((c, i) => (
                <div key={i} className="reveal" style={{ background: 'var(--bg-alt)', padding: '32px 24px', textAlign: 'center' }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', border: '1.5px solid rgba(193,164,97,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--blue)', margin: '0 auto 16px' }}>{c.initiale}</div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{c.nom}</h4>
                  <p style={{ fontSize: 12, color: 'var(--accent-dark)', marginBottom: 2 }}>{c.role}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-light)' }}>{c.exp}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── FAQ ── */}
          <div>
            <div className="reveal" style={{ marginBottom: 28 }}>
              <span className="section-label">Questions fréquentes</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 700, color: 'var(--text)' }}>
                Vos <em style={{ color: 'var(--blue)', fontStyle: 'italic' }}>questions</em>
              </h2>
            </div>
            {FAQ.map((item, i) => <FaqItem key={i} item={item} />)}
          </div>

        </div>
      </div>
    </>
  )
}


