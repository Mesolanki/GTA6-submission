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

export type ProjectStage = 'Proposal' | 'Approved' | 'Review-1' | 'Review-2' | 'Final Review' | 'Completed';
export type ProjectStatus = 'Draft' | 'Submitted' | 'Under Review' | 'In Review' | 'Revision Required' | 'Approved' | 'Completed';

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
  stage: ProjectStage;
  description: string;
  dueDate: string;
  weightage: number;
  status: 'Upcoming' | 'Active' | 'Submitted' | 'Graded';
}

export interface EvaluationRubric {
  innovation: number;
  implementation: number;
  progress: number;
  documentation: number;
  presentation: number;
}

export interface Submission {
  id: string;
  projectId: string;
  milestoneId: string;
  milestoneTitle: string;
  stage: ProjectStage;
  submittedBy: string;
  submittedAt: string;
  tasksCompleted: string;
  currentWork: string;
  nextPlan: string;
  progressPercentage: number;
  repoUrl: string;
  liveDemoUrl?: string;
  documentName?: string;
  documentUrl?: string; // Local Object URL / data URL for PDF preview & download
  documentSize?: string;
  notes: string;
  status: 'Pending Review' | 'Revision Required' | 'Approved';
  rubricScore?: EvaluationRubric;
  totalScore?: number;
  mentorFeedback?: string;
  aiSummaryFeedback?: string;
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
  attachmentUrl?: string;
}

export interface KanbanTask {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  assignee: string;
}

export interface MeetingLog {
  id: string;
  date: string;
  topic: string;
  notes: string;
  mentorName: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  problemStatement: string;
  objectives: string;
  sdgTag: string;
  techStack: string[];
  teamName: string;
  teamMembers: TeamMember[];
  mentorId?: string;
  mentorName?: string;
  mentorAvatar?: string;
  status: ProjectStatus;
  currentStage: ProjectStage;
  progressPercentage: number;
  githubUrl: string;
  createdAt: string;
  similarityScore: number;
  milestones: Milestone[];
  submissions: Submission[];
  messages: ChatMessage[];
  kanbanTasks: KanbanTask[];
  meetingLogs: MeetingLog[];
}
