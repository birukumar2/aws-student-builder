import { useEffect, useState } from 'react';
import logo from '@/assets/logo/aws_logo.jpeg';

const WORDS = ['LEARN', 'BUILD', 'COLLABORATE', 'GROW'];

type BootLine = {
  at: number;
  text: string;
  okAt?: number;
  accent?: boolean;
};

const BOOT_LINES: BootLine[] = [
  { at: 0, text: '> aws-sbg://boot --init' },
  { at: 16, text: '> authenticating builder_credentials', okAt: 32 },
  { at: 36, text: '> mounting cloud_workspaces [EC2 · S3 · LAMBDA]', okAt: 52 },
  { at: 56, text: '> loading skill_stack [CLOUD · AI/ML · DEVOPS]', okAt: 72 },
  { at: 76, text: '> establishing community_link', okAt: 92 },
  { at: 96, text: '> ACCESS GRANTED_', accent: true },
];

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 9 + 4, 100));
    }, 95);
    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const exitTimer = setTimeout(() => setExiting(true), 400);
    const doneTimer = setTimeout(onComplete, 1100);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [progress, onComplete]);

  const pct = Math.floor(progress);
  const wordIndex = Math.min(Math.floor(progress / 25), WORDS.length - 1);

  return (
    <div
      role="status"
      aria-label="Loading AWS SBG GEC Buxar"
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-[#05070a] px-6 transition-transform duration-[680ms] ease-[cubic-bezier(.76,0,.24,1)] ${
        exiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <span className="absolute left-5 top-5 font-mono text-[9px] tracking-[.16em] text-[#687487]">/// BOOT SEQUENCE</span>
      <span className="absolute right-5 top-5 hidden font-mono text-[9px] tracking-[.16em] text-[#687487] sm:block">CHAPTER 2026–2027</span>
      <span className="absolute bottom-5 left-5 font-mono text-[9px] tracking-[.16em] text-[#687487]">BUXAR · BIHAR</span>
      <span className="absolute bottom-5 right-5 hidden font-mono text-[9px] tracking-[.16em] text-[#687487] sm:block">V 2026.08</span>

      <div
        className={`w-full max-w-xl transition-all duration-300 ${
          exiting ? 'translate-y-8 opacity-0' : ''
        }`}
      >
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt=""
            className="h-12 w-12 rounded-xl border border-white/15 object-contain p-1"
          />
          <div className="flex-1">
            <div className="font-mono text-[10px] font-medium tracking-[.22em] text-[#f5f7fb]">
              AWS SBG · GEC BUXAR
            </div>
            <div className="mt-1 font-mono text-[9px] tracking-[.14em] text-[#687487]">
              STUDENT BUILDER GROUP
            </div>
          </div>
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#ffd43b] shadow-[0_0_14px_#ffd43b]" />
        </div>

        <div className="mt-12 flex items-end justify-between gap-6">
          <span className="bg-gradient-to-br from-white via-[#e8edf5] to-[#7DA9E8] bg-clip-text font-mono text-7xl font-medium leading-none tracking-tighter text-transparent md:text-8xl">
            {pct}
            <span className="text-[#ffd43b]">%</span>
          </span>
          <span className="pb-1 text-right font-mono text-sm font-bold tracking-[.1em] text-white md:text-base">
            {WORDS[wordIndex]}
            <span className="cursor-blink text-[#ffd43b]">_</span>
          </span>
        </div>

        <div className="mt-6 h-[3px] w-full overflow-hidden bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#FFD43B] to-[#FFE477] shadow-[0_0_12px_rgba(255,212,59,.55)] transition-[width] duration-150 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="mt-7 min-h-[11rem] space-y-2 border border-white/10 bg-white/[.03] p-4 font-mono text-[10px] leading-relaxed md:min-h-[12rem] md:text-[11px]">
          {BOOT_LINES.filter((line) => progress >= line.at).map((line) => (
            <div key={line.text} className={line.accent ? 'font-bold text-[#ffd43b]' : 'text-[#687487]'}>
              {line.text}
              {line.okAt !== undefined && (
                progress >= line.okAt ? (
                  <span className="ml-3 font-bold text-[#ffd43b]">OK</span>
                ) : (
                  <span className="cursor-blink ml-1 text-[#ffd43b]">▍</span>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
