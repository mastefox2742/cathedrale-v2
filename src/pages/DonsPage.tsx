import { useState } from 'react'

const MONTANTS = [1000, 5000, 10000, 25000]

const CANAUX = [
  { icon: '📱', titre: 'Mobile Money', desc: 'Envoyez votre don via MTN Mobile Money ou Airtel Money. Rapide, sécurisé, disponible 24h/24.', infos: [['MTN MoMo', '+242 06 000 00 02'], ['Airtel Money', '+242 05 000 00 03'], ['Nom bénéficiaire', 'Cathédrale Sacré-Cœur']] },
  { icon: '🏦', titre: 'Virement Bancaire', desc: 'Effectuez un virement depuis votre banque. Idéal pour les dons réguliers ou montants importants.', infos: [['Banque', 'BGFI Bank Congo'], ['Titulaire', 'Archidiocèse de Brazzaville'], ['RIB', 'CG00 12345 00001 12345678901']] },
  { icon: '💵', titre: 'En Espèces', desc: 'Déposez votre offrande au secrétariat paroissial ou dans les troncs lors des messes.', infos: [['Secrétariat', 'Lun–Ven, 9h–13h'], ['Quête dominicale', 'Chaque messe'], ['Troncs', 'Ouverts en permanence']] },
  { icon: '💌', titre: 'Don Régulier', desc: 'Planifiez un don mensuel ou un legs. Contactez-nous pour en parler confidentiellement.', infos: [['Email', 'dons@sacrecoeur-brazza.cg'], ['Tél', '+242 06 000 00 00'], ['Rendez-vous', 'Sur demande, confidentiel']] },
]

const CAUSES = [
  { pct: 40, titre: 'Entretien &amp; Restauration de la Cathédrale', desc: 'Conservation du patrimoine architectural, vitraux, toiture et maintenance. Notre cathédrale a plus de 130 ans.', accent: true },
  { pct: 30, titre: 'Mission d\'Évangélisation &amp; Catéchèse', desc: 'Financement des programmes de catéchèse, de l\'Académie des laïcs, retraites et activités pastorales.' },
  { pct: 20, titre: 'Aide aux Familles Défavorisées', desc: 'Distributions alimentaires, aide scolaire, soutien aux malades et personnes âgées dans le besoin.' },
  { pct: 10, titre: 'Fonctionnement Paroissial', desc: 'Personnel pastoral, frais administratifs, communication et charges nécessaires à la vie quotidienne.' },
]

export function DonsPage() {
  const [selected, setSelected] = useState<number | null>(1000)
  const [custom, setCustom] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const montant = custom ? parseInt(custom) : selected
    if (!montant || !nom || !email) return
    setSending(true)
    // Simulation envoi — à remplacer par un appel API / Firebase
    await new Promise(r => setTimeout(r, 900))
    setSent(true)
    setSending(false)
  }

  return (
    <>
      <div className="page-hero" style={{  textAlign: 'center' }}>
        <div className="page-hero-content" style={{ textAlign: 'center', maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <p className="page-hero-eyebrow" style={{ justifyContent: 'center' }}>Générosité &amp; Solidarité</p>
          <h1>Faire un Don<br /><em style={{ color: 'var(--blue)', fontStyle: 'italic' }}>pour l'œuvre de Dieu</em></h1>
          <p style={{ marginTop: 16, fontSize: 15, color: 'var(--text-light)', fontWeight: 300, maxWidth: 500, margin: '16px auto 0', lineHeight: 1.8 }}>
            Vos dons soutiennent l'entretien de notre cathédrale, nos missions et l'aide aux plus démunis de Brazzaville.
          </p>
        </div>
      </div>

      <div style={{ padding: 'var(--space-xl) 0' }}>
        <div className="inner">

          {/* ── Sélecteur montant ── */}
          <div className="reveal" style={{ maxWidth: 640, margin: '0 auto var(--space-xl)' }}>
            <p style={{ textAlign: 'center', marginBottom: 24 }}>
              <span className="section-label" style={{ justifyContent: 'center' }}>Choisir un montant</span>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'rgba(193,164,97,.1)', marginBottom: 8 }}>
              {MONTANTS.map(m => (
                <button key={m} onClick={() => { setSelected(m); setCustom('') }} style={{
                  background: selected === m && !custom ? 'var(--gold)' : 'var(--anthracite)',
                  border: 'none', cursor: 'pointer', padding: '22px 8px', textAlign: 'center',
                  fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700,
                  color: selected === m && !custom ? 'var(--black)' : 'var(--white)',
                  transition: 'all .2s',
                }}>
                  {m.toLocaleString('fr-FR')}
                  <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 400, opacity: .7, marginTop: 2 }}>FCFA</span>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: 'var(--surface)', border: '1px solid var(--border-accent)', marginBottom: 28 }}>
              <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-light)', flexShrink: 0 }}>Montant libre</label>
              <input
                type="number" min="100" value={custom} placeholder="Entrez un montant"
                onChange={e => { setCustom(e.target.value); setSelected(null) }}
                className="dark-input" style={{ flex: 1, padding: '8px 4px', fontSize: 18, fontFamily: 'var(--font-serif)', fontWeight: 700 }}
              />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue)', flexShrink: 0 }}>FCFA</span>
            </div>

            {/* Formulaire de promesse */}
            {!sent ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <input required value={nom} onChange={e => setNom(e.target.value)} placeholder="Votre nom" className="dark-input" />
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Votre email" className="dark-input" />
                </div>
                <button type="submit" className="btn-gold" style={{ justifyContent: 'center', opacity: sending ? .7 : 1 }} disabled={sending}>
                  {sending ? 'Envoi…' : '✦ Confirmer ma promesse de don'}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px', background: 'rgba(193,164,97,.08)', border: '1px solid rgba(193,164,97,.2)' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--blue)', marginBottom: 8 }}>✦ Merci pour votre générosité</p>
                <p style={{ fontSize: 13, color: 'var(--text-light)' }}>Nous vous contacterons pour les modalités de versement.</p>
              </div>
            )}
          </div>

          {/* ── Canaux ── */}
          <div className="reveal" style={{ marginBottom: 32 }}>
            <span className="section-label">Comment donner</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px,3vw,38px)', fontWeight: 700, color: 'var(--text)' }}>
              Choisissez <em style={{ color: 'var(--blue)', fontStyle: 'italic' }}>votre canal</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 1, background: 'rgba(193,164,97,.06)', marginBottom: 'var(--space-xl)' }}>
            {CANAUX.map((c, i) => (
              <div key={i} className="reveal dark-card" style={{ padding: '36px 28px' }}>
                <span style={{ fontSize: 30, display: 'block', marginBottom: 16 }}>{c.icon}</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>{c.titre}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-light)', fontWeight: 300, lineHeight: 1.7, marginBottom: 18 }}>{c.desc}</p>
                <div style={{ background: 'rgba(193,164,97,.05)', border: '1px solid var(--border)', padding: '14px 16px' }}>
                  {c.infos.map(([k, v], j) => (
                    <div key={j} style={{ display: 'flex', gap: 8, fontSize: 12, marginBottom: j < c.infos.length - 1 ? 6 : 0 }}>
                      <strong style={{ color: 'var(--blue)', fontWeight: 600, minWidth: 100 }}>{k} :</strong>
                      <span style={{ color: 'var(--text)' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Affectation ── */}
          <div className="reveal" style={{ marginBottom: 32 }}>
            <span className="section-label">Transparence</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px,3vw,38px)', fontWeight: 700, color: 'var(--text)' }}>
              À quoi servent <em style={{ color: 'var(--blue)', fontStyle: 'italic' }}>vos dons ?</em>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 'var(--space-xl)' }}>
            {CAUSES.map((c, i) => (
              <div key={i} className="reveal" style={{ display: 'grid', gridTemplateColumns: '4px 1fr auto', alignItems: 'stretch', background: 'var(--surface)', border: `1px solid ${c.accent ? 'rgba(193,164,97,.2)' : 'rgba(193,164,97,.07)'}` }}>
                <div style={{ background: c.accent ? 'var(--gold)' : 'var(--gold-dark)' }} />
                <div style={{ padding: '24px 28px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }} dangerouslySetInnerHTML={{ __html: c.titre }} />
                  <p style={{ fontSize: 13, color: 'var(--text-light)', fontWeight: 300, lineHeight: 1.7 }}>{c.desc}</p>
                </div>
                <div style={{ padding: '24px 28px', borderLeft: '1px solid rgba(193,164,97,.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 90 }}>
                  <strong style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--blue)' }}>{c.pct}%</strong>
                  <span style={{ fontSize: 10, color: 'var(--text-light)', textAlign: 'center', marginTop: 2 }}>des dons</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Verset ── */}
          <div className="verse-band reveal" style={{ marginBottom: 0 }}>
            <blockquote>
              « Donnez et il vous sera donné. C'est une bonne mesure, tassée, secouée, débordante, qu'on versera dans le pan de votre vêtement. »
              <cite className="verse-ref">— Luc 6, 38</cite>
            </blockquote>
          </div>

        </div>
      </div>
    </>
  )
}


