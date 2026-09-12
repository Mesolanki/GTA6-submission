import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Project, Submission } from '../types';
import { X, Award, ExternalLink, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

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

  const [codeQuality, setCodeQuality] = useState(submission.rubricScore?.codeQuality || 22);
  const [documentation, setDocumentation] = useState(submission.rubricScore?.documentation || 23);
  const [innovation, setInnovation] = useState(submission.rubricScore?.innovation || 24);
  const [presentation, setPresentation] = useState(submission.rubricScore?.presentation || 21);
  
  const [status, setStatus] = useState<'Approved' | 'Needs Revision'>(
    submission.status === 'Needs Revision' ? 'Needs Revision' : 'Approved'
  );
  const [feedback, setFeedback] = useState(submission.mentorFeedback || '');

  if (!isOpen) return null;

  const totalCalculatedScore = codeQuality + documentation + innovation + presentation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    evaluateSubmission(
      project.id,
      submission.id,
      { codeQuality, documentation, innovation, presentation },
      status,
      feedback
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6 text-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Evaluate Submission</h2>
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
        <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5 space-y-2 mb-5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-400">Submitted by: <strong className="text-slate-200">{submission.submittedBy}</strong></span>
            <span className="text-slate-400">Submitted at: <strong className="text-slate-200">{submission.submittedAt}</strong></span>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            {submission.repoUrl && (
              <a
                href={submission.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 text-xs text-cyan-400 hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" /> <span>View Repository Commit</span>
              </a>
            )}
            {submission.liveDemoUrl && (
              <a
                href={submission.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 text-xs text-purple-400 hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" /> <span>Live Demo Link</span>
              </a>
            )}
            {submission.documentName && (
              <span className="flex items-center space-x-1 text-xs text-amber-400">
                <FileText className="w-3.5 h-3.5" /> <span>{submission.documentName}</span>
              </span>
            )}
          </div>

          <p className="text-xs text-slate-300 pt-2 border-t border-white/5 italic">
            "{submission.notes}"
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Rubric Matrix Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Evaluation Rubric Matrix (0-25 each)
            </h3>
            <div className="text-sm font-black text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-lg">
              Total: {totalCalculatedScore} / 100
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Code Quality */}
            <div className="bg-slate-950/40 p-3 rounded-lg border border-white/5 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Code & Architecture</span>
                <span className="font-bold text-cyan-400">{codeQuality} / 25</span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                value={codeQuality}
                onChange={e => setCodeQuality(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Documentation */}
            <div className="bg-slate-950/40 p-3 rounded-lg border border-white/5 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Documentation & SRS</span>
                <span className="font-bold text-purple-400">{documentation} / 25</span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                value={documentation}
                onChange={e => setDocumentation(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            {/* Innovation */}
            <div className="bg-slate-950/40 p-3 rounded-lg border border-white/5 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Innovation & Benchmarking</span>
                <span className="font-bold text-emerald-400">{innovation} / 25</span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                value={innovation}
                onChange={e => setInnovation(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Defense & Presentation */}
            <div className="bg-slate-950/40 p-3 rounded-lg border border-white/5 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Defense & Q&A Response</span>
                <span className="font-bold text-amber-400">{presentation} / 25</span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                value={presentation}
                onChange={e => setPresentation(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
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
                className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
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
                onClick={() => setStatus('Needs Revision')}
                className={`flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                  status === 'Needs Revision'
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-lg shadow-rose-500/10'
                    : 'bg-slate-950/50 border-white/10 text-slate-400 hover:bg-white/5'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Request Revision</span>
              </button>
            </div>
          </div>

          {/* Feedback Remarks */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Detailed Review Remarks & Feedback *</label>
            <textarea
              required
              rows={3}
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              placeholder="Provide constructive feedback, highlight strengths, or list required changes before approval..."
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
              Submit Evaluation Grade
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
