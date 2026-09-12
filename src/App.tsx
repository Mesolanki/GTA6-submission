import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { StudentView } from './components/StudentView';
import { MentorView } from './components/MentorView';
import { AdminView } from './components/AdminView';
import { ProjectRegisterModal } from './components/ProjectRegisterModal';
import { LeaderboardModal } from './components/LeaderboardModal';

const MainContent: React.FC = () => {
  const { currentRole } = useApp();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Header with Quick Role Switcher */}
      <Header
        onOpenRegisterModal={() => setRegisterModalOpen(true)}
        onOpenLeaderboard={() => setLeaderboardOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentRole === 'student' && <StudentView />}
        {currentRole === 'mentor' && <MentorView />}
        {currentRole === 'admin' && <AdminView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500 glass-panel">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>ApexMonitor Project Monitoring System &copy; 2026. Rapid Web Challenge Edition.</div>
          <div className="flex items-center space-x-4 text-slate-400">
            <span>Student-Mentor-Coordinator Workflow</span>
            <span>•</span>
            <span>AI Plagiarism Check</span>
            <span>•</span>
            <span>UN SDG Tagging</span>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <ProjectRegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />

      <LeaderboardModal
        isOpen={leaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
      />

    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
