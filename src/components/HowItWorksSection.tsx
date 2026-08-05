import { ClipboardList, CalendarDays, Bike, Wrench, CreditCard, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Select Service',
    description: 'Choose the service you need',
    icon: <ClipboardList size={40} strokeWidth={1.5} />,
  },
  {
    number: 2,
    title: 'Book',
    description: 'Schedule at your convenient time',
    icon: <CalendarDays size={40} strokeWidth={1.5} />,
  },
  {
    number: 3,
    title: 'We Arrive',
    description: 'Our expert will arrive on time',
    icon: <Bike size={40} strokeWidth={1.5} />,
  },
  {
    number: 4,
    title: 'Get It Done',
    description: 'We do the job professionally',
    icon: <Wrench size={40} strokeWidth={1.5} />,
  },
  {
    number: 5,
    title: 'Pay & Relax',
    description: 'Pay securely & relax',
    icon: <CreditCard size={40} strokeWidth={1.5} />,
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
        {steps.map((step, index) => (
          <div key={step.number} className="hiw-step-wrapper">
            <div className="hiw-step">
              <div className="hiw-icon-box">
                {step.icon}
              </div>
              <div className="hiw-step-number">{step.number}</div>
              <h3 className="hiw-step-title">{step.title}</h3>
              <p className="hiw-step-desc">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="hiw-arrow">
                <ArrowRight size={24} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
