import React, { useState } from 'react';
import { Mail, MessageCircle, Clock, CheckCircle } from 'lucide-react';

export default function ContactFooter() {
  const [query, setQuery] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [mockReply, setMockReply] = useState('');

  const handleConsultation = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSent(true);
    setTimeout(() => {
      setMockReply(
        'Vaidya recommendation: For root stimulation with cool scalp balance, our Keshkanti with Bhringraj and Amla-Pitta blends work harmoniously together.'
      );
    }, 800);
  };

  return (
    <section className="w-full bg-[#FAF7F0] py-20 px-6 border-b border-[#6B5B45]/15">
      <div className="max-w-7xl mx-auto lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Information */}
        <div>
          <span className="text-eyebrow text-[#C9A961]">Ayurvedic Helpdesk</span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#2D3E2F] mt-2 mb-4">
            Consult the Formulators
          </h2>
          <p className="text-base text-[#6B5B45] leading-relaxed mb-8">
            Have scalp sensitivities, questions about herb oil absorption times,
            or wondering how to rotate formulas between seasons? Our Ayurvedic team answers every inquiry directly.
          </p>

          <div className="space-y-4 text-sm text-[#2D3E2F]">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#C9A961]" />
              <span className="font-medium">atelier@satvam-herbal.in</span>
              <span className="text-xs text-[#6B5B45]/70">(Direct Formulator Inbox)</span>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-[#C9A961]" />
              <span className="font-medium">+91 (080) 4920-SATV</span>
              <span className="text-xs text-[#6B5B45]/70">(Mon–Sat 9am–7pm IST)</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#C9A961]" />
              <span className="text-[#6B5B45]">Average response window: ~15 minutes</span>
            </div>
          </div>
        </div>

        {/* Right Interactive Mock Concierge */}
        <div className="bg-[#F5EFE3] p-8 rounded-2xl border border-[#6B5B45]/20 shadow-soft">
          <div className="flex items-center justify-between border-b border-[#6B5B45]/15 pb-4 mb-6">
            <div>
              <h3 className="font-display font-medium text-lg text-[#2D3E2F]">
                Quick Scalp Inquiry
              </h3>
              <p className="text-xs text-[#6B5B45]">
                Ask about specific herbs, dandruff, postpartum fall, or men's formulas
              </p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" title="Vaidya Online" />
          </div>

          {!isSent ? (
            <form onSubmit={handleConsultation} className="space-y-4">
              <div>
                <label htmlFor="user-concern" className="text-xs font-medium text-[#6B5B45] block mb-1">
                  Describe your hair or scalp concern:
                </label>
                <textarea
                  id="user-concern"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Dry flaky scalp with seasonal hair thinning..."
                  rows={3}
                  className="w-full bg-[#FAF7F0] border border-[#6B5B45]/20 rounded-xl p-3 text-sm text-[#2D3E2F] placeholder-[#6B5B45]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full py-3 text-sm font-medium tracking-wide"
              >
                Send Question to Herbalist
              </button>
            </form>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-800 text-sm font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Question received by Satvam Atelier</span>
              </div>
              <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#6B5B45]/15 text-xs text-[#2D3E2F] leading-relaxed">
                <p className="font-semibold text-[#6B5B45] mb-1">Simulated Vaidya Note:</p>
                <p>{mockReply || 'Consulting formulation archives...'}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSent(false);
                  setQuery('');
                  setMockReply('');
                }}
                className="text-xs text-[#C9A961] hover:underline"
              >
                Ask another question
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
