import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldAlert, XCircle, AlertTriangle } from 'lucide-react';

const violations = [
  {
    type: 'Eye Movement',
    description: 'Looking away from screen or face not centered',
    consequence: 'Immediate termination',
  },
  {
    type: 'Voice Detected',
    description: 'Speaking or background audio above threshold',
    consequence: 'Immediate termination',
  },
  {
    type: 'Right-Click',
    description: 'Any attempt to open context menu',
    consequence: 'Immediate termination',
  },
  {
    type: 'Tab Switch',
    description: 'Leaving exam window or changing tabs',
    consequence: 'Immediate termination',
  },
];

const SecuritySection: React.FC = () => {
  return (
    <section id="security" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Security Policy</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Zero Tolerance Policy
            </h2>
            <p className="text-muted-foreground mb-8">
              Our system enforces strict exam integrity. There are no warnings or second chances. 
              Any detected violation immediately terminates the exam, logs out the student, and 
              marks the result as <strong className="text-destructive">FAILED</strong>.
            </p>

            <div className="space-y-4">
              {violations.map((violation, index) => (
                <Card
                  key={violation.type}
                  variant="outline"
                  className="border-destructive/20 bg-destructive/5 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <XCircle className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{violation.type}</h4>
                      <p className="text-sm text-muted-foreground">{violation.description}</p>
                      <span className="text-xs font-semibold text-destructive uppercase mt-1 inline-block">
                        {violation.consequence}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            <Card variant="glass" className="p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
                    <ShieldAlert className="w-8 h-8 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Violation Detected</h3>
                    <p className="text-muted-foreground">Eye movement deviation</p>
                  </div>
                </div>

                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <span className="font-semibold text-destructive">Exam Terminated</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your exam has been terminated due to violation of exam rules. 
                    This incident has been logged.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <span className="text-xs text-muted-foreground uppercase">Status</span>
                    <p className="font-bold text-destructive">FAILED</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <span className="text-xs text-muted-foreground uppercase">Action</span>
                    <p className="font-bold text-foreground">Auto Logout</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
