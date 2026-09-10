import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bot,
  Brain,
  Check,
  CircleDot,
  CornerDownRight,
  Cpu,
  Gauge,
  Hand,
  Pause,
  Plane,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Hotel,
  MapPin,
} from 'lucide-react';
import { Card, Eyebrow, PhoneFrame, SectionHead } from './ui';
import { cn } from '../utils/cn';

type LogStatus = 'think' | 'act' | 'ok' | 'ask';

type Log = { t: string; text: string; status: LogStatus; detail?: string; cost: number };

const AUTONOMY = [
  { id: 'L1', label: 'Suggest', desc: 'Agent proposes, you execute every step.', gates: 8, ms: 1900 },
  { id: 'L2', label: 'Assist', desc: 'Agent executes low-risk steps, asks on spend.', gates: 3, ms: 1450 },
  { id: 'L3', label: 'Delegate', desc: 'Agent completes the goal, you review the bundle.', gates: 1, ms: 1050 },
];

const SCRIPT: Array<Omit<Log, 't'> & { level: number }> = [
  { text: 'Parsed intent', detail: '"Plan a Bangkok trip" · budget $1,200 · 5 nights', status: 'think', cost: 1, level: 1 },
  { text: 'Scanned calendar', detail: 'Free window Dec 15–20 · no conflicts', status: 'act', cost: 1, level: 1 },
  { text: 'Queried 12 airlines · 47 options', detail: 'Filtered: red-eye ✕, >2 stops ✕, +$150 flex ✓', status: 'act', cost: 2, level: 1 },
  { text: 'Ranked by value × loyalty × timing', detail: 'TG307 selected — 3.1% cheaper, better arrival slot', status: 'think', cost: 3, level: 1 },
  { text: 'Hold placed on TG307', detail: 'Seat 12A · free cancellation 24h · expires 21:40', status: 'ok', cost: 1, level: 2 },
  { text: 'Scanned 214 hotels near BTS', detail: 'Sukhumvit Grand · 4.7★ · walkable to 3 stations', status: 'act', cost: 4, level: 2 },
  { text: 'Trust check: new merchant', detail: 'Escalating — first booking with this vendor', status: 'ask', cost: 1, level: 2 },
  { text: 'Composed itinerary', detail: '5 cultural stops sequenced by heat + transit time', status: 'think', cost: 2, level: 3 },
  { text: 'Itinerary ready for review', detail: 'Total $1,148 · 4.3% under budget', status: 'ok', cost: 1, level: 3 },
];

const STATUS_STYLE: Record<LogStatus, { color: string; icon: typeof Cpu }> = {
  think: { color: '#a78bfa', icon: Brain },
  act: { color: 'var(--accent)', icon: Cpu },
  ok: { color: 'var(--a2)', icon: Check },
  ask: { color: '#fbbf24', icon: Hand },
};

export function AgenticDemo() {
  const [level, setLevel] = useState(2);
  const [logs, setLogs] = useState<Log[]>([]);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const timers = useRef<number[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const active = AUTONOMY[level - 1];

  const stop = useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  }, []);

  const run = useCallback(() => {
    stop();
    setLogs([]);
    setRunning(true);
    setPaused(false);
    const track = SCRIPT.filter((s) => s.level <= level);
    let delay = 300;
    track.forEach((entry, i) => {
      const { level: _lvl, ...rest } = entry;
      void _lvl;
      const id = window.setTimeout(() => {
        setLogs((prev) => [...prev, { ...rest, t: stamp() }]);
        if (i === track.length - 1) setRunning(false);
      }, delay);
      timers.current.push(id);
      delay += active.ms;
    });
  }, [level, active.ms, stop]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  useEffect(() => () => stop(), [stop]);

  const gatesCleared = logs.filter((l) => l.status === 'ok' || l.status === 'ask').length;
  const spend = logs.reduce((a, b) => a + b.cost, 0);

  return (
    <section id="agentic" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="02 / Prototype"
          eyebrow="Tier 1 · Trend 01"
          title="Agentic UX, with the"
          accentTitle="lid left open"
          lead="The interface is not a chatbot bolted onto a booking form. It is a machine-readable surface where an agent negotiates goal, budget and risk — and every hop of its reasoning stays inspectable, interruptible and reversible."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12 items-start">
          {/* ── Controls ── */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="p-6">
              <Eyebrow>Autonomy level</Eyebrow>
              <div className="mt-5 space-y-2.5">
                {AUTONOMY.map((a, i) => {
                  const n = i + 1;
                  const on = n === level;
                  return (
                    <button
                      key={a.id}
                      onClick={() => {
                        setLevel(n);
                        setLogs([]);
                      }}
                      className="flex w-full items-start gap-3.5 rounded-2xl p-3.5 text-left transition-all"
                      style={{
                        background: on ? 'rgb(var(--halo) / 0.09)' : 'transparent',
                        border: `1px solid ${on ? 'rgb(var(--halo) / 0.4)' : 'var(--line)'}`,
                      }}
                    >
                      <span
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-xl font-mono text-[0.62rem] font-bold"
                        style={{
                          background: on ? 'linear-gradient(140deg, var(--accent), var(--a2))' : 'var(--elev)',
                          color: on ? 'var(--btn-ink, #05070a)' : 'var(--faint)',
                        }}
                      >
                        {a.id}
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-2">
                          <span className="font-display text-[0.86rem] font-bold">{a.label}</span>
                          <span className="font-mono text-[0.55rem] text-faint">
                            {a.gates} gate{a.gates > 1 ? 's' : ''}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-[0.72rem] leading-relaxed text-dim">{a.desc}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <button onClick={run} disabled={running} className={cn('btn-solid !px-5 !py-3 text-[0.8rem]', running && 'opacity-60')}>
                  {running ? (
                    <>
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}>
                        <Cpu className="h-4 w-4" />
                      </motion.span>
                      Agent running
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      {logs.length ? 'Re-run agent' : 'Run agent'}
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    if (running) {
                      stop();
                      setRunning(false);
                      setPaused(true);
                    } else {
                      run();
                    }
                  }}
                  className="btn-ghost !px-5 !py-3 text-[0.8rem]"
                >
                  {paused && !running ? <RotateCcw className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  {paused && !running ? 'Resume' : 'Halt'}
                </button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3" style={{ borderTop: '1px solid var(--line)', paddingTop: '1.25rem' }}>
                {[
                  { k: 'Steps', v: `${logs.length}/${SCRIPT.filter((s) => s.level <= level).length}` },
                  { k: 'Gates hit', v: `${gatesCleared}` },
                  { k: 'Threads', v: `${spend}` },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="font-display text-lg font-bold gtext-accent">{s.v}</div>
                    <div className="font-mono text-[0.55rem] uppercase tracking-[0.15em] text-faint">{s.k}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <Eyebrow>Why this pattern wins</Eyebrow>
              <ul className="mt-4 space-y-3">
                {[
                  { i: ShieldCheck, t: 'Trust is earned by exposure', d: 'Reasoning, cost and confidence are rendered, not hidden behind a spinner.' },
                  { i: Gauge, t: 'Autonomy is a user setting', d: 'L1→L3 shifts who carries risk without rebuilding a single screen.' },
                  { i: CornerDownRight, t: 'Every node is reversible', d: 'Holds, drafts and staged writes instead of irreversible commits.' },
                ].map((r) => (
                  <li key={r.t} className="flex gap-3">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg" style={{ background: 'rgb(var(--halo) / 0.12)' }}>
                      <r.i className="h-3.5 w-3.5 text-accent" />
                    </span>
                    <span>
                      <span className="block text-[0.8rem] font-semibold">{r.t}</span>
                      <span className="block text-[0.72rem] leading-relaxed text-faint">{r.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* ── Device ── */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <PhoneFrame width="w-[308px] sm:w-[368px]" glow>
              {/* app bar */}
              <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid var(--line)' }}>
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-xl" style={{ background: 'linear-gradient(140deg, var(--accent), var(--a2))' }}>
                    <Bot className="h-4 w-4" style={{ color: 'var(--btn-ink, #05070a)' }} />
                  </span>
                  <div className="leading-tight">
                    <p className="font-display text-[0.78rem] font-bold">Voyage Agent</p>
                    <p className="flex items-center gap-1.5 font-mono text-[0.55rem] text-faint">
                      <span className="h-1 w-1 rounded-full live-dot" style={{ background: 'var(--accent)' }} />
                      {active.label} mode · {active.id}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[0.55rem] text-faint">$1,200 cap</span>
              </div>

              {/* thread */}
              <div ref={logRef} className="h-[380px] overflow-y-auto px-4 py-4 space-y-2.5">
                <div className="flex justify-end">
                  <p className="max-w-[80%] rounded-2xl rounded-br-md px-3.5 py-2.5 text-[0.78rem]"
                    style={{ background: 'rgb(var(--halo) / 0.16)', border: '1px solid rgb(var(--halo) / 0.24)' }}>
                    Plan a Bangkok trip. Keep it under $1,200. 🇹🇭
                  </p>
                </div>

                {logs.length === 0 && (
                  <div className="flex h-[280px] flex-col items-center justify-center text-center">
                    <span className="relative grid h-16 w-16 place-items-center rounded-2xl ring-out" style={{ background: 'rgb(var(--halo) / 0.1)' }}>
                      <Bot className="h-7 w-7 text-accent" />
                    </span>
                    <p className="mt-5 font-display text-[0.85rem] font-bold">Agent on standby</p>
                    <p className="mt-1 max-w-[15rem] text-[0.7rem] leading-relaxed text-faint">
                      Pick an autonomy level, then run the agent. Watch it plan, price and escalate.
                    </p>
                  </div>
                )}

                <AnimatePresence>
                  {logs.map((log, i) => {
                    const S = STATUS_STYLE[log.status];
                    const Icon = S.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div
                          className="relative rounded-2xl p-3"
                          style={{ background: 'var(--elev)', border: `1px solid ${log.status === 'ask' ? 'rgba(251,191,36,0.4)' : 'var(--line)'}` }}
                        >
                          {/* connector */}
                          <span className="absolute -top-2.5 left-7 h-2.5 w-px" style={{ background: 'var(--line-strong)' }} />
                          <div className="flex items-start gap-2.5">
                            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg" style={{ background: `color-mix(in srgb, ${S.color} 18%, transparent)` }}>
                              <Icon className="h-3 w-3" style={{ color: S.color }} />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-baseline justify-between gap-2">
                                <p className="text-[0.75rem] font-semibold leading-snug">{log.text}</p>
                                <span className="shrink-0 font-mono text-[0.5rem] text-faint">{log.t}</span>
                              </div>
                              {log.detail && (
                                <p className="mt-1 font-mono text-[0.6rem] leading-relaxed text-faint">
                                  {log.detail}
                                </p>
                              )}
                              {log.status === 'ask' && (
                                <div className="mt-2.5 flex gap-2">
                                  <span className="rounded-lg px-2.5 py-1 text-[0.6rem] font-semibold text-[#fbbf24]" style={{ background: 'rgba(251,191,36,0.14)', border: '1px solid rgba(251,191,36,0.32)' }}>
                                    Approve vendor
                                  </span>
                                  <span className="rounded-lg px-2.5 py-1 text-[0.6rem] font-semibold text-faint" style={{ border: '1px solid var(--line)' }}>
                                    Swap hotel
                                  </span>
                                </div>
                              )}
                            </div>
                            <span className="shrink-0 font-mono text-[0.5rem] text-faint">{log.cost}t</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {!running && logs.length === SCRIPT.filter((s) => s.level <= level).length && logs.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="rounded-2xl p-3.5"
                    style={{ background: 'rgb(var(--halo) / 0.08)', border: '1px solid rgb(var(--halo) / 0.3)' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-accent">
                        Bundle ready
                      </span>
                      <span className="font-mono text-[0.55rem] text-faint">4.3% under cap</span>
                    </div>
                    {[
                      { i: Plane, k: 'TG307 · Dec 15, 21:10', v: '$412' },
                      { i: Hotel, k: 'Sukhumvit Grand · 5 nights', v: '$620' },
                      { i: MapPin, k: '5 cultural stops sequenced', v: '$116' },
                    ].map((r) => (
                      <div key={r.k} className="flex items-center justify-between py-1.5" style={{ borderBottom: '1px dashed var(--line)' }}>
                        <span className="flex min-w-0 items-center gap-2">
                          <r.i className="h-3.5 w-3.5 shrink-0 text-accent" />
                          <span className="truncate text-[0.7rem]">{r.k}</span>
                        </span>
                        <span className="font-mono text-[0.62rem] text-dim">{r.v}</span>
                      </div>
                    ))}
                    <button className="mt-3 w-full rounded-xl py-2.5 text-[0.72rem] font-bold" style={{ background: 'linear-gradient(120deg, var(--accent), var(--a2))', color: 'var(--btn-ink, #05070a)' }}>
                      Approve all 3 · one tap
                    </button>
                  </motion.div>
                )}
              </div>

              {/* trace footer */}
              <div className="flex items-center justify-between px-5 py-3" style={{ borderTop: '1px solid var(--line)' }}>
                <span className="flex items-center gap-2 font-mono text-[0.55rem] text-faint">
                  <CircleDot className="h-3 w-3 text-accent" />
                  trace exported · agent_log.json
                </span>
                <span className="font-mono text-[0.55rem] text-faint">{gatesCleared} human gates</span>
              </div>
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}

function stamp() {
  const d = new Date();
  return `${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
}
