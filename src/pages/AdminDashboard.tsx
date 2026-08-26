import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Briefcase, 
  Tag, 
  Boxes, 
  Layers, 
  Mail, 
  Settings, 
  Lock, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  ExternalLink, 
  LogOut, 
  RefreshCw, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  ChevronRight,
  Eye,
  Sliders,
  Send,
  Building2,
  Calendar,
  DollarSign,
  Sun,
  Moon,
  AlertTriangle,
  UserCheck,
  Globe,
  User,
  TrendingUp,
  BarChart3,
  Hash,
  SlidersHorizontal,
  Crown
} from 'lucide-react';
import { 
  Project, 
  Product, 
  Service, 
  Offer, 
  Enquiry, 
  CompanySettings, 
  DashboardStats, 
  ProjectStatus, 
  ProductStatus,
  EnquiryStatus 
} from '../types';
import { api, authStorage, buildWhatsAppLink, buildMailtoLink } from '../lib/api';
import { useToast } from '../components/Toast';
import { useTheme } from '../context/ThemeContext';
import { OmtechoLogo } from '../components/OmtechoLogo';

interface AdminDashboardProps {
  onLogout: () => void;
  onNavigateHome: () => void;
  onRefreshData?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onNavigateHome, onRefreshData }) => {
  const { showToast } = useToast();
  const { theme, toggleTheme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'projects' | 'portfolio' | 'offers' | 'products' | 'services' | 'enquiries' | 'settings' | 'security'>('overview');

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [settings, setSettings] = useState<CompanySettings | null>(null);
  const [skillsInput, setSkillsInput] = useState<string>('');

  // Modals state
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingOffer, setEditingOffer] = useState<Partial<Offer> | null>(null);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);

  // In-app Delete Confirmation Modal state (avoids window.confirm blocking in iframes)
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: 'project' | 'product' | 'service' | 'offer' | 'enquiry';
    id: string;
    title: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Security password state
  const [passState, setPassState] = useState({ current: '', next: '', confirm: '' });
  const [profileState, setProfileState] = useState({ username: '', email: '' });

  // AI Assistant in Admin
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [
        dashStats,
        fetchedProjects,
        fetchedOffers,
        fetchedProducts,
        fetchedServices,
        fetchedEnquiries,
        fetchedSettings,
        me
      ] = await Promise.all([
        api.getDashboardStats(),
        api.getProjects(),
        api.getOffers(true), // include inactive offers
        api.getProducts(),
        api.getServices(),
        api.getEnquiries(),
        api.getSettings(),
        api.getMe()
      ]);

      setStats(dashStats);
      setProjects(fetchedProjects);
      setOffers(fetchedOffers);
      setProducts(fetchedProducts);
      setServices(fetchedServices);
      setEnquiries(fetchedEnquiries);
      
      // Ensure founder and stats settings exist with defaults
      const normalizedSettings = {
        ...fetchedSettings,
        stats: {
          productsBuilt: fetchedSettings?.stats?.productsBuilt ?? 5,
          projectsCompleted: fetchedSettings?.stats?.projectsCompleted ?? 18,
          technologiesCount: fetchedSettings?.stats?.technologiesCount ?? 24,
          happyClients: fetchedSettings?.stats?.happyClients ?? 32,
          productsBuiltLabel: fetchedSettings?.stats?.productsBuiltLabel || 'Products Built',
          productsBuiltSubtext: fetchedSettings?.stats?.productsBuiltSubtext || 'Proprietary SaaS & AI',
          projectsCompletedLabel: fetchedSettings?.stats?.projectsCompletedLabel || 'Projects Completed',
          projectsCompletedSubtext: fetchedSettings?.stats?.projectsCompletedSubtext || 'Web, Mobile & Systems',
          technologiesLabel: fetchedSettings?.stats?.technologiesLabel || 'Technologies',
          technologiesSubtext: fetchedSettings?.stats?.technologiesSubtext || 'Modern Tooling Stack',
          happyClientsLabel: fetchedSettings?.stats?.happyClientsLabel || 'Happy Clients',
          happyClientsSubtext: fetchedSettings?.stats?.happyClientsSubtext || '99.4% Satisfaction',
          uptimePercentage: fetchedSettings?.stats?.uptimePercentage || '99.98%',
          satisfactionRate: fetchedSettings?.stats?.satisfactionRate || '99.4%'
        },
        founder: {
          name: fetchedSettings?.founder?.name || 'D. Madhavan',
          role: fetchedSettings?.founder?.role || 'Founder & Full-Stack Developer — Omtecho',
          badge: fetchedSettings?.founder?.badge || 'Lead Solutions Architect',
          bio: fetchedSettings?.founder?.bio || 'I build modern websites, web applications and digital products that help businesses and startups establish a strong digital presence.',
          portfolioUrl: fetchedSettings?.founder?.portfolioUrl || 'https://echoportfolio.vercel.app/',
          portfolioButtonText: fetchedSettings?.founder?.portfolioButtonText || 'View My Portfolio',
          initials: fetchedSettings?.founder?.initials || 'DM',
          availabilityStatus: fetchedSettings?.founder?.availabilityStatus || 'Online',
          skills: fetchedSettings?.founder?.skills && fetchedSettings.founder.skills.length > 0
            ? fetchedSettings.founder.skills
            : ['React / Next.js', 'TypeScript / Node.js', 'SaaS Architecture', 'Cloud & DevOps'],
          showcaseTitle: fetchedSettings?.founder?.showcaseTitle || 'D. Madhavan — Developer Portfolio',
          showcaseDescription: fetchedSettings?.founder?.showcaseDescription || 'Explore my development projects, technical skills, experience and digital products.',
          showcaseButtonText: fetchedSettings?.founder?.showcaseButtonText || 'View Portfolio'
        }
      };
      setSettings(normalizedSettings);
      setSkillsInput(normalizedSettings.founder.skills.join(', '));
      if (me?.user) {
        setProfileState({ username: me.user.username, email: me.user.email });
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to fetch admin data', 'error');
      if (err.message && err.message.includes('Unauthorized')) {
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Execute in-app confirmed delete
  const handleExecuteDelete = async () => {
    if (!deleteConfirm) return;
    const { type, id, title } = deleteConfirm;
    setIsDeleting(true);

    try {
      if (type === 'project') {
        await api.deleteProject(id);
        setProjects((prev) => prev.filter((p) => p.id !== id));
        showToast(`Project "${title}" deleted successfully`, 'success');
      } else if (type === 'product') {
        await api.deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        showToast(`Product "${title}" deleted successfully`, 'success');
      } else if (type === 'service') {
        await api.deleteService(id);
        setServices((prev) => prev.filter((s) => s.id !== id));
        showToast(`Service "${title}" deleted successfully`, 'success');
      } else if (type === 'offer') {
        await api.deleteOffer(id);
        setOffers((prev) => prev.filter((o) => o.id !== id));
        showToast(`Offer "${title}" deleted successfully`, 'success');
      } else if (type === 'enquiry') {
        await api.deleteEnquiry(id);
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        showToast(`Enquiry deleted successfully`, 'success');
      }
      setDeleteConfirm(null);
      loadAllData();
    } catch (err: any) {
      showToast(err.message || `Failed to delete ${type}`, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Save Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.name || !editingProject?.shortDescription) {
      showToast('Project name and description are required', 'error');
      return;
    }

    try {
      if (editingProject.id) {
        await api.updateProject(editingProject.id, editingProject);
        showToast('Project updated successfully!', 'success');
      } else {
        await api.createProject(editingProject);
        showToast('New project created and published!', 'success');
      }
      setEditingProject(null);
      loadAllData();
    } catch (err: any) {
      showToast(err.message || 'Failed to save project', 'error');
    }
  };

  const handleDeleteProject = (id: string, name?: string) => {
    setDeleteConfirm({
      type: 'project',
      id,
      title: name || 'this project'
    });
  };

  // Save Offer
  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOffer?.title || !editingOffer?.offerPrice) {
      showToast('Offer title and offer price are required', 'error');
      return;
    }

    try {
      if (editingOffer.id) {
        await api.updateOffer(editingOffer.id, editingOffer);
        showToast('Offer updated successfully!', 'success');
      } else {
        await api.createOffer(editingOffer);
        showToast('New offer created!', 'success');
      }
      setEditingOffer(null);
      loadAllData();
    } catch (err: any) {
      showToast(err.message || 'Failed to save offer', 'error');
    }
  };

  const handleDeleteOffer = (id: string, title?: string) => {
    setDeleteConfirm({
      type: 'offer',
      id,
      title: title || 'this offer'
    });
  };

  const handleToggleOfferActive = async (offer: Offer) => {
    try {
      await api.updateOffer(offer.id, { active: !offer.active });
      showToast(`Offer is now ${!offer.active ? 'ACTIVE on website' : 'INACTIVE (hidden)'}`, 'info');
      loadAllData();
    } catch (err: any) {
      showToast(err.message || 'Failed to toggle offer', 'error');
    }
  };

  // Save Product
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.description) {
      showToast('Product name and description are required', 'error');
      return;
    }

    try {
      if (editingProduct.id) {
        await api.updateProduct(editingProduct.id, editingProduct);
        showToast('Product updated successfully!', 'success');
      } else {
        await api.createProduct(editingProduct);
        showToast('New product created!', 'success');
      }
      setEditingProduct(null);
      loadAllData();
    } catch (err: any) {
      showToast(err.message || 'Failed to save product', 'error');
    }
  };

  const handleDeleteProduct = (id: string, name?: string) => {
    setDeleteConfirm({
      type: 'product',
      id,
      title: name || 'this product'
    });
  };

  // Save Service
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title || !editingService?.shortDescription) {
      showToast('Service title and short description are required', 'error');
      return;
    }

    try {
      if (editingService.id) {
        await api.updateService(editingService.id, editingService);
        showToast('Service updated successfully!', 'success');
      } else {
        await api.createService(editingService);
        showToast('New service created!', 'success');
      }
      setEditingService(null);
      loadAllData();
    } catch (err: any) {
      showToast(err.message || 'Failed to save service', 'error');
    }
  };

  const handleDeleteService = (id: string, title?: string) => {
    setDeleteConfirm({
      type: 'service',
      id,
      title: title || 'this service'
    });
  };

  // Enquiries
  const handleUpdateEnquiryStatus = async (id: string, status: EnquiryStatus) => {
    try {
      await api.updateEnquiryStatus(id, status);
      showToast(`Enquiry marked as ${status}`, 'success');
      loadAllData();
    } catch (err: any) {
      showToast(err.message || 'Failed to update enquiry', 'error');
    }
  };

  const handleDeleteEnquiry = (id: string) => {
    setDeleteConfirm({
      type: 'enquiry',
      id,
      title: 'this client enquiry'
    });
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      await api.updateSettings(settings);
      showToast('Website settings and stats updated successfully!', 'success');
      onRefreshData?.();
      loadAllData();
    } catch (err: any) {
      showToast(err.message || 'Failed to save settings', 'error');
    }
  };

  const handleSaveStatsCounters = async (customStats?: any) => {
    if (!settings) return;
    const statsToSave = customStats || settings.stats;
    try {
      const payload = {
        ...settings,
        stats: statsToSave
      };
      await api.updateSettings(payload);
      showToast('Homepage counter numbers saved & updated live!', 'success');
      onRefreshData?.();
      loadAllData();
    } catch (err: any) {
      showToast(err.message || 'Failed to save counter statistics', 'error');
    }
  };

  const handleSavePortfolioSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!settings) return;
    try {
      // Parse skills from skillsInput
      const parsedSkills = skillsInput
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const payload = {
        ...settings,
        founder: {
          ...(settings.founder || {
            name: 'D. Madhavan',
            role: 'Founder & Full-Stack Developer — Omtecho',
            badge: 'Lead Solutions Architect',
            bio: 'I build modern websites, web applications and digital products that help businesses and startups establish a strong digital presence.',
            portfolioUrl: 'https://echoportfolio.vercel.app/',
            portfolioButtonText: 'View My Portfolio',
            initials: 'DM',
            availabilityStatus: 'Online',
            skills: ['React / Next.js', 'TypeScript / Node.js', 'SaaS Architecture', 'Cloud & DevOps'],
            showcaseTitle: 'D. Madhavan — Developer Portfolio',
            showcaseDescription: 'Explore my development projects, technical skills, experience and digital products.',
            showcaseButtonText: 'View Portfolio'
          }),
          skills: parsedSkills.length > 0 ? parsedSkills : ['React / Next.js', 'TypeScript / Node.js', 'SaaS Architecture', 'Cloud & DevOps']
        }
      };

      await api.updateSettings(payload);
      showToast('Developer Portfolio & Founder Profile updated successfully!', 'success');
      loadAllData();
    } catch (err: any) {
      showToast(err.message || 'Failed to save portfolio settings', 'error');
    }
  };

  // Password & Profile
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passState.next !== passState.confirm) {
      showToast('New passwords do not match', 'error');
      return;
    }
    try {
      await api.updatePassword(passState.current, passState.next);
      showToast('Password changed successfully!', 'success');
      setPassState({ current: '', next: '', confirm: '' });
    } catch (err: any) {
      showToast(err.message || 'Failed to update password', 'error');
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateProfile(profileState.username, profileState.email);
      showToast('Owner profile updated successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to update profile', 'error');
    }
  };

  // AI Copy Generation
  const handleGenerateAICopy = async (type: string) => {
    if (!aiPrompt) {
      showToast('Please enter a topic or bullet points for the AI', 'error');
      return;
    }
    setAiLoading(true);
    try {
      const copy = await api.generateAICopy(aiPrompt, type);
      setAiResult(copy);
      showToast('AI copy generated!', 'success');
    } catch (err: any) {
      showToast(err.message || 'AI generation error', 'error');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div id="admin-dashboard-container" className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col pt-16 transition-colors duration-200">
      {/* Top Admin Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between transition-colors shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={onNavigateHome}
            className="focus:outline-none flex items-center hover:opacity-90 transition-opacity"
            title="Return to Public Website"
          >
            <OmtechoLogo size="sm" showSubtitle={false} />
          </button>
          <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-3">
            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Owner Portal</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-semibold">
              Live CMS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Dark / Light Mode Toggle in Admin */}
          <button
            id="admin-theme-toggle"
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-600 dark:text-amber-400 transition-colors border border-slate-200 dark:border-transparent"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={loadAllData}
            disabled={loading}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-transparent"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-transparent"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Public Website</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-300 dark:border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 bg-slate-100/80 dark:bg-slate-900/50 border-r border-slate-200 dark:border-slate-800/80 p-4 shrink-0 transition-colors">
          <div className="space-y-1">
            {[
              { id: 'overview', label: 'Overview & Stats', icon: LayoutDashboard },
              { id: 'stats', label: 'Homepage Counters (5+, 18+)', icon: TrendingUp },
              { id: 'projects', label: 'Projects & Work', icon: Briefcase, badge: projects.length },
              { id: 'portfolio', label: 'Developer Portfolio & Founder', icon: UserCheck },
              { id: 'offers', label: 'Latest Offers', icon: Tag, badge: offers.filter(o => o.active).length },
              { id: 'products', label: 'In-House Products', icon: Boxes, badge: products.length },
              { id: 'services', label: 'Client Services', icon: Layers, badge: services.length },
              { id: 'enquiries', label: 'Client Enquiries', icon: Mail, badge: stats?.newEnquiriesCount },
              { id: 'settings', label: 'Website Settings & CMS', icon: Settings },
              { id: 'security', label: 'Security & Profile', icon: Lock },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`admin-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/25'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      isActive ? 'bg-white text-indigo-900' : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick AI Tool Drawer */}
          <div className="mt-8 p-3 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 text-left transition-colors">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>AI Copy Assistant</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-2">
              Generate compelling project blurbs & offer pitches with Gemini.
            </p>
            <input
              type="text"
              placeholder="e.g. Multi-vendor food app"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-[11px] text-slate-900 dark:text-white placeholder-slate-400 mb-2 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={() => handleGenerateAICopy('project proposal')}
              disabled={aiLoading}
              className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[10px] transition-colors shadow-sm"
            >
              {aiLoading ? 'Generating...' : '✨ Generate Copy'}
            </button>
            {aiResult && (
              <div className="mt-2 p-2 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] text-slate-800 dark:text-slate-300 max-h-32 overflow-y-auto">
                {aiResult}
              </div>
            )}
          </div>
        </aside>

        {/* Tab Content Canvas */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl overflow-y-auto text-left">
          {/* ======================================================== */}
          {/* TAB 1: OVERVIEW & STATS */}
          {/* ======================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Studio Overview</h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">Real-time status of your dynamic products, client projects, and active enquiries.</p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs mb-2">
                    <span className="font-medium">Total Projects</span>
                    <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">{stats?.totalProjects || 0}</div>
                  <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold mt-1 block">{stats?.featuredProjectsCount || 0} featured</span>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs mb-2">
                    <span className="font-medium">Active Offers</span>
                    <Tag className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">{stats?.activeOffers || 0}</div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">Live on website</span>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs mb-2">
                    <span className="font-medium">In-House Products</span>
                    <Boxes className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">{stats?.totalProducts || 0}</div>
                  <span className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold mt-1 block">{stats?.liveProductsCount || 0} live</span>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs mb-2">
                    <span className="font-medium">Client Enquiries</span>
                    <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{stats?.totalEnquiries || 0}</div>
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold mt-1 block">{stats?.newEnquiriesCount || 0} new messages</span>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-3 shadow-sm">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mr-2">Quick Actions:</span>
                <button
                  onClick={() => {
                    setEditingProject({
                      name: '',
                      category: 'Web App',
                      status: 'Live',
                      shortDescription: '',
                      fullDescription: '',
                      technologies: ['React 19', 'TypeScript', 'Tailwind CSS'],
                      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
                      offerPrice: '₹45,000',
                      featured: true,
                      keyHighlights: ['Responsive UI Architecture', 'Real-time sync']
                    });
                    setActiveTab('projects');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>

                <button
                  onClick={() => {
                    setEditingOffer({
                      title: '',
                      category: 'Launch Offer',
                      originalPrice: '₹35,000',
                      offerPrice: '₹14,999',
                      discount: '55% OFF',
                      description: '',
                      validUntil: '2026-12-31',
                      active: true,
                      features: ['Custom Responsive Web Pages', 'Direct WhatsApp Button', 'Free SSL & Deployment']
                    });
                    setActiveTab('offers');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Special Offer</span>
                </button>

                <button
                  onClick={() => {
                    setEditingProduct({
                      name: '',
                      tagline: '',
                      category: 'SaaS Platform',
                      status: 'Live',
                      description: '',
                      technologies: ['React', 'Node.js', 'MongoDB'],
                      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
                      featured: true
                    });
                    setActiveTab('products');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add In-House Product</span>
                </button>

                <button
                  onClick={() => setActiveTab('stats')}
                  className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Edit Homepage Counters (5+, 18+...)</span>
                </button>
              </div>

              {/* Homepage Live Statistics & Counter Numbers Editor (Direct in Overview) */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/60 dark:from-slate-900/90 dark:via-slate-900/60 dark:to-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 shadow-md space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-bold font-mono tracking-wider uppercase">
                        Homepage Live Display
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Live Statistics Counters (Products, Projects, Tech, Clients)
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Change the counts shown right below the homepage hero section. You can type numbers or use (+) / (-) buttons.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        if (!settings) return;
                        setSettings({
                          ...settings,
                          stats: {
                            ...settings.stats,
                            productsBuilt: products.length > 0 ? products.length : 5,
                            projectsCompleted: projects.length > 0 ? projects.length : 18
                          }
                        });
                        showToast(`Synced from database: ${products.length} products, ${projects.length} projects`, 'info');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Sync DB Counts</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveStatsCounters()}
                      className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Live Counts</span>
                    </button>
                  </div>
                </div>

                {/* 4 Interactive Counter Stepper Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card 1: Products Built */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-indigo-200 dark:border-indigo-500/40 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        {settings?.stats?.productsBuiltLabel || 'Products Built'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {settings?.stats?.productsBuilt || 0}+ on Home
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (!settings) return;
                          const current = Number(settings.stats?.productsBuilt) || 0;
                          setSettings({
                            ...settings,
                            stats: { ...settings.stats, productsBuilt: Math.max(0, current - 1) }
                          });
                        }}
                        className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={settings?.stats?.productsBuilt ?? 0}
                        onChange={(e) => {
                          if (!settings) return;
                          setSettings({
                            ...settings,
                            stats: { ...settings.stats, productsBuilt: Number(e.target.value) }
                          });
                        }}
                        className="w-20 text-center py-1 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-bold text-base focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!settings) return;
                          const current = Number(settings.stats?.productsBuilt) || 0;
                          setSettings({
                            ...settings,
                            stats: { ...settings.stats, productsBuilt: current + 1 }
                          });
                        }}
                        className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 text-center truncate">
                      {settings?.stats?.productsBuiltSubtext || 'Proprietary SaaS & AI'}
                    </p>
                  </div>

                  {/* Card 2: Projects Completed */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-purple-200 dark:border-purple-500/40 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                        {settings?.stats?.projectsCompletedLabel || 'Projects Completed'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {settings?.stats?.projectsCompleted || 0}+ on Home
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (!settings) return;
                          const current = Number(settings.stats?.projectsCompleted) || 0;
                          setSettings({
                            ...settings,
                            stats: { ...settings.stats, projectsCompleted: Math.max(0, current - 1) }
                          });
                        }}
                        className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={settings?.stats?.projectsCompleted ?? 0}
                        onChange={(e) => {
                          if (!settings) return;
                          setSettings({
                            ...settings,
                            stats: { ...settings.stats, projectsCompleted: Number(e.target.value) }
                          });
                        }}
                        className="w-20 text-center py-1 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-bold text-base focus:outline-none focus:border-purple-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!settings) return;
                          const current = Number(settings.stats?.projectsCompleted) || 0;
                          setSettings({
                            ...settings,
                            stats: { ...settings.stats, projectsCompleted: current + 1 }
                          });
                        }}
                        className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 text-center truncate">
                      {settings?.stats?.projectsCompletedSubtext || 'Web, Mobile & Systems'}
                    </p>
                  </div>

                  {/* Card 3: Technologies */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-teal-200 dark:border-teal-500/40 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                        {settings?.stats?.technologiesLabel || 'Technologies'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {settings?.stats?.technologiesCount || 0}+ on Home
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (!settings) return;
                          const current = Number(settings.stats?.technologiesCount) || 0;
                          setSettings({
                            ...settings,
                            stats: { ...settings.stats, technologiesCount: Math.max(0, current - 1) }
                          });
                        }}
                        className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={settings?.stats?.technologiesCount ?? 0}
                        onChange={(e) => {
                          if (!settings) return;
                          setSettings({
                            ...settings,
                            stats: { ...settings.stats, technologiesCount: Number(e.target.value) }
                          });
                        }}
                        className="w-20 text-center py-1 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-bold text-base focus:outline-none focus:border-teal-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!settings) return;
                          const current = Number(settings.stats?.technologiesCount) || 0;
                          setSettings({
                            ...settings,
                            stats: { ...settings.stats, technologiesCount: current + 1 }
                          });
                        }}
                        className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 text-center truncate">
                      {settings?.stats?.technologiesSubtext || 'Modern Tooling Stack'}
                    </p>
                  </div>

                  {/* Card 4: Happy Clients */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-emerald-200 dark:border-emerald-500/40 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        {settings?.stats?.happyClientsLabel || 'Happy Clients'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {settings?.stats?.happyClients || 0}+ on Home
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (!settings) return;
                          const current = Number(settings.stats?.happyClients) || 0;
                          setSettings({
                            ...settings,
                            stats: { ...settings.stats, happyClients: Math.max(0, current - 1) }
                          });
                        }}
                        className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={settings?.stats?.happyClients ?? 0}
                        onChange={(e) => {
                          if (!settings) return;
                          setSettings({
                            ...settings,
                            stats: { ...settings.stats, happyClients: Number(e.target.value) }
                          });
                        }}
                        className="w-20 text-center py-1 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-bold text-base focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!settings) return;
                          const current = Number(settings.stats?.happyClients) || 0;
                          setSettings({
                            ...settings,
                            stats: { ...settings.stats, happyClients: current + 1 }
                          });
                        }}
                        className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 text-center truncate">
                      {settings?.stats?.happyClientsSubtext || '99.4% Satisfaction'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800/80 text-xs">
                  <div className="flex items-center gap-4 text-slate-500 text-[11px]">
                    <span>Uptime: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{settings?.stats?.uptimePercentage || '99.98%'}</strong></span>
                    <span>Satisfaction: <strong className="text-purple-600 dark:text-purple-400 font-mono">{settings?.stats?.satisfactionRate || '99.4%'}</strong></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('stats')}
                    className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Full Counter & Subtext Editor</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Recent Enquiries Preview */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Client Enquiries</h3>
                  <button onClick={() => setActiveTab('enquiries')} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
                    View all in Inbox →
                  </button>
                </div>
                {enquiries.length === 0 ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400">No enquiries received yet.</p>
                ) : (
                  <div className="space-y-2.5">
                    {enquiries.slice(0, 3).map((enq) => (
                      <div key={enq.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white">{enq.name}</span>
                            {enq.company && <span className="text-slate-500 dark:text-slate-400">({enq.company})</span>}
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                              enq.status === 'new' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}>
                              {enq.status}
                            </span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 line-clamp-1 mt-1">{enq.message}</p>
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 shrink-0 ml-4 font-mono">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: HOMEPAGE COUNTERS & METRICS MANAGER */}
          {/* ======================================================== */}
          {activeTab === 'stats' && settings && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Homepage Statistics & Counters</h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Customize the count numbers (e.g. 5+ Products, 18+ Projects), category titles, and subtext displayed on the homepage hero strip.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSettings({
                        ...settings,
                        stats: {
                          ...settings.stats,
                          productsBuilt: products.length > 0 ? products.length : 5,
                          projectsCompleted: projects.length > 0 ? projects.length : 18
                        }
                      });
                      showToast(`Count synced with database: ${products.length} products & ${projects.length} projects`, 'info');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Auto-Count from DB</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveStatsCounters()}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save All Counters</span>
                  </button>
                </div>
              </div>

              {/* Live Preview Strip */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Live Real-Time Website Preview</h3>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Updates live as you type below</span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-100/90 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                      <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1 font-mono">
                        {settings.stats?.productsBuilt || 0}+
                      </div>
                      <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        {settings.stats?.productsBuiltLabel || 'Products Built'}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {settings.stats?.productsBuiltSubtext || 'Proprietary SaaS & AI'}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                      <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1 font-mono">
                        {settings.stats?.projectsCompleted || 0}+
                      </div>
                      <p className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                        {settings.stats?.projectsCompletedLabel || 'Projects Completed'}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {settings.stats?.projectsCompletedSubtext || 'Web, Mobile & Systems'}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                      <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1 font-mono">
                        {settings.stats?.technologiesCount || 0}+
                      </div>
                      <p className="text-xs font-medium text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                        {settings.stats?.technologiesLabel || 'Technologies'}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {settings.stats?.technologiesSubtext || 'Modern Tooling Stack'}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                      <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1 font-mono">
                        {settings.stats?.happyClients || 0}+
                      </div>
                      <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        {settings.stats?.happyClientsLabel || 'Happy Clients'}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {settings.stats?.happyClientsSubtext || `${settings.stats?.satisfactionRate || '99.4%'} Satisfaction`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Cards Grid */}
              <form onSubmit={(e) => { e.preventDefault(); handleSaveStatsCounters(); }} className="space-y-6 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card 1: Products Built Settings */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-indigo-200 dark:border-indigo-500/30 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Boxes className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Counter 1: Products Built</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
                        {settings.stats?.productsBuilt || 0}+
                      </span>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Display Count Number (e.g. 5, 10, 20)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          value={settings.stats?.productsBuilt ?? 0}
                          onChange={(e) => setSettings({
                            ...settings,
                            stats: { ...settings.stats, productsBuilt: Number(e.target.value) }
                          })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono font-bold text-sm focus:outline-none focus:border-indigo-500"
                        />
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              const curr = Number(settings.stats?.productsBuilt) || 0;
                              setSettings({ ...settings, stats: { ...settings.stats, productsBuilt: Math.max(0, curr - 1) } });
                            }}
                            className="px-2.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold"
                          >
                            -1
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const curr = Number(settings.stats?.productsBuilt) || 0;
                              setSettings({ ...settings, stats: { ...settings.stats, productsBuilt: curr + 1 } });
                            }}
                            className="px-2.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold"
                          >
                            +1
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const curr = Number(settings.stats?.productsBuilt) || 0;
                              setSettings({ ...settings, stats: { ...settings.stats, productsBuilt: curr + 5 } });
                            }}
                            className="px-2.5 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-bold"
                          >
                            +5
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Headline Label</label>
                      <input
                        type="text"
                        value={settings.stats?.productsBuiltLabel || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          stats: { ...settings.stats, productsBuiltLabel: e.target.value }
                        })}
                        placeholder="Products Built"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Subtext Description</label>
                      <input
                        type="text"
                        value={settings.stats?.productsBuiltSubtext || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          stats: { ...settings.stats, productsBuiltSubtext: e.target.value }
                        })}
                        placeholder="Proprietary SaaS & AI"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Card 2: Projects Completed Settings */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-purple-200 dark:border-purple-500/30 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Counter 2: Projects Completed</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">
                        {settings.stats?.projectsCompleted || 0}+
                      </span>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Display Count Number (e.g. 18, 50, 100)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          value={settings.stats?.projectsCompleted ?? 0}
                          onChange={(e) => setSettings({
                            ...settings,
                            stats: { ...settings.stats, projectsCompleted: Number(e.target.value) }
                          })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono font-bold text-sm focus:outline-none focus:border-purple-500"
                        />
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              const curr = Number(settings.stats?.projectsCompleted) || 0;
                              setSettings({ ...settings, stats: { ...settings.stats, projectsCompleted: Math.max(0, curr - 1) } });
                            }}
                            className="px-2.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold"
                          >
                            -1
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const curr = Number(settings.stats?.projectsCompleted) || 0;
                              setSettings({ ...settings, stats: { ...settings.stats, projectsCompleted: curr + 1 } });
                            }}
                            className="px-2.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold"
                          >
                            +1
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const curr = Number(settings.stats?.projectsCompleted) || 0;
                              setSettings({ ...settings, stats: { ...settings.stats, projectsCompleted: curr + 5 } });
                            }}
                            className="px-2.5 py-2 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-300 font-bold"
                          >
                            +5
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Headline Label</label>
                      <input
                        type="text"
                        value={settings.stats?.projectsCompletedLabel || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          stats: { ...settings.stats, projectsCompletedLabel: e.target.value }
                        })}
                        placeholder="Projects Completed"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Subtext Description</label>
                      <input
                        type="text"
                        value={settings.stats?.projectsCompletedSubtext || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          stats: { ...settings.stats, projectsCompletedSubtext: e.target.value }
                        })}
                        placeholder="Web, Mobile & Systems"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {/* Card 3: Technologies Count Settings */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-teal-200 dark:border-teal-500/30 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Counter 3: Technologies Count</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold">
                        {settings.stats?.technologiesCount || 0}+
                      </span>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Display Count Number (e.g. 24, 30, 40)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          value={settings.stats?.technologiesCount ?? 0}
                          onChange={(e) => setSettings({
                            ...settings,
                            stats: { ...settings.stats, technologiesCount: Number(e.target.value) }
                          })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono font-bold text-sm focus:outline-none focus:border-teal-500"
                        />
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              const curr = Number(settings.stats?.technologiesCount) || 0;
                              setSettings({ ...settings, stats: { ...settings.stats, technologiesCount: Math.max(0, curr - 1) } });
                            }}
                            className="px-2.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold"
                          >
                            -1
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const curr = Number(settings.stats?.technologiesCount) || 0;
                              setSettings({ ...settings, stats: { ...settings.stats, technologiesCount: curr + 1 } });
                            }}
                            className="px-2.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold"
                          >
                            +1
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const curr = Number(settings.stats?.technologiesCount) || 0;
                              setSettings({ ...settings, stats: { ...settings.stats, technologiesCount: curr + 5 } });
                            }}
                            className="px-2.5 py-2 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-300 font-bold"
                          >
                            +5
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Headline Label</label>
                      <input
                        type="text"
                        value={settings.stats?.technologiesLabel || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          stats: { ...settings.stats, technologiesLabel: e.target.value }
                        })}
                        placeholder="Technologies"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Subtext Description</label>
                      <input
                        type="text"
                        value={settings.stats?.technologiesSubtext || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          stats: { ...settings.stats, technologiesSubtext: e.target.value }
                        })}
                        placeholder="Modern Tooling Stack"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  {/* Card 4: Happy Clients Settings */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-emerald-200 dark:border-emerald-500/30 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Counter 4: Happy Clients</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                        {settings.stats?.happyClients || 0}+
                      </span>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Display Count Number (e.g. 32, 64, 100)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          value={settings.stats?.happyClients ?? 0}
                          onChange={(e) => setSettings({
                            ...settings,
                            stats: { ...settings.stats, happyClients: Number(e.target.value) }
                          })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono font-bold text-sm focus:outline-none focus:border-emerald-500"
                        />
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              const curr = Number(settings.stats?.happyClients) || 0;
                              setSettings({ ...settings, stats: { ...settings.stats, happyClients: Math.max(0, curr - 1) } });
                            }}
                            className="px-2.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold"
                          >
                            -1
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const curr = Number(settings.stats?.happyClients) || 0;
                              setSettings({ ...settings, stats: { ...settings.stats, happyClients: curr + 1 } });
                            }}
                            className="px-2.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold"
                          >
                            +1
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const curr = Number(settings.stats?.happyClients) || 0;
                              setSettings({ ...settings, stats: { ...settings.stats, happyClients: curr + 5 } });
                            }}
                            className="px-2.5 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 font-bold"
                          >
                            +5
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Headline Label</label>
                      <input
                        type="text"
                        value={settings.stats?.happyClientsLabel || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          stats: { ...settings.stats, happyClientsLabel: e.target.value }
                        })}
                        placeholder="Happy Clients"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Subtext Description</label>
                      <input
                        type="text"
                        value={settings.stats?.happyClientsSubtext || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          stats: { ...settings.stats, happyClientsSubtext: e.target.value }
                        })}
                        placeholder="99.4% Satisfaction"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Studio Badges (Uptime, Satisfaction) */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Additional Studio Indicators</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Uptime Badge (e.g. 99.98%)</label>
                      <input
                        type="text"
                        value={settings.stats?.uptimePercentage || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          stats: { ...settings.stats, uptimePercentage: e.target.value }
                        })}
                        placeholder="99.98%"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Satisfaction Rate (e.g. 99.4%)</label>
                      <input
                        type="text"
                        value={settings.stats?.satisfactionRate || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          stats: { ...settings.stats, satisfactionRate: e.target.value }
                        })}
                        placeholder="99.4%"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit & Reset Bar */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSettings({
                        ...settings,
                        stats: {
                          productsBuilt: 5,
                          projectsCompleted: 18,
                          technologiesCount: 24,
                          happyClients: 32,
                          productsBuiltLabel: 'Products Built',
                          productsBuiltSubtext: 'Proprietary SaaS & AI',
                          projectsCompletedLabel: 'Projects Completed',
                          projectsCompletedSubtext: 'Web, Mobile & Systems',
                          technologiesLabel: 'Technologies',
                          technologiesSubtext: 'Modern Tooling Stack',
                          happyClientsLabel: 'Happy Clients',
                          happyClientsSubtext: '99.4% Satisfaction',
                          uptimePercentage: '99.98%',
                          satisfactionRate: '99.4%'
                        }
                      });
                      showToast('Counters reset to default values (5, 18, 24, 32). Click Save to apply.', 'info');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors"
                  >
                    Reset Defaults (5, 18, 24, 32)
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => loadAllData()}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors"
                    >
                      Discard Changes
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save All Homepage Counters</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: PROJECTS MANAGEMENT */}
          {/* ======================================================== */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Homepage Live Projects Counter Banner */}
              <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-600 text-white shadow-md">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Homepage Live Projects Counter: <span className="font-mono text-purple-600 dark:text-purple-400 font-extrabold text-sm">{settings?.stats?.projectsCompleted || 0}+ Projects Completed</span>
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      You have <strong className="font-mono text-slate-900 dark:text-white">{projects.length}</strong> project items in your database. The homepage displays <strong className="font-mono text-purple-600 dark:text-purple-400">{settings?.stats?.projectsCompleted || 0}+</strong>.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('stats')}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-purple-300 dark:border-purple-500/40 text-purple-600 dark:text-purple-300 text-xs font-bold hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Change Counter Number</span>
                </button>
              </div>

              {/* Developer Portfolio Quick Shortcut Banner */}
              <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Developer Portfolio Showcase & Founder Profile</h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      Link: <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">{settings?.founder?.portfolioUrl || 'https://echoportfolio.vercel.app/'}</span>
                    </p>
                  </div>
                </div>
                <button
                  id="admin-jump-to-portfolio-settings-btn"
                  onClick={() => setActiveTab('portfolio')}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-500/40 text-indigo-600 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Portfolio & Founder Profile</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Project Portfolio Manager</h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Manage case studies and showcase projects shown dynamically on the website.</p>
                </div>

                <button
                  onClick={() => setEditingProject({
                    name: '',
                    category: 'Web App',
                    status: 'Live',
                    shortDescription: '',
                    fullDescription: '',
                    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Node.js'],
                    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
                    videoUrl: '',
                    whatsapp: '8122580372',
                    email: 'omtecho.tech@gmail.com',
                    offerPrice: '₹45,000',
                    offerPromotionText: 'Launch Package Available',
                    featured: true,
                    keyHighlights: ['Custom High-Speed Architecture', 'Direct WhatsApp Lead Capture', 'Modern Responsive UI']
                  })}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Project</span>
                </button>
              </div>

              {/* Project Edit / Create Form Drawer */}
              {editingProject && (
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-500/40 shadow-xl dark:shadow-2xl">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{editingProject.id ? '✏️ Edit Project' : '🚀 Upload New Project'}</span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300">
                          {editingProject.id ? `ID: ${editingProject.id}` : 'Draft'}
                        </span>
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Update project details, cover photo, demo video, pricing, and direct WhatsApp contact.</p>
                    </div>
                    <button onClick={() => setEditingProject(null)} className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Project Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Nexus AI Telemetry Platform"
                          value={editingProject.name || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Category</label>
                        <select
                          value={editingProject.category || 'Web App'}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        >
                          <option value="Web App">Web App</option>
                          <option value="Mobile App">Mobile App</option>
                          <option value="AI Solution">AI Solution</option>
                          <option value="E-Commerce">E-Commerce</option>
                          <option value="SaaS">SaaS</option>
                          <option value="Custom Software">Custom Software</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Status</label>
                        <select
                          value={editingProject.status || 'Live'}
                          onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as ProjectStatus })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        >
                          <option value="Live">Live</option>
                          <option value="Completed">Completed</option>
                          <option value="In Development">In Development</option>
                          <option value="Coming Soon">Coming Soon</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Client / Brand Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Zenith Labs Inc."
                          value={editingProject.clientName || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, clientName: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Offer Price / Budget (INR)</label>
                        <input
                          type="text"
                          placeholder="e.g. ₹45,000"
                          value={editingProject.offerPrice || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, offerPrice: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                        />
                      </div>
                    </div>

                    {/* Media Management: Image URL & Video URL */}
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                          <span>📸 Media & Promo Showcase (Image & Video)</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Project Cover Image URL</label>
                          <input
                            type="url"
                            placeholder="https://images.unsplash.com/photo-..."
                            value={editingProject.imageUrl || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                          />
                          {editingProject.imageUrl && (
                            <div className="mt-2 flex items-center gap-2">
                              <img
                                src={editingProject.imageUrl}
                                alt="Preview"
                                className="w-16 h-10 object-cover rounded border border-slate-300 dark:border-slate-700"
                                onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                              />
                              <span className="text-[10px] text-slate-500 dark:text-slate-400">Cover Image Preview</span>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Project Demo / Promo Video URL</label>
                          <input
                            type="url"
                            placeholder="https://www.youtube.com/watch?v=... or Loom/Vimeo link"
                            value={editingProject.videoUrl || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, videoUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                          />
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                            Supports YouTube, Vimeo, Loom, or direct MP4 video URLs.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Direct Contact & URLs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">WhatsApp Contact for this Project</label>
                        <input
                          type="text"
                          placeholder="8122580372"
                          value={editingProject.whatsapp || '8122580372'}
                          onChange={(e) => setEditingProject({ ...editingProject, whatsapp: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Contact Email for this Project</label>
                        <input
                          type="email"
                          placeholder="omtecho.tech@gmail.com"
                          value={editingProject.email || 'omtecho.tech@gmail.com'}
                          onChange={(e) => setEditingProject({ ...editingProject, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Live Project Website URL</label>
                        <input
                          type="url"
                          placeholder="https://zenith-analytics.omtecho.com"
                          value={editingProject.projectUrl || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, projectUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Promotion Tagline / Offer Banner</label>
                        <input
                          type="text"
                          placeholder="e.g. Custom SaaS Architecture Package Available"
                          value={editingProject.offerPromotionText || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, offerPromotionText: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Short Description (for cards) *</label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Brief 1-2 sentence overview of what this project does."
                        value={editingProject.shortDescription || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Full Description (for details modal)</label>
                      <textarea
                        rows={3}
                        placeholder="In-depth project breakdown, architectural decisions, and impact."
                        value={editingProject.fullDescription || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        placeholder="React 19, TypeScript, Node.js, Express, Tailwind CSS, Gemini AI"
                        value={(editingProject.technologies || []).join(', ')}
                        onChange={(e) => setEditingProject({
                          ...editingProject,
                          technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                        })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="featured-checkbox"
                        checked={Boolean(editingProject.featured)}
                        onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                        className="w-4 h-4 rounded text-indigo-600 bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800"
                      />
                      <label htmlFor="featured-checkbox" className="text-slate-700 dark:text-slate-300 font-medium">
                        Mark as Featured Project on Homepage
                      </label>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md flex items-center gap-1.5 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>{editingProject.id ? 'Save Project Changes' : 'Publish New Project'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Projects Table */}
              <div className="rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-mono uppercase">
                    <tr>
                      <th className="p-4">Project</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Featured</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {projects.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80'}
                              alt={p.name}
                              className="w-10 h-10 rounded-lg object-cover bg-slate-100 dark:bg-slate-950 shrink-0 border border-slate-200 dark:border-slate-800"
                            />
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">{p.name}</p>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{p.shortDescription}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] border border-slate-200 dark:border-transparent">
                            {p.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold">
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4">
                          {p.featured ? (
                            <span className="text-amber-500 dark:text-amber-400 font-semibold">★ Yes</span>
                          ) : (
                            <span className="text-slate-400 dark:text-slate-500">No</span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingProject(p)}
                              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-300 transition-colors"
                              title="Edit Project"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(p.id, p.name)}
                              className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/60 hover:bg-rose-200 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 transition-colors"
                              title="Delete Project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: OFFERS MANAGEMENT */}
          {/* ======================================================== */}
          {activeTab === 'offers' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Special Offers & Launch Deals</h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Add or deactivate limited-time packages without modifying code.</p>
                </div>

                <button
                  onClick={() => setEditingOffer({
                    title: '',
                    category: 'Launch Offer',
                    originalPrice: '₹35,000',
                    offerPrice: '₹14,999',
                    discount: '55% OFF',
                    badge: 'Most Popular',
                    description: '',
                    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
                    videoUrl: '',
                    whatsapp: '8122580372',
                    email: 'omtecho.tech@gmail.com',
                    validUntil: '2026-12-31',
                    active: true,
                    features: ['5 to 8 Custom Responsive Pages', 'Direct WhatsApp & Call Click Buttons', 'Free SSL & Deployment', 'Lead Capture Contact Forms']
                  })}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Offer</span>
                </button>
              </div>

              {/* Offer Editor Modal */}
              {editingOffer && (
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-500/40 shadow-xl dark:shadow-2xl">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{editingOffer.id ? '🏷️ Edit Special Offer' : '🎁 Create New Promo Deal'}</span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300">
                          {editingOffer.id ? `ID: ${editingOffer.id}` : 'New'}
                        </span>
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Change promotional banner, demo video, discount pricing, and direct WhatsApp / Email buttons.</p>
                    </div>
                    <button onClick={() => setEditingOffer(null)} className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveOffer} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Offer Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Business Website — Special Launch Offer"
                          value={editingOffer.title || ''}
                          onChange={(e) => setEditingOffer({ ...editingOffer, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Category</label>
                        <input
                          type="text"
                          value={editingOffer.category || 'Special Package'}
                          onChange={(e) => setEditingOffer({ ...editingOffer, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Original Price (INR)</label>
                        <input
                          type="text"
                          placeholder="e.g. ₹35,000"
                          value={editingOffer.originalPrice || ''}
                          onChange={(e) => setEditingOffer({ ...editingOffer, originalPrice: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Offer Price * (INR)</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. ₹14,999"
                          value={editingOffer.offerPrice || ''}
                          onChange={(e) => setEditingOffer({ ...editingOffer, offerPrice: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Discount Tag</label>
                        <input
                          type="text"
                          placeholder="55% OFF"
                          value={editingOffer.discount || ''}
                          onChange={(e) => setEditingOffer({ ...editingOffer, discount: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Badge Tag</label>
                        <input
                          type="text"
                          placeholder="e.g. Most Popular / Limited"
                          value={editingOffer.badge || ''}
                          onChange={(e) => setEditingOffer({ ...editingOffer, badge: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    {/* Media Management for Offers: Promo Image & Promo Video */}
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider font-mono">
                        🎨 Offer Media (Image & Promo Video)
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Offer Banner Image URL</label>
                          <input
                            type="url"
                            placeholder="https://images.unsplash.com/photo-..."
                            value={editingOffer.imageUrl || ''}
                            onChange={(e) => setEditingOffer({ ...editingOffer, imageUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                          />
                          {editingOffer.imageUrl && (
                            <div className="mt-2 flex items-center gap-2">
                              <img
                                src={editingOffer.imageUrl}
                                alt="Offer Preview"
                                className="w-16 h-10 object-cover rounded border border-slate-300 dark:border-slate-700"
                                onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
                              />
                              <span className="text-[10px] text-slate-500 dark:text-slate-400">Banner Preview</span>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Offer Promo / Explainer Video URL</label>
                          <input
                            type="url"
                            placeholder="https://www.youtube.com/watch?v=... or Loom video"
                            value={editingOffer.videoUrl || ''}
                            onChange={(e) => setEditingOffer({ ...editingOffer, videoUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                          />
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                            YouTube, Vimeo, Loom, or direct MP4 video link.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Direct Contact for Offers */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Offer WhatsApp Number</label>
                        <input
                          type="text"
                          placeholder="8122580372"
                          value={editingOffer.whatsapp || '8122580372'}
                          onChange={(e) => setEditingOffer({ ...editingOffer, whatsapp: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Offer Email ID</label>
                        <input
                          type="email"
                          placeholder="omtecho.tech@gmail.com"
                          value={editingOffer.email || 'omtecho.tech@gmail.com'}
                          onChange={(e) => setEditingOffer({ ...editingOffer, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Valid Until Date</label>
                        <input
                          type="date"
                          value={editingOffer.validUntil ? editingOffer.validUntil.slice(0, 10) : ''}
                          onChange={(e) => setEditingOffer({ ...editingOffer, validUntil: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Offer Description</label>
                      <textarea
                        rows={2}
                        placeholder="Comprehensive description of what is provided in this discount deal."
                        value={editingOffer.description || ''}
                        onChange={(e) => setEditingOffer({ ...editingOffer, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Included Features (comma-separated)</label>
                      <textarea
                        rows={2}
                        placeholder="5 to 8 Custom Pages, WhatsApp Integration, SEO Ready, Free 6-Month Support"
                        value={(editingOffer.features || []).join(', ')}
                        onChange={(e) => setEditingOffer({
                          ...editingOffer,
                          features: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                        })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="offer-active-checkbox"
                        checked={editingOffer.active !== false}
                        onChange={(e) => setEditingOffer({ ...editingOffer, active: e.target.checked })}
                        className="w-4 h-4 rounded text-amber-600 bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800"
                      />
                      <label htmlFor="offer-active-checkbox" className="text-slate-700 dark:text-slate-300 font-medium">
                        Offer is Active (Visible on Public Website)
                      </label>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => setEditingOffer(null)}
                        className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold shadow-md flex items-center gap-1.5 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>{editingOffer.id ? 'Save Offer Changes' : 'Publish Offer Deal'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Offers Grid List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {offers.map((offer) => (
                  <div key={offer.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-transparent">
                          {offer.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleOfferActive(offer)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              offer.active
                                ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-300 dark:border-slate-700'
                            }`}
                          >
                            {offer.active ? '● Active on Site' : '○ Inactive / Hidden'}
                          </button>
                        </div>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">{offer.title}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">{offer.description}</p>

                      <div className="flex items-baseline gap-2 font-mono mb-3">
                        <span className="text-lg font-bold text-slate-900 dark:text-white">{offer.offerPrice}</span>
                        {offer.originalPrice && <span className="text-xs text-slate-400 dark:text-slate-500 line-through">{offer.originalPrice}</span>}
                        {offer.discount && <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">{offer.discount}</span>}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        Expires: {offer.validUntil ? new Date(offer.validUntil).toLocaleDateString() : 'N/A'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingOffer(offer)}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-300 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteOffer(offer.id, offer.title)}
                          className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/60 hover:bg-rose-200 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: IN-HOUSE PRODUCTS MANAGEMENT */}
          {/* ======================================================== */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Homepage Live Products Counter Banner */}
              <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Homepage Live Products Counter: <span className="font-mono text-indigo-600 dark:text-indigo-400 font-extrabold text-sm">{settings?.stats?.productsBuilt || 0}+ Products Built</span>
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      You have <strong className="font-mono text-slate-900 dark:text-white">{products.length}</strong> product items in your database. The homepage displays <strong className="font-mono text-indigo-600 dark:text-indigo-400">{settings?.stats?.productsBuilt || 0}+</strong>.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('stats')}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-500/40 text-indigo-600 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Change Counter Number</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Proprietary Products Studio</h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Manage SaaS platforms, tools, and developer utilities developed by OMTECHO.</p>
                </div>

                <button
                  onClick={() => setEditingProduct({
                    name: '',
                    tagline: '',
                    category: 'SaaS Platform',
                    status: 'Live',
                    description: '',
                    technologies: ['React', 'Node.js', 'MongoDB'],
                    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
                    featured: true
                  })}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Product Form */}
              {editingProduct && (
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-purple-300 dark:border-purple-500/40 shadow-xl dark:shadow-2xl">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {editingProduct.id ? 'Edit Product' : 'Create In-House Product'}
                    </h3>
                    <button onClick={() => setEditingProduct(null)} className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Product Name *</label>
                        <input
                          type="text"
                          required
                          value={editingProduct.name || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Category</label>
                        <input
                          type="text"
                          value={editingProduct.category || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Status</label>
                        <select
                          value={editingProduct.status || 'Live'}
                          onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value as ProductStatus })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                        >
                          <option value="Live">Live</option>
                          <option value="Coming Soon">Coming Soon</option>
                          <option value="In Development">In Development</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Tagline</label>
                        <input
                          type="text"
                          value={editingProduct.tagline || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Metrics / Badge</label>
                        <input
                          type="text"
                          placeholder="e.g. 25k+ Commits Analyzed"
                          value={editingProduct.metrics || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, metrics: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Product URL</label>
                        <input
                          type="url"
                          value={editingProduct.productUrl || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, productUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Image URL</label>
                        <input
                          type="url"
                          value={editingProduct.imageUrl || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Description *</label>
                      <textarea
                        required
                        rows={3}
                        value={editingProduct.description || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        value={(editingProduct.technologies || []).join(', ')}
                        onChange={(e) => setEditingProduct({
                          ...editingProduct,
                          technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                        })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-md transition-colors"
                      >
                        Save Product
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Products List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((p) => (
                  <div key={p.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase font-semibold">{p.category}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-[10px] font-semibold">
                          {p.status}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">{p.name}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">{p.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{p.metrics || 'Proprietary'}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-300 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/60 hover:bg-rose-200 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: SERVICES MANAGEMENT */}
          {/* ======================================================== */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Client Services Manager</h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Edit technology offerings, deliverables, and starting prices.</p>
                </div>

                <button
                  onClick={() => setEditingService({
                    title: '',
                    shortDescription: '',
                    fullDescription: '',
                    icon: 'Layers',
                    pricingStartingAt: '₹45,000',
                    technologies: ['React', 'Node.js', 'Express'],
                    deliverables: ['Custom Architecture', 'Responsive UI', 'Deployment']
                  })}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </div>

              {/* Service Form Drawer */}
              {editingService && (
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-teal-300 dark:border-teal-500/40 shadow-xl dark:shadow-2xl">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {editingService.id ? 'Edit Service' : 'Add New Service'}
                    </h3>
                    <button onClick={() => setEditingService(null)} className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveService} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Service Title *</label>
                        <input
                          type="text"
                          required
                          value={editingService.title || ''}
                          onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Icon</label>
                        <select
                          value={editingService.icon || 'Layers'}
                          onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                        >
                          <option value="Globe">Globe (Web)</option>
                          <option value="Layers">Layers (MERN/Fullstack)</option>
                          <option value="Sparkles">Sparkles (AI/Intelligence)</option>
                          <option value="Layout">Layout (UI/UX Design)</option>
                          <option value="ShoppingCart">ShoppingCart (E-Commerce)</option>
                          <option value="Cpu">Cpu (Custom Software)</option>
                          <option value="ShieldCheck">ShieldCheck (Security/Cloud)</option>
                          <option value="Smartphone">Smartphone (Mobile)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Starting Price (INR)</label>
                      <input
                        type="text"
                        placeholder="e.g. ₹45,000"
                        value={editingService.pricingStartingAt || ''}
                        onChange={(e) => setEditingService({ ...editingService, pricingStartingAt: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Short Description *</label>
                      <textarea
                        required
                        rows={2}
                        value={editingService.shortDescription || ''}
                        onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Deliverables (comma-separated)</label>
                      <textarea
                        rows={2}
                        value={(editingService.deliverables || []).join(', ')}
                        onChange={(e) => setEditingService({
                          ...editingService,
                          deliverables: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                        })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        value={(editingService.technologies || []).join(', ')}
                        onChange={(e) => setEditingService({
                          ...editingService,
                          technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                        })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => setEditingService(null)}
                        className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold shadow-md transition-colors"
                      >
                        Save Service
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Services List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((s) => (
                  <div key={s.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-bold text-slate-900 dark:text-white text-base">{s.title}</span>
                        {s.pricingStartingAt && (
                          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">{s.pricingStartingAt}</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{s.shortDescription}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingService(s)}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-300 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(s.id, s.title)}
                        className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/60 hover:bg-rose-200 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: CLIENT ENQUIRIES INBOX */}
          {/* ======================================================== */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Client Enquiries Inbox</h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">Incoming consultation requests, quotes, and project submissions.</p>
              </div>

              {enquiries.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <Mail className="w-8 h-8 text-slate-400 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">Inbox is empty. When visitors submit the contact form, their message will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {enquiries.map((enq) => {
                    const waReplyUrl = enq.phone
                      ? buildWhatsAppLink(enq.phone, `Hello ${enq.name}, thank you for contacting OMTECHO regarding "${enq.service}".`)
                      : null;
                    const mailtoReplyUrl = buildMailtoLink(
                      enq.email,
                      `Re: OMTECHO Project Inquiry - ${enq.service || 'Software Development'}`,
                      `Hello ${enq.name},\n\nThank you for reaching out to OMTECHO regarding your project.\n\nWe reviewed your requirements:\n"${enq.message}"\n\nLet's set up a quick discovery call to discuss architecture and timelines.\n\nBest regards,\nOMTECHO Technical Team`
                    );

                    return (
                      <div
                        key={enq.id}
                        className={`p-6 rounded-2xl border transition-all text-xs shadow-sm ${
                          enq.status === 'new'
                            ? 'bg-white dark:bg-slate-900 border-indigo-300 dark:border-indigo-500/50 ring-1 ring-indigo-500/20'
                            : 'bg-white/80 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 dark:text-white text-sm">{enq.name}</span>
                              {enq.company && <span className="text-slate-500 dark:text-slate-400">({enq.company})</span>}
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                                {new Date(enq.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 mt-1 text-slate-600 dark:text-slate-400">
                              <span>📧 {enq.email}</span>
                              {enq.phone && <span>📱 {enq.phone}</span>}
                              {enq.budget && <span className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">💰 Budget: {enq.budget}</span>}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={enq.status}
                              onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)}
                              className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                            >
                              <option value="new">New</option>
                              <option value="in_discussion">In Discussion</option>
                              <option value="completed">Completed</option>
                              <option value="archived">Archived</option>
                            </select>

                            <button
                              onClick={() => handleDeleteEnquiry(enq.id)}
                              className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/60 hover:bg-rose-200 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 transition-colors"
                              title="Delete Enquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800/80">
                            {enq.message}
                          </p>
                        </div>

                        {/* Direct Fast Reply Buttons */}
                        <div className="flex items-center gap-3 pt-2">
                          <a
                            href={mailtoReplyUrl}
                            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reply via Email</span>
                          </a>

                          {waReplyUrl && (
                            <a
                              href={waReplyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Reply on WhatsApp</span>
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: DEVELOPER PORTFOLIO & FOUNDER CMS */}
          {/* ======================================================== */}
          {activeTab === 'portfolio' && settings && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Developer Portfolio & Founder CMS</h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Customize the developer portfolio showcase, personal website URL, founder bio, skills, and live availability badge.</p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={settings.founder?.portfolioUrl || 'https://echoportfolio.vercel.app/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    <span>Test Current Portfolio Link</span>
                    <ExternalLink className="w-3.5 h-3.5 text-indigo-500" />
                  </a>

                  <button
                    onClick={() => handleSavePortfolioSettings()}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Portfolio Settings</span>
                  </button>
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 shadow-xl text-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-indigo-300">Live Preview: Projects Page Showcase Banner</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Updates dynamically as you edit below</span>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 border border-white/10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-xl">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-semibold">
                      <Sparkles className="w-3 h-3" />
                      <span>{settings.founder?.badge ? `${settings.founder.badge} Showcase` : 'Featured Developer Showcase'}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {settings.founder?.showcaseTitle || 'D. Madhavan — Developer Portfolio'}
                    </h3>
                    <p className="text-xs text-indigo-100 leading-relaxed">
                      {settings.founder?.showcaseDescription || 'Explore my development projects, technical skills, experience and digital products.'}
                    </p>
                  </div>

                  <div className="px-5 py-2.5 rounded-xl bg-white text-indigo-900 font-bold text-xs shadow-md flex items-center gap-1.5 shrink-0">
                    <span>{settings.founder?.showcaseButtonText || 'View Portfolio'}</span>
                    <span>→</span>
                  </div>
                </div>
              </div>

              {/* Edit Form */}
              <form onSubmit={handleSavePortfolioSettings} className="space-y-6 text-xs">
                
                {/* 0. CEO Profile (Kiruthika D) */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                        CEO Profile & Leadership Card
                      </h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-bold text-[10px]">
                      Studio Leadership
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">CEO Name *</label>
                      <input
                        type="text"
                        required
                        value={settings.ceo?.name || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          ceo: {
                            ...(settings.ceo || { role: '', degree: '', badge: '', initials: '' }),
                            name: e.target.value
                          }
                        })}
                        placeholder="e.g. Kiruthika D"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Avatar Initials</label>
                      <input
                        type="text"
                        maxLength={4}
                        value={settings.ceo?.initials || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          ceo: {
                            ...(settings.ceo || { name: '', role: '', degree: '', badge: '' }),
                            initials: e.target.value
                          }
                        })}
                        placeholder="e.g. KD"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono uppercase focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Official CEO Title</label>
                      <input
                        type="text"
                        value={settings.ceo?.role || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          ceo: {
                            ...(settings.ceo || { name: '', degree: '', badge: '', initials: '' }),
                            role: e.target.value
                          }
                        })}
                        placeholder="e.g. CEO — Omtecho Studio"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Academic Qualification *</label>
                      <input
                        type="text"
                        value={settings.ceo?.degree || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          ceo: {
                            ...(settings.ceo || { name: '', role: '', badge: '', initials: '' }),
                            degree: e.target.value
                          }
                        })}
                        placeholder="e.g. B.Tech — Information Technology"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 1. Founder Identity & Profile (D. Madhavan) */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                      Founder Profile & Public Identity
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Founder / Developer Name *</label>
                      <input
                        type="text"
                        required
                        value={settings.founder?.name || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          founder: {
                            ...(settings.founder || {
                              role: '', degree: '', badge: '', bio: '', portfolioUrl: '', portfolioButtonText: '', initials: '', availabilityStatus: '', skills: [], showcaseTitle: '', showcaseDescription: '', showcaseButtonText: ''
                            }),
                            name: e.target.value
                          }
                        })}
                        placeholder="e.g. D. Madhavan"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Avatar Initials</label>
                      <input
                        type="text"
                        maxLength={4}
                        value={settings.founder?.initials || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          founder: {
                            ...(settings.founder || {
                              name: '', role: '', degree: '', badge: '', bio: '', portfolioUrl: '', portfolioButtonText: '', availabilityStatus: '', skills: [], showcaseTitle: '', showcaseDescription: '', showcaseButtonText: ''
                            }),
                            initials: e.target.value
                          }
                        })}
                        placeholder="e.g. DM"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono uppercase focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Professional Title / Subtitle</label>
                      <input
                        type="text"
                        value={settings.founder?.role || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          founder: {
                            ...(settings.founder || {
                              name: '', degree: '', badge: '', bio: '', portfolioUrl: '', portfolioButtonText: '', initials: '', availabilityStatus: '', skills: [], showcaseTitle: '', showcaseDescription: '', showcaseButtonText: ''
                            }),
                            role: e.target.value
                          }
                        })}
                        placeholder="e.g. Founder & Full-Stack Developer — Omtecho Studio"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Academic Qualification *</label>
                      <input
                        type="text"
                        value={settings.founder?.degree || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          founder: {
                            ...(settings.founder || {
                              name: '', role: '', badge: '', bio: '', portfolioUrl: '', portfolioButtonText: '', initials: '', availabilityStatus: '', skills: [], showcaseTitle: '', showcaseDescription: '', showcaseButtonText: ''
                            }),
                            degree: e.target.value
                          }
                        })}
                        placeholder="e.g. B.Tech — Information Technology (Currently Pursuing)"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Specialty Badge Text</label>
                    <input
                      type="text"
                      value={settings.founder?.badge || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        founder: {
                          ...(settings.founder || {
                            name: '', role: '', bio: '', portfolioUrl: '', portfolioButtonText: '', initials: '', availabilityStatus: '', skills: [], showcaseTitle: '', showcaseDescription: '', showcaseButtonText: ''
                          }),
                          badge: e.target.value
                        }
                      })}
                      placeholder="e.g. Lead Solutions Architect"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Availability Status</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={settings.founder?.availabilityStatus || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          founder: {
                            ...(settings.founder || {
                              name: '', role: '', badge: '', bio: '', portfolioUrl: '', portfolioButtonText: '', initials: '', skills: [], showcaseTitle: '', showcaseDescription: '', showcaseButtonText: ''
                            }),
                            availabilityStatus: e.target.value
                          }
                        })}
                        placeholder="e.g. Online, Available for Projects, Taking Q2 Sprints"
                        className="flex-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                      <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Live Pill</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Founder Bio / Elevator Pitch</label>
                    <textarea
                      rows={3}
                      value={settings.founder?.bio || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        founder: {
                          ...(settings.founder || {
                            name: '', role: '', badge: '', portfolioUrl: '', portfolioButtonText: '', initials: '', availabilityStatus: '', skills: [], showcaseTitle: '', showcaseDescription: '', showcaseButtonText: ''
                          }),
                          bio: e.target.value
                        }
                      })}
                      placeholder="e.g. I build modern websites, web applications and digital products that help businesses and startups establish a strong digital presence."
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* 2. Developer Portfolio URL & Actions */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                      Personal Portfolio URL & CTA Buttons
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Developer Portfolio Website URL *
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          required
                          value={settings.founder?.portfolioUrl || ''}
                          onChange={(e) => setSettings({
                            ...settings,
                            founder: {
                              ...(settings.founder || {
                                name: '', role: '', badge: '', bio: '', portfolioButtonText: '', initials: '', availabilityStatus: '', skills: [], showcaseTitle: '', showcaseDescription: '', showcaseButtonText: ''
                              }),
                              portfolioUrl: e.target.value
                            }
                          })}
                          placeholder="https://echoportfolio.vercel.app/"
                          className="flex-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500"
                        />
                        {settings.founder?.portfolioUrl && (
                          <a
                            href={settings.founder.portfolioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 transition-colors border border-slate-200 dark:border-slate-700"
                            title="Open URL in new tab"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">This URL is opened when users click the "View Portfolio" buttons across the site.</p>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Founder Section Button Text
                      </label>
                      <input
                        type="text"
                        value={settings.founder?.portfolioButtonText || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          founder: {
                            ...(settings.founder || {
                              name: '', role: '', badge: '', bio: '', portfolioUrl: '', initials: '', availabilityStatus: '', skills: [], showcaseTitle: '', showcaseDescription: '', showcaseButtonText: ''
                            }),
                            portfolioButtonText: e.target.value
                          }
                        })}
                        placeholder="e.g. View My Portfolio"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Projects Page Showcase Banner Content */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                      Projects Page Showcase Banner Content
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Showcase Headline</label>
                      <input
                        type="text"
                        value={settings.founder?.showcaseTitle || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          founder: {
                            ...(settings.founder || {
                              name: '', role: '', badge: '', bio: '', portfolioUrl: '', portfolioButtonText: '', initials: '', availabilityStatus: '', skills: [], showcaseDescription: '', showcaseButtonText: ''
                            }),
                            showcaseTitle: e.target.value
                          }
                        })}
                        placeholder="e.g. D. Madhavan — Developer Portfolio"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Showcase Button Text</label>
                      <input
                        type="text"
                        value={settings.founder?.showcaseButtonText || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          founder: {
                            ...(settings.founder || {
                              name: '', role: '', badge: '', bio: '', portfolioUrl: '', portfolioButtonText: '', initials: '', availabilityStatus: '', skills: [], showcaseTitle: '', showcaseDescription: ''
                            }),
                            showcaseButtonText: e.target.value
                          }
                        })}
                        placeholder="e.g. View Portfolio"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Showcase Description</label>
                    <textarea
                      rows={2}
                      value={settings.founder?.showcaseDescription || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        founder: {
                          ...(settings.founder || {
                            name: '', role: '', badge: '', bio: '', portfolioUrl: '', portfolioButtonText: '', initials: '', availabilityStatus: '', skills: [], showcaseTitle: '', showcaseButtonText: ''
                          }),
                          showcaseDescription: e.target.value
                        }
                      })}
                      placeholder="e.g. Explore my development projects, technical skills, experience and digital products."
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* 4. Skills & Focus Tags */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                    Key Technical Skills & Focus Areas (Tags)
                  </h3>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Skills (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={skillsInput}
                      onChange={(e) => setSkillsInput(e.target.value)}
                      placeholder="e.g. React / Next.js, TypeScript / Node.js, SaaS Architecture, Cloud & DevOps"
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Render tag chips */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-slate-500 text-[11px] font-semibold">Active Tag Preview:</span>
                    {skillsInput.split(',').map(s => s.trim()).filter(Boolean).map((skill, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-mono text-xs border border-indigo-200 dark:border-indigo-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Submit Save */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => loadAllData()}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Portfolio & Founder Settings</span>
                  </button>
                </div>
              </form>
            </div>
          )}
          {activeTab === 'settings' && settings && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Website Settings & CMS</h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">Update company branding, contact phone/email, homepage hero copy, and stats counters.</p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
                {/* Brand & Primary Contact */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">Company Identity & Direct Channels</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Company Name</label>
                      <input
                        type="text"
                        value={settings.companyName || ''}
                        onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Studio Tagline</label>
                      <input
                        type="text"
                        value={settings.tagline || ''}
                        onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Primary WhatsApp Number (for direct chat buttons)</label>
                      <input
                        type="text"
                        placeholder="e.g. 8122580372"
                        value={settings.primaryWhatsApp || ''}
                        onChange={(e) => setSettings({ ...settings, primaryWhatsApp: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Primary Email Address</label>
                      <input
                        type="email"
                        value={settings.primaryEmail || ''}
                        onChange={(e) => setSettings({ ...settings, primaryEmail: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Physical / Remote Location Address</label>
                    <input
                      type="text"
                      value={settings.address || ''}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Social Media & Official Channels */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                        Official Social Media & Profiles
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        These links appear in the website footer, contact page, and developer portfolio.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        LinkedIn Profile / Page URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://www.linkedin.com/in/omtecho-studio-258305431"
                        value={settings.socialLinks?.linkedin || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          socialLinks: {
                            ...(settings.socialLinks || { github: '', linkedin: '', twitter: '', instagram: '', youtube: '' }),
                            linkedin: e.target.value
                          }
                        })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        GitHub Organization / Profile URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/omtechostudio"
                        value={settings.socialLinks?.github || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          socialLinks: {
                            ...(settings.socialLinks || { github: '', linkedin: '', twitter: '', instagram: '', youtube: '' }),
                            github: e.target.value
                          }
                        })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Twitter / X URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://twitter.com/omtechostudio"
                        value={settings.socialLinks?.twitter || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          socialLinks: {
                            ...(settings.socialLinks || { github: '', linkedin: '', twitter: '', instagram: '', youtube: '' }),
                            twitter: e.target.value
                          }
                        })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Instagram URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://instagram.com/omtechostudio"
                        value={settings.socialLinks?.instagram || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          socialLinks: {
                            ...(settings.socialLinks || { github: '', linkedin: '', twitter: '', instagram: '', youtube: '' }),
                            instagram: e.target.value
                          }
                        })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        YouTube Channel URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://youtube.com/@omtechostudio"
                        value={settings.socialLinks?.youtube || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          socialLinks: {
                            ...(settings.socialLinks || { github: '', linkedin: '', twitter: '', instagram: '', youtube: '' }),
                            youtube: e.target.value
                          }
                        })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Homepage Hero Settings */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">Homepage Hero Content</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Hero Title</label>
                      <input
                        type="text"
                        value={settings.hero?.title || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          hero: { ...settings.hero, title: e.target.value }
                        })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Hero Highlight Text</label>
                      <input
                        type="text"
                        value={settings.hero?.highlight || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          hero: { ...settings.hero, highlight: e.target.value }
                        })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Hero Subtitle</label>
                    <textarea
                      rows={2}
                      value={settings.hero?.subtitle || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        hero: { ...settings.hero, subtitle: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Developer Portfolio & Founder Quick Settings */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                        Developer Portfolio & Founder Configuration
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('portfolio')}
                      className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors flex items-center gap-1"
                    >
                      <span>Full Portfolio CMS</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Developer Portfolio URL</label>
                      <input
                        type="url"
                        value={settings.founder?.portfolioUrl || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          founder: {
                            ...(settings.founder || {
                              name: '', role: '', badge: '', bio: '', portfolioButtonText: '', initials: '', availabilityStatus: '', skills: [], showcaseTitle: '', showcaseDescription: '', showcaseButtonText: ''
                            }),
                            portfolioUrl: e.target.value
                          }
                        })}
                        placeholder="https://echoportfolio.vercel.app/"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Founder / Developer Name</label>
                      <input
                        type="text"
                        value={settings.founder?.name || ''}
                        onChange={(e) => setSettings({
                          ...settings,
                          founder: {
                            ...(settings.founder || {
                              role: '', badge: '', bio: '', portfolioUrl: '', portfolioButtonText: '', initials: '', availabilityStatus: '', skills: [], showcaseTitle: '', showcaseDescription: '', showcaseButtonText: ''
                            }),
                            name: e.target.value
                          }
                        })}
                        placeholder="e.g. D. Madhavan"
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Live Statistics Counters */}
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">Live Counter Statistics</h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Products Built</label>
                      <input
                        type="number"
                        value={settings.stats?.productsBuilt || 0}
                        onChange={(e) => setSettings({
                          ...settings,
                          stats: { ...settings.stats, productsBuilt: Number(e.target.value) }
                        })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Projects Completed</label>
                      <input
                        type="number"
                        value={settings.stats?.projectsCompleted || 0}
                        onChange={(e) => setSettings({
                          ...settings,
                          stats: { ...settings.stats, projectsCompleted: Number(e.target.value) }
                        })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Technologies Count</label>
                      <input
                        type="number"
                        value={settings.stats?.technologiesCount || 0}
                        onChange={(e) => setSettings({
                          ...settings,
                          stats: { ...settings.stats, technologiesCount: Number(e.target.value) }
                        })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Happy Clients</label>
                      <input
                        type="number"
                        value={settings.stats?.happyClients || 0}
                        onChange={(e) => setSettings({
                          ...settings,
                          stats: { ...settings.stats, happyClients: Number(e.target.value) }
                        })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30 transition-all"
                  >
                    Save All Website Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 8: SECURITY & PROFILE */}
          {/* ======================================================== */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Security & Admin Profile</h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">Change your owner username, email, and master dashboard password.</p>
              </div>

              {/* Profile info */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono">Owner Credentials</h3>
                <form onSubmit={handleUpdateProfile} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Username</label>
                    <input
                      type="text"
                      value={profileState.username}
                      onChange={(e) => setProfileState({ ...profileState, username: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Email</label>
                    <input
                      type="email"
                      value={profileState.email}
                      onChange={(e) => setProfileState({ ...profileState, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold transition-colors"
                  >
                    Update Profile
                  </button>
                </form>
              </div>

              {/* Password update */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono">Change Password</h3>
                <form onSubmit={handleUpdatePassword} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Current Password</label>
                    <input
                      type="password"
                      required
                      value={passState.current}
                      onChange={(e) => setPassState({ ...passState, current: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">New Password (min 6 characters)</label>
                    <input
                      type="password"
                      required
                      value={passState.next}
                      onChange={(e) => setPassState({ ...passState, next: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={passState.confirm}
                      onChange={(e) => setPassState({ ...passState, confirm: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md transition-colors"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* In-App Delete Confirmation Modal (Robust in iframe / web environment) */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-500/40 rounded-3xl p-6 shadow-2xl space-y-5 text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-500/20 border border-rose-300 dark:border-rose-500/30 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                    Delete {deleteConfirm.type.charAt(0).toUpperCase() + deleteConfirm.type.slice(1)}?
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    This action will permanently remove this record from the database.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <span className="text-slate-500 uppercase font-mono text-[10px] block mb-1">Item to delete:</span>
                <span className="font-semibold text-slate-900 dark:text-white font-mono break-all">{deleteConfirm.title}</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleExecuteDelete}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-rose-600/25 flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isDeleting ? 'Deleting...' : 'Yes, Delete Now'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
