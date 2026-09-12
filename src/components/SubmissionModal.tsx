import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Project } from '../types';
import { X, UploadCloud, Link as LinkIcon, FileText, CheckCircle, CheckSquare, Clock, ArrowRight, FileCheck, ExternalLink } from 'lucide-react';

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
  const { submitProgressWork } = useApp();

  const [milestoneId, setMilestoneId] = useState(
    preSelectedMilestoneId || project.milestones[0]?.id || ''
  );
  const [tasksCompleted, setTasksCompleted] = useState('');
  const [currentWork, setCurrentWork] = useState('');
  const [nextPlan, setNextPlan] = useState('');
  const [progressPercentage, setProgressPercentage] = useState(project.progressPercentage || 50);

  const [repoUrl, setRepoUrl] = useState(project.githubUrl || '');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');
  
  // Real Local PDF File State
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState('Project_Progress_Report.pdf');
  const [pdfFileUrl, setPdfFileUrl] = useState<string | undefined>(undefined);
  const [pdfFileSize, setPdfFileSize] = useState<string>('1.4 MB');

  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        alert('Please select a valid PDF document (.pdf only).');
        return;
      }
      setSelectedPdfFile(file);
      setPdfFileName(file.name);
      
      // Calculate human-readable file size
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      setPdfFileSize(`${sizeInMB} MB`);

      // Generate local object URL for instant preview
      const objectUrl = URL.createObjectURL(file);
      setPdfFileUrl(objectUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestoneId || !tasksCompleted) return;

    submitProgressWork(project.id, milestoneId, {
      tasksCompleted,
      currentWork,
      nextPlan,
      progressPercentage,
      repoUrl,
      liveDemoUrl: liveDemoUrl || undefined,
      documentName: pdfFileName,
      documentUrl: pdfFileUrl,
      documentSize: pdfFileSize,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-xl p-6 text-slate-900 my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Submit Milestone Deliverable</h2>
              <p className="text-xs text-slate-500">{project.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Deliverables Uploaded!</h3>
            <p className="text-xs text-slate-600 text-center">
              Your supervisor ({project.mentorName || 'Assigned Mentor'}) has been notified for evaluation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Target Stage */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Target Milestone Stage *</label>
              <select
                value={milestoneId}
                onChange={e => setMilestoneId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
              >
                {project.milestones.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.title} ({m.weightage}% weight - Status: {m.status})
                  </option>
                ))}
              </select>
              {selectedMilestone && (
                <p className="text-[11px] text-slate-500 mt-1 italic">{selectedMilestone.description}</p>
              )}
            </div>

            {/* Task Completed */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <CheckSquare className="w-3.5 h-3.5 text-emerald-600" /> Tasks Completed *
              </label>
              <textarea
                required
                rows={2}
                value={tasksCompleted}
                onChange={e => setTasksCompleted(e.target.value)}
                placeholder="List completed modules, refactored components, and unit tests..."
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Current Work & Next Plan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" /> Current Work
                </label>
                <textarea
                  rows={2}
                  value={currentWork}
                  onChange={e => setCurrentWork(e.target.value)}
                  placeholder="Active debugging..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <ArrowRight className="w-3.5 h-3.5 text-purple-600" /> Next Plan
                </label>
                <textarea
                  rows={2}
                  value={nextPlan}
                  onChange={e => setNextPlan(e.target.value)}
                  placeholder="Upcoming features..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Progress % Slider */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Updated Overall Progress %</span>
                <span className="font-bold text-indigo-700">{progressPercentage}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={progressPercentage}
                onChange={e => setProgressPercentage(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Real PDF Local File Upload */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-rose-600" /> Upload PDF Deliverables Document (Local Files Only) *
              </label>
              
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-center cursor-pointer relative">
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handlePdfChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                
                {selectedPdfFile ? (
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-emerald-300 text-xs">
                    <div className="flex items-center space-x-2">
                      <FileCheck className="w-5 h-5 text-emerald-600" />
                      <div className="text-left">
                        <div className="font-bold text-slate-900">{selectedPdfFile.name}</div>
                        <div className="text-[10px] text-slate-500">{pdfFileSize} • PDF Document</div>
                      </div>
                    </div>

                    {pdfFileUrl && (
                      <a
                        href={pdfFileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold flex items-center space-x-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Preview PDF</span>
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="space-y-1">
                    <UploadCloud className="w-7 h-7 text-indigo-600 mx-auto" />
                    <div className="text-xs font-bold text-slate-800">Click to browse or drag local PDF report</div>
                    <p className="text-[10px] text-slate-500">Supports .PDF documents only</p>
                  </div>
                )}
              </div>
            </div>

            {/* Repo & Demo URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <LinkIcon className="w-3.5 h-3.5 text-indigo-600" /> Code Repo Link *
                </label>
                <input
                  type="url"
                  required
                  value={repoUrl}
                  onChange={e => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/org/repo"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Live Demo / Video Link</label>
                <input
                  type="url"
                  value={liveDemoUrl}
                  onChange={e => setLiveDemoUrl(e.target.value)}
                  placeholder="https://youtu.be/demo-video"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Remarks</label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Additional comments for faculty mentor..."
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
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
