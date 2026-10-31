import React, { useState, useEffect, useMemo } from 'react';
import useOnlineStatus from './hooks/useOnlineStatus';
import Navbar from './components/Navbar';
import OfflineBanner from './components/OfflineBanner';
import FilterBar from './components/FilterBar';
import AssignmentCard from './components/AssignmentCard';
import AssignmentModal from './components/AssignmentModal';
import { assignments } from './data/assignments';
import { 
  BookOpen, 
  Terminal, 
  Cpu, 
  Sparkles, 
  SearchX, 
  Layers, 
  ShieldCheck,
  CheckCircle2,
  HardDrive
} from 'lucide-react';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('dsa_hub_theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

// Online / Offline state via custom hook
const isOnline = useOnlineStatus();

  // PWA Install Prompt State
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  // Selected assignment for modal detail view
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Synchronize Dark Theme class on <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dsa_hub_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dsa_hub_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Online/offline handling is now managed by the useOnlineStatus hook

  // Listen to PWA beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsAppInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsAppInstalled(true);
    }
    setInstallPrompt(null);
  };

  // Filtered Assignments calculation
  const filteredAssignments = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return assignments.filter((item) => {
      const matchCategory =
        selectedCategory === 'All' || item.topic === selectedCategory;
      const matchLanguage =
        selectedLanguage === 'all' || item.language === selectedLanguage;

      if (!matchCategory || !matchLanguage) return false;
      if (!q) return true;

      return (
        item.title.toLowerCase().includes(q) ||
        item.topic.toLowerCase().includes(q) ||
        item.question.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.language.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory, selectedLanguage]);

  // Modal navigation helpers
  const currentIndex = selectedAssignment
    ? filteredAssignments.findIndex((a) => a.id === selectedAssignment.id)
    : -1;

  const handlePrevAssignment = () => {
    if (currentIndex > 0) {
      setSelectedAssignment(filteredAssignments[currentIndex - 1]);
    }
  };

  const handleNextAssignment = () => {
    if (currentIndex >= 0 && currentIndex < filteredAssignments.length - 1) {
      setSelectedAssignment(filteredAssignments[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Navigation */}
      <Navbar 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        isOnline={isOnline} 
        installPrompt={installPrompt}
        onInstallApp={handleInstallApp}
        isAppInstalled={isAppInstalled}
      />

      {/* Offline Status & Notice Banner */}
      <OfflineBanner 
        isOnline={isOnline} 
        installPrompt={installPrompt} 
        onInstallApp={handleInstallApp} 
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Hero Section */}
        <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute right-0 top-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold mb-4 border border-sky-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Engineered for 100% Offline University Lab Practicals</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Data Structures & Algorithms <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300">
                Lab Code & Execution Vault
              </span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-5">
              Instant access to 20 comprehensive DSA lab practical implementations in C++ and Python with exact console outputs. Designed to run completely offline without internet or backend dependencies.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
              <div className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>20 Full Practicals</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>C++ & Python</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Offline Workbox Cache</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
                <span>1-Click Copy & Save</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <FilterBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          assignments={assignments}
          resultCount={filteredAssignments.length}
        />

        {/* Assignment Grid */}
        {filteredAssignments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAssignments.map((assignment) => (
              <AssignmentCard 
                key={assignment.id} 
                assignment={assignment} 
                onSelect={setSelectedAssignment}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <SearchX className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              No matching assignments found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-md mx-auto">
              No practical matched "{searchQuery}". Try searching for algorithms like "Binary Search", "Tree", "Graph", "Stack", or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedLanguage('all');
              }}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-md shadow-sky-500/20 transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800/80 py-6 bg-white dark:bg-slate-900/40 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">DSA Practical Hub</span>
            <span>—</span>
            <span>100% Offline PWA for Computer Science Students</span>
          </div>

          <div className="flex items-center space-x-4 font-mono text-[11px]">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">/</kbd> to search</span>
            <span>•</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">Esc</kbd> to close</span>
          </div>
        </div>
      </footer>

      {/* Detail View Modal */}
      {selectedAssignment && (
        <AssignmentModal
          assignment={selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
          onPrev={handlePrevAssignment}
          onNext={handleNextAssignment}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < filteredAssignments.length - 1}
        />
      )}

    </div>
  );
}
