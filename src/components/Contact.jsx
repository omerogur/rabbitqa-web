import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock, MessagesSquare, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/cn';
import { Reveal } from './primitives';

const COUNTRIES = ['Türkiye', 'Germany', 'United Kingdom', 'Netherlands', 'United Arab Emirates', 'Saudi Arabia', 'Azerbaijan', 'United States', 'Other'];
const TEAM_SIZES = ['1-10', '11-50', '51-200', '201-500', '500+'];

const field =
  'h-11 w-full rounded-xl border border-white/10 bg-ink-950/60 px-3.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30';

function Field({ label, required, children, className }) {
  return (
    <label className={cn('flex flex-col gap-1.5', className)}>
      <span className="text-xs font-medium text-white/60">
        {label} {required && <span className="text-brand-300">*</span>}
      </span>
      {children}
    </label>
  );
}

export function LeadForm({
  submitLabel = 'Contact Us',
  successTitle = 'Thank you, we’ll be in touch.',
  successMessage = 'A solutions engineer will reach out within one business day to schedule your tailored demo.',
  messageLabel = 'Message',
  messagePlaceholder = '',
}) {
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState('');
  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="ok"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex h-full flex-col items-center justify-center gap-4 rounded-3xl border border-emerald-400/25 bg-ink-950/60 p-10 text-center"
        >
          <CheckCircle2 className="size-12 text-emerald-300" />
          <p className="font-display text-2xl font-semibold text-white">{successTitle}</p>
          <p className="max-w-sm text-sm text-white/60">{successMessage}</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          exit={{ opacity: 0 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="grid gap-4 rounded-3xl border border-white/10 bg-ink-950/50 p-5 backdrop-blur sm:grid-cols-2 sm:p-7"
        >
          <Field label="First Name" required><input required className={field} autoComplete="given-name" /></Field>
          <Field label="Last Name" required><input required className={field} autoComplete="family-name" /></Field>
          <Field label="Work Email" required><input required type="email" className={field} autoComplete="email" /></Field>
          <Field label="Company Name" required><input required className={field} autoComplete="organization" /></Field>
          <Field label="Job Title" required><input required className={field} autoComplete="organization-title" /></Field>
          <Field label="Country" required>
            <select required defaultValue="" className={cn(field, 'appearance-none')}>
              <option value="" disabled>Select country</option>
              {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Phone Number" required><input required type="tel" className={field} autoComplete="tel" /></Field>
          <Field label="Team Size">
            <select defaultValue="" className={cn(field, 'appearance-none')}>
              <option value="" disabled>Select team size</option>
              {TEAM_SIZES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label={messageLabel} className="sm:col-span-2">
            <textarea
              maxLength={300}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
      placeholder={messagePlaceholder}
              className={cn(field, 'h-auto resize-none py-3')}
            />
            <span className="self-end text-[11px] text-white/35">{message.length}/300</span>
          </Field>
          <label className="flex items-start gap-3 text-xs leading-relaxed text-white/55 sm:col-span-2">
            <input required type="checkbox" className="mt-0.5 size-4 flex-shrink-0 accent-brand-500" />
            I agree to receive communications from RabbitQA and understand that I can opt out at any time.
          </label>
          <div className="flex flex-col items-start gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] text-white/40">By submitting this form, you agree to our Terms of Use and Privacy Policy.</p>
            <button type="submit" className="btn-primary">
              {submitLabel} <ArrowRight className="size-4" />
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export default function Contact() {

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at top left, rgba(49,32,255,0.55), transparent 55%), radial-gradient(ellipse at bottom right, rgba(217,70,239,0.3), transparent 55%), #0a0926',
            }}
          />
          <div className="grid-bg absolute inset-0 opacity-50" />
          <div className="relative grid gap-12 p-6 sm:p-10 lg:grid-cols-12 lg:p-14">
            <Reveal className="lg:col-span-5">
              <span className="eyebrow">Contact</span>
              <h2 className="h-display mt-6 text-4xl sm:text-5xl">
                Let’s Talk <span className="text-gradient">Quality</span>
              </h2>
              <p className="mt-5 text-white/65 sm:text-lg">
                Whether you have questions or just want to understand if RabbitQA is the right fit, our team will give you an honest look.
              </p>
              <ul className="mt-10 flex flex-col gap-4">
                {[
                  { icon: Clock, t: 'A reply within one business day' },
                  { icon: MessagesSquare, t: 'A tailored demo on your own requirements' },
                  { icon: ShieldCheck, t: 'Cloud, private cloud or fully on-prem options' },
                ].map((x) => (
                  <li key={x.t} className="flex items-center gap-3 text-sm text-white/75">
                    <span className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <x.icon className="size-4 text-brand-100" />
                    </span>
                    {x.t}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-7">
              <LeadForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
