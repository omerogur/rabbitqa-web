import { motion } from 'framer-motion';
import { cn } from '../lib/cn';

export const EASE = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 24, className, as = 'div' }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({ eyebrow, title, accent, body, align = 'center', className }) {
  return (
    <div className={cn('flex flex-col gap-5', align === 'center' ? 'mx-auto items-center text-center' : 'items-start', 'max-w-5xl', className)}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="h-display text-[34px] sm:text-5xl md:text-[56px]">
          {title} {accent && <span className="text-gradient">{accent}</span>}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">{body}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Logo({ className }) {
  return <img src="/logo-light.svg" alt="RabbitQA" className={cn('h-7 w-auto', className)} width="121" height="28" />;
}
