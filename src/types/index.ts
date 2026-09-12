export type Role = 'student' | 'mentor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  department: string;
  title?: string;
}

export type ProjectStatus = 'Draft' | 'Submitted' | 'In Review' | 'Needs Revision' | 'Approved' | 'Completed';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  roleInTeam: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  weightage: number; // percentage e.g. 20%
  status: 'Upcoming' | 'Active' | 'Submitted' | 'Graded';
}

export interface EvaluationRubric {
  codeQuality: number; // max 25
  documentation: number; // max 25
  innovation: number; // max 25
  presentation: number; // max 25
}

export interface Submission {
  id: string;
  projectId: string;
  milestoneId: string;
  milestoneTitle: string;
  submittedBy: string;
  submittedAt: string;
  repoUrl: string;
  liveDemoUrl?: string;
  documentName?: string;
  notes: string;
  status: 'Pending Review' | 'Needs Revision' | 'Approved';
  rubricScore?: EvaluationRubric;
  totalScore?: number; // out of 100
  mentorFeedback?: string;
  evaluatedAt?: string;
}

export interface ChatMessage {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  senderRole: Role;
  senderAvatar: string;
  message: string;
  timestamp: string;
  attachmentName?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  teamName: string;
  teamMembers: TeamMember[];
  mentorId?: string;
  mentorName?: string;
  mentorAvatar?: string;
  status: ProjectStatus;
  progressPercentage: number;
  githubUrl: string;
  createdAt: string;
  milestones: Milestone[];
  submissions: Submission[];
  messages: ChatMessage[];
}
