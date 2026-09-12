import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Project } from '../types';
import { X, Calendar, Plus, UserCheck, BookOpen } from 'lucide-react';

interface MeetingLogModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export const MeetingLogModal: React.FC<MeetingLogModalProps> = ({ project, isOpen, onClose }) => {
  const { addMeetingLog } = useApp();
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !notes.trim()) return;
    addMeetingLog(project.id, topic.trim(), notes.trim());
    setTopic('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-xl p-6 text-slate-900 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Mentor-Team Meeting Logs</h2>
              <p className="text-xs text-slate-500">{project.title} — Supervisor: {project.mentorName || 'Unassigned'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Log Form */}
        <form onSubmit={handleAdd} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3 mb-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
            <Plus className="w-3.5 h-3.5 text-purple-600" /> Log New Mentor Meeting Checkpoint
          </h3>

          <div className="space-y-1">
            <input
              type="text"
              required
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="Meeting Topic (e.g. AVX-512 SIMD Vectorization Review)"
              className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <textarea
              required
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Key decisions, faculty recommendations, action items..."
              className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-xs"
          >
            Save Meeting Log Entry
          </button>
        </form>

        {/* Existing Logs List */}
        <div className="flex-1 overflow-y-auto space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Past Meeting History</h3>
          
          {project.meetingLogs.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No meeting logs recorded yet. Log your first faculty meeting above!
            </div>
          ) : (
            project.meetingLogs.map(ml => (
              <div key={ml.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-purple-600" /> {ml.topic}
                  </span>
                  <span className="text-[10px] text-purple-900 font-mono bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-medium">
                    {ml.date}
                  </span>
                </div>
                <p className="text-xs text-slate-700 pl-5 italic">"{ml.notes}"</p>
                <div className="text-[10px] text-slate-500 pl-5 flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-indigo-600" /> Mentor: {ml.mentorName}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
