import { TopicLayout } from '@/components/TopicLayout';
import { MultiExampleEditor } from '@/components/MultiExampleEditor';

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
    >
      <MultiExampleEditor
        title="🎯 Try It: Next.js Metadata"
        examples={[
          {
            title: "❌ Before: Manual Meta Tags",
            code: `<!DOCTYPE html>
<html>
<head>
  <title>Blog Post</title>
  <style>
    body { margin: 0; padding: 20px; font-family: system-ui; background: #fee; }
    .card { background: white; padding: 30px; border-radius: 8px; margin-bottom: 20px; }
    .error { background: #fee; border-left: 4px solid #ef4444; padding: 15px; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="error">
    <strong>❌ Problems with Manual Meta Tags:</strong><br>
    • No type safety<br>
    • Easy to forget tags<br>
    • Duplicate meta tags<br>
    • No SSR optimization<br>
    • Hard to maintain
  </div>

  <div class="card">
    <h1>My Blog Post</h1>
    <p>Content here...</p>
  </div>

  <div class="card">
    <h3>Missing SEO Elements:</h3>
    <ul style="color:#ef4444;">
      <li>❌ No Open Graph tags</li>
      <li>❌ No Twitter Card</li>
      <li>❌ No structured data</li>
      <li>❌ Generic title</li>
      <li>❌ No canonical URL</li>
    </ul>
  </div>

  <div class="card" style="background:#f9fafb;">
    <h3>Social Media Preview:</h3>
    <div style="border:1px solid #ccc; padding:15px; border-radius:6px;">
      <div style="color:#999;">🔗 yoursite.com</div>
      <div style="font-weight:bold; margin:5px 0;">Blog Post</div>
      <div style="color:#666; font-size:14px;">No description</div>
      <div style="margin-top:10px; padding:20px; background:#e5e7eb; border-radius:4px; text-align:center; color:#999;">No image</div>
    </div>
  </div>
</body>
</html>`
          },
          {
            title: "✅ After: Next.js Metadata API",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- ✅ Type-safe metadata from Next.js -->
  <title>Complete Guide to React Hooks | Frontend Interview Prep</title>
  <meta name="description" content="Master React Hooks with this comprehensive guide. Learn useState, useEffect, custom hooks with real-world examples and best practices.">
  <meta name="keywords" content="react, hooks, useState, useEffect, frontend, interview">
  
  <!-- ✅ Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="Complete Guide to React Hooks">
  <meta property="og:description" content="Master React Hooks with this comprehensive guide.">
  <meta property="og:url" content="https://yoursite.com/topics/react-hooks">
  <meta property="og:image" content="https://yoursite.com/og-react-hooks.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="article:published_time" content="2024-01-15T00:00:00Z">
  <meta property="article:author" content="John Doe">
  
  <!-- ✅ Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Complete Guide to React Hooks">
  <meta name="twitter:description" content="Master React Hooks with this comprehensive guide.">
  <meta name="twitter:image" content="https://yoursite.com/twitter-react-hooks.jpg">
  <meta name="twitter:creator" content="@yourhandle">
  
  <!-- ✅ Canonical URL -->
  <link rel="canonical" href="https://yoursite.com/topics/react-hooks">
  
  <!-- ✅ Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Complete Guide to React Hooks",
    "description": "Master React Hooks with this comprehensive guide.",
    "image": "https://yoursite.com/og-react-hooks.jpg",
    "datePublished": "2024-01-15",
    "author": {
      "@type": "Person",
      "name": "John Doe"
    }
  }
  </script>
  
  <style>
    body { margin: 0; padding: 20px; font-family: system-ui; background: #d1fae5; }
    .card { background: white; padding: 30px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .success { background: #d1fae5; border-left: 4px solid #10b981; padding: 15px; border-radius: 4px; }
    .badge { display: inline-block; background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-left: 10px; }
    .code { background: #1f2937; color: #10b981; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 13px; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="success">
    <strong>✅ Next.js Metadata API Benefits:</strong><br>
    • Type-safe with TypeScript<br>
    • Automatic deduplication<br>
    • SSR optimized<br>
    • Template support<br>
    • Dynamic generation
  </div>

  <div class="card">
    <h1>Complete Guide to React Hooks <span class="badge">SEO OPTIMIZED</span></h1>
    <p style="color:#6b7280; margin:10px 0;">📅 Published: Jan 15, 2024 | 👤 By John Doe</p>
    <p>Master React Hooks with this comprehensive guide covering useState, useEffect, and custom hooks.</p>
  </div>

  <div class="card">
    <h3>✅ Complete SEO Implementation:</h3>
    <ul style="color:#10b981;">
      <li>✅ Open Graph tags (Facebook, LinkedIn)</li>
      <li>✅ Twitter Card (rich preview)</li>
      <li>✅ Structured data (rich snippets)</li>
      <li>✅ Descriptive title with template</li>
      <li>✅ Canonical URL (no duplicates)</li>
    </ul>
  </div>

  <div class="card" style="background:#f9fafb;">
    <h3>Social Media Preview:</h3>
    <div style="border:1px solid #10b981; padding:15px; border-radius:6px; background:#f0fdf4;">
      <img src="data:image/svg+xml,%3Csvg width='400' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='200' fill='%233b82f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='white' font-size='20'%3EReact Hooks Guide%3C/text%3E%3C/svg%3E" style="width:100%; border-radius:6px; margin-bottom:10px;">
      <div style="color:#10b981; font-size:12px;">🔗 yoursite.com</div>
      <div style="font-weight:bold; margin:5px 0;">Complete Guide to React Hooks</div>
      <div style="color:#666; font-size:14px;">Master React Hooks with this comprehensive guide...</div>
    </div>
  </div>

  <div class="card">
    <h3>Next.js Code:</h3>
    <div class="code">export const metadata: Metadata = {<br>  title: 'Complete Guide to React Hooks',<br>  description: 'Master React Hooks...',<br>  openGraph: {<br>    title: 'Complete Guide to React Hooks',<br>    images: ['/og-react-hooks.jpg'],<br>  },<br>};</div>
  </div>
</body>
</html>`
          }
        ]}
      />
    </TopicLayout>
  );
};

export default NextjsMetadata;