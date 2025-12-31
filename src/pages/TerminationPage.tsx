import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, XCircle, Home } from 'lucide-react';

const TerminationPage: React.FC = () => {
  const location = useLocation();
  const { reason, studentName } = location.state || { reason: 'Unknown violation', studentName: 'Student' };

  return (
    <div className="min-h-screen bg-destructive/5 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--destructive)) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <Card variant="elevated" className="max-w-lg w-full relative z-10 animate-scale-in">
        <CardContent className="pt-12 pb-10 text-center">
          {/* Warning Icon */}
          <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-8">
            <AlertTriangle className="w-12 h-12 text-destructive animate-pulse" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-destructive mb-2">
            Exam Terminated
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your exam has been terminated due to violation of exam rules.
          </p>

          {/* Student Info */}
          <div className="mb-8 p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">Student</p>
            <p className="font-semibold text-lg">{studentName}</p>
          </div>

          {/* Violation Details */}
          <div className="mb-8 p-6 rounded-xl bg-destructive/10 border border-destructive/20">
            <div className="flex items-center justify-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-destructive" />
              <span className="font-semibold text-destructive">Violation Reason</span>
            </div>
            <p className="text-foreground">{reason}</p>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-destructive text-destructive-foreground font-bold text-lg mb-8">
            <XCircle className="w-5 h-5" />
            EXAM FAILED
          </div>

          {/* Info Text */}
          <p className="text-sm text-muted-foreground mb-8">
            This incident has been logged and reported to the exam administrator.
            You cannot reattempt this exam.
          </p>

          {/* Action Button */}
          <Button asChild variant="outline" size="lg">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TerminationPage;
