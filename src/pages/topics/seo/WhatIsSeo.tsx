import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

const whatIsSeoCode = `// What is SEO: Search Engine Optimization fundamentals

// ✅ SEO in Next.js: Metadata API (App Router)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontend Interview Prep | Master React, Next.js & JavaScript',
  description: 'Comprehensive interview preparation platform with 60+ topics, code examples, and practice tasks for frontend developers.',
  keywords: ['frontend interview', 'react interview', 'javascript interview', 'next.js tutorial'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Frontend Interview Prep',
    description: 'Master frontend interviews with real code examples',
    url: 'https://yoursite.com',
    siteName: 'Interview Ready',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frontend Interview Prep',
    description: 'Master frontend interviews',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// ✅ SEO-friendly component structure
export default function HomePage() {
  return (
    <main className="container mx-auto px-4">
      {/* Semantic HTML for SEO */}
      <header>
        <h1 className="text-4xl font-bold">Frontend Interview Preparation</h1>
        <p className="text-lg text-gray-600">
          Master React, Next.js, and JavaScript with real code examples
        </p>
      </header>

      <section aria-label="Topics">
        <h2 className="text-2xl font-semibold">Popular Topics</h2>
        <nav aria-label="Topic navigation">
          <ul>
            <li><a href="/javascript/closures">JavaScript Closures</a></li>
            <li><a href="/react/hooks">React Hooks</a></li>
          </ul>
        </nav>
      </section>
    </main>
  );
}

// ✅ Dynamic metadata for topic pages
export async function generateMetadata({ params }: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const topic = await fetchTopic(params.slug);
  
  return {
    title: \`\${topic.title} | Frontend Interview Prep\`,
    description: topic.description,
    openGraph: {
      title: topic.title,
      description: topic.description,
      url: \`https://yoursite.com/topics/\${params.slug}\`,
    },
  };
}`;

const WhatIsSeo = () => {
  return (
    <TopicLayout
      title="What is SEO"
      route="/seo/basics/what-is-seo"
      category="javascript"
      explanation="SEO (Search Engine Optimization) makes your website discoverable in search engines like Google. For frontend devs: proper HTML structure, metadata, performance, and accessibility. It's about making content crawlable, indexable, and rankable."
      code={whatIsSeoCode}
      codeFilename="what-is-seo.tsx"
      whyItMatters="SEO drives organic traffic = users without ads. Interviewers ask: 'How do you optimize for SEO?', 'What's metadata?', 'Server vs client rendering for SEO?' Shows you understand business impact beyond just coding features."
      mistakes={[
        "Client-only rendering: Search engines struggle with JavaScript-heavy SPAs.",
        "Missing metadata: No title/description = poor search rankings.",
        "Ignoring semantic HTML: Divs everywhere hurt accessibility and SEO.",
        "Slow page speed: Core Web Vitals directly affect rankings.",
      ]}
      practiceTask="Add proper metadata to your portfolio homepage: title (50-60 chars), description (150-160 chars), Open Graph tags, and ensure all images have alt text. Test with view-source in browser."
    >
      <MultiExampleEditor
        title="🎯 Try It: SEO Basics"
        examples={[
          {
            title: "Meta Tags",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Frontend Interview Prep | Master React & JavaScript</title>
  <meta name="description" content="Comprehensive interview preparation with 60+ topics, code examples, and practice tasks for frontend developers.">
  <meta name="keywords" content="frontend interview, react, javascript, next.js">
  <style>
    body { margin: 0; padding: 40px; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
    .card { background: #1e293b; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; }
    .tag { background: #334155; padding: 10px; margin: 10px 0; border-radius: 6px; font-family: 'Courier New'; font-size: 14px; }
    .good { border-left: 4px solid #10b981; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🔍 SEO Meta Tags</h1>
    <div class="tag good">
      <strong>Title:</strong> 50-60 characters<br>
      Frontend Interview Prep | Master React & JavaScript
    </div>
    <div class="tag good">
      <strong>Description:</strong> 150-160 characters<br>
      Comprehensive interview preparation with 60+ topics, code examples, and practice tasks for frontend developers.
    </div>
    <p style="opacity: 0.7; font-size: 14px;">✅ View source (Ctrl+U) to see meta tags</p>
  </div>
</body>
</html>`
          },
          {
            title: "Semantic HTML",
            code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 40px; font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; }
  .container { max-width: 800px; margin: 0 auto; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 30px; border-radius: 12px; }
  article { background: rgba(255,255,255,0.1); padding: 20px; margin: 20px 0; border-radius: 8px; }
  h1 { margin-top: 0; }
  nav a { color: white; margin: 0 10px; text-decoration: none; font-weight: 600; }
</style>
</head>
<body>
  <div class="container">
    <header>
      <h1>My Blog</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
    
    <main>
      <article>
        <h2>Article Title</h2>
        <p>Semantic HTML helps search engines understand your content structure.</p>
      </article>
    </main>
    
    <footer>
      <p>© 2024 My Blog</p>
    </footer>
  </div>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default WhatIsSeo;