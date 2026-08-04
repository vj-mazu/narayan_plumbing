export function BrandLogosSection() {
  return (
    <section className="brands-section">
      <div className="brands-container">
        <h2>TRUSTED BRANDS WE WORK WITH</h2>
        <p className="brands-subtitle">We install and service products from the industry's leading manufacturers</p>
        
        <div className="brands-grid">
          {/* Jaquar Logo */}
          <div className="brand-card">
            <svg viewBox="0 0 100 24" width="110" height="28" fill="#0d0d0d">
              <text x="0" y="18" fontFamily="Arial Black, Impact, sans-serif" fontSize="18" fontWeight="bold">Jaquar</text>
            </svg>
            <span className="brand-card-desc">Sanitaryware &amp; Faucets</span>
          </div>

          {/* Hindware Logo */}
          <div className="brand-card">
            <svg viewBox="0 0 100 24" width="110" height="28" fill="#e21c24">
              <text x="0" y="18" fontFamily="Arial, Helvetica, sans-serif" fontSize="16" fontWeight="900" letterSpacing="-0.5">hindware</text>
            </svg>
            <span className="brand-card-desc">Bath &amp; Kitchen</span>
          </div>

          {/* Cera Logo */}
          <div className="brand-card">
            <svg viewBox="0 0 100 24" width="110" height="28" fill="#005ea6">
              <text x="0" y="18" fontFamily="Trebuchet MS, sans-serif" fontSize="18" fontWeight="bold" fontStyle="italic">CERA</text>
            </svg>
            <span className="brand-card-desc">Sanitaryware</span>
          </div>

          {/* Kohler Logo */}
          <div className="brand-card">
            <svg viewBox="0 0 100 24" width="110" height="28" fill="#000">
              <text x="0" y="18" fontFamily="Century Gothic, sans-serif" fontSize="18" fontWeight="bold" letterSpacing="1">KOHLER</text>
            </svg>
            <span className="brand-card-desc">Luxury Bath</span>
          </div>

          {/* Grohe Logo */}
          <div className="brand-card">
            <svg viewBox="0 0 100 24" width="110" height="28" fill="#002d62">
              <text x="0" y="18" fontFamily="Futura, sans-serif" fontSize="17" fontWeight="bold">GROHE</text>
            </svg>
            <span className="brand-card-desc">German Fittings</span>
          </div>

          {/* Ashirvad Pipes Logo */}
          <div className="brand-card">
            <svg viewBox="0 0 120 24" width="115" height="28">
              <text x="0" y="18" fill="#1b499b" fontFamily="Impact, sans-serif" fontSize="15" fontWeight="bold">ashirvad</text>
              <rect x="74" y="6" width="36" height="12" fill="#e31e24" rx="2" />
              <text x="78" y="15" fill="#fff" fontFamily="Arial" fontSize="9" fontWeight="bold">PIPES</text>
            </svg>
            <span className="brand-card-desc">CPVC Pipes</span>
          </div>

          {/* Supreme Pipes Logo */}
          <div className="brand-card">
            <svg viewBox="0 0 100 24" width="110" height="28" fill="#e31e24">
              <text x="0" y="18" fontFamily="Arial Black, Impact, sans-serif" fontSize="17" fontWeight="bold">Supreme</text>
            </svg>
            <span className="brand-card-desc">PVC &amp; CPVC</span>
          </div>

          {/* Astral Pipes Logo */}
          <div className="brand-card">
            <svg viewBox="0 0 100 24" width="110" height="28" fill="#005691">
              <text x="0" y="18" fontFamily="Arial Black, sans-serif" fontSize="18" fontWeight="bold" letterSpacing="-1">ASTRAL</text>
            </svg>
            <span className="brand-card-desc">Piping Leader</span>
          </div>

          {/* Finolex Pipes Logo */}
          <div className="brand-card">
            <svg viewBox="0 0 100 24" width="110" height="28" fill="#1b499b">
              <text x="0" y="18" fontFamily="Impact, sans-serif" fontSize="18" letterSpacing="0.5">Finolex</text>
            </svg>
            <span className="brand-card-desc">Quality Pipes</span>
          </div>

          {/* Toto Logo */}
          <div className="brand-card">
            <svg viewBox="0 0 100 24" width="110" height="28" fill="#000">
              <text x="0" y="18" fontFamily="Century Gothic, sans-serif" fontSize="19" fontWeight="bold" letterSpacing="2">TOTO</text>
            </svg>
            <span className="brand-card-desc">Japanese Sanitary</span>
          </div>
        </div>
      </div>
    </section>
  );
}
