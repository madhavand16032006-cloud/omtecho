import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  Sparkles, 
  Boxes, 
  Layers, 
  Briefcase, 
  MessageCircle, 
  Mail, 
  ShieldCheck, 
  Flame, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Product, Service, Project, Offer, CompanySettings } from '../types';
import { Hero } from '../components/Hero';
import { TrustTechStrip } from '../components/TrustTechStrip';
import { ProductCard } from '../components/ProductCard';
import { ServiceCard } from '../components/ServiceCard';
import { ProjectCard } from '../components/ProjectCard';
import { OffersSection } from '../components/OffersSection';
import { DevelopmentProcess } from '../components/DevelopmentProcess';
import { WhyOmtecho } from '../components/WhyOmtecho';
import { FounderSection } from '../components/FounderSection';
import { ProjectDetailsModal } from './ProjectDetailsModal';

interface HomePageProps {
  products: Product[];
  services: Service[];
  projects: Project[];
  offers: Offer[];
  settings: CompanySettings | null;
  onNavigate: (view: string, targetParam?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  services,
  projects,
  offers,
  settings,
  onNavigate
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Top featured items for homepage
  const featuredProducts = products.filter((p) => p.featured || p.status === 'Live').slice(0, 3);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const topServices = services.slice(0, 6);

  return (
    <div id="home-page-container" className="space-y-0">
      {/* 1. Hero Section */}
      <Hero
        settings={settings}
        onNavigate={onNavigate}
        onExploreWork={() => onNavigate('projects')}
        onContactUs={() => onNavigate('contact')}
      />

      {/* 2. Production Tech Ecosystem Strip */}
      <TrustTechStrip />

      {/* 3. In-House Products Incubator */}
      <section id="home-products-section" className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
                <Boxes className="w-3.5 h-3.5 text-indigo-400" />
                <span>Proprietary Software</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Our Digital Products
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl">
                We design, code, and deploy our own SaaS platforms, AI copilots, and developer frameworks.
              </p>
            </div>

            <button
              onClick={() => onNavigate('products')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-indigo-300 hover:text-white transition-all w-fit"
            >
              <span>Explore All Products</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                companyWhatsApp={settings?.primaryWhatsApp}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Client Technology Services */}
      <section id="home-services-section" className="py-24 bg-slate-900/40 border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>End-to-End Engineering</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Technology Services
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl">
                From initial architecture to cloud scaling, we build robust digital solutions for visionary founders and businesses.
              </p>
            </div>

            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-purple-300 hover:text-white transition-all w-fit"
            >
              <span>View All Services</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                companyWhatsApp={settings?.primaryWhatsApp}
                onRequestQuote={(s) => onNavigate('contact', s.title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Dynamic Projects & Case Studies */}
      <section id="home-projects-section" className="py-24 bg-slate-950 border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                <span>Featured Client Work</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Recent Projects & Deliveries
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl">
                Explore real case studies with direct WhatsApp inquiry links and live preview links.
              </p>
            </div>

            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-emerald-300 hover:text-white transition-all w-fit"
            >
              <span>Explore Full Portfolio</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((proj) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                companyWhatsApp={settings?.primaryWhatsApp}
                companyEmail={settings?.primaryEmail}
                onOpenDetails={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        settings={settings}
        onClose={() => setSelectedProject(null)}
        onNavigateContact={(name) => {
          setSelectedProject(null);
          onNavigate('contact', name);
        }}
      />

      {/* 6. Dynamic Limited-Time Offers */}
      <OffersSection
        offers={offers}
        settings={settings}
        onNavigateContact={(offerTitle) => onNavigate('contact', `Offer: ${offerTitle}`)}
      />

      {/* 7. 6-Step Development Process */}
      <DevelopmentProcess />

      {/* 8. Founder Section */}
      <FounderSection settings={settings} onNavigate={onNavigate} />

      {/* 9. Why OMTECHO 6-Pillar Philosophy */}
      <WhyOmtecho />

      {/* 10. High-Impact Closing CTA Banner */}
      <section id="home-cta-section" className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-purple-900/60 border border-indigo-500/30 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-3xl pointer-events-none rounded-full" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                Start Your Next Build Today
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                Have an idea? Let's turn it into a high-performance reality.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Whether you need a full SaaS platform, an AI tool integration, or a fast-loading business website, OMTECHO delivers on time with zero technical debt.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all flex items-center gap-2"
                >
                  <span>Start a Free Project Discovery</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('projects')}
                  className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm transition-colors border border-slate-700"
                >
                  <span>View Our Deliveries</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
