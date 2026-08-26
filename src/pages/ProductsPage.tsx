import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Boxes, 
  Filter, 
  Sparkles, 
  Search, 
  ArrowUpRight, 
  CheckCircle2, 
  Layers, 
  Cpu
} from 'lucide-react';
import { Product, ProductStatus, CompanySettings } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ProductsPageProps {
  products: Product[];
  settings: CompanySettings | null;
  onNavigate: (view: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ 
  products, 
  settings, 
  onNavigate 
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesStatus && matchesSearch;
    });
  }, [products, selectedStatus, searchQuery]);

  return (
    <div id="products-page" className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-4">
            <Boxes className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Proprietary Tech Incubator</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Our Digital Products & Platforms
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            At OMTECHO, we build and maintain our own scalable SaaS platforms, developer utilities, and AI applications. Every product we deploy reflects our standard for reliability and code craftsmanship.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {['all', 'Live', 'In Development', 'Coming Soon'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedStatus === status
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {status === 'all' ? 'All Products' : status}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                companyWhatsApp={settings?.primaryWhatsApp}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 mb-16">
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">No products match your current filters.</p>
            <button
              onClick={() => {
                setSelectedStatus('all');
                setSearchQuery('');
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-indigo-100 via-slate-100 to-purple-100 dark:from-indigo-950/60 dark:via-slate-900 dark:to-purple-950/60 border border-indigo-200 dark:border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex flex-col gap-2 max-w-xl text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
              Want a custom version of our technology?
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              We License & Customize Our Software Architectures for Clients
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              If your company requires a dedicated deployment of any OMTECHO product engine, our engineering team can tailor the solution to your private cloud with custom integrations.
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-xl bg-indigo-600 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:bg-indigo-500 dark:hover:bg-slate-200 transition-colors shadow-lg flex items-center gap-2 shrink-0"
          >
            <span>Discuss Custom Deployment</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
