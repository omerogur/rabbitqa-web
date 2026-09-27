import { motion } from 'framer-motion';
import { BrainCircuit, Fingerprint, KeyRound, ScrollText, Server, Users } from 'lucide-react';
import { Reveal, SectionHeading } from './primitives';

const PILLARS = [
  { icon: Fingerprint, title: 'SSO, SAML & LDAP', body: 'Sign in with your identity provider, enforce MFA and verify organisation domains.' },
  { icon: Users, title: 'Granular RBAC', body: 'Permission keys per module, resource and action, across workspaces and teams.' },
  { icon: ScrollText, title: 'Full audit trail', body: 'Every agent decision, approval and change is logged and exportable.' },
  { icon: Server, title: 'Cloud or on-prem', body: 'Run in our cloud, your private cloud, or fully air-gapped inside your network.' },
  { icon: BrainCircuit, title: 'Bring your own LLM', body: 'Use OpenAI, Azure OpenAI or your private model. Your data never trains ours.' },
  { icon: KeyRound, title: 'Service accounts & tokens', body: 'Scoped API tokens for CI/CD, with rotation and per-project access.' },
];

const logo = (name, file) => ({ name, src: `/landing/integrations/${file}` });
const INTEGRATIONS = [
  [logo('Jira', 'jira.png'), logo('Azure DevOps', 'azure-devops.png'), logo('GitHub', 'github.png'), logo('GitLab', 'gitlab.png'), logo('Jenkins', 'jenkins.png'), logo('BrowserStack', 'browserstack.png'), logo('LambdaTest', 'lambdatest.png'), logo('SAP', 'sap.png'), logo('Oracle', 'oracle.png'), logo('Postman', 'postman.png')],
  [logo('Selenium', 'selenium.svg'), logo('Playwright', 'playwright.svg'), logo('Appium', 'appium.svg'), logo('Cucumber', 'cucumber.png'), logo('Robot Framework', 'robot-framework.png'), logo('Gauge', 'gauge.png'), logo('TestNG', 'testng.png'), logo('JUnit 5', 'junit5.png'), logo('xUnit', 'xunit.png'), logo('JMeter', 'jmeter.png')],
];

const CERTIFICATIONS = ['iso-27001', 'iso-9001', 'iso-42001', 'gdpr', 'dora', 'eu-ai-act', 'eu-data-act', 'cra', 'wcag-eaa'];

function ChipRow({ items, reverse }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max animate-marquee gap-3 pr-3" style={{ animationDirection: reverse ? 'reverse' : 'normal', animationDuration: '50s' }}>
        {row.map((it, i) => (
          <span key={i} className="flex h-14 flex-shrink-0 items-center gap-2.5 rounded-2xl bg-white px-5 shadow-sm">
            <img src={it.src} alt="" loading="lazy" className="h-7 w-auto max-w-[110px] object-contain" />
            <span className="text-sm font-medium whitespace-nowrap text-slate-700">{it.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Enterprise() {
  return (
    <section id="enterprise" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Enterprise-grade"
          title="Enterprise-grade security,"
          accent="built in from day one."
          body="RabbitQA is built for banks, airlines and insurers. Identity, isolation and auditability come built in."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="card-surface group p-6 transition-colors hover:border-white/15">
              <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-brand-500/30 to-transparent">
                <p.icon className="size-5 text-brand-100" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{p.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="relative mt-20 overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent py-12">
          <div className="absolute top-1/2 left-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/25 blur-[100px]" />
          <div className="relative px-6 text-center">
            <motion.span
              className="mx-auto mb-5 grid size-16 place-items-center rounded-2xl border border-white/15 bg-ink-900 shadow-[0_0_60px_rgba(49,32,255,0.6)]"
              animate={{ boxShadow: ['0 0 40px rgba(49,32,255,0.4)', '0 0 80px rgba(49,32,255,0.8)', '0 0 40px rgba(49,32,255,0.4)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <img src="/favicon.svg" alt="" className="size-9" />
            </motion.span>
            <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Plugs into the stack you already run</h3>
            <p className="mx-auto mt-3 max-w-xl text-white/55">Keep your frameworks, trackers and pipelines. RabbitQA orchestrates them and reports back where your team already works.</p>
          </div>
          <div className="relative mt-10 flex flex-col gap-3">
            <ChipRow items={INTEGRATIONS[0]} />
            <ChipRow items={INTEGRATIONS[1]} reverse />
          </div>
          <div className="relative mt-12 px-6">
            <p className="text-center text-[11px] font-semibold tracking-[0.12em] text-white/40 uppercase">Certifications & compliance</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {CERTIFICATIONS.map((c) => (
                <span key={c} className="grid size-[76px] place-items-center rounded-2xl bg-white p-2 shadow-sm sm:size-[84px]">
                  <img src={`/landing/certifications/${c}.svg`} alt={c.replace(/-/g, ' ').toUpperCase()} loading="lazy" className="h-full w-full object-contain" />
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
