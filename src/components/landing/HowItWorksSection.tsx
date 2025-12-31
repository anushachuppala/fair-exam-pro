import React from 'react';
import { Card } from '@/components/ui/card';
import { UserPlus, CheckCircle, Play, Shield, BarChart3 } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Student Registration',
    description: 'Students create an account using their email. The system extracts and displays their name throughout the session.',
  },
  {
    number: '02',
    icon: CheckCircle,
    title: 'Permission Checks',
    description: 'Before starting, students must grant webcam, microphone, and full-screen access. All permissions are mandatory.',
  },
  {
    number: '03',
    icon: Play,
    title: 'Start Secure Exam',
    description: 'AI-generated questions appear based on subject and difficulty. The exam runs in locked full-screen mode.',
  },
  {
    number: '04',
    icon: Shield,
    title: 'Real-Time Proctoring',
    description: 'Continuous monitoring of eyes, voice, and activity. Any violation triggers instant exam termination.',
  },
  {
    number: '05',
    icon: BarChart3,
    title: 'Results & Logs',
    description: 'Completed exams show scores. Violations are logged with timestamps for admin review and transparency.',
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Process</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A streamlined process from registration to results, with uncompromising security at every step.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step Number */}
                <div className="relative z-10 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-elevated">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
