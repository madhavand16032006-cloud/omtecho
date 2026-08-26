import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  Palette, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  Headphones, 
  ArrowRight, 
  CheckCircle2,
  Workflow
} from 'lucide-react';

export const DevelopmentProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      number: '01',
      title: 'Discover & Blueprint',
      shortDesc: "Understand the client's idea and requirements.",
      fullDesc: 'We deeply analyze your business objectives, target users, technical constraints, and data models to formulate a rock-solid scope blueprint and sprint schedule.',
      icon: Compass,
      deliverables: ['Requirements Specification (SRS)', 'Architecture Diagram', 'Milestone & Budget Roadmap']
    },
    {
      number: '02',
      title: 'Design & Prototyping',
      shortDesc: 'Create the user experience and interface.',
      fullDesc: 'We craft high-fidelity Figma prototypes, interactive wireframes, and design systems with mathematical spacing, refined typography, and responsive micro-interactions.',
      icon: Palette,
      deliverables: ['Clickable Figma Prototypes', 'Design System & Component Library', 'User Journey Maps']
    },
    {
      number: '03',
      title: 'Develop & Engineer',
      shortDesc: 'Build the product using modern technologies.',
      fullDesc: 'Our engineers write type-safe TypeScript, performant React/Next.js frontends, scalable Node/Express or Go backends, and robust database schemas with continuous code reviews.',
      icon: Code2,
      deliverables: ['Clean TypeScript Codebase', 'API Layer & Auth Integration', 'Live Staging Previews']
    },
    {
      number: '04',
      title: 'Test & Harden',
      shortDesc: 'Test performance, security and usability.',
      fullDesc: 'We run end-to-end user journeys, OWASP vulnerability scans, database indexing audits, and sub-second Lighthouse performance optimizations.',
      icon: ShieldCheck,
      deliverables: ['Automated Test Suite', 'Security & Penetration Audit', '95+ Lighthouse Score']
    },
    {
      number: '05',
      title: 'Launch & Deploy',
      shortDesc: 'Deploy the solution to production.',
      fullDesc: 'We configure zero-downtime CI/CD deployment pipelines, automated SSL certificates, CDN caching, database replication, and real-time monitoring telemetry.',
      icon: Rocket,
      deliverables: ['Cloud Infrastructure Setup', 'Domain & SSL Provisioning', 'Production Handover']
    },
    {
      number: '06',
      title: 'Support & Scale',
      shortDesc: 'Maintain and improve the product.',
      fullDesc: 'We monitor production uptime 24/7, deploy regular feature enhancements, assist with user feedback analytics, and scale your cloud systems seamlessly.',
      icon: Headphones,
      deliverables: ['SLA Uptime Guarantee', 'Continuous Feature Sprints', 'Analytics & Growth Tuning']
    }
  ];

  return (
    <section id="development-process-section" className="py-20 bg-slate-900/30 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
            <Workflow className="w-3.5 h-3.5 text-indigo-400" />
            <span>Proven 6-Stage Delivery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            How We Build & Ship Software
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            From raw concept to scaled deployment, our structured workflow eliminates guesswork and ensures predictable, on-time delivery with zero surprises.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            const isSelected = activeStep === idx;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500/60 shadow-xl shadow-indigo-950/50 -translate-y-1 ring-1 ring-indigo-500/30'
                    : 'bg-slate-900/50 hover:bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="font-mono text-2xl font-black text-indigo-500/80">
                      {step.number}
                    </span>
                    <div className={`p-2.5 rounded-xl border ${
                      isSelected 
                        ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50' 
                        : 'bg-slate-800/80 text-slate-400 border-slate-700/60'
                    }`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {step.fullDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider font-mono mb-2">
                    Key Outcomes:
                  </p>
                  <ul className="space-y-1.5">
                    {step.deliverables.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
