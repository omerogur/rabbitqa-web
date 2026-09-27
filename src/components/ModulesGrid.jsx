import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AGENTS, MODULES } from '../data/modules';
import { cn } from '../lib/cn';
import { Reveal, SectionHeading } from './primitives';

const TABS = [{ id: 'all', name: 'All modules' }, ...AGENTS.map((a) => ({ id: a.id, name: a.name }))];
const agentOf = Object.fromEntries(AGENTS.map((a) => [a.id, a]));

function ModuleCard({ m }) {
  const agent = agentOf[m.agent];
  const preview = m.preview;
  return (
    <motion.article
      layout
      id={`module-${m.id}`}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35 }}
      className={cn('card-surface group flex scroll-mt-28 flex-col overflow-hidden p-6 transition-colors hover:border-white/20', preview && 'md:col-span-2')}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="relative grid size-11 flex-shrink-0 place-items-center rounded-2xl border border-white/10 bg-ink-900">
          <span className={cn('absolute inset-0 rounded-2xl bg-gradient-to-br opacity-25', agent.accent)} />
          <m.icon className="relative size-5 text-white" />
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.06em] text-white/40 uppercase">
          <span className={cn('size-1.5 rounded-full', agent.dot)} /> {m.kicker}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">{m.name}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-white/60">{m.summary}</p>

      <div className={cn('mt-5 flex flex-1 flex-col gap-5', preview && 'md:flex-row md:items-end')}>
        <ul className="flex flex-col gap-2 md:min-w-[220px]">
          {m.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-2 text-[13px] text-white/55">
              <span className={cn('mt-[7px] size-1 flex-shrink-0 rounded-full', agent.dot)} />
              {f}
            </li>
          ))}
        </ul>
        {preview && (
          <div className="relative -mr-6 -mb-6 flex-1 overflow-hidden rounded-tl-2xl border-t border-l border-white/10 md:ml-2">
            <img src={preview} alt={`${m.name} screen`} loading="lazy" className="aspect-[16/9] w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent" />
          </div>
        )}
      </div>

      <Link to={`/modules/${m.id}`} className="mt-6 inline-flex items-center gap-1 self-start text-[13px] font-medium text-white/70 transition-colors after:absolute after:inset-0 group-hover:text-white">
        {m.scenes ? 'Watch it live' : `Explore ${m.name}`} <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.article>
  );
}

export default function ModulesGrid({ showHeading = true }) {
  const [params] = useSearchParams();
  const [tab, setTab] = useState(() => (TABS.some((t) => t.id === params.get('agent')) ? params.get('agent') : 'all'));
  const visible = MODULES.filter((m) => tab === 'all' || m.agent === tab);

  return (
    <section className={cn('relative', showHeading ? 'py-24 sm:py-32' : 'pb-24 sm:pb-32')}>
      <div className="container-x">
        {showHeading && (
          <SectionHeading
            eyebrow="14 modules · one workspace"
            title="Every quality capability,"
            accent="one platform."
            body="Start with the module you need today. Every module shares the same projects, permissions, test repository and AI agents."
          />
        )}

        <Reveal delay={0.1} className={cn('flex justify-center', showHeading && 'mt-12')}>
          <div className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1 [scrollbar-width:none]">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn('relative rounded-full px-4 py-2 text-[13px] whitespace-nowrap transition-colors', tab === t.id ? 'text-white' : 'text-white/55 hover:text-white')}
              >
                {tab === t.id && <motion.span layoutId="module-tab" className="absolute inset-0 rounded-full bg-white/10" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="relative">{t.name}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((m) => (
              <ModuleCard key={m.id} m={m} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
