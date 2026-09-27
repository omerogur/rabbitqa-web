import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CalendarCheck, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MODULES } from '../data/modules';
import { Logo, Reveal } from './primitives';

function DemoForm() {
  const [sent, setSent] = useState(false);
  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-left">
          <CheckCircle2 className="size-6 flex-shrink-0 text-emerald-300" />
          <p className="text-sm text-white/80">Thanks! A solutions engineer will reach out within one business day to schedule your tailored demo.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          exit={{ opacity: 0 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="flex flex-col gap-2 rounded-2xl border border-white/15 bg-ink-950/60 p-2 backdrop-blur sm:flex-row"
        >
          <label className="sr-only" htmlFor="demo-email">Work email</label>
          <input
            id="demo-email"
            type="email"
            required
            placeholder="you@company.com"
            className="h-12 min-w-0 flex-1 rounded-xl bg-transparent px-4 text-sm text-white placeholder:text-white/35 focus:outline-none"
          />
          <button type="submit" className="btn-primary !h-12 !rounded-xl">
            Book my demo <ArrowRight className="size-4" />
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export function FinalCta({ title, body }) {
  return (
    <section id="demo" className="relative scroll-mt-10 py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[32px] border border-white/10 px-6 py-16 text-center sm:px-12 sm:py-24">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at top, rgba(49,32,255,0.7), transparent 60%), radial-gradient(ellipse at bottom right, rgba(217,70,239,0.4), transparent 55%), radial-gradient(ellipse at bottom left, rgba(34,211,238,0.18), transparent 50%), #0a0926',
            }}
          />
          <div className="grid-bg absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow">
              <CalendarCheck className="size-3.5" /> 30-minute tailored demo
            </span>
            <h2 className="h-display mt-6 text-4xl sm:text-6xl">
              {title || (
                <>
                  See RabbitQA on <span className="text-gradient">your own product.</span>
                </>
              )}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/65 sm:text-lg">
              {body || 'Bring a requirement document or a URL. We’ll turn it into test cases, automation and a live run while you watch.'}
            </p>
            <div className="mx-auto mt-10 max-w-lg">
              <DemoForm />
            </div>
            <p className="mt-4 text-xs text-white/40">No credit card. No sales script. Just your app, tested.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const COLS = [
  {
    title: 'Platform',
    links: [
      { label: 'Capabilities', to: '/capabilities' },
      { label: 'Agents', to: '/agents' },
      { label: 'All modules', to: '/modules' },
      { label: 'Industries', to: '/industry-solutions' },
    ],
  },
  { title: 'Modules', links: MODULES.slice(0, 7).map((m) => ({ label: m.name, to: `/modules/${m.id}` })) },
  { title: 'More modules', links: MODULES.slice(7).map((m) => ({ label: m.name, to: `/modules/${m.id}` })) },
  {
    title: 'Resources',
    links: [
      { label: 'Resources Hub', to: '/resources' },
      { label: 'Blog', to: '/blog' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Compare', to: '/compare' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'News', to: '/news' },
      { label: 'Partner', to: '/partner' },
      { label: 'Certifications', to: '/certifications' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

// The corporate site's footer rabbit: tile and negative-space outline as two
// subpaths under evenodd, leaving just the rabbit.
const RABBIT =
  'M0 0H37.71V36H0Z M0 0V36H11.3541C11.6412 35.6586 11.9502 35.3376 12.2811 35.0393L8.54981 15.7315C8.44464 15.1874 8.58408 14.6242 8.93092 14.1946L11.487 11.0223C12.1765 10.1667 13.4469 10.0969 14.2233 10.8731L17.4075 14.0532C17.7726 14.4177 17.9712 14.9195 17.9558 15.4386L17.4388 32.6605C17.7838 32.6158 18.1354 32.5907 18.4905 32.5841L20.8758 18.1055C21.0608 16.9821 21.9949 16.1396 23.1211 16.0812L27.903 15.8312C28.849 15.7816 29.7353 16.2983 30.1666 17.1497L30.8721 18.5441C31.2325 19.2565 31.3519 20.0685 31.2112 20.8554L30.2688 26.1303C30.0862 27.1512 28.7645 27.4274 28.1967 26.5629L22.2378 17.5L25.7859 25.3595C26.1085 26.0748 26.1416 26.8892 25.8769 27.6285L23.6086 33.966C24.5049 34.5107 25.305 35.1998 25.9785 36.0011H37.71V0H0Z';

function RabbitEars({ className }) {
  return (
    <svg aria-hidden viewBox="0 0 37.71 36" className={className}>
      <defs>
        <linearGradient id="rabbit-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8b7dff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#3120ff" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <path fillRule="evenodd" clipRule="evenodd" fill="url(#rabbit-fill)" d={RABBIT} />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] pt-16 pb-10">
      <RabbitEars className="pointer-events-none absolute right-6 bottom-2 z-0 sm:right-12 xl:right-20 h-[150px] w-auto sm:h-[190px]" />
      <div className="container-x relative z-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="h-8" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              Multi-agentic AI platform for digital product quality. Predict risk. Prevent failure. Protect revenue.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="text-[11px] font-semibold tracking-[0.08em] text-white/35 uppercase">{c.title}</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-sm text-white/60 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="hairline my-10" />
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-white/40 sm:flex-row sm:pr-36 xl:pr-44">
          <p>© {new Date().getFullYear()} RabbitQA. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies', 'Imprint'].map((l) => (
              <a key={l} href="#top" className="hover:text-white">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
