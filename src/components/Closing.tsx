import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Phone, Send, Sparkles } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';
import { Card, Eyebrow, GithubIcon, LinkedinIcon, YoutubeIcon } from './ui';

export function Closing() {
  const { theme, toggleMode, themes, setTheme } = useTheme();

  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Card interactive={false} className="relative overflow-hidden p-8 sm:p-14">
          {/* halo */}
          <div
            className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgb(var(--halo) / 0.28), transparent 65%)' }}
          />
          <div className="relative grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <Eyebrow>Next</Eyebrow>
              <h2 className="mt-5 font-display text-[2rem] sm:text-[2.9rem] font-extrabold leading-[1.03] tracking-mega">
                Want the architecture
                <br />
                <span className="gtext-accent">behind these demos?</span>
              </h2>
              <p className="mt-5 max-w-xl text-[0.9rem] leading-relaxed text-dim">
                Each prototype above maps to real Android patterns — state machines for agent
                traces, posture-driven layout composition, and signal-weighted priority engines.
                Happy to walk through the code, or build the next one with your team.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="mailto:moekyawaung2026@gmail.com" className="btn-solid">
                  <Send className="h-4 w-4" />
                  moekyawaung2026@gmail.com
                </a>
                <a
                  href="https://github.com/Dev-moe-kyawaung"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  <GithubIcon className="h-4 w-4" />
                  Dev-moe-kyawaung
                </a>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.75rem] text-faint">
                <span className="flex items-center gap-2 font-mono">
                  <Phone className="h-3.5 w-3.5 text-accent" /> +95 9 889 000 889
                </span>
                <span className="flex items-center gap-2 font-mono">
                  <Mail className="h-3.5 w-3.5 text-accent" /> Reply within 24h
                </span>
              </div>
            </div>

            {/* theme summary card */}
            <div className="lg:col-span-5">
              <div
                className="rounded-3xl p-5"
                style={{ background: 'var(--elev)', border: '1px solid var(--line)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center gap-2 text-[0.78rem] font-semibold">
                    <Sparkles className="h-3.5 w-3.5 text-accent" />
                    Theme studio
                  </span>
                  <span className="font-mono text-[0.55rem] text-faint">{theme.mode}</span>
                </div>

                <p className="text-[0.72rem] leading-relaxed text-faint">
                  This page ships four palette families, each recalibrated for light and dark.
                  Your current choice:
                </p>

                <div className="mt-4 flex items-center gap-3 rounded-2xl p-3" style={{ border: '1px solid var(--line)' }}>
                  <span className="flex h-9 w-9 overflow-hidden rounded-xl">
                    {theme.swatch.map((c, i) => (
                      <span key={i} className="h-full flex-1" style={{ background: c }} />
                    ))}
                  </span>
                  <span>
                    <span className="block font-display text-[0.82rem] font-bold">{theme.name} · {theme.mode}</span>
                    <span className="block font-mono text-[0.55rem] text-faint">{theme.vibe}</span>
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-2">
                  {themes
                    .filter((t) => t.mode === 'dark')
                    .map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setTheme(t.id);
                          if (!document.documentElement.dataset['chosen']) {
                            document.documentElement.dataset['chosen'] = '1';
                          }
                        }}
                        className="group rounded-xl p-1.5 transition-all"
                        style={{ border: `1px solid ${t.family === theme.family ? 'rgb(var(--halo) / 0.5)' : 'var(--line)'}` }}
                        title={t.name}
                      >
                        <span className="flex h-7 overflow-hidden rounded-lg">
                          {t.swatch.map((c, i) => (
                            <span key={i} className="h-full flex-1" style={{ background: c }} />
                          ))}
                        </span>
                        <span className="mt-1.5 block text-center font-mono text-[0.48rem] uppercase tracking-[0.1em] text-faint group-hover:text-dim">
                          {t.name}
                        </span>
                      </button>
                    ))}
                </div>

                <button
                  onClick={toggleMode}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-2.5 text-[0.7rem] font-semibold"
                  style={{ border: '1px dashed var(--line-strong)', color: 'var(--accent)' }}
                >
                  Flip to {theme.mode === 'dark' ? 'light' : 'dark'} mode
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

export function Footer() {
  const socials = [
    { i: GithubIcon, h: 'https://github.com/Dev-moe-kyawaung', l: 'GitHub' },
    { i: LinkedinIcon, h: 'https://www.linkedin.com/in/moe-kyaw-aung-2653093a1', l: 'LinkedIn' },
    { i: YoutubeIcon, h: 'https://www.youtube.com/channel/UCUuTXUguZb4xjeL2nX8WJG', l: 'YouTube' },
  ];

  return (
    <footer className="relative pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, var(--line-strong), transparent)' }} />
        <div className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: 'linear-gradient(140deg, var(--accent), var(--a2))' }}>
              <span className="font-display text-[0.72rem] font-black" style={{ color: 'var(--btn-ink, #05070a)' }}>MK</span>
            </span>
            <div className="leading-tight">
              <p className="font-display text-[0.8rem] font-bold">Moe Kyaw Aung</p>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-faint">
                2026 Mobile Trend Studio
              </p>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-md text-[0.68rem] leading-relaxed text-faint"
          >
            Built with React, Vite, Tailwind CSS and Framer Motion. All prototypes are illustrative
            interactions — no live booking, no data leaves the device.
          </motion.p>

          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.l}
                href={s.h}
                target="_blank"
                rel="noreferrer"
                title={s.l}
                className="grid h-9 w-9 place-items-center rounded-xl text-dim transition-colors hover:text-accent"
                style={{ border: '1px solid var(--line)' }}
              >
                <s.i className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 font-mono text-[0.55rem] tracking-[0.14em] text-faint">
          © 2026 MOE KYAW AUNG · TACHILEIK 🇲🇲 ↔ BANGKOK 🇹🇭 · CODE WITH CULTURE, BUILD WITH PURPOSE
        </p>
      </div>
    </footer>
  );
}
