const FORMATIONS = [
  { num: 'I', tag: 'Bible', titre: 'Introduction à la Sainte Écriture', desc: 'Découverte des deux Testaments, grandes figures bibliques et méthodes d\'interprétation catholique. Accessible à tous, aucun prérequis.', horaire: 'Lundi 18h – 19h30', lieu: 'Salle Saint-Augustin' },
  { num: 'II', tag: 'Théologie', titre: 'Fondements de la Foi Catholique', desc: 'Exploration du Credo, des sacrements, de l\'Église et de la doctrine sociale. Cours structuré sur 8 modules de 2h.', horaire: 'Jeudi 18h – 20h', lieu: 'Salle Saint-Thomas' },
  { num: 'III', tag: 'Prière', titre: 'École de Prière — Lectio Divina', desc: 'Initiation à la prière biblique méditée selon la tradition de la Lectio Divina. Silence, lecture et partage fraternel.', horaire: 'Vendredi 17h30 – 19h', lieu: 'Chapelle latérale' },
  { num: 'IV', tag: 'Doctrine', titre: 'Doctrine Sociale de l\'Église', desc: 'Étude des encycliques et grands principes — dignité de la personne, bien commun, solidarité, subsidiarité — appliqués au Congo.', horaire: 'Samedi 9h – 11h', lieu: 'Salle paroissiale' },
]

const GROUPES = [
  { icon: '📿', titre: 'Chapelet du Rosaire', desc: 'Récitation communautaire chaque soir avant la messe. Méditation des mystères joyeux, douloureux et glorieux.', horaire: 'Lun–Ven · 18h00' },
  { icon: '🕊️', titre: 'Mouvement des Jeunes', desc: 'Rencontres hebdomadaires de prière, partage et engagement social pour les 16–35 ans. Activités caritatives et évangélisation.', horaire: 'Dimanche · 15h00' },
  { icon: '👨‍👩‍👧', titre: 'Communautés de Base', desc: 'Petits groupes de quartier pour la prière, l\'entraide et la lecture de la Parole. Tisser des liens fraternels.', horaire: 'Mercredi · par quartier' },
  { icon: '🎵', titre: 'Schola Cantorum', desc: 'Chorale liturgique de la cathédrale. Répétitions hebdomadaires. Ouvert à toute personne ayant des notions de chant choral.', horaire: 'Mardi · 18h30 – 20h30' },
  { icon: '✋', titre: 'Service Caritas', desc: 'Action caritative — distributions alimentaires, visites aux malades, soutien aux familles en difficulté de Brazzaville.', horaire: 'Samedi · 8h00' },
  { icon: '📖', titre: 'Partage Biblique', desc: 'Lecture et méditation de l\'Évangile du dimanche en petit groupe. Chacun partage ce que la Parole lui dit pour sa vie.', horaire: 'Vendredi · 19h00' },
]

export function VieSpirituellePage() {
  return (
    <>
      <div className="page-hero" style={{ background: undefined }}>
        <div className="page-hero-content">
          <p className="page-hero-eyebrow">Ressourcement &amp; Formation</p>
          <h1>Vie <em style={{ color: 'var(--blue)', fontStyle: 'italic' }}>Spirituelle</em></h1>
        </div>
      </div>

      {/* Citation */}
      <div className="verse-band">
        <blockquote>
          La vie spirituelle n'est pas une fuite du monde, mais une plongée plus profonde dans la réalité de Dieu au cœur de notre vie.
          <cite className="verse-ref">— Père Jean-Baptiste, aumônier de la cathédrale</cite>
        </blockquote>
      </div>

      <div style={{ padding: 'var(--space-xl) 0' }}>
        <div className="inner">

          {/* ── Formations ── */}
          <div className="reveal" style={{ maxWidth: 560, marginBottom: 48 }}>
            <span className="section-label">Académie des laïcs</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 700, color: 'var(--text)' }}>
              Formations <em style={{ color: 'var(--blue)', fontStyle: 'italic' }}>théologiques</em>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 'var(--space-xl)' }}>
            {FORMATIONS.map((f, i) => (
              <div key={i} className="reveal" style={{
                display: 'grid', gridTemplateColumns: '64px 1fr auto',
                alignItems: 'stretch', gap: 0,
                background: 'var(--surface)', border: '1px solid var(--border)',
                transition: 'border-color .2s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(193,164,97,.2)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(193,164,97,.07)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'rgba(193,164,97,.2)', borderRight: '1px solid rgba(193,164,97,.08)' }}>{f.num}</div>
                <div style={{ padding: '28px 28px' }}>
                  <span style={{ display: 'block', fontSize: 9, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 6 }}>{f.tag}</span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 600, color: 'var(--text)', marginBottom: 8, lineHeight: 1.3 }}>{f.titre}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-light)', fontWeight: 300, lineHeight: 1.7 }}>{f.desc}</p>
                </div>
                <div style={{ padding: '28px 24px', borderLeft: '1px solid rgba(193,164,97,.08)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 5, minWidth: 160 }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, color: 'var(--blue)', textAlign: 'right' }}>{f.horaire}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-light)', textAlign: 'right' }}>{f.lieu}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Groupes ── */}
          <div className="reveal" style={{ maxWidth: 560, marginBottom: 48 }}>
            <span className="section-label">Groupes et mouvements</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 700, color: 'var(--text)' }}>
              Vivre la foi <em style={{ color: 'var(--blue)', fontStyle: 'italic' }}>en communauté</em>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 1, background: 'rgba(193,164,97,.06)' }}>
            {GROUPES.map((g, i) => (
              <div key={i} className="reveal" style={{ background: 'var(--bg-alt)', padding: '36px 28px', display: 'flex', flexDirection: 'column', gap: 12, transition: 'background .3s' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--surface)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--dark)'}
              >
                <span style={{ fontSize: 30 }}>{g.icon}</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 600, color: 'var(--text)' }}>{g.titre}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-light)', fontWeight: 300, lineHeight: 1.7, flex: 1 }}>{g.desc}</p>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-dark)', letterSpacing: '.04em' }}>{g.horaire}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}


