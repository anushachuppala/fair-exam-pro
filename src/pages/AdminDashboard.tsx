import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Shield, LogOut, Users, FileText, AlertTriangle, BarChart3, 
  Plus, Eye, Clock, CheckCircle, XCircle, Mic, MousePointer2
} from 'lucide-react';
import { Exam, ExamResult, ViolationLog } from '@/types/exam';

// Mock data
const mockExams: Exam[] = [
  {
    id: '1',
    title: 'Mathematics Fundamentals',
    subject: 'Mathematics',
    duration: 60,
    difficulty: 'medium',
    totalQuestions: 30,
    status: 'not_started',
    createdAt: '2024-01-15T10:00:00Z',
    description: 'Basic algebra, geometry, and arithmetic',
  },
  {
    id: '2',
    title: 'Physics Concepts',
    subject: 'Physics',
    duration: 45,
    difficulty: 'hard',
    totalQuestions: 25,
    status: 'not_started',
    createdAt: '2024-01-14T09:00:00Z',
    description: 'Mechanics, thermodynamics, waves',
  },
];

const mockResults: ExamResult[] = [
  {
    id: '1',
    examId: '1',
    studentId: 'student1',
    studentName: 'John Doe',
    studentEmail: 'john@example.com',
    score: 85,
    totalQuestions: 30,
    status: 'passed',
    completedAt: '2024-01-15T11:30:00Z',
  },
  {
    id: '2',
    examId: '2',
    studentId: 'student2',
    studentName: 'Jane Smith',
    studentEmail: 'jane@example.com',
    score: 45,
    totalQuestions: 25,
    status: 'failed',
    terminationReason: 'eye_movement',
    completedAt: '2024-01-14T10:15:00Z',
  },
];

const mockViolations: ViolationLog[] = [
  {
    id: '1',
    examId: '2',
    studentId: 'student2',
    studentName: 'Jane Smith',
    studentEmail: 'jane@example.com',
    violationType: 'eye_movement',
    timestamp: '2024-01-14T10:15:00Z',
    description: 'Student looked away from screen repeatedly',
  },
  {
    id: '2',
    examId: '1',
    studentId: 'student3',
    studentName: 'Mike Johnson',
    studentEmail: 'mike@example.com',
    violationType: 'voice_detected',
    timestamp: '2024-01-14T09:45:00Z',
    description: 'Voice detected during exam',
  },
  {
    id: '3',
    examId: '1',
    studentId: 'student4',
    studentName: 'Sarah Wilson',
    studentEmail: 'sarah@example.com',
    violationType: 'right_click',
    timestamp: '2024-01-13T14:20:00Z',
    description: 'Attempted to use right-click menu',
  },
];

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login/admin');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getViolationIcon = (type: ViolationLog['violationType']) => {
    switch (type) {
      case 'eye_movement':
        return <Eye className="w-4 h-4" />;
      case 'voice_detected':
        return <Mic className="w-4 h-4" />;
      case 'right_click':
        return <MousePointer2 className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getViolationLabel = (type: ViolationLog['violationType']) => {
    switch (type) {
      case 'eye_movement':
        return 'Eye Movement';
      case 'voice_detected':
        return 'Voice Detected';
      case 'right_click':
        return 'Right Click';
      case 'tab_switch':
        return 'Tab Switch';
      case 'screen_focus_loss':
        return 'Focus Lost';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Shield className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <span className="font-bold text-lg">ExamGuard</span>
              <span className="text-primary-foreground/60 text-sm ml-2">Admin Panel</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-primary-foreground/80">Administrator</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleLogout}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockExams.length}</p>
                <p className="text-sm text-muted-foreground">Total Exams</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockResults.length}</p>
                <p className="text-sm text-muted-foreground">Students Tested</p>
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
                  {mockResults.filter(r => r.status === 'passed').length}
                </p>
                <p className="text-sm text-muted-foreground">Passed</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockViolations.length}</p>
                <p className="text-sm text-muted-foreground">Violations</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="violations">Violation Logs</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Results</CardTitle>
                  <CardDescription>Latest exam submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockResults.slice(0, 5).map((result) => (
                      <div key={result.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">{result.studentName}</p>
                          <p className="text-sm text-muted-foreground">{result.studentEmail}</p>
                        </div>
                        <Badge className={result.status === 'passed' ? 'bg-success' : 'bg-destructive'}>
                          {result.status === 'passed' ? `${result.score}%` : 'Failed'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Violations</CardTitle>
                  <CardDescription>Latest detected violations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockViolations.slice(0, 5).map((violation) => (
                      <div key={violation.id} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive">
                            {getViolationIcon(violation.violationType)}
                          </div>
                          <div>
                            <p className="font-medium">{violation.studentName}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(violation.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant="destructive">
                          {getViolationLabel(violation.violationType)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Manage Exams</CardTitle>
                  <CardDescription>Create and configure examinations</CardDescription>
                </div>
                <Button variant="secondary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Exam
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockExams.map((exam) => (
                    <div key={exam.id} className="p-4 rounded-lg border border-border">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{exam.title}</h3>
                          <p className="text-sm text-muted-foreground">{exam.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {exam.duration} mins
                            </span>
                            <span>{exam.totalQuestions} questions</span>
                            <Badge variant="secondary">{exam.difficulty}</Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Exam Results</CardTitle>
                <CardDescription>All student exam submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-medium">Student</th>
                        <th className="text-left p-3 font-medium">Email</th>
                        <th className="text-left p-3 font-medium">Score</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockResults.map((result) => (
                        <tr key={result.id} className="border-b border-border last:border-0">
                          <td className="p-3 font-medium">{result.studentName}</td>
                          <td className="p-3 text-muted-foreground">{result.studentEmail}</td>
                          <td className="p-3">{result.score}%</td>
                          <td className="p-3">
                            <Badge className={result.status === 'passed' ? 'bg-success' : 'bg-destructive'}>
                              {result.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {new Date(result.completedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Violations Tab */}
          <TabsContent value="violations">
            <Card>
              <CardHeader>
                <CardTitle>Violation Logs</CardTitle>
                <CardDescription>Complete log of all detected violations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockViolations.map((violation) => (
                    <div key={violation.id} className="p-4 rounded-lg bg-destructive/5 border border-destructive/10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive">
                            {getViolationIcon(violation.violationType)}
                          </div>
                          <div>
                            <p className="font-semibold">{violation.studentName}</p>
                            <p className="text-sm text-muted-foreground">{violation.studentEmail}</p>
                          </div>
                        </div>
                        <Badge variant="destructive">
                          {getViolationLabel(violation.violationType)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{violation.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {new Date(violation.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
