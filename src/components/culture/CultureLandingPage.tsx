import React from 'react';
import { ArrowLeft, Feather } from 'lucide-react';

interface CultureLandingPageProps {
  onSelectExploreCulture: () => void;
  onSelectCreateCulture?: () => void;
  onBackToHome: () => void;
}

export const CultureLandingPage: React.FC<CultureLandingPageProps> = ({
  onSelectExploreCulture,
  onBackToHome
}) => {
  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fadeIn">
      {/* Top Breadcrumb & Return to Home */}
      <div className="mb-8">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest-800 hover:text-gold-dark transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>← Back to Home</span>
        </button>
      </div>

      {/* Main Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-gold" />
          <span className="text-gold uppercase tracking-[0.25em] text-xs font-bold font-serif">
            LIVING TRADITIONS &amp; HERITAGE
          </span>
          <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-gold" />
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest-900 mb-4 tracking-tight">
          DISCOVER THE CULTURE OF DHEMAJI
        </h1>

        <p className="font-editorial italic text-xl sm:text-2xl text-gold-dark mb-4 font-normal">
          Traditions, stories, art and living heritage.
        </p>

        <div className="jaapi-glow-line h-0.5 w-32 mx-auto mb-5" />

        <p className="text-charcoal-muted text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
          Explore the traditions, festivals, crafts, food, music, communities and stories that make Dhemaji culturally unique.
        </p>
      </div>

      {/* Expanded & Premium Interactive Visual Card */}
      <div className="max-w-5xl mx-auto">
        {/* CARD — EXPLORE CULTURE */}
        <article
          onClick={onSelectExploreCulture}
          className="group bg-[#FCFAF6] rounded-3xl overflow-hidden shadow-deep-card border border-stone-200/90 hover:border-gold/80 transition-all duration-500 hover:-translate-y-1.5 cursor-pointer grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Visual Media Container with Image Zoom (7 cols on lg) */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[360px] lg:min-h-[420px] overflow-hidden">
            <img
              alt="Traditional Mising dancer and weaver with loom and Jaapi in Dhemaji"
              className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XLaDatDG3wv1luoXRyFOLj9cd0n_0Z-GNiV0kCa952geoptPnIA8EhoxE6wI88o5Txnrd7PP1lZ_BZDBU8-GJZZXe0Dv4QC2r0qv5Ye1Dg_Q5JWC8I9D60KA8guQfGuXtMmkml9sRcXrMjt5mGhPWi0ZKfdCmEIG3wsMPgV9Y7frqG0bAkZX6r6LbPnH1FbUmIoRfbhEiyf-JY_YEq1uLLlsRIgu0qekZVGxOYUJU1GiSXl4Jzezjby8E"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-forest-900/20 lg:to-forest-900/60" />

            {/* Number Badge */}
            <span className="absolute top-5 left-5 bg-forest-900/90 text-gold border border-gold/40 text-xs font-serif font-bold px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-xs flex items-center gap-1.5">
              <Feather className="w-3.5 h-3.5 text-gold" />
              <span>01</span>
            </span>

            {/* Category Pill */}
            <span className="absolute top-5 right-5 bg-gold/90 text-forest-900 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
              DISCOVER
            </span>

            {/* Bottom text inside image banner for mobile */}
            <div className="absolute bottom-5 left-6 right-6 text-white lg:hidden">
              <span className="text-[11px] font-bold tracking-widest text-[#F3CF7A] uppercase block mb-1">
                Living Archive
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                EXPLORE CULTURE
              </h2>
            </div>
          </div>

          {/* Card Editorial Content (5 cols on lg) */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-[#FCFAF6]">
            <div>
              {/* Desktop heading */}
              <div className="hidden lg:block mb-4">
                <span className="text-[11px] font-bold tracking-[0.2em] text-emerald-800 uppercase block mb-1">
                  Living Archive
                </span>
                <h2 className="font-serif text-3xl xl:text-4xl font-extrabold text-forest-900 leading-tight">
                  EXPLORE CULTURE
                </h2>
              </div>

              <p className="text-charcoal-muted text-sm sm:text-base leading-relaxed mb-6 font-light">
                Discover the traditions, festivals, crafts, food, music, communities and stories that make Dhemaji culturally unique.
              </p>

              {/* Cultural Highlights Tags */}
              <div className="space-y-2 mb-8">
                <div className="text-xs font-serif font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Featured Traditions
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-stone-600">
                  <span className="px-3 py-1.5 rounded-full bg-forest-900/5 border border-forest-900/10">🎭 Folk Dance &amp; Gumrag</span>
                  <span className="px-3 py-1.5 rounded-full bg-forest-900/5 border border-forest-900/10">🧵 Gero &amp; Loom Weaving</span>
                  <span className="px-3 py-1.5 rounded-full bg-forest-900/5 border border-forest-900/10">🎉 Ali Aye Ligang</span>
                  <span className="px-3 py-1.5 rounded-full bg-forest-900/5 border border-forest-900/10">🥁 Dhol &amp; Pepa Beats</span>
                  <span className="px-3 py-1.5 rounded-full bg-forest-900/5 border border-forest-900/10">🏠 Chang Ghar Living</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="w-full py-4 rounded-full bg-gold hover:bg-gold-hover text-forest-900 font-extrabold text-xs uppercase tracking-widest transition-all duration-300 transform group-hover:scale-[1.01] shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>EXPLORE CULTURE →</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
