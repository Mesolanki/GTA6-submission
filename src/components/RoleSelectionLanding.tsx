import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, UserCheck, Shield, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';

export const RoleSelectionLanding: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-10">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full text-xs font-bold text-indigo-700">
          <Layers className="w-3.5 h-3.5" />
          <span>Project Monitoring & Mentoring System</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Select Your Access Portal
        </h1>
        <p className="text-sm text-slate-600">
          Access role-specific dashboards with distinct URLs for Student Teams, Faculty Mentors, and Academic Coordinators.
        </p>
      </div>

      {/* 3 Gateway Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Gateway 1: Student */}
        <Link
          to="/student"
          className="bg-white border border-slate-200 hover:border-indigo-400 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6 group"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Student Team Portal
              </h2>
              <p className="text-xs text-slate-500 mt-1">URL: <code className="text-indigo-600 font-mono font-bold">/student</code></p>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Submit proposal charters
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Upload PDF milestone reports
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Manage team task board
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-indigo-600">
            <span>Enter Student Portal</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Gateway 2: Faculty Mentor */}
        <Link
          to="/mentor"
          className="bg-white border border-slate-200 hover:border-purple-400 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6 group"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                Faculty Mentor Workbench
              </h2>
              <p className="text-xs text-slate-500 mt-1">URL: <code className="text-purple-600 font-mono font-bold">/mentor</code></p>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Review student deliverables
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Grade 5-part rubric marks (100 Marks)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Provide faculty suggestions
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-purple-600">
            <span>Enter Faculty Workbench</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Gateway 3: Coordinator Admin */}
        <Link
          to="/admin"
          className="bg-white border border-slate-200 hover:border-slate-400 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6 group"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                Coordinator Admin Desk
              </h2>
              <p className="text-xs text-slate-500 mt-1">URL: <code className="text-slate-800 font-mono font-bold">/admin</code></p>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> System KPI dashboards
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Assign faculty mentors
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Export CSV audit reports
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-slate-900">
            <span>Enter Coordinator Desk</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

      </div>

    </div>
  );
};
