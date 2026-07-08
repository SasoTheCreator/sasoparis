import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Tag-based revalidation via defineLive (live.ts) + SSG (generateStaticParams) — the CDN's eventual consistency causes stale reads on recently-edited documents
})
