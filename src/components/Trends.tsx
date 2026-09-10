import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import { Card, Eyebrow, SectionHead } from './ui';
import { cn } from '../utils/cn';

type Trend = {
  n: string;
  name: string;
  desc: string;
  apply: string;
  cite: string;
};

type Tier = {
  id: string;
  roman: string;
  label: string;
  title: string;
  impact: number;
  note: string;
  trends: Trend[];
};

const TIERS: Tier[] = [
  {
    id: 't1',
    roman: 'I',
    label: 'Tier 1',
    title: 'Intelligence & Adaptation',
    impact: 96,
    note: 'Highest differentiator — where product moats are built in 2026.',
    trends: [
      {
        n: '01',
        name: 'Agentic UX',
        desc: 'Apps act autonomously through AI agents. Interfaces become machine-readable surfaces where reasoning is visible and control is never surrendered.',
        apply: 'Agent plans and executes a multi-step travel booking with a transparent decision log the user can interrupt at any node.',
        cite: 'ref [4]',
      },
      {
        n: '02',
        name: 'Predictive Generative UI',
        desc: 'Layout and components are assembled in real time from intent plus context. Design systems graduate from static libraries into tokens and heuristics.',
        apply: 'One screen that reconfigures between driving, stationary and one-handed postures — density, hit targets and navigation all shift.',
        cite: 'ref [4]',
      },
      {
        n: '03',
        name: 'AI-Driven Adaptive Interfaces',
        desc: 'Role-based UI, industry-specific flows and domain-level prioritisation. ML reorders the home screen inline against live behaviour.',
        apply: 'A dashboard that resequences KPIs, density and primary actions for developer, manager and stakeholder personas.',
        cite: 'ref [5][6]',
      },
    ],
  },
  {
    id: 't2',
    roman: 'II',
    label: 'Tier 2',
    title: 'Spatial & Immersive',
    impact: 78,
    note: 'Depth of experience — high perceived novelty, medium defensibility.',
    trends: [
      {
        n: '04',
        name: 'Spatial & Foldable Continuity',
        desc: 'Interfaces that reflow across fold, flip and headset form factors without losing state or hierarchy.',
        apply: 'Compose adaptive layout demos: list-detail on fold, two-pane on tablet, immersive canvas in AR.',
        cite: 'projection',
      },
      {
        n: '05',
        name: 'Haptic Grammar',
        desc: 'A consistent vocabulary of tactile feedback replacing visual chrome — texture as information.',
        apply: 'Compose haptics mapped to state transitions: confirm, warn, reject, progress.',
        cite: 'projection',
      },
      {
        n: '06',
        name: 'Ambient & Glanceable Surfaces',
        desc: 'Widgets, wearables and live activities carry the product when the app is closed.',
        apply: 'Glance APIs and widget surfaces that express agent status at a glance.',
        cite: 'projection',
      },
    ],
  },
  {
    id: 't3',
    roman: 'III',
    label: 'Tier 3',
    title: 'Ethical & Inclusive',
    impact: 64,
    note: 'Sustainability layer — becomes table stakes and a trust differentiator.',
    trends: [
      {
        n: '07',
        name: 'Neurodivergent-First Interaction',
        desc: 'Cognitive accessibility as an architectural constraint rather than an afterthought.',
        apply: 'Reduced-motion and low-stimulus modes shipped as first-class theme variants.',
        cite: 'projection',
      },
      {
        n: '08',
        name: 'Sustainable UX',
        desc: 'Carbon-aware rendering: asset weight, sync cadence and inference cost made visible.',
        apply: 'Budget meters for energy per session, shown next to performance metrics.',
        cite: 'projection',
      },
      {
        n: '09',
        name: 'Digital Wellbeing 2.0',
        desc: 'Engagement metrics replaced by respect metrics — time returned, not time captured.',
        apply: 'Agent summarises and archives on the user’s behalf instead of pulling them back in.',
        cite: 'projection',
      },
    ],
  },
];

export function TrendsIndex() {
  const [open, setOpen] = useState<string>('01');
  const [activeTier, setActiveTier] = useState('t1');
  const tier = TIERS.find((t) => t.id === activeTier)!;

  return (
    <section id="trends" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="01 / Index"
          eyebrow="Strategic impact map"
          title="The 2026 trend"
          accentTitle="matrix"
          lead="Nine patterns, ranked by strategic impact for portfolio and architecture work. Tier 1 is where senior designers differentiate; Tier 2 builds perceived depth; Tier 3 becomes the trust layer."
        />

        {/* Tier tabs */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-3">
          {TIERS.map((t) => {
            const on = t.id === activeTier;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTier(t.id);
                  setOpen(t.trends[0].n);
                }}
                className="group relative overflow-hidden rounded-3xl p-5 text-left transition-all duration-500"
                style={{
                  background: on ? 'rgb(var(--halo) / 0.08)' : 'var(--panel)',
                  border: `1px solid ${on ? 'rgb(var(--halo) / 0.42)' : 'var(--line)'}`,
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-3xl font-black leading-none opacity-30 tracking-mega">
                    {t.roman}
                  </span>
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-faint">{t.label}</span>
                </div>
                <p className="mt-5 font-display text-[0.98rem] font-bold leading-tight">{t.title}</p>
                <p className="mt-1.5 text-[0.72rem] leading-relaxed text-faint">{t.note}</p>

                <div className="mt-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-faint">
                      Impact weight
                    </span>
                    <span className="font-mono text-[0.62rem] text-accent">{t.impact}</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--elev)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.impact}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, var(--accent), var(--a2))' }}
                    />
                  </div>
                </div>

                {on && (
                  <motion.span
                    layoutId="tier-underline"
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Trend rows */}
        <div className="mt-8 space-y-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3"
            >
              {tier.trends.map((tr, i) => {
                const isOpen = open === tr.n;
                return (
                  <motion.div
                    key={tr.n}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Card>
                      <button
                        onClick={() => setOpen(isOpen ? '' : tr.n)}
                        className="w-full flex items-center gap-5 p-5 sm:p-6 text-left"
                      >
                        <span className="font-mono text-[0.68rem] text-faint w-6 shrink-0">{tr.n}</span>

                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-3">
                            <span className="font-display text-[1.05rem] sm:text-[1.3rem] font-bold tracking-tight">
                              {tr.name}
                            </span>
                            <span
                              className="rounded-full px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.14em]"
                              style={{
                                border: '1px solid var(--line-strong)',
                                color: 'var(--faint)',
                              }}
                            >
                              {tr.cite}
                            </span>
                          </span>
                          <span className="mt-2 block max-w-3xl text-[0.82rem] leading-relaxed text-dim">
                            {tr.desc}
                          </span>
                        </span>

                        <span
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors"
                          style={{
                            border: '1px solid var(--line-strong)',
                            color: isOpen ? 'var(--accent)' : 'var(--faint)',
                          }}
                        >
                          {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 sm:px-6 pb-6">
                              <div
                                className="rounded-2xl p-5 grid gap-4 sm:grid-cols-[auto_1fr] items-start"
                                style={{ background: 'rgb(var(--halo) / 0.06)', border: '1px solid rgb(var(--halo) / 0.2)' }}
                              >
                                <Eyebrow dot={false} className="text-accent">Portfolio application</Eyebrow>
                                <p className="text-[0.85rem] leading-relaxed text-ink/90">{tr.apply}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={cn('mt-10 flex flex-wrap items-center gap-4 text-[0.75rem] text-faint')}>
          <span className="inline-flex items-center gap-2">
            <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
            Expand any row for the shipped prototype below
          </span>
          <span className="h-px flex-1 min-w-10" style={{ background: 'var(--line)' }} />
          <span className="font-mono text-[0.6rem]">03 interactive prototypes follow</span>
        </div>
      </div>
    </section>
  );
}
