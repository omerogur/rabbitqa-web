import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar, Clock, Compass, LifeBuoy, Plug, Rocket, Settings, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Contact from '../components/Contact';
import Markdown from '../components/Markdown';
import { Faq } from '../components/ModuleDetails';
import PageHero from '../components/PageHero';
import Proof from '../components/Proof';
import { Reveal } from '../components/primitives';
import data from '../data/resourcesContent.json';
import { cn } from '../lib/cn';

const ICONS = { Rocket, Compass, Plug, ShieldCheck, Settings, LifeBuoy };
const posts = data.posts;
const isComparison = (p) => p.id.startsWith('rabbitqa-vs-');
const articles = posts.filter((p) => !isComparison(p));
const faqItems = (items) => items.map((i) => ({ question: i.question || i.q, answer: i.answer || i.a }));

function PostCard({ p, readMore = data.blog.readMoreLabel }) {
  return (
    <Link to={`/blog/${p.id}`} className="card-surface group flex h-full flex-col overflow-hidden hover:border-white/20">
      <div className="aspect-video overflow-hidden">
        <img src={p.thumb} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="self-start rounded-full bg-brand-500/20 px-2.5 py-1 text-xs font-medium text-brand-100">{p.category}</span>
        <h3 className="font-display mt-4 text-lg leading-snug font-semibold text-white">{p.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/60">{p.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-6 text-xs text-white/45">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" /> {p.readTime}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-200 group-hover:text-white">
            {readMore} <ArrowRight className="size-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* The hero's rotating "ask the docs" card, like the corporate site. */
function HeroDemo() {
  const items = data.resources.heroDemo;
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 5000);
    return () => clearInterval(id);
  }, [items.length]);
  const d = items[i];
  const DIcon = ICONS[d.icon] || BookOpen;
  return (
    <div className="glass rounded-3xl p-6">
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
          <p className="text-sm font-medium text-white">{d.question}</p>
          <div className="mt-4 flex flex-col gap-2.5">
            {d.answers.map((a, n) => (
              <motion.div
                key={a}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + n * 0.35 }}
                className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-ink-950/60 px-3 py-2.5 text-sm text-white/75"
              >
                <span className="mt-0.5 grid size-5 flex-shrink-0 place-items-center rounded-full bg-brand-500 text-[11px] font-semibold text-white">{n + 1}</span>
                {a}
              </motion.div>
            ))}
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs text-white/45">
            <DIcon className="size-3.5" /> {d.source}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function ResourcesPage() {
  const r = data.resources;
  return (
    <>
      <PageHero eyebrow="Resources" title={r.hero.title} subtitle={r.hero.subtitle}>
        <div className="mt-10 max-w-xl">
          <HeroDemo />
        </div>
      </PageHero>

      <section className="py-16 sm:py-24">
        <div className="container-x">
          <Reveal className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="eyebrow">{r.blog.eyebrow}</span>
              <h2 className="h-display mt-5 text-3xl sm:text-5xl">{r.blog.title}</h2>
              <p className="mt-3 text-white/60">{r.blog.subtitle}</p>
            </div>
            <Link to="/blog" className="btn-ghost">
              {r.blog.viewAllLabel} <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {r.blog.posts.map((bp, i) => {
              const p = posts.find((x) => x.id === bp.slug);
              return p ? (
                <Reveal key={p.id} delay={i * 0.06}>
                  <PostCard p={p} readMore={r.blog.readMoreLabel} />
                </Reveal>
              ) : null;
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-x">
          <Reveal className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7 sm:p-12">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="h-display text-3xl sm:text-4xl">{r.docs.title}</h2>
                <p className="mt-2 text-white/60">{r.docs.subtitle}</p>
              </div>
              <a href={r.docs.href} target="_blank" rel="noreferrer" className="btn-primary">
                docs.rabbitqa.com <ArrowRight className="size-4" />
              </a>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {r.docs.links.map((l) => {
                const LIcon = ICONS[l.icon] || BookOpen;
                return (
                  <a key={l.title} href={r.docs.href} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-ink-950/50 p-5 hover:border-white/20">
                    <span className="grid size-10 place-items-center rounded-xl bg-brand-500/20">
                      <LIcon className="size-5 text-brand-100" />
                    </span>
                    <span className="flex-1 font-medium text-white">{l.title}</span>
                    <ArrowRight className="size-4 text-white/40 group-hover:text-white" />
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <Faq items={faqItems(r.faq.items)} eyebrow={r.faq.eyebrow} title={r.faq.title} />
      <Proof />
      <Contact />
    </>
  );
}

export function BlogPage() {
  const b = data.blog;
  const { slug } = useParams();
  const initial = b.categories.find((c) => c.toLowerCase().replace(/\W+/g, '-') === slug) || 'All';
  const [cat, setCat] = useState(initial);
  const list = posts.filter((p) => cat === 'All' || p.category === cat);
  const featured = list.find((p) => p.featured) || list[0];
  const rest = list.filter((p) => p !== featured);

  return (
    <>
      <PageHero eyebrow="Blog" title={b.hero.title} subtitle={b.hero.subtitle} />
      <section className="pb-16">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap gap-2">
            {b.categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={cn('rounded-full border px-4 py-2 text-sm transition-colors', cat === c ? 'border-brand-500 bg-brand-500 text-white' : 'border-white/10 text-white/65 hover:text-white')}
              >
                {c}
              </button>
            ))}
          </div>

          {!featured && <p className="text-white/55">{b.emptyLabel}</p>}
          {featured && (
            <Reveal>
              <Link to={`/blog/${featured.id}`} className="card-surface group grid overflow-hidden hover:border-white/20 lg:grid-cols-2">
                <img src={featured.banner || featured.thumb} alt="" className="min-h-[240px] w-full object-cover" />
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-ink-950">{b.featuredLabel}</span>
                    <span className="rounded-full bg-brand-500/20 px-2.5 py-1 text-xs text-brand-100">{featured.category}</span>
                  </div>
                  <h2 className="h-display mt-5 text-2xl sm:text-3xl">{featured.title}</h2>
                  <p className="mt-4 text-white/60">{featured.excerpt}</p>
                  <div className="mt-6 flex items-center gap-4 text-sm text-white/45">
                    <span className="flex items-center gap-1.5"><Calendar className="size-4" /> {featured.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="size-4" /> {featured.readTime}</span>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-200 group-hover:text-white">
                    {b.readArticleLabel} <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}
          {rest.length > 0 && (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 0.06}>
                  <PostCard p={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
      <Newsletter />
    </>
  );
}

function Newsletter() {
  const n = data.blog.newsletter;
  const [sent, setSent] = useState(false);
  return (
    <section className="py-16">
      <Reveal className="container-x">
        <div className="card-surface mx-auto max-w-3xl p-8 text-center sm:p-12">
          <h2 className="h-display text-3xl">{sent ? n.successTitle : n.title}</h2>
          <p className="mt-3 text-white/60">{sent ? n.successMessage : n.subtitle}</p>
          {!sent && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="mx-auto mt-8 flex max-w-lg flex-col gap-3"
            >
              <div className="flex flex-col gap-2 rounded-2xl border border-white/15 bg-ink-950/60 p-2 sm:flex-row">
                <input required type="email" placeholder={n.placeholder} aria-label={n.placeholder} className="h-12 min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/35 focus:outline-none" />
                <button type="submit" className="btn-primary !h-12 !rounded-xl">{n.submitLabel}</button>
              </div>
              <label className="flex items-start gap-2 text-left text-xs text-white/50">
                <input required type="checkbox" className="mt-0.5 accent-brand-500" /> {n.consentText}
              </label>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}

export function BlogPostPage() {
  const { slug } = useParams();
  const p = posts.find((x) => x.id === slug || x.urlSlug === slug);
  if (!p) return <Navigate to="/blog" replace />;
  const more = posts.filter((x) => x.id !== p.id && isComparison(x) === isComparison(p)).slice(0, 3);
  const cta = data.blog.postCta;

  return (
    <div key={p.id}>
      <PageHero eyebrow={p.category} title={p.title} subtitle={p.excerpt} back={{ to: isComparison(p) ? '/compare' : '/blog', label: isComparison(p) ? 'All comparisons' : 'Back to Blog' }}>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/50">
          <span>{p.author}</span>
          <span className="flex items-center gap-1.5"><Calendar className="size-4" /> {p.date}</span>
          <span className="flex items-center gap-1.5"><Clock className="size-4" /> {p.readTime}</span>
        </div>
      </PageHero>
      <section className="pb-16">
        <article className="container-x max-w-3xl">
          <img src={p.banner || p.thumb} alt="" className="mb-12 aspect-[2/1] w-full rounded-3xl object-cover" />
          <Markdown>{p.content}</Markdown>
          <div className="card-surface mt-14 flex flex-col items-start justify-between gap-4 p-7 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-display text-xl font-semibold text-white">{cta.title}</h3>
              <p className="mt-1 text-white/60">{cta.subtitle}</p>
            </div>
            <Link to="/contact" className="btn-primary">
              {cta.buttonLabel} <ArrowRight className="size-4" />
            </Link>
          </div>
        </article>
      </section>
      {more.length > 0 && (
        <section className="pb-20">
          <div className="container-x">
            <h2 className="h-display mb-8 text-2xl sm:text-3xl">{data.blog.detail.continueReading}</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {more.map((x) => (
                <PostCard key={x.id} p={x} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export function FaqPage() {
  const f = data.faq;
  return (
    <>
      <PageHero eyebrow={f.badge} title={f.title} subtitle={f.subtitle} center />
      <div className="-mt-10">
        <Faq items={faqItems(f.items)} eyebrow="" title="" />
      </div>
      <section className="pb-20">
        <Reveal className="container-x">
          <div className="card-surface mx-auto max-w-4xl p-8 text-center sm:p-10">
            <h2 className="h-display text-3xl">{f.ctaTitle}</h2>
            <p className="mt-3 text-white/60">{f.ctaSubtitle}</p>
            <Link to={f.ctaHref?.startsWith('/') ? f.ctaHref : '/contact'} className="btn-primary mt-7">
              {f.ctaButtonLabel} <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export function ComparePage() {
  const c = data.compare;
  const list = posts.filter(isComparison);
  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
      <section className="pb-16">
        <div className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.06}>
              <Link to={`/blog/${p.id}`} className="card-surface group flex h-full flex-col overflow-hidden hover:border-white/20">
                <img src={p.thumb} alt="" loading="lazy" className="aspect-video w-full object-cover" />
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-xl font-semibold text-white">{p.title.split(':')[0]}</h2>
                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-white/60">{p.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-brand-200 group-hover:text-white">
                    {c.cardCta} <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="pb-20">
        <Reveal className="container-x">
          <div className="card-surface mx-auto max-w-4xl p-8 text-center sm:p-10">
            <h2 className="h-display text-3xl">{c.closingTitle}</h2>
            <p className="mt-3 text-white/60">{c.closingBody}</p>
            <Link to="/contact" className="btn-primary mt-7">
              {c.closingCta} <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

