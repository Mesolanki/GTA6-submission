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
  roleInTeam: string; // e.g. Team Leader, Lead Developer, UI Designer
}

export interface Milestone {
  id: string;
  title: string;
  stage: ProjectStage;
  description: string;
  dueDate: string;
  weightage: number; // e.g. 20%
  status: 'Upcoming' | 'Active' | 'Submitted' | 'Graded';
}

export interface EvaluationRubric {
  innovation: number;      // max 20
  implementation: number; // max 20
  progress: number;       // max 20
  documentation: number;  // max 20
  presentation: number;   // max 20
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
  notes: string;
  status: 'Pending Review' | 'Revision Required' | 'Approved';
  rubricScore?: EvaluationRubric;
  totalScore?: number; // out of 100
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
  sdgTag: string; // Sustainable Development Goal (e.g., "SDG 9: Industry, Innovation & Infrastructure")
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
  similarityScore: number; // AI Duplicate check % (0-100)
  milestones: Milestone[];
  submissions: Submission[];
  messages: ChatMessage[];
  kanbanTasks: KanbanTask[];
  meetingLogs: MeetingLog[];
}
