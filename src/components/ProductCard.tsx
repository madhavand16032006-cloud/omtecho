import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  Github, 
  Sparkles, 
  MessageCircle, 
  Activity, 
  Clock, 
  Layers, 
  ExternalLink,
  Flame
} from 'lucide-react';
import { Product, ProductStatus } from '../types';
import { buildWhatsAppLink } from '../lib/api';

interface ProductCardProps {
  product: Product;
  companyWhatsApp?: string;
  onSelect?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  companyWhatsApp = '8122580372',
  onSelect 
}) => {
  const getStatusBadge = (status: ProductStatus) => {
    switch (status) {
      case 'Live':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Platform
          </span>
        );
      case 'Coming Soon':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40 text-[11px] font-semibold">
            <Clock className="w-3 h-3 text-amber-400" />
            Coming Soon
          </span>
        );
      case 'In Development':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-950/80 text-purple-300 border border-purple-500/40 text-[11px] font-semibold">
            <Activity className="w-3 h-3 text-purple-400" />
            In Active R&D
          </span>
        );
      default:
        return null;
    }
  };

  const waInquiryUrl = buildWhatsAppLink(
    companyWhatsApp,
    `Hello OMTECHO, I am interested in your proprietary product "${product.name}". Please provide more technical details and access/pricing.`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 backdrop-blur-md overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-indigo-950/40 hover:-translate-y-1 shadow-sm"
    >
      {/* Product Image Cover */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
        <img
          src={product.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 dark:opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-slate-950 via-transparent to-transparent" />

        {/* Status & Badge Overlays */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {getStatusBadge(product.status)}
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full bg-indigo-950/90 text-indigo-300 border border-indigo-500/40 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              {product.badge}
            </span>
          )}
        </div>

        {product.metrics && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono text-slate-200">
            {product.metrics}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
              {product.category}
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors mb-1.5">
            {product.name}
          </h3>

          {product.tagline && (
            <p className="text-xs text-indigo-600/90 dark:text-indigo-200/80 font-medium mb-3">
              {product.tagline}
            </p>
          )}

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-5">
            {product.description}
          </p>
        </div>

        <div>
          {/* Tech stack chips */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {product.technologies.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50 text-[11px] font-mono"
              >
                {tech}
              </span>
            ))}
            {product.technologies.length > 4 && (
              <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 text-[10px] font-mono">
                +{product.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {product.productUrl && product.status === 'Live' && (
                <a
                  href={product.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
                >
                  <span>Launch Product</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              <a
                href={waInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Ask on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Enquire</span>
              </a>
            </div>

            {product.githubUrl && (
              <a
                href={product.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="View Source on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
