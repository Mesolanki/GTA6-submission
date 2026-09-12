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
  ChevronRight
} from 'lucide-react';
import { SubmissionModal } from './SubmissionModal';
import { ChatModal } from './ChatModal';

export const StudentView: React.FC = () => {
  const { projects, currentUser } = useApp();

  // Filter projects where current student is team lead or member, or show all for demo
  const myProjects = projects.filter(
    p => p.teamMembers.some(tm => tm.email === currentUser.email) || p.id === 'proj-101'
  );

  const [activeProject, setActiveProject] = useState<Project | null>(myProjects[0] || projects[0] || null);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
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
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold glow-badge-emerald">Approved</span>;
      case 'In Review':
      case 'Submitted':
      case 'Pending Review':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold glow-badge-amber">In Review</span>;
      case 'Needs Revision':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">Needs Revision</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-white/10">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Student Top Welcome Banner */}
      <div className="relative overflow-hidden glass-panel rounded-2xl p-6 border border-white/10">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Student Portal Desk</span>
            <h2 className="text-2xl font-black text-white tracking-tight mt-1">
              Welcome back, {currentUser.name}!
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Track project milestones, submit deliverables, inspect mentor evaluations, and collaborate directly with your assigned supervisor.
            </p>
          </div>

          {activeProject && (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setChatModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-800 border border-white/10 text-cyan-300 transition-all hover:scale-105"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Mentor Discussion ({activeProject.messages.length})</span>
              </button>

              <button
                onClick={() => handleOpenSubmission()}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20 transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Submit Deliverable</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Project Selector Tabs */}
      {projects.length > 0 && (
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {projects.map(p => (
            <button
              key={p.id}
              onClick={() => setActiveProject(p)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-medium border transition-all whitespace-nowrap ${
                activeProject?.id === p.id
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-md shadow-cyan-500/10'
                  : 'glass-panel border-white/10 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{p.title}</span>
              {getStatusBadge(p.status)}
            </button>
          ))}
        </div>
      )}

      {activeProject && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Column: Project Overview & Milestones */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Active Project Details Card */}
            <div className="glass-panel rounded-2xl p-6 space-y-4 border border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-semibold text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                      {activeProject.category}
                    </span>
                    {getStatusBadge(activeProject.status)}
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1.5">{activeProject.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">Team: <strong className="text-slate-200">{activeProject.teamName}</strong></p>
                </div>

                {/* Progress Circle & % */}
                <div className="flex items-center space-x-3 bg-slate-950/50 p-3 rounded-xl border border-white/5">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Completion</div>
                    <div className="text-lg font-black text-cyan-400">{activeProject.progressPercentage}%</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-cyan-500 flex items-center justify-center text-xs font-bold text-cyan-300">
                    {activeProject.progressPercentage}%
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed">{activeProject.description}</p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeProject.techStack.map((tech, i) => (
                  <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-300 font-mono">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Team Members List */}
              <div className="pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeProject.teamMembers.map(tm => (
                  <div key={tm.id} className="bg-slate-950/40 p-2.5 rounded-xl border border-white/5 text-xs space-y-0.5">
                    <div className="font-semibold text-slate-200">{tm.name}</div>
                    <div className="text-[10px] text-slate-400">{tm.rollNo} • {tm.roleInTeam}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones & Timeline Section */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Project Milestone Timeline</h3>
                  <p className="text-xs text-slate-400">Deliverables required for faculty evaluation</p>
                </div>
                <button
                  onClick={() => handleOpenSubmission()}
                  className="flex items-center space-x-1.5 text-xs text-purple-400 hover:text-purple-300 font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Submit Work</span>
                </button>
              </div>

              <div className="space-y-3">
                {activeProject.milestones.map((m, idx) => {
                  const isGraded = m.status === 'Graded';
                  const isSubmitted = m.status === 'Submitted';
                  return (
                    <div
                      key={m.id}
                      className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isGraded
                          ? 'bg-emerald-500/5 border-emerald-500/30'
                          : isSubmitted
                          ? 'bg-amber-500/5 border-amber-500/30'
                          : 'bg-slate-950/40 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-[11px] font-bold text-slate-400 flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h4 className="text-sm font-bold text-white">{m.title}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 font-medium">
                            Weight: {m.weightage}%
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 pl-7">{m.description}</p>
                        <div className="text-[11px] text-slate-500 pl-7">Due Date: {m.dueDate}</div>
                      </div>

                      <div className="flex items-center space-x-3 self-end sm:self-center pl-7 sm:pl-0">
                        {getStatusBadge(m.status)}
                        <button
                          onClick={() => handleOpenSubmission(m.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 flex items-center space-x-1"
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

          {/* Right Sidebar Column: Mentor Info & Evaluated Scores */}
          <div className="space-y-6">
            
            {/* Assigned Mentor Card */}
            <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Assigned Faculty Mentor</h3>
              
              {activeProject.mentorName ? (
                <div className="flex items-center space-x-3 bg-slate-950/60 p-3 rounded-xl border border-white/5">
                  <img
                    src={activeProject.mentorAvatar}
                    alt={activeProject.mentorName}
                    className="w-12 h-12 rounded-full ring-2 ring-purple-500/40 object-cover"
                  />
                  <div>
                    <div className="text-sm font-bold text-white">{activeProject.mentorName}</div>
                    <div className="text-xs text-purple-400 flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" /> Assigned Faculty
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-xs text-amber-300 space-y-1">
                  <div className="font-semibold flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> Pending Mentor Assignment
                  </div>
                  <p className="text-[11px] text-amber-200/80">Academic coordinator will assign your faculty supervisor shortly.</p>
                </div>
              )}

              <button
                onClick={() => setChatModalOpen(true)}
                className="w-full py-2 rounded-xl text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center space-x-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open Project Chat Room</span>
              </button>
            </div>

            {/* Submission Evaluations & Rubric Scores Card */}
            <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Evaluation Scorecards</h3>
                <Award className="w-4 h-4 text-amber-400" />
              </div>

              {activeProject.submissions.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-500">
                  No submissions evaluated yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {activeProject.submissions.map(sub => (
                    <div key={sub.id} className="bg-slate-950/60 p-3.5 rounded-xl border border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{sub.milestoneTitle}</span>
                        {sub.totalScore !== undefined ? (
                          <span className="text-xs font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                            {sub.totalScore} / 100
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-400 font-medium">Pending Review</span>
                        )}
                      </div>

                      {sub.rubricScore && (
                        <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-400 pt-1">
                          <div className="bg-slate-900 px-2 py-1 rounded">Code: <strong className="text-slate-200">{sub.rubricScore.codeQuality}/25</strong></div>
                          <div className="bg-slate-900 px-2 py-1 rounded">Docs: <strong className="text-slate-200">{sub.rubricScore.documentation}/25</strong></div>
                          <div className="bg-slate-900 px-2 py-1 rounded">Innov: <strong className="text-slate-200">{sub.rubricScore.innovation}/25</strong></div>
                          <div className="bg-slate-900 px-2 py-1 rounded">Defense: <strong className="text-slate-200">{sub.rubricScore.presentation}/25</strong></div>
                        </div>
                      )}

                      {sub.mentorFeedback && (
                        <p className="text-[11px] text-slate-300 bg-slate-900/90 p-2 rounded border border-white/5 italic">
                          "{sub.mentorFeedback}"
                        </p>
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
        </>
      )}

    </div>
  );
};
