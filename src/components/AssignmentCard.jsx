import React from 'react';
import { ChevronRight, FileCode2, Terminal, Tag } from 'lucide-react';
import CopyButton from './CopyButton';

export default function AssignmentCard({ assignment, onSelect }) {
  const isCpp = assignment.language === 'cpp';

  return (
    <div 
      onClick={() => onSelect(assignment)}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800/80 hover:border-sky-500/50 dark:hover:border-sky-500/50 shadow-sm hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
              #{assignment.id.toString().padStart(2, '0')}
            </span>
            <span className="inline-flex items-center text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
              <Tag className="w-3 h-3 mr-1 text-slate-400" />
              {assignment.fileName || assignment.topic}
            </span>
          </div>

          <span
            className={`text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
              isCpp
                ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60'
                : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
            }`}
          >
            {isCpp ? 'C++' : 'Python'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2 mb-2">
          {assignment.title}
        </h3>

        {/* Description snippet */}
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
          {assignment.question}
        </p>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <FileCode2 className="w-3.5 h-3.5 text-sky-500" />
          <span>{assignment.code.split('\n').length}L</span>
          <span>•</span>
          <Terminal className="w-3.5 h-3.5 text-emerald-500" />
          <span>Output Ready</span>
        </div>

        <div className="flex items-center space-x-1.5" onClick={(e) => e.stopPropagation()}>
          <CopyButton 
            text={assignment.code} 
            label="Copy" 
            size="sm" 
          />
          <button
            type="button"
            onClick={() => onSelect(assignment)}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            title="Open Detail View"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
