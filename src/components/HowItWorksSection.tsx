const steps = [
  {
    number: 1,
    title: 'Select Service',
    description: 'Choose the service you need',
    icon: '📋',
  },
  {
    number: 2,
    title: 'Book',
    description: 'Schedule at your convenient time',
    icon: '📅',
  },
  {
    number: 3,
    title: 'We Arrive',
    description: 'Our expert will arrive on time',
    icon: '🛵',
  },
  {
    number: 4,
    title: 'Get It Done',
    description: 'We do the job professionally',
    icon: '🔧',
  },
  {
    number: 5,
    title: 'Pay & Relax',
    description: 'Pay securely & relax',
    icon: '💳',
  },
];

export function HowItWorksSection() {
  return (
    <section className="how-it-works-section">
      <div className="section-heading">
        <span className="section-line" aria-hidden="true" />
        <h2>HOW IT WORKS</h2>
        <span className="section-line" aria-hidden="true" />
      </div>
      
      <div className="how-it-works-container">
        {steps.map((step, index) => {
          return (
            <div key={step.number} className="how-it-works-step">
              <div className="step-icon-wrapper">
                <div className="step-icon-circle">
                  <span className={`step-icon-emoji ${step.icon === '🛵' ? 'step-icon-scooter' : ''}`}>{step.icon}</span>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="step-arrow">→</div>
              )}
              
              <div className="step-content">
                <div className="step-number">{step.number}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
