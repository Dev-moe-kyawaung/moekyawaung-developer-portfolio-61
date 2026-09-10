import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowUpRight,
  Brain,
  Code2,
  Database,
  Film,
  FolderGit2,
  Globe,
  GraduationCap,
  Layers,
  LineChart,
  MapPin,
  Shield,
  Smartphone,
  Store,
  Terminal,
  Video,
  Wallet,
  Cloud,
} from 'lucide-react';
import { Card, Eyebrow, GithubIcon, LinkedinIcon, Marquee, SectionHead, YoutubeIcon } from './ui';

const PROFILE_IMG =
  'https://res.cloudinary.com/dye5qpwii/image/upload/v1778527878/IMG_20260430_053105_uef0yr.png';

const DOMAINS = [
  {
    name: 'Android Platform',
    icon: Smartphone,
    items: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Navigation', 'Paging', 'Glance widgets'],
  },
  {
    name: 'Architecture',
    icon: Layers,
    items: ['Clean Architecture', 'MVVM', 'MVI', 'Multi-module', 'Coroutines', 'Flow'],
  },
  {
    name: 'Backend & Cloud',
    icon: Cloud,
    items: ['Firebase Suite', 'REST', 'Retrofit', 'Room', 'Python', 'Firestore rules'],
  },
  {
    name: 'Delivery & QA',
    icon: Terminal,
    items: ['GitHub Actions', 'Azure DevOps', 'Fastlane', 'JUnit', 'Espresso', 'MockK'],
  },
  {
    name: 'AI & On-Device ML',
    icon: Brain,
    items: ['Claude API', 'TFLite', 'On-device inference', 'Prompt design', 'Agent tooling'],
  },
  {
    name: 'Security',
    icon: Shield,
    items: ['Ethical hacking', 'Obfuscation', 'Keystore', 'Root detection', 'Threat modelling'],
  },
];

const TOOLBAND = [
  'Kotlin', 'Jetpack Compose', 'Material 3', 'Coroutines', 'Flow', 'MVVM', 'MVI', 'Clean Architecture',
  'Retrofit', 'Room', 'Firebase', 'Crashlytics', 'FCM', 'Hilt', 'WorkManager', 'Coil', 'Gradle KTS',
  'GitHub Actions', 'Azure DevOps', 'Fastlane', 'JUnit', 'Espresso', 'MockK', 'Python', 'TFLite',
  'Claude API', 'Figma', 'Kali Linux', 'Docker',
];

const CDN = 'https://res.cloudinary.com/dye5qpwii/image/upload';

const PROJECTS: {
  name: string;
  desc: string;
  icon: typeof Activity;
  tag: string;
  img?: string;
}[] = [
  { name: 'PulseSync', desc: 'Realtime sync platform · offline-first, full CI/CD', icon: Activity, tag: 'Multi-module', img: `${CDN}/v1778763531/MKA_3_zqrhhr.webp` },
  { name: 'MoekyawTranslator', desc: 'AI translation app with on-device fallback', icon: Globe, tag: 'In build', img: `${CDN}/v1778795856/copilot_image_1778795675037_heh9xk.png` },
  { name: 'POS Ultimate Pro Max', desc: 'Advanced point-of-sale with inventory + analytics', icon: Store, tag: 'Flagship', img: `${CDN}/v1778763535/MKA_25_lbx6fb.webp` },
  { name: 'Social Dashboard', desc: 'Cross-network analytics workspace', icon: LineChart, tag: 'Web + API', img: `${CDN}/v1778763531/MKA_12_iv8kpm.webp` },
  { name: 'Job Portal App', desc: 'Search, apply, track — role-aware flows', icon: FolderGit2, tag: 'Product', img: `${CDN}/v1778763532/MKA_11_jbijtv.webp` },
  { name: 'Crypto & Money Tracker', desc: 'Live markets, budgets, local persistence', icon: Wallet, tag: 'Data viz', img: `${CDN}/v1778795799/2024119_20_b94fen.jpg` },
  { name: 'Video Player', desc: 'Gesture-first player with PiP and casting', icon: Video, tag: 'Media3' },
  { name: 'Thailand Travel', desc: 'Itinerary planner with maps integration', icon: MapPin, tag: 'Maps' },
  { name: 'Hospital Lists', desc: 'Directory with geosearch and offline cache', icon: Database, tag: 'Civic' },
  { name: 'Game Collection', desc: 'Arcade suite — Snake, canvas physics', icon: Film, tag: 'Canvas' },
];

/** Image with monogram / icon fallback — never renders a broken tile */
function Thumb({ src, fallback }: { src?: string; fallback: React.ReactNode }) {
  const [failed, setFailed] = useState(false);
  return (
    <span
      className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl"
      style={{ background: 'rgb(var(--halo) / 0.11)', border: '1px solid var(--line)' }}
    >
      {src && !failed ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        fallback
      )}
    </span>
  );
}

const CREDENTIALS = [
  { k: 'Programming languages', v: 13 },
  { k: 'Web development', v: 13 },
  { k: 'AI & data science', v: 11 },
  { k: 'Business & marketing', v: 11 },
  { k: 'Security & DevOps', v: 10 },
  { k: 'Software engineering', v: 7 },
  { k: 'Mobile & app dev', v: 7 },
  { k: 'Databases', v: 6 },
  { k: 'Blockchain', v: 4 },
];

export function StackSection() {
  return (
    <section id="stack" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="05 / Depth"
          eyebrow="Capability map"
          title="The stack behind the"
          accentTitle="prototypes"
          lead="Senior mobile work in 2026 is mostly architectural: deciding what runs on-device, what the agent is allowed to touch, and how a screen can be recomposed without breaking trust."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {DOMAINS.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="p-6 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl" style={{ background: 'rgb(var(--halo) / 0.12)' }}>
                    <d.icon className="h-4.5 w-4.5 text-accent" />
                  </span>
                  <div>
                    <h3 className="font-display text-[0.95rem] font-bold tracking-tight">{d.name}</h3>
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-faint">
                      {d.items.length} tools
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {d.items.map((it) => (
                    <span key={it} className="chip">{it}</span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* tool band */}
        <div className="mt-10 space-y-3">
          <Marquee items={TOOLBAND} />
          <Marquee items={[...TOOLBAND].reverse()} reverse />
        </div>

        {/* credentials */}
        <div className="mt-16 grid gap-6 lg:grid-cols-12 items-start">
          <div className="lg:col-span-4">
            <Card className="p-6">
              <span className="grid h-11 w-11 place-items-center rounded-2xl mb-5" style={{ background: 'rgb(var(--halo) / 0.12)' }}>
                <GraduationCap className="h-5 w-5 text-accent" />
              </span>
              <p className="font-display text-4xl font-extrabold tracking-tight gtext-accent">82+</p>
              <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-faint">
                Verified certificates
              </p>
              <p className="mt-4 text-[0.78rem] leading-relaxed text-dim">
                Structured learning across 9 technical domains — programming, web, mobile,
                databases, AI, security, blockchain, software engineering and business.
              </p>
              <div className="mt-5 flex items-center gap-2 font-mono text-[0.58rem] text-faint">
                <Code2 className="h-3.5 w-3.5 text-accent" />
                Google Developers Launchpad alum
              </div>
            </Card>
          </div>

          <div className="lg:col-span-8">
            <Card className="p-6">
              <Eyebrow>Credential distribution</Eyebrow>
              <div className="mt-6 space-y-3.5">
                {CREDENTIALS.map((c, i) => (
                  <div key={c.k} className="flex items-center gap-4">
                    <span className="w-40 shrink-0 truncate text-[0.74rem] font-medium text-dim">{c.k}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: 'var(--elev)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(c.v / 13) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, var(--accent), var(--a2))' }}
                      />
                    </div>
                    <span className="w-8 shrink-0 text-right font-mono text-[0.62rem] text-faint">{c.v}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProfileSection() {
  return (
    <section id="profile" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="06 / Profile"
          eyebrow="Moe Kyaw Aung"
          title="Code with culture,"
          accentTitle="build with purpose."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12 items-start">
          {/* identity card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-3xl" style={{ border: '1px solid var(--line-strong)' }}>
                  <img
                    src={PROFILE_IMG}
                    alt="Moe Kyaw Aung"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0';
                    }}
                  />
                  <span
                    className="absolute inset-0 -z-10 grid place-items-center font-display text-xl font-black"
                    style={{ background: 'linear-gradient(140deg, var(--accent), var(--a2))', color: 'var(--btn-ink)' }}
                  >
                    MKA
                  </span>
                </span>
                <div className="min-w-0">
                  <p className="font-display text-[1.05rem] font-bold tracking-tight">Moe Kyaw Aung</p>
                  <p className="text-[0.75rem] text-accent">Senior Android Engineer</p>
                  <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[0.56rem] text-faint">
                    <MapPin className="h-3 w-3" />
                    Tachileik 🇲🇲 ↔ Bangkok 🇹🇭
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { k: 'Certificates', v: '82+' },
                  { k: 'Repositories', v: '40+' },
                  { k: 'Experience', v: '6 yrs' },
                  { k: 'Languages', v: '3' },
                ].map((s) => (
                  <div key={s.k} className="rounded-2xl p-3" style={{ background: 'var(--elev)', border: '1px solid var(--line)' }}>
                    <p className="font-display text-[1.1rem] font-extrabold">{s.v}</p>
                    <p className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-faint">{s.k}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-2.5">
                <a
                  href="mailto:moekyawaung2026@gmail.com"
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-[0.74rem] font-semibold transition-colors"
                  style={{ background: 'linear-gradient(120deg, var(--accent), var(--a2))', color: 'var(--btn-ink, #05070a)' }}
                >
                  Start a conversation
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <div className="flex gap-2">
                  {[
                    { i: GithubIcon, h: 'https://github.com/Dev-moe-kyawaung', l: 'GitHub' },
                    { i: LinkedinIcon, h: 'https://www.linkedin.com/in/moe-kyaw-aung-2653093a1', l: 'LinkedIn' },
                    { i: YoutubeIcon, h: 'https://www.youtube.com/channel/UCUuTXUguZb4xjeL2nX8WJG', l: 'YouTube' },
                    { i: Globe, h: 'https://gravatar.com/moekyawaung13721', l: 'Gravatar' },
                  ].map((s) => (
                    <a
                      key={s.l}
                      href={s.h}
                      target="_blank"
                      rel="noreferrer"
                      title={s.l}
                      className="grid h-10 flex-1 place-items-center rounded-2xl text-dim transition-colors hover:text-accent"
                      style={{ border: '1px solid var(--line)' }}
                    >
                      <s.i className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <Eyebrow>Languages</Eyebrow>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="chip">🇲🇲 Burmese · native</span>
                <span className="chip">🇹🇭 Thai · conversational</span>
                <span className="chip">🌐 English · professional</span>
                <span className="chip">☕ Kotlin · fluent</span>
              </div>
            </Card>
          </div>

          {/* narrative + projects */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="p-6 sm:p-8">
              <Eyebrow>Positioning</Eyebrow>
              <div className="mt-5 space-y-4 text-[0.88rem] leading-relaxed text-dim">
                <p>
                  I build Android products that hold up under load: <span className="text-ink font-semibold">Kotlin</span>,{' '}
                  <span className="text-ink font-semibold">Jetpack Compose</span>, MVVM/MVI and Clean
                  Architecture across genuinely multi-module projects — not slideware.
                </p>
                <p>
                  Firebase across auth, Firestore, messaging and Crashlytics; REST layers with Retrofit
                  and OkHttp; offline-first persistence with Room and WorkManager. Delivery is automated:
                  GitHub Actions and Azure DevOps pipelines with Fastlane releases and real test gates.
                </p>
                <p>
                  Most recently I have been building agent-assisted experiences — where the interesting
                  design question is no longer "which screen?" but "what is the agent allowed to decide,
                  and how do we show our work?"
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { k: 'Speciality', v: 'Architecture & automation' },
                  { k: 'Current build', v: 'MoekyawTranslator' },
                  { k: 'Status', v: 'Open to senior roles' },
                ].map((x) => (
                  <div key={x.k} className="rounded-2xl p-4" style={{ background: 'var(--elev)', border: '1px solid var(--line)' }}>
                    <p className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-faint">{x.k}</p>
                    <p className="mt-1.5 text-[0.78rem] font-semibold">{x.v}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div>
              <div className="mb-4 flex items-end justify-between">
                <Eyebrow>Selected work · 40+ repositories</Eyebrow>
                <a
                  href="https://github.com/Dev-moe-kyawaung"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-[0.72rem] font-semibold text-dim hover:text-accent transition-colors"
                >
                  All repositories <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {PROJECTS.map((p, i) => (
                  <motion.a
                    key={p.name}
                    href="https://github.com/Dev-moe-kyawaung"
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: (i % 4) * 0.06 }}
                  >
                    <Card className="p-5 h-full group">
                      <div className="flex items-start gap-3.5">
                        <Thumb src={p.img} fallback={<p.icon className="h-4.5 w-4.5 text-accent" />} />
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="truncate font-display text-[0.86rem] font-bold tracking-tight">{p.name}</span>
                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                          </span>
                          <span className="mt-1 block text-[0.72rem] leading-relaxed text-faint">{p.desc}</span>
                          <span
                            className="mt-2.5 inline-block rounded-full px-2 py-0.5 font-mono text-[0.5rem] uppercase tracking-[0.14em]"
                            style={{ border: '1px solid var(--line-strong)', color: 'var(--dim)' }}
                          >
                            {p.tag}
                          </span>
                        </span>
                      </div>
                    </Card>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
