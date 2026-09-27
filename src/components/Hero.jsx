import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { HERO_SCENES } from '../data/scenes';
import LiveScreen from './LiveScreen';
import { EASE } from './primitives';


function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="grid-bg absolute inset-0" />
      <motion.div
        className="absolute -top-40 left-1/2 h-[720px] w-[1200px] -translate-x-1/2 rounded-full opacity-70 blur-[120px]"
        style={{ background: 'radial-gradient(closest-side, rgba(49,32,255,0.75), transparent)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-40 -left-40 h-[520px] w-[620px] rounded-full opacity-50 blur-[120px]"
        style={{ background: 'radial-gradient(closest-side, rgba(217,70,239,0.55), transparent)' }}
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-72 -right-40 h-[520px] w-[620px] rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(closest-side, rgba(34,211,238,0.45), transparent)' }}
        animate={{ x: [0, -70, 0], y: [0, 50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-ink-950" />
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const rotateX = useTransform(scrollYProgress, [0, 0.35], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 0.35], [0, -40]);
  const glow = useTransform(scrollYProgress, [0, 0.35], [0.4, 1]);

  return (
    <section id="top" ref={ref} className="noise relative overflow-hidden pt-36 pb-24 sm:pt-44">
      <Aurora />

      <div className="container-x relative z-10 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="eyebrow mb-8"
        >
          <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
          Business, Planning &amp; Technical agents, working as one team
        </motion.span>

        <h1 className="h-display max-w-6xl text-[42px] sm:text-6xl md:text-[80px]">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            Multi-Agentic AI Platform
          </motion.span>{' '}
          <motion.span
            className="text-gradient inline-block"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.25, ease: EASE }}
          >
            for Digital Product Quality
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl"
        >
          AI agents do the quality work from requirements to production; every decision stays with your team.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-medium text-white/80 sm:text-[15px]"
        >
          {['Predict Risk.', 'Prevent Failure.', 'Protect Revenue.'].map((w, i) => (
            <span key={w} className="flex items-center gap-4">
              {i > 0 && <span className="size-1 rounded-full bg-brand-300/60" />}
              {w}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link to="/#contact" className="btn-primary !h-12 !px-7">
            Request a Demo <ArrowRight className="size-4" />
          </Link>
          <a href="#tour" className="btn-ghost !h-12 !px-6">
            <PlayCircle className="size-4" /> Watch the product tour
          </a>
        </motion.div>
      </div>

      <div id="tour" className="container-x relative z-10 mt-16 sm:mt-20" style={{ perspective: 1800 }}>
        <motion.div
          style={{ rotateX, scale, y }}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
          className="relative origin-top"
        >
          <motion.div
            style={{ opacity: glow }}
            className="absolute -inset-x-10 -top-10 bottom-10 -z-10 rounded-[40px] bg-gradient-to-b from-brand-500/40 via-iris/20 to-transparent blur-3xl"
          />
          <LiveScreen scenes={HERO_SCENES} />
        </motion.div>
      </div>
    </section>
  );
}
