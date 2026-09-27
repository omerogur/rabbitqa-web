import { BrainCircuit, ClipboardCheck, FileSearch, HeartPulse, Import, Layers, MonitorSmartphone, ScanEye, Sparkles } from 'lucide-react';
import { FinalCta } from '../components/Closing';
import PageHero from '../components/PageHero';
import Proof from '../components/Proof';
import { Reveal } from '../components/primitives';
import pages from '../data/landingPages.json';

const ICONS = {
  'requirement-governance': ClipboardCheck,
  'ai-powered-test-generation': Sparkles,
  'orchestrated-execution': Layers,
  'cross-platform-coverage': MonitorSmartphone,
  'accessibility-testing': ScanEye,
  'production-health-monitoring': HeartPulse,
  'Bring-your-own-model': BrainCircuit,
  'migration-and-import': Import,
  'evidence-and-audit': FileSearch,
};

export default function CapabilitiesPage() {
  const { hero, items } = pages.capabilities;
  return (
    <>
      <PageHero eyebrow="Platform Capabilities" title={hero.title} subtitle={hero.subtitle} />

      <section className="pb-12">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <nav className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28 flex flex-col gap-1">
              {items.map((c, i) => (
                <a key={c.id} href={`#${c.id}`} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/55 transition-colors hover:bg-white/[0.04] hover:text-white">
                  <span className="text-xs tabular-nums text-white/30">0{i + 1}</span>
                  <span className="truncate">{c.title}</span>
                </a>
              ))}
            </div>
          </nav>

          <div className="flex flex-col gap-5 lg:col-span-9">
            {items.map((c, i) => {
              const Icon = ICONS[c.id] || Sparkles;
              return (
                <Reveal key={c.id} className="card-surface scroll-mt-28 p-6 sm:p-9" as="article">
                  <div id={c.id} className="scroll-mt-28" />
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-brand-500/35 to-transparent">
                      <Icon className="size-5 text-brand-100" />
                    </span>
                    <span className="text-xs font-semibold tabular-nums text-white/35">0{i + 1}</span>
                  </div>
                  <h2 className="h-display mt-5 text-2xl sm:text-3xl">{c.title}</h2>
                  <p className="mt-3 text-lg leading-relaxed text-white/80">{c.body}</p>
                  <div className="mt-5 flex flex-col gap-4 border-t border-white/[0.07] pt-5">
                    {c.points.map((p) => (
                      <p key={p.slice(0, 40)} className="text-[15px] leading-relaxed text-white/60">
                        {p}
                      </p>
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Proof />
      <FinalCta />
    </>
  );
}
