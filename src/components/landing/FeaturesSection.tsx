import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Mic, MousePointer2, Monitor, Brain, ShieldCheck, Zap, Lock } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Eye Direction Detection',
    description: 'Advanced AI continuously monitors eye movement. Looking away triggers immediate exam termination.',
    color: 'text-secondary',
  },
  {
    icon: Mic,
    title: 'Voice Detection',
    description: 'Microphone monitoring detects any speech or background voices. Zero tolerance for verbal communication.',
    color: 'text-destructive',
  },
  {
    icon: MousePointer2,
    title: 'Right-Click Prevention',
    description: 'Context menu disabled. Any right-click attempt instantly ends the exam with logged violation.',
    color: 'text-warning',
  },
  {
    icon: Monitor,
    title: 'Tab Switch Detection',
    description: 'Leaving the exam window or switching tabs triggers immediate termination and failure.',
    color: 'text-primary',
  },
  {
    icon: Brain,
    title: 'AI-Generated Questions',
    description: 'OpenAI powers dynamic question generation based on subject, difficulty, and exam duration.',
    color: 'text-accent',
  },
  {
    icon: ShieldCheck,
    title: 'Instant Termination',
    description: 'No warnings. Any violation immediately ends the exam, logs the student out, and marks as FAILED.',
    color: 'text-destructive',
  },
  {
    icon: Zap,
    title: 'Real-Time Monitoring',
    description: 'Live webcam feed with status indicators. Students see their own compliance status continuously.',
    color: 'text-success',
  },
  {
    icon: Lock,
    title: 'Secure Session',
    description: 'Full-screen mode enforced. All browser shortcuts disabled. Complete exam environment lockdown.',
    color: 'text-primary',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Uncompromising Exam Security
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered proctoring system uses multiple detection methods to ensure complete exam integrity. Any violation results in immediate termination.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              variant="elevated"
              className="group hover:border-secondary/30 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
