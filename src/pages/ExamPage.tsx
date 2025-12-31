import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Clock, Eye, Mic, AlertTriangle, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'short_answer';
  options?: string[];
}

// Mock questions
const mockQuestions: Question[] = [
  {
    id: '1',
    text: 'What is the primary function of the mitochondria in a cell?',
    type: 'mcq',
    options: [
      'Protein synthesis',
      'Energy production (ATP)',
      'Waste removal',
      'Cell division',
    ],
  },
  {
    id: '2',
    text: 'Which planet is known as the "Red Planet"?',
    type: 'mcq',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
  },
  {
    id: '3',
    text: 'Explain the concept of photosynthesis in your own words.',
    type: 'short_answer',
  },
  {
    id: '4',
    text: 'What is the chemical formula for water?',
    type: 'mcq',
    options: ['H2O', 'CO2', 'NaCl', 'O2'],
  },
  {
    id: '5',
    text: 'Describe one real-world application of artificial intelligence.',
    type: 'short_answer',
  },
];

const ExamPage: React.FC = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [eyeStatus, setEyeStatus] = useState<'looking_forward' | 'looking_away'>('looking_forward');
  const [voiceStatus, setVoiceStatus] = useState<'silent' | 'voice_detected'>('silent');
  const [isTerminated, setIsTerminated] = useState(false);
  const [terminationReason, setTerminationReason] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Terminate exam
  const terminateExam = useCallback((reason: string) => {
    setIsTerminated(true);
    setTerminationReason(reason);
    
    // Stop media streams
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    // Exit fullscreen
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    
    // Show termination message
    toast({
      title: "Exam Terminated",
      description: `Your exam has been terminated due to: ${reason}`,
      variant: "destructive",
    });

    // Logout and redirect after delay
    setTimeout(() => {
      logout();
      navigate('/termination', { 
        state: { reason, studentName: user?.name } 
      });
    }, 3000);
  }, [logout, navigate, toast, user]);

  // Initialize webcam and audio monitoring
  useEffect(() => {
    const initializeProctoring = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        
        streamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Initialize audio context for voice detection
        audioContextRef.current = new AudioContext();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        source.connect(analyserRef.current);

        // Start voice detection loop
        const checkAudio = () => {
          if (!analyserRef.current || isTerminated) return;
          
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          
          const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          
          if (average > 30) { // Threshold for voice detection
            setVoiceStatus('voice_detected');
            terminateExam('Voice detected during exam');
          } else {
            setVoiceStatus('silent');
          }
          
          if (!isTerminated) {
            requestAnimationFrame(checkAudio);
          }
        };
        
        checkAudio();
      } catch (error) {
        console.error('Failed to initialize proctoring:', error);
        terminateExam('Failed to access camera/microphone');
      }
    };

    initializeProctoring();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isTerminated, terminateExam]);

  // Timer
  useEffect(() => {
    if (isTerminated) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-submit on timeout
          navigate('/result', { state: { answers, examId, completed: true } });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTerminated, answers, examId, navigate]);

  // Right-click prevention
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      terminateExam('Right-click detected');
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, [terminateExam]);

  // Tab switch / visibility detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isTerminated) {
        terminateExam('Tab switch or window minimized');
      }
    };

    const handleBlur = () => {
      if (!isTerminated) {
        terminateExam('Window focus lost');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [isTerminated, terminateExam]);

  // Fullscreen detection
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !isTerminated) {
        terminateExam('Exited fullscreen mode');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isTerminated, terminateExam]);

  // Simulate eye detection (in real app, this would use face-api.js or similar)
  useEffect(() => {
    if (isTerminated) return;
    
    // Simulate random eye tracking (replace with actual face detection)
    const eyeCheck = setInterval(() => {
      // In production, use actual face/eye detection here
      const lookingAway = Math.random() > 0.95; // 5% chance simulation
      
      if (lookingAway) {
        setEyeStatus('looking_away');
        terminateExam('Eye movement detected - looking away from screen');
      }
    }, 2000);

    return () => clearInterval(eyeCheck);
  }, [isTerminated, terminateExam]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    navigate('/result', { 
      state: { 
        answers, 
        examId, 
        completed: true,
        studentName: user?.name,
        studentEmail: user?.email,
      } 
    });
  };

  const currentQuestion = mockQuestions[currentQuestionIndex];

  if (isTerminated) {
    return (
      <div className="min-h-screen bg-destructive/10 flex items-center justify-center p-4">
        <Card variant="elevated" className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8">
            <div className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Exam Terminated</h1>
            <p className="text-muted-foreground mb-4">
              Your exam has been terminated due to a rule violation.
            </p>
            <div className="p-4 bg-destructive/10 rounded-lg">
              <p className="text-sm font-medium text-destructive">
                Reason: {terminationReason}
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              You will be logged out shortly...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="bg-primary text-primary-foreground py-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6" />
          <span className="font-semibold">ExamGuard - Live Exam</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className={`font-mono text-lg ${timeLeft < 300 ? 'text-warning' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          
          <div className="hidden sm:block text-right">
            <p className="text-sm opacity-80">Student</p>
            <p className="font-medium">{user?.name}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto p-4 flex gap-4">
        {/* Questions Panel */}
        <div className="flex-1">
          <Card variant="elevated" className="h-full">
            <CardContent className="p-6">
              {/* Question Navigation */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {mockQuestions.length}
                </span>
                <div className="flex gap-2">
                  {mockQuestions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        index === currentQuestionIndex
                          ? 'bg-primary text-primary-foreground'
                          : answers[mockQuestions[index].id]
                          ? 'bg-success/20 text-success'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Content */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-6">{currentQuestion.text}</h2>
                
                {currentQuestion.type === 'mcq' && currentQuestion.options && (
                  <RadioGroup
                    value={answers[currentQuestion.id] || ''}
                    onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                    className="space-y-3"
                  >
                    {currentQuestion.options.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                      >
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {currentQuestion.type === 'short_answer' && (
                  <Textarea
                    placeholder="Type your answer here..."
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    className="min-h-[150px]"
                  />
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentQuestionIndex === mockQuestions.length - 1 ? (
                  <Button variant="secondary" onClick={handleSubmit}>
                    Submit Exam
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentQuestionIndex(prev => Math.min(mockQuestions.length - 1, prev + 1))}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Proctoring Panel */}
        <div className="hidden lg:block w-80 space-y-4">
          {/* Webcam Feed */}
          <Card variant="elevated">
            <CardContent className="p-4">
              <p className="text-sm font-medium mb-2">Live Webcam Feed</p>
              <div className="aspect-video bg-foreground/5 rounded-lg overflow-hidden">
                <video 
                  ref={videoRef}
                  autoPlay 
                  muted 
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>

          {/* Status Indicators */}
          <Card variant="elevated">
            <CardContent className="p-4 space-y-4">
              <p className="text-sm font-medium">Proctoring Status</p>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Eye Direction</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`status-indicator ${eyeStatus === 'looking_forward' ? 'status-success' : 'status-danger'}`} />
                  <span className={`text-xs font-medium ${eyeStatus === 'looking_forward' ? 'text-success' : 'text-destructive'}`}>
                    {eyeStatus === 'looking_forward' ? 'OK' : 'Alert'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Voice Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`status-indicator ${voiceStatus === 'silent' ? 'status-success' : 'status-danger'}`} />
                  <span className={`text-xs font-medium ${voiceStatus === 'silent' ? 'text-success' : 'text-destructive'}`}>
                    {voiceStatus === 'silent' ? 'Silent' : 'Detected'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warning */}
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                You are being monitored. Any violation will immediately terminate the exam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
