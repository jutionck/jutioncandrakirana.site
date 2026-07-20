import { client } from '@/sanity/lib/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';
import HeaderClient from './header-client';

export default async function Header() {
  const siteSettings = await client.fetch<{ logoText?: string } | null>(
    siteSettingsQuery,
    {},
    { next: { tags: ['siteSettings'], revalidate: 3600 } }
  );

  return <HeaderClient logoText={siteSettings?.logoText || 'JCK'} />;
}
