import AgentsFlow from '../components/AgentsFlow';
import Capabilities from '../components/Capabilities';
import Contact from '../components/Contact';
import Hero from '../components/Hero';
import Industries from '../components/Industries';
import ModulesBand from '../components/ModulesBand';
import Proof from '../components/Proof';

export default function Home() {
  return (
    <>
      <Hero />
      <Capabilities />
      <AgentsFlow />
      <ModulesBand />
      <Industries />
      <Proof />
      <Contact />
    </>
  );
}
