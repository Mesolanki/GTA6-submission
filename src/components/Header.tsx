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
    { key: 'student', label: 'Student Team', icon: GraduationCap, color: 'bg-indigo-600 text-white shadow-sm' },
    { key: 'mentor', label: 'Faculty Mentor', icon: UserCheck, color: 'bg-purple-600 text-white shadow-sm' },
    { key: 'admin', label: 'Coordinator Admin', icon: Shield, color: 'bg-slate-900 text-white shadow-sm' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Logo & Academic Portal Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold tracking-tight text-slate-900">
                  ApexMonitor
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Academic Portal
                </span>
              </div>
              <p className="text-xs text-slate-500">Project Monitoring & Mentoring System</p>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 px-2.5 hidden sm:inline">Role View:</span>
            <div className="flex space-x-1">
              {roles.map(r => {
                const Icon = r.icon;
                const isActive = currentRole === r.key;
                return (
                  <button
                    key={r.key}
                    onClick={() => setCurrentRole(r.key)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? r.color
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
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
            <div className="hidden lg:flex items-center space-x-3 text-xs bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="text-slate-600 flex items-center gap-1 font-medium">
                <Layers className="w-3.5 h-3.5 text-slate-500" /> {totalProjects} Projects
              </span>
              <span className="text-amber-700 flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5" /> {inReviewProjects} Review
              </span>
              <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> {approvedProjects} Approved
              </span>
            </div>

            {/* Leaderboard Button */}
            <button
              onClick={onOpenLeaderboard}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Leaderboard</span>
            </button>

            {/* Register Project Button */}
            {currentRole !== 'mentor' && (
              <button
                onClick={onOpenRegisterModal}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Register Project</span>
              </button>
            )}

            {/* User Avatar */}
            <div className="flex items-center space-x-2 border-l border-slate-200 pl-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full ring-2 ring-indigo-500/30 object-cover"
              />
              <div className="hidden xl:block text-left">
                <div className="text-xs font-semibold text-slate-900">{currentUser.name}</div>
                <div className="text-[10px] text-slate-500 capitalize">{currentUser.role}</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
