import { TopicLayout } from '@/components/TopicLayout';
import { Search, Link2, FileText, Smartphone, Zap, Code2 } from 'lucide-react';

export const Keywords = () => (
  <TopicLayout title="Keyword Research" route="/seo/basics/keywords" category="javascript"
    explanation="Keyword research identifies terms users search for. Target keywords with good search volume and low competition."
    code={`<!-- Primary Keyword in Title -->
<title>Best React Interview Questions 2024 | Frontend Developer Guide</title>

<!-- Keywords in Meta Description -->
<meta name="description" content="Master React interview questions with code examples. Complete guide for frontend developers preparing for technical interviews." />

<!-- Keywords in Headings -->
<h1>React Interview Questions</h1>
<h2>Common React Hooks Questions</h2>

<!-- Keywords in Content (Natural) -->
<p>React hooks like useState and useEffect are frequently asked in interviews...</p>

<!-- Alt Text with Keywords -->
<img src="react-hooks.png" alt="React hooks useState useEffect example" />`}
    whyItMatters="Keywords connect your content to user searches. Proper keyword placement improves rankings and drives organic traffic."
    mistakes={['Keyword stuffing (overusing keywords)', 'Targeting only high-competition keywords', 'Ignoring long-tail keywords', 'Not matching search intent']}
    practiceTask="Research 5 keywords for a blog about JavaScript closures. Use Google Keyword Planner or similar tools."
  >
    <div className="space-y-4">
      <div className="topic-card p-6 bg-gradient-to-r from-purple-500/10 to-purple-500/5">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-purple-500" />
          Keyword Types Visual
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-background rounded-lg border-2 border-purple-500/30">
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-semibold text-sm mb-1">Short-tail</div>
            <div className="text-xs text-muted-foreground">"React" - High volume, high competition</div>
          </div>
          <div className="p-4 bg-background rounded-lg border-2 border-purple-500/50">
            <div className="text-2xl mb-2">🎪</div>
            <div className="font-semibold text-sm mb-1">Mid-tail</div>
            <div className="text-xs text-muted-foreground">"React hooks" - Medium volume, medium competition</div>
          </div>
          <div className="p-4 bg-background rounded-lg border-2 border-purple-500/70">
            <div className="text-2xl mb-2">🎁</div>
            <div className="font-semibold text-sm mb-1">Long-tail</div>
            <div className="text-xs text-muted-foreground">"React useState hook examples" - Low volume, low competition</div>
          </div>
        </div>
      </div>
    </div>
  </TopicLayout>
);

export const UrlStructure = () => (
  <TopicLayout title="URL Structure" route="/seo/on-page/url-structure" category="javascript"
    explanation="Clean, descriptive URLs improve SEO and user experience. Use hyphens, lowercase, and include keywords."
    code={`<!-- ❌ Bad URLs -->
https://example.com/page?id=123
https://example.com/product_detail.php?cat=5&item=789
https://example.com/BLOG/Post-Title

<!-- ✅ Good URLs -->
https://example.com/react-interview-questions/
https://example.com/blog/javascript-closures-explained/
https://example.com/products/wireless-headphones/

<!-- URL Best Practices -->
- Use hyphens (-) not underscores (_)
- Keep it short and descriptive
- Include target keyword
- Use lowercase only
- Avoid special characters
- Add trailing slash for consistency

<!-- React Router Example -->
<Route path="/blog/:category/:slug/" element={<BlogPost />} />

// Good: /blog/javascript/closures-explained/
// Bad: /blog/post?id=123`}
    whyItMatters="URLs are ranking factors. Clean URLs improve click-through rates and are easier to share and remember."
    mistakes={['Using dynamic parameters (?id=123)', 'Mixing uppercase/lowercase', 'Using underscores instead of hyphens', 'Making URLs too long']}
    practiceTask="Redesign these URLs: /page.php?id=5, /PRODUCTS/Item_123, /blog-post-about-react-hooks-and-state-management-best-practices"
  >
    <div className="topic-card p-6 bg-gradient-to-r from-blue-500/10 to-blue-500/5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Link2 className="w-5 h-5 text-blue-500" />
        URL Structure Comparison
      </h3>
      <div className="space-y-3">
        <div className="p-4 bg-red-500/10 border-2 border-red-500/30 rounded-lg">
          <div className="text-xs font-semibold text-red-500 mb-1">❌ Bad</div>
          <code className="text-sm">example.com/page?id=123&cat=tech</code>
        </div>
        <div className="p-4 bg-green-500/10 border-2 border-green-500/30 rounded-lg">
          <div className="text-xs font-semibold text-green-500 mb-1">✅ Good</div>
          <code className="text-sm">example.com/tech/article-title/</code>
        </div>
      </div>
    </div>
  </TopicLayout>
);

export const InternalLinking = () => (
  <TopicLayout title="Internal Linking" route="/seo/on-page/internal-linking" category="javascript"
    explanation="Internal links connect pages within your site. They distribute page authority, improve navigation, and help search engines discover content."
    code={`<!-- Descriptive Anchor Text -->
<a href="/react/hooks/useState/">Learn about useState hook</a>

<!-- ❌ Bad Anchor Text -->
<a href="/page1">Click here</a>
<a href="/page2">Read more</a>

<!-- ✅ Good Anchor Text -->
<a href="/javascript/closures/">Understanding JavaScript Closures</a>
<a href="/react/performance/">React Performance Optimization Guide</a>

<!-- Breadcrumb Navigation -->
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/javascript/">JavaScript</a></li>
    <li><a href="/javascript/advanced/">Advanced</a></li>
    <li>Closures</li>
  </ol>
</nav>

<!-- Related Posts -->
<aside>
  <h3>Related Topics</h3>
  <ul>
    <li><a href="/javascript/scope/">Variable Scope</a></li>
    <li><a href="/javascript/hoisting/">Hoisting</a></li>
  </ul>
</aside>`}
    whyItMatters="Internal linking improves site structure, distributes link equity, and increases page views. It's a powerful on-page SEO technique."
    mistakes={['Using generic anchor text ("click here")', 'Too many links on one page', 'Broken internal links', 'Not linking to important pages']}
    practiceTask="Create an internal linking strategy for a blog with 20 posts across 4 categories."
  >
    <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-green-500/5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Link2 className="w-5 h-5 text-green-500" />
        Internal Linking Structure
      </h3>
      <div className="flex items-center justify-center p-6">
        <div className="relative">
          <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center font-bold border-4 border-primary">
            Home
          </div>
          <div className="absolute -right-24 top-0 w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center text-sm border-2 border-blue-500">
            Category
          </div>
          <div className="absolute -right-24 bottom-0 w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center text-sm border-2 border-green-500">
            Post
          </div>
          <div className="absolute -left-24 top-8 w-24 h-24 bg-orange-500/20 rounded-full flex items-center justify-center text-sm border-2 border-orange-500">
            Related
          </div>
        </div>
      </div>
    </div>
  </TopicLayout>
);

export const SitemapRobots = () => (
  <TopicLayout title="Sitemap & Robots.txt" route="/seo/technical/sitemap-robots" category="javascript"
    explanation="Sitemap helps search engines discover pages. Robots.txt controls which pages crawlers can access."
    code={`<!-- sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/blog/react-hooks/</loc>
    <lastmod>2024-01-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>

<!-- robots.txt -->
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /private/

Sitemap: https://example.com/sitemap.xml

<!-- Dynamic Sitemap (Next.js) -->
export async function GET() {
  const posts = await getPosts();
  const sitemap = \`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      \${posts.map(post => \`
        <url>
          <loc>https://example.com/\${post.slug}/</loc>
          <lastmod>\${post.date}</lastmod>
        </url>
      \`).join('')}
    </urlset>\`;
  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' }
  });
}`}
    whyItMatters="Sitemaps ensure all pages are discovered. Robots.txt protects sensitive pages and saves crawl budget."
    mistakes={['Not submitting sitemap to Google Search Console', 'Blocking important pages in robots.txt', 'Outdated sitemap', 'Missing sitemap reference in robots.txt']}
    practiceTask="Create a sitemap.xml for a blog with 50 posts and a robots.txt that blocks /admin and /api."
  >
    <div className="topic-card p-6 bg-gradient-to-r from-indigo-500/10 to-indigo-500/5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5 text-indigo-500" />
        Sitemap Structure
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-background rounded-lg border-2 border-indigo-500/30">
          <div className="font-semibold text-sm mb-2">sitemap.xml</div>
          <div className="text-xs space-y-1 text-muted-foreground">
            <div>✓ Lists all pages</div>
            <div>✓ Update frequency</div>
            <div>✓ Priority levels</div>
            <div>✓ Last modified dates</div>
          </div>
        </div>
        <div className="p-4 bg-background rounded-lg border-2 border-indigo-500/30">
          <div className="font-semibold text-sm mb-2">robots.txt</div>
          <div className="text-xs space-y-1 text-muted-foreground">
            <div>✓ Allow/Disallow rules</div>
            <div>✓ Sitemap location</div>
            <div>✓ Crawl delay</div>
            <div>✓ User-agent specific</div>
          </div>
        </div>
      </div>
    </div>
  </TopicLayout>
);

export const StructuredData = () => (
  <TopicLayout title="Structured Data (Schema)" route="/seo/technical/structured-data" category="javascript"
    explanation="Structured data (Schema.org) helps search engines understand content. Enables rich snippets in search results."
    code={`<!-- Article Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "React Hooks Complete Guide",
  "author": {
    "@type": "Person",
    "name": "John Doe"
  },
  "datePublished": "2024-01-15",
  "image": "https://example.com/react-hooks.jpg",
  "publisher": {
    "@type": "Organization",
    "name": "Tech Blog",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  }
}
</script>

<!-- Breadcrumb Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://example.com/"
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "React",
    "item": "https://example.com/react/"
  }]
}
</script>

<!-- FAQ Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What are React Hooks?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "React Hooks are functions that let you use state and lifecycle features in functional components."
    }
  }]
}
</script>`}
    whyItMatters="Structured data enables rich snippets (star ratings, FAQs, breadcrumbs) which improve click-through rates and visibility."
    mistakes={['Invalid JSON-LD syntax', 'Missing required properties', 'Not testing with Google Rich Results Test', 'Using wrong schema type']}
    practiceTask="Add Article schema to a blog post with author, date, and image. Test it with Google's Rich Results Test."
  >
    <div className="topic-card p-6 bg-gradient-to-r from-yellow-500/10 to-yellow-500/5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Code2 className="w-5 h-5 text-yellow-500" />
        Schema Types
      </h3>
      <div className="grid md:grid-cols-3 gap-3">
        {['Article', 'Product', 'Recipe', 'Event', 'FAQ', 'Review'].map(type => (
          <div key={type} className="p-3 bg-background rounded-lg border border-yellow-500/30 text-center">
            <div className="font-semibold text-sm">{type}</div>
          </div>
        ))}
      </div>
    </div>
  </TopicLayout>
);

export const MobileSeo = () => (
  <TopicLayout title="Mobile SEO" route="/seo/technical/mobile-seo" category="javascript"
    explanation="Mobile-first indexing means Google primarily uses mobile version for ranking. Responsive design and mobile performance are critical."
    code={`<!-- Viewport Meta Tag (Required) -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Responsive Images -->
<img 
  src="image-800.jpg"
  srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  alt="Responsive image"
/>

<!-- Mobile-Friendly CSS -->
@media (max-width: 768px) {
  .container { padding: 1rem; }
  .text { font-size: 14px; }
  .button { padding: 12px 24px; }
}

<!-- Touch-Friendly Buttons -->
<button style="min-height: 44px; min-width: 44px;">
  Click Me
</button>

<!-- Avoid Flash, Pop-ups -->
<!-- ❌ Bad: Intrusive interstitials -->
<!-- ✅ Good: Easy-to-dismiss banners -->

<!-- Test Mobile-Friendliness -->
// Google Mobile-Friendly Test
// PageSpeed Insights Mobile Score
// Chrome DevTools Device Mode`}
    whyItMatters="60%+ traffic is mobile. Google uses mobile-first indexing. Poor mobile experience = lower rankings and lost traffic."
    mistakes={['Not using viewport meta tag', 'Small tap targets (<44px)', 'Horizontal scrolling', 'Intrusive pop-ups', 'Slow mobile load times']}
    practiceTask="Test your site with Google Mobile-Friendly Test. Fix any issues found."
  >
    <div className="topic-card p-6 bg-gradient-to-r from-pink-500/10 to-pink-500/5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Smartphone className="w-5 h-5 text-pink-500" />
        Mobile vs Desktop
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-background rounded-lg border-2 border-pink-500/30">
          <div className="text-2xl mb-2">📱</div>
          <div className="font-semibold text-sm mb-2">Mobile</div>
          <div className="text-xs space-y-1 text-muted-foreground">
            <div>• Smaller screen</div>
            <div>• Touch interface</div>
            <div>• Slower connection</div>
            <div>• Primary for ranking</div>
          </div>
        </div>
        <div className="p-4 bg-background rounded-lg border-2 border-pink-500/30">
          <div className="text-2xl mb-2">💻</div>
          <div className="font-semibold text-sm mb-2">Desktop</div>
          <div className="text-xs space-y-1 text-muted-foreground">
            <div>• Larger screen</div>
            <div>• Mouse/keyboard</div>
            <div>• Faster connection</div>
            <div>• Secondary for ranking</div>
          </div>
        </div>
      </div>
    </div>
  </TopicLayout>
);

export const PageSpeed = () => (
  <TopicLayout title="Page Speed Optimization" route="/seo/technical/page-speed" category="javascript"
    explanation="Page speed is a ranking factor. Faster sites provide better UX and higher conversions. Optimize images, code, and server response."
    code={`<!-- Image Optimization -->
<img 
  src="image.webp" 
  loading="lazy" 
  width="800" 
  height="600"
  alt="Optimized image"
/>

<!-- Preload Critical Resources -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/styles/critical.css" as="style" />

<!-- Defer Non-Critical JS -->
<script src="/analytics.js" defer></script>
<script src="/chat.js" async></script>

<!-- Minify CSS/JS -->
// Before: 150KB
// After minification: 45KB
// After gzip: 12KB

<!-- Code Splitting (React) -->
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<!-- CDN for Static Assets -->
<img src="https://cdn.example.com/image.jpg" />

<!-- Reduce Server Response Time -->
- Use caching (Redis, CDN)
- Optimize database queries
- Use HTTP/2
- Enable compression (gzip/brotli)

<!-- Lighthouse Score Goals -->
Performance: 90+
Accessibility: 90+
Best Practices: 90+
SEO: 90+`}
    whyItMatters="1 second delay = 7% conversion loss. Page speed affects rankings, user experience, and revenue."
    mistakes={['Not optimizing images', 'Blocking render with JS/CSS', 'No caching strategy', 'Large bundle sizes', 'Slow server response']}
    practiceTask="Run PageSpeed Insights on your site. Implement top 3 recommendations."
  >
    <div className="topic-card p-6 bg-gradient-to-r from-orange-500/10 to-orange-500/5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-orange-500" />
        Speed Optimization Checklist
      </h3>
      <div className="grid md:grid-cols-2 gap-3">
        {[
          'Optimize images (WebP, lazy load)',
          'Minify CSS/JS',
          'Enable compression',
          'Use CDN',
          'Code splitting',
          'Reduce server response',
          'Eliminate render-blocking',
          'Browser caching'
        ].map(item => (
          <div key={item} className="flex items-center gap-2 p-2 bg-background rounded text-xs">
            <div className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">✓</div>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  </TopicLayout>
);

export default { Keywords, UrlStructure, InternalLinking, SitemapRobots, StructuredData, MobileSeo, PageSpeed };
