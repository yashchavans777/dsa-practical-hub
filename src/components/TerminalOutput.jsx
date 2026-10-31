import React from 'react';
import { Terminal, CornerDownLeft } from 'lucide-react';
import CopyButton from './CopyButton';

export default function TerminalOutput({ output, title }) {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0d1117] shadow-xl flex flex-col">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          {/* macOS traffic light circles */}
          <div className="flex items-center space-x-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block border border-rose-600/50"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/50"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/50"></span>
          </div>

          <div className="flex items-center space-x-2 text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-mono font-medium text-slate-300">
              stdout — bash session
            </span>
          </div>
        </div>

        <div>
          <CopyButton text={output} label="Copy Output" size="sm" />
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 overflow-x-auto bg-[#090d14] font-mono text-xs md:text-sm text-slate-200 leading-relaxed scrollbar-thin">
        <div className="flex items-center space-x-2 text-slate-500 text-xs mb-3 select-none border-b border-slate-800/40 pb-2">
          <CornerDownLeft className="w-3.5 h-3.5 text-emerald-500" />
          <span>Execution Output (Simulated Exit Code 0)</span>
        </div>
        <pre className="whitespace-pre font-mono text-emerald-300/90 selection:bg-emerald-800 selection:text-white">
          {output}
        </pre>
      </div>
    </div>
  );
}
