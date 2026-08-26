import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Tag, 
  Sparkles, 
  MessageCircle, 
  Mail, 
  Clock, 
  Check, 
  ArrowUpRight, 
  Percent,
  Flame,
  Play,
  Video,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Offer, CompanySettings } from '../types';
import { buildWhatsAppLink, buildMailtoLink } from '../lib/api';

interface OffersProps {
  offers: Offer[];
  settings: CompanySettings | null;
  onNavigateContact?: (offerTitle: string) => void;
}

export const OffersSection: React.FC<OffersProps> = ({ 
  offers, 
  settings, 
  onNavigateContact 
}) => {
  const [activeVideoOfferId, setActiveVideoOfferId] = useState<string | null>(null);

  // Only active offers
  const activeOffers = offers.filter((o) => o.active);

  const handleClaimCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

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

  if (activeOffers.length === 0) {
    return null;
  }

  return (
    <section id="offers-section" className="py-20 bg-slate-100/70 dark:bg-slate-950 relative overflow-hidden transition-colors duration-200">
      {/* Background accents */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-4 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 fill-amber-600 dark:fill-amber-400" />
            <span>Limited-Time Studio Deals</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Exclusive Packages & Launch Offers
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Take advantage of pre-bundled development packages crafted to accelerate your MVP launch, online storefront, or website revamp with predictable pricing.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {activeOffers.map((offer) => {
            const targetWa = offer.whatsapp || settings?.primaryWhatsApp || '8122580372';
            const targetEmail = offer.email || settings?.primaryEmail || 'omtecho.tech@gmail.com';

            const waUrl = buildWhatsAppLink(
              targetWa,
              `Hello OMTECHO, I want to claim your special offer: "${offer.title}" priced at ${offer.offerPrice}. Please let me know how to proceed!`
            );

            const emailSubject = `Claim Offer: ${offer.title} - OMTECHO`;
            const emailBody = `Hello OMTECHO Team,\n\nI would like to claim the special launch offer for "${offer.title}" (${offer.offerPrice}).\n\nPlease let me know the next steps and availability.\n\nThank you!`;
            const mailtoUrl = buildMailtoLink(targetEmail, emailSubject, emailBody);

            const isVideoOpen = activeVideoOfferId === offer.id;
            const embedUrl = offer.videoUrl ? getVideoEmbedUrl(offer.videoUrl) : null;
            const isDirectVideo = offer.videoUrl && (offer.videoUrl.endsWith('.mp4') || offer.videoUrl.endsWith('.webm'));

            // Format validity
            let validText = '';
            if (offer.validUntil) {
              try {
                const date = new Date(offer.validUntil);
                validText = `Valid until ${date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
              } catch {
                validText = `Valid until ${offer.validUntil}`;
              }
            }

            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 backdrop-blur-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-amber-950/30 shadow-sm"
              >
                {/* Promo Image Header if available */}
                {offer.imageUrl && (
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                    <img
                      src={offer.imageUrl}
                      alt={offer.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 dark:opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 dark:from-slate-900 via-transparent to-transparent" />

                    {/* Top tags over image */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-slate-950/90 text-slate-200 border border-slate-700/80 text-xs font-mono backdrop-blur-md">
                        {offer.category || 'Special Package'}
                      </span>

                      <div className="flex items-center gap-2">
                        {offer.badge && (
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/90 text-slate-950 text-xs font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            {offer.badge}
                          </span>
                        )}
                        {offer.discount && (
                          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-md">
                            {offer.discount}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Video watch trigger over image */}
                    {offer.videoUrl && (
                      <button
                        onClick={() => setActiveVideoOfferId(isVideoOpen ? null : offer.id)}
                        className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-purple-600/90 hover:bg-purple-500 text-white text-xs font-semibold backdrop-blur-md shadow-lg flex items-center gap-1.5 transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>{isVideoOpen ? 'Hide Video' : 'Watch Promo Video'}</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Promo Video Player if open */}
                {offer.videoUrl && isVideoOpen && (
                  <div className="p-4 bg-slate-950 border-b border-slate-800">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                      {isDirectVideo ? (
                        <video src={offer.videoUrl} controls className="w-full h-full object-cover" />
                      ) : (
                        <iframe
                          src={embedUrl || offer.videoUrl}
                          title={`${offer.title} Video Promo`}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}
                    </div>
                  </div>
                )}

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Fallback top tags if no image */}
                    {!offer.imageUrl && (
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium border border-slate-200 dark:border-transparent">
                          {offer.category || 'Special Package'}
                        </span>

                        <div className="flex items-center gap-2">
                          {offer.badge && (
                            <span className="px-2.5 py-1 rounded-full bg-amber-500/90 text-slate-950 text-xs font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              {offer.badge}
                            </span>
                          )}
                          {offer.discount && (
                            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-md">
                              {offer.discount}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Title & Description */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-200 transition-colors">
                      {offer.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      {offer.description}
                    </p>

                    {/* Video toggle if no image */}
                    {!offer.imageUrl && offer.videoUrl && (
                      <button
                        onClick={() => setActiveVideoOfferId(isVideoOpen ? null : offer.id)}
                        className="mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-950/70 hover:bg-purple-200 dark:hover:bg-purple-900 border border-purple-300 dark:border-purple-500/30 text-purple-800 dark:text-purple-300 text-xs font-semibold transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-purple-700 dark:fill-purple-300" />
                        <span>{isVideoOpen ? 'Hide Video Walkthrough' : 'Watch Video Walkthrough'}</span>
                      </button>
                    )}

                    {/* Pricing Box */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between mb-6">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400 block">Package Price</span>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                            {offer.offerPrice}
                          </span>
                          {offer.originalPrice && (
                            <span className="text-xs text-slate-400 dark:text-slate-500 line-through font-mono">
                              {offer.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {validText && (
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400/90 font-medium">
                            <Clock className="w-3 h-3" />
                            {validText}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Features List */}
                    {offer.features && offer.features.length > 0 && (
                      <div className="space-y-2 mb-8">
                        <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                          Included in this package:
                        </p>
                        {offer.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                            <div className="p-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                              <Check className="w-3 h-3" />
                            </div>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions (WhatsApp & Email Direct Booking) */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleClaimCelebration}
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp: {targetWa}</span>
                    </a>

                    <a
                      href={mailtoUrl}
                      onClick={handleClaimCelebration}
                      className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Claim via Email</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
