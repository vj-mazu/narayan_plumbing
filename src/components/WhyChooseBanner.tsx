import { motion } from 'framer-motion';
import { ShieldCheck, BadgeCheck, Clock, Headset } from 'lucide-react';

const REASONS = [
  { icon: ShieldCheck, title: 'Verified & Experienced', desc: 'Background verified professionals' },
  { icon: BadgeCheck, title: 'Upfront Pricing', desc: 'No hidden charges, transparent pricing' },
  { icon: Clock, title: 'On-Time Service', desc: 'Punctual & reliable service delivery' },
  { icon: Headset, title: '24/7 Customer Support', desc: "We're here to help you anytime" },
];

export function WhyChooseBanner() {
  return (
    <section className="why-choose-section" id="why-us" aria-label="Why Choose Narayan Plumbing">
      <div className="why-choose-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Why Choose Us?
        </motion.h2>

        {/* Banner image — renders the why-choose-banner photo */}
        <motion.div
          className="why-choose-banner-image"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <img
            src="/why-choose-banner.jpg"
            alt="Why Choose Narayan Plumbing Services"
            loading="lazy"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = 'none';
            }}
          />
        </motion.div>

        <motion.div
          className="why-choose-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {REASONS.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              className="why-choose-card"
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
              }}
            >
              <div className="why-choose-icon-box">
                <Icon size={30} strokeWidth={1.6} />
              </div>
              <strong>{title}</strong>
              <span>{desc}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
