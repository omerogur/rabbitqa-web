import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FinalCta } from '../components/Closing';
import { EASE, Reveal } from '../components/primitives';
import ModuleDetails from '../components/ModuleDetails';
import Spotlight from '../components/Spotlight';
import { AGENTS, MODULES, contentById, moduleById } from '../data/modules';
import { cn } from '../lib/cn';

const agentOf = Object.fromEntries(AGENTS.map((a) => [a.id, a]));

function ModuleHero({ m }) {
  const agent = agentOf[m.agent];
  const stats = m.tour?.stats;
  return (
    <section className="noise relative overflow-hidden pt-28 pb-4 sm:pt-32">
      <div className="grid-bg absolute inset-0" />
      <div
        className="pointer-events-none absolute -top-40 left-1/3 h-[480px] w-[900px] -translate-x-1/2 rounded-full opacity-55 blur-[120px]"
        style={{ background: 'radial-gradient(closest-side, rgba(49,32,255,0.7), transparent)' }}
      />
      <div className="container-x relative">
        <Link to="/modules" className="inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-white">
          <ArrowLeft className="size-4" /> All modules
        </Link>
        <div className="mt-6 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3.5">
              <span className="relative grid size-12 flex-shrink-0 place-items-center rounded-2xl border border-white/10 bg-ink-900">
                <span className={cn('absolute inset-0 rounded-2xl bg-gradient-to-br opacity-30', agent.accent)} />
                <m.icon className="relative size-6 text-white" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold tracking-[0.08em] text-white/45 uppercase">
                  {agent.name} · {contentById[m.id]?.tagline || m.kicker}
                </p>
                <p className="font-display text-xl font-semibold text-white">{m.name}</p>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
              className="h-display mt-6 text-[30px] sm:text-4xl lg:text-[42px]"
            >
              {m.summary}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
              className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/60 sm:text-base"
            >
              {contentById[m.id]?.heroDescription || m.body}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="glass rounded-3xl p-5 sm:p-6 lg:col-span-5"
          >
            {stats && (
              <div className="grid grid-cols-3 gap-3 border-b border-white/[0.08] pb-5">
                {stats.map((s) => (
                  <div key={s.label} className="min-w-0">
                    <p className="font-display text-2xl font-semibold tracking-tight text-white sm:text-[28px]">{s.value}</p>
                    <p className="mt-1 line-clamp-2 text-[11.5px] leading-snug text-white/50">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
            <ul className={cn('grid gap-2.5 sm:grid-cols-2', stats && 'pt-5')}>
              {m.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px] leading-snug text-white/75">
                  <span className="mt-0.5 grid size-4 flex-shrink-0 place-items-center rounded-full bg-emerald-400/15">
                    <Check className="size-3 text-emerald-300" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Related({ m }) {
  const related = MODULES.filter((x) => x.agent === m.agent && x.id !== m.id);
  const others = related.length ? related : MODULES.filter((x) => x.id !== m.id).slice(0, 3);
  return (
    <section className="py-16">
      <div className="container-x">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-white">Works hand in hand with</h2>
        </Reveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((x, i) => (
            <Reveal key={x.id} delay={i * 0.06}>
              <Link to={`/modules/${x.id}`} className="card-surface group flex items-start gap-4 p-5 transition-colors hover:border-white/20">
                <span className="grid size-10 flex-shrink-0 place-items-center rounded-xl border border-white/10 bg-ink-900">
                  <x.icon className="size-5 text-white/85" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-white">{x.name}</span>
                  <span className="mt-1 line-clamp-2 block text-sm text-white/55">{x.summary}</span>
                </span>
                <ArrowUpRight className="size-4 flex-shrink-0 text-white/35 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ModulePage() {
  const { id } = useParams();
  const m = moduleById[id];
  if (!m) return <Navigate to="/modules" replace />;

  return (
    <div key={m.id}>
      <ModuleHero m={m} />
      {m.tour && (
        <div id="tour" className="scroll-mt-16">
          <Spotlight
            id={`${m.id}-tour`}
            module={m}
            eyebrow={`${m.name} · Live product tour`}
            title={m.tour.title}
            accent={m.tour.accent}
            steps={m.tour.steps}
            compact
          />
        </div>
      )}
      <ModuleDetails name={m.name} content={contentById[m.id]} />
      <Related m={m} />
      <FinalCta />
    </div>
  );
}
