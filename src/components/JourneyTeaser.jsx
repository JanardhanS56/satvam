import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';

export default function JourneyTeaser() {
  const stages = [
    { num: '01', title: 'Seed & Soil', desc: 'Indore black soil & Western Ghats bio-reserves' },
    { num: '02', title: 'Monsoon Growth', desc: 'Rain-fed cultivation without synthetic fertilizers' },
    { num: '03', title: 'Wild Harvest', desc: 'Hand-picked by 740+ partner multigenerational farmers' },
    { num: '04', title: 'Wood Extraction', desc: 'Cold ghani press under 38°C with zero chemical solvents' },
    { num: '05', title: 'Amber Bottling', desc: 'UV-protective dark glass to protect sacred plant lipids' }
  ];

  return (
    <section className="w-full bg-[#FAF7F0] py-24 px-6">
      <div className="max-w-7xl mx-auto lg:px-12">
        <div className="bg-[#2D3E2F] text-[#FAF7F0] rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-lifted">
          {/* Subtle gold ornamental corner glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,#C9A961_0%,transparent_70%)] opacity-15 pointer-events-none" />

          <div className="max-w-2xl relative z-10 mb-12">
            <span className="text-eyebrow text-[#C9A961] flex items-center gap-2">
              <Compass className="w-4 h-4" /> The 5-Stage Seed-to-Bottle Chronicle
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-[#FAF7F0] mt-3 leading-tight">
              A Journey Rooted in Patient Vedic Craft.
            </h2>
            <p className="text-sm sm:text-base text-[#FAF7F0]/80 mt-4 leading-relaxed font-light">
              We trace every droplet of herbal oil back to its soil origin. Experience our interactive visual journey through
              the seasons, harvest rituals, and slow wood-pressing traditions.
            </p>
          </div>

          {/* 5-Step Preview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12 relative z-10">
            {stages.map((stage) => (
              <div
                key={stage.num}
                className="bg-[#FAF7F0]/5 border border-[#FAF7F0]/10 p-5 rounded-2xl backdrop-blur-xs flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-[#C9A961] tracking-widest block mb-2">
                    {stage.num}
                  </span>
                  <h4 className="font-display font-medium text-base text-[#FAF7F0] mb-1">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-[#FAF7F0]/65 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
            <Link
              to="/journey"
              className="btn-primary w-full sm:w-auto px-8 py-3.5 text-sm font-semibold tracking-wide flex items-center justify-center gap-2"
            >
              Experience the 5-Stage Journey <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/shop"
              className="w-full sm:w-auto text-center px-8 py-3.5 text-sm font-medium text-[#FAF7F0] hover:text-[#C9A961] transition-colors"
            >
              Direct to Shop Atelier →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
