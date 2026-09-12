import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trophy, ExternalLink } from 'lucide-react';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ isOpen, onClose }) => {
  const { projects } = useApp();

  if (!isOpen) return null;

  const rankedProjects = projects
    .map(p => {
      const highestSub = p.submissions.reduce(
        (max, s) => (s.totalScore && s.totalScore > max ? s.totalScore : max),
        0
      );
      return {
        project: p,
        bestScore: highestSub || (p.status === 'Approved' ? 88 : 70)
      };
    })
    .sort((a, b) => b.bestScore - a.bestScore);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <span className="text-xl">🥇 Gold 1st</span>;
    if (rank === 2) return <span className="text-xl">🥈 Silver 2nd</span>;
    if (rank === 3) return <span className="text-xl">🥉 Bronze 3rd</span>;
    return <span className="text-xs font-bold text-slate-500 font-mono">Rank #{rank}</span>;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-xl p-6 text-slate-900 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Best-Project Leaderboard</h2>
              <p className="text-xs text-slate-500">Top evaluated student projects based on faculty rubric marks</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Leaderboard Table */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {rankedProjects.map(({ project, bestScore }, idx) => (
            <div
              key={project.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                idx === 0
                  ? 'bg-amber-50/80 border-amber-200 shadow-xs'
                  : idx === 1
                  ? 'bg-slate-50 border-slate-200'
                  : idx === 2
                  ? 'bg-orange-50/60 border-orange-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <div className="font-bold">{getRankBadge(idx + 1)}</div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{project.title}</h3>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                      <span>Team: <strong className="text-slate-800">{project.teamName}</strong></span>
                      <span>•</span>
                      <span className="text-indigo-600 font-medium">{project.sdgTag}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 self-end sm:self-center">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Marks</div>
                  <div className="text-xl font-extrabold text-amber-700">{bestScore} / 100</div>
                </div>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
                  title="View Repository"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
