import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Columns, 
  FileCode, 
  Terminal, 
  Info,
  Layers,
  Sparkles 
} from 'lucide-react';
import CodeViewer from './CodeViewer';
import TerminalOutput from './TerminalOutput';

export default function AssignmentModal({
  assignment,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext
}) {
  const [activeTab, setActiveTab] = useState(() => (assignment?.output ? 'split' : 'code')); // 'split' | 'code' | 'output'

  // Reset tab when assignment changes
  useEffect(() => {
    setActiveTab(assignment?.output ? 'split' : 'code');
  }, [assignment?.id]);

  // Keyboard navigation: Escape to close, Left/Right arrows for prev/next
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      else if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  // Lock background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!assignment) return null;

  const isCpp = assignment.language === 'cpp';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div 
        className="w-full max-w-6xl max-h-[94vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">
              #{assignment.id.toString().padStart(2, '0')}
            </span>
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {assignment.fileName || assignment.topic}
            </span>
            <span
              className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full uppercase ${
                isCpp
                  ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                  : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
              }`}
            >
              {isCpp ? 'C++' : 'Python'}
            </span>
          </div>

          {/* Navigation & Close */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className={`p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 transition-all ${
                hasPrev 
                  ? 'hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white' 
                  : 'opacity-40 cursor-not-allowed'
              }`}
              title="Previous Practical (Left Arrow)"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={onNext}
              disabled={!hasNext}
              className={`p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 transition-all ${
                hasNext 
                  ? 'hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white' 
                  : 'opacity-40 cursor-not-allowed'
              }`}
              title="Next Practical (Right Arrow)"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-200/80 hover:bg-rose-500 hover:text-white dark:bg-slate-800 dark:hover:bg-rose-500 text-slate-700 dark:text-slate-300 transition-all ml-1"
              title="Close modal (Escape)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Title and Problem Description */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800/60 bg-white dark:bg-slate-900">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            {assignment.title}
          </h2>
          <div className="flex items-start space-x-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80">
            <Info className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{assignment.question}</p>
          </div>
        </div>

        {/* View Layout Tabs */}
        <div className="px-6 pt-3 pb-2 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-950/30">
          <div className="flex items-center space-x-1.5 p-1 bg-slate-200/60 dark:bg-slate-800/60 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('split')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                activeTab === 'split'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Split View</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                activeTab === 'code'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Source Code</span>
            </button>

            <button
              onClick={() => setActiveTab('output')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                activeTab === 'output'
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Terminal Output</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 hidden md:block font-mono">
            Use ← → arrow keys to navigate
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-slate-100/50 dark:bg-slate-950/80 space-y-6">
          {activeTab === 'split' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              <div className="lg:col-span-7">
                <CodeViewer 
                  code={assignment.code} 
                  language={assignment.language} 
                  title={assignment.title}
                />
              </div>
              <div className="lg:col-span-5 sticky top-0">
                <TerminalOutput 
                  output={assignment.output} 
                  title={assignment.title} 
                />
              </div>
            </div>
          ) : activeTab === 'code' ? (
            <div className="max-w-4xl mx-auto">
              <CodeViewer 
                code={assignment.code} 
                language={assignment.language} 
                title={assignment.title}
              />
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <TerminalOutput 
                output={assignment.output} 
                title={assignment.title} 
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
