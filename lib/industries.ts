export type Industry = {
  slug: string;
  name: string;
  tagline: string;
  painPoints: string[];
  whyItMatters: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: 'dental-clinics',
    name: 'Dental clinics',
    tagline: 'Patients research before they call. Your site is the first appointment.',
    painPoints: [
      'Booking forms with too many required fields, so patients call instead, or give up',
      'Stock photography that looks identical to every other clinic nearby',
      'No clear answer to "does this practice do what I need" above the fold',
    ],
    whyItMatters: "A dental website's job is to remove hesitation before someone in pain (literal or financial) decides to book. Small friction costs real patients.",
  },
  {
    slug: 'interior-design-studios',
    name: 'Interior design studios',
    tagline: "Your portfolio has to sell the feeling, not just the furniture.",
    painPoints: [
      'Instagram grid and website portfolio show different, inconsistent projects',
      'No visible price range or process, so leads assume "too expensive" and never inquire',
      'Slow-loading image galleries on mobile, where most portfolio browsing happens',
    ],
    whyItMatters: 'Interior design is sold on trust and taste. Inconsistent visual identity across channels quietly undermines both.',
  },
  {
    slug: 'cosmetics-brands',
    name: 'Cosmetics & skincare brands',
    tagline: 'Ingredients matter, but so does the page people land on from an ad.',
    painPoints: [
      'Product pages missing the one detail (skin type, ingredient list) that closes the sale',
      'Brand voice on packaging feels premium, website copy feels generic',
      'Checkout flow with unnecessary steps that quietly hurts conversion on paid traffic',
    ],
    whyItMatters: 'Every wasted click on a cosmetics site is paid-for traffic. Small conversion gaps compound fast at ad scale.',
  },
  {
    slug: 'coffee-roasteries',
    name: 'Coffee roasteries & cafes',
    tagline: "Local discovery starts on a phone, in someone's hand, outside your door.",
    painPoints: [
      'No mobile-optimized menu or hours, so people check Google Maps instead of your site',
      'Social feed active, website last updated over a year ago',
      "Online ordering, if it exists, buried more than two taps deep",
    ],
    whyItMatters: 'Local, high-frequency businesses live or die on how fast someone standing outside can confirm you\'re open and worth walking into.',
  },
];

export function getIndustry(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}
