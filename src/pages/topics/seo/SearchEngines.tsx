import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const searchEnginesCode = `// How Search Engines Work: Crawling, Indexing, Ranking

// ✅ Making your site crawlable (robots.txt)
// File: public/robots.txt
/*
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Sitemap: https://yoursite.com/sitemap.xml
*/

// ✅ XML Sitemap generation (Next.js App Router)
// File: app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yoursite.com';
  
  // Static pages
  const routes = ['', '/about', '/contact'].map((route) => ({
    url: \`\${baseUrl}\${route}\`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic pages (fetch from database)
  const topics = await fetchAllTopics();
  const topicRoutes = topics.map((topic) => ({
    url: \`\${baseUrl}/topics/\${topic.slug}\`,
    lastModified: topic.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...topicRoutes];
}

// ✅ Structured data for rich snippets (JSON-LD)
export default function ArticlePage({ article }: { article: Article }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    image: article.image,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
      </article>
    </>
  );
}

// ✅ Canonical URLs to prevent duplicate content
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://yoursite.com/javascript/closures',
  },
};

// ✅ Internal linking for crawlability
export default function TopicPage() {
  return (
    <div>
      <h1>JavaScript Closures</h1>
      <nav aria-label="Related topics">
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/javascript/scope">Scope & Variables</a></li>
          <li><a href="/javascript/functions">Functions</a></li>
        </ul>
      </nav>
    </div>
  );
}`;

const SearchEngines = () => {
  return (
    <TopicLayout
      title="How Search Engines Work"
      route="/seo/basics/search-engines"
      category="javascript"
      explanation="Search engines: 1) Crawl (discover pages via links), 2) Index (analyze and store content), 3) Rank (order results by relevance). Frontend devs control crawlability (robots.txt, sitemap), indexability (metadata, structured data), and ranking signals (performance, content quality)."
      code={searchEnginesCode}
      codeFilename="search-engines.tsx"
      whyItMatters="Understanding the process helps you optimize correctly. Interviewers ask: 'How do search engines find your pages?', 'What's a sitemap?', 'How do you prevent indexing?' Shows you think beyond just building features."
      mistakes={[
        "Blocking important pages in robots.txt: Accidentally disallow critical content.",
        "No sitemap: Search engines may miss pages, especially new content.",
        "Missing canonical URLs: Duplicate content penalties hurt rankings.",
        "No structured data: Miss out on rich snippets in search results.",
      ]}
      practiceTask="Create a sitemap.ts file for your project that includes all static pages and dynamically generates routes for blog posts. Add robots.txt that allows all crawlers except blocks /api/ routes."
    >
      <MultiExampleEditor
        title="🎯 Try It: Search Engine Optimization"
        examples={[
          {
            title: "❌ Before: Not Crawlable",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 20px; font-family: system-ui; background: #fee; }
  .card { background: white; padding: 30px; border-radius: 8px; margin-bottom: 20px; }
  .error { background: #fee; border-left: 4px solid #ef4444; padding: 15px; border-radius: 4px; }
  .code { background: #1f2937; color: #ef4444; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 13px; margin: 10px 0; }
</style>
</head>
<body>
  <div class="error">
    <strong>❌ Search Engine Problems:</strong><br>
    • No sitemap (hard to discover pages)<br>
    • No robots.txt (no crawl control)<br>
    • No structured data (no rich snippets)<br>
    • No internal links (poor crawlability)
  </div>

  <div class="card">
    <h2>robots.txt</h2>
    <div class="code"># ❌ No robots.txt file<br># Search engines don't know what to crawl</div>
  </div>

  <div class="card">
    <h2>sitemap.xml</h2>
    <div class="code"># ❌ No sitemap<br># Search engines may miss pages</div>
  </div>

  <div class="card">
    <h2>Blog Post</h2>
    <h1>My Article</h1>
    <p>Content without structured data...</p>
    <div class="code">&lt;!-- ❌ No JSON-LD structured data --&gt;<br>&lt;!-- No rich snippets in search results --&gt;</div>
  </div>

  <div class="card" style="background:#f9fafb;">
    <h3>Search Result Preview:</h3>
    <div style="padding:15px; border:1px solid #ccc; border-radius:6px;">
      <div style="color:#1a0dab; font-size:18px;">My Article</div>
      <div style="color:#006621; font-size:14px;">yoursite.com</div>
      <div style="color:#545454; font-size:14px; margin-top:5px;">Generic snippet with no rich data...</div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "✅ After: Fully Optimized",
            code: `<!DOCTYPE html>
<html>
<head>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Complete Guide to React Hooks",
    "author": {
      "@type": "Person",
      "name": "John Doe"
    },
    "datePublished": "2024-01-15",
    "image": "https://yoursite.com/article-image.jpg",
    "articleBody": "Master React Hooks with this comprehensive guide..."
  }
  </script>
  <style>
    body { margin: 0; padding: 20px; font-family: system-ui; background: #d1fae5; }
    .card { background: white; padding: 30px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .success { background: #d1fae5; border-left: 4px solid #10b981; padding: 15px; border-radius: 4px; }
    .code { background: #1f2937; color: #10b981; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 13px; margin: 10px 0; white-space: pre-wrap; }
    .badge { display: inline-block; background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="success">
    <strong>✅ Search Engine Optimized:</strong><br>
    • Sitemap for all pages<br>
    • robots.txt for crawl control<br>
    • Structured data for rich snippets<br>
    • Internal linking structure
  </div>

  <div class="card">
    <h2>robots.txt <span class="badge">CONFIGURED</span></h2>
    <div class="code">User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Sitemap: https://yoursite.com/sitemap.xml</div>
  </div>

  <div class="card">
    <h2>sitemap.xml <span class="badge">AUTO-GENERATED</span></h2>
    <div class="code">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"&gt;
  &lt;url&gt;
    &lt;loc&gt;https://yoursite.com/&lt;/loc&gt;
    &lt;lastmod&gt;2024-01-15&lt;/lastmod&gt;
    &lt;priority&gt;1.0&lt;/priority&gt;
  &lt;/url&gt;
  &lt;url&gt;
    &lt;loc&gt;https://yoursite.com/topics/react-hooks&lt;/loc&gt;
    &lt;lastmod&gt;2024-01-15&lt;/lastmod&gt;
    &lt;priority&gt;0.8&lt;/priority&gt;
  &lt;/url&gt;
&lt;/urlset&gt;</div>
  </div>

  <div class="card">
    <h2>Blog Post <span class="badge">STRUCTURED DATA</span></h2>
    <h1>Complete Guide to React Hooks</h1>
    <p style="color:#6b7280; margin:10px 0;">📅 Jan 15, 2024 | 👤 John Doe</p>
    <p>Master React Hooks with this comprehensive guide covering useState, useEffect, and custom hooks.</p>
    
    <nav style="margin-top:20px; padding:15px; background:#f9fafb; border-radius:6px;">
      <h3>Related Topics:</h3>
      <ul>
        <li><a href="#" style="color:#3b82f6;">useState Hook</a></li>
        <li><a href="#" style="color:#3b82f6;">useEffect Hook</a></li>
        <li><a href="#" style="color:#3b82f6;">Custom Hooks</a></li>
      </ul>
    </nav>
  </div>

  <div class="card" style="background:#f0fdf4;">
    <h3>Search Result with Rich Snippet:</h3>
    <div style="padding:15px; border:1px solid #10b981; border-radius:6px; background:white;">
      <div style="color:#1a0dab; font-size:18px; font-weight:500;">Complete Guide to React Hooks</div>
      <div style="color:#006621; font-size:14px; margin:5px 0;">yoursite.com › topics › react-hooks</div>
      <div style="color:#545454; font-size:14px; margin:5px 0;">Master React Hooks with this comprehensive guide covering useState, useEffect...</div>
      <div style="margin-top:10px; padding:10px; background:#f9fafb; border-radius:4px; font-size:13px;">
        <div>⭐ <strong>Article</strong> by John Doe</div>
        <div>📅 Published: Jan 15, 2024</div>
      </div>
    </div>
  </div>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default SearchEngines;