const HERB_ICON_MAP = [
  { match: 'rosemary', file: 'rosemary.webp', emoji: '🌿', type: 'Follicle Stimulant', category: 'Herb' },
  { match: 'rose', file: 'rose.webp', emoji: '🌹', type: 'Damask Petal', category: 'Flower' },
  { match: 'bhringraj', file: 'bhringraj.webp', emoji: '🌱', type: 'Sacred Herb', category: 'Herb' },
  { match: 'bringaraj', file: 'bhringraj.webp', emoji: '🌱', type: 'Sacred Herb', category: 'Herb' },
  { match: 'amla', file: 'amla.webp', emoji: '🍈', type: 'Wild Fruit', category: 'Fruit' },
  { match: 'gooseberry', file: 'amla.webp', emoji: '🍈', type: 'Wild Fruit', category: 'Fruit' },
  { match: 'hibiscus', file: 'hibiscus.webp', emoji: '🌺', type: 'Sun-Dried Flower', category: 'Flower' },
  { match: 'japa', file: 'hibiscus.webp', emoji: '🌺', type: 'Sun-Dried Flower', category: 'Flower' },
  { match: 'brahmi', file: 'brahmi.webp', emoji: '🍃', type: 'Nerve-Tonic Leaf', category: 'Leaf' },
  { match: 'saffron', file: 'saffron.webp', emoji: '🏵️', type: 'Kashmiri Stigma', category: 'Pistil' },
  { match: 'kumkum', file: 'saffron.webp', emoji: '🏵️', type: 'Kashmiri Stigma', category: 'Pistil' },
  { match: 'sesame', file: 'sesame.webp', emoji: '✨', type: 'Wood-Pressed Seed', category: 'Carrier Oil' },
  { match: 'til', file: 'sesame.webp', emoji: '✨', type: 'Wood-Pressed Seed', category: 'Carrier Oil' },
  { match: 'coconut', file: 'coconut.webp', emoji: '🥥', type: 'Cold-Pressed Milk', category: 'Carrier Oil' },
  { match: 'neem', file: 'neem.webp', emoji: '🌿', type: 'Antimicrobial Leaf', category: 'Leaf' },
  { match: 'nimba', file: 'neem.webp', emoji: '🌿', type: 'Antimicrobial Leaf', category: 'Leaf' },
  { match: 'sandalwood', file: 'sandalwood.webp', emoji: '🪵', type: 'Heartwood Decoction', category: 'Wood' },
  { match: 'chandan', file: 'sandalwood.webp', emoji: '🪵', type: 'Heartwood Decoction', category: 'Wood' },
  { match: 'vetiver', file: 'vetiver.webp', emoji: '🌾', type: 'Aromatic Root', category: 'Root' },
  { match: 'ushira', file: 'vetiver.webp', emoji: '🌾', type: 'Aromatic Root', category: 'Root' },
  { match: 'ashwagandha', file: 'ashwagandha.webp', emoji: '🌾', type: 'Adaptogen Root', category: 'Root' },
  { match: 'fenugreek', file: 'fenugreek.webp', emoji: '🌱', type: 'Sprouted Seed', category: 'Seed' },
  { match: 'methi', file: 'fenugreek.webp', emoji: '🌱', type: 'Sprouted Seed', category: 'Seed' },
  { match: 'licorice', file: 'licorice.webp', emoji: '🌿', type: 'Sweet Root', category: 'Root' },
  { match: 'yastimadhu', file: 'licorice.webp', emoji: '🌿', type: 'Sweet Root', category: 'Root' },
  { match: 'almond', file: 'almond.webp', emoji: '🌰', type: 'Sweet Nut Oil', category: 'Nut Oil' },
  { match: 'badam', file: 'almond.webp', emoji: '🌰', type: 'Sweet Nut Oil', category: 'Nut Oil' },
  { match: 'lavender', file: 'lavender.webp', emoji: '🪻', type: 'Calming Blossom', category: 'Flower' },
  { match: 'tea tree', file: 'tea_tree.webp', emoji: '🍃', type: 'Purifying Essence', category: 'Oil' },
  { match: 'camphor', file: 'camphor.webp', emoji: '❄️', type: 'Cooling Crystal', category: 'Resin' },
  { match: 'jatamansi', file: 'jatamansi.webp', emoji: '🌱', type: 'Spikenard Root', category: 'Root' },
  { match: 'indigo', file: 'indigo.webp', emoji: '💠', type: 'Plant Pigment', category: 'Leaf' },
  { match: 'aloe', file: 'aloe.webp', emoji: '🌱', type: 'Hydrating Gel', category: 'Succulent' },
  { match: 'anantmool', file: 'anantmool.webp', emoji: '🌾', type: 'Pitta-Cooling Root', category: 'Root' },
  { match: 'argan', file: 'argan.webp', emoji: '✨', type: 'Moroccan Golden Oil', category: 'Nut Oil' },
  { match: 'arjuna', file: 'arjuna.webp', emoji: '🪵', type: 'Microcirculation Bark', category: 'Bark' },
  { match: 'bibhitaki', file: 'bibhitaki.webp', emoji: '🍈', type: 'Astringent Berry', category: 'Fruit' },
  { match: 'black seed', file: 'black_seed.webp', emoji: '✨', type: 'Black Nigella Seed', category: 'Seed' },
  { match: 'capsaicin', file: 'capsaicin.webp', emoji: '🔥', type: 'Circulation Catalyst', category: 'Extract' },
  { match: 'cedarwood', file: 'cedarwood.webp', emoji: '🌲', type: 'Himalayan Wood Essence', category: 'Wood' },
  { match: 'haritaki', file: 'haritaki.webp', emoji: '🍈', type: 'Rejuvenating Fruit', category: 'Fruit' },
  { match: 'jojoba', file: 'jojoba.webp', emoji: '✨', type: 'Sebum-Mimetic Ester', category: 'Oil' },
  { match: 'karanja', file: 'karanja.webp', emoji: '🌿', type: 'Antiseptic Seed Oil', category: 'Seed Oil' },
  { match: 'lotus', file: 'lotus.webp', emoji: '🪷', type: 'Sacred Blossom Petal', category: 'Flower' },
  { match: 'manjistha', file: 'manjistha.webp', emoji: '🪵', type: 'Blood-Purifying Root', category: 'Root' },
  { match: 'peppermint', file: 'peppermint.webp', emoji: '🍃', type: 'Cooling Foliage', category: 'Leaf' },
  { match: 'mint', file: 'peppermint.webp', emoji: '🍃', type: 'Cooling Foliage', category: 'Leaf' },
  { match: 'sunflower', file: 'sunflower.webp', emoji: '🌻', type: 'Linoleic Seed Carrier', category: 'Seed Oil' },
  { match: 'tulsi', file: 'tulsi.webp', emoji: '🌿', type: 'Holy Basil Adaptogen', category: 'Leaf' },
  { match: 'turmeric', file: 'turmeric.webp', emoji: '✨', type: 'Curcumin Rhizome', category: 'Root' },
  { match: 'vitamin e', file: 'vitamin_e.webp', emoji: '💧', type: 'Plant Antioxidant', category: 'Antioxidant' }
];

export function getHerbBadge(herbName = '') {
  const lower = herbName.toLowerCase();
  for (const item of HERB_ICON_MAP) {
    if (lower.includes(item.match)) {
      return {
        icon: `/references/icons/product_composition/${item.file}`,
        emoji: item.emoji,
        type: item.type,
        category: item.category
      };
    }
  }

  return {
    icon: null,
    emoji: '🌿',
    type: 'Ayurvedic Botanical',
    category: 'Botanical'
  };
}
