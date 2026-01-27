import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

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
    >
      <MultiExampleEditor
        title="🎯 Try It: Server vs Client SEO"
        examples={[
          {
            title: "❌ Before: Client-Side Rendering",
            code: `<!DOCTYPE html>
<html>
<head>
  <title>Blog Post</title>
  <style>
    body { margin: 0; padding: 20px; font-family: system-ui; background: #fee; }
    .card { background: white; padding: 30px; border-radius: 8px; margin-bottom: 20px; }
    .error { background: #fee; border-left: 4px solid #ef4444; padding: 15px; border-radius: 4px; }
    .loading { text-align: center; color: #999; padding: 40px; }
  </style>
</head>
<body>
  <div class="error">
    <strong>\u274c Client-Side Rendering Problems:</strong><br>
    \u2022 Content not in initial HTML<br>
    \u2022 Search engines may not wait for JS<br>
    \u2022 Slow initial page load<br>
    \u2022 Poor SEO rankings
  </div>

  <div class="card" id="content">
    <div class="loading">Loading content...</div>
  </div>

  <div class="card" style="background:#f9fafb;">
    <h3>What Search Engines See:</h3>
    <div style="padding:15px; border:1px solid #ccc; border-radius:6px; background:#fff;">
      <code style="color:#999;">&lt;div id="content"&gt;<br>  &lt;div class="loading"&gt;Loading...&lt;/div&gt;<br>&lt;/div&gt;</code>
      <p style="margin-top:10px; color:#ef4444;">\u274c No actual content visible to crawlers!</p>
    </div>
  </div>

  <script>
    setTimeout(function() {
      var html = '<h1>Complete Guide to React Hooks</h1>';
      html += '<p>Master React Hooks with this comprehensive guide...</p>';
      html += '<p style="color:#ef4444; margin-top:20px;">\u274c This content loaded after 2 seconds. Search engines may have already left!</p>';
      document.getElementById('content').innerHTML = html;
    }, 2000);
  </script>
</body>
</html>`
          },
          {
            title: "✅ After: Server-Side Rendering",
            code: `<!DOCTYPE html>
<html>
<head>
  <title>Complete Guide to React Hooks | Frontend Interview Prep</title>
  <meta name="description" content="Master React Hooks with this comprehensive guide covering useState, useEffect, and custom hooks.">
  <style>
    body { margin: 0; padding: 20px; font-family: system-ui; background: #d1fae5; }
    .card { background: white; padding: 30px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .success { background: #d1fae5; border-left: 4px solid #10b981; padding: 15px; border-radius: 4px; }
    .badge { display: inline-block; background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-left: 10px; }
    .server-badge { background: #10b981; }
    .client-badge { background: #f59e0b; }
    .btn { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; transition: transform 0.2s; }
    .btn:hover { transform: scale(1.05); }
  </style>
</head>
<body>
  <div class="success">
    <strong>✅ Server-Side Rendering Benefits:</strong><br>
    • Content in initial HTML<br>
    • Search engines see everything<br>
    • Fast initial page load<br>
    • Excellent SEO rankings
  </div>

  <!-- ✅ SERVER COMPONENT: Pre-rendered content -->
  <article class="card">
    <h1>Complete Guide to React Hooks <span class="badge server-badge">SERVER</span></h1>
    <p style="color:#6b7280; margin:10px 0;">📅 Published: Jan 15, 2024 | 👤 By John Doe</p>
    
    <div style="margin:20px 0;">
      <p>Master React Hooks with this comprehensive guide covering useState, useEffect, and custom hooks with real-world examples.</p>
      
      <h2 style="margin-top:30px;">What are React Hooks?</h2>
      <p>React Hooks are functions that let you use state and other React features in functional components.</p>
      
      <h2 style="margin-top:30px;">Common Hooks</h2>
      <ul style="margin-left:20px; color:#4b5563;">
        <li>useState - State management</li>
        <li>useEffect - Side effects</li>
        <li>useContext - Context API</li>
        <li>Custom Hooks - Reusable logic</li>
      </ul>
    </div>

    <!-- ✅ CLIENT COMPONENT: Interactive elements -->
    <div style="border-top:2px solid #e5e7eb; padding-top:20px; margin-top:20px;">
      <h3>Interactive Section <span class="badge client-badge">CLIENT</span></h3>
      <button class="btn" onclick="handleLike()">❤️ Like (<span id="likes">42</span>)</button>
      <button class="btn" style="background:#10b981; margin-left:10px;" onclick="toggleComments()">💬 Comments</button>
    </div>

    <div id="comments" style="display:none; margin-top:20px; padding:20px; background:#f9fafb; border-radius:6px;">
      <h4>Comments <span class="badge client-badge">CLIENT</span></h4>
      <p style="color:#6b7280;">Interactive comments section...</p>
    </div>
  </article>

  <div class="card" style="background:#f0fdf4;">
    <h3>What Search Engines See:</h3>
    <div style="padding:15px; border:1px solid #10b981; border-radius:6px; background:#fff;">
      <code style="color:#10b981;">&lt;article&gt;<br>  &lt;h1&gt;Complete Guide to React Hooks&lt;/h1&gt;<br>  &lt;p&gt;Master React Hooks...&lt;/p&gt;<br>  &lt;h2&gt;What are React Hooks?&lt;/h2&gt;<br>  &lt;p&gt;React Hooks are functions...&lt;/p&gt;<br>&lt;/article&gt;</code>
      <p style="margin-top:10px; color:#10b981;">✅ All content immediately visible to crawlers!</p>
    </div>
  </div>

  <div class="card" style="background:#dbeafe; border-left:4px solid #3b82f6;">
    <strong>🎯 Architecture:</strong><br>
    • <span class="badge server-badge">SERVER</span> Article content (SEO-critical)<br>
    • <span class="badge server-badge">SERVER</span> Metadata & structured data<br>
    • <span class="badge client-badge">CLIENT</span> Like button (interactive)<br>
    • <span class="badge client-badge">CLIENT</span> Comments (user input)
  </div>

  <script>
    let likes = 42;
    function handleLike() {
      likes++;
      document.getElementById('likes').textContent = likes;
    }
    function toggleComments() {
      const el = document.getElementById('comments');
      el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }
  </script>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default ServerClientSeo;