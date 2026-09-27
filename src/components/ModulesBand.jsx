import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { contentById, moduleById } from '../data/modules';
import { ACCESSIBILITY_FLOW, MOBILEHUB_FLOW } from '../data/scenes';
import LiveScreen from './LiveScreen';
import { Reveal, SectionHeading } from './primitives';

// Same cards and copy as the corporate site's "Platform Modules" section; the
// visual on the right is the live product tour instead of a drawn mock-up.
const CARDS = [
  {
    id: 'mobilehub',
    body: 'Test on 150+ real iOS and Android devices in the cloud, native, web, and hybrid with no in-house device lab to maintain.',
    scenes: MOBILEHUB_FLOW,
  },
  {
    id: 'accessibility',
    body: 'WCAG 2.2 and European Accessibility Act (EAA) checks wired into CI/CD, with JAWS, NVDA, and VoiceOver coverage.',
    scenes: ACCESSIBILITY_FLOW,
  },
];

export default function ModulesBand() {
  return (
    <section id="modules" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Platform Modules"
          title="Four modules,"
          accent="not four vendor contracts."
          body="The coverage most teams procure separately, included as modules rather than a second procurement cycle."
        />

        <div className="mt-14 flex flex-col gap-5">
          {CARDS.map((c) => {
            const m = moduleById[c.id];
            return (
              <Reveal key={c.id} className="card-surface grid items-center gap-8 p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] lg:gap-12">
                <div className="min-w-0">
                  <span className="grid size-12 place-items-center rounded-2xl bg-iris/15 ring-1 ring-iris/30 ring-inset">
                    <m.icon className="size-6 text-fuchsia-300" />
                  </span>
                  <h3 className="font-display mt-6 text-3xl font-semibold tracking-tight text-white">{m.name}</h3>
                  <p className="mt-1.5 font-medium text-fuchsia-300">{contentById[c.id]?.tagline}</p>
                  <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">{c.body}</p>
                  <Link
                    to={`/modules/${c.id}`}
                    className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-brand-200 transition-colors hover:text-white"
                  >
                    Explore {m.name} <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="min-w-0">
                  <LiveScreen scenes={c.scenes} />
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <Link to="/modules" className="btn-primary !h-12 !px-7">
            Discover All Modules <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
