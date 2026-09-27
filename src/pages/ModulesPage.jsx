import { motion } from 'framer-motion';
import { AGENTS, MODULES } from '../data/modules';
import { FinalCta } from '../components/Closing';
import Enterprise from '../components/Enterprise';
import ModulesGrid from '../components/ModulesGrid';
import { EASE } from '../components/primitives';

export default function ModulesPage() {
  return (
    <>
      <section className="noise relative overflow-hidden pt-40 pb-16 sm:pt-48">
        <div className="grid-bg absolute inset-0" />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[1000px] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
          style={{ background: 'radial-gradient(closest-side, rgba(49,32,255,0.7), transparent)' }}
        />
        <div className="container-x relative text-center">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
            Platform Modules
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
            className="h-display mx-auto mt-6 max-w-4xl text-[40px] sm:text-6xl md:text-7xl"
          >
            Every quality capability, <span className="text-gradient">one platform.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/65"
          >
            {MODULES.length} modules across {AGENTS.length} agent layers. They share the same projects, permissions, test repository and AI agents, so work flows from one module to the next.
          </motion.p>
        </div>
      </section>
      <ModulesGrid showHeading={false} />
      <Enterprise />
      <FinalCta />
    </>
  );
}
