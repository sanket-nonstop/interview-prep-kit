import { TopicLayout } from '@/components/TopicLayout';

const nextjsMetadataCode = `// Next.js Metadata API: Complete SEO implementation

// ✅ Static metadata (app/page.tsx)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontend Interview Prep | Master React & Next.js',
  description: 'Comprehensive interview preparation with 60+ topics, real code examples, and practice tasks.',
  keywords: ['frontend interview', 'react', 'next.js', 'javascript'],
  authors: [{ name: 'Your Name', url: 'https://yoursite.com' }],
  creator: 'Your Name',
  publisher: 'Your Company',
  metadataBase: new URL('https://yoursite.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'es-ES': '/es-ES',
    },
  },
  openGraph: {
    title: 'Frontend Interview Prep',
    description: 'Master frontend interviews',
    url: 'https://yoursite.com',
    siteName: 'Interview Ready',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Frontend Interview Prep Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frontend Interview Prep',
    description: 'Master frontend interviews',
    creator: '@yourhandle',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

// ✅ Dynamic metadata (app/topics/[slug]/page.tsx)
interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = await fetchTopic(params.slug);
  
  if (!topic) {
    return {
      title: 'Topic Not Found',
    };
  }

  return {
    title: topic.title,
    description: topic.description,
    keywords: topic.tags,
    openGraph: {
      title: topic.title,
      description: topic.description,
      url: \`/topics/\${params.slug}\`,
      images: [
        {
          url: topic.image,
          width: 1200,
          height: 630,
          alt: topic.title,
        },
      ],
      type: 'article',
      publishedTime: topic.publishedAt,
      modifiedTime: topic.updatedAt,
      authors: [topic.author],
      section: topic.category,
      tags: topic.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: topic.title,
      description: topic.description,
      images: [topic.image],
    },
    alternates: {
      canonical: \`/topics/\${params.slug}\`,
    },
  };
}

// ✅ Template-based titles (app/layout.tsx)
export const metadata: Metadata = {
  title: {
    template: '%s | Frontend Interview Prep',
    default: 'Frontend Interview Prep',
  },
};

// Child pages use template
export const metadata: Metadata = {
  title: 'JavaScript Closures', // → "JavaScript Closures | Frontend Interview Prep"
};

// ✅ Metadata with JSON-LD structured data
export default function ArticlePage({ article }: { article: Article }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author,
      url: article.authorUrl,
    },
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

// ✅ Viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};`;

const NextjsMetadata = () => {
  return (
    <TopicLayout
      title="Next.js Metadata API"
      route="/seo/nextjs/metadata"
      category="javascript"
      explanation="Next.js Metadata API provides type-safe, SSR-friendly way to set SEO tags. Supports static and dynamic metadata, templates, Open Graph, Twitter cards, and structured data. Automatically handles deduplication and proper rendering."
      code={nextjsMetadataCode}
      codeFilename="nextjs-metadata.tsx"
      whyItMatters="Proper metadata is critical for SEO and social sharing. Next.js makes it easy with type safety and SSR. Interviewers ask: 'How do you handle SEO in Next.js?', 'Static vs dynamic metadata?', 'What's generateMetadata?' Shows Next.js expertise."
      mistakes={[
        "Client-side metadata: Using useEffect to set title doesn't work for SSR/SEO.",
        "Missing metadataBase: Relative URLs in Open Graph won't work without base URL.",
        "Not using generateMetadata: Hardcoding metadata for dynamic pages misses SEO.",
        "Forgetting alternates.canonical: Duplicate content issues without canonical URLs.",
      ]}
      practiceTask="Implement complete metadata for a blog: static metadata in layout with title template, dynamic generateMetadata for posts with Open Graph and Twitter cards, add JSON-LD structured data for articles."
    />
  );
};

export default NextjsMetadata;