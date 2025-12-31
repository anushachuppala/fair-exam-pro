export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  totalQuestions: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'failed';
  createdAt: string;
  description?: string;
}

export interface Question {
  id: string;
  examId: string;
  text: string;
  type: 'mcq' | 'short_answer';
  options?: string[];
  correctAnswer?: string;
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  score: number;
  totalQuestions: number;
  status: 'passed' | 'failed';
  terminationReason?: 'eye_movement' | 'voice_detected' | 'right_click' | 'tab_switch' | null;
  completedAt: string;
}

export interface ViolationLog {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  violationType: 'eye_movement' | 'voice_detected' | 'right_click' | 'tab_switch' | 'screen_focus_loss';
  timestamp: string;
  description: string;
}

export interface ProctorStatus {
  webcamActive: boolean;
  microphoneActive: boolean;
  eyeStatus: 'looking_forward' | 'looking_away' | 'unknown';
  voiceStatus: 'silent' | 'voice_detected';
  isFullscreen: boolean;
}
