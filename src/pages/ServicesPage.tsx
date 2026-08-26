import React from 'react';
import { motion } from 'motion/react';
import { 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  MessageCircle, 
  Workflow, 
  ShieldCheck, 
  Clock, 
  Headphones
} from 'lucide-react';
import { Service, CompanySettings } from '../types';
import { ServiceCard } from '../components/ServiceCard';

interface ServicesPageProps {
  services: Service[];
  settings: CompanySettings | null;
  onNavigate: (view: string, serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ 
  services, 
  settings, 
  onNavigate 
}) => {
  const handleRequestQuote = (service: Service) => {
    onNavigate('contact', service.title);
  };

  return (
    <div id="services-page" className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-4">
            <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Full-Lifecycle Engineering</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Client Software & Technology Services
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            We partner with startups, scaleups, and visionary enterprises to design, build, and deploy production-grade software applications tailored to your exact business objectives.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              companyWhatsApp={settings?.primaryWhatsApp}
              onRequestQuote={handleRequestQuote}
            />
          ))}
        </div>

        {/* Service Guarantees Strip */}
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-md mb-16 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 text-center">
            The OMTECHO Engineering Standard
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">100% Code Ownership</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">Complete intellectual property, git history, and deployment scripts belong to you.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 shrink-0">
                <Workflow className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Agile Sprint Cadence</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">Weekly demo builds, clear staging links, and transparent milestone tracking.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Enterprise Security</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">Sanitized inputs, encrypted tokens, OWASP guidelines, and rigorous type-safety.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Post-Launch Support</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">Dedicated SLA maintenance, cloud scaling, and iterative feature sprints.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA banner */}
        <div className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-indigo-100 via-slate-100 to-purple-100 dark:from-indigo-900/40 dark:via-slate-900 dark:to-purple-900/30 border border-indigo-200 dark:border-indigo-500/30 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
            Have a project in mind?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed">
            Let's discuss your scope, tech stack requirements, and timeline. We provide transparent estimates within 24 hours.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <span>Request Free Architecture Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
