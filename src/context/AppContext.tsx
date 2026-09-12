import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Project, Role, User, Submission, EvaluationRubric, KanbanTask, MeetingLog, ProjectStage } from '../types';
import { currentUserMock, mentorsListMock, adminMock, initialProjectsMock } from '../data/mockData';

interface AppContextType {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  currentUser: User;
  projects: Project[];
  mentors: User[];
  registerProject: (projectData: Partial<Project>) => number; // Returns AI similarity score
  assignMentor: (projectId: string, mentorId: string) => void;
  submitProgressWork: (projectId: string, milestoneId: string, submissionData: Partial<Submission>) => void;
  evaluateSubmission: (
    projectId: string,
    submissionId: string,
    rubric: EvaluationRubric,
    status: 'Approved' | 'Revision Required',
    feedback: string
  ) => void;
  sendMessage: (projectId: string, messageText: string, attachmentName?: string) => void;
  addKanbanTask: (projectId: string, title: string, assignee: string) => void;
  toggleKanbanTask: (projectId: string, taskId: string, newStatus: 'todo' | 'in_progress' | 'done') => void;
  addMeetingLog: (projectId: string, topic: string, notes: string) => void;
  deleteProject: (projectId: string) => void;
  getProjectById: (projectId: string) => Project | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<Role>('student');
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('gta6_portal_projects_v2');
    return saved ? JSON.parse(saved) : initialProjectsMock;
  });

  useEffect(() => {
    localStorage.setItem('gta6_portal_projects_v2', JSON.stringify(projects));
  }, [projects]);

  // Derived user based on active role
  const currentUser: User =
    currentRole === 'student'
      ? currentUserMock
      : currentRole === 'mentor'
      ? mentorsListMock[0]
      : adminMock;

  // AI Duplicate / Similarity Detection algorithm
  const calculateDuplicateSimilarity = (title: string, description: string): number => {
    let maxSim = 0;
    const titleWords = title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const descWords = description.toLowerCase().split(/\s+/).filter(w => w.length > 3);

    projects.forEach(p => {
      const existingWords = (p.title + ' ' + p.problemStatement).toLowerCase().split(/\s+/);
      let matches = 0;
      titleWords.forEach(w => {
        if (existingWords.includes(w)) matches++;
      });
      descWords.forEach(w => {
        if (existingWords.includes(w)) matches += 0.5;
      });

      const sim = Math.min(95, Math.round((matches / (titleWords.length + 5)) * 100));
      if (sim > maxSim) maxSim = sim;
    });

    return maxSim;
  };

  const registerProject = (data: Partial<Project>): number => {
    const simScore = calculateDuplicateSimilarity(data.title || '', data.problemStatement || '');

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: data.title || 'Untitled Project',
      category: data.category || 'General CS',
      problemStatement: data.problemStatement || 'Problem statement details.',
      objectives: data.objectives || 'Project objectives.',
      sdgTag: data.sdgTag || 'SDG 9: Industry, Innovation & Infrastructure',
      techStack: data.techStack || ['React', 'Node.js'],
      teamName: data.teamName || 'Innovators',
      teamMembers: data.teamMembers || [
        { id: `tm-${Date.now()}`, name: currentUser.name, email: currentUser.email, rollNo: 'CS2024-001', roleInTeam: 'Team Leader' }
      ],
      mentorId: data.mentorId,
      mentorName: data.mentorId ? mentorsListMock.find(m => m.id === data.mentorId)?.name : undefined,
      mentorAvatar: data.mentorId ? mentorsListMock.find(m => m.id === data.mentorId)?.avatar : undefined,
      status: data.mentorId ? 'Under Review' : 'Submitted',
      currentStage: 'Proposal',
      progressPercentage: 10,
      githubUrl: data.githubUrl || 'https://github.com',
      createdAt: new Date().toISOString().split('T')[0],
      similarityScore: simScore,
      milestones: [
        { id: `m-${Date.now()}-1`, title: 'Stage 1: Proposal / Idea Charter', stage: 'Proposal', description: 'Problem statement & tech stack approval.', dueDate: '2026-09-20', weightage: 15, status: 'Submitted' },
        { id: `m-${Date.now()}-2`, title: 'Stage 2: Proposal Approval', stage: 'Approved', description: 'Faculty charter signoff & mentor allocation.', dueDate: '2026-09-25', weightage: 10, status: 'Upcoming' },
        { id: `m-${Date.now()}-3`, title: 'Stage 3: Review-1 Prototype', stage: 'Review-1', description: 'Working prototype & core architecture build.', dueDate: '2026-10-05', weightage: 25, status: 'Upcoming' },
        { id: `m-${Date.now()}-4`, title: 'Stage 4: Review-2 Optimization', stage: 'Review-2', description: 'Feature expansion & performance optimization.', dueDate: '2026-10-20', weightage: 25, status: 'Upcoming' },
        { id: `m-${Date.now()}-5`, title: 'Stage 5: Final Review', stage: 'Final Review', description: 'Defense presentation & system audit.', dueDate: '2026-11-01', weightage: 15, status: 'Upcoming' },
        { id: `m-${Date.now()}-6`, title: 'Stage 6: Project Completion', stage: 'Completed', description: 'Final project publication.', dueDate: '2026-11-10', weightage: 10, status: 'Upcoming' }
      ],
      submissions: [],
      messages: [],
      kanbanTasks: [
        { id: `kt-init-1`, title: 'Draft SRS Specification', status: 'done', assignee: currentUser.name },
        { id: `kt-init-2`, title: 'Setup GitHub Repository', status: 'in_progress', assignee: currentUser.name }
      ],
      meetingLogs: []
    };

    setProjects(prev => [newProj, ...prev]);
    return simScore;
  };

  const assignMentor = (projectId: string, mentorId: string) => {
    const selectedMentor = mentorsListMock.find(m => m.id === mentorId);
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const updatedMilestones = p.milestones.map(m =>
            m.stage === 'Approved' && m.status === 'Upcoming' ? { ...m, status: 'Active' as const } : m
          );
          return {
            ...p,
            mentorId: selectedMentor?.id,
            mentorName: selectedMentor?.name,
            mentorAvatar: selectedMentor?.avatar,
            status: p.status === 'Submitted' ? 'Under Review' : p.status,
            milestones: updatedMilestones
          };
        }
        return p;
      })
    );
  };

  const submitProgressWork = (projectId: string, milestoneId: string, submissionData: Partial<Submission>) => {
    const now = new Date();
    const timestamp = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0].substring(0, 5)}`;

    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const targetMilestone = p.milestones.find(m => m.id === milestoneId);
          const milestoneStage: ProjectStage = targetMilestone ? targetMilestone.stage : 'Proposal';

          const newSubmission: Submission = {
            id: `sub-${Date.now()}`,
            projectId,
            milestoneId,
            milestoneTitle: targetMilestone ? targetMilestone.title : 'Progress Submission',
            stage: milestoneStage,
            submittedBy: currentUser.name,
            submittedAt: timestamp,
            tasksCompleted: submissionData.tasksCompleted || 'Completed initial module tasks.',
            currentWork: submissionData.currentWork || 'Refactoring codebase.',
            nextPlan: submissionData.nextPlan || 'Prepare benchmark metrics.',
            progressPercentage: submissionData.progressPercentage || p.progressPercentage,
            repoUrl: submissionData.repoUrl || p.githubUrl,
            liveDemoUrl: submissionData.liveDemoUrl,
            documentName: submissionData.documentName || 'Milestone_Deliverable.pdf',
            notes: submissionData.notes || '',
            status: 'Pending Review'
          };

          const updatedMilestones = p.milestones.map(m =>
            m.id === milestoneId ? { ...m, status: 'Submitted' as const } : m
          );

          return {
            ...p,
            status: 'Under Review',
            currentStage: milestoneStage,
            progressPercentage: Math.max(p.progressPercentage, submissionData.progressPercentage || p.progressPercentage),
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
    status: 'Approved' | 'Revision Required',
    feedback: string
  ) => {
    const totalScore = rubric.innovation + rubric.implementation + rubric.progress + rubric.documentation + rubric.presentation;
    const now = new Date();
    const timestamp = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0].substring(0, 5)}`;

    // AI Summary generator
    const aiSummary = `AI Summary: ${status} (${totalScore}/100). Innovation: ${rubric.innovation}/20, Impl: ${rubric.implementation}/20, Progress: ${rubric.progress}/20. Key note: ${feedback.substring(0, 80)}...`;

    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          let targetMilestoneId = '';
          let targetStage: ProjectStage = p.currentStage;

          const updatedSubmissions = p.submissions.map(sub => {
            if (sub.id === submissionId) {
              targetMilestoneId = sub.milestoneId;
              targetStage = sub.stage;
              return {
                ...sub,
                status,
                rubricScore: rubric,
                totalScore,
                mentorFeedback: feedback,
                aiSummaryFeedback: aiSummary,
                evaluatedAt: timestamp
              };
            }
            return sub;
          });

          // Milestone progression mapping
          const nextStageMap: Record<ProjectStage, ProjectStage> = {
            'Proposal': 'Approved',
            'Approved': 'Review-1',
            'Review-1': 'Review-2',
            'Review-2': 'Final Review',
            'Final Review': 'Completed',
            'Completed': 'Completed'
          };

          const newCurrentStage = status === 'Approved' ? nextStageMap[targetStage] : targetStage;

          const updatedMilestones = p.milestones.map(m => {
            if (m.id === targetMilestoneId) {
              return {
                ...m,
                status: status === 'Approved' ? ('Graded' as const) : ('Active' as const)
              };
            }
            if (status === 'Approved' && m.stage === newCurrentStage) {
              return {
                ...m,
                status: 'Active' as const
              };
            }
            return m;
          });

          // Calculate total overall percentage
          const gradedCount = updatedMilestones.filter(m => m.status === 'Graded').length;
          const calculatedProgress = Math.round((gradedCount / updatedMilestones.length) * 100);

          return {
            ...p,
            status: status === 'Approved' ? (newCurrentStage === 'Completed' ? 'Completed' : 'Approved') : 'Revision Required',
            currentStage: newCurrentStage,
            progressPercentage: Math.max(p.progressPercentage, calculatedProgress),
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
      prev.map(p => (p.id === projectId ? { ...p, messages: [...p.messages, newMsg] } : p))
    );
  };

  const addKanbanTask = (projectId: string, title: string, assignee: string) => {
    const newTask: KanbanTask = {
      id: `kt-${Date.now()}`,
      title,
      status: 'todo',
      assignee
    };
    setProjects(prev =>
      prev.map(p => (p.id === projectId ? { ...p, kanbanTasks: [...p.kanbanTasks, newTask] } : p))
    );
  };

  const toggleKanbanTask = (projectId: string, taskId: string, newStatus: 'todo' | 'in_progress' | 'done') => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            kanbanTasks: p.kanbanTasks.map(t => (t.id === taskId ? { ...t, status: newStatus } : t))
          };
        }
        return p;
      })
    );
  };

  const addMeetingLog = (projectId: string, topic: string, notes: string) => {
    const now = new Date().toISOString().split('T')[0];
    const targetProject = projects.find(p => p.id === projectId);
    const newLog: MeetingLog = {
      id: `ml-${Date.now()}`,
      date: now,
      topic,
      notes,
      mentorName: targetProject?.mentorName || currentUser.name
    };
    setProjects(prev =>
      prev.map(p => (p.id === projectId ? { ...p, meetingLogs: [newLog, ...p.meetingLogs] } : p))
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
        submitProgressWork,
        evaluateSubmission,
        sendMessage,
        addKanbanTask,
        toggleKanbanTask,
        addMeetingLog,
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
