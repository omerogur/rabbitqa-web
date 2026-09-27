import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/Closing';
import Nav from './components/Nav';
import Home from './pages/Home';
import ModulePage from './pages/ModulePage';
import ModulesPage from './pages/ModulesPage';
import CapabilitiesPage from './pages/CapabilitiesPage';
import PricingPage from './pages/PricingPage';
import { BlogPage, BlogPostPage, ComparePage, FaqPage, ResourcesPage } from './pages/ResourcesPages';
import { AboutPage, CertificationsPage, ContactPage, NewsDetailPage, NewsPage, PartnerPage } from './pages/CompanyPages';
import { AgentDetailPage, AgentsPage } from './pages/AgentsPages';
import { IndustriesPage, IndustryDetailPage } from './pages/IndustryPages';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
      return () => clearTimeout(id);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    return undefined;
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div className="relative">
      <ScrollManager />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modules" element={<ModulesPage />} />
          <Route path="/modules/:id" element={<ModulePage />} />
          <Route path="/capabilities" element={<CapabilitiesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/category/:slug" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsDetailPage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/agents/:slug" element={<AgentDetailPage />} />
          <Route path="/industry-solutions" element={<IndustriesPage />} />
          <Route path="/industry-solutions/:slug" element={<IndustryDetailPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
