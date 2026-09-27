import { ArrowRight, Check, Cloud, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import Contact from '../components/Contact';
import { Faq } from '../components/ModuleDetails';
import PageHero from '../components/PageHero';
import { Reveal } from '../components/primitives';
import { moduleById } from '../data/modules';

// Copy is taken verbatim from rabbitqa.com/pricing.
const GROUPS = [
  {
    name: 'Business Agents',
    sub: 'Requirements to backlog',
    items: [
      ['SmartRequest', 'Structured demand intake'],
      ['Analyzer', 'AI-powered requirement intelligence'],
      ['SmartPBI', 'Testable backlog generation'],
    ],
  },
  {
    name: 'Planning Agents',
    sub: 'Backlog to coverage',
    items: [
      ['CaseWriter', 'AI-powered test case generation'],
      ['TestPilot', 'Test execution governance'],
      ['DataCrate', 'Stable test data layer'],
    ],
  },
  {
    name: 'Technical Agents',
    sub: 'Coverage to production',
    items: [
      ['AutoRunner', 'Parallel test execution engine'],
      ['SmartAPI', 'Integration risk control'],
      ['HealthCheck', 'Production health monitoring'],
    ],
  },
];

const LICENSING = [
  {
    title: '1 · Use our models. Buy the capacity you need.',
    points: [
      'RabbitQA runs the AI, and you take one of three packages sized to how much agent work your team actually does. The packages differ in capacity and nothing else.',
      'Capacity is measured in work you can recognise: a requirement processed, an analysis run, a test case generated, a suite executed. Not tokens, not compute units, not an AI credit whose exchange rate nobody will put in writing.',
      'Your price is fixed and your users are unlimited. You know the annual number before the year starts, and adding your analysts, your product owners and your whole QA organisation does not change it.',
    ],
  },
  {
    title: '2 · Bring your own model. Pay per user.',
    points: [
      'Connect your own OpenAI, Azure OpenAI, AWS Bedrock, Anthropic or Google account and licensing switches to per-user, with the rate falling as your team grows.',
      'Your AI cost moves to a provider contract you already negotiated and already govern. Your RabbitQA cost becomes a function of how many people use it, not how much work the agents do.',
      'Most platforms let you connect your own key and keep charging you the same seat price. Here, bringing your own model changes what you are billed for.',
    ],
  },
];

const DEPLOYMENT = [
  { icon: Cloud, title: 'Cloud', body: 'We host it. No installation work, no deployment fee, no maintenance charge. You are running on your own material in days.' },
  {
    icon: Server,
    title: 'On-premise',
    body: 'RabbitQA runs entirely inside your perimeter, and with your own model no prompt leaves your infrastructure at all. Onboarding, installation and ongoing maintenance are quoted separately, because deploying inside a regulated environment is real work and we do not hide it in the licence.',
  },
];

const ADDONS = [
  { id: 'accessibility', body: 'WCAG 2.1 and 2.2 and European Accessibility Act conformance, run in the pipeline rather than audited once a year.' },
  { id: 'browserhub', body: 'Cross-browser execution across the desktop matrix, without maintaining your own grid.' },
  { id: 'mobilehub', body: 'Real-device mobile coverage for iOS and Android, on hardware you do not have to buy.' },
];

const FAQS = [
  ['How much does RabbitQA cost?', 'It depends on two choices: whether you use our models or your own, and whether it runs in our cloud or your infrastructure. We price it in the first call rather than publishing a table that would be wrong for most companies. Tell us your suite size and team structure and you will have a number the same day.'],
  ['What are the three packages and how do they differ?', 'They differ in capacity and nothing else. All three include all nine agents. There is no package where requirement governance is missing or production monitoring is switched off.'],
  ['Do we pay only for what we use?', 'No, and that is deliberate. You choose a package sized to your quality volume and the price is fixed, so you can forecast it. Metered AI billing sounds fairer until the invoice arrives and nobody can explain it. If your usage settles well below your package, you move down at renewal.'],
  ['Do we pay per user?', 'Only if you want to. On the capacity model, users are unlimited: add your entire QA organisation, your business analysts and your product owners without changing the price. Per-user licensing applies when you bring your own model.'],
  ['What is capacity measured in?', 'Work you can recognise: a requirement processed, an analysis run, a test case generated, a backlog item created, a suite executed. Not tokens, not compute units, not an AI credit whose exchange rate nobody will put in writing.'],
  ['What happens if we exceed our package?', 'Nothing stops. Additional capacity can be added at any point by talking to your account manager, and if the higher volume turns out to be your new normal, you move up a package at renewal rather than paying for the overage twice.'],
  ['Can we connect our own LLM?', 'Yes. OpenAI, Azure OpenAI, AWS Bedrock, Anthropic or Google, in our cloud or inside your own network. Your model usage goes on your own provider contract, and RabbitQA licensing switches to per-user.'],
  ['Why does bringing our own model change the pricing basis?', 'Because you are no longer paying us for AI capacity. When you supply the model, what you are licensing is the platform itself, so we charge for access rather than capacity. The per-user rate falls as your team grows.'],
  ['Can RabbitQA run on-premise?', 'Yes, with either licensing model. Combined with your own local model, no data and no prompt leaves your infrastructure, which is what regulated buyers in banking and insurance usually need to hear first.'],
  ['What costs extra?', 'Three modules are priced separately: Accessibility, BrowserHub and MobileHub. On-premise deployments are also quoted for onboarding, installation and ongoing maintenance. Cloud deployments carry none of those.'],
  ['Is there a free trial?', 'There is no self-serve free tier. A guided proof of concept on your own requirement document and your own regression suite is available through sales.'],
].map(([question, answer]) => ({ question, answer }));

const TalkToSales = ({ className = 'btn-primary' }) => (
  <Link to="/contact" className={className}>
    Talk to Sales <ArrowRight className="size-4" />
  </Link>
);

function Centered({ eyebrow, title, body }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="h-display mt-5 text-3xl sm:text-5xl">{title}</h2>
      {body && <p className="mt-5 text-lg leading-relaxed text-white/60">{body}</p>}
    </Reveal>
  );
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="One platform."
        accent="One conversation."
        subtitle="Most platforms price the capability you need one tier above the one you can afford. RabbitQA does not. Every licence includes all nine agents. What changes is how you want to be billed: buy the capacity your quality needs, or bring your own model and pay per user."
      >
        <div className="mt-8">
          <TalkToSales />
        </div>
      </PageHero>

      <section className="py-16 sm:py-24">
        <div className="container-x">
          <Centered
            eyebrow="What you get"
            title="Every agent. Every module. Not a starter tier."
            body="There is no version of RabbitQA without requirement governance, and no tier where production monitoring is switched off. Whatever you sign, you get the whole lifecycle."
          />
          <Reveal className="card-surface mx-auto max-w-5xl overflow-hidden">
            <div className="grid md:grid-cols-3">
              {GROUPS.map((g, i) => (
                <div key={g.name} className={i > 0 ? 'border-t border-white/[0.07] p-7 md:border-t-0 md:border-l' : 'p-7'}>
                  <h3 className="font-display text-lg font-semibold text-white">{g.name}</h3>
                  <p className="text-sm text-brand-200">{g.sub}</p>
                  <div className="hairline my-5" />
                  <ul className="flex flex-col gap-4">
                    {g.items.map(([name, sub]) => (
                      <li key={name} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 size-4 flex-shrink-0 text-brand-300" />
                        <div>
                          <p className="text-sm font-medium text-white">{name}</p>
                          <p className="text-xs text-white/50">{sub}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start justify-between gap-4 border-t border-white/[0.07] bg-white/[0.02] px-7 py-5 sm:flex-row sm:items-center">
              <p className="text-sm text-white/60">Sized to the volume of work your team does, not to the number of people doing it.</p>
              <TalkToSales className="btn-primary !h-10 !px-5" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-x">
          <Centered eyebrow="Licensing" title="Choose how you want to be billed, not which features you get." />
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
            {LICENSING.map((l, i) => (
              <Reveal key={l.title} delay={i * 0.08} className="card-surface p-7 sm:p-8">
                <h3 className="font-display text-xl font-semibold text-white">{l.title}</h3>
                <div className="mt-5 flex flex-col gap-4">
                  {l.points.map((p) => (
                    <p key={p.slice(0, 30)} className="text-[15px] leading-relaxed text-white/60">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-x">
          <Centered eyebrow="Deployment" title="Cloud or your own infrastructure. Same platform, same agents." />
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
            {DEPLOYMENT.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.08} className="card-surface p-7 sm:p-8">
                <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-brand-500/35 to-transparent">
                  <d.icon className="size-5 text-brand-100" />
                </span>
                <h3 className="font-display mt-5 text-xl font-semibold text-white">{d.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/60">{d.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mx-auto mt-6 max-w-3xl text-center text-white/55">
            Both deployment options work with either licensing model. That is four combinations, and the right one usually becomes obvious in the first conversation.
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-x">
          <Centered eyebrow="Add-ons" title="Three modules priced separately." />
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
            {ADDONS.map((a, i) => {
              const m = moduleById[a.id];
              return (
                <Reveal key={a.id} delay={i * 0.08} className="card-surface flex flex-col p-7">
                  <span className="grid size-12 place-items-center rounded-2xl bg-iris/15 ring-1 ring-iris/30 ring-inset">
                    <m.icon className="size-5 text-fuchsia-300" />
                  </span>
                  <h3 className="font-display mt-5 text-xl font-semibold text-white">{m.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/60">{a.body}</p>
                  <div className="mt-auto flex items-center gap-4 pt-6">
                    <TalkToSales className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-200 hover:text-white" />
                    <Link to={`/modules/${a.id}`} className="text-sm text-white/50 hover:text-white">
                      Explore
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="mx-auto mt-6 max-w-3xl text-center text-white/55">
            These three carry real infrastructure behind them: a device fleet, a browser grid, an accessibility engine. They are priced on what you use rather than folded into a licence you may not need them in.
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <Reveal className="container-x">
          <div className="card-surface mx-auto max-w-5xl p-8 text-center sm:p-12">
            <h2 className="h-display mx-auto max-w-3xl text-3xl sm:text-4xl">Four combinations do not fit on a pricing card.</h2>
            <p className="mx-auto mt-5 max-w-3xl leading-relaxed text-white/60">
              Your number depends on how you want to be billed, where it runs, how large your suite is and which modules you need. A published table would either be wrong for most companies or so hedged it tells you nothing.
            </p>
            <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-white/60">
              What you get in the first call: the model that fits, the package size your suite actually needs, and a number you can take to finance. Not a range, and not a discovery process spread across three meetings.
            </p>
            <h3 className="font-display mt-10 text-2xl font-semibold text-white">Bring your quality estate. We will price it in one call.</h3>
            <p className="mt-2 text-white/55">No capability locked one plan above you, no surprise invoice, no procurement maze.</p>
            <div className="mt-7 flex justify-center">
              <TalkToSales />
            </div>
          </div>
        </Reveal>
      </section>

      <Faq items={FAQS} eyebrow="Questions" title="What teams ask before the call." />

      <Contact />
    </>
  );
}
