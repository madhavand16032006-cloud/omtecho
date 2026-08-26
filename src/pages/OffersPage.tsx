import React from 'react';
import { motion } from 'motion/react';
import { 
  Tag, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Clock, 
  CheckCircle2, 
  MessageCircle, 
  ArrowUpRight 
} from 'lucide-react';
import { Offer, CompanySettings } from '../types';
import { OffersSection } from '../components/OffersSection';

interface OffersPageProps {
  offers: Offer[];
  settings: CompanySettings | null;
  onNavigate: (view: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({ 
  offers, 
  settings, 
  onNavigate 
}) => {
  return (
    <div id="offers-page" className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Render Main dynamic offers */}
        <OffersSection 
          offers={offers} 
          settings={settings} 
          onNavigateContact={(offerTitle) => onNavigate('contact')}
        />

        {/* Why our packages are different */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-sm">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            What Every OMTECHO Package Includes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 w-fit mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">Zero Technical Debt</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Clean TypeScript architectures, responsive Tailwind CSS styling, and strict error handling so you never need a rewrite.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 w-fit mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">Free 60-Day SLA Warranty</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We provide ongoing bug fixes, performance monitoring, and server scaling guarantees at no extra charge post-launch.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 w-fit mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">Rapid Turnaround Commitment</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Dedicated engineering sprints. We deliver on agreed milestones without scope creep or missed deadlines.
              </p>
            </div>
          </div>
        </div>

        {/* Custom package request banner */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-r from-indigo-100 via-slate-100 to-purple-100 dark:from-indigo-950/40 dark:via-slate-900 dark:to-purple-950/40 border border-indigo-200 dark:border-indigo-500/30 shadow-sm">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Need a custom scope or tailored quotation?</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-4">
            If none of our standard packages fit your exact enterprise requirements, let's create a custom proposal.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-md inline-flex items-center gap-2"
          >
            <span>Request Custom Scope Estimate</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
