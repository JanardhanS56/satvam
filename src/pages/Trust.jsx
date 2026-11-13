import React, { useState } from 'react';
import { SafeImage } from '../lib/images';
import {
  ChevronDown,
  CheckCircle2,
  XCircle,
  Sparkles,
  Award,
  SlidersHorizontal,
  X,
  ZoomIn
} from 'lucide-react';

const FAQ_DATA = [
  {
    category: 'Health',
    q: 'Can I use Satvam if I suffer from chronic dandruff or seborrheic dermatitis?',
    a: 'Yes. Formulations such as Karanja and Neelibhringadi utilize cold-pressed neem and pongamia seed extracts that naturally inhibit Malassezia yeast without stripping natural scalp moisture. We advise an overnight patch test on the nape of the neck prior to complete scalp application.'
  },
  {
    category: 'Health',
    q: 'Does Satvam herbal hair oil trigger hair fall during initial applications?',
    a: 'Telogen shedding occurs naturally as weakened hair follicles release during scalp massage. Satvam botanical actives stimulate anagen growth cycles within 21 to 30 days of disciplined application, clearing dead root congestion.'
  },
  {
    category: 'Beauty',
    q: 'Will these formulations weigh down fine hair or leave greasy residue?',
    a: 'No. Our wood-pressed vaagai ghanis preserve low molecular weight plant lipids that absorb directly into the cortical hair shaft within 20 minutes, leaving a lightweight satin luster rather than heavy mineral build-up.'
  },
  {
    category: 'Beauty',
    q: 'Can colored or chemically treated hair tolerate cold-pressed herbal oils?',
    a: 'Whole botanical extracts like Amla and Chandanadi coat cuticle scales, protecting dye pigments and thermal keratin bonds from oxidative degradation without stripping salon treatments.'
  },
  {
    category: 'Price',
    q: 'Why are Satvam cold-pressed oils priced higher than commercial brands?',
    a: 'Commercial supermarket products dilute up to 85% with light liquid paraffin and synthetic fragrances. Satvam contains 100% whole herbs cold-pressed without chemical distillates, fair-trade priced directly with 740+ smallholder partner farmers.'
  },
  {
    category: 'Availability',
    q: 'Are all 20 formulations available throughout the year?',
    a: 'Because we respect seasonal monsoon harvesting, specific wildcrafted batches (such as Pushpa-Vetiver) are produced in limited small batches. We announce harvest bottling in our Atelier catalog.'
  },
  {
    category: 'Shipping',
    q: 'How are the dark glass apothecary bottles packaged for transit?',
    a: 'Each amber flacon is wrapped in 100% recycled cotton pulp insulation and boxed in unbleached kraft board, guaranteeing safe break-free delivery across all 32 Indian states.'
  },
  {
    category: 'Shipping',
    q: 'What is your typical dispatch timeframe across India?',
    a: 'Orders placed before 2:00 PM IST are freshly hand-inspected and dispatched same-day from our Pune clean-room apothecary, arriving at your doorstep within 2 to 4 business days.'
  }
];

const MYTHS_FACTS = [
  {
    myth: 'Oil causes hair fall and clogs follicles.',
    mythSub: 'Common misconception born from cheap petroleum distillates.',
    fact: 'Refined mineral oils clog pores; pure cold-pressed herb lipids dissolve hardened sebum plugs and deliver bio-active flavonoids directly to the follicle dermal papilla.',
    factSub: 'Validated in dermatological patch tests.'
  },
  {
    myth: 'If an ingredient is labeled "natural", it is automatically safe.',
    mythSub: 'Unregulated kitchen mixtures can harbor molds and toxins.',
    fact: 'Raw herbs require precise classical decoction ratios, heavy metal screening, and microbial assays. Satvam tests every batch for mercury, lead, and arsenic before bottling.',
    factSub: 'Certified by FSSAI & GMP standards.'
  },
  {
    myth: 'Men do not require specialized herbal hair oil.',
    mythSub: 'Assumption that all scalp thinning follows the same mechanism.',
    fact: 'Male follicles are uniquely vulnerable to 5-alpha reductase and dihydrotestosterone (DHT) binding. Our Tiladi and Keshini blends specifically incorporate phytosterol inhibitors.',
    factSub: 'Customized hormonal scalp care.'
  },
  {
    myth: 'Applying plain coconut oil alone is enough for root repair.',
    mythSub: 'Relying solely on single-seed carrier oils.',
    fact: 'Coconut oil provides surface emollient lubrication, but lacks the cellular growth stimulators found in whole Bhringraj, Brahmi, and Triphala needed for dormant root reactivation.',
    factSub: '20 herbs provide complete phytochemistry.'
  }
];

const CERTIFICATES = [
  {
    title: 'FSSAI Ayush Licensure',
    authority: 'Govt. of India Certified',
    src: '/references/certificates/fssai.webp',
    caption: 'Official Ayurvedic manufacturing and safety clearance under standard pharmacopeial regulations.'
  },
  {
    title: 'GMP Certified Clean-Room',
    authority: 'Good Manufacturing Practice',
    src: '/references/certificates/gmp.webp',
    caption: 'Class 10,000 clean laboratory bottling ensuring zero airborne spore contamination.'
  },
  {
    title: 'PETA-Recognized Cruelty-Free',
    authority: '100% Vegan & Ethical',
    src: '/references/certificates/cruelty-free.webp',
    caption: 'Never tested on animals. Ethically wildcrafted without ecological disruption.'
  },
  {
    title: 'Dermatologist Tested & Approved',
    authority: 'Clinical Patch Validation',
    src: '/references/certificates/dermatologist.webp',
    caption: 'Non-comedogenic and hypoallergenic clearance across diverse sensitive scalp profiles.'
  }
];

export default function Trust() {
  const [activeFaqCategory, setActiveFaqCategory] = useState('All');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState(null);

  const faqCategories = ['All', 'Health', 'Beauty', 'Price', 'Availability', 'Shipping'];

  const filteredFaqs = activeFaqCategory === 'All'
    ? FAQ_DATA
    : FAQ_DATA.filter((item) => item.category === activeFaqCategory);

  return (
    <div className="w-full bg-[#FAF7F0] pb-24">
      {/* Page Header */}
      <section className="pt-14 sm:pt-20 pb-10 sm:pb-14 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <h1 className="font-display font-medium text-3xl sm:text-6xl text-[#2D3E2F] tracking-tight">
          Trust & Authenticity
        </h1>
        <p className="font-eyebrow text-xs sm:text-lg tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[#6B5B45] mt-2 sm:mt-3">
          Independent Certification, Clinical Science, and Botanical Truth.
        </p>
      </section>

      {/* 1. Certificates Gallery with Herb-Border SVG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-12 bg-[#F5EFE3]/60 border border-[#6B5B45]/20 shadow-soft overflow-hidden">
          {/* Decorative SVG Herb Vines Background Pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            <defs>
              <pattern id="herbVines" width="120" height="120" patternUnits="userSpaceOnUse">
                <path
                  d="M10 60 Q 30 20, 60 60 T 110 60 M40 40 Q 50 30, 60 40 M70 80 Q 80 90, 90 80"
                  fill="none"
                  stroke="#2D3E2F"
                  strokeWidth="1.5"
                />
                <circle cx="60" cy="40" r="3" fill="#C9A961" />
                <circle cx="90" cy="80" r="3" fill="#C9A961" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#herbVines)" />
          </svg>

          <div className="text-center max-w-xl mx-auto mb-12 relative z-10">
            <span className="text-eyebrow text-[#C9A961]">National Credentials</span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#2D3E2F] mt-1">
              Standardized & Certified Formulations
            </h2>
            <p className="text-xs text-[#6B5B45] mt-2">
              Every badge is verified through institutional audits and statutory pharmacopeial registrations. Click any certificate to inspect full document.
            </p>
          </div>

          {/* 4 Framed Certificates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {CERTIFICATES.map((cert, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedCert(cert)}
                className="group satvam-card bg-[#FFFFFF] p-5 rounded-2xl border-2 border-[#C9A961] shadow-soft hover:-translate-y-2 hover:shadow-lifted transition-all duration-300 flex flex-col justify-between cursor-pointer"
                title="Click to inspect certificate in high resolution"
              >
                <div>
                  {/* Gold Double Border Frame */}
                  <div className="border border-[#C9A961]/40 p-2 rounded-xl bg-[#FAF7F0] mb-4 relative overflow-hidden">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#FFFFFF] flex items-center justify-center p-1.5 shadow-inner">
                      <SafeImage
                        src={cert.src}
                        alt={cert.title}
                        className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                        fallbackText={cert.title}
                      />
                    </div>
                    {/* Hover Zoom Prompt */}
                    <div className="absolute inset-0 bg-[#2D3E2F]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs text-[#FAF7F0] font-mono tracking-wider backdrop-blur-2xs">
                      <ZoomIn className="w-4 h-4 text-[#C9A961]" /> Inspect
                    </div>
                  </div>

                  <span className="font-mono text-[10px] text-[#C9A961] uppercase tracking-wider block font-semibold">
                    {cert.authority}
                  </span>
                  <h3 className="font-display font-medium text-lg text-[#2D3E2F] mt-1 mb-2 leading-snug group-hover:text-[#6B5B45] transition-colors">
                    {cert.title}
                  </h3>
                </div>

                <p className="text-xs text-[#6B5B45] leading-relaxed border-t border-[#6B5B45]/10 pt-3">
                  {cert.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Lightbox Inspection Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2D3E2F]/80 backdrop-blur-xs animate-fadeIn"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#FAF7F0] rounded-3xl p-6 sm:p-8 border-2 border-[#C9A961] shadow-2xl flex flex-col items-center animate-scaleUp max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 text-[#6B5B45] hover:text-[#2D3E2F] rounded-full hover:bg-[#F5EFE3] transition-colors"
              aria-label="Close certificate inspection"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full text-center mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C9A961] font-semibold">
                {selectedCert.authority}
              </span>
              <h3 className="font-display font-medium text-2xl sm:text-3xl text-[#2D3E2F] mt-1">
                {selectedCert.title}
              </h3>
            </div>

            <div className="w-full max-h-[65vh] rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#6B5B45]/20 p-2 shadow-inner flex items-center justify-center">
              <SafeImage
                src={selectedCert.src}
                alt={selectedCert.title}
                className="max-h-[60vh] w-auto object-contain rounded-lg shadow-sm"
                fallbackText={selectedCert.title}
              />
            </div>

            <p className="mt-4 text-xs sm:text-sm text-[#6B5B45] text-center max-w-xl leading-relaxed">
              {selectedCert.caption}
            </p>
            <span className="mt-2 text-[11px] font-mono text-[#6B5B45]/70">
              Official Statutory Compliance Document · Satvam Vedic Apothecary
            </span>
          </div>
        </div>
      )}

      {/* 2. Myths vs Facts (4-card 2-col layout) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-eyebrow text-[#C9A961]">Truth in Ayurveda</span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#2D3E2F] mt-1">
            Debunking Common Scalp Myths
          </h2>
          <p className="text-sm text-[#6B5B45] mt-2">
            Sorting biological evidence from marketing fabrications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MYTHS_FACTS.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] rounded-2xl border border-[#6B5B45]/15 shadow-soft overflow-hidden flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#C9A961]/30 hover:shadow-lifted transition-shadow"
            >
              {/* Left Myth Card (Muted Red #A8453D) */}
              <div className="sm:w-1/2 p-6 bg-[#A8453D]/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[#A8453D] font-mono text-xs font-bold uppercase tracking-wider mb-2">
                    <XCircle className="w-4 h-4 flex-shrink-0" />
                    <span>MYTH</span>
                  </div>
                  <h4 className="font-display font-medium text-lg text-[#2D3E2F] mb-2 leading-snug">
                    "{item.myth}"
                  </h4>
                </div>
                <p className="text-xs text-[#A8453D] italic mt-3">
                  {item.mythSub}
                </p>
              </div>

              {/* Right Fact Card (Forest Green #2D3E2F) */}
              <div className="sm:w-1/2 p-6 bg-[#FAF7F0] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>FACT</span>
                  </div>
                  <p className="text-xs text-[#2D3E2F] leading-relaxed">
                    {item.fact}
                  </p>
                </div>
                <p className="font-mono text-[10px] text-[#6B5B45] uppercase tracking-wider mt-4">
                  ✦ {item.factSub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FAQ Accordion with Category Filters */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16 border-t border-[#6B5B45]/15">
        <div className="text-center mb-10">
          <span className="text-eyebrow text-[#6B5B45]">Patron Queries</span>
          <h2 className="font-display text-3xl text-[#2D3E2F] mt-1">
            Frequently Explored Inquiries
          </h2>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveFaqCategory(cat);
                setOpenFaqIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeFaqCategory === cat
                  ? 'bg-[#C9A961] text-[#2D3E2F] font-semibold shadow-xs'
                  : 'bg-[#F5EFE3] text-[#6B5B45] hover:text-[#2D3E2F] border border-[#6B5B45]/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion Questions */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] rounded-2xl border border-[#6B5B45]/15 shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A961]"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-medium text-base sm:text-lg text-[#2D3E2F] leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#6B5B45] flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#C9A961]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#6B5B45] leading-relaxed border-t border-[#6B5B45]/10 pt-3 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
