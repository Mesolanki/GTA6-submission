import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Project, Submission } from '../types';
import { X, Award, ExternalLink, FileText, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface EvaluationModalProps {
  project: Project;
  submission: Submission;
  isOpen: boolean;
  onClose: () => void;
}

export const EvaluationModal: React.FC<EvaluationModalProps> = ({
  project,
  submission,
  isOpen,
  onClose
}) => {
  const { evaluateSubmission } = useApp();

  const [innovation, setInnovation] = useState(submission.rubricScore?.innovation || 19);
  const [implementation, setImplementation] = useState(submission.rubricScore?.implementation || 18);
  const [progress, setProgress] = useState(submission.rubricScore?.progress || 18);
  const [documentation, setDocumentation] = useState(submission.rubricScore?.documentation || 19);
  const [presentation, setPresentation] = useState(submission.rubricScore?.presentation || 18);
  
  const [status, setStatus] = useState<'Approved' | 'Revision Required'>(
    submission.status === 'Revision Required' ? 'Revision Required' : 'Approved'
  );
  const [feedback, setFeedback] = useState(submission.mentorFeedback || '');

  if (!isOpen) return null;

  const totalCalculatedScore = innovation + implementation + progress + documentation + presentation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    evaluateSubmission(
      project.id,
      submission.id,
      { innovation, implementation, progress, documentation, presentation },
      status,
      feedback
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6 text-slate-100 my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Faculty Evaluation & Rubric Scoring</h2>
              <p className="text-xs text-slate-400">{submission.milestoneTitle} — {project.teamName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Submission Details Summary Box */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5 space-y-2 mb-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-400">Submitted by: <strong className="text-slate-200">{submission.submittedBy}</strong></span>
            <span className="text-slate-400">Submitted at: <strong className="text-slate-200">{submission.submittedAt}</strong></span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1 text-slate-300">
            <div className="bg-slate-900 p-2 rounded">
              <strong className="text-emerald-400">Tasks Completed:</strong> {submission.tasksCompleted}
            </div>
            <div className="bg-slate-900 p-2 rounded">
              <strong className="text-cyan-400">Current Work:</strong> {submission.currentWork}
            </div>
            <div className="bg-slate-900 p-2 rounded">
              <strong className="text-purple-400">Next Plan:</strong> {submission.nextPlan}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            {submission.repoUrl && (
              <a
                href={submission.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 text-xs text-cyan-400 hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" /> <span>Repository Commit</span>
              </a>
            )}
            {submission.documentName && (
              <span className="flex items-center space-x-1 text-xs text-amber-400">
                <FileText className="w-3.5 h-3.5" /> <span>{submission.documentName}</span>
              </span>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Rubric Matrix Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Judges Criteria Scoring (5 Criteria x 20 Marks = 100 Total)
            </h3>
            <div className="text-sm font-black text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-lg">
              Total Score: {totalCalculatedScore} / 100
            </div>
          </div>

          {/* 5 Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            
            {/* Innovation */}
            <div className="bg-slate-950/40 p-2.5 rounded-lg border border-white/5 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Innovation (20)</span>
                <span className="font-bold text-cyan-400">{innovation}</span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                value={innovation}
                onChange={e => setInnovation(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Implementation */}
            <div className="bg-slate-950/40 p-2.5 rounded-lg border border-white/5 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Implementation (20)</span>
                <span className="font-bold text-purple-400">{implementation}</span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                value={implementation}
                onChange={e => setImplementation(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            {/* Progress */}
            <div className="bg-slate-950/40 p-2.5 rounded-lg border border-white/5 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Progress (20)</span>
                <span className="font-bold text-emerald-400">{progress}</span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                value={progress}
                onChange={e => setProgress(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Documentation */}
            <div className="bg-slate-950/40 p-2.5 rounded-lg border border-white/5 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Documentation (20)</span>
                <span className="font-bold text-amber-400">{documentation}</span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                value={documentation}
                onChange={e => setDocumentation(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Presentation */}
            <div className="bg-slate-950/40 p-2.5 rounded-lg border border-white/5 space-y-1 md:col-span-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Presentation / Defense (20)</span>
                <span className="font-bold text-rose-400">{presentation}</span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                value={presentation}
                onChange={e => setPresentation(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

          </div>

          {/* Decision Status */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Evaluation Decision *</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus('Approved')}
                className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-xl text-xs font-bold border transition-all ${
                  status === 'Approved'
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-950/50 border-white/10 text-slate-400 hover:bg-white/5'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Approve Deliverable</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('Revision Required')}
                className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-xl text-xs font-bold border transition-all ${
                  status === 'Revision Required'
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-lg shadow-rose-500/10'
                    : 'bg-slate-950/50 border-white/10 text-slate-400 hover:bg-white/5'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Request Revision</span>
              </button>
            </div>
          </div>

          {/* Feedback Remarks & AI Summary Preview */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">Mentor Remarks & Suggestions *</label>
              <span className="text-[10px] text-purple-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Auto AI Summary Enabled
              </span>
            </div>
            <textarea
              required
              rows={2}
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              placeholder="Provide suggestions, highlight technical strengths, or state correction guidelines..."
              className="w-full px-3 py-2 rounded-lg bg-slate-950/70 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white shadow-lg shadow-amber-500/20"
            >
              Submit Evaluation Marks
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
