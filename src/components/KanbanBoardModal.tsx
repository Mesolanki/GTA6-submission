import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Project } from '../types';
import { X, Kanban, Plus, CheckCircle2, Clock, Circle } from 'lucide-react';

interface KanbanBoardModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export const KanbanBoardModal: React.FC<KanbanBoardModalProps> = ({ project, isOpen, onClose }) => {
  const { addKanbanTask, toggleKanbanTask } = useApp();
  const [newTitle, setNewTitle] = useState('');
  const [assignee, setAssignee] = useState(project.teamMembers[0]?.name || 'Lead');

  if (!isOpen) return null;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addKanbanTask(project.id, newTitle.trim(), assignee);
    setNewTitle('');
  };

  const todoTasks = project.kanbanTasks.filter(t => t.status === 'todo');
  const inProgressTasks = project.kanbanTasks.filter(t => t.status === 'in_progress');
  const doneTasks = project.kanbanTasks.filter(t => t.status === 'done');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-xl p-6 text-slate-900 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <Kanban className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Task Board</h2>
              <p className="text-xs text-slate-500">{project.title} — Team micro-tasks</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Add Task */}
        <form onSubmit={handleAddTask} className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 mb-4">
          <input
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Add new task (e.g. Implement AVX-512 SIMD pass)..."
            className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
          />
          <select
            value={assignee}
            onChange={e => setAssignee(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none font-medium"
          >
            {project.teamMembers.map(m => (
              <option key={m.id} value={m.name}>{m.name}</option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center space-x-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Task</span>
          </button>
        </form>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 overflow-y-auto">
          
          {/* Column 1: To Do */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Circle className="w-3.5 h-3.5 text-amber-600" /> To Do</span>
              <span className="bg-white px-2 py-0.5 rounded text-[10px] border border-slate-200 font-bold">{todoTasks.length}</span>
            </div>

            <div className="space-y-2">
              {todoTasks.map(t => (
                <div key={t.id} className="bg-white p-3 rounded-lg border border-slate-200 space-y-2 text-xs shadow-xs">
                  <div className="font-semibold text-slate-900">{t.title}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                    <span>Assignee: {t.assignee}</span>
                    <button
                      onClick={() => toggleKanbanTask(project.id, t.id, 'in_progress')}
                      className="text-indigo-600 font-semibold hover:underline"
                    >
                      Start &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: In Progress */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-indigo-600" /> In Progress</span>
              <span className="bg-white px-2 py-0.5 rounded text-[10px] border border-slate-200 font-bold">{inProgressTasks.length}</span>
            </div>

            <div className="space-y-2">
              {inProgressTasks.map(t => (
                <div key={t.id} className="bg-white p-3 rounded-lg border border-indigo-200 space-y-2 text-xs shadow-xs">
                  <div className="font-semibold text-slate-900">{t.title}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                    <button
                      onClick={() => toggleKanbanTask(project.id, t.id, 'todo')}
                      className="text-slate-500 hover:underline"
                    >
                      &larr; To Do
                    </button>
                    <button
                      onClick={() => toggleKanbanTask(project.id, t.id, 'done')}
                      className="text-emerald-700 hover:underline font-bold"
                    >
                      Done &check;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Done */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Completed</span>
              <span className="bg-white px-2 py-0.5 rounded text-[10px] border border-slate-200 font-bold">{doneTasks.length}</span>
            </div>

            <div className="space-y-2">
              {doneTasks.map(t => (
                <div key={t.id} className="bg-white/80 p-3 rounded-lg border border-emerald-200 space-y-1 text-xs opacity-90">
                  <div className="font-semibold text-slate-600 line-through">{t.title}</div>
                  <div className="text-[10px] text-emerald-700 font-medium">Completed by {t.assignee}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
