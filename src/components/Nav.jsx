import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AGENTS, MODULES } from '../data/modules';
import { cn } from '../lib/cn';
import { Logo } from './primitives';

const PLATFORM_LINKS = [
  { label: 'Platform Overview', to: '/' },
  { label: 'Capabilities', to: '/capabilities' },
  { label: 'Agents', to: '/agents' },
  { label: 'Modules', to: '/modules' },
];

const INDUSTRY_LINKS = ['Banking', 'Insurance', 'Fintech', 'Ecommerce', 'Aviation', 'Retail'].map((n) => ({
  label: n,
  to: `/industry-solutions/${n.toLowerCase()}`,
}));

const RESOURCE_LINKS = [
  { label: 'Resources Hub', to: '/resources' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Compare', to: '/compare' },
];

const COMPANY_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'News', to: '/news' },
  { label: 'Partner', to: '/partner' },
  { label: 'Certifications', to: '/certifications' },
  { label: 'Contact', to: '/contact' },
];

const NAV = [
  { id: 'platform', label: 'Platform' },
  { id: 'industry', label: 'Industry', items: INDUSTRY_LINKS },
  { id: 'resources', label: 'Resources', items: RESOURCE_LINKS },
  { id: 'pricing', label: 'Pricing', to: '/pricing' },
  { id: 'company', label: 'Company', items: COMPANY_LINKS },
];

function SimpleMenu({ items, onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-1/2 mt-3 w-60 -translate-x-1/2 rounded-2xl border border-white/10 bg-ink-900/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-2xl"
    >
      {items.map((it) => (
        <Link key={it.to} to={it.to} onClick={onNavigate} className="block rounded-xl px-3 py-2.5 text-sm text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white">
          {it.label}
        </Link>
      ))}
    </motion.div>
  );
}

function PlatformMenu({ onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-1/2 mt-3 flex w-[1000px] -translate-x-1/2 gap-2 rounded-3xl border border-white/10 bg-ink-900/95 p-3 shadow-2xl shadow-black/50 backdrop-blur-2xl"
    >
      <div className="flex w-44 flex-shrink-0 flex-col gap-0.5 rounded-2xl bg-white/[0.03] p-3">
        <p className="mb-2 text-[11px] font-semibold tracking-[0.08em] text-white/40 uppercase">Platform</p>
        {PLATFORM_LINKS.map((l) => (
          <Link key={l.to} to={l.to} onClick={onNavigate} className="rounded-lg px-2 py-2 text-sm text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white">
            {l.label}
          </Link>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-4 gap-1">
        {AGENTS.map((agent) => (
          <div key={agent.id} className="rounded-2xl p-3">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold tracking-[0.08em] text-white/40 uppercase">
              <span className={cn('size-1.5 rounded-full', agent.dot)} />
              {agent.name}
            </p>
            <div className="flex flex-col gap-0.5">
              {MODULES.filter((m) => m.agent === agent.id).map((m) => (
                <Link
                  key={m.id}
                  to={`/modules/${m.id}`}
                  onClick={onNavigate}
                  className="group flex items-center gap-2.5 rounded-xl px-2 py-2 transition-colors hover:bg-white/[0.06]"
                >
                  <span className="grid size-8 flex-shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70 transition-colors group-hover:text-white">
                    <m.icon className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-medium text-white">{m.name}</span>
                    <span className="block truncate text-[11px] text-white/45">{m.kicker}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(null);
  const [mobile, setMobile] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        className={cn(
          'mx-auto flex h-14 max-w-[1440px] items-center justify-between rounded-full border px-4 transition-all duration-500 sm:px-5',
          scrolled ? 'border-white/10 bg-ink-900/70 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl' : 'border-transparent bg-transparent',
        )}
        onMouseLeave={() => setMenu(null)}
      >
        <Link to="/" className="flex-shrink-0" aria-label="RabbitQA home">
          <Logo />
        </Link>

        <div className="relative hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            item.to ? (
              <Link key={item.id} to={item.to} onMouseEnter={() => setMenu(null)} className="rounded-full px-3.5 py-2 text-sm text-white/75 transition-colors hover:text-white">
                {item.label}
              </Link>
            ) : (
              <div key={item.id} className="relative" onMouseEnter={() => setMenu(item.id)}>
                <button
                  type="button"
                  onClick={() => setMenu((v) => (v === item.id ? null : item.id))}
                  aria-expanded={menu === item.id}
                  className={cn('flex items-center gap-1 rounded-full px-3.5 py-2 text-sm transition-colors hover:text-white', menu === item.id ? 'text-white' : 'text-white/75')}
                >
                  {item.label} <ChevronDown className={cn('size-3.5 transition-transform', menu === item.id && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {menu === item.id && item.items && <SimpleMenu items={item.items} onNavigate={() => setMenu(null)} />}
                </AnimatePresence>
              </div>
            ),
          )}
          <AnimatePresence>{menu === 'platform' && <PlatformMenu onNavigate={() => setMenu(null)} />}</AnimatePresence>
        </div>

        <div className="flex items-center gap-2">
          <a href="#login" className="hidden rounded-full px-4 py-2 text-sm text-white/75 transition-colors hover:text-white sm:block">
            Sign in
          </a>
          <Link to="/#contact" className="btn-primary !h-9 !px-4 hidden sm:inline-flex">
            Request a Demo <ArrowRight className="size-3.5" />
          </Link>
          <button type="button" className="grid size-9 place-items-center rounded-full text-white lg:hidden" onClick={() => setMobile((v) => !v)} aria-label="Toggle menu">
            {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-w-[1440px] rounded-3xl border border-white/10 bg-ink-900/95 p-4 backdrop-blur-2xl lg:hidden"
          >
            <div className="mb-3 grid grid-cols-2 gap-1">
              {[...PLATFORM_LINKS.slice(1), { label: 'Pricing', to: '/pricing' }, ...RESOURCE_LINKS, ...COMPANY_LINKS, { label: 'Industries', to: '/industry-solutions' }].map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setMobile(false)} className="rounded-xl px-2 py-2 text-sm font-medium text-white hover:bg-white/5">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="hairline mb-3" />
            <div className="grid grid-cols-2 gap-1">
              {MODULES.map((m) => (
                <Link key={m.id} to={`/modules/${m.id}`} onClick={() => setMobile(false)} className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm text-white/80 hover:bg-white/5">
                  <m.icon className="size-4 flex-shrink-0 text-brand-300" />
                  <span className="truncate">{m.name}</span>
                </Link>
              ))}
            </div>
            <div className="hairline my-3" />
            <Link to="/#contact" onClick={() => setMobile(false)} className="btn-primary w-full">
              Request a Demo
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
