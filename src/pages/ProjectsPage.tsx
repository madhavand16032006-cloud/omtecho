import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Search, 
  Sparkles, 
  Filter, 
  Layers, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { Project, CompanySettings } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectDetailsModal } from './ProjectDetailsModal';

interface ProjectsPageProps {
  projects: Project[];
  settings: CompanySettings | null;
  onNavigate: (view: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ 
  projects, 
  settings, 
  onNavigate 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['all', ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.clientName && p.clientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [projects, selectedCategory, selectedStatus, searchQuery]);

  const founder = settings?.founder;
  const showcaseTitle = founder?.showcaseTitle || 'D. Madhavan — Developer Portfolio';
  const showcaseDesc = founder?.showcaseDescription || 'Explore my development projects, technical skills, experience and digital products.';
  const portfolioUrl = founder?.portfolioUrl || 'https://echoportfolio.vercel.app/';
  const showcaseButtonText = founder?.showcaseButtonText || 'View Portfolio';
  const showcaseBadge = founder?.badge ? `${founder.badge} Showcase` : 'Featured Developer Showcase';

  return (
    <div id="projects-page" className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-4">
            <Briefcase className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Omtecho Portfolio</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Our Work
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Explore projects, products and digital experiences built by Omtecho.
          </p>
        </div>

        {/* Featured Personal Developer Portfolio Banner / Card */}
        <div className="mb-12 rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{showcaseBadge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {showcaseTitle}
              </h2>
              <p className="text-sm sm:text-base text-indigo-100 leading-relaxed">
                {showcaseDesc}
              </p>
            </div>

            <a
              id="portfolio-view-echoportfolio-btn"
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-sm transition-all shadow-xl flex items-center gap-2 shrink-0 hover:scale-105"
            >
              <span>{showcaseButtonText}</span>
              <span className="text-lg leading-none">→</span>
            </a>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {cat === 'all' ? 'All Categories' : cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects, client, tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors shadow-sm"
              />
            </div>
          </div>

          {/* Secondary Status Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">Filter by Status:</span>
            {['all', 'Live', 'Completed', 'In Development'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  selectedStatus === status
                    ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-500/40'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {status === 'all' ? 'Any Status' : status}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                companyWhatsApp={settings?.primaryWhatsApp}
                companyEmail={settings?.primaryEmail}
                onOpenDetails={(p) => setActiveProject(p)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 mb-16">
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">No projects found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStatus('all');
                setSearchQuery('');
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* Project Details Modal */}
        <ProjectDetailsModal
          project={activeProject}
          settings={settings}
          onClose={() => setActiveProject(null)}
          onNavigateContact={(name) => {
            setActiveProject(null);
            onNavigate('contact', name);
          }}
        />

        {/* Call to action */}
        <div className="p-8 sm:p-10 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-left">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              Have a similar custom project requirement?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
              We specialize in custom web applications, complex dashboards, mobile apps, and AI implementations.
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-lg shadow-indigo-600/25 flex items-center gap-2 shrink-0"
          >
            <span>Start a Free Project Discovery</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
