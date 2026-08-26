import React from 'react';
import { 
  Code2, 
  Database, 
  Sparkles, 
  Layers, 
  Cpu, 
  Terminal, 
  ShieldCheck, 
  CheckCheck,
  Boxes,
  Workflow
} from 'lucide-react';

export const TrustTechStrip: React.FC = () => {
  const techPills = [
    { name: 'React 19', category: 'Frontend' },
    { name: 'Next.js', category: 'Framework' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Node.js & Express', category: 'Backend' },
    { name: 'MongoDB (MERN)', category: 'Database' },
    { name: 'Gemini AI API', category: 'Intelligence' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'PostgreSQL', category: 'Relational DB' },
    { name: 'Docker & Cloud', category: 'DevOps' },
    { name: 'Stripe & PayPal', category: 'Commerce' },
    { name: 'Redis Caching', category: 'Speed' },
    { name: 'REST & GraphQL', category: 'API Design' }
  ];

  return (
    <section id="tech-strip-section" className="py-12 bg-slate-900/30 border-y border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Workflow className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wide">
                Production-Grade Engineering Stack
              </h3>
              <p className="text-xs text-slate-400">
                Architected for high throughput, sub-second latency, and enterprise scalability
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
              <Boxes className="w-3.5 h-3.5 text-indigo-400" />
              <span>In-House Products</span>
            </span>
            <span className="text-slate-600">+</span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Client Solutions</span>
            </span>
          </div>
        </div>

        {/* Tech Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {techPills.map((tech, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-indigo-500/40 transition-all flex flex-col items-start gap-1 group"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
                  {tech.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 group-hover:bg-indigo-400" />
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
