export type FindingStep = { tag: string; label: string; icon: string; finding: string; detail: string };

export const AUDIT_DEMOS: { key: string; label: string; icon: string; auditName: string; steps: FindingStep[] }[] = [
  {
    key: 'website',
    label: 'Website audit',
    icon: '🌐',
    auditName: 'WEBSITE_AUDIT',
    steps: [
      {
        tag: 'Homepage',
        label: 'First impression',
        icon: '👁',
        finding: "Visitors can't tell what you sell in 3 seconds",
        detail: 'Your hero headline describes your process, not your outcome. Visitors bounce before reaching the value proposition further down the page.',
      },
      {
        tag: 'Speed',
        label: 'Load time',
        icon: '⏱',
        finding: 'Largest image loads in 4.2 seconds on mobile',
        detail: "That's above the 2.5s threshold where Google starts penalizing rankings, and where roughly 1 in 4 visitors leave before the page finishes loading.",
      },
      {
        tag: 'Checkout',
        label: 'Conversion path',
        icon: '🛒',
        finding: 'Contact form asks for 9 fields before submit',
        detail: 'Every additional field past 4-5 measurably drops completion rate. Three of these fields are never referenced anywhere in your follow-up process.',
      },
    ],
  },
  {
    key: 'brand',
    label: 'Visual identity audit',
    icon: '🎨',
    auditName: 'BRAND_AUDIT',
    steps: [
      {
        tag: 'Colors',
        label: 'Consistency check',
        icon: '🎨',
        finding: 'Three different shades of your primary color, across 4 pages',
        detail: 'Your website uses one blue, your Instagram bio uses another, and your latest PDF proposal uses a third. None match your original brand guideline.',
      },
      {
        tag: 'Typography',
        label: 'Font usage',
        icon: '🔤',
        finding: 'Headings use a font not in your brand kit',
        detail: 'A default system font appears on your pricing page, likely from a template that was never fully customized after launch.',
      },
      {
        tag: 'Voice',
        label: 'Tone check',
        icon: '🗣',
        finding: 'Website tone is formal, Instagram tone is casual',
        detail: 'The same business reads like two different companies depending on where a visitor lands first, which quietly erodes trust when they cross-check you.',
      },
    ],
  },
  {
    key: 'social',
    label: 'Social media audit',
    icon: '📱',
    auditName: 'SOCIAL_AUDIT',
    steps: [
      {
        tag: 'Bio',
        label: 'Profile check',
        icon: '📝',
        finding: 'Instagram bio link points to a page that no longer exists',
        detail: 'Your link-in-bio leads to a 404. Anyone tapping through from a post in the last several months has hit a dead end.',
      },
      {
        tag: 'Posting',
        label: 'Consistency',
        icon: '📅',
        finding: 'Posting gaps of 3+ weeks, four times this year',
        detail: 'The algorithm deprioritizes accounts with irregular posting far more than it rewards high-frequency ones, gaps hurt more than volume helps.',
      },
      {
        tag: 'Engagement',
        label: 'Content type',
        icon: '📊',
        finding: 'Product photos get 1/3 the engagement of behind-the-scenes posts',
        detail: 'Your top 5 posts by engagement are all process or team content, yet they make up under 10% of what you post.',
      },
    ],
  },
  {
    key: 'uiux',
    label: 'UI/UX audit',
    icon: '🧭',
    auditName: 'UIUX_AUDIT',
    steps: [
      {
        tag: 'Navigation',
        label: 'Menu structure',
        icon: '🧭',
        finding: '"Services" and "What we do" both exist as separate menu items',
        detail: 'They lead to nearly identical content. Visitors comparing the two assume they missed something and often leave to double-check elsewhere.',
      },
      {
        tag: 'Mobile',
        label: 'Touch targets',
        icon: '📱',
        finding: 'Footer links are 28px tall, under the 44px minimum',
        detail: 'On a phone, three separate links sit close enough together that mis-taps are the likely outcome, not the exception.',
      },
      {
        tag: 'Forms',
        label: 'Error handling',
        icon: '⚠️',
        finding: 'Invalid email shows no error until after full page reload',
        detail: 'Users get no inline feedback, so a simple typo means resubmitting the entire form and re-reading everything to find what went wrong.',
      },
    ],
  },
];
