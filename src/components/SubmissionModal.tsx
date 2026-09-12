import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Project } from '../types';
import { X, UploadCloud, Link as LinkIcon, FileText, CheckCircle, FileCheck, ExternalLink } from 'lucide-react';

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
      
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      setPdfFileSize(`${sizeInMB} MB`);

      const objectUrl = URL.createObjectURL(file);
      setPdfFileUrl(objectUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestoneId) return;

    submitProgressWork(project.id, milestoneId, {
      tasksCompleted: 'Submitted milestone deliverable document and repository code.',
      currentWork: 'Advancing project to next milestone stage.',
      nextPlan: 'Prepare for faculty review.',
      progressPercentage: Math.min(100, project.progressPercentage + 15),
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-xl p-6 text-slate-900 my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Upload Milestone Deliverables</h2>
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
            
            {/* Target Stage Select */}
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
            </div>

            {/* Real PDF Local File Upload */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-rose-600" /> Upload PDF Document (Local Files Only) *
              </label>
              
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 bg-slate-50 hover:bg-slate-100 transition-colors text-center cursor-pointer relative">
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handlePdfChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                
                {selectedPdfFile ? (
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-emerald-300 text-xs shadow-xs">
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
                  <div className="space-y-1 py-1">
                    <UploadCloud className="w-8 h-8 text-indigo-600 mx-auto" />
                    <div className="text-xs font-bold text-slate-800">Click to browse or drag local PDF report</div>
                    <p className="text-[10px] text-slate-500">Supports .PDF documents only</p>
                  </div>
                )}
              </div>
            </div>

            {/* Code Repo & Demo Links */}
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

            {/* Remarks */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Submission Notes / Remarks</label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Brief comments for faculty mentor..."
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
