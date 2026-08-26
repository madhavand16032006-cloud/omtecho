import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Layout, 
  Layers, 
  Clock, 
  ShieldCheck, 
  Headphones, 
  Boxes, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const WhyOmtecho: React.FC = () => {
  const pillars = [
    {
      title: 'Modern Technology Stack',
      description: 'We build with React 19, TypeScript, Node.js, Express, MongoDB, Tailwind CSS, and Gemini AI. Zero outdated legacy frameworks.',
      icon: Zap,
      accent: 'from-blue-500/20 to-indigo-500/20 text-indigo-400'
    },
    {
      title: 'User-Centered Design',
      description: 'Pixel-perfect typography, intuitive micro-interactions, responsive mobile ergonomics, and strict WCAG accessibility standards.',
      icon: Layout,
      accent: 'from-purple-500/20 to-pink-500/20 text-purple-400'
    },
    {
      title: 'Scalable Cloud Architecture',
      description: 'Microservices, serverless workloads, sub-second Redis caching, and resilient database indexing built to handle millions of queries.',
      icon: Layers,
      accent: 'from-teal-500/20 to-emerald-500/20 text-teal-400'
    },
    {
      title: 'Rapid Development Velocity',
      description: 'Pre-tested modular design components and reusable backend primitives allow us to launch production MVPs in weeks, not quarters.',
      icon: Clock,
      accent: 'from-amber-500/20 to-orange-500/20 text-amber-400'
    },
    {
      title: 'Reliable & Battle-Tested Solutions',
      description: 'Because we run our own live products, every architecture pattern we recommend has already been tested in high-concurrency production.',
      icon: ShieldCheck,
      accent: 'from-emerald-500/20 to-teal-500/20 text-emerald-400'
    },
    {
      title: 'Dedicated Long-Term Support',
      description: 'We do not abandon you after deployment. We offer proactive maintenance, security patches, SLA monitoring, and scaling advisory.',
      icon: Headphones,
      accent: 'from-indigo-500/20 to-violet-500/20 text-indigo-400'
    }
  ];

  return (
    <section id="why-omtecho-section" className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>The Studio Advantage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Why Visionary Teams Choose OMTECHO
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            We are not just another development agency. We are a product lab and technology studio that treats your software with the same care and engineering rigour as our own proprietary tools.
          </p>
        </div>

        {/* 6 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, i) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:shadow-indigo-950/30 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.accent} border border-white/10 flex items-center justify-center mb-5`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dual Strength Infobox */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/60 border border-indigo-500/30 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold mb-2 block">
              The Dual-Track Studio Model
            </span>
            <h3 className="text-2xl font-bold text-white mb-3">
              In-House Innovation Meets Client Delivery
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Most software agencies only execute client briefs without experiencing the long-term operational pains of running SaaS products. At OMTECHO, we invent our own software products, so we know firsthand how to handle billing, API reliability, zero-downtime upgrades, and user retention.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <Boxes className="w-6 h-6 text-indigo-400 mb-2" />
              <h4 className="text-sm font-bold text-white mb-1">Product Studio</h4>
              <p className="text-xs text-slate-400">Continuous R&D in AI tools, SaaS engines, and cloud frameworks.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <Layers className="w-6 h-6 text-purple-400 mb-2" />
              <h4 className="text-sm font-bold text-white mb-1">Service Studio</h4>
              <p className="text-xs text-slate-400">Tailored custom software development for clients and startups globally.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
