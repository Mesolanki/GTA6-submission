import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Project, Submission } from '../types';
import {
  Award,
  Clock,
  ExternalLink,
  MessageSquare,
  FileText,
  Users,
  Search,
  Filter
} from 'lucide-react';
import { EvaluationModal } from './EvaluationModal';
import { ChatModal } from './ChatModal';

export const MentorView: React.FC = () => {
  const { projects, currentUser } = useApp();

  // Projects assigned to current mentor (or all for demo flexibility)
  const assignedProjects = projects.filter(
    p => p.mentorId === currentUser.id || true // Show all projects so mentor can evaluate any
  );

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [evaluationModalOpen, setEvaluationModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [activeSubmission, setActiveSubmission] = useState<{ project: Project; sub: Submission } | null>(null);
  const [chatProject, setChatProject] = useState<Project | null>(null);

  // All pending submissions requiring review across assigned projects
  const pendingSubmissions: { project: Project; sub: Submission }[] = [];
  projects.forEach(p => {
    p.submissions.forEach(sub => {
      if (sub.status === 'Pending Review') {
        pendingSubmissions.push({ project: p, sub });
      }
    });
  });

  const handleOpenEvaluation = (project: Project, sub: Submission) => {
    setActiveSubmission({ project, sub });
    setEvaluationModalOpen(true);
  };

  const handleOpenChat = (project: Project) => {
    setChatProject(project);
    setChatModalOpen(true);
  };

  const filteredProjects = assignedProjects.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.teamName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' ? true : p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="relative overflow-hidden glass-panel rounded-2xl p-6 border border-white/10">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Faculty Mentorship Desk</span>
            <h2 className="text-2xl font-black text-white tracking-tight mt-1">
              Welcome, {currentUser.name}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Review incoming student submissions, grade deliverables using the 4-part rubric, and provide actionable technical feedback.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-950/60 border border-white/10 px-4 py-2 rounded-xl text-xs flex items-center space-x-3">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Clock className="w-4 h-4" /> {pendingSubmissions.length} Pending Reviews
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-cyan-400 font-bold flex items-center gap-1">
                <Users className="w-4 h-4" /> {assignedProjects.length} Assigned Teams
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Action Queue: Submissions Needing Review */}
      {pendingSubmissions.length > 0 && (
        <div className="glass-panel rounded-2xl p-5 border border-amber-500/30 bg-amber-500/5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 animate-subtle-pulse" /> Pending Deliverables Awaiting Evaluation
            </h3>
            <span className="text-[11px] text-slate-400">{pendingSubmissions.length} items queued</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pendingSubmissions.map(({ project, sub }) => (
              <div
                key={sub.id}
                className="bg-slate-900/90 p-4 rounded-xl border border-amber-500/20 flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{sub.milestoneTitle}</span>
                    <span className="text-[10px] text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded font-mono">
                      {sub.submittedAt}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Project: <strong className="text-slate-200">{project.title}</strong></div>
                  <div className="text-xs text-slate-400">Team: <strong className="text-slate-300">{project.teamName}</strong></div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-xs text-slate-400 italic truncate max-w-[200px]">"{sub.notes}"</span>
                  <button
                    onClick={() => handleOpenEvaluation(project, sub)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white shadow-md shadow-amber-500/20 flex items-center space-x-1"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Grade & Review</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Mentor Workbench: Search & Filter Grid */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">Assigned Student Projects</h3>
            <p className="text-xs text-slate-400">Monitor project health, scorecards, and interaction logs</p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search project or team..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-950/70 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-purple-500 w-48"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-1 bg-slate-950/70 p-1 rounded-lg border border-white/10">
              <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="bg-transparent text-xs text-slate-200 focus:outline-none pr-2"
              >
                <option value="all">All Statuses</option>
                <option value="In Review">In Review</option>
                <option value="Approved">Approved</option>
                <option value="Needs Revision">Needs Revision</option>
                <option value="Submitted">Submitted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              className="p-5 rounded-2xl border transition-all space-y-3 bg-slate-950/40 border-white/5 hover:border-white/10 hover:bg-slate-900/60"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                    {proj.category}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">{proj.title}</h4>
                  <p className="text-xs text-slate-400">Team: <strong className="text-slate-200">{proj.teamName}</strong></p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-cyan-400">{proj.progressPercentage}% Completed</span>
                  <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${proj.progressPercentage}%` }} />
                  </div>
                </div>
              </div>

              {/* Submissions History Badges */}
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                <div className="text-[11px] font-semibold text-slate-400">Submissions Log:</div>
                {proj.submissions.length === 0 ? (
                  <div className="text-[11px] text-slate-500 italic">No submissions yet.</div>
                ) : (
                  proj.submissions.map(sub => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between bg-slate-950 p-2 rounded-lg border border-white/5 text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="font-semibold text-slate-200">{sub.milestoneTitle}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {sub.totalScore !== undefined && (
                          <span className="font-bold text-amber-400">{sub.totalScore}/100</span>
                        )}
                        <button
                          onClick={() => handleOpenEvaluation(proj, sub)}
                          className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[11px] text-purple-300 font-medium"
                        >
                          {sub.status === 'Pending Review' ? 'Evaluate' : 'Re-Evaluate'}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-400 hover:text-cyan-400 flex items-center space-x-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>

                <button
                  onClick={() => handleOpenChat(proj)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Discussion Chat ({proj.messages.length})</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Modals */}
      {activeSubmission && (
        <EvaluationModal
          project={activeSubmission.project}
          submission={activeSubmission.sub}
          isOpen={evaluationModalOpen}
          onClose={() => setEvaluationModalOpen(false)}
        />
      )}

      {chatProject && (
        <ChatModal
          project={chatProject}
          isOpen={chatModalOpen}
          onClose={() => setChatModalOpen(false)}
        />
      )}

    </div>
  );
};
