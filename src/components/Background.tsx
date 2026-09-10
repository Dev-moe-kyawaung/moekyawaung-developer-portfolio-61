import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '../theme/ThemeProvider';

/** Ambient layered backdrop: drifting aurora orbs + fine grid + noise + scanline */
export function Background() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: 'var(--app)' }}>
      {/* base vertical wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% -10%, color-mix(in srgb, var(--app-2) 92%, var(--accent) 8%), transparent 60%)',
        }}
      />

      {/* aurora orbs — keyed to theme so they re-animate on switch */}
      <div key={theme.id} className="absolute inset-0">
        <motion.div
          className="orb"
          style={{
            width: 720,
            height: 720,
            top: '-14%',
            left: '-12%',
            background: 'radial-gradient(circle, rgb(var(--halo) / 0.30), transparent 68%)',
          }}
          animate={{ x: [0, 120, 20, 0], y: [0, 60, 140, 0], scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="orb"
          style={{
            width: 620,
            height: 620,
            bottom: '-12%',
            right: '-8%',
            background: 'radial-gradient(circle, rgb(var(--halo2) / 0.28), transparent 68%)',
          }}
          animate={{ x: [0, -110, -30, 0], y: [0, -70, 40, 0], scale: [1, 1.12, 1, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="orb"
          style={{
            width: 520,
            height: 520,
            top: '38%',
            left: '46%',
            background: 'radial-gradient(circle, rgb(var(--halo) / 0.16), transparent 70%)',
          }}
          animate={{ x: [0, 80, -60, 0], y: [0, -90, 60, 0] }}
          transition={{ duration: 46, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* contour texture — grayscale, blended so it works in every palette */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/topography.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: theme.mode === 'dark' ? 0.22 : 0.14,
          mixBlendMode: theme.mode === 'dark' ? 'screen' : 'multiply',
          maskImage:
            'radial-gradient(120% 90% at 70% 12%, #000 0%, transparent 62%), radial-gradient(90% 70% at 12% 88%, #000 0%, transparent 60%)',
          maskComposite: 'add',
          WebkitMaskImage:
            'radial-gradient(120% 90% at 70% 12%, #000 0%, transparent 62%), radial-gradient(90% 70% at 12% 88%, #000 0%, transparent 60%)',
        }}
      />

      {/* fine grid */}
      <div className="absolute inset-0 grid-fine drift opacity-45" />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 0%, transparent 40%, color-mix(in srgb, var(--app) 88%, #000) 100%)',
          opacity: 0.85,
        }}
      />

      <div className="noise" />
    </div>
  );
}

/** Soft halo that trails the cursor (desktop) */
export function PointerHalo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let tx = x;
    let ty = y;
    let raf = 0;

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.09;
      y += (ty - y) * 0.09;
      if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="pointer-halo" />;
}

/** Top scroll-progress rail */
export function ScrollRail() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setPct(Math.round(v * 100)));
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[70] origin-left"
        style={{
          scaleX: width,
          background: 'linear-gradient(90deg, var(--accent), var(--a2) 60%, var(--a3))',
          boxShadow: '0 0 18px rgb(var(--halo) / 0.7)',
        }}
      />
      <div className="fixed right-4 bottom-6 z-[70] hidden xl:flex flex-col items-center gap-2 mix-blend-difference">
        <span className="font-mono text-[0.6rem] tracking-widest text-white/70">
          {String(pct).padStart(2, '0')}
        </span>
      </div>
    </>
  );
}
