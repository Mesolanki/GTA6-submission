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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6 text-slate-100 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Mentor-Team Meeting Logs</h2>
              <p className="text-xs text-slate-400">{project.title} — Assigned Mentor: {project.mentorName || 'Unassigned'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Log Form */}
        <form onSubmit={handleAdd} className="bg-slate-950/60 p-3.5 rounded-xl border border-white/10 space-y-3 mb-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
            <Plus className="w-3.5 h-3.5 text-purple-400" /> Log New Mentor Meeting Checkpoint
          </h3>

          <div className="space-y-1">
            <input
              type="text"
              required
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="Meeting Topic (e.g. SIMD AVX-512 Vectorization Review)"
              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="space-y-1">
            <textarea
              required
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Key decisions, faculty recommendations, action items..."
              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-1.5 rounded-lg text-xs font-semibold bg-purple-500 hover:bg-purple-400 text-slate-950 shadow-md shadow-purple-500/20"
          >
            Save Meeting Log Entry
          </button>
        </form>

        {/* Existing Logs List */}
        <div className="flex-1 overflow-y-auto space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Past Meeting History</h3>
          
          {project.meetingLogs.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No meeting logs recorded yet. Log your first faculty meeting above!
            </div>
          ) : (
            project.meetingLogs.map(ml => (
              <div key={ml.id} className="bg-slate-950/40 p-3.5 rounded-xl border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-purple-400" /> {ml.topic}
                  </span>
                  <span className="text-[10px] text-purple-300 font-mono bg-purple-500/10 px-2 py-0.5 rounded">
                    {ml.date}
                  </span>
                </div>
                <p className="text-xs text-slate-300 pl-5 italic">"{ml.notes}"</p>
                <div className="text-[10px] text-slate-400 pl-5 flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-cyan-400" /> Mentor: {ml.mentorName}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
