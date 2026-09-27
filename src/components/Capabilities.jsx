import { motion } from 'framer-motion';
import { ArrowRight, Boxes, ClipboardCheck, Globe, Layers, Smartphone, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/cn';
import { Reveal, SectionHeading } from './primitives';

function ScoreMeters() {
  const rows = [
    { label: 'Clarity', value: 92 },
    { label: 'Completeness', value: 84 },
    { label: 'Testability', value: 78 },
  ];
  return (
    <div className="flex flex-col gap-3">
      {rows.map((r, i) => (
        <div key={r.label}>
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="text-white/60">{r.label}</span>
            <span className="font-medium tabular-nums text-white">{r.value}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-sky-400 to-brand-400"
              initial={{ width: 0 }}
              whileInView={{ width: `${r.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function GeneratedCases() {
  const cases = [
    { type: 'Happy path', title: 'Transfer within daily limit', tone: 'text-emerald-300 bg-emerald-400/10' },
    { type: 'Edge case', title: 'Amount equals remaining limit', tone: 'text-amber-300 bg-amber-400/10' },
    { type: 'Negative', title: 'Expired OTP is rejected', tone: 'text-rose-300 bg-rose-400/10' },
  ];
  return (
    <div className="flex flex-col gap-2">
      {cases.map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 + i * 0.15 }}
          className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-ink-950/60 px-3 py-2"
        >
          <span className={cn('rounded-md px-1.5 py-0.5 text-[10.5px] font-medium whitespace-nowrap', c.tone)}>{c.type}</span>
          <span className="truncate text-xs text-white/75">{c.title}</span>
        </motion.div>
      ))}
    </div>
  );
}

function Frameworks() {
  const items = ['Selenium', 'Playwright', 'Appium', 'Cypress', 'Cucumber', 'Gauge', 'Robot Framework', 'Postman'];
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((f, i) => (
        <motion.span
          key={f}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.05 }}
          className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs text-white/75"
        >
          {f}
        </motion.span>
      ))}
    </div>
  );
}

function Execution() {
  const lanes = [
    { icon: Globe, label: 'Chrome', done: 100 },
    { icon: Globe, label: 'Safari', done: 92 },
    { icon: Smartphone, label: 'iOS', done: 81 },
    { icon: Boxes, label: 'API layer', done: 100 },
  ];
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <span className="font-display text-2xl font-semibold text-white">1,200</span>
        <span className="text-xs text-white/50">scenarios · 40 min</span>
      </div>
      <div className="flex flex-col gap-2">
        {lanes.map((l, i) => (
          <div key={l.label} className="flex items-center gap-2.5">
            <l.icon className="size-3.5 flex-shrink-0 text-white/50" />
            <span className="w-16 text-xs text-white/60">{l.label}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-orange-400 to-magenta"
                initial={{ width: 0 }}
                whileInView={{ width: `${l.done}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.2 + i * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const CAPABILITIES = [
  {
    icon: ClipboardCheck,
    title: 'Requirement Governance',
    body: 'Anyone can raise a request. Nobody can raise an untestable one. The agent reads whatever arrives, asks what is missing, and hands back a requirement scored for clarity, completeness and testability.',
    visual: ScoreMeters,
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Test Generation',
    body: 'Point it at the approved requirement, a website URL or a Figma file. Happy paths, edge cases and negative scenarios come back written, with preconditions and expected results.',
    visual: GeneratedCases,
  },
  {
    icon: Layers,
    title: 'Multi-Framework Support',
    body: 'Keep your Selenium suite. Keep your Playwright specs. RabbitQA orchestrates Appium, Cypress, Cucumber, Gauge and Robot Framework alongside them, so migration is never a prerequisite.',
    visual: Frameworks,
  },
  {
    icon: Zap,
    title: 'Orchestrated Test Execution',
    body: '1,200 scenarios in 40 minutes across Chrome, Safari, iOS and your API layer. Flaky failures separated out before anyone opens a ticket.',
    visual: Execution,
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Platform Capabilities"
          title="One platform."
          accent="Full lifecycle coverage."
          body="From the first requirement to production health, every stage of quality is governed in one place."
        />
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="card-surface group flex flex-col gap-7 overflow-hidden p-6 sm:p-8">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-brand-500/35 to-transparent">
                    <c.icon className="size-5 text-brand-100" />
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-white/35">0{i + 1}</span>
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold tracking-tight text-white">{c.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/60">{c.body}</p>
              </div>
              <div className="mt-auto rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 sm:p-5">
                <c.visual />
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <Link to="/capabilities" className="btn-ghost">
            Discover Platform Capabilities <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
