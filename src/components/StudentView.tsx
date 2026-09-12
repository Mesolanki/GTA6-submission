import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Project } from '../types';
import {
  AlertCircle,
  Plus,
  MessageSquare,
  UserCheck,
  Award,
  Layers,
  ChevronRight,
  Kanban,
  Calendar,
  ShieldCheck,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { SubmissionModal } from './SubmissionModal';
import { ChatModal } from './ChatModal';
import { KanbanBoardModal } from './KanbanBoardModal';
import { MeetingLogModal } from './MeetingLogModal';

export const StudentView: React.FC = () => {
  const { projects, currentUser } = useApp();

  const myProjects = projects.filter(
    p => p.teamMembers.some(tm => tm.email === currentUser.email) || p.id === 'proj-101'
  );

  const [activeProject, setActiveProject] = useState<Project | null>(myProjects[0] || projects[0] || null);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [kanbanOpen, setKanbanOpen] = useState(false);
  const [meetingLogsOpen, setMeetingLogsOpen] = useState(false);
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | undefined>();

  if (!activeProject && projects.length > 0) {
    setActiveProject(projects[0]);
  }

  const handleOpenSubmission = (milestoneId?: string) => {
    setSelectedMilestoneId(milestoneId);
    setSubmissionModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Graded':
      case 'Completed':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-emerald">{status}</span>;
      case 'Under Review':
      case 'In Review':
      case 'Submitted':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-amber">Under Review</span>;
      case 'Revision Required':
      case 'Needs Revision':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-rose">Revision Required</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-slate">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Student Team Portal</span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Welcome back, {currentUser.name}
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Track 6-stage milestone progress (Proposal &rarr; Approved &rarr; Review-1 &rarr; Review-2 &rarr; Final Review &rarr; Completed), manage task boards, and consult with your mentor.
            </p>
          </div>

          {activeProject && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setKanbanOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors"
              >
                <Kanban className="w-3.5 h-3.5 text-indigo-600" />
                <span>Task Board ({activeProject.kanbanTasks.length})</span>
              </button>

              <button
                onClick={() => setMeetingLogsOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-purple-600" />
                <span>Meeting Logs ({activeProject.meetingLogs.length})</span>
              </button>

              <button
                onClick={() => setChatModalOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mentor Chat ({activeProject.messages.length})</span>
              </button>

              <button
                onClick={() => handleOpenSubmission()}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Submit Work</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Project Selector Tabs */}
      {projects.length > 0 && (
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {projects.map(p => (
            <button
              key={p.id}
              onClick={() => setActiveProject(p)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap ${
                activeProject?.id === p.id
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-900 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>{p.title}</span>
              {getStatusBadge(p.status)}
            </button>
          ))}
        </div>
      )}

      {activeProject && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Column: Project Profile & 6-Stage Milestones */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Active Project Profile Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-semibold text-indigo-700 px-2.5 py-0.5 rounded bg-indigo-50 border border-indigo-200">
                      {activeProject.category}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                      {activeProject.sdgTag}
                    </span>
                    {getStatusBadge(activeProject.status)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-2">{activeProject.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">Team: <strong className="text-slate-800">{activeProject.teamName}</strong></p>
                </div>

                {/* Progress Circle & Unique Check */}
                <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">AI Similarity</div>
                    <div className="text-xs font-bold text-emerald-700 flex items-center justify-end gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> {activeProject.similarityScore}% Unique
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-extrabold shadow-sm">
                    {activeProject.progressPercentage}%
                  </div>
                </div>
              </div>

              {/* Problem Statement & Objectives */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-indigo-900">Problem Statement:</span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">{activeProject.problemStatement}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-purple-900">Objectives & Scope:</span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">{activeProject.objectives}</p>
                </div>
              </div>

              {/* Tech Stack & Code Repo */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.techStack.map((tech, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-xs text-indigo-600 hover:underline font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> <span>GitHub Code Repository</span>
                </a>
              </div>

              {/* Team Members Roster */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeProject.teamMembers.map(tm => (
                  <div key={tm.id} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs space-y-0.5">
                    <div className="font-bold text-slate-900">{tm.name}</div>
                    <div className="text-[10px] text-slate-500">{tm.rollNo} • <span className="text-indigo-600 font-semibold">{tm.roleInTeam}</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6-Stage Milestone Tracker */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">6-Stage Milestone Workflow</h3>
                  <p className="text-xs text-slate-500">Proposal &rarr; Approved &rarr; Review-1 &rarr; Review-2 &rarr; Final Review &rarr; Completed</p>
                </div>
                <button
                  onClick={() => handleOpenSubmission()}
                  className="flex items-center space-x-1 text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Submit Work</span>
                </button>
              </div>

              <div className="space-y-3">
                {activeProject.milestones.map((m, idx) => {
                  const isGraded = m.status === 'Graded';
                  const isSubmitted = m.status === 'Submitted';
                  const isActiveStage = activeProject.currentStage === m.stage;

                  return (
                    <div
                      key={m.id}
                      className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isGraded
                          ? 'bg-emerald-50/60 border-emerald-200'
                          : isSubmitted
                          ? 'bg-amber-50/60 border-amber-200'
                          : isActiveStage
                          ? 'bg-indigo-50/80 border-indigo-200 ring-1 ring-indigo-300'
                          : 'bg-slate-50/50 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full bg-slate-200 text-[11px] font-bold text-slate-700 flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                            {m.weightage}% weight
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 pl-7">{m.description}</p>
                        <div className="text-[11px] text-slate-500 pl-7">Due Date: {m.dueDate}</div>
                      </div>

                      <div className="flex items-center space-x-3 self-end sm:self-center pl-7 sm:pl-0">
                        {getStatusBadge(m.status)}
                        <button
                          onClick={() => handleOpenSubmission(m.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 border border-slate-200 text-indigo-600 shadow-xs flex items-center space-x-1"
                        >
                          <span>Submit</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Sidebar: Mentor Info & Rubric Marks */}
          <div className="space-y-6">
            
            {/* Assigned Mentor Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Assigned Faculty Mentor</h3>
              
              {activeProject.mentorName ? (
                <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <img
                    src={activeProject.mentorAvatar}
                    alt={activeProject.mentorName}
                    className="w-12 h-12 rounded-full ring-2 ring-indigo-500/30 object-cover"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900">{activeProject.mentorName}</div>
                    <div className="text-xs text-indigo-600 flex items-center gap-1 font-semibold">
                      <UserCheck className="w-3.5 h-3.5" /> Faculty Supervisor
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-800 space-y-1">
                  <div className="font-semibold flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 text-amber-600" /> Pending Mentor Assignment
                  </div>
                  <p className="text-[11px] text-amber-700">Academic coordinator will assign your supervisor shortly.</p>
                </div>
              )}

              <button
                onClick={() => setChatModalOpen(true)}
                className="w-full py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 flex items-center justify-center space-x-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>Open Project Chat Room</span>
              </button>
            </div>

            {/* Criteria Marks & AI Feedback Summary */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Evaluation Marks</h3>
                <Award className="w-4 h-4 text-amber-600" />
              </div>

              {activeProject.submissions.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-500">
                  No submissions evaluated yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {activeProject.submissions.map(sub => (
                    <div key={sub.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{sub.milestoneTitle}</span>
                        {sub.totalScore !== undefined ? (
                          <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                            {sub.totalScore} / 100 Marks
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-700 font-medium">Pending Review</span>
                        )}
                      </div>

                      {/* 5-part Rubric */}
                      {sub.rubricScore && (
                        <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600 pt-1 font-mono">
                          <div className="bg-white p-1.5 rounded border border-slate-200">Innov: <strong className="text-indigo-700">{sub.rubricScore.innovation}/20</strong></div>
                          <div className="bg-white p-1.5 rounded border border-slate-200">Impl: <strong className="text-purple-700">{sub.rubricScore.implementation}/20</strong></div>
                          <div className="bg-white p-1.5 rounded border border-slate-200">Prog: <strong className="text-emerald-700">{sub.rubricScore.progress}/20</strong></div>
                          <div className="bg-white p-1.5 rounded border border-slate-200">Docs: <strong className="text-amber-700">{sub.rubricScore.documentation}/20</strong></div>
                          <div className="bg-white p-1.5 rounded border border-slate-200 col-span-2">Pres: <strong className="text-rose-700">{sub.rubricScore.presentation}/20</strong></div>
                        </div>
                      )}

                      {sub.mentorFeedback && (
                        <p className="text-[11px] text-slate-700 bg-white p-2 rounded border border-slate-200 italic">
                          "{sub.mentorFeedback}"
                        </p>
                      )}

                      {sub.aiSummaryFeedback && (
                        <div className="text-[10px] text-purple-900 bg-purple-50 p-2 rounded border border-purple-200 flex items-start space-x-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                          <span>{sub.aiSummaryFeedback}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* Modals */}
      {activeProject && (
        <>
          <SubmissionModal
            project={activeProject}
            isOpen={submissionModalOpen}
            onClose={() => setSubmissionModalOpen(false)}
            preSelectedMilestoneId={selectedMilestoneId}
          />
          <ChatModal
            project={activeProject}
            isOpen={chatModalOpen}
            onClose={() => setChatModalOpen(false)}
          />
          <KanbanBoardModal
            project={activeProject}
            isOpen={kanbanOpen}
            onClose={() => setKanbanOpen(false)}
          />
          <MeetingLogModal
            project={activeProject}
            isOpen={meetingLogsOpen}
            onClose={() => setMeetingLogsOpen(false)}
          />
        </>
      )}

    </div>
  );
};
