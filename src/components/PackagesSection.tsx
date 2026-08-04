import { useState, useRef, useEffect } from 'react';
import { Check, Sparkles } from 'lucide-react';
import type { ServicePackage } from '../types';

interface PackagesSectionProps {
  packages: ServicePackage[];
  onSelectPackage: (packageName: string) => void;
}

export function PackagesSection({ packages, onSelectPackage }: PackagesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridEl = gridRef.current;
    if (!gridEl) return;

    const handleScroll = () => {
      const scrollLeft = gridEl.scrollLeft;
      const cardWidth = gridEl.children[0]?.clientWidth || 300;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex >= 0 && newIndex < packages.length) {
        setActiveIndex(newIndex);
      }
    };

    gridEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => gridEl.removeEventListener('scroll', handleScroll);
  }, [packages.length]);

  const scrollToPackage = (index: number) => {
    setActiveIndex(index);
    if (gridRef.current && gridRef.current.children[index]) {
      gridRef.current.children[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  return (
    <section className="packages-section" id="packages">
      <div className="packages-header">
        <span className="section-kicker">Save More</span>
        <div className="section-heading">
          <span className="section-line" aria-hidden="true" />
          <h2>SERVICE PACKAGES</h2>
          <span className="section-line" aria-hidden="true" />
        </div>
        <p className="section-subtitle">
          Bundled care plans with transparent pricing — pick the package that fits your home.
        </p>
      </div>

      <div className="packages-grid" ref={gridRef}>
        {packages.map((pkg) => (
          <article
            key={pkg.name}
            className={`package-card ${pkg.popular ? 'popular' : ''}`}
          >
            {pkg.popular && (
              <span className="package-popular-badge">
                <Sparkles size={14} />
                Most Popular
              </span>
            )}
            <h3>{pkg.name}</h3>
            <div className="package-pricing">
              <strong>{pkg.price}</strong>
              <del>{pkg.originalPrice}</del>
              <span>incl. visit &amp; labour</span>
            </div>
            <ul className="package-features">
              {pkg.features.map((feature) => (
                <li key={feature}>
                  <Check size={16} aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="package-cta"
              onClick={() => onSelectPackage(pkg.name)}
            >
              BOOK THIS PACKAGE
            </button>
          </article>
        ))}
      </div>

      {/* Navigation Dots for Packages */}
      <div className="packages-dots" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 20 }}>
        {packages.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToPackage(index)}
            aria-label={`Go to package ${index + 1}`}
            style={{
              width: index === activeIndex ? 24 : 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: index === activeIndex ? '#ff6200' : '#ccc',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
