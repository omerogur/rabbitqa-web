import { ArrowRight, ArrowUpRight, Check, TriangleAlert } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FinalCta } from '../components/Closing';
import LiveScreen from '../components/LiveScreen';
import { SectionTitle } from '../components/ModuleDetails';
import PageHero from '../components/PageHero';
import Proof from '../components/Proof';
import { Reveal } from '../components/primitives';
import pages from '../data/landingPages.json';
import { AGENTS, moduleById } from '../data/modules';
import { cn } from '../lib/cn';

const toModuleId = (name) => name.toLowerCase().replace(/\s+/g, '');
const agentStyle = (a) => AGENTS.find((x) => `${x.id}-agent` === a.id) || AGENTS[0];

export function AgentsPage() {
  const { agentsHero } = pages;
  return (
    <>
      <PageHero eyebrow="Agents" title={agentsHero.titleA} subtitle={agentsHero.subtitle} />
      <section className="pb-20">
        <div className="container-x grid gap-5 lg:grid-cols-3">
          {pages.agents.map((a, i) => {
            const st = agentStyle(a);
            return (
              <Reveal key={a.id} delay={i * 0.08}>
                <Link to={`/agents/${a.urlSlug}`} className="card-surface group flex h-full flex-col p-7 transition-colors hover:border-white/20">
                  <div className="flex items-center gap-3">
                    <span className={cn('grid size-10 place-items-center rounded-full bg-gradient-to-br text-sm font-semibold text-white', st.accent)}>{i + 1}</span>
                    <span className="text-[11px] font-semibold tracking-[0.08em] text-white/40 uppercase">{st.stage}</span>
                  </div>
                  <h2 className="font-display mt-6 text-2xl font-semibold tracking-tight text-white">{a.name}</h2>
                  <p className="mt-2 text-gradient font-medium">{a.tagline}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/60">{a.problem}</p>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {a.modules.map((m) => {
                      const mod = moduleById[toModuleId(m.name)];
                      return (
                        <span key={m.name} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-white/75">
                          {mod && <mod.icon className="size-3.5" />} {m.name}
                        </span>
                      );
                    })}
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium text-brand-200 group-hover:text-white">
                    Discover {a.name} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
      <Proof />
      <FinalCta />
    </>
  );
}

export function AgentDetailPage() {
  const { slug } = useParams();
  const a = pages.agents.find((x) => x.urlSlug === slug);
  if (!a) return <Navigate to="/agents" replace />;
  const st = agentStyle(a);
  const tour = a.modules.map((m) => moduleById[toModuleId(m.name)]).find((m) => m?.scenes);

  return (
    <div key={a.id}>
      <PageHero eyebrow={`${st.stage} · ${a.name}`} title={a.tagline} subtitle={a.problem} back={{ to: '/agents', label: 'All agents' }} />

      <section className="py-14 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">The Problem</span>
            <h2 className="h-display mt-5 text-3xl sm:text-4xl">{a.problemHeading}</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/60">{a.problemIntro}</p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {a.warnings.map((w, i) => (
              <Reveal key={w} delay={(i % 2) * 0.05} className="flex items-start gap-3 rounded-2xl border border-rose-400/15 bg-rose-500/[0.05] p-5">
                <TriangleAlert className="mt-0.5 size-4 flex-shrink-0 text-rose-300" />
                <p className="text-[15px] leading-snug text-white/80">{w}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-x">
          <SectionTitle eyebrow="How It Works" title="The Three Modules" />
          {tour && (
            <Reveal className="mb-8">
              <LiveScreen scenes={tour.scenes} />
            </Reveal>
          )}
          <div className="grid gap-5 lg:grid-cols-3">
            {a.modules.map((m, i) => {
              const mod = moduleById[toModuleId(m.name)];
              return (
                <Reveal key={m.name} delay={i * 0.08} className="card-surface flex flex-col p-7">
                  <div className="flex items-center gap-3">
                    {mod && (
                      <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-ink-900">
                        <mod.icon className="size-5 text-white" />
                      </span>
                    )}
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white">{m.name}</h3>
                      <p className="text-sm text-brand-200">{m.sub}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-[15px] leading-relaxed text-white/65">{m.desc}</p>
                  <p className="mt-6 text-[11px] font-semibold tracking-[0.08em] text-white/40 uppercase">Core features</p>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {m.coreFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm leading-snug text-white/70">
                        <Check className="mt-0.5 size-3.5 flex-shrink-0 text-emerald-300" /> {f}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-[11px] font-semibold tracking-[0.08em] text-white/40 uppercase">Key capabilities</p>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {m.keyCapabilities.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm leading-snug text-white/70">
                        <Check className="mt-0.5 size-3.5 flex-shrink-0 text-brand-200" /> {f}
                      </li>
                    ))}
                  </ul>
                  {mod && (
                    <Link to={`/modules/${mod.id}`} className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-medium text-brand-200 hover:text-white">
                      Explore {m.name} <ArrowUpRight className="size-4" />
                    </Link>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-x">
          <SectionTitle eyebrow="Capabilities" title="Key Features" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {a.capabilities.map((c, i) => (
              <Reveal key={c.cap} delay={(i % 3) * 0.05} className="card-surface p-6">
                <h3 className="font-display text-lg font-semibold text-white">{c.cap}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/60">{c.delivers}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-x">
          <SectionTitle eyebrow="Measurable outcomes" title="Business Impact" />
          <div className="grid overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] sm:grid-cols-3">
            {a.impact.map((x, i) => (
              <Reveal key={x.label} delay={i * 0.08} className={cn('p-8', i > 0 && 'border-t border-white/[0.07] sm:border-t-0 sm:border-l')}>
                <p className="h-display text-5xl text-gradient">{x.value}</p>
                <p className="mt-3 text-white/60">{x.label}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <h3 className="font-display text-2xl font-semibold text-white">What This Means for Your Business</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {a.meaning.map((m) => (
                  <li key={m} className="flex items-start gap-3 text-white/75">
                    <Check className="mt-1 size-4 flex-shrink-0 text-emerald-300" /> {m}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="font-display text-2xl font-semibold text-white">Built For</h3>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {a.builtFor.map((b) => (
                  <span key={b} className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-sm leading-snug text-white/75">
                    {b}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <Reveal className="container-x">
          <div className="card-surface p-8 text-center sm:p-12">
            <span className="eyebrow">One governed lifecycle</span>
            <h2 className="h-display mx-auto mt-5 max-w-3xl text-3xl sm:text-4xl">{a.lifecycleHeading}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">{a.lifecycleIntro}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {pages.agents.map((x) => (
                <Link
                  key={x.id}
                  to={`/agents/${x.urlSlug}`}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm transition-colors',
                    x.id === a.id ? 'border-white/25 bg-white/10 text-white' : 'border-white/10 text-white/60 hover:text-white',
                  )}
                >
                  {x.name}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <FinalCta title={a.closing?.heading} body={a.closing?.body} />
    </div>
  );
}
