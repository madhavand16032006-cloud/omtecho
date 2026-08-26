import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Send, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Check,
  Copy,
  Sparkles, 
  Building2,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CompanySettings } from '../types';
import { api, buildWhatsAppLink, buildMailtoLink } from '../lib/api';
import { useToast } from '../components/Toast';

interface ContactPageProps {
  settings: CompanySettings | null;
  initialService?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ 
  settings, 
  initialService = '' 
}) => {
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: initialService || 'Web Application Development',
    budget: '₹25,000 - ₹75,000',
    message: ''
  });

  const companyName = settings?.companyName || 'OMTECHO';
  const phoneNum = settings?.primaryWhatsApp || '8122580372';
  const emailAddr = settings?.primaryEmail || 'omtecho.tech@gmail.com';
  const address = settings?.address || 'Tech Innovation Hub & Global Remote Delivery';

  const waUrl = buildWhatsAppLink(
    phoneNum,
    `Hello ${companyName}, I would like to schedule a discovery call for my software project. My name is ${formData.name || 'a prospective client'}.`
  );

  const mailtoUrl = buildMailtoLink(
    emailAddr,
    `Project Discovery Inquiry - ${formData.company || formData.name || 'New Client'}`,
    `Hello ${companyName} Team,\n\nI am interested in discussing a project for ${formData.service}.\n\nMessage:\n${formData.message || 'Please share your availability for a call.'}\n\nContact: ${formData.name} (${formData.email}, ${formData.phone})\n\nThank you.`
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in your Name, Email, and Message.', 'error');
      return;
    }

    setSubmitting(true);
    const submittedSnapshot = { ...formData };
    try {
      const res = await api.submitEnquiry(formData);
      setLastSubmittedData(submittedSnapshot);
      setSubmitted(true);
      showToast(res.message || 'Your project enquiry has been submitted successfully. Our team will contact you soon.', 'success');
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'Web Application Development',
        budget: '₹25,000 - ₹75,000',
        message: ''
      });
    } catch (err: any) {
      showToast(err.message || 'Failed to submit enquiry. Please try again or reach us on WhatsApp.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyDetails = (data: any) => {
    if (!data) return;
    const text = `OMTECHO Project Enquiry:\nClient: ${data.name} (${data.email}, ${data.phone})\nCompany: ${data.company}\nService: ${data.service}\nBudget: ${data.budget}\nDetails: ${data.message}`;
    navigator.clipboard.writeText(text);
    showToast('Enquiry details copied to clipboard!', 'success');
  };

  return (
    <div id="contact-page" className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-4">
            <Send className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Direct Studio Communication</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Let's Build Something Together.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Have a project, product idea, or looking for dedicated engineering support? Tell us about your goals and our technical team will prepare a structured proposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact & Details */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Quick Action Badges */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-md space-y-4 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Fast Response Channels
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                Need an immediate response? Connect directly with our lead developers:
              </p>

              <div className="space-y-3">
                <a
                  id="contact-page-whatsapp-btn"
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500 text-white dark:text-slate-950 group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Chat on WhatsApp</p>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400/80">+{phoneNum} (5-min response)</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                    Online
                  </span>
                </a>

                <a
                  id="contact-page-email-btn"
                  href={mailtoUrl}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-300 dark:border-indigo-500/40 text-indigo-800 dark:text-indigo-300 transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-indigo-500 text-white group-hover:scale-105 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Send Direct Email</p>
                      <p className="text-[11px] text-indigo-700 dark:text-indigo-300/80">{emailAddr}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-indigo-200 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300">
                    Direct
                  </span>
                </a>
              </div>
            </div>

            {/* Studio Info Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 text-xs shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block font-mono text-[10px] uppercase">Location</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block font-mono text-[10px] uppercase">Business Hours & SLAs</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">Monday – Saturday (24/7 Monitoring for Live Systems)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block font-mono text-[10px] uppercase">Confidentiality Guarantee</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">We sign standard NDAs before discussing proprietary ideas.</span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between shadow-sm">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Follow OMTECHO:</span>
              <div className="flex items-center gap-2">
                {settings?.socialLinks?.github && (
                  <a href={settings.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {settings?.socialLinks?.linkedin && (
                  <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {settings?.socialLinks?.twitter && (
                  <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {settings?.socialLinks?.instagram && (
                  <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-2xl relative">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white text-left">
                  Send a Project Enquiry
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-[11px] font-mono font-medium">
                  <Mail className="w-3 h-3" />
                  <span>{emailAddr}</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 text-left leading-relaxed">
                Fill out the details below. Your enquiry will be routed directly to our lead engineering team at <strong className="text-indigo-600 dark:text-indigo-400">{emailAddr}</strong> and logged in our system.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 sm:p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Enquiry Submitted!</h4>
                    <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400 mt-0.5">
                      Auto-notified: {emailAddr}
                    </p>
                  </div>

                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 max-w-md mx-auto leading-relaxed">
                    Your project enquiry has been submitted successfully. Our team will contact you soon.
                  </p>

                  {lastSubmittedData && (
                    <div className="text-left p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 shadow-sm">
                      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-1.5 mb-1.5">
                        <span className="font-bold text-slate-900 dark:text-white text-[11px] uppercase tracking-wider font-mono">Enquiry Summary</span>
                        <button
                          onClick={() => handleCopyDetails(lastSubmittedData)}
                          className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                        >
                          Copy details
                        </button>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400">Client:</span> {lastSubmittedData.name} ({lastSubmittedData.email})</p>
                      <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400">Service:</span> {lastSubmittedData.service}</p>
                      <p className="text-slate-700 dark:text-slate-300"><span className="text-slate-500 dark:text-slate-400">Budget:</span> {lastSubmittedData.budget}</p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => handleCopyDetails(lastSubmittedData)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
                    >
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>Copy Enquiry Details</span>
                    </button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold underline transition-colors"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {/* Anti-spam hidden honeypot */}
                  <input
                    type="text"
                    name="hp_website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden opacity-0 pointer-events-none absolute -left-9999px"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Madhavan / Sarah Chen"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                        Company / Brand Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Acme Labs"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Service Required */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                        Service Required
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      >
                        <option value="Web Application Development">Web Application Development</option>
                        <option value="MERN Stack Engineering">MERN Stack Engineering</option>
                        <option value="AI-Powered Applications">AI-Powered Applications</option>
                        <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                        <option value="E-Commerce Solutions">E-Commerce Solutions</option>
                        <option value="Custom Software & Cloud">Custom Software & Cloud</option>
                        <option value="Special Launch Offer Package">Special Launch Offer Package</option>
                        <option value="Proprietary Product Licensing">Proprietary Product Licensing</option>
                      </select>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      >
                        <option value="Under ₹25,000">Under ₹25,000</option>
                        <option value="₹25,000 - ₹75,000">₹25,000 - ₹75,000</option>
                        <option value="₹75,000 - ₹2,00,000">₹75,000 - ₹2,00,000</option>
                        <option value="₹2,00,000 - ₹5,00,000">₹2,00,000 - ₹5,00,000</option>
                        <option value="₹5,00,000+ (Enterprise / Custom)">₹5,00,000+ (Enterprise / Custom)</option>
                        <option value="Not Sure / Need Consultation">Not Sure / Need Consultation</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                      Project Description & Goals *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your product idea, key features, target timeline, and any reference designs or existing systems..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Direct delivery notice */}
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/20 text-[11px] text-indigo-700 dark:text-indigo-300">
                    <Mail className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span>Delivered directly to <strong>{emailAddr}</strong> and stored securely in OMTECHO portal.</span>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      id="contact-submit-enquiry-btn"
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>Submitting to OMTECHO...</span>
                      ) : (
                        <>
                          <span>Send Enquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
