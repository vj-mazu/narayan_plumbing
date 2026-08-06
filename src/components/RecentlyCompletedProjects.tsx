import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  sub: string;
  src: string;
}

const PROJECTS: Project[] = [
  {
    id: 'ceiling',
    title: 'False Ceiling Work',
    sub: 'Before → After',
    src: '/work-ceiling-cove.webp',
  },
  {
    id: 'bathroom',
    title: 'Bathroom Renovation',
    sub: 'Before → After',
    src: '/work-bathroom-blue.webp',
  },
  {
    id: 'civil',
    title: 'Civil Work',
    sub: 'Before → After',
    src: '/work-civil.webp',
  },
  {
    id: 'interior',
    title: 'Interior Design',
    sub: 'Before → After',
    src: '/work-interior-living.webp',
  },
];

export function RecentlyCompletedProjects() {
  return (
    <section className="projects-section" id="projects" aria-label="Recently Completed Projects">
      <div className="projects-container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="projects-kicker">
            <Sparkles size={13} /> Our Recent Work
          </span>
          <h2 className="projects-title">Recently Completed Projects</h2>
          <p className="projects-sub">
            Real projects delivered on time with premium materials & clean finishing
          </p>
        </motion.div>

        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              viewport={{ once: false, amount: 0.12 }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: 'easeOut' }}
            >
              <div className="project-photo-box">
                <img
                  src={project.src}
                  width={900}
                  height={720}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                  }}
                />
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <span className="project-done">{project.sub}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
