import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Menu, 
  X, 
  ArrowUpRight, 
  ShieldCheck, 
  Layers, 
  Briefcase, 
  Tag, 
  Info, 
  Send,
  Boxes,
  Sun,
  Moon,
  Lock,
  Phone,
  UserCheck
} from 'lucide-react';
import { OmtechoLogo } from './OmtechoLogo';
import { CompanySettings } from '../types';
import { authStorage } from '../lib/api';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentView?: string;
  activeView?: string;
  onNavigate?: (view: string, param?: string) => void;
  settings?: CompanySettings | null;
  offersCount?: number;
  isAuthenticated?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  activeView, 
  onNavigate = (_view: string, _param?: string) => {}, 
  settings = null,
  offersCount,
  isAuthenticated
}) => {
  const activeTab = currentView || activeView || 'home';
  const { theme, toggleTheme, isDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    setIsAdminLoggedIn(Boolean(authStorage.getToken()));
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  // Main Navigation as requested: Home | Services | Products | Portfolio | About | Contact
  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'products', label: 'Products', icon: Boxes },
    { id: 'projects', label: 'Portfolio', icon: Briefcase },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Send },
  ];

  const handleNavClick = (viewId: string) => {
    if (typeof onNavigate === 'function') {
      onNavigate(viewId);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3.5'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200/90 shadow-md py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Official Omtecho Emblem */}
        <button
          id="brand-logo-btn"
          onClick={() => handleNavClick('home')}
          className="flex items-center group text-left focus:outline-none"
        >
          <OmtechoLogo size="md" showSubtitle={true} />
        </button>

        {/* Desktop Navigation */}
        <nav id="desktop-navigation" className={`hidden lg:flex items-center gap-1 p-1.5 rounded-full border backdrop-blur-sm ${
          isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-100/90 border-slate-200'
        }`}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'text-white'
                    : isDark 
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-500/30 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Theme Toggle + Owner Login + Start Project CTA */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Dark / Light Mode Toggle Button */}
          <button
            id="theme-toggle-desktop"
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-colors flex items-center justify-center ${
              isDark 
                ? 'bg-slate-900/80 border-slate-800 text-amber-400 hover:bg-slate-800 hover:border-slate-700' 
                : 'bg-slate-100 border-slate-200 text-indigo-600 hover:bg-slate-200'
            }`}
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Dark/Light Mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Owner Login / Owner Portal Button */}
          {isAdminLoggedIn ? (
            <button
              id="nav-admin-dashboard-btn"
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                activeTab === 'admin'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : isDark 
                    ? 'bg-slate-900/80 text-emerald-300 border-emerald-500/30 hover:border-emerald-500/60'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
              title="Upload & Edit Projects, Manage Offers"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Owner Portal (Edit)</span>
            </button>
          ) : (
            <button
              id="nav-login-btn"
              onClick={() => handleNavClick('login')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                activeTab === 'login'
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : isDark
                    ? 'bg-slate-900/70 text-slate-300 border-slate-800 hover:text-white hover:border-indigo-500/40'
                    : 'bg-white text-slate-700 border-slate-200 hover:text-indigo-600 hover:border-slate-300'
              }`}
              title="Owner Login to upload & edit projects"
            >
              <Lock className="w-3 h-3 text-indigo-400" />
              <span>Owner Login</span>
            </button>
          )}

          {/* Start Project CTA */}
          <button
            id="nav-start-project-btn"
            onClick={() => handleNavClick('contact')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all border border-indigo-400/30"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Controls (Theme Toggle + Hamburger) */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            id="theme-toggle-mobile"
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-colors ${
              isDark
                ? 'bg-slate-900 text-amber-400 border-slate-800'
                : 'bg-slate-100 text-indigo-600 border-slate-200'
            }`}
            aria-label="Toggle Dark/Light Mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl border focus:outline-none ${
              isDark 
                ? 'bg-slate-900 text-slate-200 border-slate-800' 
                : 'bg-slate-100 text-slate-800 border-slate-200'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden backdrop-blur-xl border-b px-4 pt-3 pb-6 shadow-2xl overflow-hidden ${
              isDark ? 'bg-slate-950/95 border-slate-800' : 'bg-white/95 border-slate-200'
            }`}
          >
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold shadow-md'
                        : isDark
                          ? 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 border border-slate-800/60'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-indigo-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Owner Action & CTA in Mobile Menu */}
            <div className={`pt-3 border-t flex flex-col gap-2.5 ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
              <button
                id="mobile-start-project-btn"
                onClick={() => handleNavClick('contact')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between pt-1">
                {isAdminLoggedIn ? (
                  <button
                    id="mobile-admin-btn"
                    onClick={() => handleNavClick('admin')}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-400 font-semibold"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>👑 Owner Studio (Edit Projects)</span>
                  </button>
                ) : (
                  <button
                    id="mobile-login-btn"
                    onClick={() => handleNavClick('login')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold ${
                      isDark ? 'bg-slate-900 border-slate-800 text-indigo-300' : 'bg-slate-100 border-slate-200 text-indigo-700'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>👑 Owner Login / Upload</span>
                  </button>
                )}

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${settings?.primaryWhatsApp?.replace(/\D/g, '') || '8122580372'}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-emerald-400 font-mono flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>8122580372</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

