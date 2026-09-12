import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { StudentView } from './components/StudentView';
import { MentorView } from './components/MentorView';
import { AdminView } from './components/AdminView';
import { RoleSelectionLanding } from './components/RoleSelectionLanding';
import { ProjectRegisterModal } from './components/ProjectRegisterModal';
import { LeaderboardModal } from './components/LeaderboardModal';

const RoleSyncEffect: React.FC = () => {
  const { setCurrentRole } = useApp();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname.startsWith('/student')) {
      setCurrentRole('student');
    } else if (location.pathname.startsWith('/mentor')) {
      setCurrentRole('mentor');
    } else if (location.pathname.startsWith('/admin')) {
      setCurrentRole('admin');
    }
  }, [location.pathname, setCurrentRole]);

  return null;
};

const MainContent: React.FC = () => {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <RoleSyncEffect />
      
      {/* Header */}
      <Header
        onOpenRegisterModal={() => setRegisterModalOpen(true)}
        onOpenLeaderboard={() => setLeaderboardOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<RoleSelectionLanding />} />
          <Route path="/student" element={<StudentView />} />
          <Route path="/mentor" element={<MentorView />} />
          <Route path="/admin" element={<AdminView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>ApexMonitor Project Monitoring System &copy; 2026. All rights reserved.</div>
          <div className="text-slate-400">Student • Faculty Mentor • Coordinator Admin</div>
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
    <BrowserRouter>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
