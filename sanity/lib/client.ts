import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Freshness is controlled by Next's Data Cache (tags + revalidate) below,
  // not Sanity's CDN cache, so on-demand webhook revalidation isn't delayed
  // by an extra caching layer.
  useCdn: false,
});
