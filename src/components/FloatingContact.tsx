import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Mail, MessageSquare, X, ChevronUp, Sparkles } from 'lucide-react';
import { CompanySettings } from '../types';
import { buildWhatsAppLink, buildMailtoLink } from '../lib/api';

interface FloatingContactProps {
  settings?: CompanySettings | null;
  whatsappNumber?: string;
  email?: string;
  onOpenContact?: () => void;
}

export const FloatingContact: React.FC<FloatingContactProps> = ({ 
  settings = null,
  whatsappNumber,
  email: propEmail,
  onOpenContact
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const phone = whatsappNumber || settings?.primaryWhatsApp || '8122580372';
  const email = propEmail || settings?.primaryEmail || 'omtecho.tech@gmail.com';

  const defaultWaMessage = `Hello ${settings?.companyName || 'OMTECHO'}, I am interested in building a digital product/software project with your studio. Please provide more information.`;
  const defaultEmailSubject = `Enquiry about ${settings?.companyName || 'OMTECHO'} Digital Solutions`;
  const defaultEmailBody = `Hello ${settings?.companyName || 'OMTECHO'} Team,\n\nI came across your studio and would like to discuss a potential software development project.\n\nPlease share your availability for a discovery conversation.\n\nThank you!`;

  const waUrl = buildWhatsAppLink(phone, defaultWaMessage);
  const mailtoUrl = buildMailtoLink(email, defaultEmailSubject, defaultEmailBody);

  return (
    <div id="floating-contact-container" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Expanded Quick Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="floating-contact-popup"
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="w-72 p-4 rounded-2xl bg-white dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700/80 shadow-2xl shadow-black/20 dark:shadow-black/80 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-semibold text-slate-900 dark:text-white tracking-wide">Studio Online</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close Contact Widget"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 text-left">
              Connect directly with our engineering and design leads:
            </p>

            <div className="flex flex-col gap-2">
              {/* WhatsApp Option */}
              <a
                id="floating-whatsapp-btn"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-600/20 hover:bg-emerald-100 dark:hover:bg-emerald-600/30 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-emerald-200 text-xs font-semibold transition-all group shadow-sm"
              >
                <div className="p-1.5 rounded-lg bg-emerald-500 text-white dark:text-slate-950 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <div className="flex flex-col text-left">
                  <span>Chat on WhatsApp</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400/80 font-normal">Instant 5-Min Response</span>
                </div>
              </a>

              {/* Email Option */}
              <a
                id="floating-email-btn"
                href={mailtoUrl}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-600/20 hover:bg-indigo-100 dark:hover:bg-indigo-600/30 border border-indigo-300 dark:border-indigo-500/40 text-indigo-800 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-200 text-xs font-semibold transition-all group shadow-sm"
              >
                <div className="p-1.5 rounded-lg bg-indigo-500 text-white group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span>Send Direct Email</span>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400/80 font-normal">{email}</span>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        id="floating-main-trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 text-white shadow-xl shadow-emerald-500/25 border border-white/20 font-semibold text-xs transition-all group"
        aria-label="Direct Contact OMTECHO"
      >
        <div className="relative">
          <MessageSquare className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-pulse" />
        </div>
        <span className="hidden sm:inline">Connect with Studio</span>
        {isOpen ? <ChevronUp className="w-3.5 h-3.5 rotate-180 transition-transform" /> : <Sparkles className="w-3.5 h-3.5" />}
      </motion.button>
    </div>
  );
};
