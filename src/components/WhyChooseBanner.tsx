import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const BANNER_IMAGES = [
  {
    src: '/why-choose/why-choose-banner.webp',
    width: 1200,
    height: 800,
    alt: 'Why choose Narayan Plumbing Services — fast doorstep service, verified experts, transparent pricing, quality work and warranty',
  },
  {
    src: '/why-choose/brands-banner.webp',
    width: 1200,
    height: 800,
    alt: 'Quality brands we work with — Jaquar, Hindware, Cera, Kohler, Grohe, Ashirvad, Supreme, Astral, Finolex and Toto',
  },
];

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 28 },
  viewport: { once: false, amount: 0.15 },
};

export function WhyChooseBanner() {
  return (
    <section className="why-choose-section" id="why-us" aria-label="Why Choose Narayan Plumbing Services">
      <div className="why-choose-container">
        {/* Heading with reveal animation */}
        <motion.div
          className="why-choose-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="why-choose-kicker">
            <Sparkles size={13} /> Why Trust Us?
          </span>
          <h2 className="why-choose-title">WHY CHOOSE US</h2>
          <p className="why-choose-sub">
            Fast, reliable and affordable — trusted by thousands of homes across Bangalore
          </p>
        </motion.div>

        {/* Reference banner images — short & accurate, with reveal animation */}
        <div className="why-choose-image-stack">
          {BANNER_IMAGES.map(({ src, width, height, alt }, index) => (
            <motion.img
              key={src}
              className="why-choose-banner-img"
              src={src}
              width={width}
              height={height}
              alt={alt}
              loading="lazy"
              decoding="async"
              {...reveal}
              transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
