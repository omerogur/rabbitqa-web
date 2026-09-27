import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Building2, Landmark, Plane, ShieldHalf, ShoppingBag, Wallet } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { moduleById } from '../data/modules';
import { cn } from '../lib/cn';
import { Reveal, SectionHeading } from './primitives';

const INDUSTRIES = [
  {
    id: 'banking',
    name: 'Banking',
    icon: Landmark,
    sub: 'Core banking, digital banking',
    body: 'RabbitQA helps banks and core banking providers modernize and release faster, with AI-native quality governed from requirement to production.',
    points: ['Requirement → case → evidence traceability', 'Synthetic IBANs, cards and customers, never production PII', 'PSD2 & open-banking API scenarios', 'Real-device regression before every store release'],
    modules: ['analyzer', 'casewriter', 'datacrate', 'smartapi', 'mobilehub'],
  },
  {
    id: 'insurance',
    name: 'Insurance',
    icon: ShieldHalf,
    sub: 'Claims, policy, quotation systems',
    body: 'RabbitQA brings AI-native quality to claims, policy, and quotation systems, proving performance and resilience without ever moving sensitive data to an external cloud.',
    points: ['Edge cases generated from product specs', 'Impact analysis when a policy document changes', 'Agent portal and self-service journeys automated', 'Field assessments with automatic evidence checks'],
    modules: ['smartpbi', 'casewriter', 'testpilot', 'autorunner', 'smartassess'],
  },
  {
    id: 'fintech',
    name: 'Fintech',
    icon: Wallet,
    sub: 'Payments, onboarding, open banking APIs',
    body: 'RabbitQA keeps payments, onboarding, and API reliability ahead of your growth curve, with AI-native quality governed from requirement to production.',
    points: ['API inventory with inferred data relationships', 'Mocks for partner & payment-rail APIs', 'Load and spike tests before campaigns', 'SLOs, status pages and incident runbooks'],
    modules: ['smartapi', 'datacrate', 'loadmance', 'healthcheck'],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: ShoppingBag,
    sub: 'Checkout, campaigns, personalization',
    body: 'RabbitQA is built for e-commerce teams whose KPIs live and die on checkout reliability, campaign stability, and personalization that works for every customer.',
    points: ['Checkout automation that heals itself', 'Chrome, Safari, Firefox, Edge & Opera on demand', 'WCAG 2.2 & EAA compliance evidence', 'Black-Friday-grade load testing'],
    modules: ['autorunner', 'browserhub', 'mobilehub', 'accessibility', 'loadmance'],
  },
  {
    id: 'aviation',
    name: 'Aviation',
    icon: Plane,
    sub: 'Booking, check-in, crew operations',
    body: 'RabbitQA helps airlines turn fragile, manual release cycles into governed, AI-native quality, from booking and check-in to crew and operations systems, without losing 24/7 reliability.',
    points: ['Multi-channel booking journeys automated', 'Fare and ancillary edge cases generated', 'Device matrix for boarding-pass wallets', 'Continuous uptime & latency monitoring'],
    modules: ['casewriter', 'autorunner', 'mobilehub', 'healthcheck'],
  },
  {
    id: 'retail',
    name: 'Retail',
    icon: Building2,
    sub: 'Stores, e-commerce, marketplace',
    body: 'RabbitQA helps national-scale and omnichannel retailers ship across stores, e-commerce, and marketplace platforms, and stand up to peak traffic without flinching.',
    points: ['Robotic automation for POS devices', 'Loyalty & campaign app regression', 'Store roll-out assessments with evidence', 'Mock services for back-office systems'],
    modules: ['autorunner', 'mobilehub', 'smartassess', 'datacrate'],
  },
];

export default function Industries() {
  const [active, setActive] = useState(INDUSTRIES[0].id);
  const ind = INDUSTRIES.find((i) => i.id === active);

  return (
    <section id="industries" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Industries"
          title="Solutions for"
          accent="Every Industry"
          body="Built for the industry where quality is a regulator’s question, not a preference."
        />

        <Reveal delay={0.1} className="mt-12 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {INDUSTRIES.map((i) => (
            <button
              key={i.id}
              type="button"
              onClick={() => setActive(i.id)}
              className={cn(
                'relative flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-sm transition-colors',
                active === i.id ? 'border-white/15 text-white' : 'border-white/[0.06] text-white/50 hover:text-white',
              )}
            >
              {active === i.id && <motion.span layoutId="industry-bg" className="absolute inset-0 rounded-2xl bg-white/[0.06]" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              <i.icon className="relative size-5" />
              <span className="relative font-medium">{i.name}</span>
            </button>
          ))}
        </Reveal>

        <div className="card-surface mt-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={ind.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
            >
              <div className="relative min-h-[280px] overflow-hidden lg:min-h-[460px]">
                <img src={`/landing/industries/${ind.id}.jpg`} alt={ind.name} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/5" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    <ind.icon className="size-3.5" /> {ind.name}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{ind.sub}</h3>
                </div>
              </div>
              <div className="p-6 sm:p-10">
                <p className="leading-relaxed text-white/70 sm:text-lg">{ind.body}</p>
                <Link to={`/industry-solutions/${ind.id}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-200 hover:text-white">
                  Explore {ind.name} <ArrowRight className="size-4" />
                </Link>
                <div className="mt-8">
                  <p className="text-[11px] font-semibold tracking-[0.08em] text-white/40 uppercase">Modules in play</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ind.modules.map((id) => {
                      const m = moduleById[id];
                      return (
                        <Link key={id} to={`/modules/${id}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/80 hover:border-white/25">
                          <m.icon className="size-3.5" /> {m.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {ind.points.map((p, n) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * n }}
                    className="rounded-2xl border border-white/[0.07] bg-ink-950/50 p-5"
                  >
                    <span className="font-mono text-[11px] text-brand-200">0{n + 1}</span>
                    <p className="mt-3 text-[15px] leading-snug text-white/85">{p}</p>
                  </motion.li>
                ))}
              </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
