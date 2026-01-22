import { TopicLayout } from '@/components/TopicLayout';

const serverClientSeoCode = `// Server vs Client Components: SEO implications in Next.js

// ✅ Server Component (default) - Best for SEO
// Content is rendered on server, fully available to search engines
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug); // Direct database access
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {/* All content visible to search engines immediately */}
    </article>
  );
}

// ✅ Client Component - Use sparingly for SEO-critical content
'use client';
import { useState, useEffect } from 'react';

export default function ClientFetchedContent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // ❌ Content not available on initial HTML
    // Search engines may not wait for JavaScript
    fetch('/api/data').then(res => res.json()).then(setData);
  }, []);

  return <div>{data?.content}</div>; // Not SEO-friendly
}

// ✅ Hybrid approach: Server fetches, Client handles interactivity
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id); // Server-side fetch
  
  return (
    <div>
      {/* SEO-critical content in server component */}
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <Image src={product.image} alt={product.name} width={600} height={400} />
      
      {/* Interactive elements in client component */}
      <AddToCartButton productId={product.id} />
      <ReviewsSection productId={product.id} />
    </div>
  );
}

'use client';
function AddToCartButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  
  const handleClick = async () => {
    setLoading(true);
    await addToCart(productId);
    setLoading(false);
  };

  return <button onClick={handleClick}>Add to Cart</button>;
}

// ✅ Static rendering for best SEO (generateStaticParams)
export async function generateStaticParams() {
  const posts = await fetchAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function StaticPost({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// ✅ Dynamic rendering with revalidation
export const revalidate = 3600; // Revalidate every hour

export default async function NewsPage() {
  const news = await fetchLatestNews(); // Fresh data every hour
  
  return (
    <div>
      {news.map((item) => (
        <article key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.summary}</p>
        </article>
      ))}
    </div>
  );
}

// ✅ Streaming with Suspense - SEO-friendly
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Critical content loads first */}
      <Suspense fallback={<Skeleton />}>
        <CriticalData />
      </Suspense>
      
      {/* Non-critical content streams in */}
      <Suspense fallback={<Skeleton />}>
        <SlowData />
      </Suspense>
    </div>
  );
}

// ❌ Bad for SEO: Client-side routing without proper metadata
'use client';
function BadSPA() {
  const [page, setPage] = useState('home');
  
  return (
    <div>
      {page === 'home' && <HomePage />}
      {page === 'about' && <AboutPage />}
      {/* Search engines see only initial state */}
    </div>
  );
}`;

const ServerClientSeo = () => {
  return (
    <TopicLayout
      title="Server vs Client Components & SEO"
      route="/seo/nextjs/server-vs-client"
      category="javascript"
      explanation="Server Components render on server, content immediately available to search engines. Client Components render in browser, search engines may miss content. For SEO: use Server Components for content, Client Components for interactivity. Next.js App Router defaults to Server Components."
      code={serverClientSeoCode}
      codeFilename="server-client-seo.tsx"
      whyItMatters="Rendering strategy directly affects SEO. Client-side rendering can hurt rankings. Interviewers ask: 'SSR vs CSR for SEO?', 'When to use client components?', 'How does Next.js help SEO?' Shows understanding of modern web architecture."
      mistakes={[
        "Fetching SEO content client-side: Search engines may not execute JavaScript.",
        "Using 'use client' everywhere: Loses SSR benefits, hurts SEO and performance.",
        "No static generation: Dynamic rendering is slower, affects Core Web Vitals.",
        "Missing revalidation: Stale content without proper cache strategy.",
      ]}
      practiceTask="Convert a client-side fetched blog post to server component. Implement generateStaticParams for all posts, add revalidation for dynamic content, and move only interactive elements (like button, comments) to client components."
    />
  );
};

export default ServerClientSeo;