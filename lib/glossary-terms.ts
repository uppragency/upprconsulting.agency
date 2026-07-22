export type GlossaryTerm = { term: string; slug: string; def: string };

function slugify(term: string): string {
  return term
    .toLowerCase()
    .replace(/[()/]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const RAW_TERMS: { term: string; def: string }[] = [
  {
    term: 'Bounce rate',
    def: 'The percentage of visitors who leave your site after viewing only one page. A high bounce rate on a landing page usually means the message or design does not match what people expected.',
  },
  {
    term: 'Conversion rate',
    def: 'The percentage of visitors who complete a goal you care about, buying, booking a call, filling a form. It is the single number that tells you if a website is actually working.',
  },
  {
    term: 'Core Web Vitals',
    def: "Google's three metrics for real-world page experience: how fast content appears, how fast the page responds, and how much it shifts around while loading. Poor scores hurt both rankings and conversions.",
  },
  {
    term: 'Above the fold',
    def: 'Everything visible on a page before a visitor scrolls. It has about three seconds to explain what you do and why it matters.',
  },
  {
    term: 'Call to action (CTA)',
    def: 'The specific action you want a visitor to take next, and the button or link that invites them to take it. Vague CTAs like "Learn more" convert worse than specific ones like "See pricing".',
  },
  {
    term: 'Brand consistency',
    def: 'Using the same colors, fonts, tone, and visual language everywhere your business shows up, website, social media, print. Inconsistency is one of the fastest ways to look untrustworthy.',
  },
  {
    term: 'Visual hierarchy',
    def: 'The order in which a design guides the eye, through size, color, contrast, and placement. Good hierarchy makes the most important element the first thing anyone notices.',
  },
  {
    term: 'Usability testing',
    def: 'Watching real people try to complete a task on your site or app, then fixing whatever makes them hesitate, backtrack, or give up.',
  },
  {
    term: 'A/B testing',
    def: 'Showing two versions of a page or element to different visitors and measuring which one performs better, before committing to a full redesign.',
  },
  {
    term: 'Heatmap',
    def: 'A visual overlay showing where visitors click, move their mouse, or stop scrolling. Useful for spotting ignored buttons or sections nobody reaches.',
  },
  {
    term: 'User flow',
    def: 'The path a visitor takes through a site or app to complete a task. Mapping it out often reveals unnecessary steps that quietly kill conversions.',
  },
  {
    term: 'Wireframe',
    def: 'A simplified, mostly colorless layout sketch of a page, used to lock in structure and priority before any visual design begins.',
  },
  {
    term: 'Engagement rate',
    def: 'On social media, the share of your audience that likes, comments, shares, or saves a post, relative to how many people saw it. A better signal than follower count alone.',
  },
  {
    term: 'SEO',
    def: 'Search engine optimization: the practice of structuring content and pages so search engines understand and rank them for relevant queries.',
  },
  {
    term: 'Mobile-first design',
    def: 'Designing for the smallest screen first, then expanding up to desktop, since most visitors to most sites now arrive on a phone.',
  },
  {
    term: 'Accessibility',
    def: 'Designing a site so people with visual, motor, or cognitive impairments can still use it, sufficient color contrast, keyboard navigation, readable text sizes.',
  },
];

export const GLOSSARY_TERMS: GlossaryTerm[] = RAW_TERMS.map((t) => ({ ...t, slug: slugify(t.term) }));
