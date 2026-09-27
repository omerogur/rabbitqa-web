import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Reveal, SectionHeading } from './primitives';

// Same logo set as the corporate site's trust marquee.
const CUSTOMERS = [
  { name: 'hopi', src: '/landing/clients/Hopi-logo-new.png' },
  { name: 'Quick Sigorta', src: '/landing/clients/quick.svg' },
  { name: 'Pegasus', src: '/landing/clients/pegasus.svg' },
  { name: 'Otokoç', src: '/landing/clients/otokoc-logo.png' },
  { name: 'Akbank AG', src: '/landing/clients/akbank-logo.png' },
  { name: 'badael', src: '/landing/clients/badael.svg' },
]

const STATS = [
  { value: 10, suffix: '+', label: 'Enterprise Customers' },
  { value: 10, suffix: 'M+', label: 'AI-Generated Test Cases' },
  { value: 300, suffix: 'K+', label: 'Defects Detected' },
  { value: 40, suffix: '%+', label: 'Defect Reduction' },
];

function Counter({ value, prefix = '', suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `${prefix}${Math.round(v)}${suffix}`);
  useEffect(() => {
    if (!inView) return undefined;
    const c = animate(mv, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [inView, mv, value]);
  return <motion.span ref={ref}>{text}</motion.span>;
}

export default function Proof() {
  const row = [...CUSTOMERS, ...CUSTOMERS];
  return (
    <section id="customers" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Customers" title="Trusted By" accent="Industry Leaders" />
      </div>

      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-16 pr-16 hover:[animation-play-state:paused] sm:gap-24 sm:pr-24">
          {row.map((c, i) => (
            <img
              key={i}
              src={c.src}
              alt={c.name}
              loading="lazy"
              className="h-9 w-auto max-w-[170px] object-contain opacity-55 brightness-0 invert transition-opacity hover:opacity-100 sm:h-10"
            />
          ))}
        </div>
      </div>

      <div className="container-x mt-20">
        <Reveal>
          <h3 className="font-display mb-6 text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">RabbitQA in Numbers</h3>
        </Reveal>
        <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className="relative border-white/[0.07] p-6 sm:p-8 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0 [&:nth-child(odd)]:border-r lg:[&:not(:last-child)]:border-r"
            >
              <p className="h-display text-4xl tabular-nums sm:text-5xl md:text-6xl">
                <Counter {...s} />
              </p>
              <p className="mt-3 text-sm text-white/50">{s.label}</p>
              <span className="absolute top-6 right-6 size-1.5 rounded-full bg-brand-400 shadow-[0_0_12px_rgba(106,92,255,0.9)] sm:top-8 sm:right-8" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
