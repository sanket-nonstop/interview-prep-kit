import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default WhatIsSeo;