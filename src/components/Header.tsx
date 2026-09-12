import React from 'react';
import { useApp } from '../context/AppContext';
import { Layers, Trophy, PlusCircle } from 'lucide-react';

interface HeaderProps {
  onOpenRegisterModal: () => void;
  onOpenLeaderboard: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenRegisterModal, onOpenLeaderboard }) => {
  const { currentUser, currentRole } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Clean Title (No role navbar or switching links) */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
                ApexMonitor
              </h1>
              <p className="text-xs text-slate-500">
                {currentRole === 'student'
                  ? 'Student Team Portal'
                  : currentRole === 'mentor'
                  ? 'Faculty Mentor Workbench'
                  : currentRole === 'admin'
                  ? 'Academic Coordinator Admin Desk'
                  : 'Project Monitoring & Mentoring System'}
              </p>
            </div>
          </div>

          {/* Action Buttons & User Profile (No role switcher) */}
          <div className="flex items-center space-x-3">
            {/* Leaderboard Button */}
            <button
              onClick={onOpenLeaderboard}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Leaderboard</span>
            </button>

            {/* Register Project Button */}
            {currentRole === 'student' && (
              <button
                onClick={onOpenRegisterModal}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
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
                className="w-8 h-8 rounded-full ring-1 ring-slate-300 object-cover"
              />
              <div className="hidden sm:block text-left">
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
