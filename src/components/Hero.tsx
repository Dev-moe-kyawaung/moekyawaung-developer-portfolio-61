import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Fingerprint, Sparkles, Zap } from 'lucide-react';
import { useRef } from 'react';
import { useTheme } from '../theme/ThemeProvider';
import { Eyebrow, GithubIcon, PlayIcon, Marquee, useCountUp, useTyping } from './ui';

const ROLES = [
  'Senior Android Engineer',
  'Kotlin · Jetpack Compose',
  'Agentic UX Architect',
  'Clean Architecture Advocate',
];

const KEYWORDS = [
  'Agentic UX', 'Predictive Generative UI', 'ML Personalization', 'On-Device Inference',
  'Material 3 Expressive', 'Compose Multiplatform', 'Transparent Reasoning', 'Role-Based Flows',
  'Spatial Canvas', 'Haptic Grammar', 'Carbon-Aware Design', 'Digital Wellbeing 2.0',
];

function Counter({ end, suffix, label, decimals = 0 }: { end: number; suffix?: string; label: string; decimals?: number }) {
  const { val } = useCountUp(end, 1900, decimals);
  return (
    <div className="group">
      <div className="font-display text-2xl sm:text-[1.9rem] font-extrabold leading-none tracking-tight">
        <span className="gtext-accent">
          {decimals ? val.toFixed(decimals) : Math.round(val)}
          {suffix}
        </span>
      </div>
      <div className="mt-1.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-faint">{label}</div>
    </div>
  );
}

export function Hero() {
  const typed = useTyping(ROLES);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const { theme, themes, setTheme } = useTheme();

  const darkThemes = themes.filter((t) => t.mode === 'dark');

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] flex flex-col justify-center pt-32 pb-10">
      <motion.div style={{ y, opacity: fade }} className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          {/* ── Copy ── */}
          <div className="lg:col-span-7">
            {/* identity chip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-7 inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4"
              style={{ background: 'var(--panel)', border: '1px solid var(--line)', backdropFilter: 'blur(18px)' }}
            >
              <span
                className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full font-display text-[0.6rem] font-black"
                style={{ background: 'linear-gradient(140deg, var(--accent), var(--a2))', color: 'var(--btn-ink)' }}
              >
                MK
                <img
                  src="https://res.cloudinary.com/dye5qpwii/image/upload/v1778527878/IMG_20260430_053105_uef0yr.png"
                  alt="Moe Kyaw Aung"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0';
                  }}
                />
              </span>
              <span className="leading-tight">
                <span className="block text-[0.76rem] font-semibold">Moe Kyaw Aung</span>
                <span className="block font-mono text-[0.55rem] uppercase tracking-[0.16em] text-faint">
                  Senior Android Engineer
                </span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <span
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.68rem] font-semibold"
                style={{ background: 'rgb(var(--halo) / 0.12)', border: '1px solid rgb(var(--halo) / 0.28)', color: 'var(--accent)' }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-current live-dot" />
                </span>
                Available for senior roles
              </span>
              <span className="font-mono text-[0.62rem] tracking-[0.2em] uppercase text-faint">
                Tachileik 🇲🇲 ↔ Bangkok 🇹🇭
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-extrabold tracking-mega text-[2.6rem] leading-[0.96] sm:text-[4.2rem] lg:text-[4.9rem]"
            >
              Design that
              <br />
              <span className="gtext">thinks ahead.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 flex items-center gap-3"
            >
              <span className="h-px w-10" style={{ background: 'var(--line-strong)' }} />
              <span className="font-mono text-[0.8rem] sm:text-[0.95rem] text-dim">
                {typed}
                <span className="caret" />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-7 max-w-xl text-[0.95rem] sm:text-[1.03rem] leading-relaxed text-dim"
            >
              A field guide to the <strong className="font-semibold text-ink">Tier-1 mobile design
              shifts of 2026</strong> — built as working micro-prototypes: agents that narrate their
              reasoning, interfaces that reassemble for your context, and dashboards that reshape
              themselves around who you are.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a href="#agentic" className="btn-solid">
                <PlayIcon className="h-4 w-4" />
                Launch Agentic Demo
              </a>
              <a href="#profile" className="btn-ghost">
                <GithubIcon className="h-4 w-4" />
                View Profile
              </a>
              <a
                href="#trends"
                className="group inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-dim hover:text-ink transition-colors"
              >
                Trend index
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.74 }}
              className="mt-11 flex flex-wrap gap-x-10 gap-y-6"
            >
              <Counter end={82} suffix="+" label="Certificates" />
              <Counter end={40} suffix="+" label="Repositories" />
              <Counter end={6} label="Yrs Building" />
              <Counter end={9} label="Domain Tracks" />
            </motion.div>
          </div>

          {/* ── Visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-[24rem]">
              {/* rotating conic ring */}
              <div
                className="absolute -inset-8 rounded-[3rem] opacity-70 gedge"
                style={{ borderRadius: '3rem' }}
              />
              <div className="relative rounded-[2.6rem] glass p-6 float-y" style={{ animationDelay: '-2s' }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-xl"
                      style={{ background: 'linear-gradient(140deg, var(--accent), var(--a2))' }}>
                      <Fingerprint className="h-4 w-4" style={{ color: 'var(--btn-ink, #05070a)' }} />
                    </span>
                    <div className="leading-tight">
                      <p className="font-display text-[0.82rem] font-bold">Trend Index</p>
                      <p className="font-mono text-[0.58rem] text-faint">live · 2026 Q1</p>
                    </div>
                  </div>
                  <Sparkles className="h-4 w-4 text-accent" />
                </div>

                {/* Mini metric rows */}
                {[
                  { k: 'Agentic UX', v: 96, t: 'Autonomy' },
                  { k: 'Generative UI', v: 88, t: 'Adaptivity' },
                  { k: 'Adaptive Roles', v: 79, t: 'Personalization' },
                ].map((row, i) => (
                  <div key={row.k} className="mb-5 last:mb-0">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-[0.78rem] font-semibold text-ink">{row.k}</span>
                      <span className="font-mono text-[0.62rem] text-faint">{row.v}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--elev)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${row.v}%` }}
                        transition={{ duration: 1.3, delay: 0.7 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, var(--accent), var(--a${i % 2 === 0 ? '2' : '3'}))` }}
                      />
                    </div>
                    <p className="mt-1.5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-faint">
                      {row.t}
                    </p>
                  </div>
                ))}

                <div className="mt-6 pt-5 flex items-center justify-between" style={{ borderTop: '1px solid var(--line)' }}>
                  <span className="flex items-center gap-2 text-[0.68rem] text-dim">
                    <Zap className="h-3.5 w-3.5 text-accent" />
                    Impact weight
                  </span>
                  <span className="font-display text-sm font-bold gtext-accent">Tier 1</span>
                </div>
              </div>

              {/* Floating theme quick-switch dock */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full glass px-3 py-2">
                <Eyebrow dot={false} className="hidden sm:flex text-[0.5rem]">Theme</Eyebrow>
                {darkThemes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    title={`${t.name} — ${t.vibe}`}
                    className="relative h-6 w-6 rounded-full transition-transform hover:scale-110"
                    style={{
                      background: `linear-gradient(140deg, ${t.swatch[1]}, ${t.swatch[2]})`,
                      boxShadow: theme.family === t.family ? '0 0 0 2px var(--app), 0 0 0 3.5px var(--accent)' : '0 0 0 1.5px var(--app)',
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Keyword marquee */}
      <div className="mt-16 sm:mt-20 relative">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 mb-4 flex items-center justify-between">
          <Eyebrow dot={false}>Signals tracked</Eyebrow>
          <span className="font-mono text-[0.6rem] text-faint">12 of 30+ patterns</span>
        </div>
        <div
          className="py-3"
          style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}
        >
          <Marquee items={KEYWORDS} />
        </div>
      </div>
    </section>
  );
}
