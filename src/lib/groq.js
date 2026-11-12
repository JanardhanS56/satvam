import productsData from '../data/products.json';

// Pure client-side fallback matching algorithm for legacy quiz
export function fallbackRecommend(answers, products = productsData.products) {
  const genderPref = answers.gender || 'all';
  const selectedConcerns = (answers.concerns || []).map((c) => c.toLowerCase());
  const selectedHairTypes = (answers.hairTypes || []).map((h) => h.toLowerCase());

  const scored = products.map((p) => {
    let score = 0;
    const pGender = p.targetGender || 'all';
    if (genderPref === 'male' && pGender === 'male') score += 4;
    if (genderPref === 'female' && pGender === 'female') score += 4;
    if (pGender === 'all') score += 1;

    (p.concerns || []).forEach((c) => {
      if (selectedConcerns.some((sc) => c.toLowerCase().includes(sc) || sc.includes(c.toLowerCase()))) {
        score += 3;
      }
    });

    (p.hairTypes || []).forEach((h) => {
      if (selectedHairTypes.some((sh) => h.toLowerCase().includes(sh) || sh.includes(h.toLowerCase()))) {
        score += 2;
      }
    });

    return { product: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const topPicks = scored.slice(0, 3).map((item) => item.product);

  const reasonPerSlug = {};
  topPicks.forEach((p) => {
    reasonPerSlug[p.slug] = `Formulated with ${p.ingredients?.[0]?.name || 'active botanicals'} to specifically address ${p.concerns?.[0] || 'follicle nourishment'} for your scalp dosha.`;
  });

  return {
    classification: {
      hairTypes: answers.hairTypes || ['Normal'],
      concerns: answers.concerns || ['General Maintenance'],
      genderPref
    },
    suggestedSlugs: topPicks.map((p) => p.slug),
    reasonPerSlug
  };
}

export async function groqRecommend(answers) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    return fallbackRecommend(answers);
  }

  const catalogContext = (productsData.products || []).map((p) => ({
    slug: p.slug,
    name: p.name,
    targetGender: p.targetGender,
    hairTypes: p.hairTypes,
    concerns: p.concerns,
    tagline: p.tagline
  }));

  const systemPrompt = `You are the chief Ayurvedic formulator for Satvam. Analyze the user's hair and scalp quiz answers and select up to 3 best-suited product slugs from our catalog.
Return strictly valid JSON only with this schema:
{
  "classification": {
    "hairTypes": string[],
    "concerns": string[],
    "genderPref": string
  },
  "suggestedSlugs": string[],
  "reasonPerSlug": {
    "<slug>": "1-sentence personalized Ayurvedic rationale"
  }
}

Catalog of products:
${JSON.stringify(catalogContext, null, 2)}`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `User scalp diagnosis answers: ${JSON.stringify(answers)}`
          }
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      console.warn('Groq API responded with non-200. Using Ayurvedic fallback algorithm.');
      return fallbackRecommend(answers);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content);

    if (parsed.suggestedSlugs && parsed.suggestedSlugs.length > 0) {
      return parsed;
    }
    return fallbackRecommend(answers);
  } catch (err) {
    console.warn('Groq API request error:', err.message, 'Falling back to client-side recommendation.');
    return fallbackRecommend(answers);
  }
}

/**
 * Deterministic Ayurvedic prescription fallback for offline or error states
 */
export function fallbackConsultation(answers) {
  const problem = (answers.hairProblem || '').toLowerCase();
  const hairType = (answers.hairType || '').toLowerCase();
  const scenario = (answers.userScenario || '').toLowerCase();
  const text = `${problem} ${hairType} ${scenario}`;

  let slug = 'keshkanti';
  let dosha = 'Vata-Pitta Imbalance';
  let title = 'Deep Root Restoration & Follicle Rejuvenation';

  if (text.includes('dandruff') || text.includes('flake') || text.includes('itch') || text.includes('sebum')) {
    slug = 'amla-pitta';
    dosha = 'Pitta-Kapha Aggravation (Excess Scalp Heat & Fungal Imbalance)';
    title = 'Scalp Clarifying & Microbiome Purification Protocol';
  } else if (text.includes('stress') || text.includes('sleep') || text.includes('headache') || text.includes('tension')) {
    slug = 'shirodhara';
    dosha = 'Vata-Prana Disturbance (Nervous Constriction)';
    title = 'Nocturnal Neuro-Follicular Calming Protocol';
  } else if (text.includes('grey') || text.includes('pigment') || text.includes('melanin')) {
    slug = 'neelibhringadi';
    dosha = 'Pitta-Prakopa (Follicular Melanin Depletion)';
    title = 'Melanocyte Activation & Natural Darkening Elixir';
  } else if (text.includes('growth') || text.includes('thin') || text.includes('reced') || text.includes('density')) {
    slug = 'keshini';
    dosha = 'Kapha-Stagnation (Dormant Follicular Microcirculation)';
    title = 'Phyto-Active Follicle Awakening & Growth Infusion';
  } else if (text.includes('dry') || text.includes('frizz') || text.includes('brittle') || text.includes('coarse')) {
    slug = 'vanaspati';
    dosha = 'Severe Vata Aggravation (Lipid Barrier Depletion)';
    title = 'Cold-Macerated Lipid Replenishment Protocol';
  } else if (text.includes('shine') || text.includes('dull') || text.includes('luster')) {
    slug = 'kumkumadi';
    dosha = 'Ojas Depletion (Lack of Cellular Radiance)';
    title = 'Sacred Saffron & Botanical Gloss Elixir';
  } else if (text.includes('acne') || text.includes('bump') || text.includes('folliculitis')) {
    slug = 'karanja';
    dosha = 'Kapha-Rakta Toxicity (Follicular Occlusion)';
    title = 'Antimicrobial Detoxification & Pore Clearing Regimen';
  } else {
    slug = 'keshkanti';
    dosha = 'Vata-Pitta Imbalance (Root Instability)';
    title = 'Five-Herb Whole-Plant Root Fortification';
  }

  const product = (productsData.products || []).find((p) => p.slug === slug) || productsData.products[0];

  return {
    dosha,
    productSlug: product.slug,
    prescriptionTitle: title,
    rationale: `Based on your ${answers.hairType || 'hair profile'} experiencing ${answers.hairProblem || 'shedding'} over ${answers.duration || 'several months'}, your scalp exhibits symptoms of ${dosha}. ${product.name} directly pacifies this through its potent combination of ${product.ingredients?.slice(0, 3).map((i) => i.name).join(', ')}, penetrating the dermal papilla without stripping natural moisture.`,
    howToUse: `Warm 3–4 pumps in your palms. Part your hair and gently massage directly into the scalp for 5–7 minutes using slow circular motions to stimulate blood circulation. Leave on for at least 45 minutes or overnight. Rinse with a mild lukewarm herbal shampoo. Repeat 2 to 3 times weekly.`,
    expectedMilestones: [
      { day: 'Day 14', text: 'Scalp irritation subsides; noticeable reduction in daily wash shedding.' },
      { day: 'Day 30', text: 'Follicular anchoring strengthens; hair shaft feels denser with improved moisture retention.' },
      { day: 'Day 60', text: 'Visible rejuvenation along part lines and crown; enhanced bounce, shine, and structural resilience.' }
    ]
  };
}

/**
 * AI Consultation powered by Groq LLM with live Satvam product database integration
 */
export async function consultVaidyaAI(userQuery) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    return fallbackConsultation(userQuery);
  }

  const catalog = (productsData.products || []).map((p) => ({
    slug: p.slug,
    name: p.name,
    subtitle: p.subtitle,
    tagline: p.tagline,
    concerns: p.concerns,
    hairTypes: p.hairTypes,
    targetGender: p.targetGender,
    whyThisHerb: p.whyThisHerb,
    ingredients: (p.ingredients || []).map((i) => `${i.name} (${i.role || ''})`)
  }));

  const systemPrompt = `You are a revered Ayurvedic Vaidya (physician) and master formulation chemist for Satvam Luxury Ayurvedic Apothecary.
A client comes to you with their exact hair problem, scalp type, duration, and sensitivities.
Analyze their scenario to identify their specific Ayurvedic Dosha imbalance (e.g. Vata dry-shedding, Pitta inflammation/dandruff, Kapha sluggish growth, or mixed).
Match them to the SINGLE BEST product from our 20-product catalog that directly cures their scenario.

Return strictly valid JSON only:
{
  "dosha": "Specific Ayurvedic dosha imbalance diagnosis (e.g. Pitta-Kapha Scalp Aggravation)",
  "productSlug": "exact_slug_from_catalog",
  "prescriptionTitle": "Tailored Prescription Protocol Name",
  "rationale": "2-3 insightful sentences connecting their specific symptoms, duration, and preferences to this product's exact botanicals and traditional cold-pressed method.",
  "howToUse": "Step-by-step custom application regimen tailored to their scenario (drops/pumps, massage duration, frequency per week, leave-on duration).",
  "expectedMilestones": [
    { "day": "Day 14", "text": "Specific observable improvement" },
    { "day": "Day 30", "text": "Intermediate biological response" },
    { "day": "Day 60", "text": "Long-term hair density and root health outcome" }
  ]
}

Satvam Catalog:
${JSON.stringify(catalog)}`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Client scenario: ${JSON.stringify(userQuery)}` }
        ],
        temperature: 0.25,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      console.warn('Groq consultation API error, falling back to algorithmic matching.');
      return fallbackConsultation(userQuery);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content);

    // Validate that the returned productSlug actually exists in our catalog
    const matchedProduct = (productsData.products || []).find((p) => p.slug === parsed.productSlug);
    if (!matchedProduct) {
      console.warn('Returned slug not found in catalog, using fallback.');
      return fallbackConsultation(userQuery);
    }

    return parsed;
  } catch (err) {
    console.warn('Groq consultation error:', err.message);
    return fallbackConsultation(userQuery);
  }
}
