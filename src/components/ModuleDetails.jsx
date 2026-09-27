import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { FEATURE_ICONS } from '../data/featureIcons';
import { cn } from '../lib/cn';
import { Reveal } from './primitives';

export function SectionTitle({ eyebrow, title }) {
  return (
    <Reveal className="mb-8 flex flex-col gap-3">
      {eyebrow && <span className="eyebrow self-start">{eyebrow}</span>}
      <h2 className="h-display text-3xl sm:text-4xl">{title}</h2>
    </Reveal>
  );
}

function Features({ items }) {
  return (
    <section className="py-14 sm:py-20">
      <div className="container-x">
        <SectionTitle eyebrow="Features" title="Powerful Features" />
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((f, i) => {
            const Icon = FEATURE_ICONS[f.icon] || Sparkles;
            return (
              <Reveal key={f.title} delay={(i % 2) * 0.06} className="card-surface flex gap-5 p-6 sm:p-7">
                <span className="grid size-12 flex-shrink-0 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-brand-500/35 to-transparent">
                  <Icon className="size-5 text-brand-100" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/60">{f.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ListPanel({ title, items, accent }) {
  return (
    <Reveal className="card-surface overflow-hidden">
      <div className={cn('bg-gradient-to-r px-6 py-4', accent)}>
        <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
      </div>
      <ul className="flex flex-col gap-4 p-6">
        {items.map((it) => (
          <li key={it.title + it.description} className="flex items-start gap-3">
            <span className="mt-0.5 grid size-5 flex-shrink-0 place-items-center rounded-full bg-emerald-400/15">
              <Check className="size-3 text-emerald-300" />
            </span>
            <div className="min-w-0">
              {it.title && <p className="font-medium text-white">{it.title}</p>}
              <p className={cn('text-[15px] leading-relaxed', it.title ? 'mt-1 text-white/55' : 'text-white/75')}>{it.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function CoreAndCapabilities({ core, capabilities }) {
  if (!core?.length && !capabilities?.length) return null;
  const both = core?.length && capabilities?.length;
  return (
    <section className="py-14 sm:py-20">
      <div className={cn('container-x grid gap-4', both && 'lg:grid-cols-2')}>
        {core?.length > 0 && <ListPanel title="Core Features" items={core} accent="from-brand-600/80 to-iris/60" />}
        {capabilities?.length > 0 && <ListPanel title="Key Capabilities" items={capabilities} accent="from-iris/70 to-magenta/50" />}
      </div>
    </section>
  );
}

function PerfectFor({ items }) {
  return (
    <section className="py-14 sm:py-20">
      <div className="container-x">
        <SectionTitle eyebrow="Use cases" title="Perfect For" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((u, i) => (
            <Reveal key={u} delay={i * 0.06} className="card-surface p-6">
              <span className="font-display text-3xl font-semibold text-gradient">0{i + 1}</span>
              <p className="mt-4 text-[15px] leading-relaxed text-white/80">{u}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyTeams({ name, items }) {
  return (
    <section className="py-14 sm:py-20">
      <div className="container-x">
        <SectionTitle eyebrow="Benefits" title={`Why Teams Choose ${name}`} />
        <div className="grid gap-x-10 gap-y-5 md:grid-cols-2">
          {items.map((b, i) => (
            <Reveal key={b} delay={(i % 2) * 0.06} className="flex items-start gap-3">
              <span className="mt-1 grid size-6 flex-shrink-0 place-items-center rounded-full bg-brand-500/25">
                <Check className="size-3.5 text-brand-100" />
              </span>
              <p className="text-[15px] leading-relaxed text-white/75 sm:text-base">{b}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq({ items, eyebrow = 'FAQ', title = 'Frequently Asked Questions' }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-14 sm:py-20">
      <div className="container-x max-w-4xl">
        {title && <SectionTitle eyebrow={eyebrow} title={title} />}
        <div className="flex flex-col gap-3">
          {items.map((q, i) => (
            <div key={q.question} className="card-surface overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-medium text-white">{q.question}</span>
                <ChevronDown className={cn('size-5 flex-shrink-0 text-white/50 transition-transform', open === i && 'rotate-180')} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="flex flex-col gap-3 px-5 pb-5">
                      {q.answer.split(/\n\n+/).map((para) => (
                        <p key={para.slice(0, 30)} className="text-[15px] leading-relaxed text-white/60">
                          {para}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ModuleDetails({ name, content }) {
  if (!content) return null;
  return (
    <>
      {content.features?.length > 0 && <Features items={content.features} />}
      <CoreAndCapabilities core={content.coreFeatures} capabilities={content.keyCapabilities} />
      {content.useCases?.length > 0 && <PerfectFor items={content.useCases} />}
      {content.benefits?.length > 0 && <WhyTeams name={name} items={content.benefits} />}
      {content.faq?.length > 0 && <Faq items={content.faq} />}
    </>
  );
}
