import React from 'react';
import { 
  ArrowUpRight, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Youtube, 
  ShieldCheck, 
  Sparkles,
  Heart,
  ExternalLink
} from 'lucide-react';
import { OmtechoLogo } from './OmtechoLogo';
import { CompanySettings } from '../types';
import { buildWhatsAppLink, buildMailtoLink } from '../lib/api';

interface FooterProps {
  settings: CompanySettings | null;
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigate }) => {
  const companyName = 'Omtecho';
  const tagline = 'Build. Launch. Grow.';
  const subtagline = 'Service & Product Studio';
  const phone = settings?.primaryWhatsApp || '8122580372';
  const email = settings?.primaryEmail || 'omtecho.tech@gmail.com';
  const address = settings?.address || 'Tech Innovation Hub & Remote Global Delivery';

  const waUrl = buildWhatsAppLink(phone, `Hello Omtecho, I would like to enquire about your technology studio services.`);
  const mailUrl = buildMailtoLink(email, `Inquiry for Omtecho Studio`, `Hello Omtecho Team,\n\nI want to discuss a new software project.\n\nThank you!`);

  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="relative bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 pt-20 pb-12 border-t border-slate-200 dark:border-slate-800/80 overflow-hidden transition-colors">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-indigo-500/5 dark:bg-indigo-900/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-slate-200 dark:border-slate-800/60">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <button 
              onClick={() => onNavigate('home')} 
              className="text-left focus:outline-none flex items-center"
            >
              <OmtechoLogo size="lg" showSubtitle={true} />
            </button>

            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-sm">
              We design and develop modern websites, web applications and digital products for businesses and startups.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Architecting in-house digital products and delivering bespoke web, AI, SaaS, and cloud software engineering.
            </p>

            {/* Direct Contact Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                id="footer-whatsapp-link"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: +{phone}</span>
              </a>

              <a
                id="footer-email-link"
                href={mailUrl}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-300 dark:border-indigo-500/30 text-indigo-800 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{email}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Digital Products */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4 font-mono">
              In-House Products
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('products')} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>DevPulse AI Engine</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>DocuMorph SaaS</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>OmniCart Engine</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>AegisShield Security</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold pt-1 flex items-center gap-1">
                  <span>View All Products</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Studio Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4 font-mono">
              Tech Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('services')} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  Web Application Development
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  MERN Stack Engineering
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  AI-Powered Applications
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  UI/UX & Product Design
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  E-Commerce Systems
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  Custom Software & Cloud
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links & Location */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4 font-mono">
              Studio & Hub
            </h4>
            <ul className="space-y-2.5 text-xs mb-4">
              <li>
                <button onClick={() => onNavigate('projects')} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  Case Studies & Projects
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('offers')} className="text-amber-600 dark:text-amber-300 hover:text-amber-700 dark:hover:text-amber-200 transition-colors text-left font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Latest Special Offers</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  About OMTECHO
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  Contact & Quotation
                </button>
              </li>
            </ul>

            <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <span>{address}</span>
            </div>
          </div>
        </div>

        {/* Bottom Social & Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <span>© {currentYear} {companyName}. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-600">•</span>
            <span className="hidden sm:inline text-slate-500">Engineered with precision for global builders</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {settings?.socialLinks?.github && (
              <a
                href={settings.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors shadow-sm"
                aria-label="OMTECHO GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {settings?.socialLinks?.linkedin && (
              <a
                href={settings.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors shadow-sm"
                aria-label="OMTECHO LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {settings?.socialLinks?.twitter && (
              <a
                href={settings.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors shadow-sm"
                aria-label="OMTECHO Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {settings?.socialLinks?.instagram && (
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors shadow-sm"
                aria-label="OMTECHO Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {settings?.socialLinks?.youtube && (
              <a
                href={settings.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors shadow-sm"
                aria-label="OMTECHO YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={() => onNavigate('admin')}
              className="ml-3 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] text-slate-700 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Owner Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
