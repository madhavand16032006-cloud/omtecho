import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  Sparkles, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Code2, 
  Zap, 
  CheckCircle2, 
  Terminal, 
  Activity,
  Boxes,
  Database
} from 'lucide-react';
import { CompanySettings } from '../types';

interface HeroProps {
  settings: CompanySettings | null;
  onNavigate?: (view: string) => void;
  onExploreWork?: () => void;
  onContactUs?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  settings, 
  onNavigate = (_view: string) => {},
  onExploreWork,
  onContactUs
}) => {
  const handleExplore = () => {
    if (onExploreWork) onExploreWork();
    else onNavigate('projects');
  };

  const handleContact = () => {
    if (onContactUs) onContactUs();
    else onNavigate('contact');
  };

  const handleProducts = () => {
    onNavigate('products');
  };
  const heroData = settings?.hero || {
    title: 'Building Products.',
    highlight: 'Delivering Digital Solutions.',
    subtitle: 'OMTECHO is a product and service technology studio building modern digital products, web applications, AI tools, and custom technology solutions for businesses and organizations.',
    primaryCta: 'Explore Our Work',
    secondaryCta: 'Start a Project',
    badgeText: '✨ Next-Gen Product & Service Studio'
  };

  const stats = settings?.stats || {
    productsBuilt: 5,
    projectsCompleted: 18,
    technologiesCount: 24,
    happyClients: 32,
    productsBuiltLabel: 'Products Built',
    productsBuiltSubtext: 'Proprietary SaaS & AI',
    projectsCompletedLabel: 'Projects Completed',
    projectsCompletedSubtext: 'Web, Mobile & Systems',
    technologiesLabel: 'Technologies',
    technologiesSubtext: 'Modern Tooling Stack',
    happyClientsLabel: 'Happy Clients',
    happyClientsSubtext: '99.4% Satisfaction',
    uptimePercentage: '99.98%',
    satisfactionRate: '99.4%'
  };

  return (
    <section id="hero-section" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Ambience & Grid */}
      <div className="absolute inset-0 grid-background pointer-events-none opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-teal-500/10 blur-[130px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Studio Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold tracking-wide mb-6 shadow-sm shadow-indigo-950/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Omtecho — Service & Product Studio</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
            >
              <span>Build.</span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 dark:from-indigo-400 dark:via-purple-300 dark:to-emerald-400">
                Launch.
              </span>{' '}
              <span>Grow.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mb-8"
            >
              We design and develop modern websites, web applications and digital products for businesses and startups.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto"
            >
              <button
                id="hero-start-project-btn"
                onClick={handleContact}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-indigo-400/30"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                id="hero-view-portfolio-btn"
                onClick={handleExplore}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-semibold text-sm border border-slate-200 dark:border-slate-700/80 shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all flex items-center justify-center gap-2"
              >
                <span>View Portfolio</span>
              </button>

              <button
                id="hero-view-products-btn"
                onClick={handleProducts}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 py-2 px-3"
              >
                <Boxes className="w-3.5 h-3.5" />
                <span>See In-House Products</span>
              </button>
            </motion.div>

            {/* Value Checkmarks */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>Proprietary Products + Client Services</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>MERN & Modern Cloud Architecture</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>AI-Powered Systems & Rapid MVPs</span>
              </div>
            </div>
          </div>

          {/* Right Visual Tech Studio Sandbox */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative p-1 rounded-2xl bg-gradient-to-b from-indigo-500/30 via-purple-500/20 to-slate-400/20 dark:to-slate-800/40 shadow-2xl"
            >
              <div className="rounded-xl bg-white/95 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 p-5 backdrop-blur-xl relative overflow-hidden shadow-xl">
                {/* Visual Window Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800">
                    <Terminal className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                    <span>omtecho-studio.ts</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                    <span>v2.5</span>
                  </div>
                </div>

                {/* Studio Live Telemetry Cards */}
                <div className="space-y-3 font-mono text-xs">
                  {/* Code snippet banner */}
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                    <p className="text-slate-400 dark:text-slate-500 text-[11px] mb-1">// OMTECHO Dual Engineering Engine</p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      const <span className="text-purple-600 dark:text-purple-300">studio</span> = new <span className="text-teal-600 dark:text-teal-300">OMTECHO</span>({'{'}
                    </p>
                    <p className="pl-4 text-slate-700 dark:text-slate-300">
                      products: [<span className="text-amber-600 dark:text-amber-300">'DevPulse AI'</span>, <span className="text-amber-600 dark:text-amber-300">'DocuMorph SaaS'</span>],
                    </p>
                    <p className="pl-4 text-slate-700 dark:text-slate-300">
                      services: [<span className="text-emerald-600 dark:text-emerald-300">'MERN'</span>, <span className="text-emerald-600 dark:text-emerald-300">'AI Applications'</span>, <span className="text-emerald-600 dark:text-emerald-300">'UI/UX'</span>],
                    </p>
                    <p className="pl-4 text-slate-700 dark:text-slate-300">
                      velocity: <span className="text-indigo-600 dark:text-indigo-300">'Continuous Delivery'</span>
                    </p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold">{'}'});</p>
                  </div>

                  {/* Interactive Status Badges */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 flex items-center gap-2.5">
                      <div className="p-2 rounded-md bg-indigo-100 dark:bg-indigo-600/30 text-indigo-600 dark:text-indigo-400">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Production Build</p>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">Sub-50ms Latency</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-2.5">
                      <div className="p-2 rounded-md bg-emerald-100 dark:bg-emerald-600/30 text-emerald-600 dark:text-emerald-400">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Cloud Uptime</p>
                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-300">{stats.uptimePercentage || '99.98%'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Floating AI & Full Stack Chip */}
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                      <span className="text-slate-700 dark:text-slate-300 font-sans">Gemini 2.5 + MERN Stack Ready</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 font-sans text-[10px] font-semibold">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dynamic Key Statistics Strip (Editable from Admin) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800/80"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 shadow-sm backdrop-blur-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-1 font-mono">
                {stats.productsBuilt}+
              </div>
              <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                {stats.productsBuiltLabel || 'Products Built'}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">{stats.productsBuiltSubtext || 'Proprietary SaaS & AI'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 shadow-sm backdrop-blur-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-1 font-mono">
                {stats.projectsCompleted}+
              </div>
              <p className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                {stats.projectsCompletedLabel || 'Projects Completed'}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">{stats.projectsCompletedSubtext || 'Web, Mobile & Systems'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 shadow-sm backdrop-blur-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-1 font-mono">
                {stats.technologiesCount}+
              </div>
              <p className="text-xs font-medium text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                {stats.technologiesLabel || 'Technologies'}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">{stats.technologiesSubtext || 'Modern Tooling Stack'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 shadow-sm backdrop-blur-sm text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-1 font-mono">
                {stats.happyClients}+
              </div>
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                {stats.happyClientsLabel || 'Happy Clients'}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">{stats.happyClientsSubtext || `${stats.satisfactionRate || '99.4%'} Satisfaction`}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
