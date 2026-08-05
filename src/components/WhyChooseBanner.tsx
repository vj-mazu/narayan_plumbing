import { motion } from 'framer-motion';

export function WhyChooseBanner() {
  return (
    <section className="why-choose-banner" aria-label="Why Choose Narayan Plumbing">
      <div className="why-choose-banner-container">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          WHY CHOOSE NARAYAN PLUMBING SERVICES
        </motion.h2>
        <motion.div 
          className="why-choose-banner-image"
          initial={{ opacity: 0, x: -120, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        >
          <img 
            src="/why-choose-banner.jpg" 
            alt="Why Choose Narayan Plumbing Services"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}

