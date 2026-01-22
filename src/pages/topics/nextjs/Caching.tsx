import { TopicLayout } from '@/components/TopicLayout';

const cachingCode = `// Caching Patterns: Optimize performance in Next.js

// ✅ Fetch with cache control (default: force-cache)
async function getProduct(id: string) {
  const res = await fetch(\`https://api.example.com/products/\${id}\`, {
    cache: 'force-cache', // Cache indefinitely (default)
  });
  return res.json();
}

// ✅ Revalidate cache after time period
async function getBlogPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  return res.json();
}

// ✅ No caching for dynamic data
async function getUserProfile(userId: string) {
  const res = await fetch(\`https://api.example.com/users/\${userId}\`, {
    cache: 'no-store', // Always fetch fresh
  });
  return res.json();
}

// ✅ On-demand revalidation with tags
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { tags: ['products'] },
  });
  return res.json();
}

// Revalidate from API route
import { revalidateTag } from 'next/cache';

export async function POST() {
  revalidateTag('products'); // Invalidate all 'products' cache
  return Response.json({ revalidated: true });
}

// ✅ Route segment config
export const revalidate = 3600; // Revalidate page every hour
export const dynamic = 'force-dynamic'; // Opt out of caching

// ✅ React cache for deduplication
import { cache } from 'react';

const getUser = cache(async (id: string) => {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
});

// Multiple calls in same render = single fetch
async function Page() {
  const user1 = await getUser('123'); // Fetches
  const user2 = await getUser('123'); // Uses cached result
  return <div>{user1.name}</div>;
}

// ✅ unstable_cache for custom caching
import { unstable_cache } from 'next/cache';

const getCachedData = unstable_cache(
  async (id: string) => {
    return await db.query(id);
  },
  ['data-cache'], // Cache key
  { revalidate: 3600, tags: ['data'] }
);

// ✅ Client-side caching with SWR
'use client';
import useSWR from 'swr';

function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  if (isLoading) return <div>Loading...</div>;
  return <div>{data.name}</div>;
}`;

const Caching = () => {
  return (
    <TopicLayout
      title="Caching Patterns"
      route="/nextjs/patterns/caching"
      category="nextjs"
      explanation="Next.js provides multiple caching layers: fetch cache, React cache for deduplication, and on-demand revalidation. Understanding cache strategies (force-cache, no-store, revalidate) is critical for performance and data freshness."
      code={cachingCode}
      codeFilename="caching.tsx"
      whyItMatters="Performance optimization is key. Interviewers ask: 'How does Next.js caching work?', 'When to use revalidate vs no-store?', 'On-demand revalidation?' Shows understanding of performance trade-offs and data freshness."
      mistakes={[
        "Not understanding defaults: fetch() caches by default in Next.js.",
        "Using no-store everywhere: Loses performance benefits. Cache when possible.",
        "Missing revalidation strategy: Stale data without proper invalidation.",
        "Not using tags: Makes targeted cache invalidation impossible.",
      ]}
      practiceTask="Create a product catalog that caches product list for 1 hour, but revalidates immediately when admin updates products via API route. Include loading states and error handling."
    />
  );
};

export default Caching;