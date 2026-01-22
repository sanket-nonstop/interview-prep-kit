import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default SearchEngines;