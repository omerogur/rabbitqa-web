import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FinalCta } from '../components/Closing';
import { Faq, SectionTitle } from '../components/ModuleDetails';
import PageHero from '../components/PageHero';
import Proof from '../components/Proof';
import { Reveal } from '../components/primitives';
import pages from '../data/landingPages.json';

const img = (id) => `/landing/industries/${id}.jpg`;
const firstSentence = (t) => t.split(/(?<=\.)\s/)[0];

export function IndustriesPage() {
  const h = pages.industriesHero;
  return (
    <>
      <PageHero eyebrow={h.promise || 'Industries'} title={h.titleA} accent={h.titleB} subtitle={h.subtitle} />
      <section className="pb-20">
        <div className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pages.solutions.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.06}>
              <Link to={`/industry-solutions/${s.id}`} className="card-surface group flex h-full flex-col overflow-hidden transition-colors hover:border-white/20">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={img(s.id)} alt={s.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 to-transparent" />
                  <h2 className="font-display absolute bottom-4 left-5 text-2xl font-semibold text-white">{s.name}</h2>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="line-clamp-3 text-[15px] leading-relaxed text-white/60">{s.tagline}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-brand-200 group-hover:text-white">
                    Explore {s.name} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <Proof />
      <FinalCta />
    </>
  );
}

export function IndustryDetailPage() {
  const { slug } = useParams();
  const idx = pages.solutions.findIndex((x) => x.id === slug);
  if (idx < 0) return <Navigate to="/industry-solutions" replace />;
  const s = pages.solutions[idx];
  const prev = pages.solutions[(idx - 1 + pages.solutions.length) % pages.solutions.length];
  const next = pages.solutions[(idx + 1) % pages.solutions.length];

  return (
    <div key={s.id}>
      <PageHero
        eyebrow={`Industry Solution · ${s.name}`}
        title={firstSentence(s.tagline)}
        subtitle={s.tagline.slice(firstSentence(s.tagline).length).trim()}
        back={{ to: '/industry-solutions', label: 'All industries' }}
        image={img(s.id)}
      />

      <section className="py-14 sm:py-20">
        <div className="container-x">
          <SectionTitle eyebrow="Key Features" title={`The testing capabilities that matter most for ${s.name}`} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {s.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.05} className="card-surface p-6">
                <span className="text-xs font-semibold tabular-nums text-brand-200">0{i + 1}</span>
                <h3 className="font-display mt-3 text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/60">{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionTitle eyebrow="Common Use Cases" title={`Where teams put RabbitQA to work in ${s.name}`} />
            <div className="flex flex-col gap-4">
              {s.useCases.map((u, i) => (
                <Reveal key={u.title} delay={i * 0.06} className="card-surface flex gap-5 p-6">
                  <span className="font-display text-3xl font-semibold text-gradient">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{u.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/60">{u.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <SectionTitle eyebrow="Key Benefits" title="Measurable outcomes" />
            <div className="flex flex-col gap-3">
              {s.benefits.map((b) => (
                <Reveal key={b} className="flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <span className="mt-0.5 grid size-6 flex-shrink-0 place-items-center rounded-full bg-emerald-400/15">
                    <Check className="size-3.5 text-emerald-300" />
                  </span>
                  <p className="text-[15px] leading-relaxed text-white/75">{b}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {s.faqs?.length > 0 && <Faq items={s.faqs} />}

      <section className="pb-6">
        <div className="container-x grid gap-4 sm:grid-cols-2">
          <Link to={`/industry-solutions/${prev.id}`} className="card-surface group flex items-center gap-4 p-5 hover:border-white/20">
            <ArrowLeft className="size-5 text-white/50 group-hover:text-white" />
            <div>
              <p className="text-xs text-white/40">Previous industry</p>
              <p className="font-medium text-white">{prev.name}</p>
            </div>
          </Link>
          <Link to={`/industry-solutions/${next.id}`} className="card-surface group flex items-center justify-end gap-4 p-5 text-right hover:border-white/20">
            <div>
              <p className="text-xs text-white/40">Next industry</p>
              <p className="font-medium text-white">{next.name}</p>
            </div>
            <ArrowRight className="size-5 text-white/50 group-hover:text-white" />
          </Link>
        </div>
      </section>

      <Proof />
      <FinalCta />
    </div>
  );
}
