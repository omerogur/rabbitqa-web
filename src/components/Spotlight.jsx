import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/cn';
import LiveScreen from './LiveScreen';
import { Reveal } from './primitives';

/**
 * A module "chapter": narrative steps on one side, the live player on the
 * other. Clicking a step jumps the player; the player advancing lights the step.
 */
export default function Spotlight({ id, module, eyebrow, title, accent, steps, stats, reverse = false, glow = 'from-brand-500/35', compact = false }) {
  const [index, setIndex] = useState(0);
  const { scenes, starts } = useMemo(() => {
    const out = { scenes: [], starts: [] };
    steps.forEach((s) => {
      out.starts.push(out.scenes.length);
      out.scenes.push(...s.scenes);
    });
    return out;
  }, [steps]);
  const activeStep = starts.reduce((acc, start, i) => (index >= start ? i : acc), 0);
  const Icon = module.icon;

  return (
    <section id={id} className={cn('relative', compact ? 'pt-8 pb-20 sm:pt-10 sm:pb-24' : 'py-24 sm:py-32')}>
      <div className={cn('pointer-events-none absolute top-1/3 h-[520px] w-[720px] rounded-full bg-gradient-to-br to-transparent opacity-60 blur-[140px]', glow, reverse ? '-left-40' : '-right-40')} />
      <div className="container-x relative">
        <div className={cn('grid items-center gap-12 lg:grid-cols-12 lg:gap-14', reverse && 'lg:[&>*:first-child]:order-2')}>
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">
                <Icon className="size-3.5" /> {eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-display mt-5 text-[34px] sm:text-5xl">
                {title} <span className="text-gradient">{accent}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              {!compact && <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">{module.body}</p>}
            </Reveal>

            <div className="mt-8 flex flex-col gap-2">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={0.12 + i * 0.06}>
                  <button
                    type="button"
                    onClick={() => setIndex(starts[i])}
                    className={cn(
                      'relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300',
                      i === activeStep ? 'border-white/15 bg-white/[0.06]' : 'border-transparent hover:bg-white/[0.03]',
                    )}
                  >
                    {i === activeStep && (
                      <motion.span layoutId={`${id}-bar`} className="absolute top-4 bottom-4 left-0 w-[3px] rounded-full bg-gradient-to-b from-brand-300 to-magenta" />
                    )}
                    <div className="flex items-start gap-3 pl-2">
                      <span className={cn('mt-0.5 font-mono text-[11px]', i === activeStep ? 'text-brand-200' : 'text-white/30')}>0{i + 1}</span>
                      <div className="min-w-0">
                        <p className={cn('font-medium', i === activeStep ? 'text-white' : 'text-white/60')}>{s.title}</p>
                        <motion.p
                          initial={false}
                          animate={{ height: i === activeStep ? 'auto' : 0, opacity: i === activeStep ? 1 : 0 }}
                          transition={{ duration: 0.35 }}
                          className="overflow-hidden text-sm leading-relaxed text-white/55"
                        >
                          <span className="block pt-1.5">{s.body}</span>
                        </motion.p>
                      </div>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>

            {!compact && (
              <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {module.features.map((f) => (
                  <span key={f} className="flex items-center gap-2 text-sm text-white/60">
                    <Check className="size-3.5 flex-shrink-0 text-emerald-400" /> {f}
                  </span>
                ))}
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-7">
            <Reveal y={40}>
              <LiveScreen scenes={scenes} index={index} onIndexChange={setIndex} />
            </Reveal>
            {stats && (
              <Reveal delay={0.15} className="mt-6 grid grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                    <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{s.value}</p>
                    <p className="mt-1 text-xs leading-snug text-white/50">{s.label}</p>
                  </div>
                ))}
              </Reveal>
            )}
            <Reveal delay={0.2} className="mt-5">
              <Link to="/#contact" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-200 transition-colors hover:text-white">
                See {module.name} on your own app <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
