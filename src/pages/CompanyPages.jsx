import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  Calendar,
  ClipboardCheck,
  Database,
  Download,
  ExternalLink,
  FolderOpen,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  HelpCircle,
  Image as ImageIcon,
  Landmark,
  Layers,
  LayoutGrid,
  LifeBuoy,
  Lightbulb,
  Mail,
  Monitor,
  Rocket,
  Scale,
  Share2,
  ShieldCheck,
  Store,
  Trophy,
  TrendingUp,
  UserCheck,
  Users,
  Wrench,
} from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Contact, { LeadForm } from '../components/Contact';
import PageHero from '../components/PageHero';
import Proof from '../components/Proof';
import { Reveal } from '../components/primitives';
import pages from '../data/companyPages.json';
import { cn } from '../lib/cn';

const ICONS = {
  Lightbulb, HeartHandshake, ShieldCheck, Award, UserCheck, Rocket, TrendingUp, HandCoins, Share2, Store, Wrench, Layers,
  ClipboardCheck, Users, GraduationCap, LayoutGrid, Scale, Landmark, Database, ImageIcon, BookOpen, Monitor, Mail,
};
const Icon = ({ name, className, fallback = Award }) => {
  const C = ICONS[name] || fallback;
  return <C className={className} />;
};

function Intro({ eyebrow, title, subtitle, center = true }) {
  if (!eyebrow && !title && !subtitle) return null;
  return (
    <Reveal className={cn('mb-10 max-w-3xl', center && 'mx-auto text-center')}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && <h2 className="h-display mt-5 text-3xl sm:text-5xl">{title}</h2>}
      {subtitle && <p className="mt-5 text-lg leading-relaxed text-white/60">{subtitle}</p>}
    </Reveal>
  );
}

function Paragraphs({ items, className }) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {items.map((p) => (
        <p key={p.slice(0, 40)} className="text-[15px] leading-relaxed text-white/65 sm:text-base">
          {p}
        </p>
      ))}
    </div>
  );
}

function MediaRow({ image, reverse, children, imageClass }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <Reveal className={cn(reverse && 'lg:order-2')}>
        <img src={image} alt="" loading="lazy" className={cn('h-[300px] w-full rounded-3xl object-cover sm:h-[390px]', imageClass)} />
      </Reveal>
      <Reveal delay={0.08}>{children}</Reveal>
    </div>
  );
}

const Section = ({ children, className }) => (
  <section className={cn('py-16 sm:py-24', className)}>
    <div className="container-x">{children}</div>
  </section>
);

/* ---------------------------------- About ---------------------------------- */

export function AboutPage() {
  const a = pages.about;
  return (
    <>
      <PageHero eyebrow="Company" title={a.hero.title} subtitle={a.hero.subtitle} center />

      <Section>
        <Intro title={a.vision.title} />
        <Paragraphs items={a.vision.paragraphs} className="mx-auto max-w-3xl text-center" />
      </Section>

      <Section>
        <Intro title={a.mission.title} subtitle={a.mission.subtitle} />
        <MediaRow image={a.mission.image}>
          <Paragraphs items={a.mission.paragraphs} />
        </MediaRow>
      </Section>

      <Section>
        <Intro eyebrow={a.howWeBuild.eyebrow} title={a.howWeBuild.title} />
        <Paragraphs items={a.howWeBuild.paragraphs} className="mx-auto max-w-3xl text-center" />
      </Section>

      <Section>
        <Intro title={a.values.title} subtitle={a.values.subtitle} />
        <div className="flex flex-wrap justify-center gap-4">
          {a.values.items.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 0.06} className="card-surface w-full p-7 md:w-[calc(33.333%-11px)]">
              <span className="grid size-12 place-items-center rounded-full bg-brand-500">
                <Icon name={v.icon} fallback={Lightbulb} className="size-5 text-white" />
              </span>
              <h3 className="font-display mt-5 text-xl font-semibold text-white">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/60">{v.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <img src={a.values.image} alt={a.values.title} loading="lazy" className="h-[240px] w-full rounded-3xl object-cover sm:h-[360px]" />
        </Reveal>
      </Section>

      <Section>
        <Intro title={a.leadership.title} subtitle={a.leadership.subtitle} />
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-6">
          {a.leadership.leaders.map((l, i) => (
            <Reveal key={l.name} delay={(i % 3) * 0.06} className={cn('card-surface overflow-hidden lg:col-span-2', i === 0 && 'lg:col-start-2')}>
              <img src={l.image} alt={l.name} loading="lazy" className="h-[300px] w-full object-cover object-top sm:h-[420px]" />
              <div className="flex items-center justify-between gap-3 p-5">
                <div className="min-w-0">
                  <p className="font-display truncate text-lg font-semibold text-white">{l.name}</p>
                  <p className="truncate text-sm text-white/55">{l.role}</p>
                </div>
                <a
                  href={l.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${l.name} on LinkedIn`}
                  className="grid size-9 flex-shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-ink-950"
                >
                  in
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="bg-brand-500 py-16 sm:py-20">
        <div className="container-x">
          <h2 className="h-display text-center text-3xl sm:text-4xl">{a.numbers.title}</h2>
          <div className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {a.numbers.items.map((n) => (
              <div key={n.label} className="text-center">
                <p className="h-display text-5xl sm:text-6xl">{n.value}</p>
                <p className="mt-2 text-white/80">{n.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <MediaRow image={a.partner.image} reverse imageClass="object-[22%_center]">
          <h2 className="h-display text-3xl sm:text-4xl">{a.partner.title}</h2>
          <Paragraphs items={a.partner.paragraphs} className="mt-5" />
          <Link to={a.partner.ctaHref} className="btn-primary mt-7">
            {a.partner.ctaLabel} <ArrowRight className="size-4" />
          </Link>
        </MediaRow>
      </Section>

      <Section>
        <Intro eyebrow={a.virgosol.eyebrow} title={a.virgosol.title} subtitle={a.virgosol.subtitle} />
        <MediaRow image={a.virgosol.image}>
          <Paragraphs items={a.virgosol.paragraphs} />
          <a href={a.virgosol.ctaHref} target="_blank" rel="noreferrer" className="btn-ghost mt-7">
            {a.virgosol.ctaLabel} <ExternalLink className="size-4" />
          </a>
        </MediaRow>
      </Section>

      <Section>
        <Intro title={a.awards.title} />
        <div className="flex flex-wrap justify-center gap-4">
          {a.awards.items.map((w, i) => (
            <Reveal key={w.text} delay={i * 0.06} className="flex w-full flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center md:w-[calc(33.333%-11px)]">
              {w.logo ? <img src={w.logo} alt="" className="max-h-14 w-auto" /> : <Trophy className="size-10 text-brand-500" />}
              <p className="font-display text-lg font-semibold text-slate-800">{w.text.trim()}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Proof />

      <Section>
        <Reveal className="card-surface mx-auto flex max-w-3xl flex-col items-start gap-5 p-7 sm:flex-row sm:items-center">
          <span className="grid size-14 flex-shrink-0 place-items-center rounded-2xl bg-brand-500/20">
            <FolderOpen className="size-6 text-brand-100" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-xl font-semibold text-white">{a.brandKit.title}</h3>
            <p className="mt-1 text-sm text-white/55">{a.brandKit.subtitle}</p>
          </div>
          <a href="/logo.svg" download className="btn-primary">
            <Download className="size-4" /> {a.brandKit.downloadLabel}
          </a>
        </Reveal>
      </Section>

      <Contact />
    </>
  );
}

/* ---------------------------------- News ----------------------------------- */

const CATEGORY_TONE = {
  award: 'bg-brand-500/20 text-brand-100',
  'press-release': 'bg-emerald-400/15 text-emerald-300',
  announcement: 'bg-amber-400/15 text-amber-300',
};

function CategoryBadge({ id }) {
  const label = pages.news.categories.find((c) => c.id === id)?.label || id;
  return <span className={cn('rounded-full px-2.5 py-1 text-xs font-medium', CATEGORY_TONE[id])}>{label}</span>;
}

export function NewsPage() {
  const n = pages.news;
  const [filter, setFilter] = useState('all');
  const items = n.items.filter((it) => filter === 'all' || it.category === filter);
  const featured = items.find((it) => it.featured) || items[0];
  const rest = items.filter((it) => it !== featured);

  return (
    <>
      <PageHero eyebrow="Company" title={n.title} subtitle={n.subtitle} />
      <Section className="pt-4">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {[{ id: 'all', label: n.filterAllLabel }, ...n.categories].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm transition-colors',
                filter === c.id ? 'border-brand-500 bg-brand-500 text-white' : 'border-white/10 text-white/65 hover:text-white',
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        {!featured && <p className="text-center text-white/55">{n.emptyStateMessage}</p>}

        {featured && (
          <Reveal>
            <Link to={`/news/${featured.id}`} className="card-surface group grid overflow-hidden hover:border-white/20 lg:grid-cols-2">
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-ink-950">{n.featuredLabel}</span>
                  <CategoryBadge id={featured.category} />
                </div>
                <h2 className="h-display mt-5 text-3xl sm:text-4xl">{featured.title}</h2>
                <p className="mt-4 leading-relaxed text-white/60">{featured.excerpt}</p>
                <div className="mt-6 flex items-center justify-between gap-4 text-sm">
                  <span className="flex items-center gap-2 text-white/50">
                    <Calendar className="size-4" /> {featured.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-brand-200 group-hover:text-white">
                    {featured.linkLabel || n.readMoreLabel} <ArrowRight className="size-4" />
                  </span>
                </div>
              </div>
              <img src={featured.image} alt="" className="min-h-[220px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </Link>
          </Reveal>
        )}

        {rest.length > 0 && (
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((it, i) => (
              <Reveal key={it.id} delay={i * 0.06}>
                <Link to={`/news/${it.id}`} className="card-surface group flex h-full flex-col overflow-hidden hover:border-white/20">
                  <img src={it.image} alt="" loading="lazy" className="aspect-video w-full object-cover" />
                  <div className="flex flex-1 flex-col p-6">
                    <CategoryBadge id={it.category} />
                    <h3 className="font-display mt-4 text-lg font-semibold text-white">{it.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/60">{it.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between pt-6 text-sm">
                      <span className="text-white/45">{it.date}</span>
                      <span className="inline-flex items-center gap-1 font-medium text-brand-200 group-hover:text-white">
                        {n.readMoreLabel} <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      <Section>
        <Reveal className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7 sm:p-12">
          <Intro eyebrow={n.mediaKit.eyebrow} title={n.mediaKit.title} subtitle={n.mediaKit.subtitle} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {n.mediaKit.items.map((m) => (
              <div key={m.id} className="rounded-2xl border border-white/[0.07] bg-ink-950/50 p-6">
                <Icon name={m.icon} className="size-6 text-brand-200" />
                <h3 className="font-display mt-4 font-semibold text-white">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{m.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <a href={`mailto:${n.mediaKit.contactEmail}`} className="btn-primary">
              <Mail className="size-4" /> {n.mediaKit.contactLabel}
            </a>
            <p className="text-sm text-white/45">{n.mediaKit.contactNote}</p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}

export function NewsDetailPage() {
  const { slug } = useParams();
  const it = pages.news.items.find((x) => x.id === slug || x.urlSlug === slug);
  if (!it) return <Navigate to="/news" replace />;
  const label = pages.news.categories.find((c) => c.id === it.category)?.label;
  return (
    <div key={it.id}>
      <PageHero eyebrow={`${label} · ${it.date}`} title={it.title} back={{ to: '/news', label: 'Back to News' }} />
      <section className="pb-20">
        <article className="container-x max-w-3xl">
          <img src={it.image} alt="" className="aspect-video w-full rounded-3xl object-cover" />
          <div className="mt-10 flex flex-col gap-5">
            {it.body.map((b, i) =>
              b.type === 'h2' ? (
                <h2 key={i} className="h-display mt-4 text-2xl sm:text-3xl">
                  {b.text}
                </h2>
              ) : (
                <p key={i} className="text-lg leading-relaxed text-white/65">
                  {b.text}
                </p>
              ),
            )}
          </div>
          <div className="hairline my-10" />
          <Link to="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-200 hover:text-white">
            <ArrowLeft className="size-4" /> Back to News
          </Link>
        </article>
      </section>
    </div>
  );
}

/* --------------------------------- Partner --------------------------------- */

export function PartnerPage() {
  const p = pages.partner;
  return (
    <>
      <PageHero eyebrow={p.badge} title={p.title} accent={p.titleHighlight} subtitle={p.subtitle}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#partner-apply" className="btn-primary">
            {p.heroPrimaryCta} <ArrowRight className="size-4" />
          </a>
          <Link to="/capabilities" className="btn-ghost">
            {p.heroSecondaryCta}
          </Link>
        </div>
      </PageHero>

      <div className="container-x">
        <Reveal>
          <img src="/landing/partner/partnership.jpg" alt="A partnership handshake over the city" className="h-[280px] w-full rounded-3xl object-cover sm:h-[400px]" />
        </Reveal>
      </div>

      <Section>
        <Intro eyebrow={p.whyPartner.eyebrow} title={p.whyPartner.title} subtitle={p.whyPartner.intro} />
        <div className="grid gap-4 md:grid-cols-2">
          {p.whyPartner.items.map((w, i) => (
            <Reveal key={w.id} delay={(i % 2) * 0.06} className="card-surface flex gap-5 p-7">
              <span className="grid size-12 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-iris">
                <Icon name={w.icon} className="size-5 text-white" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">{w.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/60">{w.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal className="rounded-3xl bg-brand-500 p-8 sm:p-12">
          <h2 className="h-display text-3xl sm:text-4xl">{p.billable.title}</h2>
          <div className="mt-6 flex flex-col gap-4">
            {p.billable.paragraphs.map((t) => (
              <p key={t.slice(0, 30)} className="text-lg leading-relaxed text-white/85">
                {t}
              </p>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section>
        <Intro eyebrow={p.tiers.eyebrow} title={p.tiers.title} subtitle={p.tiers.subtitle} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {p.tiers.items.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.06} className="card-surface flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-brand-500/35 to-transparent">
                  <Icon name={t.icon} className="size-5 text-brand-100" />
                </span>
                <span className="font-mono text-sm text-white/35">0{i + 1}</span>
              </div>
              <h3 className="font-display mt-5 text-xl font-semibold text-white">{t.name}</h3>
              <p className="mt-1 text-sm font-medium text-brand-200">{t.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{t.description}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                <strong className="text-white">How it works:</strong> {t.howItWorks}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                <strong className="text-white">You earn:</strong> {t.youEarn}
              </p>
              <p className="mt-auto border-t border-white/[0.07] pt-4 text-xs leading-relaxed text-white/50">{t.note}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7 sm:p-12">
          <Intro eyebrow={p.support.eyebrow} title={p.support.title} />
          <div className="flex flex-wrap justify-center gap-4">
            {p.support.items.map((s) => (
              <div key={s.id} className="w-full rounded-2xl border border-white/[0.07] bg-ink-950/50 p-6 md:w-[calc(33.333%-11px)]">
                <div className="flex items-center gap-3">
                  <Icon name={s.icon} className="size-5 text-brand-200" />
                  <h3 className="font-display font-semibold text-white">{s.title}</h3>
                  {s.badge && <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[11px] text-amber-300">{s.badge}</span>}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{s.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section>
        <Intro title={p.howItStarts.title} />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {p.howItStarts.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.06} className="card-surface p-6">
              <span className="font-display text-3xl font-semibold text-gradient">0{i + 1}</span>
              <h3 className="font-display mt-4 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{s.description}</p>
            </Reveal>
          ))}
        </ol>
        <p className="mt-6 text-center text-white/55">{p.howItStarts.footnote}</p>
      </Section>

      <section id="partner-apply" className="scroll-mt-24 py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <h2 className="h-display text-3xl sm:text-4xl">{p.formTitle}</h2>
            <p className="mt-4 text-white/60">{p.formSubtitle}</p>
            <div className="card-surface mt-8 p-6">
              <h3 className="font-display text-lg font-semibold text-white">{p.contactTitle}</h3>
              <p className="mt-2 text-sm text-white/60">{p.contactDescription}</p>
              <a href={`mailto:${p.contactEmail}`} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-200 hover:text-white">
                <Mail className="size-4" /> {p.contactEmailLabel}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-3">
            <LeadForm
              submitLabel={p.form.submitLabel || 'Apply'}
              successTitle={p.formSuccessTitle}
              successMessage={p.formSuccessMessage}
              messageLabel={p.form.messageLabel}
              messagePlaceholder={p.form.messagePlaceholder}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ------------------------------ Certifications ----------------------------- */

export function CertificationsPage() {
  const c = pages.certifications;
  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} subtitle={c.hero.intro} />
      <Section className="pt-4">
        <Intro title={c.certsTitle} />
        <div className="flex flex-wrap justify-center gap-6">
          {c.certs.map((x, i) => (
            <Reveal key={x.name} delay={i * 0.06} className="grid size-32 place-items-center rounded-3xl bg-white p-4 shadow-lg shadow-black/30 sm:size-36">
              <img src={x.logo} alt={x.name} className="h-full w-full object-contain" />
            </Reveal>
          ))}
        </div>
      </Section>
      <Section>
        <Intro title={c.complianceTitle} subtitle={c.complianceIntro} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {c.compliance.map((x, i) => (
            <Reveal key={x.name} delay={(i % 3) * 0.06} className="card-surface p-6">
              <span className="grid size-16 place-items-center rounded-2xl bg-white p-2">
                <img src={x.logo} alt="" className="h-full w-full object-contain" />
              </span>
              <h3 className="font-display mt-5 text-lg font-semibold text-white">{x.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{x.description}</p>
            </Reveal>
          ))}
        </div>
        <div className="hairline my-12" />
        <Reveal className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-display text-2xl font-semibold text-white">{c.contactTitle}</h3>
            <p className="mt-1 text-white/60">{c.contactDescription}</p>
          </div>
          <a href={`mailto:${c.contactEmail}`} className="btn-primary">
            <Mail className="size-4" /> {c.contactEmail}
          </a>
        </Reveal>
      </Section>
    </>
  );
}

/* --------------------------------- Contact --------------------------------- */

export function ContactPage() {
  const c = pages.contact;
  const socials = [
    ['LinkedIn', 'https://www.linkedin.com/company/rabbitqa', 'in'],
    ['Instagram', 'https://www.instagram.com/rabbit_qa/', 'ig'],
    ['YouTube', 'https://www.youtube.com/@RabbitQA', 'yt'],
  ];
  return (
    <>
      <PageHero eyebrow="Company" title={c.title} subtitle={c.subtitle} />
      <section className="pb-24">
        <div className="container-x grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)]">
          <Reveal className="order-2 flex flex-col gap-6 lg:order-1">
            <div className="flex gap-4">
              <span className="grid size-11 flex-shrink-0 place-items-center rounded-full bg-brand-500">
                <Mail className="size-5 text-white" />
              </span>
              <div>
                <p className="font-semibold text-white">Email</p>
                <a href={`mailto:${c.salesEmail}`} className="block text-white/65 hover:text-white">{c.salesEmail}</a>
                <a href={`mailto:${c.supportEmail}`} className="block text-white/65 hover:text-white">{c.supportEmail}</a>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid size-11 flex-shrink-0 place-items-center rounded-full bg-brand-500">
                <Building2 className="size-5 text-white" />
              </span>
              <div>
                <p className="font-semibold text-white">{c.officeTitle}</p>
                <p className="text-white/65">{c.officeAddress}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-white">{c.followTitle}:</p>
              <div className="mt-3 flex gap-2">
                {socials.map(([label, href, short]) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid size-10 place-items-center rounded-full bg-brand-500 text-xs font-bold text-white hover:bg-brand-600">
                    {short}
                  </a>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <LifeBuoy className="size-6 text-brand-200" />
              <h3 className="font-display mt-3 text-lg font-semibold text-white">{c.existingTitle}</h3>
              <p className="mt-2 text-sm text-white/60">{c.existingDescription}</p>
              <a href={c.docsUrl} target="_blank" rel="noreferrer" className="btn-primary mt-5 w-full">
                {c.existingCtaLabel}
              </a>
            </div>
            <div className="card-surface p-6">
              <HelpCircle className="size-6 text-brand-200" />
              <h3 className="font-display mt-3 text-lg font-semibold text-white">{c.quickAnswerTitle}</h3>
              <p className="mt-2 text-sm text-white/60">{c.quickAnswerDescription}</p>
              <Link to="/resources" className="btn-ghost mt-5 w-full">
                {c.quickAnswerCtaLabel}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="order-1 lg:order-2">
            <h2 className="h-display text-3xl sm:text-4xl">{c.formTitle}</h2>
            <p className="mt-3 mb-8 text-white/60">{c.formSubtitle}</p>
            <LeadForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
