import React from 'react';
import { Sprout, Sparkles, FlaskConical } from 'lucide-react';

export default function BrandPromise() {
  const promises = [
    {
      icon: Sprout,
      title: '740+ Partner Farmers',
      description: 'Single-origin wildcrafted herbs harvested in peak monsoon seasons across Kerala, Karnataka, and Rajasthan.'
    },
    {
      icon: Sparkles,
      title: 'Vedic Wood-Pressed',
      description: 'Slow cold-pressed at under 38°C in traditional vaagai wood ghanis to retain complete lipid bio-actives.'
    },
    {
      icon: FlaskConical,
      title: 'Zero Chemical Solvents',
      description: 'Pure herb-infused oils. Free from silicones, artificial colorants, mineral distillates, and stabilizers.'
    }
  ];

  return (
    <section className="w-full bg-[#F5EFE3] py-20 border-y border-[#6B5B45]/15">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-eyebrow text-[#6B5B45]">The Satvam Promise</span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#2D3E2F] mt-2">
            Ancient Science. Uncompromised Purity.
          </h2>
          <p className="text-sm text-[#6B5B45] mt-3">
            Every bottle carries the integrity of ancient Charaka Samhita texts and fair-trade farmer stewardship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {promises.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF7F0] p-8 rounded-2xl border border-[#6B5B45]/15 shadow-soft flex flex-col items-start hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C9A961]/15 text-[#6B5B45] flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-[#6B5B45]" />
                </div>
                <h3 className="font-display font-medium text-xl text-[#2D3E2F] mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-[#6B5B45] leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
