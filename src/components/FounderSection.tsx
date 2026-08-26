import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Sparkles, ArrowRight, Github, Linkedin, GraduationCap, Crown, ShieldCheck } from 'lucide-react';
import { CompanySettings } from '../types';

interface FounderSectionProps {
  settings?: CompanySettings | null;
  onNavigate?: (view: string) => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ settings, onNavigate }) => {
  // CEO details
  const ceo = settings?.ceo;
  const ceoName = ceo?.name || 'Kiruthika D';
  const ceoRole = ceo?.role || 'CEO — Omtecho Studio';
  const ceoDegree = ceo?.degree || 'B.Tech — Information Technology';
  const ceoBadge = ceo?.badge || 'Chief Executive Officer';
  const ceoInitials = ceo?.initials || 'KD';

  // Founder details
  const founder = settings?.founder;
  const founderName = founder?.name || 'D. Madhavan';
  const founderRole = founder?.role || 'Founder & Full-Stack Developer — Omtecho Studio';
  const founderDegree = founder?.degree || 'B.Tech — Information Technology (Currently Pursuing)';
  const founderBadge = founder?.badge || 'Founder & Lead Architect';
  const bio = founder?.bio || 'I build modern websites, web applications and digital products that help businesses and startups establish a strong digital presence.';
  const portfolioUrl = founder?.portfolioUrl || 'https://echoportfolio.vercel.app/';
  const portfolioButtonText = founder?.portfolioButtonText || 'View My Portfolio';
  const founderInitials = founder?.initials || 'DM';
  const availabilityStatus = founder?.availabilityStatus || 'Online';
  const skills = founder?.skills && founder.skills.length > 0 
    ? founder.skills 
    : ['React / Next.js', 'TypeScript / Node.js', 'SaaS Architecture', 'Cloud & DevOps'];

  const githubUrl = settings?.socialLinks?.github || 'https://github.com/omtechostudio';
  const linkedinUrl = settings?.socialLinks?.linkedin || 'https://www.linkedin.com/in/omtecho-studio-258305431';

  return (
    <section id="leadership-section" className="py-20 bg-slate-100/70 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Studio Leadership & Core Team</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Leadership at <span className="text-indigo-600 dark:text-indigo-400">Omtecho Studio</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            A specialized freelance service and product studio driven by executive strategy and dedicated full-stack engineering craft.
          </p>
        </div>

        {/* Leadership Grid: CEO + Founder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ======================================================== */}
          {/* 1. CEO PROFILE CARD: Kiruthika D */}
          {/* ======================================================== */}
          <motion.div
            id="ceo-profile-card"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="lg:col-span-5 relative rounded-3xl bg-gradient-to-br from-white via-slate-50 to-purple-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-purple-950/30 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xl overflow-hidden flex flex-col justify-between"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

            <div className="relative z-10 space-y-6">
              {/* Header / Avatar & Badge */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 p-1 shadow-lg shadow-purple-500/20">
                    <div className="w-full h-full rounded-[14px] bg-slate-900 flex items-center justify-center text-white font-bold text-2xl sm:text-3xl font-mono uppercase">
                      {ceoInitials}
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow">
                    <Crown className="w-3 h-3" />
                    <span>CEO</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-[11px] font-bold">
                    <Crown className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                    {ceoBadge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {ceoName}
                  </h3>
                  <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                    {ceoRole}
                  </p>
                </div>
              </div>

              {/* Exact Education / Degree */}
              <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 flex items-center gap-3 shadow-sm">
                <div className="p-2 rounded-xl bg-purple-600 text-white shadow-sm shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-300 block font-mono">
                    Academic Qualification
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {ceoDegree}
                  </p>
                </div>
              </div>

              {/* Role Scope & Executive Focus */}
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Leading executive strategy, operational direction, and digital solution delivery for Omtecho Studio clients and proprietary products.
                </p>
              </div>
            </div>

            {/* CEO Action Footer */}
            <div className="relative z-10 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                  Omtecho Studio Leadership
                </span>
              </div>

              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-400 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>Connect</span>
                </a>
              )}
            </div>
          </motion.div>


          {/* ======================================================== */}
          {/* 2. FOUNDER & DEVELOPER CARD: D. Madhavan */}
          {/* ======================================================== */}
          <motion.div
            id="founder-profile-card"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="lg:col-span-7 relative rounded-3xl bg-gradient-to-br from-white via-slate-50 to-indigo-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/30 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xl overflow-hidden flex flex-col justify-between"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

            <div className="relative z-10 space-y-6">
              {/* Header / Avatar & Badge */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-emerald-500 p-1 shadow-lg shadow-indigo-500/20">
                    <div className="w-full h-full rounded-[14px] bg-slate-900 flex items-center justify-center text-white font-bold text-2xl sm:text-3xl font-mono uppercase">
                      {founderInitials}
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
                    {availabilityStatus}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold">
                    <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                    {founderBadge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {founderName}
                  </h3>
                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    {founderRole}
                  </p>
                </div>
              </div>

              {/* Exact Education / Degree */}
              <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-center gap-3 shadow-sm">
                <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-sm shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300 block font-mono">
                    Academic Qualification
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {founderDegree}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {bio}
              </p>

              {/* Skills / Tech Stack Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-200/70 dark:bg-slate-800/80 text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons & Socials */}
            <div className="relative z-10 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  id="founder-view-portfolio-btn"
                  href={portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all duration-200 flex items-center gap-1.5 shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                >
                  <span>{portfolioButtonText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {onNavigate && (
                  <button
                    id="founder-start-project-btn"
                    onClick={() => onNavigate('contact')}
                    className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-xs transition-colors border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
                  </button>
                )}
              </div>

              {/* Direct GitHub & LinkedIn */}
              <div className="flex items-center gap-2">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-slate-400 transition-colors shadow-sm"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-400 transition-colors shadow-sm"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
