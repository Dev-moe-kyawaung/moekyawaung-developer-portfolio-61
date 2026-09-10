import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  Brain,
  CheckCircle2,
  Clock,
  Code2,
  Gauge,
  GitPullRequest,
  Heart,
  Layers,
  LayoutGrid,
  Package,
  Route,
  ShieldCheck,
  Sparkles,
  Timer,
  TrendingUp,
  Users,
  Wrench,
} from 'lucide-react';
import { Card, Eyebrow, SectionHead } from './ui';

type KpiId =
  | 'build' | 'coverage' | 'prs' | 'crashes'
  | 'velocity' | 'blockers' | 'burn' | 'nps'
  | 'arr' | 'first' | 'stock' | 'route';

const KPI: Record<KpiId, { label: string; value: string; sub: string; icon: typeof Gauge }> = {
  build: { label: 'Build health', value: 'Passing', sub: '412 tests · 0 flaky', icon: CheckCircle2 },
  coverage: { label: 'Coverage', value: '87%', sub: '+2.1 this sprint', icon: ShieldCheck },
  prs: { label: 'Open PRs', value: '12', sub: '3 awaiting review', icon: GitPullRequest },
  crashes: { label: 'Crash-free', value: '99.94%', sub: 'floor 99.90%', icon: Activity },
  velocity: { label: 'Velocity', value: '42 pts', sub: '+6 vs plan', icon: Gauge },
  blockers: { label: 'Blockers', value: '2', sub: '1 external vendor', icon: AlertTriangle },
  burn: { label: 'Sprint burn', value: '78%', sub: 'day 8 of 10', icon: Timer },
  nps: { label: 'NPS', value: '72', sub: '+9 q/q', icon: Heart },
  arr: { label: 'Revenue impact', value: '+$24K', sub: 'attributed', icon: TrendingUp },
  first: { label: 'First response', value: '4m 12s', sub: 'SLA 15m', icon: Clock },
  stock: { label: 'Part availability', value: '94%', sub: '2 SKUs low', icon: Package },
  route: { label: 'Route adherence', value: '96%', sub: '4 sites today', icon: Route },
};

type RoleId = 'dev' | 'manager' | 'stake' | 'field';

const ROLES: Record<
  RoleId,
  {
    label: string;
    icon: typeof Code2;
    mission: string;
    order: KpiId[];
    widgets: { name: string; tone: 'chart' | 'list' | 'grid' | 'code' }[];
    actions: string[];
    signals: { k: string; v: number; note: string }[];
    density: string;
  }
> = {
  dev: {
    label: 'Developer',
    icon: Code2,
    mission: 'Ship the build · unblock the branch',
    order: ['build', 'coverage', 'prs', 'crashes', 'blockers', 'burn'],
    widgets: [
      { name: 'CI pipeline', tone: 'code' },
      { name: 'Flaky test radar', tone: 'chart' },
      { name: 'Review queue', tone: 'list' },
      { name: 'Error traces', tone: 'code' },
    ],
    actions: ['Run suite', 'Deploy staging', 'Triage'],
    signals: [
      { k: 'Recent navigation', v: 42, note: 'ci/ · trace/ · prs/' },
      { k: 'Role permission', v: 26, note: 'write access on 4 modules' },
      { k: 'Peer cohort', v: 18, note: '7 android engineers' },
      { k: 'Recency', v: 14, note: 'last action 6m ago' },
    ],
    density: 'High · 4 columns',
  },
  manager: {
    label: 'Manager',
    icon: Users,
    mission: 'Protect the date · surface risk early',
    order: ['burn', 'velocity', 'blockers', 'prs', 'nps', 'build'],
    widgets: [
      { name: 'Burndown vs plan', tone: 'chart' },
      { name: 'Capacity & leave', tone: 'grid' },
      { name: 'Risk register', tone: 'list' },
      { name: 'Ritual notes', tone: 'list' },
    ],
    actions: ['Sprint review', 'Escalate', 'Rebalance load'],
    signals: [
      { k: 'Role permission', v: 34, note: 'all squads · read/write' },
      { k: 'Meeting calendar', v: 24, note: 'review in 2 days' },
      { k: 'Recent navigation', v: 22, note: 'burndown/ · risk/' },
      { k: 'Org hierarchy', v: 20, note: 'owns 2 squads' },
    ],
    density: 'Medium · 3 columns',
  },
  stake: {
    label: 'Stakeholder',
    icon: TrendingUp,
    mission: 'Outcome, cost and confidence',
    order: ['arr', 'nps', 'velocity', 'crashes', 'burn', 'coverage'],
    widgets: [
      { name: 'Exec summary', tone: 'list' },
      { name: 'ROI waterfall', tone: 'chart' },
      { name: 'Adoption funnel', tone: 'grid' },
      { name: 'Committed outcomes', tone: 'list' },
    ],
    actions: ['Export brief', 'Share update', 'Book QBR'],
    signals: [
      { k: 'Role permission', v: 30, note: 'finance scope · read only' },
      { k: 'View cadence', v: 26, note: 'exec deck weekly' },
      { k: 'Domain priority', v: 24, note: 'revenue > craft' },
      { k: 'Recent navigation', v: 20, note: 'outcomes/ · roi/' },
    ],
    density: 'Low · 2 columns',
  },
  field: {
    label: 'Field Tech',
    icon: Wrench,
    mission: 'Resolve on site · one-handed',
    order: ['route', 'stock', 'first', 'crashes', 'blockers', 'coverage'],
    widgets: [
      { name: "Today's route", tone: 'list' },
      { name: 'Parts van inventory', tone: 'grid' },
      { name: 'Offline queue', tone: 'code' },
      { name: 'Diagnostics', tone: 'code' },
    ],
    actions: ['Scan part', 'Log fault', 'Sync now'],
    signals: [
      { k: 'Geo + context', v: 38, note: 'on site · outdoor light' },
      { k: 'Role permission', v: 26, note: 'field ops scope' },
      { k: 'Device state', v: 20, note: 'battery 34% · offline' },
      { k: 'Task urgency', v: 16, note: '2 open tickets' },
    ],
    density: 'Compact · 3 columns',
  },
};

export function AdaptiveDemo() {
  const [role, setRole] = useState<RoleId>('dev');
  const r = ROLES[role];

  return (
    <section id="adaptive" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="04 / Prototype"
          eyebrow="Tier 1 · Trend 03"
          title="One system, four"
          accentTitle="points of view"
          lead="Domain-level prioritisation means the same design system resolves to different products per role. Rank, density and primary action are recomputed inline — and the reasoning is exposed so the personalisation feels like service, not surveillance."
        />

        {/* role rail */}
        <div className="mt-14 flex flex-wrap items-center gap-2.5">
          {(Object.keys(ROLES) as RoleId[]).map((k) => {
            const on = k === role;
            const I = ROLES[k].icon;
            return (
              <button
                key={k}
                onClick={() => setRole(k)}
                className="relative flex items-center gap-2.5 rounded-full px-4 py-2.5 transition-colors"
                style={{ border: `1px solid ${on ? 'rgb(var(--halo) / 0.45)' : 'var(--line)'}` }}
              >
                {on && (
                  <motion.span
                    layoutId="role-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgb(var(--halo) / 0.12)' }}
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <I className="relative h-3.5 w-3.5" style={{ color: on ? 'var(--accent)' : 'var(--faint)' }} />
                <span className="relative text-[0.78rem] font-semibold" style={{ color: on ? 'var(--ink)' : 'var(--dim)' }}>
                  {ROLES[k].label}
                </span>
              </button>
            );
          })}
          <span className="ml-auto flex items-center gap-2 font-mono text-[0.6rem] text-faint">
            <Brain className="h-3.5 w-3.5 text-accent" />
            ranking recomputed client-side only
          </span>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12 items-start">
          {/* dashboard */}
          <div className="lg:col-span-8">
            <div className="rounded-[2rem] glass overflow-hidden">
              {/* header */}
              <div className="flex flex-wrap items-center justify-between gap-4 px-5 sm:px-6 py-4" style={{ borderBottom: '1px solid var(--line)' }}>
                <div className="flex items-center gap-3.5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: 'linear-gradient(140deg, var(--accent), var(--a2))' }}>
                    <r.icon className="h-4 w-4" style={{ color: 'var(--btn-ink, #05070a)' }} />
                  </span>
                  <div className="leading-tight">
                    <p className="font-display text-[0.88rem] font-bold">{r.label} workspace</p>
                    <p className="font-mono text-[0.55rem] text-faint">{r.mission}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="rounded-full px-2.5 py-1 font-mono text-[0.55rem] text-faint" style={{ border: '1px solid var(--line)' }}>
                    {r.density}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.55rem]" style={{ background: 'rgb(var(--halo) / 0.12)', color: 'var(--accent)' }}>
                    <Sparkles className="h-3 w-3" /> adapted · 0.94 conf
                  </span>
                </div>
              </div>

              {/* KPI lattice */}
              <div className="p-4 sm:p-5">
                <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <AnimatePresence mode="popLayout">
                    {r.order.map((id, i) => {
                      const k = KPI[id];
                      const I = k.icon;
                      const hero = i === 0;
                      return (
                        <motion.div
                          layout
                          layoutId={`kpi-${id}`}
                          key={id}
                          initial={{ opacity: 0, scale: 0.94, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.94, y: -8 }}
                          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                        >
                          <div
                            className="relative h-full overflow-hidden rounded-2xl p-4"
                            style={{
                              background: hero ? 'rgb(var(--halo) / 0.1)' : 'var(--elev)',
                              border: `1px solid ${hero ? 'rgb(var(--halo) / 0.34)' : 'var(--line)'}`,
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <span className="grid h-7 w-7 place-items-center rounded-lg" style={{ background: 'rgb(var(--halo) / 0.12)' }}>
                                <I className="h-3.5 w-3.5 text-accent" />
                              </span>
                              <span className="font-mono text-[0.5rem] text-faint">#{i + 1}</span>
                            </div>
                            <p className={hero ? 'mt-3 font-display text-2xl font-extrabold tracking-tight' : 'mt-3 font-display text-lg font-extrabold tracking-tight'}>
                              {k.value}
                            </p>
                            <p className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-faint">{k.label}</p>
                            <p className="mt-1 text-[0.6rem] text-dim">{k.sub}</p>
                            {hero && (
                              <span className="absolute right-3 bottom-3 font-mono text-[0.5rem] text-accent">
                                primary
                              </span>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>

                {/* widgets */}
                <div className="mt-5">
                  <div className="mb-3 flex items-center justify-between">
                    <Eyebrow>Composed modules</Eyebrow>
                    <span className="flex items-center gap-1.5 font-mono text-[0.55rem] text-faint">
                      <LayoutGrid className="h-3 w-3" /> {r.widgets.length} blocks
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <AnimatePresence mode="popLayout">
                      {r.widgets.map((w, i) => (
                        <motion.div
                          layout
                          key={w.name}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: i * 0.05 }}
                          className="rounded-2xl p-4"
                          style={{ background: 'var(--elev)', border: '1px solid var(--line)' }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[0.74rem] font-semibold">{w.name}</span>
                            <Layers className="h-3.5 w-3.5 text-faint" />
                          </div>
                          <WidgetPreview tone={w.tone} seed={i} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* actions */}
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {r.actions.map((a, i) => (
                    <motion.button
                      key={a}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.06 }}
                      className="rounded-full px-4 py-2 text-[0.72rem] font-semibold"
                      style={
                        i === 0
                          ? { background: 'linear-gradient(120deg, var(--accent), var(--a2))', color: 'var(--btn-ink, #05070a)' }
                          : { border: '1px solid var(--line-strong)', color: 'var(--dim)' }
                      }
                    >
                      {a}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* reasoning column */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="p-6">
              <Eyebrow>Why the layout changed</Eyebrow>
              <div className="mt-5 space-y-4">
                {r.signals.map((s, i) => (
                  <div key={s.k}>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-[0.76rem] font-semibold">{s.k}</span>
                      <span className="font-mono text-[0.6rem] text-accent">{s.v}%</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--elev)' }}>
                      <motion.div
                        key={`${role}-${s.k}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${s.v}%` }}
                        transition={{ duration: 0.8, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, var(--accent), var(--a2))' }}
                      />
                    </div>
                    <p className="mt-1.5 font-mono text-[0.58rem] text-faint">{s.note}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 pt-5 text-[0.72rem] leading-relaxed text-faint" style={{ borderTop: '1px solid var(--line)' }}>
                Weighted signals are shown to the user. Adaptive interfaces that hide their logic
                read as manipulation; ones that explain themselves read as a good colleague.
              </p>
            </Card>

            <Card className="p-6">
              <Eyebrow>Priority ranking</Eyebrow>
              <ol className="mt-4 space-y-2">
                {r.order.map((id, i) => (
                  <motion.li
                    key={`${role}-${id}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 rounded-xl px-3 py-2"
                    style={{ background: i === 0 ? 'rgb(var(--halo) / 0.09)' : 'transparent', border: '1px solid var(--line)' }}
                  >
                    <span className="font-mono text-[0.58rem] text-faint">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1 text-[0.74rem] font-medium">{KPI[id].label}</span>
                    {i === 0 && <span className="font-mono text-[0.5rem] text-accent">hero</span>}
                  </motion.li>
                ))}
              </ol>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function WidgetPreview({ tone, seed }: { tone: 'chart' | 'list' | 'grid' | 'code'; seed: number }) {
  if (tone === 'chart') {
    return (
      <div className="flex h-20 items-end gap-1.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ height: 6 }}
            animate={{ height: `${18 + ((i * 13 + seed * 21) % 72)}%` }}
            transition={{ delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 rounded-t-sm"
            style={{ background: 'linear-gradient(180deg, rgb(var(--halo) / 0.85), rgb(var(--halo) / 0.12))' }}
          />
        ))}
      </div>
    );
  }
  if (tone === 'grid') {
    return (
      <div className="grid grid-cols-4 gap-1.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.15 }}
            animate={{ opacity: 0.2 + ((i * 7 + seed) % 8) / 10 }}
            transition={{ delay: i * 0.02 }}
            className="h-4 rounded-[3px]"
            style={{ background: 'var(--accent)' }}
          />
        ))}
      </div>
    );
  }
  if (tone === 'code') {
    return (
      <div className="space-y-1.5">
        {[68, 44, 84, 32].map((w, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: `${w}%` }}
              transition={{ delay: i * 0.06 }}
              className="h-1.5 rounded-full"
              style={{ background: 'var(--line-strong)' }}
            />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-2.5">
          <span className="grid h-5 w-5 place-items-center rounded-md font-mono text-[0.5rem]" style={{ background: 'rgb(var(--halo) / 0.14)', color: 'var(--accent)' }}>
            {i}
          </span>
          <span className="h-1.5 flex-1 rounded-full" style={{ background: 'var(--line-strong)', opacity: 1 - i * 0.22 }} />
        </div>
      ))}
    </div>
  );
}
