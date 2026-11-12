export function getHerbBadge(herbName = '') {
  const lower = herbName.toLowerCase();
  if (lower.includes('bhringraj')) return { emoji: '🌱', type: 'Sacred Herb', category: 'Herb' };
  if (lower.includes('amla') || lower.includes('gooseberry')) return { emoji: '🍈', type: 'Wild Fruit', category: 'Fruit' };
  if (lower.includes('hibiscus') || lower.includes('japa')) return { emoji: '🌺', type: 'Sun-Dried Flower', category: 'Flower' };
  if (lower.includes('brahmi')) return { emoji: '🍃', type: 'Nerve-Tonic Leaf', category: 'Leaf' };
  if (lower.includes('saffron') || lower.includes('kumkum')) return { emoji: '🏵️', type: 'Kashmiri Stigma', category: 'Pistil' };
  if (lower.includes('sesame') || lower.includes('til')) return { emoji: '✨', type: 'Wood-Pressed Seed', category: 'Carrier Oil' };
  if (lower.includes('coconut')) return { emoji: '🥥', type: 'Cold-Pressed Milk', category: 'Carrier Oil' };
  if (lower.includes('neem') || lower.includes('nimba')) return { emoji: '🌿', type: 'Antimicrobial Leaf', category: 'Leaf' };
  if (lower.includes('sandalwood') || lower.includes('chandana')) return { emoji: '🪵', type: 'Heartwood Decoction', category: 'Wood' };
  if (lower.includes('rose')) return { emoji: '🌹', type: 'Damask Petal', category: 'Flower' };
  if (lower.includes('vetiver') || lower.includes('ushira')) return { emoji: '🌾', type: 'Aromatic Root', category: 'Root' };
  if (lower.includes('ashwagandha')) return { emoji: '🌾', type: 'Adaptogen Root', category: 'Root' };
  if (lower.includes('fenugreek') || lower.includes('methi')) return { emoji: '🌱', type: 'Sprouted Seed', category: 'Seed' };
  if (lower.includes('licorice') || lower.includes('yastimadhu')) return { emoji: '🌿', type: 'Sweet Root', category: 'Root' };
  if (lower.includes('almond') || lower.includes('badam')) return { emoji: '🌰', type: 'Sweet Nut Oil', category: 'Nut Oil' };
  if (lower.includes('rosemary')) return { emoji: '🌿', type: 'Follicle Stimulant', category: 'Herb' };
  if (lower.includes('lavender')) return { emoji: '🪻', type: 'Calming Blossom', category: 'Flower' };
  if (lower.includes('tea tree')) return { emoji: '🍃', type: 'Purifying Essence', category: 'Oil' };
  if (lower.includes('camphor')) return { emoji: '❄️', type: 'Cooling Crystal', category: 'Resin' };
  if (lower.includes('jatamansi')) return { emoji: '🌱', type: 'Spikenard Root', category: 'Root' };
  if (lower.includes('indigo')) return { emoji: '💠', type: 'Plant Pigment', category: 'Leaf' };
  if (lower.includes('curry')) return { emoji: '🌿', type: 'Darkening Leaf', category: 'Leaf' };
  return { emoji: '🌿', type: 'Ayurvedic Botanical', category: 'Botanical' };
}

