import React from 'react';
import { motion } from 'motion/react';
import { 
  Info, 
  Boxes, 
  Layers, 
  Target, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  ShieldCheck, 
  Cpu, 
  HeartHandshake
} from 'lucide-react';
import { CompanySettings } from '../types';
import { FounderSection } from '../components/FounderSection';

interface AboutPageProps {
  settings: CompanySettings | null;
  onNavigate: (view: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ settings, onNavigate }) => {
  const companyName = settings?.companyName || 'OMTECHO';
  const about = settings?.about || {
    heading: 'Engineering the future of digital software & client transformation.',
    productDevText: 'We conceive, architect, and ship proprietary digital products, scalable SaaS platforms, and AI-driven utilities engineered to solve real-world industry bottlenecks.',
    techServicesText: 'We partner with ambitious startups, global enterprises, and forward-looking teams to build tailored software solutions, high-scale web platforms, and mobile experiences.',
    mission: 'To bridge visionary ideas with cutting-edge software craft, empowering companies and digital creators with tools that scale reliably.',
    vision: 'To be the world’s trusted boutique product and technology studio celebrated for aesthetic elegance, engineering rigor, and measurable client success.',
    foundedYear: '2024'
  };

  return (
    <div id="about-page" className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-4">
            <Info className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>About The Studio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            We Are <span className="text-indigo-600 dark:text-indigo-400">{companyName}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
            {about.heading}
          </p>
        </div>

        {/* Dual Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Pillar 1: Product Development */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 w-fit mb-6">
                <Boxes className="w-8 h-8" />
              </div>

              <span className="text-xs uppercase font-mono tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold mb-2 block">
                Track 01 — Proprietary R&D
              </span>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Product Development
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {about.productDevText}
              </p>
            </div>

            <button
              onClick={() => onNavigate('products')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 flex items-center gap-1.5 pt-4 border-t border-slate-100 dark:border-slate-800"
            >
              <span>Explore In-House Product Line</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pillar 2: Technology Services */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="p-3.5 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 w-fit mb-6">
                <Layers className="w-8 h-8" />
              </div>

              <span className="text-xs uppercase font-mono tracking-wider text-purple-600 dark:text-purple-400 font-semibold mb-2 block">
                Track 02 — Client Engineering
              </span>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Technology Services
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {about.techServicesText}
              </p>
            </div>

            <button
              onClick={() => onNavigate('services')}
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 flex items-center gap-1.5 pt-4 border-t border-slate-100 dark:border-slate-800"
            >
              <span>View Client Engineering Services</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-start gap-4 shadow-sm">
            <div className="p-3 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {about.mission}
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-start gap-4 shadow-sm">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shrink-0">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {about.vision}
              </p>
            </div>
          </div>
        </div>

        {/* Studio Culture & Values */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-md mb-16 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Our Core Studio Philosophy
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
              <div className="font-mono text-indigo-600 dark:text-indigo-400 text-sm font-bold mb-2">01 / Craftsmanship</div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">No Generic Templates</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Every application is custom architected with clean design systems, strict TypeScript types, and mathematical visual balance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
              <div className="font-mono text-purple-600 dark:text-purple-400 text-sm font-bold mb-2">02 / Transparency</div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">Zero Black Boxes</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                You get direct communication with the engineers building your product. Clear sprint demos, predictable timelines, and no middleman fluff.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
              <div className="font-mono text-emerald-600 dark:text-emerald-400 text-sm font-bold mb-2">03 / Longevity</div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">Built to Scale</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                We write maintainable, modular software ready for continuous deployments, high traffic bursts, and future feature expansions.
              </p>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="mb-16">
          <FounderSection settings={settings} onNavigate={onNavigate} />
        </div>

        {/* Bottom CTA */}
        <div className="text-center p-10 rounded-3xl bg-gradient-to-r from-indigo-100 via-slate-100 to-purple-100 dark:from-indigo-950/50 dark:via-slate-900 dark:to-purple-950/50 border border-indigo-200 dark:border-indigo-500/30 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Ready to build something exceptional?</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto mb-6">
            Whether you need a full SaaS build, an AI copilot integration, or a fast-track business website, let’s talk.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/25 hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <span>Start a Project with OMTECHO</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
