import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Eye, Mic, Monitor, ArrowRight, CheckCircle2 } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-background">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
              <Shield className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">AI-Powered Exam Proctoring</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Secure Online
              <br />
              Exams with{' '}
              <span className="text-primary">AI</span>
              <br />
              <span className="text-primary">Proctoring</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Ensure exam integrity with our advanced AI monitoring system. Real-time detection of cheating behaviors through webcam, audio, and screen analysis.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base font-medium"
                asChild
              >
                <Link to="/login/student">
                  Student Login
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 py-6 text-base font-medium border-2 border-primary text-primary hover:bg-primary/5"
                asChild
              >
                <Link to="/login/admin">
                  Admin Login
                </Link>
              </Button>
            </div>

            {/* Feature Checks */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <span className="text-sm text-muted-foreground">Real-time AI Monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <span className="text-sm text-muted-foreground">Automated Cheating Detection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <span className="text-sm text-muted-foreground">Secure & Fair Exams</span>
              </div>
            </div>
          </div>

          {/* Right Content - Proctoring Interface Mockup */}
          <div className="relative lg:pl-8">
            {/* Status Badge - Top Right */}
            <div className="absolute -top-4 right-0 z-20 bg-card rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 border border-border">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">No Violations</p>
                <p className="text-xs text-muted-foreground">Exam in progress</p>
              </div>
            </div>

            {/* Main Webcam Card */}
            <div className="relative bg-gradient-to-br from-muted/50 to-muted rounded-3xl p-1 shadow-xl">
              {/* Monitoring Active Badge */}
              <div className="absolute top-6 right-6 z-10 flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-medium text-success">Monitoring Active</span>
              </div>

              {/* Webcam Feed Area */}
              <div className="bg-muted/80 rounded-[1.4rem] h-80 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-muted-foreground/10 flex items-center justify-center mb-4">
                  <Eye className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <p className="text-muted-foreground font-medium">Live Webcam Feed</p>
              </div>

              {/* Feature Status Cards */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-card rounded-xl p-4 text-center border border-border shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Eye Tracking</p>
                  <p className="text-xs text-secondary font-medium">Active</p>
                </div>
                <div className="bg-card rounded-xl p-4 text-center border border-border shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <Mic className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Audio</p>
                  <p className="text-xs text-secondary font-medium">Active</p>
                </div>
                <div className="bg-card rounded-xl p-4 text-center border border-border shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <Monitor className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Screen</p>
                  <p className="text-xs text-secondary font-medium">Active</p>
                </div>
              </div>
            </div>

            {/* AI Protected Badge */}
            <div className="absolute -bottom-4 left-8 z-20 bg-card rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2 border border-border">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">AI Protected</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
