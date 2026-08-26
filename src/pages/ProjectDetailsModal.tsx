import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  Github, 
  MessageCircle, 
  Mail, 
  Sparkles, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  Layers, 
  Tag, 
  ArrowUpRight,
  Play,
  Video
} from 'lucide-react';
import { Project, CompanySettings } from '../types';
import { buildWhatsAppLink, buildMailtoLink } from '../lib/api';

interface ProjectDetailsModalProps {
  project: Project | null;
  settings: CompanySettings | null;
  onClose: () => void;
  onNavigateContact?: (projectName: string) => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  settings,
  onClose,
  onNavigateContact
}) => {
  const [showVideo, setShowVideo] = useState(false);

  if (!project) return null;

  const targetWa = project.whatsapp || settings?.primaryWhatsApp || '8122580372';
  const targetEmail = project.email || settings?.primaryEmail || 'omtecho.tech@gmail.com';

  const waUrl = buildWhatsAppLink(
    targetWa,
    `Hello OMTECHO, I am interested in your project "${project.name}". Please provide more details regarding architecture, pricing, and development timeline.`
  );

  const emailSubject = `Enquiry about OMTECHO Project - ${project.name}`;
  const emailBody = `Hello OMTECHO Team,\n\nI am interested in your project: "${project.name}".\n\nPlease provide more information about the project, pricing and development process.\n\nThank you.`;
  const mailtoUrl = buildMailtoLink(targetEmail, emailSubject, emailBody);

  // Helper to format video URL to embed
  const getVideoEmbedUrl = (url: string) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v');
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : url;
    }
    if (url.includes('youtu.be/')) {
      const parts = url.split('youtu.be/');
      const videoId = parts[1]?.split('?')[0];
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : url;
    }
    if (url.includes('vimeo.com/')) {
      const parts = url.split('vimeo.com/');
      const videoId = parts[1]?.split('?')[0];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
    }
    return url;
  };

  const embedUrl = project.videoUrl ? getVideoEmbedUrl(project.videoUrl) : null;
  const isDirectVideo = project.videoUrl && (project.videoUrl.endsWith('.mp4') || project.videoUrl.endsWith('.webm'));

  return (
    <AnimatePresence>
      <div 
        id="project-details-overlay" 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-3xl shadow-2xl overflow-y-auto my-auto text-left"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 dark:bg-slate-950/80 text-white dark:text-slate-400 hover:text-white border border-slate-700 dark:border-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Banner / Cover Image */}
          <div className="relative h-72 sm:h-96 w-full bg-slate-950 overflow-hidden rounded-t-3xl">
            <img
              src={project.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'}
              alt={project.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-600/90 text-white font-mono text-xs font-semibold backdrop-blur-md">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 text-xs font-semibold backdrop-blur-md">
                    {project.status}
                  </span>
                  {project.featured && (
                    <span className="px-3 py-1 rounded-full bg-amber-500/90 text-slate-950 text-xs font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {project.name}
                </h2>
              </div>

              {/* Quick Links */}
              <div className="flex items-center gap-2">
                {project.videoUrl && (
                  <button
                    onClick={() => setShowVideo(!showVideo)}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{showVideo ? 'Hide Demo Video' : 'Watch Demo Video'}</span>
                  </button>
                )}

                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg"
                  >
                    <span>Live Preview</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700"
                    title="View Source on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Video Section when toggled or if videoUrl exists */}
          {project.videoUrl && showVideo && (
            <div className="p-6 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <Video className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                  Project Video Walkthrough & Demo
                </h3>
              </div>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
                {isDirectVideo ? (
                  <video
                    src={project.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <iframe
                    src={embedUrl || project.videoUrl}
                    title={`${project.name} Video Demo`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          )}

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Meta info grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs">
              {project.clientName && (
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] block">Client / Partner</span>
                  <span className="text-slate-900 dark:text-white font-semibold flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    {project.clientName}
                  </span>
                </div>
              )}

              {project.completionDate && (
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] block">Timeline</span>
                  <span className="text-slate-900 dark:text-white font-semibold flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    {project.startDate ? `${project.startDate} to ${project.completionDate}` : project.completionDate}
                  </span>
                </div>
              )}

              {project.offerPrice && (
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] block">Package Valuation</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono text-sm block mt-0.5">
                    {project.offerPrice}
                  </span>
                </div>
              )}

              <div>
                <span className="text-slate-500 dark:text-slate-400 text-[11px] block">Direct WhatsApp</span>
                <span className="text-teal-600 dark:text-teal-400 font-mono font-semibold block mt-0.5">
                  +{targetWa}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Project Overview</h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {project.fullDescription || project.shortDescription}
              </p>
            </div>

            {/* Key Highlights */}
            {project.keyHighlights && project.keyHighlights.length > 0 && (
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Key Features & Architectural Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.keyHighlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies Used */}
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Technologies & Tooling</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Contact & Action Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-100 via-slate-100 to-purple-100 dark:from-indigo-950/70 dark:via-slate-950 dark:to-purple-950/70 border border-indigo-200 dark:border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  Want to build a solution like this?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Speak directly with our technical team via WhatsApp ({targetWa}) or Email ({targetEmail}).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: {targetWa}</span>
                </a>

                <a
                  href={mailtoUrl}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email OMTECHO</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
