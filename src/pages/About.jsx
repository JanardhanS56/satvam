import React from 'react';
import { SafeImage } from '../lib/images';
import {
  Users,
  Star,
  Sprout,
  Truck,
  Quote,
  Award,
  CheckCircle2,
  TrendingUp,
  Landmark,
  Handshake
} from 'lucide-react';

export default function About() {
  const milestones = [
    {
      year: '2018',
      title: 'Ancestral Lineage Founded',
      description: 'Begun in Pune when formulator Aarohi Deshpande began translating her grandmother Anusuya’s handwritten brass-bound herbal codex into laboratory cold-press standards.'
    },
    {
      year: '2019',
      title: 'First 1,000 Wood-Pressed Bottles',
      description: 'Handcrafted our initial batch using slow vaagai-wood ghanis under 38°C. Distributed exclusively through referrals of Ayurvedic Vaidyas.'
    },
    {
      year: '2021',
      title: 'FSSAI & GMP Certification',
      description: 'Formalized our clean-room laboratory facility with rigorous heavy-metal testing, microbial assays, and national organic standard clearance.'
    },
    {
      year: '2022',
      title: '740+ Partner Farmer Alliance',
      description: 'Established fair-trade direct sourcing agreements with smallholder families across Karnataka, Kerala, and Rajasthan, eliminating intermediaries.'
    },
    {
      year: '2023',
      title: '₹4.2Cr Patron-Funded Revenue',
      description: 'Reached institutional scale solely on organic patron advocacy and doctor recommendations without venture capital dilution.'
    },
    {
      year: '2024',
      title: '500,000 Patrons Restored',
      description: 'Supplying sacred cold-pressed botanicals daily to households across 32 Indian states, upholding zero chemical solvent pledges.'
    }
  ];

  const stats = [
    { num: '500K+', label: 'Patrons Restored', icon: Users },
    { num: '4.8 / 5', label: 'Average Customer Rating', icon: Star },
    { num: '740+', label: 'Smallholder Family Farms', icon: Sprout },
    { num: '32 States', label: 'Direct Pan-India Dispatch', icon: Truck }
  ];

  const press = [
    {
      source: 'Vogue India',
      quote: 'The slow-apothecary hair oil transforming modern root care into an intimate ritual.'
    },
    {
      source: 'YourStory',
      quote: 'How Satvam is reviving the sacred science of cold-press hair care through fair-trade farmer solidarity.'
    },
    {
      source: 'Mint Lounge',
      quote: 'Patience as an active ingredient: the Ayurvedic brand rejecting instant chemical shortcuts.'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Radhika Menon',
      platform: 'Google Reviews',
      text: 'As a dermatologist who studies hair cycles, Satvam’s cold-press lipid profile is extraordinarily bio-compatible. My scalp has never felt calmer.',
      rating: 5
    },
    {
      name: 'Tanvi Shinde',
      platform: 'Instagram',
      text: 'Six months postpartum, my temple thinning was terrifying. Keshkanti was the only formula that actually felt alive and stopped the shedding.',
      rating: 5
    },
    {
      name: 'Arjun K. Varma',
      platform: 'Amazon Verified',
      text: 'Tiladi-Men completely changed my relationship with oiling. Non-sticky, absorbs fast, and actually tackled years of stubborn crown dryness.',
      rating: 5
    }
  ];

  return (
    <div className="w-full bg-[#FAF7F0] pb-24">
      {/* Editorial Page Header */}
      <section className="pt-20 pb-16 px-6 max-w-5xl mx-auto text-center">
        <h1 className="font-display font-medium text-4xl sm:text-6xl text-[#2D3E2F] tracking-tight">
          Purity Born from Patience
        </h1>
        <p className="font-eyebrow text-base sm:text-lg tracking-[0.2em] uppercase text-[#6B5B45] mt-3">
          Ancient Ayurvedic Apothecary Meets Modern Clean Phytochemistry.
        </p>
      </section>

      {/* 1. Origin Story Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Growth Trajectory & Tri-Pillar Trust Matrix (Replaces former placeholder image) */}
          <div className="lg:col-span-5 bg-[#FFFFFF] p-6 sm:p-7 rounded-3xl border border-[#6B5B45]/20 shadow-soft flex flex-col justify-between space-y-6">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-[#6B5B45]/15">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#C9A961]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#6B5B45] font-semibold">
                    Ecosystem Trust Matrix
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F5EFE3] text-[#2D3E2F] border border-[#6B5B45]/15">
                  2018 — 2026
                </span>
              </div>

              {/* Growth Trajectory Across Years (Visual Progress Bars) */}
              <div className="mt-4">
                <h4 className="font-display font-medium text-base text-[#2D3E2F] mb-3">
                  Consecrated Growth Trajectory
                </h4>
                <div className="space-y-3">
                  {/* 2018 */}
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-mono">
                      <span className="text-[#6B5B45]">2018 · Genesis</span>
                      <span className="font-semibold text-[#2D3E2F]">240 Bottles (Kolhapur Ghani)</span>
                    </div>
                    <div className="h-2 w-full bg-[#F5EFE3] rounded-full overflow-hidden">
                      <div className="h-full bg-[#6B5B45]/40 rounded-full w-[12%]" />
                    </div>
                  </div>

                  {/* 2021 */}
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-mono">
                      <span className="text-[#6B5B45]">2021 · Ayush Standardized</span>
                      <span className="font-semibold text-[#2D3E2F]">18,000 Verified Patrons</span>
                    </div>
                    <div className="h-2 w-full bg-[#F5EFE3] rounded-full overflow-hidden">
                      <div className="h-full bg-[#6B5B45]/60 rounded-full w-[38%]" />
                    </div>
                  </div>

                  {/* 2024 */}
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-mono">
                      <span className="text-[#6B5B45]">2024 · Direct Grower Alliance</span>
                      <span className="font-semibold text-[#2D3E2F]">220,000 Cold-Pressed Units</span>
                    </div>
                    <div className="h-2 w-full bg-[#F5EFE3] rounded-full overflow-hidden">
                      <div className="h-full bg-[#2D3E2F]/80 rounded-full w-[70%]" />
                    </div>
                  </div>

                  {/* 2026 */}
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-mono">
                      <span className="text-emerald-800 font-bold">2026 · National Footprint</span>
                      <span className="font-bold text-emerald-800">500,000+ Active Ritualists</span>
                    </div>
                    <div className="h-2.5 w-full bg-[#F5EFE3] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#C9A961] to-emerald-600 rounded-full w-[100%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tri-Pillar Trust Section: Producers · Investors · Distributors */}
            <div className="pt-4 border-t border-[#6B5B45]/15 space-y-3.5">
              <h4 className="font-display font-medium text-base text-[#2D3E2F]">
                Institutional Trust & Governance
              </h4>

              {/* Pillar 1: Producers */}
              <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#6B5B45]/15">
                <div className="flex items-center gap-2 mb-1">
                  <Sprout className="w-4 h-4 text-emerald-700" />
                  <span className="font-mono text-xs uppercase font-bold text-[#2D3E2F] tracking-wide">
                    Producers · 740+ Family Farms
                  </span>
                </div>
                <p className="text-xs text-[#6B5B45] leading-relaxed">
                  100% direct fair-trade agreements. Farmers receive guaranteed purchase 22% above market rates with advance capital for heritage wildcraft seeds.
                </p>
              </div>

              {/* Pillar 2: Investors */}
              <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#6B5B45]/15">
                <div className="flex items-center gap-2 mb-1">
                  <Landmark className="w-4 h-4 text-[#C9A961]" />
                  <span className="font-mono text-xs uppercase font-bold text-[#2D3E2F] tracking-wide">
                    Investors · 100% Patient Capital
                  </span>
                </div>
                <p className="text-xs text-[#6B5B45] leading-relaxed">
                  Zero venture-debt or hyper-growth dilution. Formulations governed by an autonomous Vaidya Advisory Council with statutory veto power.
                </p>
              </div>

              {/* Pillar 3: Distributors */}
              <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#6B5B45]/15">
                <div className="flex items-center gap-2 mb-1">
                  <Handshake className="w-4 h-4 text-[#2D3E2F]" />
                  <span className="font-mono text-xs uppercase font-bold text-[#2D3E2F] tracking-wide">
                    Distributors · 180+ Ethical Dispensaries
                  </span>
                </div>
                <p className="text-xs text-[#6B5B45] leading-relaxed">
                  Selected through strict Ayurvedic medical licensure across 28 states, maintaining a 99.2% re-order consistency and zero synthetic returns.
                </p>
              </div>
            </div>

            {/* Bottom Proof Metric Banner */}
            <div className="bg-[#2D3E2F] text-[#FAF7F0] p-3 rounded-xl flex items-center justify-between text-xs font-mono">
              <span>✦ Direct Trade Certified</span>
              <span className="text-[#C9A961]">Zero Middlemen</span>
            </div>
          </div>

          {/* Right Narrative Story */}
          <div className="lg:col-span-7 space-y-6 text-[#2D3E2F]/90 leading-relaxed text-base">
            <span className="text-eyebrow text-[#C9A961]">The Awakening</span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#2D3E2F] font-medium leading-snug">
              A Grandmother's Codex, A Chemist's Precision.
            </h2>
            <p>
              In the monsoon of 2018, formulator Aarohi Deshpande watched commercial hair products flood the market
              promising overnight regrowth while masking mineral oils and petrochemical solvents beneath perfumed veneers.
              Her grandmother Anusuya had practiced a very different medicine in Kolhapur—one where fresh Bhringraj, Brahmi,
              and Amla were gathered at dawn and simmered in sesame milk over cow-dung embers for fourteen continuous hours.
            </p>
            <p>
              Armed with a Master’s degree in Phytochemical Analysis from ICT Mumbai, Aarohi set out not to modernize
              Ayurveda, but to honor its exact biophysical demands. Using gas chromatography, she proved that traditional
              cold-maceration and slow wood-pressing protected essential fatty acids that high-speed industrial expellers routinely incinerated.
            </p>
            <p className="border-l-2 border-[#C9A961] pl-4 italic text-[#6B5B45]">
              "We do not synthesize what nature has already perfected over five thousand years. Our duty is simply to extract it without violence."
            </p>
          </div>
        </div>
      </section>

      {/* 2. Founders Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-eyebrow text-[#6B5B45]">The Formulators</span>
          <h2 className="font-display text-3xl text-[#2D3E2F] mt-2">
            Stewardship Behind Every Batch
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Founder 1 */}
          <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#6B5B45]/15 shadow-soft flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#F5EFE3] text-[#2D3E2F] border border-[#C9A961]/40 flex items-center justify-center font-display text-xl font-bold flex-shrink-0">
              AD
            </div>
            <div>
              <h3 className="font-display font-medium text-xl text-[#2D3E2F]">
                Aarohi Deshpande
              </h3>
              <p className="font-eyebrow text-xs uppercase tracking-wider text-[#C9A961] mt-0.5 mb-2 font-semibold">
                Founder & Chief Phytochemist
              </p>
              <p className="text-xs text-[#6B5B45] leading-relaxed">
                Trained in plant bio-actives at ICT Mumbai; standardizes ancient herbal decoctions for maximum dermal absorption without petrochemical stabilizers.
              </p>
            </div>
          </div>

          {/* Founder 2 */}
          <div className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#6B5B45]/15 shadow-soft flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#F5EFE3] text-[#2D3E2F] border border-[#C9A961]/40 flex items-center justify-center font-display text-xl font-bold flex-shrink-0">
              VI
            </div>
            <div>
              <h3 className="font-display font-medium text-xl text-[#2D3E2F]">
                Vihaan Iyer
              </h3>
              <p className="font-eyebrow text-xs uppercase tracking-wider text-[#C9A961] mt-0.5 mb-2 font-semibold">
                Head of Farmer Partnerships
              </p>
              <p className="text-xs text-[#6B5B45] leading-relaxed">
                Agronomist championing regenerative bio-reserve cultivation across 740+ partner family holdings throughout the Western Ghats and Deccan Plateau.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. By The Numbers Section */}
      <section className="w-full bg-[#2D3E2F] text-[#FAF7F0] py-20 my-12 border-y border-[#6B5B45]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F0]/10 flex items-center justify-center mb-4 text-[#C9A961]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="font-display text-3xl sm:text-5xl font-semibold text-[#C9A961] tracking-tight">
                    {s.num}
                  </div>
                  <div className="font-eyebrow text-xs uppercase tracking-widest text-[#FAF7F0]/80 mt-2">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Milestones Timeline */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <span className="text-eyebrow text-[#6B5B45]">Chronicle</span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#2D3E2F] mt-2">
            Key Milestones in Our Sourcing Integrity
          </h2>
        </div>

        <div className="relative border-l-2 border-[#C9A961]/40 ml-4 sm:ml-32 pl-6 sm:pl-8 space-y-12">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Year marker on left */}
              <div className="hidden sm:block absolute -left-36 top-0 w-24 text-right font-display text-xl font-bold text-[#C9A961]">
                {m.year}
              </div>

              {/* Dot on line */}
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#FAF7F0] border-2 border-[#C9A961] group-hover:bg-[#C9A961] transition-colors" />

              <div className="sm:hidden font-display text-sm font-bold text-[#C9A961] mb-1">
                {m.year}
              </div>
              <h3 className="font-display font-medium text-xl text-[#2D3E2F] mb-2">
                {m.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#6B5B45] leading-relaxed max-w-xl">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Recognition Strip */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 border-t border-[#6B5B45]/15">
        <div className="text-center mb-10">
          <span className="text-eyebrow text-[#6B5B45]">Press Mentions</span>
          <h2 className="font-display text-2xl text-[#2D3E2F] mt-1">
            Voices in Independent Journalism
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {press.map((p, idx) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#6B5B45]/15 shadow-xs flex flex-col justify-between"
            >
              <Quote className="w-5 h-5 text-[#C9A961] mb-3" />
              <p className="text-sm text-[#2D3E2F] italic leading-relaxed mb-4">
                "{p.quote}"
              </p>
              <div className="font-display font-semibold text-sm text-[#6B5B45] uppercase tracking-wider">
                — {p.source}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Social Proof Testimonials */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-16">
        <div className="bg-[#F5EFE3] p-8 sm:p-12 rounded-3xl border border-[#6B5B45]/15">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-eyebrow text-[#6B5B45]">Community Proof</span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#2D3E2F] mt-1">
              Reflections from Daily Practitioners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#FAF7F0] p-6 rounded-2xl border border-[#6B5B45]/15 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center text-[#E8B44A] mb-3">
                    {[...Array(t.rating)].map((_, r) => (
                      <Star key={r} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#2D3E2F] leading-relaxed">
                    "{t.text}"
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#6B5B45]/10 flex items-center justify-between text-[11px]">
                  <span className="font-display font-medium text-[#2D3E2F]">{t.name}</span>
                  <span className="font-mono text-[#6B5B45]/70 bg-[#F5EFE3] px-2 py-0.5 rounded-full">
                    {t.platform}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
