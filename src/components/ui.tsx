import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
  type CSSProperties,
} from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../utils/cn';

/* ═══════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════ */

export function useTyping(
  texts: string[],
  { type = 62, del = 28, hold = 1900 } = {}
) {
  const [text, setText] = useState('');
  const [i, setI] = useState(0);
  const [del_, setDel] = useState(false);

  useEffect(() => {
    const full = texts[i % texts.length];
    if (!del_ && text === full) {
      const t = setTimeout(() => setDel(true), hold);
      return () => clearTimeout(t);
    }
    if (del_ && text === '') {
      setDel(false);
      setI((p) => (p + 1) % texts.length);
      return;
    }
    const t = setTimeout(
      () => setText(del_ ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
      del_ ? del : type
    );
    return () => clearTimeout(t);
  }, [text, i, del_, texts, type, del, hold]);

  return text;
}

export function useCountUp(end: number, duration = 1800, decimals = 0) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Number((eased * end).toFixed(decimals)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration, decimals]);

  return { val, ref };
}

/** Attaches pointer-tracking CSS vars to a card for the spotlight effect */
export function useSpot() {
  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return { onMouseMove };
}

/* ═══════════════════════════════════════════════════════════════
   ICONS (custom brand marks lucide doesn't ship)
   ═══════════════════════════════════════════════════════════════ */

export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.35.78 1.05.78 2.12v3.14c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.96 1.83-1.97 3.77-1.97C21.3 8.73 22 11 22 14.1V21h-4v-6.1c0-1.46-.03-3.33-2.05-3.33-2.05 0-2.36 1.6-2.36 3.22V21h-4V9Z" />
    </svg>
  );
}

export function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.9a3 3 0 0 0-2.12-2.13C19.5 4.27 12 4.27 12 4.27s-7.5 0-9.38.5A3 3 0 0 0 .5 6.9C0 8.8 0 12 0 12s0 3.2.5 5.1a3 3 0 0 0 2.12 2.13c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3 3 0 0 0 2.12-2.13C24 15.2 24 12 24 12s0-3.2-.5-5.1ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </svg>
  );
}

export function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRIMITIVES
   ═══════════════════════════════════════════════════════════════ */

export function Eyebrow({
  children,
  className,
  dot = true,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 eyebrow text-faint',
        className
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 rounded-full bg-accent live-dot" />
        </span>
      )}
      <span className="h-px w-6 bg-hairline" style={{ borderTop: '1px solid var(--line-strong)' }} />
      {children}
    </span>
  );
}

export function SectionHead({
  index,
  eyebrow,
  title,
  accentTitle,
  lead,
  align = 'left',
}: {
  index: string;
  eyebrow: string;
  title: string;
  accentTitle?: string;
  lead?: string;
  align?: 'left' | 'center';
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center flex flex-col items-center'
      )}
    >
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-xs text-accent/70">{index}</span>
        <Eyebrow dot={false}>{eyebrow}</Eyebrow>
      </div>
      <h2 className="font-display text-[2.1rem] sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.02] tracking-mega">
        <span className="text-ink">{title}</span>{' '}
        {accentTitle && <span className="gtext-accent">{accentTitle}</span>}
      </h2>
      {lead && (
        <p className="mt-6 text-[0.95rem] sm:text-base leading-relaxed text-dim max-w-2xl">
          {lead}
        </p>
      )}
    </motion.header>
  );
}

export function Card({
  children,
  className,
  interactive = true,
  style,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  style?: CSSProperties;
}) {
  const spot = useSpot();
  return (
    <div
      {...(interactive ? spot : {})}
      style={style}
      className={cn(
        'relative rounded-3xl glass edge-top overflow-hidden',
        interactive && 'spot lift hover:border-[rgb(var(--halo)/0.35)]',
        'transition-colors',
        className
      )}
    >
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}

export function Pill({
  children,
  className,
  tone = 'default',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'accent';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.7rem] font-medium backdrop-blur-xl',
        className
      )}
      style={
        tone === 'accent'
          ? {
              background: 'rgb(var(--halo) / 0.12)',
              border: '1px solid rgb(var(--halo) / 0.28)',
              color: 'var(--accent)',
            }
          : { background: 'var(--panel)', border: '1px solid var(--line)', color: 'var(--dim)' }
      }
    >
      {children}
    </span>
  );
}

export function Divider({ className }: { className?: string }) {
  return (
    <div
      className={cn('h-px w-full', className)}
      style={{
        background:
          'linear-gradient(90deg, transparent, var(--line-strong) 20%, var(--line-strong) 80%, transparent)',
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   DEVICE FRAME — premium phone chrome
   ═══════════════════════════════════════════════════════════════ */

export function PhoneFrame({
  children,
  className,
  width = 'w-[300px] sm:w-[336px]',
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  width?: string;
  glow?: boolean;
}) {
  return (
    <div className={cn('relative', width, className)}>
      {glow && (
        <div
          className="absolute -inset-10 -z-10 rounded-full blur-3xl opacity-60"
          style={{
            background:
              'radial-gradient(circle at 30% 20%, rgb(var(--halo) / 0.28), transparent 60%), radial-gradient(circle at 75% 80%, rgb(var(--halo2) / 0.24), transparent 62%)',
          }}
        />
      )}
      <div className="device">
        <div className="device-screen">
          <div className="island" />
          <div className="device-glare" />
          <div className="relative">
            {/* status bar */}
            <div className="flex items-center justify-between px-6 pt-3.5 pb-1 text-[0.62rem] font-medium text-faint">
              <span className="font-mono">9:41</span>
              <div className="flex items-center gap-1.5">
                <span className="flex items-end gap-[2px]">
                  {[5, 8, 11, 14].map((h, i) => (
                    <span
                      key={i}
                      className="w-[2.5px] rounded-sm bg-current opacity-70"
                      style={{ height: h }}
                    />
                  ))}
                </span>
                <svg viewBox="0 0 20 14" className="w-3.5 h-3 opacity-70" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M1 4.5a13 13 0 0 1 18 0M4.2 8a9 9 0 0 1 11.6 0M7.4 11.3a5 5 0 0 1 5.2 0" strokeLinecap="round" />
                </svg>
                <span className="flex h-3 w-6 items-center rounded-[3px] border border-current opacity-70 px-[1.5px]">
                  <span className="h-[6px] w-[70%] rounded-[1px] bg-current" />
                </span>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MARQUEE
   ═══════════════════════════════════════════════════════════════ */

export function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-1 select-none">
      <div
        className="marquee-track gap-3"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {row.map((it, i) => (
          <span
            key={`${it}-${i}`}
            className="chip shrink-0"
            style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
