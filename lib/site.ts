/**
 * Public contact details and social links. Set the env vars to show them; anything left
 * empty is simply not rendered, so the site never links to a placeholder.
 */
export const SITE = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '',
  socials: [
    { label: 'Instagram', url: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? '' },
    { label: 'Twitter', url: process.env.NEXT_PUBLIC_TWITTER_URL ?? '' },
    { label: 'LinkedIn', url: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? '' },
  ].filter((social) => social.url),
}
