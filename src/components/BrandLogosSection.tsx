export function BrandLogosSection() {
  return (
    <section className="brands-section">
      <div className="brands-container">
        <h2>TRUSTED BRANDS WE WORK WITH</h2>
        <p className="brands-subtitle">We install and service products from the industry's leading manufacturers</p>
        
        <div className="brands-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {/* Jaquar Logo */}
          <div className="brand-card" style={{ padding: 24, textAlign: 'center', background: '#fff', borderRadius: 12, border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 100 24" width="120" height="30" fill="#0d0d0d">
              <text x="0" y="18" fontFamily="Arial Black, Impact, sans-serif" fontSize="18" fontWeight="bold">Jaquar</text>
            </svg>
            <span style={{ fontSize: '0.78rem', color: '#666', marginTop: 8 }}>Sanitaryware &amp; Faucets</span>
          </div>

          {/* Hindware Logo */}
          <div className="brand-card" style={{ padding: 24, textAlign: 'center', background: '#fff', borderRadius: 12, border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 100 24" width="120" height="30" fill="#e21c24">
              <text x="0" y="18" fontFamily="Arial, Helvetica, sans-serif" fontSize="16" fontWeight="900" letterSpacing="-0.5">hindware</text>
            </svg>
            <span style={{ fontSize: '0.78rem', color: '#666', marginTop: 8 }}>Bath &amp; Kitchen Fittings</span>
          </div>

          {/* Cera Logo */}
          <div className="brand-card" style={{ padding: 24, textAlign: 'center', background: '#fff', borderRadius: 12, border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 100 24" width="120" height="30" fill="#005ea6">
              <text x="0" y="18" fontFamily="Trebuchet MS, sans-serif" fontSize="18" fontWeight="bold" fontStyle="italic">CERA</text>
            </svg>
            <span style={{ fontSize: '0.78rem', color: '#666', marginTop: 8 }}>Sanitaryware solutions</span>
          </div>

          {/* Kohler Logo */}
          <div className="brand-card" style={{ padding: 24, textAlign: 'center', background: '#fff', borderRadius: 12, border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 100 24" width="120" height="30" fill="#000">
              <text x="0" y="18" fontFamily="Century Gothic, sans-serif" fontSize="18" fontWeight="bold" letterSpacing="1">KOHLER</text>
            </svg>
            <span style={{ fontSize: '0.78rem', color: '#666', marginTop: 8 }}>Luxury bathroom products</span>
          </div>

          {/* Grohe Logo */}
          <div className="brand-card" style={{ padding: 24, textAlign: 'center', background: '#fff', borderRadius: 12, border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 100 24" width="120" height="30" fill="#002d62">
              <text x="0" y="18" fontFamily="Futura, sans-serif" fontSize="17" fontWeight="bold">GROHE</text>
            </svg>
            <span style={{ fontSize: '0.78rem', color: '#666', marginTop: 8 }}>German bathroom &amp; kitchen</span>
          </div>

          {/* Ashirvad Pipes Logo */}
          <div className="brand-card" style={{ padding: 24, textAlign: 'center', background: '#fff', borderRadius: 12, border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 120 24" width="130" height="30">
              <text x="0" y="18" fill="#1b499b" fontFamily="Impact, sans-serif" fontSize="15" fontWeight="bold">ashirvad</text>
              <rect x="74" y="6" width="36" height="12" fill="#e31e24" rx="2" />
              <text x="78" y="15" fill="#fff" fontFamily="Arial" fontSize="9" fontWeight="bold">PIPES</text>
            </svg>
            <span style={{ fontSize: '0.78rem', color: '#666', marginTop: 8 }}>CPVC plumbing pipes</span>
          </div>

          {/* Supreme Pipes Logo */}
          <div className="brand-card" style={{ padding: 24, textAlign: 'center', background: '#fff', borderRadius: 12, border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 100 24" width="120" height="30" fill="#e31e24">
              <text x="0" y="18" fontFamily="Arial Black, Impact, sans-serif" fontSize="17" fontWeight="bold">Supreme</text>
            </svg>
            <span style={{ fontSize: '0.78rem', color: '#666', marginTop: 8 }}>PVC &amp; CPVC solutions</span>
          </div>

          {/* Astral Pipes Logo */}
          <div className="brand-card" style={{ padding: 24, textAlign: 'center', background: '#fff', borderRadius: 12, border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 100 24" width="120" height="30" fill="#005691">
              <text x="0" y="18" fontFamily="Arial Black, sans-serif" fontSize="18" fontWeight="bold" letterSpacing="-1">ASTRAL</text>
            </svg>
            <span style={{ fontSize: '0.78rem', color: '#666', marginTop: 8 }}>Piping system leader</span>
          </div>

          {/* Finolex Pipes Logo */}
          <div className="brand-card" style={{ padding: 24, textAlign: 'center', background: '#fff', borderRadius: 12, border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 100 24" width="120" height="30" fill="#1b499b">
              <text x="0" y="18" fontFamily="Impact, sans-serif" fontSize="18" letterSpacing="0.5">Finolex</text>
            </svg>
            <span style={{ fontSize: '0.78rem', color: '#666', marginTop: 8 }}>Quality piping products</span>
          </div>

          {/* Toto Logo */}
          <div className="brand-card" style={{ padding: 24, textAlign: 'center', background: '#fff', borderRadius: 12, border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 100 24" width="120" height="30" fill="#000">
              <text x="0" y="18" fontFamily="Century Gothic, sans-serif" fontSize="19" fontWeight="bold" letterSpacing="2">TOTO</text>
            </svg>
            <span style={{ fontSize: '0.78rem', color: '#666', marginTop: 8 }}>Japanese sanitaryware</span>
          </div>
        </div>
      </div>
    </section>
  );
}
