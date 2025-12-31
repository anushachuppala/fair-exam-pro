import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, LogOut, Clock, BookOpen, CheckCircle, XCircle, Play } from 'lucide-react';
import { Exam } from '@/types/exam';

// Mock exams data
const mockExams: Exam[] = [
  {
    id: '1',
    title: 'Mathematics Fundamentals',
    subject: 'Mathematics',
    duration: 60,
    difficulty: 'medium',
    totalQuestions: 30,
    status: 'not_started',
    createdAt: new Date().toISOString(),
    description: 'Basic algebra, geometry, and arithmetic operations',
  },
  {
    id: '2',
    title: 'Physics Concepts',
    subject: 'Physics',
    duration: 45,
    difficulty: 'hard',
    totalQuestions: 25,
    status: 'completed',
    createdAt: new Date().toISOString(),
    description: 'Mechanics, thermodynamics, and wave physics',
  },
  {
    id: '3',
    title: 'General Knowledge',
    subject: 'General',
    duration: 30,
    difficulty: 'easy',
    totalQuestions: 20,
    status: 'failed',
    createdAt: new Date().toISOString(),
    description: 'Current affairs and general awareness',
  },
];

const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/login/student');
    }
  }, [user, navigate]);

  if (!user) return null;

  const getStatusBadge = (status: Exam['status']) => {
    switch (status) {
      case 'not_started':
        return <Badge variant="secondary">Not Started</Badge>;
      case 'in_progress':
        return <Badge className="bg-warning text-warning-foreground">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
    }
  };

  const getDifficultyColor = (difficulty: Exam['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'hard':
        return 'text-destructive';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">ExamGuard</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
          <p className="text-muted-foreground">
            View your available exams and track your progress below.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockExams.length}</p>
                <p className="text-sm text-muted-foreground">Total Exams</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockExams.filter(e => e.status === 'completed').length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockExams.filter(e => e.status === 'failed').length}
                </p>
                <p className="text-sm text-muted-foreground">Failed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exams List */}
        <Card>
          <CardHeader>
            <CardTitle>Available Exams</CardTitle>
            <CardDescription>
              Click "Start Exam" to begin a proctored examination
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockExams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{exam.title}</h3>
                        {getStatusBadge(exam.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {exam.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {exam.duration} mins
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {exam.totalQuestions} questions
                        </span>
                        <span className={`capitalize font-medium ${getDifficultyColor(exam.difficulty)}`}>
                          {exam.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {exam.status === 'not_started' ? (
                        <Button asChild variant="secondary">
                          <Link to={`/exam/${exam.id}/rules`}>
                            <Play className="w-4 h-4 mr-2" />
                            Start Exam
                          </Link>
                        </Button>
                      ) : exam.status === 'completed' ? (
                        <Button variant="outline" disabled>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </Button>
                      ) : (
                        <Button variant="outline" disabled>
                          <XCircle className="w-4 h-4 mr-2" />
                          Failed
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StudentDashboard;
