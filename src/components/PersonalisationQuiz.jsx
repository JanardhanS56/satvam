import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { groqRecommend } from '../lib/groq';
import productsData from '../data/products.json';
import { SafeImage } from '../lib/images';
import { Sparkles, Loader2, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useProfileStore } from '../stores/profile';

const QUIZ_QUESTIONS = [
  {
    id: 'scalpType',
    question: '1. What is your dominant scalp condition?',
    subtitle: 'Identifies your primary Ayurvedic dosha constitution',
    options: [
      { label: 'Dry, tight, or prone to fine white flakes (Vata)', value: 'Dry', hairType: 'Dry & Brittle' },
      { label: 'Oily, inflamed, easily irritated by heat (Pitta)', value: 'Oily & Sensitive', hairType: 'Sensitive Scalp' },
      { label: 'Congested, sticky buildup, heavy sebum (Kapha)', value: 'Congested', hairType: 'Oily' },
      { label: 'Normal, balanced moisture levels', value: 'Normal', hairType: 'Normal' }
    ]
  },
  {
    id: 'primaryConcern',
    question: '2. What is your most urgent hair concern?',
    subtitle: 'Directs root bio-active potency to target follicles',
    options: [
      { label: 'Severe hair fall & follicle breakage', value: 'Hair Fall', concern: 'Hair Fall' },
      { label: 'Receding hairline or crown thinning', value: 'Thinning', concern: 'Crown Thinning' },
      { label: 'Persistent fungal dandruff or itchiness', value: 'Dandruff', concern: 'Dandruff' },
      { label: 'Rough, frizz-prone strands & split ends', value: 'Dryness', concern: 'Dryness' }
    ]
  },
  {
    id: 'gender',
    question: '3. What formulation preference matches your physiology?',
    subtitle: 'Male follicles benefit from specialized phytosterol DHT blockers',
    options: [
      { label: 'Universal / Gender-neutral formulation', value: 'all' },
      { label: 'Specifically tailored for Men (DHT / hormonal crown support)', value: 'male' },
      { label: 'Specifically tailored for Women (postpartum & density support)', value: 'female' }
    ]
  },
  {
    id: 'stressLevel',
    question: '4. How would you describe your mental tension & sleep rhythm?',
    subtitle: 'Nervous tension constricts capillary flow to hair roots',
    options: [
      { label: 'High mental workload, restless sleep, frequent tension headaches', value: 'High Stress' },
      { label: 'Constant outdoor heat exposure, sweat, environmental pollution', value: 'Heat Exposure' },
      { label: 'Generally balanced, steady restorative sleep', value: 'Balanced' }
    ]
  },
  {
    id: 'routine',
    question: '5. What is your preferred oiling cadence?',
    subtitle: 'Determines the lipid absorption density of your elixir',
    options: [
      { label: 'Deep overnight repair (wash off in morning, 2x weekly)', value: 'Overnight' },
      { label: 'Quick pre-wash treatment (30 to 45 minutes)', value: 'Pre-Wash' },
      { label: 'Lightweight satin daily scalp drops', value: 'Daily Drops' }
    ]
  }
];

export default function PersonalisationQuiz() {
  const navigate = useNavigate();
  const quizResults = useProfileStore((state) => state.quizResults);
  const setQuizResults = useProfileStore((state) => state.setQuizResults);

  const [answers, setAnswers] = useState({
    scalpType: 'Dry',
    primaryConcern: 'Hair Fall',
    gender: 'all',
    stressLevel: 'High Stress',
    routine: 'Overnight',
    freeText: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSelectOption = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const quizPayload = {
      gender: answers.gender,
      concerns: [answers.primaryConcern, answers.stressLevel],
      hairTypes: [answers.scalpType],
      routine: answers.routine,
      notes: answers.freeText
    };

    const results = await groqRecommend(quizPayload);
    setQuizResults(results);
    setIsLoading(false);
  };

  const handleRetake = () => {
    setQuizResults(null);
  };

  // Find products matching the suggested slugs
  const suggestedProducts = (quizResults?.suggestedSlugs || []).map((slug) => {
    return (productsData.products || []).find((p) => p.slug === slug);
  }).filter(Boolean);

  return (
    <div className="w-full bg-[#FFFFFF] rounded-3xl border border-[#6B5B45]/20 p-6 sm:p-10 shadow-soft">
      {!quizResults ? (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="border-b border-[#6B5B45]/15 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A961]/15 text-[#2D3E2F] text-xs font-mono uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" /> AI Ayurvedic Diagnosis
            </div>
            <h3 className="font-display font-medium text-2xl sm:text-3xl text-[#2D3E2F]">
              Scalp Constitution & Dosha Consultation
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5B45] mt-1">
              Answer 5 multiple-choice questions plus optional context to receive 1–3 custom matched Ayurvedic formulations.
            </p>
          </div>

          {/* 5 Multiple Choice Questions */}
          <div className="space-y-8">
            {QUIZ_QUESTIONS.map((q) => (
              <div key={q.id} className="space-y-3">
                <div>
                  <h4 className="font-display font-medium text-base sm:text-lg text-[#2D3E2F]">
                    {q.question}
                  </h4>
                  <p className="font-eyebrow text-xs uppercase tracking-wider text-[#6B5B45]">
                    {q.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt) => {
                    const isSelected = answers[q.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelectOption(q.id, opt.value)}
                        className={`p-4 rounded-xl text-left text-xs sm:text-sm transition-all border ${
                          isSelected
                            ? 'bg-[#F5EFE3] border-[#C9A961] text-[#2D3E2F] font-semibold shadow-xs ring-1 ring-[#C9A961]'
                            : 'bg-[#FAF7F0] border-[#6B5B45]/15 text-[#6B5B45] hover:text-[#2D3E2F] hover:border-[#6B5B45]/30'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Question 6: Free-text Optional */}
            <div className="space-y-2">
              <label htmlFor="quiz-free-text" className="font-display font-medium text-base text-[#2D3E2F] block">
                6. Custom Observations (Optional)
              </label>
              <p className="font-eyebrow text-xs uppercase tracking-wider text-[#6B5B45]">
                Note any specific botanical allergies, scalp flare-ups, or medical context:
              </p>
              <textarea
                id="quiz-free-text"
                rows={3}
                value={answers.freeText}
                onChange={(e) => setAnswers((prev) => ({ ...prev, freeText: e.target.value }))}
                placeholder="e.g. Scalp gets very hot during work deadlines; prefers cooling sandalwood aromatics..."
                className="w-full bg-[#FAF7F0] border border-[#6B5B45]/20 rounded-xl p-3 text-xs sm:text-sm text-[#2D3E2F] focus:outline-none focus:ring-2 focus:ring-[#C9A961]"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-[#6B5B45]/15 flex items-center justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary py-3.5 px-8 text-sm font-semibold flex items-center gap-2 shadow-soft hover:shadow-lifted disabled:opacity-75"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Consulting Formulator Intelligence...</span>
                </>
              ) : (
                <>
                  <span>Diagnose Scalp & Reveal Formulations</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Results View */
        <div className="space-y-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#6B5B45]/15 pb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Diagnosis Complete
              </div>
              <h3 className="font-display font-medium text-2xl sm:text-3xl text-[#2D3E2F]">
                Your Tailored Ayurvedic Prescriptions
              </h3>
              <p className="text-xs text-[#6B5B45] mt-1">
                Analyzed by Llama-3.3-70B formulation logic against Satvam's 20 single-origin recipes.
              </p>
            </div>
            <button
              type="button"
              onClick={handleRetake}
              className="btn-ghost py-2 px-4 text-xs font-medium flex items-center gap-1.5 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Consultation
            </button>
          </div>

          {/* Classification Tags */}
          {quizResults.classification && (
            <div className="p-4 bg-[#F5EFE3] rounded-2xl border border-[#6B5B45]/15 flex flex-wrap gap-2 text-xs">
              <span className="font-semibold text-[#2D3E2F] mr-2">Assigned Dosha Profile:</span>
              {(quizResults.classification.concerns || []).map((c, i) => (
                <span key={i} className="px-2.5 py-0.5 rounded-full bg-[#FFFFFF] border border-[#6B5B45]/15 font-mono text-[#6B5B45]">
                  ✦ {c}
                </span>
              ))}
            </div>
          )}

          {/* Suggested Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suggestedProducts.map((p) => {
              const reason = quizResults.reasonPerSlug?.[p.slug] ||
                `Targeted Ayurvedic nutrition for ${p.concerns?.[0] || 'your hair roots'}.`;

              return (
                <div
                  key={p.slug}
                  className="bg-[#FAF7F0] p-5 rounded-2xl border border-[#6B5B45]/20 shadow-soft flex flex-col justify-between"
                >
                  <div>
                    {/* Bottle thumbnail */}
                    <div className="w-full h-44 rounded-xl bg-[#FFFFFF] p-2 flex items-center justify-center mb-4 border border-[#6B5B45]/10">
                      <SafeImage
                        src={p.image || `references/products/${p.slug}-bottle.webp`}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain"
                        fallbackText={p.name}
                      />
                    </div>

                    <h4 className="font-display font-medium text-xl text-[#2D3E2F]">
                      {p.name}
                    </h4>
                    <p className="font-eyebrow text-xs uppercase tracking-wider text-[#6B5B45] mt-0.5 mb-3">
                      {p.tagline || p.subtitle}
                    </p>

                    <div className="p-3 bg-[#FFFFFF] rounded-xl border border-[#6B5B45]/10 text-xs text-[#2D3E2F] leading-relaxed mb-4">
                      <span className="font-bold text-[#C9A961] block mb-1">Vaidya Rationale:</span>
                      {reason}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#6B5B45]/10 flex items-center justify-between">
                    <span className="font-display text-lg font-semibold text-[#2D3E2F]">
                      ₹{p.price}
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate(`/products#${p.slug}`)}
                      className="btn-primary py-2 px-4 text-xs font-semibold flex items-center gap-1 shadow-xs"
                    >
                      View Formula <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
