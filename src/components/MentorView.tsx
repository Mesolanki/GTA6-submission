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

  const assignedProjects = projects.filter(
    p => p.mentorId === currentUser.id || true
  );

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [evaluationModalOpen, setEvaluationModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [activeSubmission, setActiveSubmission] = useState<{ project: Project; sub: Submission } | null>(null);
  const [chatProject, setChatProject] = useState<Project | null>(null);

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
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Faculty Mentorship Workbench</span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Welcome, {currentUser.name}
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Inspect student PDF deliverables, grade 5-part rubric scores (100 Marks Total), and provide technical recommendations.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs flex items-center space-x-3">
              <span className="text-amber-700 font-bold flex items-center gap-1">
                <Clock className="w-4 h-4 text-amber-600" /> {pendingSubmissions.length} Pending Reviews
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-indigo-700 font-bold flex items-center gap-1">
                <Users className="w-4 h-4 text-indigo-600" /> {assignedProjects.length} Assigned Teams
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Queue: Submissions Needing Review */}
      {pendingSubmissions.length > 0 && (
        <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" /> Pending Submissions & PDF Documents Awaiting Faculty Evaluation
            </h3>
            <span className="text-[11px] text-amber-700 font-medium">{pendingSubmissions.length} items queued</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pendingSubmissions.map(({ project, sub }) => (
              <div
                key={sub.id}
                className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{sub.milestoneTitle}</span>
                    <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-mono font-medium">
                      {sub.submittedAt}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">Project: <strong className="text-slate-900">{project.title}</strong></div>
                  <div className="text-xs text-slate-600">Team: <strong className="text-slate-800">{project.teamName}</strong></div>

                  {sub.documentName && (
                    <div className="mt-2 text-xs bg-slate-50 p-2 rounded border border-slate-200 flex items-center justify-between">
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-rose-600" /> {sub.documentName}
                      </span>
                      {sub.documentUrl && (
                        <a
                          href={sub.documentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center gap-1"
                        >
                          <span>Open PDF</span> <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs text-slate-500 italic truncate max-w-[200px]">"{sub.notes}"</span>
                  <button
                    onClick={() => handleOpenEvaluation(project, sub)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-xs flex items-center space-x-1 transition-colors"
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
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Assigned Student Projects</h3>
            <p className="text-xs text-slate-500">Monitor project progress, evaluation logs, and PDF documents</p>
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
                className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-purple-500 w-48"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
              <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="bg-transparent text-xs text-slate-700 focus:outline-none pr-2 font-medium"
              >
                <option value="all">All Statuses</option>
                <option value="In Review">In Review</option>
                <option value="Approved">Approved</option>
                <option value="Revision Required">Revision Required</option>
                <option value="Submitted">Submitted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 shadow-xs hover:shadow-sm transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-purple-700 px-2 py-0.5 rounded bg-purple-50 border border-purple-200">
                    {proj.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1.5">{proj.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Team: <strong className="text-slate-800">{proj.teamName}</strong></p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-indigo-600">{proj.progressPercentage}% Progress</span>
                  <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden border border-slate-200">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${proj.progressPercentage}%` }} />
                  </div>
                </div>
              </div>

              {/* Submissions & PDF Docs Log */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="text-[11px] font-semibold text-slate-500">Submissions & Uploaded PDFs:</div>
                {proj.submissions.length === 0 ? (
                  <div className="text-[11px] text-slate-400 italic">No submissions uploaded yet.</div>
                ) : (
                  proj.submissions.map(sub => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-200 text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="w-3.5 h-3.5 text-rose-600" />
                        <span className="font-semibold text-slate-800">{sub.milestoneTitle}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {sub.totalScore !== undefined && (
                          <span className="font-bold text-amber-700 font-mono">{sub.totalScore}/100</span>
                        )}
                        <button
                          onClick={() => handleOpenEvaluation(proj, sub)}
                          className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-[11px] text-purple-700 font-semibold"
                        >
                          {sub.status === 'Pending Review' ? 'Evaluate PDF' : 'Re-Evaluate'}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Links */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-600 hover:text-indigo-600 flex items-center space-x-1 font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>

                <button
                  onClick={() => handleOpenChat(proj)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
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
