import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const titleMetaCode = `// Title & Meta Tags: Critical for SEO and click-through rates

// ✅ Static metadata (app/page.tsx)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JavaScript Closures Explained | Frontend Interview Prep',
  description: 'Master JavaScript closures with real code examples, common interview questions, and practice tasks. Learn scope, lexical environment, and practical use cases.',
  // Title: 50-60 characters (shows fully in search results)
  // Description: 150-160 characters (shows fully in search results)
};

// ✅ Dynamic metadata (app/topics/[slug]/page.tsx)
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const topic = await fetchTopic(params.slug);
  
  return {
    title: \`\${topic.title} | Frontend Interview Prep\`,
    description: topic.description,
    keywords: topic.tags.join(', '),
    openGraph: {
      title: topic.title,
      description: topic.description,
      url: \`https://yoursite.com/topics/\${params.slug}\`,
      images: [{ url: topic.image, width: 1200, height: 630 }],
      type: 'article',
      publishedTime: topic.publishedAt,
      authors: [topic.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: topic.title,
      description: topic.description,
      images: [topic.image],
      creator: '@yourhandle',
    },
  };
}

// ✅ Template-based titles (app/layout.tsx)
export const metadata: Metadata = {
  title: {
    template: '%s | Frontend Interview Prep',
    default: 'Frontend Interview Prep | Master React, Next.js & JavaScript',
  },
  description: 'Comprehensive interview preparation platform',
};

// Child pages automatically use template
export const metadata: Metadata = {
  title: 'JavaScript Closures', // Becomes: "JavaScript Closures | Frontend Interview Prep"
};

// ✅ Viewport and other meta tags
export const metadata: Metadata = {
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

// ✅ Title best practices
const goodTitles = [
  'JavaScript Closures Explained | Interview Prep', // ✅ Clear, keyword-rich
  'React Hooks Tutorial: useState & useEffect', // ✅ Descriptive
  'Next.js SEO Guide for Developers', // ✅ Target audience
];

const badTitles = [
  'Home', // ❌ Too generic
  'JavaScript Closures Explained with Examples and Code Snippets for Beginners', // ❌ Too long
  'Click Here!!!', // ❌ Clickbait
];`;

const TitleMeta = () => {
  return (
    <TopicLayout
      title="Title & Meta Tags"
      route="/seo/on-page/title-meta"
      category="javascript"
      explanation="Title tags appear in search results and browser tabs. Meta descriptions show below titles in search. Both influence click-through rates. Next.js Metadata API handles static and dynamic generation with proper SSR for SEO."
      code={titleMetaCode}
      codeFilename="title-meta.tsx"
      whyItMatters="First impression in search results. Good titles/descriptions = higher CTR = better rankings. Interviewers ask: 'How do you set metadata in Next.js?', 'Static vs dynamic metadata?', 'What's Open Graph?' Shows attention to user experience and SEO."
      mistakes={[
        "Duplicate titles: Every page needs unique title. Use templates.",
        "Too long: Titles >60 chars get cut off. Descriptions >160 chars truncated.",
        "Missing Open Graph: Social shares look broken without OG tags.",
        "Keyword stuffing: 'Buy Shoes | Cheap Shoes | Best Shoes' looks spammy.",
      ]}
      practiceTask="Create metadata for a blog post page with dynamic title, description, Open Graph tags, and Twitter cards. Title should be 50-60 chars, description 150-160 chars. Test social preview with opengraph.xyz"
    >
      <MultiExampleEditor
        title="🎯 Try It: Title & Meta"
        examples={[
          {
            title: "Good vs Bad Titles",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
  .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 1000px; margin: 0 auto; }
  .box { padding: 20px; border-radius: 12px; }
  .good { background: #14532d; border: 2px solid #10b981; }
  .bad { background: #7f1d1d; border: 2px solid #ef4444; }
  .title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
  .desc { font-size: 14px; opacity: 0.8; }
</style>
</head>
<body>
  <h2 style="text-align: center;">🎯 Title Tag Best Practices</h2>
  <div class="comparison">
    <div class="box good">
      <h3>✅ Good Titles</h3>
      <div class="title">JavaScript Closures Explained | Interview Prep</div>
      <div class="desc">Clear, keyword-rich, 50-60 chars</div>
      <br>
      <div class="title">React Hooks Tutorial: useState & useEffect</div>
      <div class="desc">Descriptive and specific</div>
    </div>
    
    <div class="box bad">
      <h3>❌ Bad Titles</h3>
      <div class="title">Home</div>
      <div class="desc">Too generic, no keywords</div>
      <br>
      <div class="title">JavaScript Closures Explained with Examples and Code Snippets for Beginners</div>
      <div class="desc">Too long (>60 chars), gets cut off</div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "Meta Description",
            code: `<!DOCTYPE html>
<html>
<head>
  <title>React Performance Optimization | Interview Prep</title>
  <meta name="description" content="Master React performance with useMemo, useCallback, React.memo, and code splitting. Learn optimization techniques with real examples and practice tasks.">
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
  .preview { background: rgba(0,0,0,0.3); padding: 20px; border-radius: 8px; margin: 20px 0; }
  .title { color: #3b82f6; font-size: 20px; margin-bottom: 5px; }
  .url { color: #10b981; font-size: 14px; margin-bottom: 10px; }
  .desc { font-size: 14px; line-height: 1.5; }
</style>
</head>
<body>
  <div class="card">
    <h2>📝 Meta Description Preview</h2>
    <div class="preview">
      <div class="title">React Performance Optimization | Interview Prep</div>
      <div class="url">https://yoursite.com/react/performance</div>
      <div class="desc">Master React performance with useMemo, useCallback, React.memo, and code splitting. Learn optimization techniques with real examples and practice tasks.</div>
    </div>
    <p style="font-size: 14px; opacity: 0.8;">✅ Description: 150-160 characters for full display in search results</p>
  </div>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default TitleMeta;