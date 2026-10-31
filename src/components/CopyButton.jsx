import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CopyButton({
  text,
  label = 'Copy',
  copiedLabel = 'Copied!',
  className = '',
  iconOnly = false,
  size = 'md'
}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async (e) => {
    e.stopPropagation();
    if (!text) return;

    let successful = false;

    // 1. Try modern navigator.clipboard if available and in secure context
    if (navigator?.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        successful = true;
      } catch (err) {
        console.warn('navigator.clipboard.writeText failed, falling back:', err);
      }
    }

    // 2. Fallback using hidden textarea & document.execCommand('copy')
    if (!successful) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '-9999px';
        textArea.style.left = '-9999px';
        textArea.setAttribute('readonly', '');
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        const execResult = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (execResult) {
          successful = true;
        }
      } catch (err) {
        console.error('Fallback execCommand copy failed:', err);
      }
    }

    // 3. Trigger immediate animated state if successful
    if (successful) {
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-3.5 py-2 gap-2',
    lg: 'text-base px-4 py-2.5 gap-2.5',
    iconSm: 'p-1.5',
    iconMd: 'p-2'
  };

  const currentSizeClass = iconOnly 
    ? (size === 'sm' ? sizeClasses.iconSm : sizeClasses.iconMd)
    : (sizeClasses[size] || sizeClasses.md);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? copiedLabel : label}
      title={copied ? copiedLabel : label}
      className={`inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 select-none shadow-sm active:scale-95 ${
        copied
          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-600 dark:bg-slate-800/90 dark:hover:bg-slate-700 dark:text-slate-200'
      } ${currentSizeClass} ${className}`}
    >
      <span className="relative flex items-center justify-center">
        {copied ? (
          <Check className="w-4 h-4 animate-in zoom-in-50 duration-200 text-white" />
        ) : (
          <Copy className="w-4 h-4 text-slate-300 group-hover:text-white" />
        )}
      </span>
      {!iconOnly && (
        <span className="font-mono tracking-tight font-semibold">
          {copied ? copiedLabel : label}
        </span>
      )}
    </button>
  );
}
