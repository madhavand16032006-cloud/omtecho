import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  Github, 
  Sparkles, 
  MessageCircle, 
  Mail, 
  ExternalLink, 
  Layers, 
  Tag, 
  Calendar,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { Project, ProjectStatus } from '../types';
import { buildWhatsAppLink, buildMailtoLink } from '../lib/api';

interface ProjectCardProps {
  project: Project;
  companyWhatsApp?: string;
  companyEmail?: string;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  companyWhatsApp = '919876543210',
  companyEmail = 'contact@omtecho.com',
  onOpenDetails 
}) => {
  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'Live':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 text-[10px] font-semibold backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live System
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-950/90 text-indigo-300 border border-indigo-500/40 text-[10px] font-semibold backdrop-blur-md">
            <CheckCircle2 className="w-3 h-3 text-indigo-400" />
            Completed
          </span>
        );
      case 'In Development':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-950/90 text-purple-300 border border-purple-500/40 text-[10px] font-semibold backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            In Progress
          </span>
        );
      case 'Coming Soon':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/90 text-amber-300 border border-amber-500/40 text-[10px] font-semibold backdrop-blur-md">
            Coming Soon
          </span>
        );
      default:
        return null;
    }
  };

  const targetWa = project.whatsapp || companyWhatsApp;
  const targetEmail = project.email || companyEmail;

  const waUrl = buildWhatsAppLink(
    targetWa,
    `Hello OMTECHO, I am interested in your project "${project.name}". Please provide more details.`
  );

  const emailSubject = `Enquiry about OMTECHO Project - ${project.name}`;
  const emailBody = `Hello OMTECHO Team,\n\nI am interested in your project: "${project.name}".\n\nPlease provide more information about the project, pricing, architecture and development process.\n\nThank you.`;
  const mailtoUrl = buildMailtoLink(targetEmail, emailSubject, emailBody);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 backdrop-blur-md overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-indigo-950/40 hover:-translate-y-1 shadow-sm"
    >
      {/* Project Cover Image */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
        <img
          src={project.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'}
          alt={project.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 dark:opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-slate-950 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {getStatusBadge(project.status)}
            {project.featured && (
              <span className="px-2.5 py-1 rounded-full bg-amber-950/90 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Featured
              </span>
            )}
          </div>

          <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-[10px] font-mono text-slate-300">
            {project.category}
          </span>
        </div>

        {/* Offer Tag if applicable */}
        {project.offerPrice && (
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-mono text-xs font-bold shadow-lg">
            Package: {project.offerPrice}
          </div>
        )}

        {project.clientName && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-800 text-[11px] text-slate-300">
            <Building2 className="w-3 h-3 text-indigo-400" />
            <span>{project.clientName}</span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 
            onClick={() => onOpenDetails(project)}
            className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors mb-2 cursor-pointer"
          >
            {project.name}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-5">
            {project.shortDescription}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[10px] font-mono border border-slate-200 dark:border-slate-700/50"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 text-[10px] font-mono">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        <div>
          {/* Action Row */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenDetails(project)}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-slate-200 dark:border-transparent"
              >
                <span>View Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-600/30 hover:bg-indigo-100 dark:hover:bg-indigo-600/50 border border-indigo-200 dark:border-indigo-500/40 text-indigo-700 dark:text-indigo-300 transition-colors"
                  title="Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-transparent"
                  title="GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Direct Contact Buttons (WhatsApp & Email) */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold transition-colors"
                title="Contact on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={mailtoUrl}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 border border-indigo-300 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold transition-colors"
                title="Send Enquiry by Email"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
