import { TopicLayout } from '@/components/TopicLayout';

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
    />
  );
};

export default TitleMeta;