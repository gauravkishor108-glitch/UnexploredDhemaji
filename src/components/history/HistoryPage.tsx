import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Compass,
  Landmark,
  Waves,
  Users,
  Building2,
  Share2,
  Check,
  Search,
  Sparkles,
  ChevronRight,
  MapPin,
  Clock,
  Layers,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

const HISTORY_BANNER_SRC = '/src/assets/images/dhemaji_history_banner_1790788230182.jpg';

interface HistoryPageProps {
  onBackToHome: () => void;
  onExploreTourism?: () => void;
  onExploreCulture?: () => void;
}

interface Chapter {
  id: string;
  number: string;
  title: string;
  era: string;
  badge: string;
  icon: React.ReactNode;
  content: string[];
  keyHighlight?: {
    title: string;
    description: string;
    tag?: string;
  };
}

const chapters: Chapter[] = [
  {
    id: 'overview',
    number: '01',
    title: 'History of Dhemaji',
    era: 'Introduction & Foundations',
    badge: 'Regional Genesis',
    icon: <Landmark className="w-5 h-5 text-gold" />,
    content: [
      "Dhemaji, situated in the northern part of Assam along the Brahmaputra and its tributaries, has a rich and distinctive history shaped by ancient settlements, medieval kingdoms, indigenous communities, agriculture and the region's ever-changing riverine landscape.",
      "Its historical significance is closely connected with places such as Habung and with the political history of the Chutia and Ahom kingdoms."
    ],
    keyHighlight: {
      title: "Cradle of Riverine Civilisation",
      description: "Between the Himalayas and the Brahmaputra, Dhemaji's identity emerged from the confluence of great dynasties, tribal self-reliance, and shifting alluvial plains.",
      tag: "Upper Assam"
    }
  },
  {
    id: 'early-history',
    number: '02',
    title: 'Early History',
    era: 'Early Medieval Period',
    badge: 'Ancient Settlements',
    icon: <BookOpen className="w-5 h-5 text-gold" />,
    content: [
      "The history of the Dhemaji region extends back to the early medieval period. The area around Habung was an important settlement in the northern Brahmaputra valley. Historical records and copper-plate grants provide evidence of established settlements, agriculture and systems of land administration in the region.",
      "Over the centuries, the area witnessed the movement and interaction of different communities and came under the influence of several political powers. These developments gradually shaped the social and cultural character of the region."
    ],
    keyHighlight: {
      title: "Epigraphic Evidence",
      description: "Copper-plate inscriptions found in the region confirm sophisticated land revenue systems and flourishing agrarian village councils as early as the 10th-12th centuries.",
      tag: "Copper-Plate Grants"
    }
  },
  {
    id: 'habung-ahom-era',
    number: '03',
    title: 'Habung and the Ahom Era',
    era: '1240 AD – 1253 AD',
    badge: 'First Royal Capital',
    icon: <Landmark className="w-5 h-5 text-amber-400" />,
    content: [
      "Habung occupies a particularly important place in the history of Dhemaji. According to historical accounts recorded by the Government of Assam, Chaolung Sukaphaa, the founder of the Ahom kingdom, established an early capital at Habung around 1240 AD.",
      "The location offered fertile land for agriculture, but its proximity to the Brahmaputra and other rivers also made it vulnerable to recurring floods. The Ahom capital was subsequently moved, and Sukaphaa eventually established the permanent Ahom capital at Charaideo in 1253 AD.",
      "Although the capital did not remain at Habung, its association with the early Ahom kingdom gives the place considerable historical importance. Habung represents one of the early stages in the formation of the Ahom state in Assam."
    ],
    keyHighlight: {
      title: "1240 AD • Chaolung Sukaphaa at Habung",
      description: "Habung provided the fertile sustenance that nurtured the fledgling Ahom administration before recurring floods prompted the march to Charaideo.",
      tag: "Ahom Dynasty Founding"
    }
  },
  {
    id: 'chutia-kingdom',
    number: '04',
    title: 'The Chutia Kingdom',
    era: '13th – 16th Century',
    badge: 'Medieval Power',
    icon: <Building2 className="w-5 h-5 text-gold" />,
    content: [
      "The Dhemaji region later became closely associated with the Chutia Kingdom, one of the major political powers of medieval eastern Assam.",
      "The Chutias established settlements and agricultural communities across their territories. Historical records associated with the Habung area provide evidence of land grants and organised settlement during this period.",
      "The Chutia kingdom played an important role in the political and cultural development of eastern Assam until its eventual defeat by the expanding Ahom kingdom in the 16th century."
    ],
    keyHighlight: {
      title: "Sovereign Agrarian Polity",
      description: "The Chutia rulers engineered brick ramparts, fortified royal centers, and temple architectures across northern and eastern Brahmaputra valleys.",
      tag: "Chutia Legacy"
    }
  },
  {
    id: 'ahom-expansion',
    number: '05',
    title: 'The Ahom Expansion',
    era: '1523 AD',
    badge: 'Territorial Unification',
    icon: <Calendar className="w-5 h-5 text-amber-500" />,
    content: [
      "The beginning of the 16th century brought another major political transformation to the region.",
      "During the reign of Ahom king Suhungmung, also known as Dihingia Raja, the Ahom kingdom expanded its influence towards the territories controlled by the Chutias. In 1523 AD, Suhungmung defeated the Chutia ruler Nityapal, following which the region came under Ahom control.",
      "The incorporation of the region into the Ahom kingdom connected it with the wider political, administrative and agricultural system that developed across much of Assam during the Ahom period."
    ],
    keyHighlight: {
      title: "1523 AD • Reign of Suhungmung (Dihingia Raja)",
      description: "Annexation of the Chutia realm integrated Dhemaji into the formidable Paik labor mobilization and administrative hierarchy of the Ahom Empire.",
      tag: "Imperial Integration"
    }
  },
  {
    id: 'people-cultural-heritage',
    number: '06',
    title: 'People and Cultural Heritage',
    era: 'Generational Roots',
    badge: 'Living Mosaic',
    icon: <Users className="w-5 h-5 text-emerald-400" />,
    content: [
      "The history of Dhemaji has never been defined solely by kingdoms and political boundaries. Its identity has also been shaped by the communities that have lived in the region for generations.",
      "The Mising, Deori, Sonowal Kachari and Bodo Kachari communities are among the indigenous communities historically associated with the region. Other communities also became part of Dhemaji's social landscape over different periods.",
      "Their traditions have contributed greatly to the cultural richness of the district. Indigenous festivals, traditional agriculture, handloom and handicrafts, music, dance, food and community practices continue to form an important part of Dhemaji's cultural identity."
    ],
    keyHighlight: {
      title: "Indigenous Tapestry",
      description: "Mising stilt architecture (Chang Ghar), sacred Deori priesthoods, Sonowal folklores, and master handloom weaving weave together the living soul of Dhemaji.",
      tag: "Indigenous Assamese Tribes"
    }
  },
  {
    id: 'name-dhemaji',
    number: '07',
    title: 'The Name Dhemaji',
    era: 'Etymology & Lore',
    badge: 'Folk Tradition',
    icon: <Sparkles className="w-5 h-5 text-gold-light" />,
    content: [
      "The origin of the name Dhemaji is associated with different traditional explanations.",
      "One popular explanation relates the name to the region's frequent flooding. Rivers have historically changed their courses and inundated large areas of the district. A traditional interpretation connects the name with the Assamese expression \"Dhal-Dhemali,\" referring to the unpredictable or seemingly playful nature of floods.",
      "This explanation reflects the close relationship between the people of Dhemaji and its rivers. It is, however, best understood as a traditional explanation of the name rather than as an established historical etymology."
    ],
    keyHighlight: {
      title: "“Dhal-Dhemali” — The Playful Waters",
      description: "In folk memory, the capricious courses of river floods were viewed as a majestic, playful dance (Dhemali) between nature and the resilient inhabitants.",
      tag: "Linguistic Heritage"
    }
  },
  {
    id: 'river-and-land',
    number: '08',
    title: 'The River and the Land',
    era: 'Geography & Soil',
    badge: 'Hydrological Bond',
    icon: <Waves className="w-5 h-5 text-cyan-400" />,
    content: [
      "The history of Dhemaji cannot be separated from its geography. The district lies within the floodplains of the Brahmaputra and its tributaries, and rivers have continuously influenced where people live, how they cultivate the land and how communities interact with one another.",
      "Floods have periodically caused destruction and displacement, but the same river systems have also deposited fertile alluvial soil across the plains. Agriculture consequently became deeply connected with the lives and traditions of the people.",
      "The rivers have therefore been both a challenge and a source of life for Dhemaji."
    ],
    keyHighlight: {
      title: "Challenge & Lifeblood",
      description: "The Subansiri, Gai, Jiadhal, and Brahmaputra continuously renew the rich alluvial basin, nurturing bountiful paddy yields amidst monsoon challenges.",
      tag: "Riverine Geomorphology"
    }
  },
  {
    id: 'modern-administrative-history',
    number: '09',
    title: 'Modern Administrative History',
    era: '1971 & 1989',
    badge: 'Statehood & District',
    icon: <Landmark className="w-5 h-5 text-gold" />,
    content: [
      "During the modern administrative period, the present-day Dhemaji region formed part of the larger Lakhimpur District.",
      "A significant change took place in 1971, when Dhemaji was established as a sub-division. The administrative area included Dhemaji, Jonai and Dhakuakhana at that time.",
      "The region gained a separate district identity in 1989, when Dhemaji was elevated to the status of an independent district. The newly formed district consisted of the Dhemaji Sadar and Jonai sub-divisions.",
      "The establishment of the district marked an important stage in the modern development of the region, providing it with its own administrative structure and encouraging the growth of public institutions and infrastructure."
    ],
    keyHighlight: {
      title: "Key Milestones: 1971 & 1989",
      description: "From a sub-division under Lakhimpur in 1971 to an independent district in 1989 comprising Dhemaji Sadar and Jonai.",
      tag: "District Genesis"
    }
  },
  {
    id: 'development-and-connectivity',
    number: '10',
    title: 'Development and Connectivity',
    era: 'Modern Infrastructure',
    badge: 'Bogibeel & Beyond',
    icon: <Compass className="w-5 h-5 text-emerald-400" />,
    content: [
      "In the decades that followed the formation of the district, Dhemaji experienced gradual development in education, agriculture, transportation and public infrastructure.",
      "Its geographical position, close to the foothills of Arunachal Pradesh and across the Brahmaputra from several major centres of Upper Assam, made connectivity particularly important to the region's development.",
      "The construction of major transportation links, including the Bogibeel Bridge, strengthened connections between Dhemaji and the southern bank of the Brahmaputra, particularly with Dibrugarh and other parts of Upper Assam."
    ],
    keyHighlight: {
      title: "The Bogibeel Bridge Transformation",
      description: "Spanning 4.94 km across the Brahmaputra, the combined rail-road Bogibeel Bridge irrevocably unified Dhemaji with Dibrugarh and the southern economic corridor.",
      tag: "Lifeline Connectivity"
    }
  },
  {
    id: 'dhemaji-today',
    number: '11',
    title: 'Dhemaji Today',
    era: 'Present & Beyond',
    badge: 'Living Legacy',
    icon: <Sparkles className="w-5 h-5 text-gold" />,
    content: [
      "Modern Dhemaji carries the legacy of its long and diverse past. The historical memory of Habung, the influence of the Chutia and Ahom periods, the traditions of its indigenous communities and the continuing presence of the Brahmaputra and its tributaries all form part of the district's identity.",
      "Today, Dhemaji is a developing district of Assam with a strong agricultural base and a distinctive cultural landscape. Its villages, wetlands, rivers, festivals, traditional practices and historical sites continue to preserve connections with earlier generations, while education, improved connectivity and modern institutions are shaping its future.",
      "The story of Dhemaji is therefore not simply a story of ancient kingdoms or administrative boundaries. It is a continuing story of people and place—of communities adapting to rivers, preserving their traditions and building a modern society while remaining connected to a deep historical heritage.",
      "Dhemaji's past continues to live in its landscape and its people, making its history an essential part of the wider cultural and historical heritage of Assam."
    ],
    keyHighlight: {
      title: "A Continuing Story of People & Place",
      description: "An enduring dialogue between ancient heritage, fertile wetlands, and an enterprising people carrying forward the spirit of Assam.",
      tag: "Contemporary Dhemaji"
    }
  }
];

export const HistoryPage: React.FC<HistoryPageProps> = ({
  onBackToHome,
  onExploreTourism,
  onExploreCulture
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll spy effect to highlight currently visible chapter in table of contents
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (let i = chapters.length - 1; i >= 0; i--) {
        const chapter = chapters[i];
        const el = document.getElementById(chapter.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSectionId(chapter.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleShare = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const filteredChapters = chapters.filter((chapter) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      chapter.title.toLowerCase().includes(q) ||
      chapter.era.toLowerCase().includes(q) ||
      chapter.content.some((p) => p.toLowerCase().includes(q)) ||
      (chapter.keyHighlight && chapter.keyHighlight.title.toLowerCase().includes(q))
    );
  });

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg md:text-xl leading-relaxed';
      case 'xlarge':
        return 'text-xl md:text-2xl leading-loose';
      default:
        return 'text-base md:text-lg leading-relaxed';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] pt-24 pb-20 selection:bg-[#D99B26] selection:text-[#071811]">
      {/* Top Header Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-stone-200/90">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest-800 hover:text-gold-dark transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>← Back to Home</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Font Size Adjuster for comfortable long-form reading */}
            <div className="flex items-center bg-white/80 border border-stone-200 rounded-lg p-1 text-xs text-charcoal shadow-xs">
              <span className="text-[10px] uppercase font-bold text-stone-400 px-2">Text Size:</span>
              <button
                type="button"
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  fontSize === 'normal' ? 'bg-forest-900 text-gold shadow-xs' : 'hover:bg-stone-100'
                }`}
                title="Normal text size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded text-sm font-semibold ${
                  fontSize === 'large' ? 'bg-forest-900 text-gold shadow-xs' : 'hover:bg-stone-100'
                }`}
                title="Large text size"
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-0.5 rounded text-base font-bold ${
                  fontSize === 'xlarge' ? 'bg-forest-900 text-gold shadow-xs' : 'hover:bg-stone-100'
                }`}
                title="Extra large text size"
              >
                A++
              </button>
            </div>

            {/* Share / Copy Article Link */}
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 hover:bg-white border border-stone-200 text-charcoal rounded-lg text-xs font-semibold transition-colors shadow-xs cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-stone-500" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Narrative Header with Visual Artwork */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Featured Historical Banner Artwork */}
        <div className="mb-8 rounded-3xl overflow-hidden shadow-2xl border-2 border-gold/40 group relative bg-forest-900">
          <img
            src={HISTORY_BANNER_SRC}
            alt="History of Dhemaji - Land of Rivers, Heritage of People, A Timeless Journey"
            className="w-full h-auto max-h-[520px] object-cover transform group-hover:scale-[1.01] transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 bg-forest-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-gold/40 text-xs font-serif font-bold text-gold flex items-center justify-center gap-2 shadow-lg">
            <span>Land of Rivers • Heritage of People • A Timeless Journey</span>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden bg-forest-900 text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-gold/30">
          {/* Subtle Decorative Assamese Weave Motifs in background */}
          <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none assamese-motif-divider" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-800/90 border border-gold/40 text-gold text-xs font-serif font-bold uppercase tracking-[0.22em] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
              <span>Chronicles of Upper Assam</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
              History of <span className="text-gold-light italic font-editorial">Dhemaji</span>
            </h1>

            <p className="font-editorial italic text-lg sm:text-2xl text-stone-300 font-light leading-relaxed max-w-3xl mb-8">
              A distinctive saga shaped by ancient settlements, medieval kingdoms, indigenous wisdom, and the ever-shifting riverine soul of the Brahmaputra.
            </p>

            <div className="jaapi-glow-line h-0.5 w-48 mb-8" />

            {/* Quick Metadata & Key Timeline Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-white/10 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <div>
                  <div className="text-stone-400 font-medium">Reading Time</div>
                  <div className="font-bold text-white">~6 Minutes</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-gold shrink-0" />
                <div>
                  <div className="text-stone-400 font-medium">Key Capitals</div>
                  <div className="font-bold text-white">Habung (1240 AD)</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-gold shrink-0" />
                <div>
                  <div className="text-stone-400 font-medium">Etymology</div>
                  <div className="font-bold text-white">"Dhal-Dhemali"</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold shrink-0" />
                <div>
                  <div className="text-stone-400 font-medium">District Status</div>
                  <div className="font-bold text-white">Formed 1989</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dual-Column Content: Sticky Table of Contents & Article Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT COLUMN: Sticky Navigation & Quick Jump */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Search Filter Box */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200">
                <label htmlFor="history-search" className="block text-xs font-bold text-forest-900 uppercase tracking-wider mb-2">
                  Search In History
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="history-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Habung, Chutia, Sukaphaa, Bogibeel..."
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-charcoal focus:outline-hidden focus:ring-2 focus:ring-gold/50"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Table of Contents List */}
              <nav aria-label="History table of contents" className="bg-white rounded-2xl p-5 shadow-sm border border-stone-200">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-gold-dark" />
                    <span className="text-xs font-bold uppercase tracking-wider text-forest-900">
                      Table of Contents
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-stone-400">
                    {chapters.length} Chapters
                  </span>
                </div>

                <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
                  {chapters.map((chapter) => {
                    const isActive = activeSectionId === chapter.id;
                    return (
                      <button
                        key={chapter.id}
                        type="button"
                        onClick={() => scrollToSection(chapter.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                          isActive
                            ? 'bg-forest-900 text-white font-medium shadow-xs'
                            : 'text-charcoal hover:bg-stone-50 hover:text-forest-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`font-serif text-[11px] font-bold shrink-0 w-6 ${
                              isActive ? 'text-gold' : 'text-stone-400 group-hover:text-gold-dark'
                            }`}
                          >
                            {chapter.number}
                          </span>
                          <span className="text-xs truncate font-medium">
                            {chapter.title}
                          </span>
                        </div>
                        <ChevronRight
                          className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                            isActive
                              ? 'text-gold transform translate-x-0.5'
                              : 'text-stone-300 group-hover:text-stone-500'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </nav>

              {/* Epoch Timeline Summary Card */}
              <div className="bg-[#FAF4E5] rounded-2xl p-5 border border-gold/30">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-gold-dark" />
                  <span className="text-xs font-serif font-bold uppercase tracking-wider text-forest-900">
                    Chronological Timeline
                  </span>
                </div>
                <ol className="relative border-l border-gold/40 ml-2 space-y-4 text-xs text-charcoal">
                  <li className="ml-4">
                    <div className="absolute -left-1.5 mt-0.5 w-3 h-3 rounded-full bg-gold border-2 border-white" />
                    <span className="font-bold text-forest-900 block">Early Medieval</span>
                    <span className="text-stone-600 text-[11px]">Ancient Habung settlements &amp; copper-plate grants</span>
                  </li>
                  <li className="ml-4">
                    <div className="absolute -left-1.5 mt-0.5 w-3 h-3 rounded-full bg-gold border-2 border-white" />
                    <span className="font-bold text-forest-900 block">1240 AD</span>
                    <span className="text-stone-600 text-[11px]">Chaolung Sukaphaa establishes early capital at Habung</span>
                  </li>
                  <li className="ml-4">
                    <div className="absolute -left-1.5 mt-0.5 w-3 h-3 rounded-full bg-gold border-2 border-white" />
                    <span className="font-bold text-forest-900 block">13th – 16th c.</span>
                    <span className="text-stone-600 text-[11px]">Flourishing Chutia kingdom &amp; agrarian communities</span>
                  </li>
                  <li className="ml-4">
                    <div className="absolute -left-1.5 mt-0.5 w-3 h-3 rounded-full bg-gold border-2 border-white" />
                    <span className="font-bold text-forest-900 block">1523 AD</span>
                    <span className="text-stone-600 text-[11px]">Ahom king Suhungmung annexes the region</span>
                  </li>
                  <li className="ml-4">
                    <div className="absolute -left-1.5 mt-0.5 w-3 h-3 rounded-full bg-gold border-2 border-white" />
                    <span className="font-bold text-forest-900 block">1971 &amp; 1989</span>
                    <span className="text-stone-600 text-[11px]">Sub-division (1971) &amp; elevation to independent district (1989)</span>
                  </li>
                </ol>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: The Complete & Highly Readable Historical Text */}
          <main className="lg:col-span-8 space-y-12">
            {filteredChapters.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
                <Search className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-forest-900 mb-2">
                  No matching chapters found
                </h3>
                <p className="text-charcoal-muted text-sm mb-6">
                  Try searching for another keyword or clear the search filter.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-5 py-2.5 rounded-xl bg-forest-900 text-gold font-bold text-xs uppercase tracking-wider"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              filteredChapters.map((chapter) => (
                <article
                  key={chapter.id}
                  id={chapter.id}
                  className="bg-white rounded-3xl p-6 sm:p-10 shadow-deep-card border border-stone-200/90 transition-all hover:border-gold/40 relative overflow-hidden"
                >
                  {/* Subtle chapter header bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-stone-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-forest-900 text-gold flex items-center justify-center font-serif font-bold text-sm shadow-xs">
                        {chapter.number}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800 block">
                          {chapter.era}
                        </span>
                        <span className="text-xs text-stone-400 font-medium">
                          {chapter.badge}
                        </span>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-600">
                      {chapter.icon}
                      <span>{chapter.badge}</span>
                    </div>
                  </div>

                  {/* Chapter Title */}
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-forest-900 mb-6 tracking-tight">
                    {chapter.title}
                  </h2>

                  {/* Paragraphs with optimal readability & spacing */}
                  <div className="space-y-5 text-charcoal font-normal">
                    {chapter.content.map((paragraph, pIdx) => {
                      // Add an elegant drop cap or first paragraph emphasis on chapter 1
                      const isFirstIntroPara = chapter.id === 'overview' && pIdx === 0;

                      return (
                        <p
                          key={pIdx}
                          className={`${getFontSizeClass()} ${
                            isFirstIntroPara ? 'font-medium text-stone-800' : 'text-stone-700'
                          }`}
                        >
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>

                  {/* Distinctive Contextual Callout Highlight Box */}
                  {chapter.keyHighlight && (
                    <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[#FCFAF6] border-l-4 border-gold border-stone-200/80 shadow-xs">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-serif font-bold uppercase tracking-wider text-forest-900 flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                          {chapter.keyHighlight.title}
                        </span>
                        {chapter.keyHighlight.tag && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gold/15 text-forest-900">
                            {chapter.keyHighlight.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-editorial italic">
                        "{chapter.keyHighlight.description}"
                      </p>
                    </div>
                  )}

                  {/* Special Link Prompts for Related Destinations */}
                  {chapter.id === 'habung-ahom-era' && onExploreTourism && (
                    <div className="mt-6 pt-5 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-stone-500">Want to visit historic Habung today?</span>
                      <button
                        type="button"
                        onClick={onExploreTourism}
                        className="inline-flex items-center gap-1 font-bold text-forest-900 hover:text-gold-dark transition-colors cursor-pointer"
                      >
                        <span>View Habung in Tourism Places</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gold" />
                      </button>
                    </div>
                  )}

                  {chapter.id === 'people-cultural-heritage' && onExploreCulture && (
                    <div className="mt-6 pt-5 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-stone-500">Discover living Mising, Deori &amp; Assamese traditions</span>
                      <button
                        type="button"
                        onClick={onExploreCulture}
                        className="inline-flex items-center gap-1 font-bold text-forest-900 hover:text-gold-dark transition-colors cursor-pointer"
                      >
                        <span>Explore Culture Section</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gold" />
                      </button>
                    </div>
                  )}
                </article>
              ))
            )}

            {/* Concluding Editorial Hero Card */}
            <div className="bg-forest text-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-gold/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none assamese-motif-divider" />
              <div className="relative z-10">
                <span className="text-gold font-serif text-xs font-bold tracking-[0.25em] uppercase block mb-2">
                  Heritage Preserved
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  Experience Dhemaji In Person
                </h3>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 font-light max-w-2xl">
                  Dhemaji’s history is alive not just in books, but in its sacred sites, river ferries, vibrant stilt villages, and ancient shrines. Plan your journey or immerse yourself in local culture.
                </p>

                <div className="flex flex-wrap gap-4">
                  {onExploreTourism && (
                    <button
                      type="button"
                      onClick={onExploreTourism}
                      className="px-6 py-3 rounded-full bg-gold hover:bg-gold-hover text-forest-900 font-extrabold text-xs uppercase tracking-widest transition-all transform hover:scale-105 shadow-gold-glow cursor-pointer"
                    >
                      Explore Tourism Places →
                    </button>
                  )}
                  {onExploreCulture && (
                    <button
                      type="button"
                      onClick={onExploreCulture}
                      className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
                    >
                      Discover Living Culture
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="px-6 py-3 rounded-full bg-transparent hover:bg-white/5 text-stone-300 font-medium text-xs tracking-wider transition-all cursor-pointer"
                  >
                    Back to Top ↑
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};
