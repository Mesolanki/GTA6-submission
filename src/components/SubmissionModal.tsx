import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Project } from '../types';
import { X, UploadCloud, Link as LinkIcon, FileText, CheckCircle } from 'lucide-react';

interface SubmissionModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  preSelectedMilestoneId?: string;
}

export const SubmissionModal: React.FC<SubmissionModalProps> = ({
  project,
  isOpen,
  onClose,
  preSelectedMilestoneId
}) => {
  const { submitMilestoneWork } = useApp();

  const [milestoneId, setMilestoneId] = useState(
    preSelectedMilestoneId || project.milestones[0]?.id || ''
  );
  const [repoUrl, setRepoUrl] = useState(project.githubUrl || '');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  const [documentName, setDocumentName] = useState('Deliverable_Architecture_v1.pdf');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestoneId || !notes) return;

    submitMilestoneWork(project.id, milestoneId, {
      repoUrl,
      liveDemoUrl: liveDemoUrl || undefined,
      documentName,
      notes
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  const selectedMilestone = project.milestones.find(m => m.id === milestoneId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6 text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Submit Milestone Work</h2>
              <p className="text-xs text-slate-400">{project.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white">Submission Sent!</h3>
            <p className="text-xs text-slate-400 text-center">
              Your mentor ({project.mentorName || 'Assigned Supervisor'}) has been notified for review.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Select Milestone */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Target Milestone *</label>
              <select
                value={milestoneId}
                onChange={e => setMilestoneId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950/70 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              >
                {project.milestones.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.title} ({m.weightage}% weight - Status: {m.status})
                  </option>
                ))}
              </select>
              {selectedMilestone && (
                <p className="text-[11px] text-slate-400 mt-1 italic">{selectedMilestone.description}</p>
              )}
            </div>

            {/* Code Repo URL */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <LinkIcon className="w-3.5 h-3.5 text-cyan-400" /> Repository / Commit URL *
              </label>
              <input
                type="url"
                required
                value={repoUrl}
                onChange={e => setRepoUrl(e.target.value)}
                placeholder="https://github.com/org/repo/commit/hash"
                className="w-full px-3 py-2 rounded-lg bg-slate-950/70 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Live Demo URL */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Live Demo / Video Link (Optional)</label>
              <input
                type="url"
                value={liveDemoUrl}
                onChange={e => setLiveDemoUrl(e.target.value)}
                placeholder="https://youtu.be/demo-video or https://demo.app"
                className="w-full px-3 py-2 rounded-lg bg-slate-950/70 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Simulated Document File Upload */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-amber-400" /> Attachment Document / Report
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={documentName}
                  onChange={e => setDocumentName(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-950/70 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
                <span className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 font-mono">
                  PDF/ZIP
                </span>
              </div>
            </div>

            {/* Submission Notes */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Notes & Key Highlights *</label>
              <textarea
                required
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Detail what was built, key benchmarks achieved, and instructions for testing..."
                className="w-full px-3 py-2 rounded-lg bg-slate-950/70 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20"
              >
                Submit Deliverables
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
