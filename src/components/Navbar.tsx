import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Menu, Moon, Palette, Shuffle, Sun, X } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';
import { cn } from '../utils/cn';
import { GithubIcon } from './ui';

const NAV = [
  { l: 'Trends', h: '#trends' },
  { l: 'Agentic', h: '#agentic' },
  { l: 'Generative', h: '#generative' },
  { l: 'Adaptive', h: '#adaptive' },
  { l: 'Stack', h: '#stack' },
  { l: 'Profile', h: '#profile' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [studio, setStudio] = useState(false);
  const [active, setActive] = useState('trends');
  const { theme, themes, setTheme, toggleMode, cycle, isDark } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      let current = 'trends';
      for (const item of NAV) {
        const el = document.querySelector(item.h);
        if (el && (el as HTMLElement).getBoundingClientRect().top <= 220) current = item.h.slice(1);
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setStudio(false);
        setOpen(false);
      }
      if (e.key.toLowerCase() === 't' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        cycle();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cycle]);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50 px-3 sm:px-5 pt-3"
      >
        <nav
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full px-3 sm:px-4 py-2.5 transition-all duration-500',
            scrolled ? 'glass shadow-2xl' : 'border border-transparent'
          )}
        >
          {/* Brand */}
          <a href="#top" className="group flex items-center gap-3 pl-1">
            <span className="relative grid h-9 w-9 place-items-center rounded-xl overflow-hidden">
              <span
                className="absolute inset-0"
                style={{ background: 'linear-gradient(140deg, var(--accent), var(--a2))' }}
              />
              <span className="relative font-display text-[0.78rem] font-black text-[color:var(--btn-ink,#05070a)]">
                MK
              </span>
            </span>
            <span className="hidden sm:block leading-tight">
              <span className="block font-display text-[0.8rem] font-bold tracking-tight">Moe Kyaw Aung</span>
              <span className="block font-mono text-[0.58rem] tracking-[0.18em] uppercase text-faint">
                Trend Studio · 2026
              </span>
            </span>
          </a>

          {/* Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV.map((n) => {
              const on = active === n.h.slice(1);
              return (
                <a
                  key={n.h}
                  href={n.h}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-[0.8rem] font-medium transition-colors duration-300',
                    on ? 'text-ink' : 'text-dim hover:text-ink'
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'rgb(var(--halo) / 0.12)',
                        border: '1px solid rgb(var(--halo) / 0.28)',
                      }}
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{n.l}</span>
                </a>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleMode}
              title="Toggle light / dark"
              className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-[color-mix(in_srgb,var(--elev)_60%,transparent)]"
              style={{ border: '1px solid var(--line)' }}
            >
              {isDark ? <Sun className="h-4 w-4 text-dim" /> : <Moon className="h-4 w-4 text-dim" />}
            </button>

            <button
              onClick={() => setStudio(true)}
              className="group flex items-center gap-2 rounded-full pl-2.5 pr-3.5 py-2 transition-all"
              style={{ border: '1px solid var(--line-strong)', background: 'var(--panel)' }}
            >
              <span className="flex -space-x-1.5">
                {theme.swatch.map((c, i) => (
                  <span
                    key={i}
                    className="h-3.5 w-3.5 rounded-full"
                    style={{ background: c, boxShadow: '0 0 0 1.5px var(--app)' }}
                  />
                ))}
              </span>
              <span className="hidden sm:inline text-[0.75rem] font-semibold text-dim group-hover:text-ink">
                {theme.name}
              </span>
              <Palette className="h-3.5 w-3.5 text-faint group-hover:text-accent" />
            </button>

            <a
              href="https://github.com/Dev-moe-kyawaung"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:grid h-9 w-9 place-items-center rounded-full transition-colors hover:text-ink text-dim"
              style={{ border: '1px solid var(--line)' }}
            >
              <GithubIcon className="h-4 w-4" />
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden grid h-9 w-9 place-items-center rounded-full"
              style={{ border: '1px solid var(--line)' }}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile sheet */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl glass lg:hidden"
            >
              <div className="grid grid-cols-2 gap-1.5 p-3">
                {NAV.map((n) => (
                  <a
                    key={n.h}
                    href={n.h}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-dim hover:text-ink"
                    style={{ border: '1px solid var(--line)' }}
                  >
                    {n.l}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ═══ THEME STUDIO PANEL ═══ */}
      <AnimatePresence>
        {studio && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setStudio(false)}
              className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-md"
            />
            <motion.aside
              initial={{ x: '105%' }}
              animate={{ x: 0 }}
              exit={{ x: '105%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed right-0 top-0 z-[90] h-full w-full max-w-[24rem] glass border-l p-6 overflow-y-auto"
              style={{ borderColor: 'var(--line-strong)' }}
            >
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="eyebrow text-faint mb-1">Theme Studio</p>
                  <h3 className="font-display text-xl font-bold">Choose your palette</h3>
                </div>
                <button
                  onClick={() => setStudio(false)}
                  className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/20"
                  style={{ border: '1px solid var(--line)' }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Mode segmented control */}
              <div
                className="mb-6 grid grid-cols-2 gap-1 rounded-2xl p-1"
                style={{ background: 'var(--elev)', border: '1px solid var(--line)' }}
              >
                {(['dark', 'light'] as const).map((m) => {
                  const on = theme.mode === m;
                  return (
                    <button
                      key={m}
                      onClick={() => !on && toggleMode()}
                      className={cn(
                        'flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold capitalize transition-all',
                        on ? 'text-ink' : 'text-faint hover:text-dim'
                      )}
                      style={
                        on
                          ? {
                              background: 'rgb(var(--halo) / 0.14)',
                              border: '1px solid rgb(var(--halo) / 0.3)',
                            }
                          : {}
                      }
                    >
                      {m === 'dark' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                      {m}
                    </button>
                  );
                })}
              </div>

              {/* Theme grid */}
              <div className="space-y-4">
                {themes
                  .filter((t) => t.mode === (isDark ? 'dark' : 'light'))
                  .map((t) => {
                    const on = t.id === theme.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className="group flex w-full items-center gap-4 rounded-2xl p-3 text-left transition-all"
                        style={{
                          border: `1px solid ${on ? 'rgb(var(--halo) / 0.45)' : 'var(--line)'}`,
                          background: on ? 'rgb(var(--halo) / 0.08)' : 'transparent',
                        }}
                      >
                        <span className="flex h-12 w-12 shrink-0 overflow-hidden rounded-xl" style={{ border: '1px solid var(--line)' }}>
                          {t.swatch.map((c, i) => (
                            <span key={i} className="h-full flex-1" style={{ background: c }} />
                          ))}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="font-display text-sm font-bold">{t.name}</span>
                            {on && <Check className="h-3.5 w-3.5 text-accent" />}
                          </span>
                          <span className="block truncate font-mono text-[0.6rem] tracking-wide text-faint">
                            {t.vibe}
                          </span>
                        </span>
                      </button>
                    );
                  })}
              </div>

              <button
                onClick={cycle}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-semibold"
                style={{ border: '1px dashed var(--line-strong)', color: 'var(--accent)' }}
              >
                <Shuffle className="h-3.5 w-3.5" />
                Cycle all 8 themes · ⌘T
              </button>

              <p className="mt-6 font-mono text-[0.6rem] leading-relaxed text-faint">
                Every palette is hand-tuned: surface luminance, hairline contrast, accent
                chroma and halo bloom are recalibrated per family so contrast ratios hold in
                both modes.
              </p>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
