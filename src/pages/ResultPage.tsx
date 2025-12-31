import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, Home, Award, FileText } from 'lucide-react';

const ResultPage: React.FC = () => {
  const location = useLocation();
  const { answers = {}, completed = false, studentName = 'Student', studentEmail = '' } = location.state || {};

  // Calculate mock score
  const totalQuestions = 5;
  const answeredQuestions = Object.keys(answers).length;
  const score = Math.round((answeredQuestions / totalQuestions) * 100);
  const passed = score >= 60;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${passed ? 'bg-success/5' : 'bg-destructive/5'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--${passed ? 'success' : 'destructive'})) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <Card variant="elevated" className="max-w-lg w-full relative z-10 animate-scale-in">
        <CardContent className="pt-12 pb-10 text-center">
          {/* Result Icon */}
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${passed ? 'bg-success/10' : 'bg-destructive/10'}`}>
            {passed ? (
              <Award className="w-12 h-12 text-success" />
            ) : (
              <XCircle className="w-12 h-12 text-destructive" />
            )}
          </div>

          {/* Title */}
          <h1 className={`text-3xl font-bold mb-2 ${passed ? 'text-success' : 'text-destructive'}`}>
            {passed ? 'Congratulations!' : 'Exam Not Passed'}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {passed 
              ? 'You have successfully completed the exam.'
              : 'Unfortunately, you did not achieve the passing score.'
            }
          </p>

          {/* Student Info */}
          <div className="mb-8 p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">Student</p>
            <p className="font-semibold text-lg">{studentName}</p>
            {studentEmail && (
              <p className="text-sm text-muted-foreground">{studentEmail}</p>
            )}
          </div>

          {/* Score Display */}
          <div className="mb-8">
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full border-8 ${passed ? 'border-success' : 'border-destructive'}`}>
              <div className="text-center">
                <p className={`text-4xl font-bold ${passed ? 'text-success' : 'text-destructive'}`}>
                  {score}%
                </p>
                <p className="text-xs text-muted-foreground uppercase">Score</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold">{answeredQuestions}</p>
              <p className="text-sm text-muted-foreground">Answered</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-2xl font-bold">{totalQuestions}</p>
              <p className="text-sm text-muted-foreground">Total Questions</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-lg mb-8 ${passed ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}`}>
            {passed ? (
              <>
                <CheckCircle className="w-5 h-5" />
                PASSED
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5" />
                FAILED
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/dashboard">
                <FileText className="w-4 h-4 mr-2" />
                View All Exams
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultPage;
