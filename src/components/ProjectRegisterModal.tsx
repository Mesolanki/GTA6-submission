import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { TeamMember } from '../types';
import { X, Plus, Trash2, FolderPlus, Code, Users, UserCheck, ShieldCheck, AlertTriangle } from 'lucide-react';

interface ProjectRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectRegisterModal: React.FC<ProjectRegisterModalProps> = ({ isOpen, onClose }) => {
  const { registerProject, mentors } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Game Engine & Graphics');
  const [problemStatement, setProblemStatement] = useState('');
  const [objectives, setObjectives] = useState('');
  const [sdgTag, setSdgTag] = useState('SDG 9: Industry, Innovation & Infrastructure');
  const [techStackInput, setTechStackInput] = useState('React, TypeScript, C++, Vulkan');
  const [teamName, setTeamName] = useState('');
  const [selectedMentorId, setSelectedMentorId] = useState('');
  const [githubUrl, setGithubUrl] = useState('');

  const [similarityResult, setSimilarityResult] = useState<number | null>(null);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 'tm-init-1', name: '', email: '', rollNo: '', roleInTeam: 'Team Leader' }
  ]);

  if (!isOpen) return null;

  const handleAddMember = () => {
    setTeamMembers(prev => [
      ...prev,
      { id: `tm-${Date.now()}`, name: '', email: '', rollNo: '', roleInTeam: 'Developer' }
    ]);
  };

  const handleRemoveMember = (id: string) => {
    if (teamMembers.length <= 1) return;
    setTeamMembers(prev => prev.filter(m => m.id !== id));
  };

  const handleMemberChange = (id: string, field: keyof TeamMember, value: string) => {
    setTeamMembers(prev =>
      prev.map(m => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !problemStatement || !teamName) return;

    const techStack = techStackInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const simScore = registerProject({
      title,
      category,
      problemStatement,
      objectives,
      sdgTag,
      techStack,
      teamName,
      mentorId: selectedMentorId || undefined,
      githubUrl: githubUrl || 'https://github.com',
      teamMembers: teamMembers.filter(m => m.name.trim().length > 0)
    });

    setSimilarityResult(simScore);

    setTimeout(() => {
      setSimilarityResult(null);
      onClose();
      // Reset form
      setTitle('');
      setProblemStatement('');
      setObjectives('');
      setTeamName('');
      setGithubUrl('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl p-6 text-slate-900 my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Project Registration & Proposal Submission</h2>
              <p className="text-xs text-slate-500">Create project profile, define problem statement, and select mentor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {similarityResult !== null ? (
          <div className="py-10 flex flex-col items-center justify-center space-y-3">
            {similarityResult > 30 ? (
              <div className="w-14 h-14 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
                <AlertTriangle className="w-8 h-8" />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                <ShieldCheck className="w-8 h-8" />
              </div>
            )}
            <h3 className="text-lg font-bold text-slate-900">AI Duplicate Detection Analysis</h3>
            <div className="text-xs font-mono px-3 py-1 rounded bg-slate-100 border border-slate-200 text-indigo-900 font-bold">
              Similarity Score: {similarityResult}% (Unique Proposal)
            </div>
            <p className="text-xs text-slate-600 text-center max-w-sm">
              Registered successfully! Advanced to <strong>Stage 1: Proposal / Idea Charter</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Title & Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-slate-700">Project Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. GTA VI Real-Time Vulkan Shader Mod"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Domain / Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                >
                  <option value="Game Engine & Graphics">Game Engine & Graphics</option>
                  <option value="Artificial Intelligence & Robotics">AI & Robotics</option>
                  <option value="Blockchain & Security">Blockchain & Security</option>
                  <option value="Audio Processing & Speech AI">Audio & Speech AI</option>
                  <option value="Cloud & Distributed Systems">Cloud Systems</option>
                </select>
              </div>
            </div>

            {/* Problem Statement */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Problem Statement *</label>
              <textarea
                required
                rows={2}
                value={problemStatement}
                onChange={e => setProblemStatement(e.target.value)}
                placeholder="Clearly define the specific engineering or research problem being solved..."
                className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Objectives & SDG */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Project Objectives</label>
                <textarea
                  rows={2}
                  value={objectives}
                  onChange={e => setObjectives(e.target.value)}
                  placeholder="Key deliverables and target benchmarks..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">UN SDG Mapping Tag</label>
                <select
                  value={sdgTag}
                  onChange={e => setSdgTag(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                >
                  <option value="SDG 9: Industry, Innovation & Infrastructure">SDG 9: Industry & Innovation</option>
                  <option value="SDG 4: Quality Education">SDG 4: Quality Education</option>
                  <option value="SDG 11: Sustainable Cities & Communities">SDG 11: Sustainable Cities</option>
                  <option value="SDG 3: Good Health & Well-Being">SDG 3: Good Health</option>
                </select>
              </div>
            </div>

            {/* Tech Stack & Github */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Code className="w-3.5 h-3.5 text-indigo-600" /> Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={techStackInput}
                  onChange={e => setTechStackInput(e.target.value)}
                  placeholder="React, C++, DirectX 12, Python"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">GitHub Repository URL</label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={e => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/team/repo"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Team Name & Mentor Preference */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-purple-600" /> Team Name *
                </label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={e => setTeamName(e.target.value)}
                  placeholder="e.g. CyberPulse Tech"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> Preferred Faculty Mentor
                </label>
                <select
                  value={selectedMentorId}
                  onChange={e => setSelectedMentorId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                >
                  <option value="">Select Mentor (Or Coordinator Assign Later)</option>
                  {mentors.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.department})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Team Members List */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">Team Roster</label>
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="flex items-center space-x-1 text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Member
                </button>
              </div>

              {teamMembers.map((member) => (
                <div key={member.id} className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={member.name}
                    onChange={e => handleMemberChange(member.id, 'name', e.target.value)}
                    className="px-2.5 py-1 rounded bg-white border border-slate-200 text-xs text-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="Roll No (e.g. CS2024-001)"
                    value={member.rollNo}
                    onChange={e => handleMemberChange(member.id, 'rollNo', e.target.value)}
                    className="px-2.5 py-1 rounded bg-white border border-slate-200 text-xs text-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="Role (e.g. Team Leader)"
                    value={member.roleInTeam}
                    onChange={e => handleMemberChange(member.id, 'roleInTeam', e.target.value)}
                    className="px-2.5 py-1 rounded bg-white border border-slate-200 text-xs text-slate-900"
                  />
                  <div className="flex items-center justify-end space-x-2">
                    {teamMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member.id)}
                        className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
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
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center space-x-1"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Submit & Run AI Check</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
