import React, { useState } from 'react';
import { HardDriveDownload, WifiOff, X, Sparkles, Check } from 'lucide-react';

export default function OfflineBanner({ isOnline, installPrompt, onInstallApp }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  if (!isOnline) {
    return (
      <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-800 dark:text-amber-300 px-4 py-2 text-xs flex items-center justify-between">
        <div className="flex items-center space-x-2 max-w-7xl mx-auto w-full">
          <WifiOff className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            <strong>Offline Mode Active:</strong> You have no network connection, but all 20 DSA practical codes and search functions are 100% functional.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-transparent border-b border-sky-500/20 text-slate-700 dark:text-slate-300 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-sky-500 shrink-0" />
          <span>
            <strong>100% Offline PWA:</strong> Cached locally for lab exams & no-internet computer centers.
          </span>
          {installPrompt && (
            <button
              onClick={onInstallApp}
              className="underline text-sky-600 dark:text-sky-400 font-semibold hover:text-sky-500 ml-1 inline-flex items-center gap-1"
            >
              <HardDriveDownload className="w-3 h-3" />
              Install to desktop/phone
            </button>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          title="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
