import React from 'react';
import { 
  Code2, 
  Sun, 
  Moon, 
  Wifi, 
  WifiOff, 
  Download, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export default function Navbar({ 
  isDark, 
  toggleTheme, 
  isOnline, 
  installPrompt, 
  onInstallApp, 
  isAppInstalled 
}) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/25">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                  DSA<span className="text-sky-500 dark:text-sky-400">Hub</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                  v1.0 Offline PWA
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Data Structures & Algorithms Practical Vault
              </p>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Offline/Online Status Badge */}
            <div 
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                isOnline 
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60' 
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60 animate-pulse'
              }`}
              title={isOnline ? 'Network Connected (100% Offline Cache Available)' : 'Operating Fully Offline'}
            >
              {isOnline ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75"></span>
                  <span className="hidden md:inline font-mono">Offline-Ready</span>
                  <Wifi className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="font-mono">100% Offline Mode</span>
                  <WifiOff className="w-3.5 h-3.5" />
                </>
              )}
            </div>

            {/* Install PWA Button (if installable and not already installed) */}
            {installPrompt && !isAppInstalled && (
              <button
                type="button"
                onClick={onInstallApp}
                className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-500/20 active:scale-95 transition-all"
                title="Install App for standalone desktop/mobile usage"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Install App</span>
              </button>
            )}

            {isAppInstalled && (
              <div className="hidden sm:flex items-center space-x-1 text-xs text-sky-600 dark:text-sky-400 font-medium px-2 py-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Installed</span>
              </div>
            )}

            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Dark/Light Mode"
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
