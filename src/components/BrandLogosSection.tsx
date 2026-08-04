const BRANDS = [
  { name: 'Jaquar', desc: 'Sanitaryware & Faucets', color: '#006B5E' },
  { name: 'Hindware', desc: 'Bath & Kitchen', color: '#E21C24' },
  { name: 'Cera', desc: 'Sanitaryware', color: '#005EA6' },
  { name: 'Kohler', desc: 'Luxury Bath', color: '#000000' },
  { name: 'Grohe', desc: 'German Fittings', color: '#002D62' },
  { name: 'Ashirvad', desc: 'CPVC Pipes', color: '#E31E24' },
  { name: 'Supreme', desc: 'PVC & CPVC', color: '#E31E24' },
  { name: 'Astral', desc: 'Piping Leader', color: '#005691' },
  { name: 'Finolex', desc: 'Quality Pipes', color: '#1B499B' },
  { name: 'Toto', desc: 'Japanese Sanitary', color: '#000000' },
];

export function BrandLogosSection() {
  return (
    <section className="brands-section">
      <div className="brands-container">
        <h2>TRUSTED BRANDS WE WORK WITH</h2>
        <p className="brands-subtitle">We install and service products from the industry's leading manufacturers</p>
        
        <div className="brands-grid">
          {BRANDS.map((brand) => (
            <div key={brand.name} className="brand-card">
              <strong className="brand-name" style={{ color: brand.color }}>{brand.name}</strong>
              <span className="brand-card-desc">{brand.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
