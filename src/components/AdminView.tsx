import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  CheckCircle2,
  Clock,
  Download,
  UserPlus,
  Trash2,
  Search,
  Layers
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { projects, mentors, assignMentor, deleteProject } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Stats calculation
  const totalProjects = projects.length;
  const approvedProjects = projects.filter(p => p.status === 'Approved' || p.status === 'Completed').length;
  const pendingProjects = projects.filter(p => p.status === 'In Review' || p.status === 'Submitted').length;
  const unassignedProjects = projects.filter(p => !p.mentorId).length;
  const approvalRate = totalProjects > 0 ? Math.round((approvedProjects / totalProjects) * 100) : 0;

  const filteredProjects = projects.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.mentorName && p.mentorName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'all' ? true : p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleExportCSV = () => {
    const headers = ['Project ID', 'Title', 'Category', 'Team Name', 'Mentor Name', 'Status', 'Progress %'];
    const rows = projects.map(p => [
      p.id,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      `"${p.teamName}"`,
      `"${p.mentorName || 'Unassigned'}"`,
      p.status,
      `${p.progressPercentage}%`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Academic_Project_Audit_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="relative overflow-hidden glass-panel rounded-2xl p-6 border border-white/10">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">Academic Coordinator Portal</span>
            <h2 className="text-2xl font-black text-white tracking-tight mt-1">
              System Administration & Monitoring
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Oversee department-wide project progress, assign faculty mentors to student teams, audit scorecards, and generate official compliance reports.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white shadow-lg shadow-amber-500/20 transition-all hover:scale-105 self-start md:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Export Audit Report (CSV)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1 */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Registered Projects</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalProjects}</div>
          <div className="text-[11px] text-cyan-400 font-medium">{unassignedProjects} needing mentor allocation</div>
        </div>

        {/* Card 2 */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Overall Approval Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{approvalRate}%</div>
          <div className="text-[11px] text-slate-400 font-medium">{approvedProjects} projects fully approved</div>
        </div>

        {/* Card 3 */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Active Faculty Mentors</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-400">{mentors.length}</div>
          <div className="text-[11px] text-slate-400 font-medium">Across 3 academic labs</div>
        </div>

        {/* Card 4 */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Under Evaluation</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">{pendingProjects}</div>
          <div className="text-[11px] text-slate-400 font-medium">Active milestone reviews</div>
        </div>

      </div>

      {/* Master Audit Grid & Mentor Allocation Table */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
        
        {/* Table Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">Project Registry & Mentor Assignment Desk</h3>
            <p className="text-xs text-slate-400">Assign supervisors and audit live project status</p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search projects, teams, mentors..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-950/70 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-amber-500 w-52"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="bg-slate-950/70 text-xs text-slate-200 border border-white/10 rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="Game Engine & Graphics">Game Engine & Graphics</option>
              <option value="Artificial Intelligence & Robotics">AI & Robotics</option>
              <option value="Blockchain & Security">Blockchain & Security</option>
              <option value="Audio Processing & Speech AI">Audio & Speech AI</option>
            </select>
          </div>
        </div>

        {/* Master Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">Project & Category</th>
                <th className="py-3 px-3">Team Info</th>
                <th className="py-3 px-3">Assigned Faculty Mentor</th>
                <th className="py-3 px-3">Progress</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredProjects.map(proj => (
                <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors">
                  
                  {/* Title & Category */}
                  <td className="py-3 px-3 space-y-0.5">
                    <div className="font-bold text-white">{proj.title}</div>
                    <div className="text-[10px] text-cyan-400">{proj.category}</div>
                  </td>

                  {/* Team */}
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-200">{proj.teamName}</div>
                    <div className="text-[10px] text-slate-400">{proj.teamMembers.length} Members</div>
                  </td>

                  {/* Mentor Selector */}
                  <td className="py-3 px-3">
                    <div className="flex items-center space-x-1.5">
                      <UserPlus className="w-3.5 h-3.5 text-purple-400" />
                      <select
                        value={proj.mentorId || ''}
                        onChange={e => assignMentor(proj.id, e.target.value)}
                        className={`text-xs rounded px-2 py-1 border focus:outline-none ${
                          proj.mentorId
                            ? 'bg-slate-900 border-white/10 text-slate-200'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-300 font-bold'
                        }`}
                      >
                        <option value="">-- Assign Mentor --</option>
                        {mentors.map(m => (
                          <option key={m.id} value={m.id}>
                            {m.name} ({m.department})
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>

                  {/* Progress Bar */}
                  <td className="py-3 px-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 rounded-full"
                          style={{ width: `${proj.progressPercentage}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-300">{proj.progressPercentage}%</span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300 border border-white/10">
                      {proj.status}
                    </span>
                  </td>

                  {/* Delete / Actions */}
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete project "${proj.title}"?`)) {
                          deleteProject(proj.id);
                        }
                      }}
                      className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
