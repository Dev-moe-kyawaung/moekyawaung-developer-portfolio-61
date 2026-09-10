import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  Car,
  ChevronRight,
  Code2,
  Compass,
  Hand,
  Mic,
  Route,
  ShieldAlert,
  Smartphone,
  Sun,
  Timer,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { Card, Eyebrow, PhoneFrame, SectionHead } from './ui';
import { cn } from '../utils/cn';

type Posture = 'driving' | 'stationary' | 'onehand';

const POSTURES: Record<
  Posture,
  {
    name: string;
    icon: typeof Car;
    intent: string;
    sensors: { k: string; v: string; load: number }[];
    spec: string[];
    rules: { k: string; v: string }[];
  }
> = {
  driving: {
    name: 'Driving',
    icon: Car,
    intent: 'Eyes-free · zero-typing · voice-first',
    sensors: [
      { k: 'MOTION', v: '42 km/h', load: 92 },
      { k: 'AMBIENT', v: '1,180 lux', load: 70 },
      { k: 'GRIP', v: 'docked', load: 12 },
      { k: 'ATTENTION', v: 'driving', load: 88 },
    ],
    spec: [
      '"grid": "single-column/hero"',
      '"ttMin": "88dp"',
      '"density": "sparse"',
      '"input": ["voice","gesture"]',
      '"typography.scale": 1.45',
      '"contrastMode": "sunlight-boost"',
      '"notifications": "critical-only"',
    ],
    rules: [
      { k: 'Hit target', v: '88dp min' },
      { k: 'Words on screen', v: '≤ 14' },
      { k: 'Interaction', v: 'voice / long-swipe' },
      { k: 'Motion budget', v: '120ms' },
    ],
  },
  stationary: {
    name: 'Stationary',
    icon: Compass,
    intent: 'Rich analysis · two-hand · detailed',
    sensors: [
      { k: 'MOTION', v: 'resting', load: 6 },
      { k: 'AMBIENT', v: '320 lux', load: 46 },
      { k: 'GRIP', v: 'two-hand', load: 34 },
      { k: 'ATTENTION', v: 'focused', load: 18 },
    ],
    spec: [
      '"grid": "2-col + detail rail"',
      '"ttMin": "44dp"',
      '"density": "comfortable"',
      '"input": ["touch","type","hover"]',
      '"typography.scale": 1.0',
      '"contrastMode": "standard"',
      '"notifications": "inline-stream"',
    ],
    rules: [
      { k: 'Hit target', v: '44dp min' },
      { k: 'Density', v: '4 widgets / fold' },
      { k: 'Interaction', v: 'touch + keyboard' },
      { k: 'Motion budget', v: '400ms' },
    ],
  },
  onehand: {
    name: 'One-hand',
    icon: Hand,
    intent: 'Thumb-zone · bottom sheet · swipe-led',
    sensors: [
      { k: 'MOTION', v: 'walking', load: 58 },
      { k: 'AMBIENT', v: '1,640 lux', load: 86 },
      { k: 'GRIP', v: 'single/right', load: 78 },
      { k: 'ATTENTION', v: 'interrupted', load: 64 },
    ],
    spec: [
      '"grid": "bottom-sheet/collapsed"',
      '"ttMin": "60dp"',
      '"density": "compact"',
      '"input": ["swipe","drag"]',
      '"typography.scale": 1.15',
      '"contrastMode": "outdoor"',
      '"anchor": "thumb-arc-south"',
    ],
    rules: [
      { k: 'Hit target', v: '60dp min' },
      { k: 'Reach zone', v: 'top 38% locked' },
      { k: 'Interaction', v: 'swipe / drag' },
      { k: 'Motion budget', v: '220ms' },
    ],
  },
};

export function GenerativeDemo() {
  const [p, setP] = useState<Posture>('stationary');
  const cfg = POSTURES[p];

  return (
    <section id="generative" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="03 / Prototype"
          eyebrow="Tier 1 · Trend 02"
          title="Generative UI that"
          accentTitle="recomputes the layout"
          lead="Instead of hand-authoring every breakpoint, ship heuristics and tokens. The screen below is assembled at runtime from a posture reading — grid, hit-target floor, density, input modality and motion budget are all outputs, not decisions."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12 items-start">
          {/* device */}
          <div className="lg:col-span-6 lg:order-2 flex justify-center lg:justify-end">
            <div className="w-full max-w-[26rem]">
              {/* posture switch */}
              <div className="mb-5 grid grid-cols-3 gap-2 rounded-2xl p-1.5" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                {(Object.keys(POSTURES) as Posture[]).map((k) => {
                  const on = k === p;
                  const I = POSTURES[k].icon;
                  return (
                    <button
                      key={k}
                      onClick={() => setP(k)}
                      className="relative flex flex-col items-center gap-1.5 rounded-xl px-2 py-2.5 transition-colors"
                    >
                      {on && (
                        <motion.span
                          layoutId="posture-pill"
                          className="absolute inset-0 rounded-xl"
                          style={{ background: 'rgb(var(--halo) / 0.13)', border: '1px solid rgb(var(--halo) / 0.34)' }}
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                      <I className={cn('relative h-4 w-4', on ? 'text-accent' : 'text-faint')} />
                      <span className={cn('relative font-mono text-[0.55rem] uppercase tracking-[0.14em]', on ? 'text-ink' : 'text-faint')}>
                        {POSTURES[k].name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <PhoneFrame width="w-full" glow>
                {/* context banner */}
                <div className="mx-4 mt-3 flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5"
                  style={{ background: 'rgb(var(--halo) / 0.09)', border: '1px solid rgb(var(--halo) / 0.26)' }}>
                  <span className="relative grid h-6 w-6 place-items-center rounded-lg" style={{ background: 'rgb(var(--halo) / 0.16)' }}>
                    <cfg.icon className="h-3 w-3 text-accent" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-faint">Reassembling</p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={p}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="truncate text-[0.68rem] font-medium text-accent"
                      >
                        {cfg.intent}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <span className="font-mono text-[0.52rem] text-faint">{cfg.rules[3].v}</span>
                </div>

                {/* animated content */}
                <div className="relative h-[400px] px-4 py-4 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={p}
                      initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full"
                    >
                      {p === 'driving' && <DrivingLayout />}
                      {p === 'stationary' && <StationaryLayout />}
                      {p === 'onehand' && <OneHandLayout />}
                    </motion.div>
                  </AnimatePresence>

                  {/* thumb arc for one-hand */}
                  <AnimatePresence>
                    {p === 'onehand' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-56"
                        style={{
                          background:
                            'radial-gradient(115% 100% at 50% 108%, rgb(var(--halo) / 0.22), transparent 66%)',
                        }}
                      >
                        <svg viewBox="0 0 200 100" className="absolute inset-x-0 bottom-0 h-full w-full" preserveAspectRatio="none">
                          <path d="M6 100 A 94 94 0 0 1 194 100" fill="none" stroke="rgb(var(--halo) / 0.5)" strokeWidth="0.7" strokeDasharray="4 4" />
                          <path d="M28 100 A 72 72 0 0 1 172 100" fill="none" stroke="rgb(var(--halo) / 0.28)" strokeWidth="0.7" strokeDasharray="2 5" />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between px-5 py-3" style={{ borderTop: '1px solid var(--line)' }}>
                  <span className="font-mono text-[0.52rem] text-faint">spec v2.6.0 · recompiled</span>
                  <span className="flex items-center gap-1.5 font-mono text-[0.52rem] text-accent">
                    <Activity className="h-3 w-3" /> 11ms
                  </span>
                </div>
              </PhoneFrame>
            </div>
          </div>

          {/* readouts */}
          <div className="lg:col-span-6 lg:order-1 space-y-4">
            <Card className="p-6">
              <Eyebrow>Context sensors</Eyebrow>
              <div className="mt-5 space-y-3.5">
                {cfg.sensors.map((s, i) => (
                  <div key={s.k}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-faint">{s.k}</span>
                      <span className="font-mono text-[0.65rem] text-dim">{s.v}</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--elev)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.load}%` }}
                        transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full"
                        style={{ background: s.load > 75 ? 'var(--accent)' : 'var(--a2)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Eyebrow>Generated layout spec</Eyebrow>
                <Code2 className="h-3.5 w-3.5 text-faint" />
              </div>
              <pre className="overflow-x-auto rounded-2xl p-4 font-mono text-[0.66rem] leading-[1.7]" style={{ background: 'var(--elev)', border: '1px solid var(--line)' }}>
                <span className="text-faint">{'{'}</span>
                {cfg.spec.map((line, i) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span className="text-accent">{line.split(':')[0]}</span>
                    <span className="text-faint">:</span>
                    <span className="text-dim">{line.split(':').slice(1).join(':')}</span>
                    {i < cfg.spec.length - 1 && <span className="text-faint">,</span>}
                  </motion.div>
                ))}
                <span className="text-faint">{'}'}</span>
              </pre>
              <p className="mt-4 text-[0.72rem] leading-relaxed text-faint">
                Heuristics, not handoffs. A designer owns the rule table; the renderer owns the pixels.
                That is the shift from design systems to <span className="text-dim">generative surfaces</span>.
              </p>
            </Card>

            <Card className="p-6">
              <Eyebrow>Hard constraints per posture</Eyebrow>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {cfg.rules.map((r, i) => (
                  <motion.div
                    key={r.k}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="rounded-2xl p-3.5"
                    style={{ background: 'var(--elev)', border: '1px solid var(--line)' }}
                  >
                    <p className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-faint">{r.k}</p>
                    <p className="mt-1.5 font-display text-[0.82rem] font-bold">{r.v}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Layout permutations ───────────────────────────────────── */

function DrivingLayout() {
  return (
    <div className="flex h-full flex-col gap-3.5">
      <div className="rounded-3xl p-5" style={{ background: 'rgb(var(--halo) / 0.1)', border: '1px solid rgb(var(--halo) / 0.28)' }}>
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: 'var(--elev)' }}>
            <Route className="h-5 w-5 text-accent" />
          </span>
          <div>
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-faint">Next manoeuvre</p>
            <p className="font-display text-lg font-extrabold">Sukhumvit Rd →</p>
          </div>
        </div>
        <p className="mt-3 font-mono text-[0.62rem] text-dim">800 m · lane 3 · then keep left</p>
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        <div className="rounded-3xl p-4" style={{ background: 'var(--elev)', border: '1px solid var(--line)' }}>
          <Timer className="h-4 w-4 text-accent" />
          <p className="mt-2 font-display text-xl font-extrabold">14<span className="text-sm font-bold text-dim">min</span></p>
          <p className="font-mono text-[0.52rem] tracking-[0.14em] text-faint">ETA</p>
        </div>
        <div className="rounded-3xl p-4" style={{ background: 'var(--elev)', border: '1px solid var(--line)' }}>
          <ShieldAlert className="h-4 w-4 text-accent" />
          <p className="mt-2 font-display text-xl font-extrabold">Clear</p>
          <p className="font-mono text-[0.52rem] tracking-[0.14em] text-faint">Road alerts</p>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-3 rounded-3xl px-5 py-4" style={{ background: 'var(--elev)', border: '1px solid var(--line-strong)' }}>
        <motion.span
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="grid h-11 w-11 place-items-center rounded-full"
          style={{ background: 'linear-gradient(140deg, var(--accent), var(--a2))' }}
        >
          <Mic className="h-5 w-5" style={{ color: 'var(--btn-ink, #05070a)' }} />
        </motion.span>
        <div>
          <p className="text-[0.78rem] font-bold">Listening</p>
          <p className="font-mono text-[0.58rem] text-faint">"add a coffee stop"</p>
        </div>
        <span className="ml-auto font-mono text-[0.5rem] text-faint">0 taps needed</span>
      </div>
    </div>
  );
}

function StationaryLayout() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        {[
          { i: Wallet, k: 'Spend', v: '$1,148', d: '4.3% under cap' },
          { i: TrendingUp, k: 'Momentum', v: '+23%', d: 'vs last run' },
          { i: Activity, k: 'Sessions', v: '8,421', d: '+12% w/w' },
          { i: Sun, k: 'Energy', v: 'A+, 42g', d: 'carbon aware' },
        ].map((m, i) => (
          <motion.div
            key={m.k}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * i }}
            className="rounded-2xl p-3"
            style={{ background: 'var(--elev)', border: '1px solid var(--line)' }}
          >
            <m.i className="h-3.5 w-3.5 text-accent" />
            <p className="mt-1.5 font-display text-[0.95rem] font-extrabold">{m.v}</p>
            <p className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-faint">{m.k}</p>
            <p className="mt-1 text-[0.58rem] text-dim">{m.d}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl p-3.5" style={{ background: 'var(--elev)', border: '1px solid var(--line)' }}>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[0.7rem] font-semibold">Adaptive horizon</span>
          <span className="flex items-center gap-1 font-mono text-[0.55rem] text-accent">
            detail <ChevronRight className="h-3 w-3" />
          </span>
        </div>
        <div className="flex h-16 items-end gap-1.5">
          {[38, 62, 46, 84, 58, 92, 70].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 rounded-t-md"
              style={{ background: 'linear-gradient(180deg, var(--accent), rgb(var(--halo) / 0.12))' }}
            />
          ))}
        </div>
      </div>

      <div className="mt-auto grid grid-cols-3 gap-2.5">
        {['Timeline', 'Split bill', 'Export'].map((a) => (
          <span key={a} className="rounded-2xl py-2.5 text-center text-[0.62rem] font-medium text-dim" style={{ border: '1px solid var(--line)' }}>
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}

function OneHandLayout() {
  return (
    <div className="flex h-full flex-col">
      <div className="rounded-3xl p-4" style={{ background: 'var(--elev)', border: '1px solid var(--line)' }}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Smartphone className="h-3.5 w-3.5 text-accent" />
            <span className="text-[0.72rem] font-semibold">Trip draft</span>
          </span>
          <span className="font-mono text-[0.55rem] text-faint">swipe ↓</span>
        </div>
        <p className="mt-2 text-[0.68rem] leading-relaxed text-dim">
          Top region is locked — nothing actionable sits outside the thumb arc.
        </p>
      </div>

      <div className="mt-3 flex-1" />

      {/* bottom sheet */}
      <motion.div
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        className="rounded-t-[2rem] rounded-b-2xl p-4"
        style={{ background: 'var(--panel)', border: '1px solid var(--line-strong)', backdropFilter: 'blur(22px)' }}
      >
        <span className="mx-auto mb-4 block h-1 w-10 rounded-full" style={{ background: 'var(--line-strong)' }} />
        <div className="grid grid-cols-3 gap-2">
          {[
            { i: Wallet, l: 'Pay' },
            { i: Route, l: 'Route' },
            { i: Timer, l: 'Hold' },
          ].map((b, i) => (
            <motion.button
              key={b.l}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.07 }}
              className="flex flex-col items-center gap-2 rounded-2xl py-3.5"
              style={{ background: 'var(--elev)', border: '1px solid var(--line)' }}
            >
              <b.i className="h-4 w-4 text-accent" />
              <span className="text-[0.62rem] font-semibold">{b.l}</span>
            </motion.button>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 font-mono text-[0.55rem] text-faint">
          <motion.span animate={{ x: [-8, 8, -8] }} transition={{ duration: 2.4, repeat: Infinity }}>
            ← swipe to advance →
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}
