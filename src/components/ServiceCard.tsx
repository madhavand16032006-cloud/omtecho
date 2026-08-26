import React from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  Layers, 
  Sparkles, 
  Layout, 
  ShoppingCart, 
  Cpu, 
  ShieldCheck, 
  Smartphone, 
  ArrowUpRight, 
  Check, 
  MessageCircle,
  LucideIcon
} from 'lucide-react';
import { Service } from '../types';
import { buildWhatsAppLink } from '../lib/api';

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Layers,
  Sparkles,
  Layout,
  ShoppingCart,
  Cpu,
  ShieldCheck,
  Smartphone
};

interface ServiceCardProps {
  service: Service;
  companyWhatsApp?: string;
  onRequestQuote: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  companyWhatsApp = '8122580372',
  onRequestQuote 
}) => {
  const IconComponent = iconMap[service.icon] || Layers;

  const waInquiryUrl = buildWhatsAppLink(
    companyWhatsApp,
    `Hello OMTECHO, I would like to inquire about your "${service.title}" service and get an estimate for my project.`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 p-7 backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-indigo-950/40 hover:-translate-y-1 shadow-sm"
    >
      <div>
        {/* Top Icon & Pricing Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-gradient-to-br dark:from-indigo-500/20 dark:to-purple-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 group-hover:scale-105 transition-transform">
            <IconComponent className="w-6 h-6" />
          </div>

          {service.pricingStartingAt && (
            <div className="text-right">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono">Starts from</span>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">{service.pricingStartingAt}</p>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors mb-2.5">
          {service.title}
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          {service.shortDescription}
        </p>

        {/* Deliverables List */}
        {service.deliverables && service.deliverables.length > 0 && (
          <div className="mb-6 space-y-2">
            <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
              Key Deliverables:
            </p>
            {service.deliverables.slice(0, 4).map((del, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <span>{del}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        {/* Technologies List */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 mb-5">
          <div className="flex flex-wrap gap-1.5">
            {service.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[10px] font-mono border border-slate-200 dark:border-slate-700/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onRequestQuote(service)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5"
          >
            <span>Request Service</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={waInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center justify-center transition-colors"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
