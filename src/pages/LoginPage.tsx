import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles, 
  AlertCircle,
  KeyRound,
  Sun,
  Moon,
  ArrowLeft
} from 'lucide-react';
import { OmtechoLogo } from '../components/OmtechoLogo';
import { api, authStorage } from '../lib/api';
import { useToast } from '../components/Toast';
import { useTheme } from '../context/ThemeContext';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onNavigateHome: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigateHome }) => {
  const { showToast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const [identifier, setIdentifier] = useState('admin@omtecho.com');
  const [password, setPassword] = useState('admin@omtecho2025');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Please enter your username/email and password.');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const res = await api.login(identifier, password);
      showToast(`Welcome back, ${res.user.username || 'Owner'}!`, 'success');
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check credentials.');
      showToast(err.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setIdentifier('admin@omtecho.com');
    setPassword('admin@omtecho2025');
    setError(null);
  };

  return (
    <div id="login-page" className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4 relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-600/20 blur-[130px] pointer-events-none rounded-full" />

      {/* Top Floating Controls: Home & Theme Toggle */}
      <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
        <button
          id="login-theme-toggle"
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm transition-all flex items-center gap-2 text-xs font-semibold"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Dark Mode</span>
            </>
          )}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl dark:shadow-2xl relative text-left"
      >
        {/* Header with Official Omtecho Logo */}
        <div className="text-center mb-8 flex flex-col items-center">
          <button 
            onClick={onNavigateHome}
            className="mb-4 focus:outline-none hover:opacity-90 transition-opacity"
            title="Return to Home"
          >
            <OmtechoLogo size="lg" showSubtitle={true} />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mt-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Owner & Admin Portal</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            Sign in to manage projects, services, products, and enquiries
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-500/40 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
              Username or Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="login-identifier-input"
                type="text"
                required
                placeholder="admin@omtecho.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="login-password-input"
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              id="login-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Demo Credentials Helper */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-950/70 hover:bg-slate-200 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition-colors"
          >
            <KeyRound className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Use Default Credentials (admin@omtecho.com)</span>
          </button>

          <button
            type="button"
            onClick={onNavigateHome}
            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
          >
            ← Back to Public Website
          </button>
        </div>
      </motion.div>
    </div>
  );
};
