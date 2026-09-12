import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Shield, GraduationCap, UserCheck, PlusCircle, Layers, Trophy } from 'lucide-react';

interface HeaderProps {
  onOpenRegisterModal: () => void;
  onOpenLeaderboard: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenRegisterModal, onOpenLeaderboard }) => {
  const { currentUser } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Brand Logo & Clean Title (Photo 2 Fix: Removed blue tint badge box) */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
                ApexMonitor
              </h1>
              <p className="text-xs text-slate-500">Project Monitoring & Mentoring System</p>
            </div>
          </div>

          {/* Clean URL Role Routing Links (Photo 1 Fix: Removed Role View box, using distinct path routes) */}
          <nav className="flex items-center space-x-1 border border-slate-200 p-1 rounded-xl bg-white">
            <NavLink
              to="/student"
              className={({ isActive }) =>
                `flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student Portal</span>
            </NavLink>

            <NavLink
              to="/mentor"
              className={({ isActive }) =>
                `flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Faculty Mentor</span>
            </NavLink>

            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Coordinator Admin</span>
            </NavLink>
          </nav>

          {/* Action Buttons & User Avatar */}
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
            <button
              onClick={onOpenRegisterModal}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Register Project</span>
            </button>

            {/* User Avatar */}
            <div className="flex items-center space-x-2 border-l border-slate-200 pl-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full ring-1 ring-slate-300 object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
