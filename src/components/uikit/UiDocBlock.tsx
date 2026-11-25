import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Check, Copy } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { playUiMotionSound } from '../../utils/uiMotionSound';

interface InfoPopoverProps {
  content: React.ReactNode;
  label: string;
}

export const InfoPopover: React.FC<InfoPopoverProps> = ({ content, label }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  if (!content) return null;

  return (
    <div ref={wrapperRef} className="relative inline-flex items-center shrink-0">
      <button
        type="button"
        onClick={() =>
          setOpen((prev) => {
            playUiMotionSound(!prev ? 'pop' : 'tick');
            return !prev;
          })
        }
        aria-label={`Keterangan ${label}`}
        aria-expanded={open}
        className={`w-[18px] h-[18px] rounded-full border inline-flex items-center justify-center text-[10px] font-semibold leading-none transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 ${
          open
            ? 'border-primary-500 bg-primary-50 dark:bg-[#ee2e65]/15 text-primary-600 dark:text-[#f895b5]'
            : 'border-gray-300 dark:border-white/[0.14] bg-white dark:bg-[#1B1E24] text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-white/25 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-[#232730]'
        }`}
      >
        ?
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={`Info ${label}`}
          className="animate-ui-pop absolute left-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-3rem)] rounded-xl border border-gray-300 dark:border-white/[0.12] bg-white/95 dark:bg-[#15181E]/95 backdrop-blur-sm p-3.5 text-xs text-gray-600 dark:text-gray-300 leading-relaxed shadow-[0_14px_34px_-10px_rgba(15,23,42,0.14)] dark:shadow-[0_18px_40px_-10px_rgba(0,0,0,0.65)] z-40"
        >
          {content}
        </div>
      )}
    </div>
  );
};

interface UiDocPageProps {
  title: string;
  description?: React.ReactNode;
  subLinks?: { id: string; label: string }[];
  children: React.ReactNode;
}

export const UiDocPage: React.FC<UiDocPageProps> = ({
  title,
  description,
  subLinks,
  children,
}) => {
  const scrollToSub = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8 print-section">
      {/* Minimalist Unboxed Page Header */}
      <div className="pb-4 border-b border-gray-300/85 dark:border-white/[0.08] space-y-2.5">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-[#F3F4F6] tracking-tight">{title}</h2>
          {description && <InfoPopover content={description} label={title} />}
        </div>

        {subLinks && subLinks.length > 1 && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            {subLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSub(link.id)}
                className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-[#ee2e65] transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Stacked Sub-sections with Staggered Entrance */}
      <div className="space-y-8 ui-stagger">{children}</div>
    </div>
  );
};

interface UiDocSectionProps {
  id?: string;
  title: string;
  description?: React.ReactNode;
  codeSnippet: string;
  classesHint?: string;
  actions?: React.ReactNode;
  noPadding?: boolean;
  children: React.ReactNode;
}

export const UiDocSection: React.FC<UiDocSectionProps> = ({
  id,
  title,
  description,
  codeSnippet,
  classesHint,
  actions,
  noPadding = false,
  children,
}) => {
  const { triggerToast } = useApp();
  const [activeTab, setActiveTab] = useState<'preview' | 'react' | 'classes'>('preview');
  const [copied, setCopied] = useState(false);

  const tabContainerRef = useRef<HTMLDivElement>(null);
  const previewTabRef = useRef<HTMLButtonElement>(null);
  const reactTabRef = useRef<HTMLButtonElement>(null);
  const classesTabRef = useRef<HTMLButtonElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const updateIndicator = useCallback(() => {
    const activeBtn =
      activeTab === 'preview'
        ? previewTabRef.current
        : activeTab === 'react'
        ? reactTabRef.current
        : classesTabRef.current;
    if (!activeBtn) return;
    setIndicatorStyle({
      left: activeBtn.offsetLeft,
      width: activeBtn.offsetWidth,
    });
  }, [activeTab]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator, classesHint]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    triggerToast('Disalin', `${label} disalin ke papan klip.`, 'success');
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id={id} className="space-y-3 scroll-mt-6">
      {/* Minimalist Section Title + Optional ? Popover */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-[15px] font-semibold text-gray-900 dark:text-[#F3F4F6] tracking-tight">{title}</h3>
          {description && <InfoPopover content={description} label={title} />}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-1.5 shrink-0">{actions}</div>}
      </div>

      {/* Single-elevation Preview Container */}
      <div className="rounded-xl border border-gray-300/90 dark:border-white/[0.10] bg-white dark:bg-[#15181E] overflow-hidden transition-shadow duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0_6px_20px_-10px_rgba(15,23,42,0.08)] dark:hover:shadow-[0_10px_28px_-12px_rgba(0,0,0,0.65)]">
        <div className="px-4 border-b border-gray-300 dark:border-white/[0.08] flex items-center justify-between gap-3 bg-white dark:bg-[#181B21]">
          <div ref={tabContainerRef} className="relative flex items-center gap-5 text-xs">
            <button
              ref={previewTabRef}
              type="button"
              onClick={() => {
                if (activeTab !== 'preview') playUiMotionSound('tick');
                setActiveTab('preview');
              }}
              className={`py-2.5 font-semibold transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer whitespace-nowrap ${
                activeTab === 'preview'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Preview
            </button>
            <button
              ref={reactTabRef}
              type="button"
              onClick={() => {
                if (activeTab !== 'react') playUiMotionSound('tick');
                setActiveTab('react');
              }}
              className={`py-2.5 font-semibold transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer whitespace-nowrap ${
                activeTab === 'react'
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              React
            </button>
            {classesHint && (
              <button
                ref={classesTabRef}
                type="button"
                onClick={() => {
                  if (activeTab !== 'classes') playUiMotionSound('tick');
                  setActiveTab('classes');
                }}
                className={`py-2.5 font-semibold transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer whitespace-nowrap ${
                  activeTab === 'classes'
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                Classes
              </button>
            )}
            <span
              aria-hidden="true"
              style={{
                width: `${indicatorStyle.width}px`,
                transform: `translate3d(${indicatorStyle.left}px, 0, 0)`,
              }}
              className="pointer-events-none absolute bottom-0 left-0 h-[2px] rounded-full bg-primary-600 transition-[transform,width] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
            />
          </div>

          <button
            type="button"
            onClick={() =>
              handleCopy(
                activeTab === 'classes' && classesHint ? classesHint : codeSnippet,
                title
              )
            }
            className="inline-grid place-items-center text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#1B1E24] transition-colors duration-200 cursor-pointer whitespace-nowrap"
          >
            <span
              className={`[grid-area:1/1] inline-flex items-center gap-1.5 transition-opacity duration-150 ${
                copied ? 'opacity-0 invisible' : 'opacity-100'
              }`}
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Salin</span>
            </span>
            <span
              aria-hidden={!copied}
              className={`[grid-area:1/1] inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 transition-opacity duration-150 ${
                copied ? 'opacity-100' : 'opacity-0 invisible'
              }`}
            >
              <Check className="w-3.5 h-3.5 animate-ui-check" />
              <span>Disalin</span>
            </span>
          </button>
        </div>

        {activeTab === 'preview' && (
          <div key="preview" className={`animate-ui-fade ${noPadding ? '' : 'p-5 sm:p-6'}`}>
            {children}
          </div>
        )}

        {activeTab === 'react' && (
          <div
            key="react"
            data-dark-preserve="true"
            className="animate-ui-fade p-4 sm:p-5 bg-[#0E1014] text-gray-100 overflow-x-auto border-t border-white/[0.06]"
          >
            <pre className="text-xs font-mono leading-relaxed whitespace-pre">{codeSnippet}</pre>
          </div>
        )}

        {activeTab === 'classes' && classesHint && (
          <div key="classes" className="animate-ui-fade p-4 sm:p-5 bg-gray-50/70 dark:bg-[#121418] text-xs font-mono text-gray-700 dark:text-gray-300">
            <div className="p-3 rounded-lg bg-white dark:bg-[#1B1E24] border border-gray-300 dark:border-white/[0.10] break-words leading-relaxed">
              {classesHint}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
