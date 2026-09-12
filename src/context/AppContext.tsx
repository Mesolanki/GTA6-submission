import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Project, Role, User, Submission, EvaluationRubric } from '../types';
import { currentUserMock, mentorsListMock, adminMock, initialProjectsMock } from '../data/mockData';

interface AppContextType {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  currentUser: User;
  projects: Project[];
  mentors: User[];
  registerProject: (projectData: Partial<Project>) => void;
  assignMentor: (projectId: string, mentorId: string) => void;
  submitMilestoneWork: (projectId: string, milestoneId: string, submissionData: Partial<Submission>) => void;
  evaluateSubmission: (
    projectId: string,
    submissionId: string,
    rubric: EvaluationRubric,
    status: 'Approved' | 'Needs Revision',
    feedback: string
  ) => void;
  sendMessage: (projectId: string, messageText: string, attachmentName?: string) => void;
  deleteProject: (projectId: string) => void;
  getProjectById: (projectId: string) => Project | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<Role>('student');
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('gta6_portal_projects');
    return saved ? JSON.parse(saved) : initialProjectsMock;
  });

  useEffect(() => {
    localStorage.setItem('gta6_portal_projects', JSON.stringify(projects));
  }, [projects]);

  // Derived user based on active role
  const currentUser: User =
    currentRole === 'student'
      ? currentUserMock
      : currentRole === 'mentor'
      ? mentorsListMock[0]
      : adminMock;

  const registerProject = (data: Partial<Project>) => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: data.title || 'Untitled Project',
      category: data.category || 'General CS',
      description: data.description || '',
      techStack: data.techStack || ['React', 'Node.js'],
      teamName: data.teamName || 'Innovators',
      teamMembers: data.teamMembers || [
        { id: `tm-${Date.now()}`, name: currentUser.name, email: currentUser.email, rollNo: 'STUDENT-01', roleInTeam: 'Team Lead' }
      ],
      mentorId: data.mentorId,
      mentorName: data.mentorId ? mentorsListMock.find(m => m.id === data.mentorId)?.name : undefined,
      mentorAvatar: data.mentorId ? mentorsListMock.find(m => m.id === data.mentorId)?.avatar : undefined,
      status: 'Submitted',
      progressPercentage: 15,
      githubUrl: data.githubUrl || 'https://github.com',
      createdAt: new Date().toISOString().split('T')[0],
      milestones: [
        { id: `m-${Date.now()}-1`, title: 'Project SRS & Design Charter', description: 'System requirements and system design document.', dueDate: '2026-09-25', weightage: 25, status: 'Active' },
        { id: `m-${Date.now()}-2`, title: 'Alpha Prototype & Code Sync', description: 'Core functional codebase build.', dueDate: '2026-10-10', weightage: 35, status: 'Upcoming' },
        { id: `m-${Date.now()}-3`, title: 'Final Defense & Live Portal Demo', description: 'End to end feature verification.', dueDate: '2026-10-30', weightage: 40, status: 'Upcoming' }
      ],
      submissions: [],
      messages: []
    };

    setProjects(prev => [newProj, ...prev]);
  };

  const assignMentor = (projectId: string, mentorId: string) => {
    const selectedMentor = mentorsListMock.find(m => m.id === mentorId);
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            mentorId: selectedMentor?.id,
            mentorName: selectedMentor?.name,
            mentorAvatar: selectedMentor?.avatar
          };
        }
        return p;
      })
    );
  };

  const submitMilestoneWork = (projectId: string, milestoneId: string, submissionData: Partial<Submission>) => {
    const now = new Date();
    const timestamp = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0].substring(0, 5)}`;

    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const targetMilestone = p.milestones.find(m => m.id === milestoneId);
          const newSubmission: Submission = {
            id: `sub-${Date.now()}`,
            projectId,
            milestoneId,
            milestoneTitle: targetMilestone ? targetMilestone.title : 'Milestone Submission',
            submittedBy: currentUser.name,
            submittedAt: timestamp,
            repoUrl: submissionData.repoUrl || p.githubUrl,
            liveDemoUrl: submissionData.liveDemoUrl,
            documentName: submissionData.documentName || 'Milestone_Deliverables.pdf',
            notes: submissionData.notes || '',
            status: 'Pending Review'
          };

          const updatedMilestones = p.milestones.map(m =>
            m.id === milestoneId ? { ...m, status: 'Submitted' as const } : m
          );

          return {
            ...p,
            status: 'In Review',
            milestones: updatedMilestones,
            submissions: [newSubmission, ...p.submissions]
          };
        }
        return p;
      })
    );
  };

  const evaluateSubmission = (
    projectId: string,
    submissionId: string,
    rubric: EvaluationRubric,
    status: 'Approved' | 'Needs Revision',
    feedback: string
  ) => {
    const totalScore = rubric.codeQuality + rubric.documentation + rubric.innovation + rubric.presentation;
    const now = new Date();
    const timestamp = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0].substring(0, 5)}`;

    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          let targetMilestoneId = '';
          const updatedSubmissions = p.submissions.map(sub => {
            if (sub.id === submissionId) {
              targetMilestoneId = sub.milestoneId;
              return {
                ...sub,
                status,
                rubricScore: rubric,
                totalScore,
                mentorFeedback: feedback,
                evaluatedAt: timestamp
              };
            }
            return sub;
          });

          // Update milestone status
          const updatedMilestones = p.milestones.map(m => {
            if (m.id === targetMilestoneId) {
              return {
                ...m,
                status: status === 'Approved' ? ('Graded' as const) : ('Active' as const)
              };
            }
            return m;
          });

          // Recalculate project overall progress
          const gradedCount = updatedMilestones.filter(m => m.status === 'Graded').length;
          const progressPercentage = Math.round((gradedCount / updatedMilestones.length) * 100);

          return {
            ...p,
            status: status === 'Approved' ? 'Approved' : 'Needs Revision',
            progressPercentage: Math.max(p.progressPercentage, progressPercentage),
            milestones: updatedMilestones,
            submissions: updatedSubmissions
          };
        }
        return p;
      })
    );
  };

  const sendMessage = (projectId: string, messageText: string, attachmentName?: string) => {
    const now = new Date();
    const timestamp = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0].substring(0, 5)}`;

    const newMsg = {
      id: `msg-${Date.now()}`,
      projectId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentRole,
      senderAvatar: currentUser.avatar,
      message: messageText,
      timestamp,
      attachmentName
    };

    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            messages: [...p.messages, newMsg]
          };
        }
        return p;
      })
    );
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const getProjectById = (projectId: string) => projects.find(p => p.id === projectId);

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentUser,
        projects,
        mentors: mentorsListMock,
        registerProject,
        assignMentor,
        submitMilestoneWork,
        evaluateSubmission,
        sendMessage,
        deleteProject,
        getProjectById
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
