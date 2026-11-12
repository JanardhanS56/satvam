import productsData from '../data/products.json';

// Pure client-side fallback matching algorithm
export function fallbackRecommend(answers, products = productsData.products) {
  const genderPref = answers.gender || 'all';
  const selectedConcerns = (answers.concerns || []).map((c) => c.toLowerCase());
  const selectedHairTypes = (answers.hairTypes || []).map((h) => h.toLowerCase());

  // Score each product based on match criteria
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

  // Fall back immediately if key is absent
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
        model: 'llama-3.3-70b-versatile',
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
