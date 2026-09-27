import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, UserCheck } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AGENTS, MODULES } from '../data/modules';
import { PLANNING_FLOW, SMARTREQUEST_FLOW, TECHNICAL_FLOW } from '../data/scenes';
import { cn } from '../lib/cn';
import LiveScreen from './LiveScreen';
import { Reveal, SectionHeading } from './primitives';

const TABS = AGENTS.filter((a) => a.id !== 'infra');

const FLOWS = {
  business: SMARTREQUEST_FLOW,
  planning: PLANNING_FLOW,
  technical: TECHNICAL_FLOW,
};

export default function AgentsFlow() {
  const [active, setActive] = useState(0);
  const [scene, setScene] = useState(0);
  const agent = TABS[active];
  const modules = MODULES.filter((m) => m.agent === agent.id);
  const flow = FLOWS[agent.id];

  const selectAgent = (i) => {
    setActive(i);
    setScene(0);
  };
  // The next agent takes over once the current tour has played through. The
  // outgoing player keeps ticking while it fades out, so ignore it.
  const activeRef = useRef(active);
  activeRef.current = active;
  const sceneHandler = (owner) => (i) => {
    if (activeRef.current !== owner) return;
    if (i === 0) selectAgent((owner + 1) % TABS.length);
    else setScene(i);
  };

  return (
    <section id="agents" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Agents" title="Specialized Agents" accent="For Every Quality Layer" />

        <div className="mt-14 flex flex-col gap-4">
          <Reveal className="grid grid-flow-col auto-cols-[minmax(210px,1fr)] gap-2 overflow-x-auto [scrollbar-width:none] md:grid-flow-row md:grid-cols-3">
            {TABS.map((a, i) => (
              <button
                key={a.id}
                type="button"
                onClick={() => selectAgent(i)}
                className={cn(
                  'relative overflow-hidden rounded-2xl border p-5 text-left transition-colors',
                  i === active ? 'border-white/15 bg-white/[0.06]' : 'border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.04]',
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn('grid size-8 place-items-center rounded-full bg-gradient-to-br text-sm font-semibold text-white', a.accent)}>{i + 1}</span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold tracking-[0.08em] text-white/40 uppercase">{a.stage}</p>
                    <p className={cn('font-display text-lg font-semibold', i === active ? 'text-white' : 'text-white/70')}>{a.name}</p>
                  </div>
                </div>
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/[0.04]">
                  {i === active && (
                    <motion.span
                      className={cn('block h-full bg-gradient-to-r', a.accent)}
                      initial={{ width: 0 }}
                      animate={{ width: `${((scene + 1) / flow.length) * 100}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  )}
                </span>
              </button>
            ))}
          </Reveal>

          <div className="card-surface overflow-hidden">
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10"
              >
                <div className="flex min-w-0 flex-col lg:col-span-5">
                  <p className="text-[11px] font-semibold tracking-[0.08em] text-white/40 uppercase">{agent.stage}</p>
                  <h3 className="font-display mt-2 text-3xl font-semibold tracking-tight text-white">{agent.name}</h3>
                  <div className="mt-5 flex items-start gap-2.5 text-sm">
                    <UserCheck className="mt-0.5 size-4 flex-shrink-0 text-brand-200" />
                    <p className="text-white/55">
                      On behalf of <span className="text-white/90">{agent.role}</span>
                    </p>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/70">{agent.does}</p>
                  <p className="font-display text-gradient mt-6 text-xl font-medium">{agent.tagline}</p>

                  <div className="mt-6 flex flex-col gap-2">
                    {modules.map((m) => (
                      <Link
                        key={m.id}
                        to={`/modules/${m.id}`}
                        className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 transition-colors hover:border-white/20"
                      >
                        <span className="grid size-8 flex-shrink-0 place-items-center rounded-lg bg-white/[0.05]">
                          <m.icon className="size-4 text-white/80" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-white">{m.name}</span>
                          <span className="block truncate text-xs text-white/45">{m.kicker}</span>
                        </span>
                        <ArrowUpRight className="size-4 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                      </Link>
                    ))}
                  </div>
                  <Link to={`/agents/${agent.id}-agents`} className="inline-flex items-center gap-1.5 mt-6 self-start text-sm font-medium text-brand-200 hover:text-white">
                    Discover {agent.name} <ArrowRight className="size-4" />
                  </Link>
                </div>

                <div className="min-w-0 lg:col-span-7">
                  <LiveScreen key={agent.id} scenes={flow} showChapters={false} index={scene} onIndexChange={sceneHandler(active)} />
                </div>
              </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
