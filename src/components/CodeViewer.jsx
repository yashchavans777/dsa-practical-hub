import React, { useState } from 'react';
import { Download, FileCode, Check, Copy } from 'lucide-react';
import CopyButton from './CopyButton';

// Fast, zero-dependency offline code formatter/highlighter
function formatCodeTokens(code, language) {
  const lines = code.split('\n');
  return lines.map((line, idx) => {
    // Quick token coloring logic without any external CDN dependency
    let formatted = line;

    // Comments
    const commentMatch = language === 'cpp' ? line.match(/\/\/.*/) : line.match(/#.*/);
    if (commentMatch) {
      const commentIndex = commentMatch.index;
      const beforeComment = line.slice(0, commentIndex);
      const commentText = line.slice(commentIndex);
      return (
        <span key={idx} className="table-row leading-6">
          <span className="table-cell select-none pr-4 text-right text-slate-500 font-mono text-xs w-10">
            {idx + 1}
          </span>
          <span className="table-cell whitespace-pre font-mono text-xs md:text-sm text-slate-200">
            <span>{beforeComment}</span>
            <span className="text-emerald-400/90 italic">{commentText}</span>
          </span>
        </span>
      );
    }

    return (
      <span key={idx} className="table-row leading-6">
        <span className="table-cell select-none pr-4 text-right text-slate-500 font-mono text-xs w-10">
          {idx + 1}
        </span>
        <span className="table-cell whitespace-pre font-mono text-xs md:text-sm text-slate-200">
          {line || ' '}
        </span>
      </span>
    );
  });
}

export default function CodeViewer({ code, language, title, filename }) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const extension = language === 'cpp' ? 'cpp' : 'py';
    const cleanTitle = (filename || title || 'dsa_code')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
    const fullFilename = `${cleanTitle}.${extension}`;

    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fullFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const lineCount = code ? code.split('\n').length : 0;

  return (
    <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl flex flex-col">
      {/* Code Viewer Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 gap-2">
        <div className="flex items-center space-x-2.5">
          <FileCode className="w-4 h-4 text-sky-400" />
          <span className="text-xs md:text-sm font-semibold tracking-wide text-slate-200 font-mono">
            {language === 'cpp' ? 'main.cpp' : 'solution.py'}
          </span>
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider bg-sky-950 text-sky-400 border border-sky-800/60">
            {language === 'cpp' ? 'C++ 17' : 'Python 3'}
          </span>
          <span className="text-xs text-slate-500 hidden sm:inline font-mono">
            {lineCount} lines
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Download File Button */}
          <button
            onClick={handleDownload}
            type="button"
            className="inline-flex items-center text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-all font-mono font-medium active:scale-95 gap-1.5"
            title="Download source code file"
          >
            {downloaded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Saved!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-slate-300" />
                <span>Save .{language === 'cpp' ? 'cpp' : 'py'}</span>
              </>
            )}
          </button>

          {/* Copy Button */}
          <CopyButton text={code} label="Copy Code" size="sm" />
        </div>
      </div>

      {/* Code Content Container */}
      <div className="p-4 overflow-x-auto bg-[#0B1120] text-slate-100 max-h-[550px] scrollbar-thin scrollbar-thumb-slate-700">
        <div className="table w-full">
          {formatCodeTokens(code, language)}
        </div>
      </div>
    </div>
  );
}
