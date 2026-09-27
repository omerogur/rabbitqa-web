import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/cn';
import { EASE } from './primitives';

export default function PageHero({ eyebrow, title, accent, subtitle, back, children, image, center = false }) {
  return (
    <section className="noise relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
      <div className="grid-bg absolute inset-0" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[1000px] -translate-x-1/2 rounded-full opacity-55 blur-[120px]"
        style={{ background: 'radial-gradient(closest-side, rgba(49,32,255,0.7), transparent)' }}
      />
      <div className="container-x relative">
        {back && (
          <Link to={back.to} className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-white">
            <ArrowLeft className="size-4" /> {back.label}
          </Link>
        )}
        <div className={image ? 'grid items-center gap-10 lg:grid-cols-12 lg:gap-14' : ''}>
        <div className={image ? 'lg:col-span-7' : cn('max-w-4xl', center && 'mx-auto flex flex-col items-center text-center')}>
          {eyebrow && (
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
              {eyebrow}
            </motion.span>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
            className="h-display mt-6 text-[36px] sm:text-5xl md:text-6xl"
          >
            {title} {accent && <span className="text-gradient">{accent}</span>}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className={cn('mt-6 max-w-3xl text-lg leading-relaxed text-white/65', center && 'mx-auto')}
            >
              {subtitle}
            </motion.p>
          )}
          {children}
        </div>
        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="relative lg:col-span-5"
          >
            <div className="absolute -inset-4 -z-10 rounded-[36px] bg-gradient-to-br from-brand-500/40 via-iris/20 to-transparent blur-2xl" />
            <div className="overflow-hidden rounded-[28px] border border-white/10 shadow-2xl shadow-black/40">
              <img src={image} alt="" className="aspect-[4/5] w-full object-cover sm:aspect-[4/3] lg:aspect-[4/5]" />
            </div>
          </motion.div>
        )}
        </div>
      </div>
    </section>
  );
}
