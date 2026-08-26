import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Project, 
  Product, 
  Service, 
  Offer, 
  CompanySettings 
} from './types';
import { api, authStorage } from './lib/api';
import { ToastProvider, useToast } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingContact } from './components/FloatingContact';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { OffersPage } from './pages/OffersPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';

const MainApp: React.FC = () => {
  const { showToast } = useToast();
  const [currentView, setCurrentView] = useState<string>('home');
  const [targetContactParam, setTargetContactParam] = useState<string>('');
  
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Dynamic Data State
  const [projects, setProjects] = useState<Project[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [settings, setSettings] = useState<CompanySettings | null>(null);

  const fetchAppData = async () => {
    try {
      const [
        fetchedProjects,
        fetchedProducts,
        fetchedServices,
        fetchedOffers,
        fetchedSettings
      ] = await Promise.all([
        api.getProjects(),
        api.getProducts(),
        api.getServices(),
        api.getOffers(false), // only active offers for public
        api.getSettings()
      ]);

      setProjects(fetchedProjects);
      setProducts(fetchedProducts);
      setServices(fetchedServices);
      setOffers(fetchedOffers);
      setSettings(fetchedSettings);
    } catch (err: any) {
      console.error('Failed to load dynamic data:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    if (!authStorage.getToken()) {
      setIsAuthenticated(false);
      return;
    }
    try {
      const res = await api.getMe();
      if (res.user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        authStorage.clearToken();
      }
    } catch {
      setIsAuthenticated(false);
      authStorage.clearToken();
    }
  };

  useEffect(() => {
    fetchAppData();
    checkAuth();
  }, []);

  const navigateTo = (view: string, param?: string) => {
    if (param !== undefined) {
      setTargetContactParam(param);
    } else if (view !== 'contact') {
      setTargetContactParam('');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // If navigating to admin but not logged in, redirect to login
    if (view === 'admin' && !isAuthenticated) {
      setCurrentView('login');
      return;
    }

    setCurrentView(view);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentView('admin');
  };

  const handleLogout = () => {
    authStorage.clearToken();
    setIsAuthenticated(false);
    showToast('Logged out securely', 'info');
    setCurrentView('home');
    fetchAppData();
  };

  const isAdminView = currentView === 'admin';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white relative transition-colors duration-200">
      {/* Show Navbar on public pages */}
      {!isAdminView && (
        <Navbar
          currentView={currentView}
          activeView={currentView}
          onNavigate={navigateTo}
          settings={settings}
          offersCount={offers.filter(o => o.active).length}
          isAuthenticated={isAuthenticated}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <HomePage
                products={products}
                services={services}
                projects={projects}
                offers={offers}
                settings={settings}
                onNavigate={navigateTo}
              />
            </motion.div>
          )}

          {currentView === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AboutPage
                settings={settings}
                onNavigate={navigateTo}
              />
            </motion.div>
          )}

          {currentView === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ProductsPage
                products={products}
                settings={settings}
                onNavigate={navigateTo}
              />
            </motion.div>
          )}

          {currentView === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ServicesPage
                services={services}
                settings={settings}
                onNavigate={navigateTo}
              />
            </motion.div>
          )}

          {currentView === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectsPage
                projects={projects}
                settings={settings}
                onNavigate={navigateTo}
              />
            </motion.div>
          )}

          {currentView === 'offers' && (
            <motion.div
              key="offers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <OffersPage
                offers={offers}
                settings={settings}
                onNavigate={navigateTo}
              />
            </motion.div>
          )}

          {currentView === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ContactPage
                settings={settings}
                initialService={targetContactParam}
              />
            </motion.div>
          )}

          {currentView === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <LoginPage
                onLoginSuccess={handleLoginSuccess}
                onNavigateHome={() => navigateTo('home')}
              />
            </motion.div>
          )}

          {currentView === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AdminDashboard
                onLogout={handleLogout}
                onNavigateHome={() => {
                  fetchAppData();
                  navigateTo('home');
                }}
                onRefreshData={fetchAppData}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Quick Action Contact Widget (WhatsApp / Schedule) */}
      {!isAdminView && (
        <FloatingContact
          settings={settings}
          whatsappNumber={settings?.primaryWhatsApp}
          email={settings?.primaryEmail}
          onOpenContact={() => navigateTo('contact')}
        />
      )}

      {/* Footer on public pages */}
      {!isAdminView && (
        <Footer
          settings={settings}
          onNavigate={navigateTo}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}
