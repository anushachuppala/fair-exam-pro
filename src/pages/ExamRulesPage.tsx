import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Camera, Mic, Monitor, AlertTriangle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PermissionStatus {
  camera: 'pending' | 'granted' | 'denied';
  microphone: 'pending' | 'granted' | 'denied';
  fullscreen: 'pending' | 'granted' | 'denied';
}

const ExamRulesPage: React.FC = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [agreed, setAgreed] = useState(false);
  const [permissions, setPermissions] = useState<PermissionStatus>({
    camera: 'pending',
    microphone: 'pending',
    fullscreen: 'pending',
  });
  const [isCheckingPermissions, setIsCheckingPermissions] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login/student');
    }
  }, [user, navigate]);

  const checkPermissions = async () => {
    setIsCheckingPermissions(true);

    try {
      // Request camera and microphone
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      setPermissions(prev => ({
        ...prev,
        camera: 'granted',
        microphone: 'granted',
      }));

      // Show preview in video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Check fullscreen capability
      if (document.documentElement.requestFullscreen) {
        setPermissions(prev => ({ ...prev, fullscreen: 'granted' }));
      }

      toast({
        title: "Permissions Granted",
        description: "All required permissions have been granted.",
      });
    } catch (error) {
      console.error('Permission error:', error);
      
      if ((error as Error).name === 'NotAllowedError') {
        setPermissions(prev => ({
          ...prev,
          camera: 'denied',
          microphone: 'denied',
        }));
        toast({
          title: "Permission Denied",
          description: "Camera and microphone access is required for the exam.",
          variant: "destructive",
        });
      }
    } finally {
      setIsCheckingPermissions(false);
    }
  };

  const allPermissionsGranted = 
    permissions.camera === 'granted' && 
    permissions.microphone === 'granted' && 
    permissions.fullscreen === 'granted';

  const canStartExam = agreed && allPermissionsGranted;

  const handleStartExam = async () => {
    if (!canStartExam) return;

    try {
      // Request fullscreen
      await document.documentElement.requestFullscreen();
      navigate(`/exam/${examId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to enter fullscreen mode. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: 'pending' | 'granted' | 'denied') => {
    switch (status) {
      case 'granted':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'denied':
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />;
    }
  };

  const rules = [
    { icon: Camera, text: 'Your webcam must remain ON throughout the exam' },
    { icon: Mic, text: 'Your microphone must remain ON - any voice will end the exam' },
    { icon: Monitor, text: 'You must look directly at the screen at all times' },
    { icon: AlertTriangle, text: 'Looking away from the screen will immediately terminate the exam' },
    { icon: AlertTriangle, text: 'Any background voice or sound will end the exam' },
    { icon: AlertTriangle, text: 'Right-clicking is strictly prohibited' },
    { icon: AlertTriangle, text: 'Switching tabs or minimizing the window will end the exam' },
  ];

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <Shield className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Exam Preparation</h1>
            <p className="text-muted-foreground">Complete the checklist before starting</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Rules Card */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Exam Rules
              </CardTitle>
              <CardDescription>
                Read carefully - violations result in immediate termination
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rules.map((rule, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <rule.icon className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{rule.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive font-medium">
                  ⚠️ NO WARNINGS. Any violation immediately ends the exam and marks it as FAILED.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Permissions Card */}
          <div className="space-y-6">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>System Check</CardTitle>
                <CardDescription>
                  Grant all permissions to proceed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Camera className="w-5 h-5 text-muted-foreground" />
                      <span>Camera Access</span>
                    </div>
                    {getStatusIcon(permissions.camera)}
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Mic className="w-5 h-5 text-muted-foreground" />
                      <span>Microphone Access</span>
                    </div>
                    {getStatusIcon(permissions.microphone)}
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <Monitor className="w-5 h-5 text-muted-foreground" />
                      <span>Fullscreen Mode</span>
                    </div>
                    {getStatusIcon(permissions.fullscreen)}
                  </div>

                  {!allPermissionsGranted && (
                    <Button 
                      onClick={checkPermissions} 
                      className="w-full"
                      disabled={isCheckingPermissions}
                    >
                      {isCheckingPermissions ? 'Checking...' : 'Check Permissions'}
                    </Button>
                  )}
                </div>

                {/* Camera Preview */}
                {permissions.camera === 'granted' && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Camera Preview:</p>
                    <div className="aspect-video bg-foreground/5 rounded-lg overflow-hidden">
                      <video 
                        ref={videoRef}
                        autoPlay 
                        muted 
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Agreement */}
            <Card variant="elevated">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agree"
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked as boolean)}
                    disabled={!allPermissionsGranted}
                  />
                  <label 
                    htmlFor="agree" 
                    className="text-sm leading-relaxed cursor-pointer"
                  >
                    I have read and understood all the exam rules. I agree to be monitored 
                    during the exam and understand that any violation will result in 
                    immediate termination and failure.
                  </label>
                </div>

                <Button 
                  onClick={handleStartExam}
                  className="w-full mt-6"
                  size="lg"
                  variant="secondary"
                  disabled={!canStartExam}
                >
                  Start Exam
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamRulesPage;
