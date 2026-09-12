import React from 'react';
import { useApp } from '../context/AppContext';
import type { Role } from '../types';
import { Shield, GraduationCap, UserCheck, PlusCircle, Layers, CheckCircle2, Clock, Trophy } from 'lucide-react';

interface HeaderProps {
  onOpenRegisterModal: () => void;
  onOpenLeaderboard: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenRegisterModal, onOpenLeaderboard }) => {
  const { currentRole, setCurrentRole, currentUser, projects } = useApp();

  const totalProjects = projects.length;
  const inReviewProjects = projects.filter(p => p.status === 'Under Review' || p.status === 'In Review').length;
  const approvedProjects = projects.filter(p => p.status === 'Approved' || p.status === 'Completed').length;

  const roles: { key: Role; label: string; icon: React.ElementType; color: string }[] = [
    { key: 'student', label: 'Student Team', icon: GraduationCap, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10' },
    { key: 'mentor', label: 'Faculty Mentor', icon: UserCheck, color: 'text-purple-400 border-purple-500/40 bg-purple-500/10' },
    { key: 'admin', label: 'Coordinator Admin', icon: Shield, color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  ApexMonitor
                </h1>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Hackathon Edition
                </span>
              </div>
              <p className="text-xs text-slate-400">Project Monitoring & Mentoring System</p>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-white/10">
            <span className="text-xs font-medium text-slate-400 px-2.5 hidden sm:inline">Role View:</span>
            <div className="flex space-x-1">
              {roles.map(r => {
                const Icon = r.icon;
                const isActive = currentRole === r.key;
                return (
                  <button
                    key={r.key}
                    onClick={() => setCurrentRole(r.key)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? `${r.color} shadow-sm border font-semibold scale-105`
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center space-x-3">
            {/* Quick Ticker Stats */}
            <div className="hidden lg:flex items-center space-x-3 text-xs bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/5">
              <span className="text-slate-400 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-slate-400" /> {totalProjects} Total
              </span>
              <span className="text-amber-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {inReviewProjects} Review
              </span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {approvedProjects} Approved
              </span>
            </div>

            {/* Leaderboard Button */}
            <button
              onClick={onOpenLeaderboard}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all hover:scale-105"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Leaderboard</span>
            </button>

            {/* New Project Button (Student / Admin) */}
            {currentRole !== 'mentor' && (
              <button
                onClick={onOpenRegisterModal}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-105"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Register Project</span>
              </button>
            )}

            {/* Active User Avatar */}
            <div className="flex items-center space-x-2 border-l border-white/10 pl-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full ring-2 ring-cyan-500/40 object-cover"
              />
              <div className="hidden xl:block text-left">
                <div className="text-xs font-medium text-slate-200">{currentUser.name}</div>
                <div className="text-[10px] text-slate-400 capitalize">{currentUser.role}</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
